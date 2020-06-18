#!/bin/bash

# Checks if there are changes in blog or website folder
# and generates website if necessary
# Run this script only from Luigi root folder, else git adding won't work.
# ./scripts/hooks/generate-landingpage.sh

function check_and_generate_website() {
  staged_changes=$(git diff --cached --name-only --diff-filter=ACM | grep -e "website/landingpage/" -e "blog/" | wc -l)
  if [[ "$staged_changes" != *"0"* ]]; then
    echo "Changes in blog or landingpage found. Building landingpage"
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
      not_staged_md=$(git diff --name-only --diff-filter=ACM | grep -e "website/landingpage/public")
      if [ ! -z "$not_staged_md" ]; then
        echo "Staging generated website files"
        echo "$not_staged_md"
        echo "$not_staged_md" | xargs git add
        exit 0
      else
        echo "No docu changes found. Ok"
      fi
    fi
  fi
}

check_and_generate_website

exit 0
