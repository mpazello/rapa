---
name: Almanaque feature
description: Decisions and patterns for the 13 Moons Almanaque page at /almanaque
---

## galacticYear() — critical bug-prone function
Must use 0-indexed month (getUTCMonth()): July = 6, not 7.
CORRECT: `(m > 6 || (m === 6 && d >= 26)) ? y : y - 1`
WRONG: `date.getUTCMonth() * 100 + date.getUTCDate() < 726` (comparison breaks because 6*100+31=631 < 726)

## moonDayToDate() — Dreamspell Feb 29 skip
Iterates forward from galactic year start, skipping Feb 29. O(N) but N≤365, fine.

## Plasma display names
tzolkin.ts uses "Gamma"/"Alpha" but almanaque shows "GAMA"/"ALFA".
Use `PLASMA_DISPLAY = ["DALI", "SELI", "GAMA", "KALI", "ALFA", "LIMI", "SILIO"]` array.

## Planeta per seal (Dreamspell)
Seals 1-9 are GK, seals 10-19 are SP, seal 20 = Plutão [GK].
Formula: seals 1-9 go Netuno→Mercúrio (inward), seals 10-19 reverse (Mercúrio→Plutão outward).
Hardcoded in SEAL_PLANET Record<number,string>.

## Chakra per seal (Dreamspell Holon)
Formula: `(sealIndex - 1) % 5` maps to 5 chakras:
- 0 → Garganta [Transmite]
- 1 → Coração [Transduz]
- 2 → Plexo Solar [Recebe]
- 3 → Raiz [Transmite]
- 4 → Coroa [Recebe]
Verified against multiple almanaque pages.

## Harmônica
number = Math.ceil(kin / 4), position = (kin-1)%4
Types: 0=Entrada Harmônica, 1=Processo Rítmico, 2=Saída Planetária, 3=Armazém [Magnético/Lunar/Solar/Cristal] cycling by (harmonic-1)%4

## PSI Kin
psi = ((moonNumber-1)*28 + (dayInMoon-1)) % 260 + 1 (Dreamspell offset from galactic year start)

## suppressHydrationWarning placement
Must be on the actual DOM element (span/p/div) containing `new Date()`, never on <Link> or React components — TanStack Router won't forward it.

## Route structure
- /almanaque — AlmanaquePage (CalendarView or DayDetail based on state)
- CalendarView: 7×4 grid (plasmas × heptals), today highlighted
- DayDetail: full almanaque-style tela diária with oracle, wavespell, attributes
