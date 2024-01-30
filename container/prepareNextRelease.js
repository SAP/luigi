/**
 * Script to replace 'NEXT_RELEASE' with the 'package.json' version on the container package.
 *
 * @usage
 * 1. Run: `node replace-version.js`
 * 2. Replace 'your-folder-path' with the target folder.
 *
 * @example
 * $ node prepareNextRelease.js
 * Replaced in file1.txt: 3 occurrences
 * Version replaced successfully in /path/to/your/folder: 1.3.1
 */
const fs = require('fs');
const path = require('path');

const replaceVersionInFolder = folderPath => {
  try {
    // Read package.json file
    const packageJson = JSON.parse(fs.readFileSync('./public/package.json', 'utf8'));


    // Get the version
    const version = packageJson.version;

    // Read all files in the specified folder
    const files = fs.readdirSync(folderPath);

    console.log(`Starting replace next version script in: ${folderPath} folder for version:  ${version} `);

    // Iterate through each file
    files.forEach(file => {
      const filePath = path.join(folderPath, file);

      // Check if it's a file (not a subdirectory)
      if (fs.statSync(filePath).isFile()) {
        // Read the file content
        let fileContent = fs.readFileSync(filePath, 'utf8');

        // Check if the file contains the keyword
        if (fileContent.includes('NEXT_RELEASE')) {
          // Replace NEXT_RELEASE with the actual version
          fileContent = fileContent.replace(/NEXT_RELEASE/g, version);

          // Write the updated content back to the file
          fs.writeFileSync(filePath, fileContent, 'utf8');

          console.log(`Replaced occurrence in file: ${file} `);
        } else {
          console.log(`No occurrences found in ${file}`);
        }
      }
    });

    console.log(`Version replacing script finished. ${folderPath}: ${version}`);
  } catch (error) {
    console.error('Error:', error.message);
  }
};

// Specify the folder path where you want to replace the version
replaceVersionInFolder('./typings');
