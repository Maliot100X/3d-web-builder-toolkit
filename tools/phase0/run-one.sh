#!/bin/bash
# usage: run-one.sh <name> <port> [urlpath]
cd "$(dirname "$0")"; source recipes.sh; HERE=$PWD
REF=/workspace/3d-web-toolkit/references; SS=/workspace/3d-web-toolkit/references-screenshots/phase0
n=$1; PORT=$2; path=${3:-/}
for line in "${R[@]}"; do IFS='|' read -r nm wd ins bld srv <<<"$line"; [ "$nm" = "$n" ] && break; done
cd "$REF/$n/$wd"
case "$srv" in
  static:*) d=${srv#static:}; setsid python3 -m http.server $PORT --bind 127.0.0.1 -d "$d" >/dev/null 2>&1 & ;;
  cmd:*) c=${srv#cmd:}; c=${c//\\\$PORT/$PORT}; c=${c//\$PORT/$PORT}; setsid bash -c "$c" > $HERE/logs/$n.serve.log 2>&1 & ;;
  *) echo "{\"name\":\"$n\",\"skipped\":\"${srv#none:}\"}" > $HERE/runs/$n.json; exit 0;;
esac
SP=$!
for i in $(seq 1 90); do curl -s -o /dev/null "http://127.0.0.1:$PORT$path" && break; sleep 1; done
res=$(cd /workspace/3d-web-toolkit/tools && timeout 150 node shoot2.mjs "http://127.0.0.1:$PORT$path" "$SS/$n" 2>&1 | tail -1)
echo "{\"name\":\"$n\",\"port\":$PORT,\"path\":\"$path\",\"result\":${res:-null}}" > $HERE/runs/$n.json
kill -- -$SP 2>/dev/null; kill $SP 2>/dev/null; sleep 1
cat $HERE/runs/$n.json | cut -c1-400
