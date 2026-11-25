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

## Second upload attempt (2026-11-25, 03:2x Europe/Skopje)
The user re-sent all four zips. They were listed as attachments, but again **none reached the box**: the attachments folder still holds only zip 1 (`58b2bb1a…`), the Live2D model zip and the Layer2D kit, and a filesystem-wide search found nothing. Both of the user's registered machines (the S24 Ultra phone and DESKTOP-GTJ9TKL) were offline, so the files couldn't be pulled with CopyToBox either.

| Re-sent hash | Size | Likely | Status |
|---|---|---|---|
| `cfb1b4d6ddb67c9c9704f6004607b803396908f7dfda118e230e3eac71c9a82c.zip` | 2.4 MB | zip 1 (Otis) re-sent (same size as `58b2bb1a…`) | ❌ not on box, can't diff |
| `5f50ec7c90dbf4ae65a3be29e879a173ba8a300280990fedaee21a75a681b6c3.zip` | 2.7 MB | zip 2 (same size as `97f959ee…`) | ❌ not on box |
| `33b26539dde006998864ac033f0b34b56133e5a923cf524f4c83d86fd744f834.zip` | 17.3 MB | zip 3 (same size as `99f442fd…`); size suggests a frame-film template (NAÏADE or SELENE) | ❌ not on box |
| `f6b24e120d65b92859a4268c23272bc5191dde92af350d9ab319ea0b4b187ea3.zip` | 2.2 MB | zip 4 (same size as `bd924…`) | ❌ not on box |

**How to get them here:** open the Grok Bot desktop app on DESKTOP-GTJ9TKL (so the machine shows as connected) and attach the zips from there, or upload them to Google Drive and share the link. Then run the study steps above for each one.
