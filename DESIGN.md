# DESIGN.md — Visual Contract for Hercules

## Design direction
**Sports brand aesthetic.** Think Nike, Adidas, Under Armour.
Clean, bold, minimal. Typography-driven. One accent color. No decoration for decoration's sake.
Every element earns its place.

## Color tokens
```css
--black:      #000000   /* backgrounds (dark mode) */
--white:      #FFFFFF   /* backgrounds (light mode) */
--accent:     #C8FF00   /* electric lime — THE one color. Used sparingly for CTAs and active states */
--accent-dim: #8FB000   /* lime on light backgrounds for contrast */
--gray-100:   #F5F5F5
--gray-200:   #E8E8E8
--gray-400:   #AAAAAA
--gray-600:   #666666
--gray-800:   #222222
--gray-900:   #111111
--red:        #FF2D2D   /* destructive actions only (delete) */
```

**Rules:**
- Lime (#C8FF00) is used ONLY for: primary CTAs, active nav item, selected states, key data points
- Do not add new colors without explicit approval
- No gradients — anywhere, ever
- No glow effects, no box-shadow for decoration (only for elevation/separation)
- No opacity tricks to create new "colors" — use the palette

## Typography
```
Display / Headers:  Barlow Condensed — weights 700, 800, 900
                    UPPERCASE always for section titles and CTAs
Body / Labels:      Barlow — weights 400, 500, 600
```

**Rules:**
- Do not introduce new font families
- Header hierarchy: 900 for hero text, 800 for section titles, 700 for card titles
- Labels and metadata: Barlow 600, uppercase, wide letter-spacing (0.08em)
- No italic except for emphasis within body copy

## Shapes & borders
- **Border radius: 4px maximum** — sharp corners define the sports brand feel
- No pill buttons (border-radius: 50px) — that's the old design, don't reintroduce
- Borders: 1px solid, used for separation not decoration
- No rounded cards

## Buttons
```
Primary CTA:     Full width, lime background (#C8FF00), black text, Barlow Condensed 800, uppercase
Secondary:       Black background, white border, white text
Destructive:     White background, red border (#FF2D2D), red text
Stepper (−/+):   Square buttons, consistent with card borders
```

**No floating action buttons. No circular main CTAs.**

## Components

### Stepper (sets / reps / rest)
- Three columns: [−] [value] [+]
- Value centered, large (Barlow Condensed 700, ~2rem)
- − and + are full-height buttons within their cell
- Border separating cells, consistent with card border color

### Day picker
- 7 equal-width buttons in a row: SU MO TU WE TH FR SA
- Default: dark/outlined
- Selected: lime fill, black text
- No toggle group styling — discrete buttons

### Exercise cards in plan editor
- Full width card, dark background
- Exercise name: Barlow Condensed 800 uppercase
- Stepper row below name
- × remove button top right, red

### Bottom navigation
- 3 items: HOME / PLANS / PROFILE
- Active item: lime color + indicator dot below
- Inactive: gray
- Icons: simple, consistent weight

## Theme
- **Light mode is default**
- Dark mode toggled via sun/moon icon in header, persisted in localStorage
- In light mode: white bg, black text, lime accent stays the same
- In dark mode: black bg, white text, lime accent stays the same
- Every component must work in both themes — no hardcoded colors in components

## Animation & motion
- **Transitions:** 150ms ease for state changes (button press, theme switch)
- **No decorative animations** — no floating, pulsing, glowing UI elements
- **Exercise animations:** video (MP4, loop) or CSS only as fallback
- **Preloader:** HERCULES wordmark fades in on launch, max 1 second, then out
- Page transitions: simple opacity fade, 200ms

## What this design is NOT
- Not a gaming UI (no neon, no particles, no score-pop animations in the UI chrome)
- Not a wellness app (no soft pastels, no rounded bubbly cards)
- Not a generic dark-mode SaaS app (no purple, no blue gradients)
- Not an "AI-generated" app — every element should feel intentional and human-designed
