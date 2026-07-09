---
name: BoraBusan Design System
colors:
  surface: '#f9f9ff'
  surface-dim: '#cfdaf2'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f0f3ff'
  surface-container: '#e7eeff'
  surface-container-high: '#dee8ff'
  surface-container-highest: '#d8e3fb'
  on-surface: '#111c2d'
  on-surface-variant: '#4c4452'
  inverse-surface: '#263143'
  inverse-on-surface: '#ecf1ff'
  outline: '#7e7383'
  outline-variant: '#cfc2d4'
  surface-tint: '#803abd'
  primary: '#500088'
  on-primary: '#ffffff'
  primary-container: '#6b21a8'
  on-primary-container: '#d7a8ff'
  inverse-primary: '#dfb7ff'
  secondary: '#006591'
  on-secondary: '#ffffff'
  secondary-container: '#39b8fd'
  on-secondary-container: '#004666'
  tertiary: '#432565'
  on-tertiary: '#ffffff'
  tertiary-container: '#5b3d7d'
  on-tertiary-container: '#d0adf6'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#f1dbff'
  primary-fixed-dim: '#dfb7ff'
  on-primary-fixed: '#2d0050'
  on-primary-fixed-variant: '#661aa3'
  secondary-fixed: '#c9e6ff'
  secondary-fixed-dim: '#89ceff'
  on-secondary-fixed: '#001e2f'
  on-secondary-fixed-variant: '#004c6e'
  tertiary-fixed: '#efdbff'
  tertiary-fixed-dim: '#dbb8ff'
  on-tertiary-fixed: '#29074a'
  on-tertiary-fixed-variant: '#573878'
  background: '#f9f9ff'
  on-background: '#111c2d'
  surface-variant: '#d8e3fb'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '800'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 30px
    fontWeight: '700'
    lineHeight: '1.3'
  headline-sm:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-bold:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.2'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  container-margin-mobile: 20px
  container-margin-desktop: 80px
  gutter: 16px
  section-gap: 64px
---

## Brand & Style
The brand personality is energetic, premium, and culturally resonant. It bridges the gap between high-end travel editorial and the vibrant, fan-centric world of K-Pop. The target audience includes international tourists and dedicated K-Pop fans who seek a curated, stylish lens through which to experience Busan.

The design style is a blend of **Modern Minimalism** and **Soft Glassmorphism**. It utilizes generous whitespace and a "container-less" philosophy for high-level layouts, while using sophisticated glass effects for interactive overlays. The aesthetic is "New-Wave Editorial"—clean, structured, yet pulsing with the rhythmic energy of the ocean and the stage.

## Colors
The palette is centered on "Bora" (Purple), the symbolic color of global fandom, paired with the "Pearl Blue" of Busan’s coastline.

- **Primary (Deep Purple):** Used for key brand moments, primary calls to action, and active states.
- **Secondary (Pearl Blue):** Used for accent elements, iconography, and soft background gradients to evoke the sea.
- **Tertiary (Soft Lavender):** Used for decorative elements and low-priority backgrounds.
- **Background:** Primarily a very light slate to reduce eye strain while maintaining a clean, high-end feel. Subtle linear gradients starting from the top-right corner (Pearl Blue at 5% opacity) are encouraged for page headers.

## Typography
The design system relies on **Inter** to deliver a sleek, neutral, and highly legible experience. 

- **Headlines:** Use heavy weights (700-800) with tight letter spacing to create a high-impact, magazine-style hierarchy.
- **Body:** Standardized at 16px for optimal readability across mobile devices.
- **Labels:** Small labels and badges use uppercase styling with increased letter spacing to provide a "premium metadata" feel.
- **Scale:** On mobile, display headings should scale down to prevent awkward word breaks while maintaining their visual weight.

## Layout & Spacing
The layout follows a **Fluid Grid** model with a mobile-first priority. 

- **Mobile:** A 4-column layout with 20px side margins. Content should be stacked vertically, utilizing horizontal "scroll-snapping" carousels for card collections to save vertical space.
- **Desktop:** A 12-column centered layout with a maximum width of 1280px. 
- **Spacing Rhythm:** Use a 4px baseline grid. Internal component padding should be generous (typically 24px for cards) to reinforce the premium, breathable aesthetic.

## Elevation & Depth
Depth is created through a combination of **Ambient Shadows** and **Glassmorphism**.

- **Surface 1 (Base):** Light Slate background.
- **Surface 2 (Cards):** Pure White with a "Soft-Focus" shadow (0px 10px 30px rgba(30, 41, 59, 0.04)). 
- **Surface 3 (Overlays/Nav):** Glassmorphic layers. Use a background blur of 12px and a white fill at 70% opacity. Add a 1px solid white border at 20% opacity to define the edges.
- **Depth Hierarchy:** Navigation bars and floating action buttons should always sit on the highest z-index with the most pronounced glass effect.

## Shapes
The shape language is defined by **2XL roundedness**. 

- **Cards & Containers:** Use `rounded-2xl` (1.5rem / 24px) to create a friendly, contemporary feel that mirrors modern smartphone OS aesthetics.
- **Small Elements:** Buttons and input fields should use `rounded-xl` (1rem / 16px) to maintain consistency without appearing overly circular.
- **Interactive States:** When a card is hovered or pressed, it should subtly scale (1.02x) rather than changing its border radius.

## Components

### Buttons
- **Primary:** Gradient fill from Deep Purple (#6B21A8) to a slightly lighter violet. 16px horizontal padding, bold typography.
- **Secondary:** Transparent background with a 2px Pearl Blue border.
- **Hover State:** Apply a subtle glow effect (box-shadow) using the primary color at 30% opacity.

### Cards
- **Editorial Card:** High-resolution image background with a gradient overlay (bottom-to-top, black at 60% to transparent). Content is anchored to the bottom-left.
- **Standard Card:** White background, 2xl corners, soft shadow, and a "Category Badge" positioned in the top-right.

### Glassmorphism Navigation
- Positioned at the bottom for mobile (thumb-friendly) and top for desktop.
- 70% opacity white with `backdrop-filter: blur(16px)`.

### Category Badges
- High-contrast elements using Deep Purple or Pearl Blue backgrounds with White `label-bold` text. 
- Pill-shaped (fully rounded) to contrast against the 2xl rounded cards.

### Input Fields
- Soft slate border (1px) that transitions to a 2px Pearl Blue border on focus.
- Background should be pure white to pop against the light slate page background.