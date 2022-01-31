console.log('Patching luigi core js');

const replace = require('replace-in-file');
const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');

const walk = function(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = dir + '/' + file;
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      /* Recurse into a subdirectory */
      results = results.concat(walk(file));
    } else {
      /* Is a file */
      results.push(file);
    }
  });
  return results;
};

const copyDirectory = (from, to, replace) => {
  if (fs.existsSync(to)) {
    return;
  }

  fse.copySync(from, to, { overwrite: true }, function(err) {
    if (err) {
      console.error(err);
    } else {
      console.log('success!');
    }
  });
  if (replace) {
    replacePath(to);
  }
};

const replacePath = directory => {
  const allFiles = walk(directory).filter(file => file.endsWith('.js'));
  allFiles.forEach(file => {
    replace.sync({
      files: file,
      from: /@ui5\//g,
      to: '../../vendor/ui5/'
    });
    replace.sync({
      files: file,
      from: /dist\//g,
      to: ''
    });

    replace.sync({
      files: file,
      from: /"lit-html\//g,
      to: '"/vendor/lit-html/'
    });
  });
};

try {
  copyDirectory(
    path.join(__dirname, '/node_modules/@ui5/webcomponents/dist'),
    path.join(__dirname, '/public/vendor/ui5/webcomponents'),
    true
  );
  copyDirectory(
    path.join(__dirname, '/node_modules/@ui5/webcomponents-base/dist'),
    path.join(__dirname, '/public/vendor/ui5/webcomponents-base'),
    true
  );
  copyDirectory(
    path.join(__dirname, '/node_modules/@ui5/webcomponents-icons/dist'),
    path.join(__dirname, '/public/vendor/ui5/webcomponents-icons'),
    true
  );
  copyDirectory(
    path.join(__dirname, '/node_modules/@ui5/webcomponents-localization/dist'),
    path.join(__dirname, '/public/vendor/ui5/webcomponents-localization'),
    true
  );
  copyDirectory(
    path.join(__dirname, '/node_modules/@ui5/webcomponents-theming/dist'),
    path.join(__dirname, '/public/vendor/ui5/webcomponents-theming'),
    true
  );
  copyDirectory(
    path.join(__dirname, '/node_modules/@ui5/webcomponents-fiori/dist'),
    path.join(__dirname, '/public/vendor/ui5/webcomponents-fiori'),
    true
  );
  copyDirectory(path.join(__dirname, '/node_modules/lit-html'), path.join(__dirname, '/public/vendor/lit-html'), false);
} catch (error) {
  console.error('Error occurred:', error);
}
