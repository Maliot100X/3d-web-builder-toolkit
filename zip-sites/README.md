# Zip sites — the user's "perfect 3D sites" (highest-priority references)

| # | Zip | Status | Folder | Analysis |
|---|---|---|---|---|
| 1 | `otis.zip` / `58b2bb1a….zip` (2.5 MB, md5 `114b9f48…`, **byte-identical** re-send) | ✅ studied | `otis-taffy-face-portfolio/` | [ANALYSIS.md](otis-taffy-face-portfolio/ANALYSIS.md) |
| 2 | `selene.zip` (2.8 MB) | ✅ unzipped, built, served, shot | `selene-earthrise-lunar-missions/` | [ANALYSIS.md](selene-earthrise-lunar-missions/ANALYSIS.md) |
| 3 | `naiade.zip` (18.1 MB) | ✅ unzipped, built, served, shot | `naiade-deep-end-jewellery-film/` | [ANALYSIS.md](naiade-deep-end-jewellery-film/ANALYSIS.md) |
| 4 | `visor.zip` (2.3 MB) | ✅ unzipped, built, served, shot | `visor-future-vision-vr-hero/` | [ANALYSIS.md](visor-future-vision-vr-hero/ANALYSIS.md) |

Screenshots (zips 2–4): `screenshots/jpg/<site>-0N-XXpct.jpg` (1440×900) and `<site>-mobile-0N-XXpct.jpg` (390×844) at scroll 0/25/50/75/100 %.
SELENE and NAÏADE share the same author code (`lib/math.ts`, `hooks/useFitText.ts`, `useReveals.ts`, `useReducedMotion.ts` byte-identical; `lib/scroll.ts` nearly so).
None of zips 2–4 use WebGL: their "3D" is a scrubbed frame film (NAÏADE), photographic layer parallax (SELENE) and a masked dual-video occlusion (Visor). Raw WebGL2 lives in Otis only.

## How to study a new zip
Unzip into a descriptive folder, `npm i && npm run build`, `npx vite preview --host 127.0.0.1 --port PORT`, then run
`node ../tools/shoot.mjs http://127.0.0.1:PORT/ screenshots/<name> 0,0.25,0.5,0.75,1` (and again with `390 844` for mobile; run heavy canvas sites one at a time, parallel runs time out in swiftshader),
convert to JPG ≤1600 px in `screenshots/jpg/`, and write `<name>/ANALYSIS.md` with the same template.

`node_modules/` and `dist/` inside each zip site are git-ignored; the source is committed (small).

## History: upload attempts (resolved 2026-11-25 03:43 Europe/Skopje, zips placed in /workspace/uploads/zips/)

### Second upload attempt (2026-11-25, 03:2x Europe/Skopje)
The user re-sent all four zips. They were listed as attachments, but again **none reached the box**: the attachments folder still holds only zip 1 (`58b2bb1a…`), the Live2D model zip and the Layer2D kit, and a filesystem-wide search found nothing. Both of the user's registered machines (the S24 Ultra phone and DESKTOP-GTJ9TKL) were offline, so the files couldn't be pulled with CopyToBox either.

| Re-sent hash | Size | Likely | Status |
|---|---|---|---|
| `cfb1b4d6ddb67c9c9704f6004607b803396908f7dfda118e230e3eac71c9a82c.zip` | 2.4 MB | zip 1 (Otis) re-sent (same size as `58b2bb1a…`) | ❌ not on box, can't diff |
| `5f50ec7c90dbf4ae65a3be29e879a173ba8a300280990fedaee21a75a681b6c3.zip` | 2.7 MB | zip 2 (same size as `97f959ee…`) | ❌ not on box |
| `33b26539dde006998864ac033f0b34b56133e5a923cf524f4c83d86fd744f834.zip` | 17.3 MB | zip 3 (same size as `99f442fd…`); size suggests a frame-film template (NAÏADE or SELENE) | ❌ not on box |
| `f6b24e120d65b92859a4268c23272bc5191dde92af350d9ab319ea0b4b187ea3.zip` | 2.2 MB | zip 4 (same size as `bd924…`) | ❌ not on box |

**How to get them here:** open the Grok Bot desktop app on DESKTOP-GTJ9TKL (so the machine shows as connected) and attach the zips from there, or upload them to Google Drive and share the link. Then run the study steps above for each one.
