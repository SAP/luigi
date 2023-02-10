const { promises: fsPromises } = require('fs');

async function replaceInFile(filename, replacement) {
    try {
        const contents = await fsPromises.readFile(filename, 'utf-8');
        const replaced = contents.replace(/__luigi_dyn_import\(/gi, replacement);

        await fsPromises.writeFile(filename, replaced);
    } catch (err) {
        console.log('Error replacing in file bundle.js', err);
    } finally {
        console.log('Replacing process finished')
    }
}

// export default function replaceDynamicImport() {
replaceInFile('./public/bundle.js', 'import( \/* webpackIgnore: true */');
// }

