# Sample Luigi application written in OpenUI5

## Overview

This is the OpenUI5-based sample application which runs with the Luigi framework.


## Development


To run this application, follow these steps:

1. Make sure you have [UI5 CLI](https://sap.github.io/ui5-tooling/pages/CLI/) installed by executing the command: 
    ```bash
    npm install --global @ui5/cli
    ```

2. Install Dependencies
    ```bash
    npm install
    ```
        
3. Run the server with the following command:
    ```bash
    npm start
    ```
    
4. Open it in your browser by going to [http://localhost:8080/index.html/](http://localhost:8080/index.html).


### Build

1. Build your application
    ```bash
    npm run build
    ```
    
2. Serve your application
    ```bash
    npm run serve
    ```


The build compiles and minimizes the source files for production usage.
The build generates a `dist` folder which you can serve using a web server.
