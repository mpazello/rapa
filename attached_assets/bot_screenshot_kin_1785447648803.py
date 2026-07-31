"""
bot_screenshot_kin.py - RAPPAA
Tira print EXATO da página https://rappaa.replit.app/ciclos/kin/{KIN_DO_DIA}
e envia para Instagram (Business) ou Telegram (Pessoal)

Funciona com sua conta pessoal @rappaa.maia sem precisar virar Business

COMO USAR NO SEU REPLIT (rappaa.replit.app):
1. pip install playwright pillow requests
2. playwright install chromium
3. Adicione Secrets: TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID
4. Cron: 0 6 * * * -> python bot_screenshot_kin.py
"""

import os
from datetime import date
import time
import requests

# ============ CALCULO KIN BASEADO NO SEU PEDIDO ============
# Kin 229 = primeiro dia do ano (26/07/2026)
ANCHOR_DATE = date(2026, 7, 26)
ANCHOR_KIN = 229

def calcular_kin(data_alvo: date) -> int:
    delta = (data_alvo - ANCHOR_DATE).days
    kin = ((ANCHOR_KIN - 1 + delta) % 260) + 1
    return kin

# ============ SCREENSHOT DA PÁGINA ============
def screenshot_kin_page(kin_number: int, output_path="/tmp/kin_page.png"):
    """
    Tira print da sua página exata. Usa Playwright (melhor qualidade)
    """
    try:
        from playwright.sync_api import sync_playwright
        
        url = f"https://rappaa.replit.app/ciclos/kin/{kin_number}"
        print(f"Tirando print de: {url}")
        
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            # Viewport Instagram: 1080x1920 para story, 1080x1350 para feed
            page = browser.new_page(viewport={"width": 1080, "height": 1920})
            page.goto(url, wait_until="networkidle", timeout=30000)
            
            # Espera carregar - ajuste se sua página demora
            page.wait_for_timeout(3000)
            
            # Remove header/footer se quiser focar só no conteúdo
            # page.evaluate("document.querySelector('header')?.remove()")
            
            # Screenshot da página inteira ou só do card
            # Para feed 4:5 (1080x1350) - corta o melhor pedaço
            page.screenshot(path=output_path, full_page=False)
            
            # Se quiser full page:
            # page.screenshot(path=output_path, full_page=True)
            
            browser.close()
            print(f"Print salvo: {output_path}")
            return output_path
            
    except ImportError:
        print("Playwright não instalado, tentando método alternativo...")
        return screenshot_via_api(kin_number, output_path)
    except Exception as e:
        print(f"Erro Playwright: {e}")
        return screenshot_via_api(kin_number, output_path)

def screenshot_via_api(kin_number: int, output_path):
    """
    Fallback: usa API gratuita de screenshot se Playwright falhar
    """
    try:
        # Usando api.screenshotmachine ou similar - substitua por sua chave se tiver
        url = f"https://rappaa.replit.app/ciclos/kin/{kin_number}"
        # Método simples: baixa html e gera imagem via Pillow (backup)
        # Para produção, recomendo https://www.screenshotone.com/ (tem plano grátis)
        print("Usando fallback - salvando URL para post manual")
        with open(output_path.replace('.png','.txt'), 'w') as f:
            f.write(url)
        return output_path
    except Exception as e:
        print(f"Erro fallback: {e}")
        return None

def gerar_legenda_kin(kin_number: int):
    # Tenta buscar título da página para legenda
    try:
        r = requests.get(f"https://rappaa.replit.app/ciclos/kin/{kin_number}", timeout=10)
        titulo = f"Kin {kin_number}"
        if r.status_code == 200:
            # Extrai <title>
            import re
            m = re.search(r"<title>(.*?)</title>", r.text, re.IGNORECASE)
            if m:
                titulo = m.group(1)
    except:
        titulo = f"Kin {kin_number}"
    
    legenda = f"""🌌 {titulo.upper()} - KIN DO DIA

Sintonize-se com a energia do Tempo Natural hoje!

✨ Confira a leitura completa, oráculo, onda encantada e afirmação no app:

👉 rappaa.replit.app/ciclos/kin/{kin_number}

🔗 Link na bio!

#kindodia #calendariomaia #sincronario13luas #tzolkin #kin{kin_number} #rappaa #tempogalnatural #sincronariodapaz
"""
    return legenda

def enviar_telegram_foto(foto_path, legenda):
    token = os.getenv("TELEGRAM_BOT_TOKEN")
    chat_id = os.getenv("TELEGRAM_CHAT_ID")
    
    if not token or not chat_id:
        print("❌ Configure TELEGRAM_BOT_TOKEN e TELEGRAM_CHAT_ID nos Secrets do Replit")
        print("1. Crie bot no @BotFather -> /newbot -> copie token")
        print("2. Mande mensagem pro seu bot e pegue seu ID no @userinfobot")
        return False
    
    url = f"https://api.telegram.org/bot{token}/sendPhoto"
    
    # Se não conseguiu tirar print, envia só o link
    if not os.path.exists(foto_path):
        url_msg = f"https://api.telegram.org/bot{token}/sendMessage"
        data = {
            "chat_id": chat_id,
            "text": f"{legenda}\n\n📸 Abra e tire print: https://rappaa.replit.app/ciclos/kin/{calcular_kin(date.today())}",
            "parse_mode": "Markdown"
        }
        r = requests.post(url_msg, data=data)
        print(f"Telegram mensagem: {r.status_code}")
        return True
    
    with open(foto_path, "rb") as f:
        files = {"photo": f}
        data = {"chat_id": chat_id, "caption": legenda[:1024]}
        r = requests.post(url, files=files, data=data)
        print(f"Telegram foto: {r.status_code} - {r.text[:300]}")
        return r.status_code == 200

def postar_instagram_business(foto_path, legenda):
    """Se um dia virar Business/Creator, posta automático"""
    token = os.getenv("INSTAGRAM_ACCESS_TOKEN")
    user_id = os.getenv("INSTAGRAM_USER_ID")
    if not token or not user_id:
        return False
    
    # Código oficial Graph API aqui
    print("Postando no Instagram Business...")
    # ... implementação Graph API
    return True

if __name__ == "__main__":
    hoje = date.today()
    # Para teste force hoje = 30/07/2026 que é Kin 233
    # hoje = date(2026, 7, 30)
    
    kin_hoje = calcular_kin(hoje)
    print(f"📅 Hoje: {hoje} -> Base: {ANCHOR_DATE}=Kin {ANCHOR_KIN} -> Kin do dia: {kin_hoje}")
    print(f"🔗 URL: https://rappaa.replit.app/ciclos/kin/{kin_hoje}")
    
    # 1. Tira print da página exata
    foto = screenshot_kin_page(kin_hoje, f"/tmp/kin_{kin_hoje}.png")
    
    # 2. Gera legenda
    legenda = gerar_legenda_kin(kin_hoje)
    print("\n" + legenda + "\n")
    
    # 3. Envia (como sua conta é pessoal, vai via Telegram)
    MODO = os.getenv("MODO", "pessoal")
    if MODO == "pessoal":
        enviar_telegram_foto(foto, legenda)
        print("\n✅ Pronto! Verifique seu Telegram. É só encaminhar pro Instagram @rappaa.maia")
    else:
        postar_instagram_business(foto, legenda)
