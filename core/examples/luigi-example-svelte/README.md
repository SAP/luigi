# Sample Luigi application written in Svelte

## Overview

This is the Svelte-based sample application which runs with the Luigi framework.


## Development

1. Install dependencies:

```bash
cd luigi-example-svelte
npm install
```

2. Start webpack to run this application:

```bash
npm run dev
```

Navigate to [localhost:5000](http://localhost:5000). You should see your app running. Edit a component file in `src/routes`, save it, and the page should reload with your changes.

## Build

```
npm run build:prod
npm run serve
```

The build compiles and minimizes the source files for production usage.
The build generates a `public` folder which you can serve using a web server.