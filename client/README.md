# Luigi Client

## Overview

This project contains a library that allows your application to use all features of the [Luigi framework](../core).

## Installation

Install the client in your project using npm:
```bash
npm install @kyma-project/luigi-client
```

Import the client in places where you want to use it, depending on the environment of your choice:
```javascript
var LuigiClient = require('@kyma-project/luigi-client');
```
or
```javascript
import LuigiClient from '@kyma-project/luigi-client';
```
or, if you are not using any bundler, Luigi is also available as a global object:
```javascript
window.LuigiClient
```
You can see the Luigi Client in action by running the [Angular example application](/core/examples/luigi-sample-angular).

## Usage

Additional instructions and guidelines you can use to work with Luigi Client.


### Generate documentation
Validate and generate documentation using npm:

```bash
npm install
npm run docu
```
