#!/bin/bash
staged=$(git diff --cached --name-only --diff-filter=ACM "*.js" "*.ts" "*.json" "*.scss" "*.css" "*.html")
not_staged=$(git diff --name-only --diff-filter=ACM "*.js" "*.ts" "*.json" "*.scss" "*.css" "*.html")

# exclude files that are 'partially staged' (with git add --patch)
filesToFormat=$(comm -13 <(sort <(echo "$not_staged")) <(sort <(echo "$staged")))

[ -z "$filesToFormat" ] && exit 0

echo "$filesToFormat" | xargs ./node_modules/.bin/prettier --write

echo "$filesToFormat" | xargs git add

exit 0
