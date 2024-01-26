<!-- meta
{
  "node": {
    "label": "Luigi Container",
    "category": {
      "label": "Advanced",
      "collapsible": true
    },
    "metaData": {
      "categoryPosition": 7,
      "position": 3
    }
  }
}
meta -->

# Luigi Container

## Overview

Luigi Container is a [web component](https://developer.mozilla.org/en-US/docs/Web/Web_Components) that can be used to render a Luigi micro frontend without the need of a Luigi Core application. Luigi Container can work with any framework that supports HTML. It can be an easy solution for integrating micro frontends inside already existing apps without the cost of refactoring. You can also have [multiple](#compound-container) micro frontends on the same page.

## Installation

1. Install the Luigi Container [npm](https://www.npmjs.com/) package: `@luigi-project/container` 

```bash
npm install @luigi-project/container
```

2. Import it into your project:

```
import '@luigi-project/container';
```

## Usage 

After importing the package, you can use the Luigi container anywhere in your application. You can configure it just like a regular Luigi application, for example by using [parameters](navigation-parameters-reference.md) such as [viewURL](navigation-parameters-reference.md#viewurl) (which specifies the URL of the micro frontend):

```html
    <luigi-container 
        viewURL="https://www.example-microfronted.com" 
        webcomponent="false" 
        label="my label"
        context='{"label": "Calendar"}'>
    </luigi-container>
```

### Compound Container 

The Luigi compound Container works similarly to Luigi's compound web components [feature](web-component.md#compound-web-components) and allows you to insert multiple micro frontends on the same page. 

You can use the Luigi compound Container as follows:

```html
    <luigi-compound-container 
        context='{"label": "Dashboard"}'
        compoundConfig = { your config here }>
    </luigi-compound-container>
```

## Examples

### Test Application

1. You can find a Luigi Container example application on [GitHub](https://github.com/SAP/luigi/tree/main/container). First, clone the Luigi repository if you haven't already done so:

```bash
git clone git@github.com:SAP/luigi.git
cd luigi/container
```

2. Then, build the bundle and start the example app: 

```bash
npm install
npm run build
npm start
```

The app should be available at `http://localhost:8080` in your browser. 

3. Check `./test-app/index.html` to see how Luigi Container is used.

### API Reference
To make use of all of the container based Luigi functionalities you can take a further look at the API reference:
  - [Luigi Container API](luigi-container-api.md) 
  - [Luigi Compound Container API](luigi-compound-container-api.md) 

### UI5 tutorial

You can follow the [Luigi Container UI5 tutorial](https://developers.sap.com/tutorials/luigi-container.html) to learn how to: 
- Install Luigi Container in an UI5 app with the help of the UI5 Tooling modules
- Use Luigi Container to implement micro frontends  
