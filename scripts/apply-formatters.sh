#!/bin/bash

# Prettier does formatting for all files except .html, which are svelte components

function format_with_prettier() {
    staged=$(git diff --cached --name-only --diff-filter=ACM "*.js" "*.ts" "*.json" "*.scss" "*.css")
    not_staged=$(git diff --name-only --diff-filter=ACM "*.js" "*.ts" "*.json" "*.scss" "*.css")

    # exclude files that are 'partially staged' (with git add --patch)
    files_to_format=$(comm -13 <(sort <(echo "$not_staged")) <(sort <(echo "$staged")))

    [ -z "$files_to_format" ] && return 0

    echo "$files_to_format" | xargs ./node_modules/.bin/prettier --write

    echo "$files_to_format" | xargs git add
}

# Prettyhtml does formatting for .html files only and applies Prettier for embedded content

function format_with_prettyhtml() {
    html_staged=$(git diff --cached --name-only --diff-filter=ACM "*.html")
    html_not_staged=$(git diff --name-only --diff-filter=ACM "*.html")

    html_files_to_format=$(comm -13 <(sort <(echo "$html_not_staged")) <(sort <(echo "$html_staged")))

    [ -z "$html_files_to_format" ] && return 0

    echo "$html_files_to_format" | xargs ./node_modules/.bin/prettyhtml

    echo "$html_files_to_format" | xargs git add
}

format_with_prettier
format_with_prettyhtml

exit 0
