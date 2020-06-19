#!/bin/bash

# Checks if there are changes in blog or website folder
# and generates website if necessary
# Run this script only from Luigi root folder, else git adding won't work.
# ./scripts/hooks/generate-website-blog.sh

function check_and_generate_website() {
  staged_changes=$(git diff --cached --name-only --diff-filter=ACM | grep -e "website/landingpage/" -e "blog/" | wc -l)
  if [[ "$staged_changes" != *"0"* ]]; then
    echo "Changes in website or blog found. Building landingpage"
    BASE=`pwd`
    cd website/landingpage/dev
    npm run build
    RES=$?
    cd $BASE;
    if [ "$RES" != 0 ]; then
      echo "lerna run build.website failed."
      exit 1;
    fi

    if [ -z "$staged_changes" ]; then
      echo "No website or blog changes found. Ok"
    else
      not_staged_md=$(git diff --name-only | grep -e "website/landingpage")
      untracked_landingpage=$(git ls-files -o --exclude-standard | grep "landingpage/public")
      if [ ! -z "$not_staged_md" ] || [ ! -z "$untracked_landingpage" ]; then
        echo "Staging generated website files"
        if [ ! -z "$not_staged_md" ]; then
          echo "$not_staged_md"
          echo "$not_staged_md" | xargs git add
        fi
        if [ ! -z "$untracked_landingpage" ]; then
          echo "$untracked_landingpage"
          echo "$untracked_landingpage" | xargs git add
        fi
        exit 0
      else
        echo "No website or blog changes found. Ok"
      fi
    fi
  fi
}

check_and_generate_website

exit 0
