---
name: Ethereal Ritual
colors:
  surface: '#111319'
  surface-dim: '#111319'
  surface-bright: '#36393f'
  surface-container-lowest: '#0b0e13'
  surface-container-low: '#191c21'
  surface-container: '#1d2025'
  surface-container-high: '#272a30'
  surface-container-highest: '#32353a'
  on-surface: '#e1e2e9'
  on-surface-variant: '#c3c6d0'
  inverse-surface: '#e1e2e9'
  inverse-on-surface: '#2e3036'
  outline: '#8d909a'
  outline-variant: '#43474f'
  surface-tint: '#a9c7ff'
  primary: '#d5e2ff'
  on-primary: '#07305f'
  primary-container: '#a8c7ff'
  on-primary-container: '#335283'
  inverse-primary: '#405f90'
  secondary: '#d2bbff'
  on-secondary: '#3c1878'
  secondary-container: '#533390'
  on-secondary-container: '#c4a6ff'
  tertiary: '#ffe067'
  on-tertiary: '#3a3000'
  tertiary-container: '#e8c300'
  on-tertiary-container: '#615100'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#d6e3ff'
  primary-fixed-dim: '#a9c7ff'
  on-primary-fixed: '#001b3d'
  on-primary-fixed-variant: '#264777'
  secondary-fixed: '#eaddff'
  secondary-fixed-dim: '#d2bbff'
  on-secondary-fixed: '#25005a'
  on-secondary-fixed-variant: '#533390'
  tertiary-fixed: '#ffe16d'
  tertiary-fixed-dim: '#e9c400'
  on-tertiary-fixed: '#221b00'
  on-tertiary-fixed-variant: '#544600'
  background: '#111319'
  on-background: '#e1e2e9'
  surface-variant: '#32353a'
  obsidian-deep: '#0E1116'
  obsidian-surface: '#1E2128'
  cosmic-blue: '#A8C7FF'
  astral-violet: '#BC9BFF'
  ritual-gold: '#FFD700'
  ethereal-white: '#F8F9FA'
  muted-stardust: '#74777F'
typography:
  display-lg:
    fontFamily: ebGaramond
    fontSize: 48px
    fontWeight: '500'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: ebGaramond
    fontSize: 36px
    fontWeight: '500'
    lineHeight: 44px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: ebGaramond
    fontSize: 32px
    fontWeight: '400'
    lineHeight: 40px
  headline-sm:
    fontFamily: ebGaramond
    fontSize: 24px
    fontWeight: '400'
    lineHeight: 32px
  title-lg:
    fontFamily: inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.1em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1200px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
---

## Brand & Style

This design system is crafted for a premium, mystical journey application that bridges the gap between ancient ritual and modern technology. The brand personality is **mysterious, rhythmic, and intentional**, designed to evoke a sense of calm focus and spiritual elevation.

The visual direction follows a **Modern Dark Mode** aesthetic infused with **Glassmorphism** and **Tactile** highlights. It avoids the heaviness of traditional esoteric design, opting instead for a "Cosmic Tech" feel. Key characteristics include:
- **Depth through Translucency:** Using frosted glass layers to represent the fluid nature of consciousness.
- **Luminescent Accents:** Subdued glows and "aura" gradients that act as visual metaphors for energy states.
- **Sophisticated Contrast:** Pairing high-end editorial typography with a hyper-functional UI grid.

## Colors

The palette is anchored in **Obsidian Deep**, a near-black that provides infinite depth for the interface. 

- **Primary (Cosmic Blue):** Used for interactive elements and state indicators. It represents the "Mão Rítmico Azul" and should feel electric yet cool.
- **Secondary (Astral Violet):** Used for spiritual secondary actions, soft gradients, and decorative glows.
- **Tertiary (Ritual Gold):** Reserved for peak moments, special kin indicators, or "Day Out of Time" notifications. It should be used sparingly to maintain its sacred impact.
- **Neutral:** A range of deep grays that provide structure without breaking the dark-mode immersion.

**Gradients:** Use linear gradients from Cosmic Blue to Astral Violet (at 45 degrees) for primary buttons and active state containers to simulate energy flow.

## Typography

This system utilizes a high-contrast typographic pairing to balance the "ritual" and the "app."

- **Serif (EB Garamond):** Used for ritualistic titles, kin names, and philosophical content. It brings an academic and timeless authority to the spiritual journey. Headlines should use lowercase or sentence case to maintain a soft, approachable feel.
- **Sans-Serif (Inter):** Used for all functional UI elements, navigation, and body descriptions. It ensures high readability in dark mode and reinforces the "tech" aspect of the platform.

**Styling Note:** Labels and small captions should often be set in uppercase with increased letter spacing to create a clean, modern metadata look.

## Layout & Spacing

The layout philosophy is a **Fluid-Fixed Hybrid**. Content is centered within a maximum width of 1200px on desktop, while margins expand to fill the screen. 

- **Grid:** A 12-column grid is used for desktop, transitioning to a 4-column grid for mobile.
- **Rhythm:** Spacing follows an 8px base unit. Card internal padding should be generous (min 24px) to allow the content to "breathe" within its glass container.
- **Breathability:** Use significant vertical whitespace (Section spacing of 80px-120px) to prevent the user from feeling overwhelmed, mimicking the meditative nature of the content.

## Elevation & Depth

Elevation in this system is defined by **Tonal Layering and Glassmorphism** rather than traditional black shadows.

- **Background:** Base level is `#0E1116`.
- **Primary Containers (Glass):** Background color `#FFFFFF` with 5% - 8% opacity and a `backdrop-filter: blur(12px)`. These surfaces represent the "active" layer of the ritual.
- **Outlines:** Instead of shadows, use 1px solid borders with 10% white opacity to define edges. For primary cards, use a subtle gradient border (Top-left: 20% White, Bottom-right: 5% White).
- **Aura Glows:** For high-priority elements like the current Kin, place a soft, low-opacity radial gradient (using Cosmic Blue or Astral Violet) *behind* the glass card to create a subtle glow effect on the background.

## Shapes

The shape language is **Refined and Rounded**. 

- **Cards & Modals:** Use `rounded-lg` (16px) to create a soft, welcoming container. 
- **Buttons:** Primary buttons should use `rounded-xl` (24px) or be fully pill-shaped to differentiate them from static content containers.
- **Icons:** Use 2px stroke weight with rounded terminals. Icons should be minimalist and avoid filled blocks unless active.

## Components

### Buttons
- **Primary Ritual Button:** A vibrant Cosmic Blue to Astral Violet gradient background with white text. High-radius (pill-shaped).
- **Secondary/Ghost:** 1px white border (15% opacity) with transparent background and white text.

### Cards (The "Altar")
- Glassmorphic finish. Internal padding of 24px. Headline in EB Garamond, Body in Inter. Card titles should be separated by a thin, 1px divider with 10% opacity.

### Energy Chips
- Small, pill-shaped tags used for states like "Calmo" or "Presente." Use low-opacity tints of the state-relevant color (e.g., a soft green tint for "Fluido") with a matching border.

### Input Fields
- Underlined style or subtle glass container. The focus state should illuminate the border with a Cosmic Blue glow.

### Ritual Progress/Journey Markers
- Use a thin, continuous line with "nodes." Active nodes should have a small outer glow (Cosmic Blue) to signify the user's current position in the journey.

### Bottom Navigation
- Fixed, glassmorphic bar with a high blur (20px). Icons use a subtle "aura" glow when active rather than a solid fill change.