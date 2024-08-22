const GitHub = require('github-api');
const fs = require('fs');
const readline = require('readline');
const packageJson = require('./public/package.json');
const color = require('cli-color');

const github = new GitHub({
  token: process.env.GITHUB_TOKEN
});
const repo = github.getRepo('SAP', 'luigi');

const logWarning = str => console.log(color.yellow.bold(str));
const logSuccess = str => console.log(color.green.bold(str));
const logError = str => console.log(color.redBright.bold(str));

async function getContainerReleases() {
  try {
    const { data: releases } = await repo.listReleases();
    const containerReleases = [];
    releases.forEach(release => {
      if (release.tag_name.startsWith('container/v')) {
        containerReleases.push(release);
      }
    });
    return containerReleases;
  } catch (error) {
    console.error('Can not fetch container releases.', error.message);
    return null;
  }
}

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

/*
  Update package.json with new version
*/
function updateVersionInPgkJson(version){
  packageJson.version = version;
  fs.writeFileSync('./public/package.json', JSON.stringify(packageJson, null, 4));
  logSuccess('Updated container/public/package.json');
}

/*
  Update package.json and add changes to changelog
*/
async function prepareRelease() {
  const lastContainerRelease = (await getContainerReleases())[0];
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const question = color.bold.cyan(
    `Version you want to release (current version ${lastContainerRelease.tag_name.replace('container/v', '')})? `
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
    
    updateVersionInPgkJson(version)

    try {
      const { data: pulls } = await repo.listPullRequests({ state: 'closed' });
      const enhancementPulls = [];
      const bugPulls = [];
      const noLabelPulls = [];
      pulls.forEach(pr => {
        const labels = pr.labels.map(label => label.name);
        if (labels.includes('container')) {
          if (pr.merged_at > lastContainerRelease.published_at) {
            if (labels.includes('bug')) {
              bugPulls.push(pr);
            } else if (labels.includes('enhancement')) {
              enhancementPulls.push(pr);
            } else {
              noLabelPulls.push(pr);
            }
          }
        }
      });

      const containerEnhancementChanges = enhancementPulls
        .map(pr => `- [#${pr.number}](${pr.html_url}) ${pr.title} ([@${pr.user.login}](${pr.user.html_url}))`)
        .join('\n');
      const containerBugChanges = bugPulls
        .map(pr => `- [#${pr.number}](${pr.html_url}) ${pr.title} ([@${pr.user.login}](${pr.user.html_url}))`)
        .join('\n');
      const containerNoLabelChanges = noLabelPulls
        .map(pr => `- [#${pr.number}](${pr.html_url}) ${pr.title} ([@${pr.user.login}](${pr.user.html_url}))`)
        .join('\n');

      const changelogPath = './CHANGELOG.md';
      let existingChangelog = fs.existsSync(changelogPath) ? fs.readFileSync(changelogPath, 'utf-8') : '';
      existingChangelog = existingChangelog.replace(/^([^\n]*\n){3}/, '');
      fs.writeFileSync(changelogPath, existingChangelog, 'utf-8');

      const lastline = `[v${version}]: https://github.com/SAP/luigi/compare/${lastContainerRelease.tag_name}...container/v${version}`;
      const newChangelog = `# Changelog\n\n\n## [v${version}] (${getCurrentDate()})\n\n#### :rocket: Added\n\n${containerEnhancementChanges}\n\n#### :bug: Fixed${containerBugChanges}\n\n${containerNoLabelChanges}\n\n\n\n\n\n${existingChangelog}\n${lastline}`;

      fs.writeFileSync(changelogPath, newChangelog);
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
