const { exec } = require('child_process');

// Array of folder names
const folders = [
  'core',
  'client',
  'client-frameworks-support/client-support-angular',
  'container',
  'plugins',

  // check if/when needed actually. Scripts might not be needed for all build processes
  'scripts',
  'test/e2e-test-application',
  'test/e2e-js-test-application',

  // check if needed
  // 'website/docs',
  // 'website/fiddle',
  // 'website/landingpage',
];

// - ln -s $TRAVIS_BUILD_DIR/client-frameworks-support/testing-utilities/dist $TRAVIS_BUILD_DIR/client-frameworks-support/client-support-angular/node_modules/@luigi-project/testing-utilities
// - ln -s $TRAVIS_BUILD_DIR/client/public $TRAVIS_BUILD_DIR/client-frameworks-support/client-support-angular/node_modules/@luigi-project/client
// - ln -s $TRAVIS_BUILD_DIR/plugins/auth/public/auth-oauth2 $TRAVIS_BUILD_DIR/test/e2e-test-application/node_modules/@luigi-project/plugin-auth-oauth2
// - ln -s $TRAVIS_BUILD_DIR/plugins/auth/public/auth-oidc $TRAVIS_BUILD_DIR/test/e2e-test-application/node_modules/@luigi-project/plugin-auth-oidc
        

// Function to install npm packages in each folder
function installPackages(folder, index, totalFolders) {
  return new Promise((resolve, reject) => {
    const command = `cd ${folder} && npm install`;

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`\x1b[31mError installing npm packages in ${folder}: ${stderr}\x1b[0m`);
        reject(error);
      } else {
        console.log(`\x1b[32m[${index + 1}/${totalFolders}] : npm packages installed successfully in \x1b[33m${folder}\x1b[0m`);
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

console.log('\x1b[36m\n\nInstalling node_modules packages in these folders in the following order:\x1b[0m');
for (const folder of folders) {
  console.log('- '+ folder);
}

console.log('Starting...')

installAllPackages();

