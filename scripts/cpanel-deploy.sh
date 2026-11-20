#!/usr/bin/env bash
# Pull the latest GitHub code into the cPanel app, rebuild the standalone
# bundle and ask Passenger to restart. Safe to call from GitHub Actions or cron.
set -euo pipefail

APP_PATH="${1:-${CPANEL_APP_PATH:-$HOME/portfolio}}"
BRANCH="${DEPLOY_BRANCH:-main}"

export CI=true
export PATH="/usr/local/bin:/usr/bin:/bin:$PATH"

cd "$APP_PATH"

echo "Deploying $BRANCH into $APP_PATH"
git fetch --prune origin

if ! git rev-parse --verify --quiet "origin/$BRANCH" >/dev/null; then
  echo "Remote branch origin/$BRANCH does not exist." >&2
  exit 1
fi

git reset --hard "origin/$BRANCH"
npm ci
npm run build:cpanel

# Phusion Passenger (used by cPanel Node.js Selector) restarts when this file
# changes. If your host ignores it, click Restart in Node.js Selector.
mkdir -p tmp
touch tmp/restart.txt

echo "Deployed $(git rev-parse --short HEAD)"
