const gitChangedFiles = require('git-changed-files');
const prettier = require('prettier');
const prettierConfig = require('./prettier_config.json');
const codeQualityConfig = require('./package.json').codeQuality || {};

const fs = require('fs');
const { ESLint } = require('eslint');
const eslint = new ESLint({ fix: true });

const getAllFiles = dir => {
   let results = [];
   const list = fs.readdirSync(dir);
   list.forEach(function (file) {
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

const getChangedFiles = async () => {
   const committedGitFiles = await gitChangedFiles();
   return committedGitFiles.unCommittedFiles.filter(file =>
      fs.existsSync(file)
   );
};

const groupFilesByExtension = files => {
   return files.reduce((map, file) => {
      try {
         if (file.startsWith('./') || file.indexOf('.') === -1) {
            return map;
         }

         const extension = file
            .substring(file.lastIndexOf('.') + 1)
            .toLowerCase();
         const array = map[extension] || [];
         array.push(file);
         map[extension] = array;
         return map;
      } catch (e) {
         console.error('error --> ', e);
         return {};
      }
   }, {});
};

const prettyFile = (file, config) => {
   try {
      const text = fs.readFileSync(file).toString();
      const pretty = prettier.format(text, config);
      if (text === pretty) {
         return;
      }
      console.log('We did prettier the file ' + file);
      fs.writeFileSync(file, pretty);
   } catch (error) {
      console.log('Error in prettier the file ' + file + ': \n' + error);
   }
};

const prettyFiles = filesByExtension => {
   if (!codeQualityConfig.usePrettier) {
      return; // no need to use pretty;
   }
   Object.keys(filesByExtension).forEach(extension => {
      const files = filesByExtension[extension];
      const config = prettierConfig[extension];
      if (!config) {
         console.log(
            "We don't have any configuration for extension " +
               extension +
               ', please add it in file prettier_config.json'
         );
         return;
      }
      files.forEach(file => prettyFile(file, config));
   });
};

const eslintFiles = async files => {
   if (!codeQualityConfig.useEslint) {
      return {};
   }

   const formatter = await eslint.loadFormatter('stylish');
   let error = false;
   let report = '';
   for (const file of files) {
      const result = await eslint.lintFiles(file);
      error = error || result.some(res => res.errorCount > 0);
      await ESLint.outputFixes(result);
      const resultText = formatter.format(result);
      if (!!resultText && resultText.trim().length > 0) {
         report += resultText;
      }
   }

   return { error, report };
};

const preCommit = async () => {
   const files = await getChangedFiles();
   if (!files) {
      console.log("Couldn't find any file that hand been changed");
      return;
   }
   console.log('File to be analyzed before commit:\n' + files.join('\n'));
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
      if (codeQualityConfig.eslintStopCommit) {
         process.exit(1);
      }
   }
};

const full = async () => {
   const files = getAllFiles(__dirname);
   const filesByExtension = groupFilesByExtension(files);
   // prettyFiles(filesByExtension);

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
      console.log('Resume of ESLint analysis:\n' + report);
   }
};

const getOptions = () => {
   const options = {};

   for (let i = 0; i < process.argv.length; i++) {
      const arg = process.argv[i];
      if (!arg.includes('=')) {
         continue;
      }

      const key = process.argv[i].substring(0, process.argv[i].indexOf('='));
      const value = process.argv[i].substring(process.argv[i].indexOf('=') + 1);
      options[key] = value;
   }
   return options;
};

(async () => {
   const options = getOptions();
   if (options.mode === 'pre_commit') {
      return await preCommit();
   }

   if (options.mode === 'full') {
      return await full();
   }

   console.error('You need to pass application paramter -- mode=pre_commit|full');
})().catch(err => {
   console.log(err);
   process.exit(1);
});

module.exports = { eslintFiles, prettyFiles, groupFilesByExtension };
