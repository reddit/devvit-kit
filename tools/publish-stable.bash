#!/usr/bin/env -S bash -euo pipefail
# Publish a stable release (@latest). See docs/publishing.md.
#
# Environment variables:
# - VERSION_TYPE: Required release type: patch, minor, or major.
# - V: Verbose mode. Defaults to off.
#
# Example (if main is v0.0.1-rc.0, publish v0.0.1):
#
#   VERSION_TYPE=patch tools/publish-stable

set -${V:+x}

# Make sure the current branch is up to date. This branch should have a
# local-only commit to revise the changelog.
git pull

echo 'changes since last release'
git --no-pager log "$(git describe --tags --abbrev=0)..@" --pretty=oneline

read -p 'commit changelog; <enter> to continue, <ctrl-c> to abort: '

# Clear outdated artifacts.
npm run clean

# Validate the installation. See `npm help ci`.
npm ci

# This will create a new version commit and tag on the current branch like
# `v1.2.3`.
npm version "$VERSION_TYPE"

version="$(node --print --eval='require("./package").version')"
read -p "ready to publish v${version}; <enter> to continue, <ctrl-c> to abort: "

npm publish --registry=https://registry.npmjs.org

echo "v${version} has been successfully published. Make sure to create a new release in GitHub"
