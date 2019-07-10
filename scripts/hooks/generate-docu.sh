#!/bin/bash

# Checks if there are changed core-api or luigi-client js files
# and generates docu if necessary
# Run this script only from Luigi root folder, else git adding won't work.
# ./scripts/hooks/generate-docu.sh

function check_and_generate_docu() {
  staged_changes=$(git diff --cached --name-only --diff-filter=ACM | grep -e "core/src/core-api" -e "client/src" | wc -l)
  if [[ "$staged_changes" != *"0"* ]]; then
    echo "Changes in .js found. Building docu"
    lerna run docu
    RES=$?
    if [ "$RES" != 0 ]; then
      echo "lerna run docu failed."
      exit 1;
    fi

    if [ -z "$staged_changes" ]; then
      echo "No docu changes found. Ok"
    else
      not_staged_md=$(git diff --name-only --diff-filter=ACM | grep -e ".md")
      if [ ! -z "$not_staged_md" ]; then
        echo "Staging generated md files"
        echo "$not_staged_md"
        echo "$not_staged_md" | xargs git add
        exit 0
      else
        echo "No docu changes found. Ok"
      fi
    fi
  fi
}

check_and_generate_docu

exit 0
