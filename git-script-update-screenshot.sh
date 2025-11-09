#!/bin/bash
COMMIT_MSG=$1
git add tests/visual-tests.spec.ts-snapshots/
git commit -m "$COMMIT_MSG"
git push origin $(git subtree split --prefix=tests/visual-tests.spec.ts-snapshots/ main):visuals

if [ $? -eq 0 ]; then
  echo "✅ Successfully updated the screens in git"
else
  echo "❌ Error updating screenshots in git"
fi