import fs from 'fs';
import path from 'path';
import semver from 'semver';
import prompts from 'prompts';
import asyncRequest from 'async-request';
import color from 'cli-color';

/**
 * COLORS
 */
const logHeadline = str => console.log(color.bold.cyan(str));
const logStep = str => console.log(color.cyan(str));
const logWarning = str => console.log(color.yellow.bold(str));
const logError = str => console.log(color.redBright.bold(str));

/**
 * PATHS
 */
const base = path.resolve(__dirname, '..', '..', '..');
const pkgJsonPaths = {
  core: path.resolve(base, 'core', 'public', 'package.json'),
  coreIE11: path.resolve(base, 'core', 'public-ie11', 'package.json'),
  client: path.resolve(base, 'client', 'public', 'package.json'),
  clientIE11: path.resolve(base, 'client', 'public-ie11', 'package.json'),
  authOAuth2: path.resolve(
    base,
    'plugins',
    'auth',
    'public',
    'auth-oauth2',
    'package.json'
  ),
  authOIDC: path.resolve(
    base,
    'plugins',
    'auth',
    'public',
    'auth-oidc',
    'package.json'
  )
};

const installPaths = {
  core: path.resolve(base, 'core'),
  client: path.resolve(base, 'client'),
  plugins: path.resolve(base, 'plugins')
};

/**
 * FNS
 */
async function getReleases() {
  const input = await asyncRequest(
    'https://api.github.com/repos/SAP/luigi/releases',
    {
      headers: {
        'User-Agent': 'Luigi Release CLI'
      }
    }
  );
  return JSON.parse(input.body)
    .map(r => r.tag_name)
    .filter((t, i) => i <= 8);
}

function getVersion(pkg) {
  return require(pkgJsonPaths[pkg]).version;
}

function getNextVersion() {
  return semver.inc(getVersion('core'), 'patch');
}

function writeVersion(packagePath, version) {
  const pkgjson = require(packagePath);
  pkgjson.version = version;
  fs.writeFileSync(packagePath, JSON.stringify(pkgjson, null, 2));
}

/**
 * addToChangelog appends the changelog and lastline if it does not exist yet
 * @param {string} versionText the v1.0.0 version string to check if it exists already
 * @param {string} changelog multiline changelog markdown
 * @param {string} lastline version comparison github link
 */
function addToChangelog(versionText, changelog, lastline) {
  const changelogFile = path.resolve(base, 'CHANGELOG.md');
  let md = fs.readFileSync(changelogFile).toString();
  if (md.indexOf(versionText) !== -1) {
    logWarning(
      'WARNING: Version already exist in the changelog, not appending.'
    );
    return;
  }
  // remove committers from changelog

  // add changelog text
  md = md.replace('-->', `-->\n\n${changelog}\n\n`);
  // add github compare link
  md = md += `\n${lastline}`;
  fs.writeFileSync(changelogFile, md);
  logHeadline('Appended changelog');
}

function replaceInAllFiles(search, replace) {
  try {
    // TODO: Getting errors while it is working fine from command line. Seems node cannot handle pipes while evaluating commands.
    // const result = require('child_process').execSync(`cd ${__dirname} && ./replaceInAllFiles.sh "${search}" "${replace}"`, { stdio: [0, 1, 2] });

    logHeadline('Replace version in files:');
    logStep(
      '\nRun now: ',
      `./tools/release-cli/replaceInAllFiles.sh "${search}" "${replace}"`,
      '\n'
    );
  } catch (error) {
    logError('Replace error:', error);
  }
}

/**
 * PROMPT
 */

(async () => {
  const releases = await getReleases();
  const nextVersion = getNextVersion();
  const questions = [
    {
      type: 'text',
      name: 'version',
      message:
        'Version you want to release (current: ' + getVersion('core') + ')?',
      validate: str =>
        semver.valid(str) ? true : 'Invalid version (no valid semver)',
      initial: nextVersion
    },
    {
      type: 'confirm',
      name: 'changelog',
      message: 'Generate the changelog?',
      initial: true
    },
    {
      type: prev => (prev == true ? 'select' : null),
      name: 'prevVersion',
      message: 'Previous version to generate from?',
      choices: releases
    }
  ];

  const input = await prompts(questions);

  /**
   * PACKAGE VERSIONS
   */
  for (const name of Object.keys(pkgJsonPaths)) {
    writeVersion(pkgJsonPaths[name], input.version);
  }
  logHeadline('\nPackages updated to v' + input.version + ':');
  logStep(Object.keys(pkgJsonPaths).join(', '));

  /**
   * CHANGELOG
   */
  if (input.changelog) {
    const prevVersion = releases[input.prevVersion];
    const versionText = '## [v' + input.version + ']';
    let changelog = require('child_process')
      .execSync(
        base +
          '/node_modules/lerna-changelog/bin/cli.js --ignoreCommiters --from ' +
          prevVersion
      )
      .toString()
      .replace('## Unreleased', versionText);

    // strip committers part
    changelog = changelog.slice(0, changelog.indexOf('#### Committers'));

    const lastline = `[v${input.version}]: https://github.com/SAP/luigi/compare/${prevVersion}...v${input.version}`;

    logHeadline('\nPrepared Changelog:');
    logStep(changelog);

    logHeadline('\nChangelog last line:\n');
    logStep(lastline);
    logStep('\n');

    const changelogQuestions = [
      {
        type: 'confirm',
        name: 'prepend',
        message: 'Prepend it to the changelog.md?',
        initial: true
      }
    ];
    const changeloginput = await prompts(changelogQuestions);
    if (changeloginput.prepend) {
      addToChangelog(versionText, changelog, lastline);
    }
  } // end if changelog

  /**
   * UPDATE PACKAGE-LOCKS
   */
  logHeadline('\nInstalling packages to update package-lock.json');
  for (const key in installPaths) {
    logStep(`Installing ${key}`);
    require('child_process').execSync(
      `cd ${installPaths[key]} && npm install`,
      { stdio: [0, 1, 2] }
    );
  }
  logHeadline('Package-lock.json files updated.\n');
  logHeadline('\nRELEASE PREPARED');

  /**
   * REPLACE VERSION IN FILES
   */
  replaceInAllFiles('NEXTRELEASE', `${input.version}`);

  console.log(
    color.bold(`\nThen continue with the following steps:
  1. Check and modify CHANGELOG.md entries
  2. Add and commit changed files
  3. Follow the rest of our internal release documentation
  `)
  );
})();
