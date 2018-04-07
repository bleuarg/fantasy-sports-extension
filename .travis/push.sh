#!/bin/sh
set -ev

push() {
  git remote add origin https://${GITHUB_OAUTH_TOKEN}@github.com/bleuarg/fantasy-sports-extension.git # > /dev/null 2>&1
  git push --tags
}

push