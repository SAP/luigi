const { exec } = require('child_process');

// Array of folder names
const folders = [
  './',
  'core',
  'client',
  'client-frameworks-support/client-support-angular',
  'client-frameworks-support/testing-utilities',
  'container',
  'plugins',

  // check if/when needed actually. Scripts might not be needed for all build processes
  'scripts',
  'test/e2e-test-application',
  'test/e2e-js-test-application',
  'client-frameworks-support/testing-utilities/test'
  // check if needed
  // 'website/docs',
  // 'website/fiddle',
  // 'website/landingpage',
];
// Check for verbose flag
const verboseFlagIndex = process.argv.indexOf('--verbose');
let isVerbose = verboseFlagIndex !== -1;

// Function to install npm packages in given folder
function installPackages(folder, index, totalFolders) {
  return new Promise((resolve, reject) => {
    const command = `cd ${folder} && npm install`;

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`\x1b[31mError installing npm packages in ${folder} \x1b[0m`);
        reject(error);
      } else {
        console.log(
          `\x1b[32m[${index + 1}/${totalFolders}] : npm packages installed successfully in \x1b[33m${folder}\x1b[0m`
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

// Function to install packages in all folders sequentially
async function installAllPackages() {
  for (let i = 0; i < folders.length; i++) {
    await installPackages(folders[i], i, folders.length);
  }
}

console.log(
  `\x1b[36m\n\nInstalling node_modules packages in these folders in the following order:\x1b[0m ${
    isVerbose ? '\x1b[41m\x1b[37m(VERBOSE)\x1b[0m' : ''
  }`
);
for (const folder of folders) {
  console.log('- ' + folder);
}

console.log('Starting...');

installAllPackages().then(() => {
  console.log('Finished installing packages successfuly.');
}, errorHandler);

/**
 * Function to handle the error case for promises
 * @param {*} error error
 */
function errorHandler(error) {
  console.error('Stopping execution of the process due to error:', error);
  process.exit(1);
}
