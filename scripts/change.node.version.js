const exec = require('child_process').exec;
const fs = require('fs');
const path = require('path');

// This script is used to update package dependencies for all modules in the repository. It is used when updating the local node.js version which results in incompatibilities with existing node_modules.

// return list of all module packages
const listModules = () => {
  const lernaPath =  path.join(path.resolve(__dirname), '..', 'lerna.json');
  const lernaConfig = JSON.parse(fs.readFileSync(lernaPath).toString());
  return lernaConfig.packages;
}

// helper async function used to execute our 'npm' commands  
const executeCommand = async (command) => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error('exec error: ' + error);
        reject(stderr);
        return;
      }
      console.log(stdout);
      resolve(stdout);
    });
  });
}

// takes a module as a parameter and deletes its dependencies and then re-installs them sequentially
const executeModule = async (module) => {
    // retrieve path from module
    const pathArray = [path.resolve(__dirname),'..'].concat(module.split('/'));
    const modulePath =  path.join(...pathArray);
    const moduleDependencies =  path.join(modulePath, 'node_modules');
    console.log("Deleting directory " + moduleDependencies);
    fs.rmdirSync(moduleDependencies, { recursive: true });

    process.chdir( modulePath )
    console.log("npm install on directory " + modulePath);
    await executeCommand('npm install');
};


(async () => {
  let modules = listModules();
  console.log('Running npm link @angular/cli');
  await executeCommand('npm link @angular/cli');
  for (let module of modules){
    await executeModule(module);
  }
})();
