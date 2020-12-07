const {
   eslintFiles,
   groupFilesByExtension,
   prettyFiles,
} = require('./pre_commit');
const fs = require('fs');

const getAllFiles = dir => {
   let results = [];
   const list = fs.readdirSync(dir);
   list.forEach(function(file) {
      file = dir + '/' + file;
      const stat = fs.statSync(file);
      if (file.endsWith('node_modules') || file.indexOf('.git') !== -1) {
         return [];
      }

      if (stat && stat.isDirectory()) {
         /* Recurse into a subdirectory */
         results = results.concat(getAllFiles(file));
      } else {
         /* Is a file */
         results.push(file);
      }
   });
   return results;
};

(async () => {
   const files = getAllFiles(__dirname);
   const filesByExtension = groupFilesByExtension(files);
   prettyFiles(filesByExtension);

   let error = false;
   let report = '';
   const extensions = Object.keys(filesByExtension);
   for (const extension of extensions.filter(
      extension => extension === 'ts' || extension === 'js'
   )) {
      const eslintResult = await eslintFiles(filesByExtension[extension]);
      error = error || eslintResult.error;
      if (!!eslintResult.report && eslintResult.report.trim().length > 0) {
         report += eslintResult.report;
      }
   }

   if (error) {
      console.log('Please fix these errors before to commit:' + report);
   }
})().catch(err => {
   console.log(err);
   process.exit(1);
});
