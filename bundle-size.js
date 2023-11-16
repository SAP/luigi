/**
 * This file is used to run the bundleSizeOnly scrpt to check if bundle size threshold is not exceded
 */

const { execSync } = require('child_process');
const path = require('path');

// List of folders to run bundleSizeOnly script needed for pipeline
const folders = ['core', 'client', 'plugins'];

console.log('Running bundleSizeOnly to check core, client, plugins file size limit not exceeded');
// Run "bundleSizeOnly" script in each folder
for (const folder of folders) {
  try {
    console.log(`\x1b[33m\n\nRunning "bundleSizeOnly" in ${folder}\x1b[32m...\x1b[0m`);
    const commandToRun = `npm run --prefix ${folder} bundlesizeOnly`;
    console.log(commandToRun);

    const logs = execSync(commandToRun, { encoding: 'utf-8', stdio: 'inherit' });
    console.log(logs);
    console.log(`\x1b[32m"bundleSizeOnly" completed successfully in ${folder}\x1b[0m\n\n`);
  } catch (error) {
    console.error(`Error running "bundleSizeOnly" in ${folder}:`, error.stderr, error.message);
    process.exit(1);
  }
}
