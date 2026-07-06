---
name: Obsidian Editorial
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#3a3939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#c4c7c6'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#8e9191'
  outline-variant: '#434847'
  surface-tint: '#c6c7c6'
  primary: '#ffffff'
  on-primary: '#2f3130'
  primary-container: '#e2e2e2'
  on-primary-container: '#636564'
  inverse-primary: '#5d5f5e'
  secondary: '#c6c6cf'
  on-secondary: '#2f3037'
  secondary-container: '#45464e'
  on-secondary-container: '#b4b4bd'
  tertiary: '#ffffff'
  on-tertiary: '#2f3038'
  tertiary-container: '#e3e1ec'
  on-tertiary-container: '#64636d'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e2e2e2'
  primary-fixed-dim: '#c6c7c6'
  on-primary-fixed: '#1a1c1c'
  on-primary-fixed-variant: '#454747'
  secondary-fixed: '#e2e1eb'
  secondary-fixed-dim: '#c6c6cf'
  on-secondary-fixed: '#1a1b22'
  on-secondary-fixed-variant: '#45464e'
  tertiary-fixed: '#e3e1ec'
  tertiary-fixed-dim: '#c7c5d0'
  on-tertiary-fixed: '#1a1b23'
  on-tertiary-fixed-variant: '#46464f'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 64px
    fontWeight: '600'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Inter
    fontSize: 40px
    fontWeight: '600'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1.3'
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
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1'
    letterSpacing: 0.02em
  caption:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: '1.4'
spacing:
  container-max: 1280px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
  section-gap: 80px
---

## Brand & Style

This design system embodies a sophisticated, high-end digital editorial experience optimized for dark environments. The brand personality is authoritative yet quiet, focusing on content consumption without the distraction of vibrant color or heavy ornamentation. 

The aesthetic is a blend of **Minimalism** and **Modern Corporate**, utilizing a strictly monochromatic palette to establish hierarchy. The interface prioritizes negative space and high-quality typography to evoke a sense of premium craftsmanship and intellectual depth. The emotional response should be one of calm, focus, and prestige.

## Colors

The palette is restricted to a grayscale spectrum to maintain an editorial "ink-on-paper" feel, inverted for digital comfort. 

- **Primary (#f9f9f8):** Reserved for body text, headings, and high-priority icons. It is a soft off-white to reduce eye strain against the dark background.
- **Secondary (#a1a1aa):** Used for meta-data, descriptions, and secondary UI actions.
- **Tertiary (#52525b):** Used for disabled states, captions, and decorative elements.
- **Background (#0a0a0a):** A rich, deep black providing the foundation for the entire system.
- **Surface (#121212):** A slightly lifted charcoal used for cards, navigation bars, and modals to create subtle depth.

## Typography

The typography system relies exclusively on **Inter**, utilizing its systematic and utilitarian nature to provide a clean, modern structure. 

Hierarchy is established through significant scale shifts and weight variations rather than color. For editorial impact, `display-lg` uses tighter letter spacing and a heavier weight. Body text utilizes a generous 1.6 line-height to ensure maximum readability against the dark background. Labels and metadata should leverage uppercase styling with slight letter spacing to differentiate from narrative content.

## Layout & Spacing

This design system uses a **Fixed Grid** philosophy for desktop to maintain the intentionality of an editorial layout. 

- **Grid:** A 12-column grid with a 24px gutter. 
- **Margins:** Large 64px external margins on desktop create a "frame" around the content, reinforcing the premium feel. On mobile, margins reduce to 20px.
- **Rhythm:** Vertical spacing is aggressive. Use `section-gap` (80px) between major content blocks to allow the eye to rest. 
- **Alignment:** Narrative text should typically be constrained to an 8-column central span (approx. 720px) to maintain optimal line lengths for reading.

## Elevation & Depth

Depth in this design system is achieved through **Tonal Layers** and **Low-contrast outlines**. 

1. **The Base:** The deepest level is the `#0a0a0a` background.
2. **The Surface:** Interactive or distinct containers (cards, sidebars) use `#121212`. 
3. **The Hairline:** To define edges without adding visual weight, use 1px solid borders in `#1f1f1f`.
4. **Shadows:** Avoid drop shadows. Instead, use a subtle 1px inner stroke for elevated elements to simulate light catching the edge of a physical object.

## Shapes

The shape language is strictly **Sharp (0px)**. 

Every UI element—from buttons and input fields to images and cards—must feature hard 90-degree corners. This reinforces the architectural and print-inspired nature of the design system, distancing it from the "bubbly" aesthetics of consumer social apps.

## Components

- **Buttons:** Primary buttons are solid `#f9f9f8` with `#0a0a0a` text. Secondary buttons are outlined with a 1px `#1f1f1f` border and white text. Use large internal padding (16px 32px).
- **Input Fields:** Bottom-border only (1px `#1f1f1f`) to mimic a signature line. Labels should be small and uppercase above the field.
- **Cards:** No shadows. Use the `#121212` surface color with a 1px `#1f1f1f` border.
- **Dividers:** Horizontal rules should be 1px solid `#1f1f1f`. Use them sparingly to separate major content sections.
- **Lists:** Clean, unstyled lists with significant vertical padding (24px) between items, separated by hairlines.
- **Chips:** Rectangular blocks with a `#1f1f1f` background and `#a1a1aa` text, used for tags or categories.