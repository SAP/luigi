#!/usr/bin/env bash
set -e # exit on errors
B_DIR="$( cd "$(dirname "$0")" ; pwd -P )"
BASE_DIR=$B_DIR/../

Color_Off='\033[0m'       # Text Reset
BIBlue='\033[1;34m'      # Light Blue, bold

PUBLIC_DIR=$BASE_DIR/public
STATIC_DIR=$BASE_DIR/static

LUIGI_CORE=$PUBLIC_DIR/luigi-core
LUIGI_CLIENT=$PUBLIC_DIR/luigi-client
SRC=$BASE_DIR/src
SVELTE_BUILD=$BASE_DIR/build


NODE_MODULES_CORE=$BASE_DIR/node_modules/@luigi-project/core
NODE_MODULES_CLIENT=$BASE_DIR/node_modules/@luigi-project/client

# docsearch.js is deprecated and has security issues. Need to use the docsearch.min.css standalone instead
# NODE_MODULES_DOCSEARCH=$BASE_DIR/node_modules/docsearch.js/dist/cdn/docsearch.min.css
DOCS_IMG_ASSETS=$BASE_DIR/../../docs/assets


# SITEMAP_FILE=$BASE_DIR/sitemap.xml
ROBOTSTXT_FILE=$BASE_DIR/robots.txt

mkdir -p $LUIGI_CORE
mkdir -p $LUIGI_CLIENT
mkdir -p $STATIC_DIR/assets
mkdir -p $SRC/assets
mkdir -p $SRC/images
mkdir -p $PUBLIC_DIR/docs
mkdir -p $PUBLIC_DIR/docu-microfrontend
mkdir -p $PUBLIC_DIR/docu-microfrontend/assets
mkdir -p $PUBLIC_DIR/docu-microfrontend/images

# copy luigi client and luigi core to public folder or wherever needed, to avoid using extra dependencies on vite side
cp $NODE_MODULES_CLIENT/* $LUIGI_CLIENT
cp $NODE_MODULES_CORE/* $LUIGI_CORE

# copy docsearch css to public dir - not valid anymore.
# cp $NODE_MODULES_DOCSEARCH $PUBLIC_DIR

# copy docu image assets to assets folder for development use
cp $DOCS_IMG_ASSETS/* $STATIC_DIR/assets

# copy docu image assets to assets folder for production use
cp $DOCS_IMG_ASSETS/* $PUBLIC_DIR/docu-microfrontend/assets
cp $STATIC_DIR/images/* $PUBLIC_DIR/docu-microfrontend/images

# copy docu image assets to images folder for development use


# cp $SITEMAP_FILE $PUBLIC_DIR
cp $ROBOTSTXT_FILE $PUBLIC_DIR

cp -R $STATIC_DIR/public/* $PUBLIC_DIR

# copy redirects file for netlify
cp $BASE_DIR/src/_redirects $PUBLIC_DIR/

echo ""
echo "Documentation files were exported to respective folders"
