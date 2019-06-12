#!/usr/bin/env bash

set -e # exit on errors

BASE_DIR="$( cd "$(dirname "$0")" ; pwd -P )"

declare -a LUIGI_FOLDERS=(
  "client"
  "core"
)

source $BASE_DIR/shared/bashHelpers.sh

installPrerequisites() {
  echoe "Install documentation prerequisites"
  mkdir -p $BASE_DIR/tmp-docu

  cd $BASE_DIR/tmp-docu
  DOCU_VERSION=`cat $BASE_DIR/../client/package.json | jq --raw-output ".devDependencies.documentation"`
  # create local package json to make it cachable
  echo "{\"dependencies\": {\"documentation\": \"$DOCU_VERSION\"}}" > package.json
  # npm i

  # link documentation binary if it does not exist
  NODE_BIN_FOLDER="node_modules/.bin/"
  for FOLDER in "${LUIGI_FOLDERS[@]}"
  do
    if [ ! -e $BASE_DIR/../$FOLDER/$NODE_BIN_FOLDER/documentation ]; then
      echo "Linking documentation binary for $FOLDER"
      mkdir -p $BASE_DIR/../$FOLDER/$NODE_BIN_FOLDER
      ln -s $BASE_DIR/tmp-docu/$NODE_BIN_FOLDER/documentation $BASE_DIR/../$FOLDER/$NODE_BIN_FOLDER/documentation
    fi
  done
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
  for FOLDER in "${LUIGI_FOLDERS[@]}"
  do
    checkDocu "${FOLDER}"
  done
}


installPrerequisites
validateAndGenerateDocumentations
validateMdChanges

echoe "Validation successful, documentation OK"
exit 0
