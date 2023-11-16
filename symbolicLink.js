const fs = require('fs');
const path = require('path');

// List of symbolic links for the repo
const symbolicLinkList = require('./symbolic-links.json');

/**
 * Iterate over the list of symbolic links and create links throughout the repo as needed
 */
async function symbolicLinkAll() {
  for (let i = 0; i < symbolicLinkList.length; i++) {
    await createSymbolicLinkFromTo(
      symbolicLinkList[i].source,
      symbolicLinkList[i].destination,
      symbolicLinkList[i].scope,
      i,
      symbolicLinkList.length
    );
  }
}

// Create symbolic link from source to destination with a given scope
async function createSymbolicLinkFromTo(source, destination, scope, index, numLinks) {
  try {
    const sourcePath = path.resolve(__dirname, source);
    const linkFolderPath = path.resolve(__dirname, destination, 'node_modules', scope);

    await createSymbolicLink(sourcePath, linkFolderPath);
    console.log(
      `\x1b[32m[${index +
        1}/${numLinks}]: Symbolic link created successfully.\x1b[0m : \x1b[33m${sourcePath} \x1b[0m =>  \x1b[35m${linkFolderPath}\x1b[0m`
    );
  } catch (error) {
    console.error('\x1b[31mError creating symbolic link for client package. Cancelling process... \x1b[0m', error);
    process.exit(1);
  }
}

// Function to create a symbolic link. Deletes destination folder if already exists
function createSymbolicLink(source, target) {
  return new Promise(async (resolve, reject) => {
    try {
      // Check if the destination path already exists
      const destExists = await fs.promises
        .access(target)
        .then(() => true)
        .catch(() => false);

      // If the destination path exists, delete it
      if (destExists) {
        await fs.promises.rm(target, { recursive: true });
      }

      // Create the symbolic link
      fs.symlink(source, target, 'dir', error => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    } catch (error) {
      reject(error);
    }
  });
}

console.log(
  '\x1b[32m\n\n------------- Starting to create symbolic links: \x1b[33m [SOURCE] \x1b[0m=>\x1b[35m [DESTINATION] \x1b[0m -------------->\x1b[0m'
);
symbolicLinkAll().then(() => {
  console.log('\x1b[32m-------------> Finished creating symbolic links <----------------\x1b[0m\n');
}, errorHandler);

/**
 * Function to handle the error case for promises
 * @param {*} error error
 */
function errorHandler(error) {
  console.error('Stopping execution of the process due to error:', error);
  process.exit(1);
}
