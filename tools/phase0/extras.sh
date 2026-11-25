#!/bin/bash
# zips + Halcyon starter (static dist) + live sites
cd /workspace/3d-web-toolkit; SS=$PWD/references-screenshots/phase0; H=$PWD/tools/phase0
i=4400
for d in zip-sites/otis-taffy-face-portfolio zip-sites/selene-earthrise-lunar-missions zip-sites/naiade-deep-end-jewellery-film zip-sites/visor-future-vision-vr-hero starter; do
  n=zip__$(basename $d); [ $d = starter ] && n=halcyon__starter
  i=$((i+1)); (cd $d && npx vite build >/dev/null 2>&1; echo "build=$?" > $H/status/$n)
  setsid python3 -m http.server $i --bind 127.0.0.1 -d $d/dist >/dev/null 2>&1 & SP=$!; sleep 1
  res=$(cd tools && timeout 180 node shoot2.mjs http://127.0.0.1:$i/ $SS/$n 0,0.2,0.4,0.6,0.8,1 2>&1 | tail -1)
  echo "{\"name\":\"$n\",\"port\":$i,\"path\":\"/\",\"result\":${res:-null}}" > $H/runs/$n.json; kill $SP; echo $n done
done
for u in https://yash-chauhan.vercel.app/ https://portfolio.devlyhub.in/ https://noth.in/ https://maliot100x.github.io/halcyon-demo/ https://mojito-cocktail-seven.vercel.app/ https://spylt-1pvi.vercel.app/; do
  n=live__$(echo $u | sed 's#https://##; s#/$##; s#[/.]#_#g')
  res=$(cd tools && timeout 180 node shoot2.mjs $u $SS/$n 2>&1 | tail -1)
  echo "{\"name\":\"$n\",\"url\":\"$u\",\"result\":${res:-null}}" > $H/runs/$n.json; echo $n done
done
