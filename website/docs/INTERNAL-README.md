# Luigi Documentation

Based on Sapper with Svelte3, Webpack

## Running

Development:

`npm install`

`npm run start`

Open [http://localhost:4000](http://localhost:4000), micro frontend is hosted on port 4001 and defined dynamically in configuration and sapper serve.

Production build:

`npm run export`

`npm run export:serve`

Open [http://localhost:5000](http://localhost:5000), it is exported to `public` folder and the micro frontend is stored in subfolder `docu-microfrontend`.

## Developing markdown parser plugins

Markdown are transformed into html using unified/remark2rehype, which has a already an ecosystem of plugins (npm packages are prefixed with rehype-). In order to quickly develop new plugins, a small script executes only the `src/services/markdown.service.js` file with a small markdown dataset defined in `scripts/markdown.unified-preview.js`. The referenced md files are located in `scripts/mocks`.

Single run: `npm run mock:develop-plugins`

If you have nodemon installed globally: `npm run mock:develop-plugins:watch`

You'll see the html output right there in the terminal.

## How it works

**In Development:**
Sapper serves files stored in **/static** as static files available on root level (eg. `<img src='/filename.png'>`).
Luigi Core is stored in **/static/luigi**, so it gets exported too. 
Configuration generation is bundling also to **/static/luigi/**.

**Exporting:**
Config is built and Sapper exports all sources to **__sapper__/export**. Static files and docu files are mixed up and not ready to serve in this state. The script **./scripts/move-export.sh** takes care of the folder structure and moves the files with proper structure into **./public**
This is the folder that gets deployed.
