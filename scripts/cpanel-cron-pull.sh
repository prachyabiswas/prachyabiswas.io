#!/usr/bin/env bash
# cPanel-side autopull for hosts where SSH is blocked.
# GitHub Actions builds into the `deploy` branch; this script fast-forwards the
# cPanel checkout and restarts Passenger only when the commit actually changed.
set -euo pipefail

APP_PATH="${1:-${CPANEL_APP_PATH:-$HOME/repositories/Prachya-Portfolio}}"
BRANCH="${DEPLOY_BRANCH:-deploy}"

export PATH="/usr/local/bin:/usr/bin:/bin:$PATH"

cd "$APP_PATH"

before="$(git rev-parse HEAD)"
git fetch --prune origin "$BRANCH"
git merge --ff-only FETCH_HEAD
after="$(git rev-parse HEAD)"

if [ "$before" != "$after" ]; then
  mkdir -p tmp
  touch tmp/restart.txt
  echo "Updated $BRANCH to $after and restarted app."
else
  echo "Already on $after; no restart needed."
fi
