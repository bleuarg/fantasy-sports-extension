#!/bin/bash
set -ev;
yarn test;
gitversion /output json /showvariable MajorMinorPatch | xargs yarn run build --versionOverride;

if [ "${TRAVIS_PULL_REQUEST}" = "false" ] && [ "${TRAVIS_BRANCH}" = "master" ]; then
  gitversion /output json /showvariable MajorMinorPatch | xargs npm version
  sh .travis/push.sh
fi