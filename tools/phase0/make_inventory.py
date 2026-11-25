import json, glob, os, re, sys
sys.path.insert(0, os.path.dirname(__file__))
from notes import N
T='/workspace/3d-web-toolkit'; P=T+'/tools/phase0'
def run(n):
    f=f'{P}/runs/{n}.json'
    if not os.path.exists(f): return None
    try: return json.load(open(f))
    except Exception: return {'bad':True}
def status(n):
    f=f'{P}/status/{n}'
    return open(f).read().strip() if os.path.exists(f) else ''
rows=[]; counts={'cloned':0,'built':0,'runs':0,'notweb':0}
for n,(grp,stack,code,lift,lic) in N.items():
    st=status(n); r=run(n); cloned=os.path.isdir(f'{T}/references/{n}')
    counts['cloned']+=cloned
    ins=re.search(r'install=(\w+)',st); bld=re.search(r'build=(\w+)',st)
    ins=ins.group(1) if ins else '-'; bld=bld.group(1) if bld else '-'
    if r and r.get('skipped'): runs='n/a ('+r['skipped']+')'; shots=''; counts['notweb']+=1
    elif r and r.get('result') and r['result'].get('ok') and r['result'].get('shots'):
        runs='✅ runs'; counts['runs']+=1
        shots=', '.join(os.path.relpath(s,T).replace('.png','.jpg') for s in r['result']['shots'][:4])
        ne=len(r['result'].get('errors',[])); runs+=f' ({ne} console err)' if ne else ''
    else: runs='❌ '+(json.dumps(r['result'].get('errors',[])[:1])[:90] if r and r.get('result') else 'no result'); shots=''
    if bld=='ok' or (bld=='skip' and runs.startswith('✅')): counts['built']+=1
    rows.append((n,grp,lic,'✅' if cloned else '❌',ins,bld,runs,stack,code,lift,shots))
out=[]
out.append('# INVENTORY — Phase 0 full setup (2026-11-25)\n')
out.append('Every repo below was **git-cloned** to `references/<owner>__<repo>` (gitignored; recreate with `references-notes/clone-all.sh`), **installed**, **built**, **served on 127.0.0.1 only** and **screenshotted with Playwright at 1440×900** (scroll positions 0/33/66/100 %, or wheel-driven steps for Lenis/Locomotive/100vh apps). Raw per-run JSON (console errors, titles): `tools/phase0/runs/`. Build logs: `tools/phase0/logs/`. Recipes: `tools/phase0/recipes.sh`.\n')
out.append(f"**Counts:** {len(N)} repos · cloned {counts['cloned']} · built/ready {counts['built']} · running+screenshotted {counts['runs']} · not-a-website {counts['notweb']}\n")
out.append('Licence column: "none" = all rights reserved → study and re-implement, never paste code or assets.\n')
out.append('## 1. Repos\n')
out.append('| Repo | Source | Licence | Cloned | Install | Build | Runs | Stack | Real 3D / animation code | Lift for the café | Screenshots |')
out.append('|---|---|---|---|---|---|---|---|---|---|---|')
for r in rows:
    n=r[0]; link=f"[{n.replace('__','/')}](https://github.com/{n.replace('__','/')})"
    out.append('| '+' | '.join([link]+[str(x).replace('|','/') for x in r[1:]])+' |')
# zips / halcyon / live
out.append('\n## 2. Zip sites + Halcyon starter (rebuilt with `vite build`, served from dist)\n')
out.append('| Item | Build | Runs | Real code (see zip-sites/*/ANALYSIS.md) | Screenshots |'); out.append('|---|---|---|---|---|')
zipcode={'zip__otis-taffy-face-portfolio':'src/engine.ts (raw WebGL2 grab-and-stretch mesh), src/FaceCanvas.tsx',
'zip__selene-earthrise-lunar-missions':'MissionLog.tsx (pinned horizontal reel), Trajectory (drawn SVG path), 6-layer Earthrise parallax, dust-clear intro',
'zip__naiade-deep-end-jewellery-film':'scroll-scrubbed WebP frame film + product hold, chapter rail',
'zip__visor-future-vision-vr-hero':'masked VR hero (mask-image reveal + parallax)',
'halcyon__starter':'starter/: Vite+GSAP ScrollTrigger+Lenis+Tailwind4, WebP frame-film hero, three.js vessel.js/hold.js, View Transitions'}
for n,c in zipcode.items():
    r=run(n); st=status(n)
    ok='✅ runs' if r and r.get('result') and r['result'].get('ok') else '❌'
    sh=', '.join(os.path.relpath(s,T).replace('.png','.jpg') for s in (r or {}).get('result',{}).get('shots',[])[:6]) if r and r.get('result') else ''
    out.append(f'| {n} | {st or "-"} | {ok} | {c} | {sh} |')
out.append('\n## 3. Live sites (Playwright, public pages only)\n')
out.append('| URL | Runs | Title | Screenshots |'); out.append('|---|---|---|---|')
for f in sorted(glob.glob(P+'/runs/live__*.json')):
    r=json.load(open(f)); res=r.get('result') or {}
    out.append(f"| {r.get('url')} | {'✅' if res.get('ok') else '❌'} | {res.get('title','')} | {', '.join(os.path.relpath(s,T).replace('.png','.jpg') for s in res.get('shots',[])[:4])} |")
# skills
out.append('\n## 4. Skills added in Phase 0 (skills-library/, each with SOURCE.md)\n')
out.append('Found via `npx skills find` (skills.sh index) + GitHub. 65 new on top of the 52 already there. Free only. Unlicensed upstreams are installed locally but gitignored (only SOURCE.md is pushed).\n')
out.append('| Skill folder | Upstream | Licence | What it is |'); out.append('|---|---|---|---|')
for line in open(T+'/research/skill-installed.tsv',errors='replace'):
    a=line.rstrip('\n').split('\t')
    out.append(f'| `{a[0]}` | {a[1]} | {a[2]} | {a[3].strip(chr(34)).replace("|","/")[:150]} |')
out.append('\nPre-existing 52 skills: see `SKILLS-AND-MCPS.md` and `skills-library/INDEX.md` (gsap-*, threejs-*, emil-*, webq-*, impeccable, taste-skill, ui-ux-pro-max, anthropic-*, true-web-clone, deepgram).\n')
out.append('\n## 5. Contact sheets\n')
for f in sorted(glob.glob(T+'/inventory-sheets/*.jpg')): out.append(f'- `{os.path.relpath(f,T)}`')
open(T+'/INVENTORY.md','w').write('\n'.join(out)+'\n')
print(counts)
