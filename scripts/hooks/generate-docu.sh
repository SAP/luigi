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

    if [ -z "$staged_changes" ]; then
      echo "No docu changes found. Ok"
    else
      echo "Staging generated md files"
      not_staged_md=$(git diff --name-only --diff-filter=ACM | grep -e ".md")
      echo "$not_staged_md"
      echo "$not_staged_md" | xargs git add
    fi
  fi
}

check_and_generate_docu

exit 0
