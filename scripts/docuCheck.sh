#!/usr/bin/env bash

set -e # exit on errors

BASE_DIR="$( cd "$(dirname "$0")" ; pwd -P )"

echoe() {
  # find all colors here: https://stackoverflow.com/questions/5947742/how-to-change-the-output-color-of-echo-in-linux#5947802
  # Reset
  Color_Off='\033[0m'       # Text Reset

  # Bold High Intensity
  BIBlack='\033[1;90m'      # Black

  # High Intensity backgrounds
  On_IYellow='\033[0;103m'  # Yellow

  echo ""
  echo ""
  echo -e "${On_IYellow}${BIBlack}${1}${Color_Off}"
  echo ""
}

installPrerequisites() {
  DOCU_VERSION=`cat package.json | jq --raw-output ".devDependencies.documentation"`
  npm i -g documentation@$DOCU_VERSION
}

# Lint documentation and check if all docu changes have been commited.
checkDocu() {
  cd $BASE_DIR/../$1

  DOCU_STEP=`cat package.json | jq --raw-output ".scripts.docu"`
  if [[ $DOCU_STEP == *"npm"* ]]; then
    echoe "Validating and generating documentation for $1"
    eval $DOCU_STEP
  else
    echoe "Validating documentation for $1"
    npm run docu:validate
  fi
}

validateMdChanges() {
  # verify that there are no changes in md files
  MD_FILE_CHANGES=`git status | grep '.md' | wc -l`
  if [[ $MD_FILE_CHANGES != *"0"* ]]; then
    echoe "Unsaved documentation changes found"
    echo "The following files need to be commited and pushed again:"
    git status | grep '.md'
    exit 1
  fi
}

validateAndGenerateDocumentations() {
# add all folders that are containing documentation steps
while read LINE; do
    checkDocu "${LINE}"
done <<HERE
  client
  core
HERE
}

installPrerequisites
validateAndGenerateDocumentations
validateMdChanges

exit 0
