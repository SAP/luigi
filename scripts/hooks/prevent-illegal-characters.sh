#!/usr/bin/env bash

# Checks and aborts the commit:
#   if (there are files which contain merge conflict markers)
#   OR if (`window.addEventListener` is used 
#           in other files other than EventListenerHelper class)
# conflict_markers = ['<<<<<<<','=======','>>>>>>>']
# Run this script only from Luigi root folder, else not all files will be checked
# ./scripts/hooks/prevent-illegal-characters.sh


function check_conflict_marker() { 
    declare -a illegal_strings=("<<<<<<<" "=======" ">>>>>>>")
    # string diff containing changes already staged for commit
    staged_changes=$(git diff --cached --diff-filter=ACMR -- . ':(exclude)scripts/hooks/prevent-illegal-characters.sh')
    
    for illegal in ${illegal_strings[@]}; do
        if [[ $staged_changes == *$illegal*   ]]; then
            echo "Found illegal string: $illegal"
            echo "Aborting commit!"
            exit 1
        fi
    done
}

function check_addEventListener_wrong_usage() { 
    # git search query returning file names that used window.addEventListener illegally
    illegal_files=$(git diff  --cached --diff-filter=ACMR \
                    -G 'window.addEventListener' --name-only  -- core \
                    ':(exclude)scripts/hooks/prevent-illegal-characters.sh' \
                    ':(exclude)core/src/utilities/helpers/event-listener-helpers.js')
    if [ -n "$illegal_files" ]; then
        echo "The following files should not contain 'window.addEventListener':"
        echo -e "\033[1;31m$illegal_files\033[0m"
        echo "Aborting commit!"
        exit 1
    fi
}

check_conflict_marker

check_addEventListener_wrong_usage
