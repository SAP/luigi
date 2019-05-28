#!/bin/bash
# Search and replace specific patterns string from unit test files

# Adding new patterns:
# Add the search pattern to prefix-patterns.txt (new line for each pattern)
# Add it to the sed string, one search&replace pattern is splitted by semicolon
# like s/fdescribe(/describe(/;s/ fit(/ it(/'   while s/ fit(/ it(/' is one
# specific pattern of its own, separated by semi colons

BASE_DIR=`dirname $0`

cleanFiles() {
    FILES=`find $1 -type f -iname '*spec.*' | xargs grep -lFf $BASE_DIR/prefix-patterns.txt`

    TMP_FILENAME='/tmp/replacetmp.file'
    if [ ! -f $TMP_FILENAME ]; then
        TMP_FILE=`mktemp ${TMP_FILENAME}`
    fi

    for FILE in $FILES; do
        # this should work on mac and linux
        sed -e 's/describe.only(/describe(/;s/ it.only(/ it(/;s/fdescribe(/describe(/;s/ fit(/ it(/' ${FILE} > "${TMP_FILE}"
        mv "${TMP_FILE}" ${FILE}
        git add ${FILE}
    done;

    rm -f "${TMP_FILENAME}";

    RESULT=$?
    [ $RESULT -ne 0 ] && echo "PRE-COMMIT TEST PREFIX CLEANUP FAILED" && exit 1
}

# add all folders that are containing tests
while read LINE; do
    # echo "${LINE}"
    cleanFiles "${LINE}"
done <<HERE
$BASE_DIR/../../core/test
$BASE_DIR/../../core/examples/luigi-sample-angular/e2e
$BASE_DIR/../../core/examples/luigi-sample-angular/src/app
$BASE_DIR/../../core/examples/luigi-sample-vue/tests
HERE

exit 0
