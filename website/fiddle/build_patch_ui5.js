console.log('Patching luigi core js');

const replace = require('replace-in-file');
const fs = require('fs');
const fse = require('fs-extra');


const walk = function(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = dir + '/' + file;
    var stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      /* Recurse into a subdirectory */
      results = results.concat(walk(file));
    } else {
      /* Is a file */
      results.push(file);
    }
  });
  return results;
}

const copyDirectory = (from, to, replace) => {
  if (fs.existsSync(to)){
    return;
  }

  fse.copySync(from, to, { overwrite: true}, function (err) {
    if (err) {
      console.error(err);
    } else {
      console.log("success!");
    }
  });
  if (replace){
    replacePath(to);
  }
}

const replacePath = (directory) => {
  let allFiles = walk(directory).filter(file => file.endsWith(".js"));
  allFiles.forEach(file => {
    replace.sync({
      files: file,
      from: /@ui5\//g,
      to: `/vendor/ui5/`,
    });
    replace.sync({
      files: file,
      from: /dist\//g,
      to: ``,
    });

    replace.sync({
      files: file,
      from: /"lit-html\//g,
      to: '"/vendor/lit-html/',
    });
  });
}



try{
  copyDirectory(__dirname+"/node_modules/@ui5/webcomponents/dist", __dirname+"/public/vendor/ui5/webcomponents", true);
  copyDirectory(__dirname+"/node_modules/@ui5/webcomponents-base/dist", __dirname+"/public/vendor/ui5/webcomponents-base", true);
  copyDirectory(__dirname+"/node_modules/@ui5/webcomponents-icons/dist", __dirname+"/public/vendor/ui5/webcomponents-icons", true);
  copyDirectory(__dirname+"/node_modules/@ui5/webcomponents-localization/dist", __dirname+"/public/vendor/ui5/webcomponents-localization", true);
  copyDirectory(__dirname+"/node_modules/@ui5/webcomponents-theme-base/dist", __dirname+"/public/vendor/ui5/webcomponents-theme-base", true);
  copyDirectory(__dirname+"/node_modules/@ui5/webcomponents-fiori/dist", __dirname+"/public/vendor/ui5/webcomponents-fiori", true);
  copyDirectory(__dirname+"/node_modules/lit-html", __dirname+"/public/vendor/lit-html", false);


  // let allFiles = walk(__dirname+"/public/vendor/ui5").filter(file => file.endsWith(".js"));
  // //allFiles = ['/Users/i304602/luigi/luigi/website/fiddle/public/vendor/ui5/webcomponents/Assets.js']
  //
  // allFiles.forEach(file => {
  //   replace.sync({
  //     files: file,
  //     from: /@ui5\//g,
  //     to: `/vendor/ui5/`,
  //   });
  //    replace.sync({
  //     files: file,
  //     from: /dist\//g,
  //     to: ``,
  //   });
  //
  //   replace.sync({
  //     files: file,
  //     from: /"lit-html\//g,
  //     to: '"/vendor/lit-html/',
  //   });
  // });

}catch (error){
  console.error('Error occurred:', error);
}



// const options = {
//   files: 'node_modules/@luigi-project/core/luigi.js',
//   from: `import(e)`,
//   to: `import(/* webpackIgnore: true */ e)`,
// };

// try {
//     const results = replace.sync(options);
//     console.log('Replacement results:', results);
// }
// catch (error) {
//     console.error('Error occurred:', error);
// }
//


