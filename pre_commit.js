const gitChangedFiles = require('git-changed-files');
const prettier = require('prettier');
const prettierConfig = require('./prettier_config.json');
const codeQualityConfig = require('./package.json').codeQuality || {};

const fs = require('fs');
const { ESLint } = require('eslint');
const eslint = new ESLint({ fix: true });

const getChangedFiles = async () => {
   const committedGitFiles = await gitChangedFiles();
   return committedGitFiles.unCommittedFiles;
};

const groupFilesByExtension = files => {
   return files.reduce((map, file) => {
      if (file.startsWith('./') || file.indexOf('.') === -1) {
         return undefined;
      }

      const extension = file.substring(file.lastIndexOf('.') + 1).toLowerCase();
      const array = map[extension] || [];
      array.push(file);
      map[extension] = array;
      return map;
   }, {});
};

const prettyFile = (file, config) => {
   const text = fs.readFileSync(file).toString();
   const pretty = prettier.format(text, config);
   if (text === pretty) {
      return;
   }

   fs.writeFileSync(file, pretty);
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

(async () => {
   const files = await getChangedFiles();
   if (!files) {
      console.log("Couldn't find any file that hand been changed");
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
})().catch(err => {
   console.log(err);
   process.exit(1);
});
