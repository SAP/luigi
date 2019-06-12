#!/usr/bin/env bash

set -e # exit on errors

BASE_DIR="$( cd "$(dirname "$0")" ; pwd -P )"

source $BASE_DIR/shared/bashHelpers.sh

installPrerequisites() {
  echoe "Install documentation prerequisites"
  mkdir -p $BASE_DIR/tmp-docu
  cd $BASE_DIR/tmp-docu
  DOCU_VERSION=`cat $BASE_DIR/../client/package.json | jq --raw-output ".devDependencies.documentation"`
  # create local package json to make it cachable
  echo "{\"dependencies\": {\"documentation\": \"$DOCU_VERSION\"}}" > package.json
  npm i
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
  echoe "Validate .md changes"
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

echoe "Validation successful, documentation OK"
exit 0
