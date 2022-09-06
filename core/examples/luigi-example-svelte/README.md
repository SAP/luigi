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

Open it in your browser by going to [localhost:5100](http://localhost:5100).

## Build

1. Build your application
    ```bash
    npm run build:prod
    ```
    
2. Serve your application
    ```bash
    npm run serve
    ```

The build compiles and minimizes the source files for production usage.
The build generates a `public` folder which you can serve using a web server.