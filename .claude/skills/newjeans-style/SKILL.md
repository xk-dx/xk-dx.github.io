---
name: newjeans-style
description: Create NewJeans/Y2K aesthetic frontend interfaces with rabbit motifs, glitch effects, sticker collages, and retro-futuristic vibes. Use when building web components, pages, or applications that need cute, nostalgic, handcrafted feel.
license: Complete terms in LICENSE.txt
---

This skill creates distinctive NewJeans-inspired interfaces with Y2K nostalgia, bunny symbolism, and handcrafted digital aesthetics. Generate working code that feels like a scrapbook from 2002 but built for today.

## Core Aesthetic Principles

**The NewJeans Formula**: Y2K nostalgia + rabbit cuteness + controlled imperfection + high-saturation joy

**Non-Negotiable Elements**:
- **Cursor**: Custom rabbit paw or sparkle pointer
- **Typography**: Pixel fonts (Press Start 2P) + handwritten feel (Gaegu) + retro monospace (VT323)
- **Colors**: Fluorescent pink (#FF66CC), electric blue (#00AAFF), bright orange (#FF9933) - never muted
- **Texture**: Scanlines, noise grain, or CRT screen effects on EVERY page
- **Layout**: Deliberately imperfect - rotated elements, off-grid placement, overlapping components

**Forbidden Patterns**:
- Generic cursors
- Perfect grids or rigid alignment
- Clean/minimal/"modern" aesthetics
- Inter, Roboto, Arial, or any sans-serif default
- Purple gradients on white backgrounds

## Visual Recipe

**Colors (CSS Variables)**:

```css
:root {
  --nj-pink: #FF66CC;
  --nj-blue: #00AAFF;
  --nj-orange: #FF9933;
  --nj-lime: #66FF66;
  --nj-cream: #FFF8E7;
  --nj-black: #1a1a1a;
}
Required Effects:

Scanlines: Overlay with repeating gradient

Glitch: Text-shadow animation on hover

Sticker effect: Drop-shadow + rotation + white border

Custom cursor: SVG rabbit paw (provide base64 fallback)

Layout Rules:

Rotate 20% of elements by -2deg to 3deg

Use clip-path: polygon() for ragged edges

Layer with negative margins

Never center-align everything

Implementation Checklist
Custom font imports (Press Start 2P, Gaegu, VT323)

Scanline overlay fixed positioned

No two elements perfectly aligned

Glitch effect on at least one heading

Fluorescent pink accent somewhere

Custom cursor working

Noise texture or scanlines visible

Handcrafted feel (rotations, uneven spacing)

Output Format
Deliver HTML/CSS/JS that:

Works standalone in any browser

Embeds all styles (no external dependencies except Google Fonts)

Includes scanlines and custom cursor

Has at least 3 rotated/staggered elements

Never uses the word "inter" in font-family