#!/bin/bash
set -ev;
yarn test;
gitversion /Output json /ShowVariable MajorMinorPatch | xargs yarn run build --versionOverride;

if [ "${TRAVIS_PULL_REQUEST}" = "false" ] && [ "${TRAVIS_BRANCH}" = "master" ]; then
  gitversion /Output json /ShowVariable MajorMinorPatch | xargs npm version

  git config credential.helper "store --file=.git/credentials"
  echo "https://${GITHUB_OAUTH_TOKEN}:@github.com" > .git/credentials
  git push --tags
fi