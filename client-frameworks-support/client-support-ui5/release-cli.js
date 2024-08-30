const GitHub = require('github-api');
const fs = require('fs');
const readline = require('readline');
const packageJson = require('./dist/package.json');
const color = require('cli-color');

const github = new GitHub({
  token: process.env.GITHUB_TOKEN
});
const repo = github.getRepo('SAP', 'luigi');

const logWarning = str => console.log(color.yellow.bold(str));
const logSuccess = str => console.log(color.green.bold(str));
const logError = str => console.log(color.redBright.bold(str));

/**
 * Fetch the client-support-ui5 releases and return them in an array
 * @returns array of releases
 */
async function getUI5SupportLibReleases() {
  try {
    const { data: releases } = await repo.listReleases();
    const ui5SupportLibReleases = [];
    releases.forEach(release => {
      if (release.tag_name.startsWith('client-support-ui5/v')) {
        ui5SupportLibReleases.push(release);
      }
    });
    return ui5SupportLibReleases;
  } catch (error) {
    console.error('Can not fetch client-support-ui5 releases.', error.message);
    return null;
  }
}

/**
 * Get the current Date and return it in a yyy-mm-dd format for the header of a release in the changelog
 * @returns string with current date
 */
function getCurrentDate() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  let month = (currentDate.getMonth() + 1).toString();
  let day = currentDate.getDate().toString();

  if (month.length < 2) {
    month = '0' + month;
  }
  if (day.length < 2) {
    day = '0' + day;
  }

  return `${year}-${month}-${day}`;
}

/**
 * Update package.json with new version
 * @param {*} version for the release
 */
function updateVersionInPgkJson(version) {
  packageJson.version = version;
  fs.writeFileSync('./dist/package.json', JSON.stringify(packageJson, null, 4));
  logSuccess('Updated client-support-ui5/dist/package.json');
}

/**
 * Formats a list of pull requests into a Markdown-compatible string.
 * Each pull request is converted into a string containing the PR number,
 * title, and user information, all formatted as a Markdown list item.
 *
 * @param {Array} pullRequests - An array of pull request objects.
 * @returns {string} A formatted string with each pull request as a Markdown list item.
 */
function formatPullRequests(pullRequests) {
  return pullRequests
    .map(pr => `* [#${pr.number}](${pr.html_url}) ${pr.title} ([@${pr.user.login}](${pr.user.html_url}))`)
    .join('\n');
}

/**
 * Categorizes a list of pull requests based on their labels and whether they have been merged since the last client-support-ui5 release.
 *
 * @param {Array<Object>} pullRequests - An array of pull request objects to be categorized based on the label.
 * @param {Object} lastUI5SupportLibRelease - An object representing the last client-support-ui5 release.
 *
 * @returns {Object} An object containing four arrays that categorize the pull requests:
 *   - `breakingPulls`: An array of pull requests labeled as "breaking" changes.
 *   - `enhancementPulls`: An array of pull requests labeled as "enhancement".
 *   - `bugPulls`: An array of pull requests labeled as "bug".
 *   - `noLabelPulls`: An array of pull requests that are associated with the "client-support-ui5" label but don't have any of the specific labels ("breaking", "enhancement", "bug"). Should be checked manually.
 */
function categorizePullRequests(pullRequests, lastUI5SupportLibRelease) {
  const categorizedPulls = {
    breakingPulls: [],
    enhancementPulls: [],
    bugPulls: [],
    noLabelPulls: []
  };

  pullRequests.forEach(pr => {
    const labels = pr.labels.map(label => label.name);

    if (labels.includes('client-support-ui5') && pr.merged_at > lastUI5SupportLibRelease.published_at) {
      if (labels.includes('breaking')) {
        categorizedPulls.breakingPulls.push(pr);
      } else if (labels.includes('bug')) {
        categorizedPulls.bugPulls.push(pr);
      } else if (labels.includes('enhancement')) {
        categorizedPulls.enhancementPulls.push(pr);
      } else {
        categorizedPulls.noLabelPulls.push(pr);
      }
    }
  });

  return categorizedPulls;
}

/**
 * Update package.json and add changes to changelog
 */
async function prepareRelease() {
  const lastUI5SupportLibRelease = (await getUI5SupportLibReleases())[0];
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const question = color.bold.cyan(
    `Version you want to release (current version ${lastUI5SupportLibRelease.tag_name.replace(
      'client-support-ui5/v',
      ''
    )})? `
  );
  rl.question(question, async version => {
    if (packageJson.version >= version) {
      logWarning('Version already exists. Please check.');
      rl.close();
      return;
    } else if (version.startsWith('v')) {
      logWarning('Please type only a number, e.g. 1.3.0');
      rl.close();
      return;
    }

    updateVersionInPgkJson(version);

    try {
      const { data: pullRequests } = await repo.listPullRequests({ state: 'closed' });
      const { breakingPulls, enhancementPulls, bugPulls, noLabelPulls } = categorizePullRequests(
        pullRequests,
        lastUI5SupportLibRelease
      );
      const ui5SupportLibBreakingChanges = formatPullRequests(breakingPulls);
      const ui5SupportLibEnhancementChanges = formatPullRequests(enhancementPulls);
      const ui5SupportLibBugChanges = formatPullRequests(bugPulls);
      const ui5SupportLibNoLabelChanges = formatPullRequests(noLabelPulls);

      const changelogPath = './CHANGELOG.md';

      //Add compare link to the end of the file
      const lastline = `\n[v${version}]: https://github.com/SAP/luigi/compare/${lastUI5SupportLibRelease.tag_name}...client-support-ui5/v${version}`;

      //read file before append last line to file, otherwise it will not be written
      fs.readFileSync(changelogPath, 'utf8');
      fs.appendFileSync(changelogPath, lastline, 'utf8', err => {
        console.log('Append lastline to Changelog', lastline);
        if (err) {
          logError('Cannot write compare link to the last line:', err);
          return;
        }
      });

      //Add the new release entry to the changelog after the comment (in the changelog)
      const newChangelog = `\n\n## [v${version}] (${getCurrentDate()})\n\n${
        ui5SupportLibBreakingChanges ? `#### ":boom: Breaking Change"\n${ui5SupportLibBreakingChanges}\n\n` : ''
      }${ui5SupportLibEnhancementChanges ? `#### :rocket: Added\n\n${ui5SupportLibEnhancementChanges}\n\n` : ''}${
        ui5SupportLibBugChanges ? `#### :bug: Fixed\n\n${ui5SupportLibBugChanges}\n\n` : ''
      }${ui5SupportLibNoLabelChanges ? `#### :internal: Issue with no label\n\n${ui5SupportLibNoLabelChanges}\n` : ''}`;
      fs.readFile(changelogPath, 'utf8', (err, data) => {
        if (err) {
          logError('Cannot read file when trying to add release to changelog file:', err);
          return;
        }

        const searchText = '<!--Generate the changelog using release cli. -->';

        //Find searchText and add after the searchText the new release to the changelog
        if (data.includes(searchText)) {
          const newData = data.replace(searchText, `${searchText}\n\n${newChangelog}`);
          fs.writeFile(changelogPath, newData, 'utf8', err => {
            if (err) {
              console.error('Cannot write data to file:', err);
              return;
            }
          });
        } else {
          console.log('The searchText (comment) was not found in CHANGELOG file.');
          return;
        }
      });

      logSuccess('Changelog updated successfully!');

      console.log(
        color.bold(`\nThen continue with the following steps:
              1. Run: npm run replace-version-in-docu
              2. Check and modify CHANGELOG.md entries
              3. Add and commit changed files
              4. Follow the rest of our internal release documentation
              `)
      );
    } catch (error) {
      logError('Error generating changelog:', error);
    }
    rl.close();
  });
}

prepareRelease();
