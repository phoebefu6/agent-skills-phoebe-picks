# Skill System Studio — DESIGN.md

## Direction

Use a confident editorial frame with playful semantic color blocks. The page should feel like a working design desk: precise enough for evidence, warm enough for learning, and visibly made rather than templated.

## Core tokens

| Role | Value | Use |
| --- | --- | --- |
| Ink | `#171313` | Primary type, borders, hard shadows |
| Paper | `#fffaf1` | Page canvas |
| Paper strong | `#fff1d2` | Metadata and supporting panels |
| Coral | `#ff5b57` | Primary emphasis and root concepts |
| Sun | `#ffc145` | Discovery and secondary actions |
| Mint | `#36d399` | Definition and positive state |
| Cyan | `#9fe1e7` | Build state |
| Violet | `#7357ff` | System emphasis and focus |
| Rose | `#f6b7d1` | Publish state |

## Typography

- Use the local system sans stack; do not introduce a remote font dependency.
- Display type is oversized, tightly tracked, and compact in line height.
- Body type remains calm, readable, and no smaller than 16px for long copy.
- Eyebrows are uppercase, small, and bold so they act as taxonomy.

## Components

- Cards use an 8px radius, 2px near-black border, and offset hard shadow.
- Buttons use the same border and radius. Primary buttons are ink with white type; secondary buttons are sun yellow.
- Color blocks should carry category or status meaning. Do not scatter the full palette decoratively.
- Use one dominant accent per component. The combined palette belongs in token specimens or the identity mark.

## Layout

- Use generous section spacing and return to a quiet canvas between major ideas.
- Pair a large editorial statement with a smaller evidence panel.
- Keep grids uneven when hierarchy benefits, but collapse to one column on narrow screens.
- Let each artifact remain independently understandable before adding supporting copy.

## Elevation

- Use flat color blocks for most hierarchy.
- Reserve offset hard shadows for important interactive or artifact surfaces.
- Avoid soft glassmorphism, glow, and decorative gradients.

## Accessibility and motion

- Preserve visible focus states and sufficient text contrast.
- Keep reading order identical to visual order.
- Reduce multi-column layouts cleanly below 900px and again below 620px.
- Motion is optional and must not carry meaning; respect `prefers-reduced-motion`.

## Agent guardrails

- Treat this document as direction, not permission to copy a brand literally.
- Preserve the product's information architecture and semantics.
- Keep evidence visible: source, status, coverage, verdict, and improvement notes.
- Do not call an exploring Skill published merely because its artifact looks polished.
