# Zip sites — the user's "perfect 3D sites" (highest-priority references)

| # | Zip (attachment hash) | Status | Folder | Analysis |
|---|---|---|---|---|
| 1 | `58b2bb1aed749020ae9bc6d3c20a3d78a07d221c62b70d68a146250d18c18ece.zip` (2.4 MB) | ✅ unzipped, built, served, screenshotted | `otis-taffy-face-portfolio/` | [ANALYSIS.md](otis-taffy-face-portfolio/ANALYSIS.md) |
| 2 | `97f959ee58caf869c6c6b83cddcf7dc89255ca11558def79285c3d9c590cfc2d.zip` (2.7 MB) | ❌ never reached the box | — | pending re-upload |
| 3 | `99f442fdc4f8ef6c79862ceba6b444adfd80f42eeefd2517ed2bafb522266a55.zip` (17.3 MB) | ❌ never reached the box | — | pending re-upload |
| 4 | `bd9246f13e4971738d030077b02e0f745fe6e5a50ba5e956a4b469ee92d48272.zip` (2.2 MB) | ❌ never reached the box | — | pending re-upload |

Zips 2–4 were listed as attached but the files never materialized in the attachments folder (only zip 1 did,
repeated checks throughout the setup run). They were sent from a phone that is offline, so they could not be pulled.
**Re-attach them (ideally from the desktop) and re-run the zip-site study**: unzip into a descriptive folder,
`npm i && npm run build`, `npx vite preview`, then
`node ../tools/shoot.mjs http://localhost:PORT/ screenshots/<name> 0,0.25,0.5,0.75,1`, and write `<name>/ANALYSIS.md`
using the same template as zip 1.

`node_modules/` and `dist/` inside each zip site are git-ignored; the source is committed (small).
