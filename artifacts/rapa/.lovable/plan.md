# Plano — Construir a RAPA Foundation (4 telas do Stitch)

## O que vou construir

Traduzir os 4 HTMLs do Stitch em rotas TanStack Start reais, mantendo o design system definido (dark, glass cards, Material Symbols, tokens semânticos).

### Rotas
- `/` → **Hoje** (Home viva: saudação "Bom dia, Marcus", seletor de humor, CTA "Registrar hoje", card Ciclo do Dia, preview Minha Jornada, citação reflexiva)
- `/jornada` → **Jornada** (timeline vertical com marcos, reflexões, humores, citação central)
- `/ciclos` → **Ciclos** (matriz Tzolkin simplificada, Kin identity card, reflexão do ciclo, cards O Tom / O Selo)
- `/kai` → **KAI** (orbe animada, textarea "O que você gostaria de compreender hoje?", grid de "Caminhos de Reflexão")

### Chrome global (em `__root.tsx`)
- **Top App Bar** fixo com marca "RAPA" e ícones (perfil / menu)
- **Bottom Nav** fixo com 5 abas: Hoje · Jornada · Ciclos · KAI · Perfil (Perfil como stub por enquanto)
- Fundo com textura granulada sutil (`grain-texture` / `noise-overlay`)

## Design system (em `src/styles.css`)

- **Tipografia:** carregar via `@fontsource` — Instrument Serif (display/headline elegante) + Inter (body/label). Nada de Google Fonts CDN.
- **Material Symbols Outlined:** via `<link>` no `head()` do `__root.tsx` (não via @import CSS).
- **Tokens semânticos Material 3** no `@theme` do Tailwind v4:
  - `background`, `surface`, `surface-container-{low,lowest,high,highest}`
  - `on-surface`, `on-surface-variant`, `outline`, `outline-variant`
  - `primary`, `on-primary`, `primary-container`
  - `secondary`, `on-secondary`, `secondary-fixed`, `on-secondary-fixed`
  - `tertiary`, `tertiary-container`, `error`
  - Paleta noturna: fundo `#0E1116`, surface `#141821`, primary `#B6C7EB` (azul lunar), tertiary `#C9B892` (dourado suave), error `#D97362` (terracota).
- **Utilitários:** `.glass-card`, `.glass-panel`, `.grain-texture`, `.noise-overlay`, `.texture-overlay`, `.timeline-line`, `.tzolkin-grid`, `.kai-orb` + `.kai-orb-core` (com `soft-pulse` animation), `.font-display-lg`, `.font-headline-lg`, `.font-headline-lg-mobile`, `.font-title-md`, `.font-body-md`, `.font-body-lg`, `.font-label-sm`.
- Spacing custom: `px-container-margin` (1.25rem mobile / 2rem desktop), `space-y-section-gap` (~4rem).

## Componentes reutilizáveis (`src/components/`)
- `TopAppBar.tsx`
- `BottomNav.tsx` (com `<Link>` + `activeProps`)
- `GlassCard.tsx`
- `MoodSelector.tsx` (5 estados: Calmo, Presente, Fluido, Vibrante, Reflexivo)
- `TimelineEntry.tsx` (variantes: milestone, reflection, image, mood, quote)
- `KinIdentityCard.tsx`
- `KaiOrb.tsx`
- `ReflectivePrompt.tsx` (citação em blockquote)

## Escopo desta rodada
- **Apenas front-end estático** — dados mockados diretamente nas telas (o Marcus, os marcos, o Kin 1, etc., vêm dos HTMLs do Stitch).
- Imagens hotlinkadas dos URLs `lh3.googleusercontent.com/aida-public/…` já presentes nos HTMLs.
- Head metadata real em cada rota (title, description, og:title, og:description).
- Substituir o placeholder atual de `src/routes/index.tsx`.

## Fora do escopo
- Sem Lovable Cloud / Supabase / auth nesta rodada (documentação já registrou que virão depois).
- Sem KAI real (só a tela). Sem cálculo de Kin real (só o mock).
- Sem persistência: cliques no seletor de humor mudam estado local, mas não salvam.
- Sem página `/perfil` completa — apenas um stub mínimo para o item da nav não quebrar.

## Verificação
Após a build automática, rodo Playwright em `/`, `/jornada`, `/ciclos`, `/kai` capturando screenshots (viewport mobile 390 e desktop 1280) para comparar com os HTMLs do Stitch e ajustar o que estiver visualmente distante.

Confirma que sigo assim? Se quiser, posso também trocar a paleta antes de começar (por padrão sigo os tokens noturnos acima, que combinam com o tom do Stitch).