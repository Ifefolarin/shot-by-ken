# Design System: Shot by Ken Photography
**Project ID:** 12048644298997101480

---

## 1. Visual Theme & Atmosphere

The design system is anchored in a **Luxury Minimalist** aesthetic tailored for high-end photography. The brand personality is artistic, intentional, and authoritative — positioning the work as a premium service rather than a commodity.

The visual narrative treats the **image as hero**. Expansive whitespace creates a gallery-like breathing room, and the UI remains quiet and subordinate to the photography. Thin lines, restrained color usage, and precise alignment are the defining qualities. The emotional response should be one of calm sophistication and absolute trust in the artist's eye.

**Mood:** Quiet, Airy, Authoritative, Archival, Unhurried

---

## 2. Color Palette & Roles

| Descriptive Name | Hex | Role |
|---|---|---|
| Deep Charcoal | `#1a1a1a` | Primary text, icons, heavy structural elements — the "ink" of the UI |
| Pure Black | `#000000` | Primary and tertiary brand anchor (identical function, max contrast emphasis) |
| Muted Champagne | `#d4cbb3` | Secondary accent — used sparingly on CTAs, active nav states, and warm dividers |
| Light Champagne Container | `#ebe2c9` | Secondary container — tonal backgrounds for highlighted areas |
| Soft Warm White | `#fbf9f9` | Background canvas — slightly off-white to prevent harshness and add tactile warmth |
| Pure White | `#ffffff` | Surface container lowest — used for topmost card surfaces needing maximum brightness |
| Slate Gray | `#747878` | Outline / border — defines containers and dividers without competing with photography |
| Soft Mid-Gray | `#444748` | On-surface-variant — secondary metadata, captions, supporting text |
| Light Border Gray | `#c4c7c7` | Outline variant — subtle dividers, disabled states |
| Surface Neutral | `#efeded` | Surface container — slightly tinted fields and recessed zones |

---

## 3. Typography Rules

This system uses a classic **Serif / Sans-Serif pairing** to balance heritage with modernity.

### Display & Headline — EB Garamond
A classical, high-contrast serif. Its elegant proportions communicate "Luxury" and "Heritage." Use for all large display text, section titles, and editorial headlines.

| Scale | Size | Weight | Line Height | Letter Spacing | Use |
|---|---|---|---|---|---|
| display-lg | 72px | 400 (Regular) | 80px | −0.02em | Hero headlines, desktop |
| display-lg-mobile | 48px | 400 (Regular) | 56px | −0.01em | Hero headlines, mobile |
| headline-md | 40px | 400 (Regular) | 48px | — | Section headings, desktop |
| headline-md-mobile | 32px | 400 (Regular) | 40px | — | Section headings, mobile |

**Key principle:** Maintain large scale differences between display text and body copy to preserve the editorial nature of the layout.

### Body & UI — DM Sans
A geometric, low-contrast sans-serif ensuring legibility at small sizes while maintaining a modern, clean edge.

| Scale | Size | Weight | Line Height | Letter Spacing | Use |
|---|---|---|---|---|---|
| subheading | 14px | 500 (Medium) | 20px | +0.1em | Section labels, nav items, uppercase identifiers |
| body-lg | 18px | 400 (Regular) | 28px | — | Primary body copy |
| body-md | 16px | 400 (Regular) | 24px | — | Secondary body copy, descriptions |
| caption | 12px | 400 (Regular) | 16px | +0.02em | Photo metadata, timestamps, fine print |

**Key principle:** Use generous positive letter-spacing on subheadings and all-caps labels to reinforce the premium, editorial feel.

---

## 4. Component Stylings

### Buttons
- **Primary:** Solid Deep Charcoal (`#1a1a1a`) fill with Soft Warm White (`#fbf9f9`) text
- **Secondary:** Muted Champagne (`#d4cbb3`) fill with Charcoal text, or ghost style with 1px Charcoal border and transparent fill
- **Shape:** Strictly rectangular — **0px border radius**
- **Typography:** DM Sans subheading scale — uppercase, 0.1em letter spacing, 14px
- **Interaction:** No bounce or springy animation; smooth, linear hover transitions only

### Cards & Containers
- **Corners:** Zero-radius — sharp, squared-off edges throughout
- **Background:** Transparent, or Soft Warm White (`#fbf9f9`) for contained surfaces
- **Elevation:** **No drop shadows.** Depth is defined by a **1px solid border in `#c4c7c7`** or simply by whitespace
- **Headlines within cards:** EB Garamond at headline-md scale

### Image Containers
- No borders, no shadows — the image edge itself defines the boundary
- Aspect ratios preserved (no cropping) to respect the photographer's composition
- Loading state: subtle shimmer using Champagne tones
- **Hover:** Gentle scale-up to `1.02×`, smooth linear transition — never bouncy

### Input Fields / Forms
- Bottom border only: `1px solid #c4c7c7` — no surrounding box
- On focus: border transitions to Deep Charcoal (`#1a1a1a`)
- Background: transparent against page canvas
- Labels: DM Sans subheading scale, uppercase

### Navigation
- Centered or split-logo layout with thin, delicate text links
- `1px` solid divider at the bottom of the sticky header
- Active/hover states use a subtle Champagne underline or text shift — no aggressive color block
- Typography: DM Sans subheading scale (uppercase, tracked)

---

## 5. Layout Principles

### Grid
- **Desktop:** Fixed-width 12-column grid, max container width **1440px**, outer margins **80px**, column gutters **32px**
- **Mobile:** 4-column fluid grid, side margins **24px**
- Elements may intentionally "break" the grid or use asymmetrical offsets to mimic high-end magazine layouts

### Vertical Rhythm & Spacing
- **Section gap:** 160px between major content blocks — the eye must rest between sections
- **Stack large:** 32px — within-section spacing
- **Stack medium:** 16px — element groupings
- **Stack small:** 8px — tight relationships (label to field, icon to text)

### Photography Layout
- Full-bleed imagery should remain full-bleed on mobile wherever possible
- Masonry or justified grids with generous gutters (32px+) — never cramped
- No borders or shadows on photographs; the image frame is the composition

### Whitespace Philosophy
Whitespace is not empty — it is the breathing room that signals luxury. Resist the urge to fill space. Every element should feel intentionally placed, not crowded.

---

## 6. Depth & Elevation

The system is deliberately **flat**. Depth is not communicated through traditional shadows.

- **Tonal layering:** Off-white background (`#fbf9f9`) against pure white (`#ffffff`) card surfaces creates a gentle plane separation
- **Low-contrast outlines:** `1px solid #c4c7c7` defines containers when whitespace alone is insufficient
- **Glassmorphism (selective):** On navigation overlays and sticky headers only — `backdrop-blur: 10–20px` — to maintain context behind the UI
- **Motion as depth:** Hover interactions (the 1.02× image scale, fade transitions) express depth through movement rather than static elevation

---

## 7. Shape Language

**All elements use 0px border radius — no exceptions for primary UI.**

Sharp, squared-off corners at every scale: buttons, input fields, image containers, cards, modals. This evokes the precision of physical photo prints, architectural rigour, and high-fashion editorials. The only permissible circle is a small functional avatar or icon where circular form is semantically required.

---

## 8. Motion & Interaction Principles

- **Tone:** Fluid and linear — never bouncy, springy, or aggressive
- **Image hover:** Scale `1.02×` with `transition: transform 0.3s ease`
- **Link hover:** Fade opacity or underline reveal — subtle, not theatrical
- **Page transitions:** Cross-fade preferred over slide; nothing should feel rushed
- **Avoid:** `ease-bounce`, spring physics, dramatic entrance animations that compete with photography

---

## 9. Screens in This Project

| Screen | Type | Notes |
|---|---|---|
| Home - Shot by Ken | Desktop | Primary hero + portfolio preview |
| Portfolio - Shot by Ken | Desktop | Full gallery / work showcase |
| Services & Pricing - Shot by Ken | Desktop | Pricing tiers, service descriptions |
| Book a Session - Shot by Ken | Desktop + Mobile | Booking form and CTA flow |

---

*Generated from Stitch project `12048644298997101480` on 2026-08-15.*
