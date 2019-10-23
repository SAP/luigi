# Luigi Documentation

Based on Sapper with Svelte3, Webpack

## Running

Development:

`npm run install`

`npm run start`

Open [http://localhost:4000](http://localhost:4000), micro frontend is hosted on port 4001 and defined dynamically in configuration and sapper serve.

Production build:

`npm run export`

`npm run export:serve`

Open [http://localhost:5000](http://localhost:5000), it is exported to `public` folder and the micro frontend is stored in subfolder `docu-microfrontend`.

## How it works

**In Development:**
Sapper serves files stored in **/static** as static files available on root level (eg. `<img src='/filename.png'>`).
Luigi Core is stored in **/static/luigi**, so it gets exported too. 
Configuration generation is bundling also to **/static/luigi/**.

**Exporting:**
Config is built and Sapper exports all sources to **__sapper__/export**. Static files and docu files are mixed up and not ready to serve in this state. The script **./scripts/move-export.sh** takes care of the folder structure and moves the files with proper structure into **./public**
This is the folder that gets deployed.
