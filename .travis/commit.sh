#!/bin/sh

setup_git() {
  git config --global user.email "travis@travis-ci.org"
  git config --global user.name "Travis CI"
}

commit() {
  git add package.json
  git commit --message "Travis build: $TRAVIS_BUILD_NUMBER [ci skip]"
}

push() {
  # git remote add origin https://${GH_TOKEN}@github.com/MVSE-outreach/resources.git > /dev/null 2>&1
  git push
}

setup_git
commit
push