#!/usr/bin/env bash
set -x

echo "44444444444444444444444444444444444444444444444444444444444 starting angular.sh 4444444444444444444444444444444444444444444444"


# Directories to check
dir1="../core/examples/luigi-example-angular"
dir2="../../core/examples/luigi-example-angular"
dir3="../../core/examples/luigi-example-angular/"

# Function to check if a directory exists
check_directory() {
    if [ -d "$1" ]; then
        echo "Directory exists: $1"
    else
        echo "Directory does not exist: $1"
    fi
}

# Check each directory
check_directory "$dir1"
check_directory "$dir2"
check_directory "$dir3"


set -e    # exit script immediately if any command fails
echo ""
echo "Installing Luigi with Angular and basic configuration"
echo ""
if [[ "$1" = "" ]]; then
  read -p "Luigi project folder name: " folder
else
  folder=$1
  echo "Luigi project folder name: $folder"
fi
# steps to execute line by line

# Define source and destination directories
SOURCE_DIR="../core/examples/luigi-example-angular"
DEST_DIR="test"

# Create the destination directory if it doesn't exist
mkdir -p "$DEST_DIR" && cd "$DEST_DIR"

# Copy the contents from source to destination
cp -r "$SOURCE_DIR"/* "$DEST_DIR"/

# Check if the copy was successful
if [ $? -eq 0 ]; then
    echo "Copy successful: $SOURCE_DIR -> $DEST_DIR"
else
    echo "Copy failed."
    exit 1
fi

npm i
npm run build
npm run start

set +x 