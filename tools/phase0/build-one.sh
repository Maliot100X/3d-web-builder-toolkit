#!/bin/bash
# usage: build-one.sh <name>   -> runs install+build, writes status/<name>
cd "$(dirname "$0")"; source recipes.sh
REF=/workspace/3d-web-toolkit/references
export COREPACK_HOME=/workspace/.corepack-home COREPACK_ENABLE_DOWNLOAD_PROMPT=0 CI=1 NEXT_TELEMETRY_DISABLED=1 HUSKY=0 ASTRO_TELEMETRY_DISABLED=1 NODE_OPTIONS=--max-old-space-size=3072
for line in "${R[@]}"; do IFS='|' read -r n wd ins bld srv <<<"$line"; [ "$n" = "$1" ] || continue
  log=$PWD/logs/$n.log; st=$PWD/status/$n; : >"$log"
  cd "$REF/$n/$wd" || { echo "workdir_missing" >"$st"; exit 1; }
  is=skip; bs=skip
  if [ "$ins" != "-" ]; then echo ">> $ins" >>"$log"; timeout 1500 bash -c "$ins" >>"$log" 2>&1 && is=ok || is=FAIL; fi
  if [ "$bld" != "-" ] && [ "$is" != FAIL ]; then echo ">> $bld" >>"$log"; timeout 1500 bash -c "$bld" >>"$log" 2>&1 && bs=ok || bs=FAIL; fi
  echo "install=$is build=$bs serve=$srv" >"$st"; cat "$st"
done
