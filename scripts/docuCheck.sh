#!/usr/bin/env bash

set -e # exit on errors

BASE_DIR="$( cd "$(dirname "$0")" ; pwd -P )"

declare -a LUIGI_FOLDERS=(
  "client"
  "core"
)

source $BASE_DIR/shared/bashHelpers.sh

# installPrerequisites() {
#   # link documentation binary if it does not exist
#   local FOLDER=$1
#   echoe "Install documentation prerequisites for $FOLDER"
#   local DOCU_TMP_FOLDER=$BASE_DIR/tmp-docu/$FOLDER
#   mkdir -p $DOCU_TMP_FOLDER

#   cd $DOCU_TMP_FOLDER
#   local NODE_BIN_FOLDER=$BASE_DIR/../$FOLDER/node_modules/.bin
#   if ! [ -L $NODE_BIN_FOLDER/documentation ]; then
#     local DOCU_VERSION=`cat $BASE_DIR/../$FOLDER/package.json | jq --raw-output ".devDependencies.documentation"`
#     # create local package json to make it cachable
#     echo "{\"dependencies\": {\"documentation\": \"$DOCU_VERSION\"}}" > package.json
#     echo "Installing documentation dependency for $FOLDER"
#     npm i
  
#     echo "Linking documentation binary for $FOLDER"
#     mkdir -p $NODE_BIN_FOLDER
#     ln -s $DOCU_TMP_FOLDER/node_modules/.bin/documentation $NODE_BIN_FOLDER/documentation
#   else
#     echo "Documentation binary for $FOLDER already linked"
#   fi
# }

# Lint documentation and check if all docu changes have been commited.
# validateAndGenerateDocumentation() {
#   local FOLDER=$1
#   cd $BASE_DIR/../$FOLDER

#   local DOCU_STEP=`cat package.json | jq --raw-output ".scripts.docu"`
#   if [[ $DOCU_STEP == *"npm"* ]]; then
#     echoe "Validating and generating documentation for $FOLDER"
#     eval $DOCU_STEP
#   else
#     echoe "Validating documentation for $FOLDER"
#     npm run docu:validate
#   fi
# }

validateMdChanges() {
  # verify that there are no changes in md files, exclude styleguide from being checked
  local MD_FILE_CHANGES=`git status | grep '-api.md' | grep -v 'styleguide' | wc -l`
  if [[ $MD_FILE_CHANGES != *"0"* ]]; then
    echoe "Unsaved documentation changes found"
    echo "The following files need to be commited and pushed again:"
    git status | grep '.md'
    exit 1
  else
    echo "Documentation up to date"
  fi
}

# add all folders that are containing documentation steps
# for FOLDER in "${LUIGI_FOLDERS[@]}"
# do

  # installPrerequisites 
  # validateAndGenerateDocumentation "${FOLDER}"
# done

lerna run docu:client:validate
lerna run docu:core:validate
validateMdChanges

echoe "Validation successful, documentation OK"
exit 0
