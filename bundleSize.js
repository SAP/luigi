const { execSync } = require('child_process');
const path = require('path');

// List of folders to run bundleSizeOnly script needed for pipeline
const folders = ['core', 'client', 'plugins'];

console.log('Running bundleSizeOnly to check core, client, plugins file size limit not exceeded');
// Run "bundleSizeOnly" script in each folder
for (const folder of folders) {
  const folderPath = path.join(__dirname, folder);
  try {
    console.log(`Running "bundleSizeOnly" in ${folder}...`);
    execSync('npm run bundleSizeOnly', { cwd: folderPath, stdio: 'inherit' });
    console.log(`"bundleSizeOnly" completed successfully in ${folder}\n`);
  } catch (error) {
    console.error(`Error running "bundleSizeOnly" in ${folder}:`, error.message);
  }
}
