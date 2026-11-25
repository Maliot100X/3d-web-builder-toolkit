# Scrolltide study (https://www.scrolltide.co/), done 2026-11-25 with headless Playwright, no login, no payment

Scrolltide is a paid library of "cinematic website prompts & templates": each item is a rebuild prompt plus a preview
film. A few items (Otis, SELENE, NAÏADE, Fluxora) expose their prompt free without login. **The user's zip 1 is the free
Otis hero.** The paid Scrolltide MCP was deliberately not used. Preview MP4s and the copied prompts were kept off-repo
on the study box, because they are not ours to redistribute. The prompts also forbid hotlinking their R2 asset bucket.

The site itself is a dark product page: Inter, Space Mono and Bricolage Grotesque, a gradient "Ship websites that move like
the tide" hero, and a grid of autoplaying preview videos. It is 18,000 px tall and most template pages open a paywall
modal after scrolling. **Its own UI is not the bar. The templates are.**

## Files
- `screens/`: desktop at 6 scroll fractions (`-d0…d5`) plus mobile 390 (`-m0`) for home, /free, and templates otis,
  selene, naiade, sprig, seve and aerie; `facts.json` (title, height, video/canvas counts, links). Some later frames show the
  paywall modal.
- `frames/<slug>-sheet.jpg`: 12 evenly spaced frames from each public preview film: how the motion actually unfolds.
- `home.json`, `templates-catalog.txt`: the public catalogue (all slugs and blurbs).
- Scripts in `../tools/` (`crawl-scrolltide.mjs`, `study.mjs`, `probe*.mjs`, `free-prompts.mjs`).

## Per item (from the contact sheets and pages)
| Item | Subject / world | What the scroll does | Type & palette | 3D? |
|---|---|---|---|---|
| **NAÏADE** | jewellery, night swim | macro film of earring and pool scrubbed by scroll; 3 ivory product cards slide in as the camera holds; huge NAÏADE wordmark | Bodoni Moda + Albert Sans + Martian Mono; teal-black + ivory | no, frame film |
| **SELENE** | Moon mission | "scroll to clear the dust", astronaut rises, Earth emerges; six-layer photo parallax; EARTHRISE wordmark; horizontal mission reel | bone/ink, space black | no, layered photos |
| **Otis** (zip 1) | designer portfolio | grab-and-stretch face (WebGL mesh warp), springs back | Satoshi/Instrument Serif; fog + cobalt + mustard | WebGL 2D mesh |
| **Sprig** | soda cans | cans ride flavour-colour waves, kcal gauge, "Your fridge" 12-pack builder | bold grotesk, saturated flavour colours | rendered cans |
| **SÈVE** | perfume | lotus and flask on a mint lake; serif and italic copy over slow camera | serif italics; mint/sage | three.js flask |
| **Aerie** | sky, birds | sun and sky, italic words ("altitude", "Patience"), nest, zoom through an eye | serif italics; sky blues | film |
| **Solano** | fashion shop | walk through a 3D summer house with rails of jackets; product tag card; Calzado steps | warm sand | 3D shop interior |
| **MIRÉ** | fashion label | giant "MI RÉ" with the model between the letters; 360° turn on scroll; pink manifesto; GUEST LIST form | heavy condensed grotesk; white, oxblood, blush | film turn |
| **Sable** | record label | 3D record shelf moves along a timeline, flips to album detail | dark wood, warm | 3D shelf |
| **MOLT** | outerwear | chrome puffer, "the shell comes off", exploded layer diagram | white + chrome | rendered layers |
| **Landside** | travel/ops | top-down people with receipts and tickets | light, playful | top-down renders |
| Perch, Standby, Glacier, Fluxora | (sheets in `frames/`) | same recipe: one subject, one camera move, type-led | | |

## The recipe (summarised in DESIGN-BAR.md)
One subject. One camera move pre-rendered to frames and scrubbed by scroll with holds. Giant type that interacts with
the subject. A serif with italics, a sans and a mono. A palette sampled from the imagery. Commerce cards land during
holds. A preloader counts frames. Everything has a reduced-motion version. No sideways scroll at 390/768/1280/1920.
