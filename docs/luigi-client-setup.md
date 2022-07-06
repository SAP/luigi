<!-- meta
{
  "node": {
    "label": "Installation",
    "category": {
      "label": "Luigi Client",
      "collapsible": true
    },
    "metaData": {
      "categoryPosition": 3,
      "position": 0
    }
  }
}
meta -->

# Luigi Client Installation

Luigi Client contains a library that allows your application to use all features of the Luigi framework.

## Installation

Install the client in your project using npm:
```bash
npm install @luigi-project/client
```

Import the client in places where you want to use it, depending on the environment of your choice:
```javascript
var LuigiClient = require('@luigi-project/client');
```
or
```javascript
import LuigiClient from '@luigi-project/client';
```
or, if you are not using any bundler, Luigi is also available as a global object:
```javascript
window.LuigiClient
```
You can see Luigi Client in action by running the [Angular example application](/test/e2e-test-application).

## Usage

This section contains additional instructions and guidelines you can use to work with Luigi Client.

### Generate documentation
Validate and generate documentation using npm:

```bash
npm install
npm run docu
```