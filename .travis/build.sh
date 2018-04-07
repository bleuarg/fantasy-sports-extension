#!/bin/bash
set -ev;
yarn test;
gitversion /Output json /ShowVariable MajorMinorPatch;
gitversion /Output json /ShowVariable MajorMinorPatch | xargs yarn run build --versionOverride;

if [ "${TRAVIS_PULL_REQUEST}" = "false" ] && [ "${TRAVIS_BRANCH}" = "master" ]; then
  gitversion /Output json /ShowVariable MajorMinorPatch | xargs npm version
  sh .travis/push.sh
fi