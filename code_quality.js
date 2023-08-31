const gitChangedFiles = require('git-changed-files');
const prettier = require('prettier');
const prettierConfig = require('./prettier_config.json');
const codeQualityConfig = require('./package.json').codeQuality || {};
const path = require('path');

const fs = require('fs');
const { ESLint } = require('eslint');
const eslint = new ESLint({ fix: true });

const AnsiUp = require('ansi_up').default;
const ansiup = new AnsiUp();

/**
 * Get all files, excluding automatically generated or imported from external libraries.
 * @param dir: path from where recursively get all the files
 * @returns {[]}: list of files (absolut path)
 */
const getAllFiles = () => {
  const options = getOptions();
  if (!options.sourcePaths) {
    return getAllFilesRecoursive(__dirname);
  }
  const sourcePaths = getSourcePaths(options.sourcePaths);
  let results = [];
  sourcePaths.forEach(sourcePath => {
    const files = getAllFilesRecoursive(sourcePath);
    results = results.concat(files);
  });
  return results;
};

const getSourcePaths = sourcePaths => {
  return sourcePaths.split(',').map(sourcePath => path.resolve(__dirname, ...sourcePath.split('/')));
};

const getAllFilesRecoursive = dir => {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = dir + '/' + file;
    const stat = fs.statSync(file);
    if (fileToExclude(file, stat)) {
      return [];
    }
    if (stat && stat.isDirectory()) {
      /* Recurse into a subdirectory */
      results = results.concat(getAllFilesRecoursive(file));
    } else {
      /* Is a file */
      results.push(file);
    }
  });
  return results;
};

const fileToExclude = (file, stat) => {
  if (stat && stat.isDirectory()) {
    return (
      file.endsWith('node_modules') ||
      file.indexOf('.git') !== -1 ||
      file.indexOf('/dist/') !== -1 ||
      file.indexOf('\\dist\\') !== -1
    );
  }
  const fileName = path.basename(file);
  return /(.git|.min.css|.min.js)$/.test(fileName);
};

/**
 * Return all changed files that will be commit to git branch.
 * @returns {Promise<*>}: promise wiht list of files.
 */
const getChangedFiles = async () => {
  const committedGitFiles = await gitChangedFiles({ baseBranch: 'main' });
  return committedGitFiles.unCommittedFiles.filter(file => fs.existsSync(file) && !file.endsWith('package-lock.json'));
};

/**
 * Group list of file paths by extension.
 * @param files: array of file absolute paths
 * @returns {key: 'File extension:, value: Array of file absolute paths}
 */
const groupFilesByExtension = files => {
  return files.reduce((map, file) => {
    try {
      if (file.startsWith('./') || file.indexOf('.') === -1) {
        return map;
      }

      const extension = file.substring(file.lastIndexOf('.') + 1).toLowerCase();
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

/**
 * Execute prettier and write result on same file.
 * @param file: absolute class path
 * @param config: configuration that will be used to prettier the file.
 */
const prettifyFile = (file, config) => {
  try {
    const text = fs.readFileSync(file).toString();
    if (prettier.check(text, config)) {
      return;
    }

    console.log('Running prettier on the file: ' + file);
    fs.writeFileSync(file, prettier.format(text, config));
    return true;
  } catch (error) {
    console.log('Error in running prettier the file ' + file + ': \n' + error);
  }
};

/**
 * Applying prettier on several files. We have a specific configuration for file extension on file prettier_config.json.
 * @param filesByExtension: we pass a Map json object where the key is the extension, value is an Array with absolute file paths
 */
const prettifyFiles = filesByExtension => {
  let filesChanged = 0;
  if (!codeQualityConfig.usePrettier) {
    return; // no need to use pretty;
  }
  Object.keys(filesByExtension).forEach(extension => {
    const files = filesByExtension[extension];
    const config = prettierConfig[extension];
    if (!config) {
      console.log(
        "We don't have any configuration for extension " + extension + ', please add it in file prettier_config.json'
      );
      return;
    }
    files.forEach(file => {
      if (prettifyFile(file, config)) {
        filesChanged++;
      }
    });
  });
  return filesChanged;
};

/**
 * ESlint analysis and fix on an Array of files.
 * @param files: array with absolute file paths
 * @returns {Promise<{}|{report: string, error: boolean}>}
 */
const eslintFiles = async files => {
  if (!codeQualityConfig.useEslint) {
    return {};
  }

  const formatter = await eslint.loadFormatter('stylish');
  let error = false;
  let report = '';
  for (const file of files) {
    try {
      const result = await eslint.lintFiles(file);
      error = error || result.some(res => res.errorCount > 0);
      await ESLint.outputFixes(result);
      const resultText = formatter.format(result);
      if (!!resultText && resultText.trim().length > 0) {
        report += resultText;
      }
    } catch (exception) {
      error = true;
      report += 'Error in eslint file ' + file + ':\n' + exception;
    }
  }

  return { error, report };
};

/**
 * Run `prettier` on changed files before commit;
 * You can also call this function using: npm run code-quality-prettier
 */
const preCommitPrettier = async filesByExtension => {
  if (!filesByExtension) {
    const files = await getChangedFiles();
    if (!files) {
      console.log("Couldn't find any file that hand been changed");
      return;
    }
    console.log('File to be analyzed before commit:\n' + files.join('\n'));
    filesByExtension = groupFilesByExtension(files);
  }

  return prettifyFiles(filesByExtension);
};

/**
 * Run `eslint` on changed files before commit;
 * You can also call this function using: npm run code-quality-eslint
 */
const preCommitEslint = async filesByExtension => {
  if (!filesByExtension) {
    const files = await getChangedFiles();
    if (!files) {
      console.log("Couldn't find any file that hand been changed");
      return;
    }
    console.log('File to be analyzed before commit:\n' + files.join('\n'));
    filesByExtension = groupFilesByExtension(files);
  }

  const esLintResult = await eslintFilesByExtension(filesByExtension);
  if (esLintResult.error) {
    console.log('Please fix these errors before to commit:' + esLintResult.report);
    console.log('Eslint executed in ' + esLintResult.numberFiles + ' files ');
    if (codeQualityConfig.eslintStopCommit) {
      process.exit(1);
    }
  } else {
    console.log('Eslint executed in ' + esLintResult.numberFiles + ' files ');
  }
};

/**
 * Run `prettier` and `eslint` on changed files before commit;
 * You can also call this function using: npm run code-quality
 */
const preCommit = async () => {
  const files = await getChangedFiles();
  let shouldFail = false;
  if (!files) {
    console.log("Couldn't find any file that hand been changed");
    return;
  }

  console.log('File to be analyzed before commit:\n' + files.join('\n'));
  const filesByExtension = groupFilesByExtension(files);
  if (codeQualityConfig.usePrettier) {
    console.log('\x1b[33m%s\x1b[0m', 'Running Prettier in pre-commit');
    const nrModifiedFiles = await preCommitPrettier(filesByExtension);
    shouldFail = nrModifiedFiles > 0;
    if (shouldFail) {
      console.log(
        '\x1b[31m%s\x1b[0m',
        `Prettier has modified ${nrModifiedFiles} file(s). Commit will be cancelled. Stage changes and run again.`
      );
    }
  } else {
    console.log('Prettier is disabled. Skipping...');
  }

  if (codeQualityConfig.useEslint) {
    console.log('\x1b[33m%s\x1b[0m', 'Running ESlint in pre-commit');
    await preCommitEslint(filesByExtension);
  } else {
    console.log('ESlint is disabled. Skipping...');
  }
  return shouldFail;
};

/**
 * Execute ESlint analysis and try to fix problems
 * @param filesByExtension: we pass a Map json object where the key is the extension, value is an Array with absolute file paths
 * @returns {Promise<{report: string, numberFiles: number, error: boolean}>}
 */
const eslintFilesByExtension = async filesByExtension => {
  let error = false;
  let report = '';
  let numberFiles = 0;
  const extensions = Object.keys(filesByExtension);
  for (const extension of extensions.filter(extension => extension === 'ts' || extension === 'js')) {
    const esLintFiles = filesByExtension[extension];
    numberFiles += esLintFiles.length;
    const eslintResult = await eslintFiles(esLintFiles);
    error = error || eslintResult.error;
    if (!!eslintResult.report && eslintResult.report.trim().length > 0) {
      report += eslintResult.report;
    }
  }

  return { error, report, numberFiles };
};

/**
 * Run `prettier` and `eslint` on all project files;
 * You can also call this function using: npm run full-code-quality
 */
const full = async () => {
  const files = getAllFiles();
  const filesByExtension = groupFilesByExtension(files);
  await fullPrettier(filesByExtension);
  console.log('Running EsLint on all files. Please wait...');
  await fullEslint(filesByExtension);
};

/**
 * Run `prettier` on all project files;
 * You can also call this function using: npm run full-code-quality
 */
const fullPrettier = async filesByExtension => {
  if (!filesByExtension) {
    const files = getAllFiles();
    filesByExtension = groupFilesByExtension(files);
  }
  prettifyFiles(filesByExtension);
};

/**
 * Run `eslint` on all project files;
 * You can also call this function using: npm run full-code-quality
 */
const fullEslint = async filesByExtension => {
  if (!filesByExtension) {
    const files = getAllFiles();
    filesByExtension = groupFilesByExtension(files);
  }

  const esLintResult = await eslintFilesByExtension(filesByExtension);
  const options = getOptions();
  const reportFile = options.report || 'full_eslint_report.html';
  if (esLintResult.error) {
    fs.writeFileSync(reportFile, ansiup.ansi_to_html(esLintResult.report).replace(/(?:\r\n|\r|\n)/g, '<br/>'));
    console.log('Wrote eslint report to file ' + path.resolve(reportFile));
  }
  console.log(
    "Eslint executed in ' + esLintResult.numberFiles + ' files. Results written in 'full_eslint_report.html' "
  );
};

/**
 * We parse application node parameters; they must be in format -- key1=value1 key2=value2
 * @returns {{}} an json Map object
 */
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

/**
 * This is the method that will be executed with node code_quality.js
 */
(async () => {
  const options = getOptions();
  if (options.mode === 'pre_commit') {
    return await preCommit();
  }
  if (options.mode === 'pre_commit_prettier') {
    return await preCommitPrettier();
  }
  if (options.mode === 'pre_commit_eslint') {
    return await preCommitEslint();
  }
  if (options.mode === 'full') {
    return await full();
  }
  if (options.mode === 'full_prettier') {
    return await fullPrettier();
  }
  if (options.mode === 'full_eslint') {
    return await fullEslint();
  }

  console.error(
    'You need to pass application parameter -- mode=pre_commit|pre_commit-prettier|pre_commit-eslint|full|full-prettier|full-eslint'
  );
})().catch(err => {
  console.log(err);
  process.exit(1);
});
