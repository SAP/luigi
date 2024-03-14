
# Luigi Container 

## Overview
[Luigi Container](https://docs.luigi-project.io/docs/luigi-container) is a [web component](https://developer.mozilla.org/en-US/docs/Web/Web_Components) that can be included in an arbitrary application, in order to render a Luigi micro frontend (iframe or web component based) without the need of being a Luigi Core application.

## Installation
1. Install the container package: `@luigi-project/container` 

```
npm install @luigi-project/container
```

2. Import bundle.js, which can be found in node_modules/@luigi-project/container, into your project:

```
import './bundle.js';
```

## Usage
You can now use the Luigi container as follows anywhere in your application:

```
    <luigi-container 
        viewURL="https://www.example-microfronted.com" 
        webcomponent="false"
        label="my label"
        context='{"label": "Calendar"}'>
    </luigi-container>
```
You can find simple examples that use **webcomponents** and **iframes** at `./examples/container-wc` and `./examples/container-iframe` respectively.

4. In a similar way you can use the Luigi **compound container** to insert multiple microfrontends as follows:

```
    <luigi-compound-container 
        id="compound1"
        context='{"label": "Dashboard"}'
        compoundConfig = { your config here }>
    </luigi-compound-container>
```
An example can be found at `./examples/compound-container/index.html`.