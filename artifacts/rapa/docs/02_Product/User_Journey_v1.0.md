# RAPA — User Journey v1.0

**Versão:** 1.0
**Status:** Aprovado
**Data:** Julho de 2026

---

## Sobre este documento

A jornada do usuário é o desenho macro da experiência da Foundation Release, do primeiro contato ao retorno recorrente. Ela guia decisões de UX, notificações, textos e priorização de features.

A pergunta que este documento responde: **o que precisa acontecer, na ordem certa, para que uma pessoa forme o hábito de voltar à RAPA?**

## 1. Princípios da jornada

1. **Começa pela pessoa, não pelo Kin.** A Home cumprimenta o usuário e pergunta como ele está antes de mostrar qualquer conteúdo simbólico.
2. **Um passo por vez.** Cada etapa entrega um valor pequeno e completo. Nada obriga a próxima.
3. **Retorno é feature, não notificação.** O aplicativo é desenhado para ser desejado no dia seguinte, não empurrado.
4. **A IA (KAI) faz perguntas antes de dar respostas.**
5. **Nada é irreversível.** Cadastro, registros, exportação, tudo respeita a autonomia.

## 2. Jornada macro

```text
Descoberta → Instalação → Cadastro → Descoberta pessoal → Primeiro registro
     → Primeira reflexão com KAI → Retorno D+1 → Retorno D+7 → Retorno D+30
```

## 3. Etapa a etapa

### 3.1 Descoberta

**Onde acontece.** Indicação de amigo, conteúdo de professor, busca por Tzolkin, mídia.
**Objetivo.** Entender em 20 segundos o que a RAPA é.
**Emoção esperada.** Curiosidade calma.
**Fricção.** Confundir com app de horóscopo ou app de meditação.
**Mitigação.** Frase-âncora sempre presente: _"Conheça seus ciclos. Viva com consciência."_ Nunca prometer previsão.

### 3.2 Instalação / primeiro acesso

**Objetivo.** Chegar à Home em menos de 90 segundos após decidir experimentar.
**Emoção esperada.** Expectativa cautelosa.
**Fricção.** Onboarding longo, pedidos de permissão prematuros.
**Mitigação.** Zero permissões no início. Notificações são pedidas depois do primeiro registro, com contexto.

### 3.3 Cadastro

**Objetivo.** Criar conta com o mínimo indispensável: nome, e-mail, senha (ou provedor social), data de nascimento.
**Emoção esperada.** "Espero que valha a pena."
**Fricção.** Formulários longos, pedidos de dados sensíveis sem justificativa.
**Mitigação.** Data de nascimento é explicada (_"usada para calcular seu Kin natal, você pode ocultar depois"_). Nome pode ser um apelido.

### 3.4 Descoberta pessoal

**Objetivo.** Mostrar o Kin natal e uma leitura inicial breve.
**Emoção esperada.** Encantamento sóbrio.
**Fricção.** Excesso de informação simbólica de uma vez.
**Mitigação.** Uma tela, três parágrafos, um botão: _"Guardar na minha Jornada"_. Sem quiz, sem gamificação.

### 3.5 Primeiro registro

**Objetivo.** O usuário registra **algo seu** — humor, uma frase, uma reflexão.
**Emoção esperada.** Alívio ("foi mais simples do que pensei").
**Fricção.** Tela em branco intimidadora.
**Mitigação.** Pergunta simples na Home: _"Como você está hoje?"_ com cinco emojis. Depois, campo opcional: _"Quer escrever algo?"_.

**Marco de ativação.** O primeiro registro conta como ativação. É a métrica-chave desta etapa.

### 3.6 Primeira reflexão com KAI

**Objetivo.** Fazer o usuário perceber que existe alguém do outro lado — que devolve com inteligência e cuidado.
**Emoção esperada.** Surpresa ("ele entendeu").
**Fricção.** IA soar genérica ou moralista.
**Mitigação.** KAI abre com _"O que você gostaria de compreender hoje?"_. Referencia o registro recente. Faz **uma** pergunta boa em vez de dar resposta.

**Marco emocional.** Este é o "momento aha" da Foundation Release. Se acontecer, o usuário volta.

### 3.7 Retorno D+1

**Objetivo.** Trazer o usuário de volta no dia seguinte, por vontade dele.
**Gatilho principal.** Notificação matinal opcional, curta: _"Bom dia. Como você chega hoje?"_ (nunca "não perca seu Kin do dia!").
**Fricção.** Notificação genérica.
**Mitigação.** Personalização mínima: nome + pergunta afetiva. Frequência configurável desde o primeiro acesso.

### 3.8 Retorno D+7

**Objetivo.** O usuário perceber que **tem histórico**.
**Gatilho.** Ao abrir, a Home mostra: _"Você registrou 4 vezes esta semana. Quer revisitar?"_ + acesso rápido à Jornada.
**Momento chave.** Primeiro contato com a linha do tempo pessoal. Percepção de continuidade.

### 3.9 Retorno D+30

**Objetivo.** Nasce **Memórias**. Pela primeira vez, algo é reapresentado com significado.
**Gatilho.** _"Um mês atrás você começou aqui. Quer reler seu primeiro registro?"_
**Emoção esperada.** Ternura, reconhecimento.

**Marco de retenção.** Se o usuário chega e reage a este momento, a Foundation cumpriu sua promessa.

## 4. Momento "aha"

O momento em que o usuário deixa de ver a RAPA como app e passa a vê-la como companhia acontece na primeira reflexão com KAI (§3.6). Toda a jornada é desenhada para essa cena acontecer nas primeiras 48 horas.

## 5. Gatilhos de retorno

Ordem de prioridade (do menos ao mais invasivo):

1. **Curiosidade orgânica** — Home viva, muda todo dia.
2. **Memórias** — reapresentação afetiva de registros antigos.
3. **Notificação matinal opcional** — uma por dia, curta, humana.
4. **Notificação de continuidade** — "você registrou X vezes esta semana", semanal.
5. **Nada mais.** Sem streaks agressivos, sem "você está perdendo X".

## 6. Fricções sistêmicas a evitar

- Onboarding em mais de 3 telas antes da Home.
- Cadastro obrigatório antes de ver qualquer valor.
- Notificações que induzem culpa.
- Tela em branco sem sugestão de próximo passo.
- KAI dando conselho não solicitado.
- Qualquer texto em tom místico-alarmista.

## 7. Variações por persona

- **Explorador.** Precisa de mais handholding no onboarding e do primeiro convite ao KAI já na sessão 1.
- **Estudioso.** Quer pular a introdução ao Tzolkin. Precisa de um atalho "já conheço, me leve para a Biblioteca".
- **Em Transformação.** Prioriza silêncio e sobriedade. Notificações desativadas por padrão são aceitáveis para ele.
- **Guardião.** Espera Linha da Vida robusta desde o primeiro dia. Onboarding pode oferecer "começar registrando um marco importante da sua vida".

## 8. Métricas atreladas à jornada

| Etapa | Métrica |
|---|---|
| Descoberta → Cadastro | Taxa de cadastro sobre visitas |
| Cadastro → Primeiro registro | Ativação (% que registra em D0) |
| Primeiro registro → KAI | % que dispara primeira conversa em D0 ou D1 |
| D+1 | Retorno em 24h |
| D+7 | 3+ dias ativos na primeira semana |
| D+30 | Interação com Memórias |

Referência: `docs/02_Product/MVP_Functional_Specification_v1.0.md` — capítulo de Analytics.

## Changelog
- v1.0 (Jul/2026) — Jornada macro aprovada.
