#!/bin/bash

# Checks and aborts the commit:
#   if (there are files which contain merge conflict markers)
#   OR if (`window.addEventListener` is used 
#           in other files other than EventListenerHelper class)
# conflict_markers = ['<<<<<<<','=======','>>>>>>>']
# Run this script only from Luigi root folder, else not all files will be checked
# ./scripts/hooks/prevent-illegal-characters.sh


function check_conflict_marker() { 
    # string containing number of changes already staged for commit
    declare -a illegal_strings=("<<<<<<<" "=======" ">>>>>>>")
    staged_changes=$(git diff --cached --diff-filter=ACMR -- . ':(exclude)scripts/hooks/prevent-illegal-characters.sh')
    echo $staged_changes
    for illegal in ${illegal_strings[@]}; do
        if [[ $staged_changes == *$illegal*   ]]; then
            echo "Found illegal string: $illegal"
            echo "Aborting commit!"
            exit 1
        fi
    done
}

check_conflict_marker