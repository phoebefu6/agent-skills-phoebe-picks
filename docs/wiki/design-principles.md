# Design Principles

## Design Read

Agent Skills Phoebe Picks should feel like a clean museum-gallery and magazine index for practical AI Skills. The approved direction combines:

- Museum Gallery visual language.
- Product Catalog filtering and card structure.

The site should feel calm, neat, editorial, and community-minded. It should not feel like a loud AI landing page or a self-proclaimed expert directory.

## Visual System

- Use low-saturation neutrals, off-white or off-black surfaces, and one muted sage or slate accent.
- Avoid highly saturated colors.
- Avoid generic purple-blue AI gradients.
- Avoid decorative blobs, bokeh, noisy backgrounds, or ornamental SVGs.
- Use Georgia only as an editorial heading voice, paired with a system sans body.
- Keep radius modest around 10px, with pill buttons for actions and filters.
- Use a light gallery theme by default. Do not switch to dark mode unless Phoebe explicitly asks.

## Layout

- Lead with the gallery purpose: browse agent Skills by scenario.
- Public skeleton is hero, scenario finder, Skill gallery, and Skill detail drawer.
- A public Stack section is allowed when it shows the audience-facing role of explored Skills, such as discover, taste, build, critique, system, canvas, and motion. Do not turn it into an internal SOP explanation.
- Keep wishlist, testing queue, and SOP notes out of the public homepage.
- Keep the hero short: promise, short intro, follow repo CTA, and current focus panel.
- Hero proof should stay compact: one latest build panel, tidy Skill rows, and clear demo links. Avoid screenshot collages, fake diagrams, faux screenshots, or large blank preview frames.
- Use scenario filters because Phoebe wants Skills organized by situations, not abstract ratings.
- Use cards only for repeated Skill entries and framed panels.
- Skill detail should use a visual map or node layout where possible, not a long plain note page.
- Keep cards stable in size so filtering does not feel jumpy.
- Avoid nested cards.

## Content

- Voice: curious, practical, fun, and honest.
- The first screen should answer: why should someone follow this repo?
- Phoebe is still testing Skills hands-on, but that should not be the lead message. Turn the testing process into reader benefit.
- Public cards should explain 3 good points, 3 can-be-better points, use cases, and demo evidence.
- Rejected or risky Skills should not be promoted publicly.
- Keep the intro short. Readers should be able to browse scenarios and open Skill details quickly.

## Accessibility

- Buttons need real `button` elements.
- Navigation links should point to real page sections.
- Dynamic regions should use `aria-live` where helpful.
- Text must fit on mobile and desktop.
- Detail drawers must be closable by button, backdrop click, and Escape key.
