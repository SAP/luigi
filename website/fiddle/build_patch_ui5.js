console.log('Patching luigi core js');

const replace = require('replace-in-file');
const fs = require('fs');


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


try{
  let allFiles = walk(__dirname+"/public/vendor/ui5").filter(file => file.endsWith(".js"));
  //allFiles = ['/Users/i304602/luigi/luigi/website/fiddle/public/vendor/ui5/webcomponents/Assets.js']

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


