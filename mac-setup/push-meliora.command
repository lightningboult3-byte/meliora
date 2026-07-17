#!/bin/bash
cd "$HOME/Documents/U&I/M&E Team/Meliora" || exit 1
if [ -n "$(git status --porcelain)" ]; then
  git add -A && git commit -m "Brief: weekly refresh $(date +%F)" && git push && echo "Pushed $(date)."
else
  echo "No changes to publish $(date)."
fi
