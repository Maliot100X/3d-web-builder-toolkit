#!/bin/bash
# regenerate INVENTORY.md (safe to rerun any time)
cd /workspace/3d-web-toolkit && python3 tools/phase0/make_inventory.py && cat tools/phase0/plan.md >> INVENTORY.md
