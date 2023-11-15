const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// Array of folder names
const foldersToBundle = [
  'core',
  'client',
  'client-frameworks-support/testing-utilities',
  'client-frameworks-support/client-support-angular',
  'container',
  'plugins'
];

const foldersToBuild = ['test/e2e-test-application'];

let timeToBundle = 0;
let timeToBuild = 0;

// Check for verbose flag
const verboseFlagIndex = process.argv.indexOf('--verbose');
let isVerbose = verboseFlagIndex !== -1;

// Function to run 'npm run <operation>' in a folder
function runCommand(folder, index, totalFolders, operation) {
  const startTime = new Date();

  return new Promise((resolve, reject) => {
    const command = `cd ${folder} && npm run ${operation}`;

    exec(command, (error, stdout, stderr) => {
      const endTime = new Date();
      const elapsedTime = (endTime - startTime) / 1000;
      timeToBundle += operation === 'bundle' ? elapsedTime : 0;
      timeToBuild += operation === 'build' ? elapsedTime : 0;

      if (error) {
        console.error(`\x1b[31mError when trying to ${operation} packages in ${folder} \x1b[0m`);
        reject(error);
      } else {
        console.log(
          `\x1b[36m[${index +
            1}/${totalFolders}]\x1b[0m: \x1b[33m${folder}\x1b[0m ${operation} successful (\x1b[33m${elapsedTime.toFixed(
            2
          )}s\x1b[0m)`
        );
        // Print logs if needed
        if (isVerbose) {
          console.log('VERBOSE:', stdout);
        }
        resolve();
      }
    });
  });
}

// Function to run 'npm run bundle' in all specified folders
async function runCommandInAllFolders(folders, operation) {
  console.log(
    `\x1b[36m\n\nRunning (npm run ${operation}) in these folders in the following order:\x1b[0m ${
      isVerbose ? '\x1b[41m\x1b[37m(VERBOSE)\x1b[0m' : ''
    }`
  );
  for (const folder of folders) {
    console.log('- ' + folder);
  }

  for (let i = 0; i < folders.length; i++) {
    console.log(`\n\x1b[37m${operation} \x1b[33m${folders[i]}\x1b[0m ...`);
    await runCommand(folders[i], i, folders.length, operation);
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

const symbolicLinkSD = [
  {
    source: 'client/public',
    destination: 'client-frameworks-support/client-support-angular',
    scope: '@luigi-project/client'
  },
  {
    source: 'client-frameworks-support/testing-utilities/dist',
    destination: 'client-frameworks-support/client-support-angular',
    scope: '@luigi-project/testing-utilities'
  },
  {
    source: 'client/public',
    destination: 'test/e2e-js-test-application',
    scope: '@luigi-project/client'
  },
  {
    source: 'core/public',
    destination: 'test/e2e-js-test-application',
    scope: '@luigi-project/core'
  },
  {
    source: 'plugins/auth/public/auth-oauth2',
    destination: 'test/e2e-js-test-application',
    scope: '@luigi-project/plugin-auth-oauth2'
  },
  {
    source: 'client/public',
    destination: 'test/e2e-test-application',
    scope: '@luigi-project/client'
  },
  {
    source: 'client-frameworks-support/client-support-angular/dist/client-support-angular',
    destination: 'test/e2e-test-application',
    scope: '@luigi-project/client-support-angular'
  },
  {
    source: 'core/public',
    destination: 'test/e2e-test-application',
    scope: '@luigi-project/core'
  },
  {
    source: 'plugins/auth/public/auth-oauth2',
    destination: 'test/e2e-test-application',
    scope: '@luigi-project/plugin-auth-oauth2'
  },
  {
    source: 'plugins/auth/public/auth-oidc',
    destination: 'test/e2e-test-application',
    scope: '@luigi-project/plugin-auth-oidc'
  },
  {
    source: 'client-frameworks-support/testing-utilities/dist',
    destination: 'test/e2e-test-application',
    scope: '@luigi-project/testing-utilities'
  },
  {
    source: 'client-frameworks-support/testing-utilities/dist',
    destination: 'client-frameworks-support/testing-utilities/test',
    scope: '@luigi-project/testing-utilities'
  },
  {
    source: 'client/public',
    destination: 'client-frameworks-support/testing-utilities/test',
    scope: '@luigi-project/client'
  }
];

async function symbolicLinkAll() {
  for (let i = 0; i < symbolicLinkSD.length; i++) {
    await createSymbolicLinkFromTo(symbolicLinkSD[i].source, symbolicLinkSD[i].destination, symbolicLinkSD[i].scope);
  }
}

// Create symbolic link before running other commands
async function createSymbolicLinkFromTo(source, destination, scope) {
  try {
    const sourcePath = path.resolve(__dirname, source);
    const linkFolderPath = path.resolve(__dirname, destination, 'node_modules', scope);

    await createSymbolicLink(sourcePath, linkFolderPath);
    console.log(`\x1b[32mSymbolic link created successfully.\x1b[0m : ${sourcePath} => ${linkFolderPath}`);
  } catch (error) {
    console.error('\x1b[31mError creating symbolic link for client package.\x1b[0m', error);
    process.exit(1);
  }
}

symbolicLinkAll().then(() => {
  // Run the 'npm run bundle' command in the specified folders
  runCommandInAllFolders(foldersToBundle, 'bundle').then(() => {
    console.log(`Bundle finished in ${timeToBundle.toFixed(2)}s`);

    // Run the 'npm run build' command in the specified folders
    runCommandInAllFolders(foldersToBuild, 'build').then(() => {
      console.log(`Build finished in ${timeToBuild.toFixed(2)}s\n`);
      console.log(`\nBuild+Bundle finished in ${(timeToBuild + timeToBundle).toFixed(2)}s\n`);
    }, errorHandler);
  }, errorHandler);
});

/**
 * Function to handle the error case for promises
 * @param {*} error error
 */
function errorHandler(error) {
  console.error('Stopping execution of the process due to error:', error);
  process.exit(1);
}
