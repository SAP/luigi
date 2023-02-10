<!-- meta
{
  "node": {
    "label": "Web Component",
    "category": {
      "label": "Luigi Core",
      "collapsible": true
    },
    "metaData": {
      "categoryPosition": 2,
      "position": 5
    }
  }
}
meta -->

# Web Component

<!-- add-attribute:class:success -->
>**TIP:** You can find some examples of Web Components in our test application [Luigi Fiddle](https://fiddle.luigi-project.io) in the last navigation entry on the left.

### Overview

Luigi offers the possibility to open a micro frontend as a Web Component. For more information, please have a look at the page: [Web Component](https://developer.mozilla.org/en-US/docs/Web/Web_Components).

Web Components can provide a fast-loading alternative for non-complex micro frontends. All micro frontends from trusted sources will be loaded in a single Javascript file.

In this page you wil find:
-   [Navigation Configuration](#navigation-configuration) - how to configure web component in Luigi Core navigation
-   [Write a Web Component](#write-a-web-component) - quick description of how to write a Web Component compatible with Luigi Framework
-   [Luigi Client for web components](#luigi-client-for-web-components) - javascript object injected in a Web Component to leverage Luigi Core features
-   [Tip: how to inject HTML Template code in Web Component](#tip-how-to-inject-html-template-code-in-web-component) - recommendation for how to inject HTML in a Web Component

## Navigation Configuration

If you want to declare a menu item to be open as Web Component, you need to specify this configuration in the Luigi configuration:
```javascript
Luigi.setConfig({
    navigation: {
   		// To enable CORS Web Component Loading: you need to add external domains where the Web Components are hosted;
   		// in this example, we specify that we can load Web Components from everywhere
	    validWebcomponentUrls:['.*?'],
	    nodes: [
		...
		{
		    pathSegment: 'wc',
		    ………
		    viewUrl: '/wc/luigiExampleWC.js',
		    webcomponent: true,
		    ………
		}
		...
		]
	}
})
```

> **NOTE:** With Luigi version 1.21.0 we removed the experimental flag for web components. 

### Write a Web Component

There are a couple of differences between Luigi Web Components and standard ones:
- You don’t need to declare any special tag definition inside the Component such as `customElements.define(….., ….)`
- Inside the Component, Luigi Core will inject an object in your class called `LuigiClient`

Below is a simple Hello World Web Component example:
```javascript
export default class ExampleWC extends HTMLElement {
  constructor() {
    super();
    const template = document.createElement('template');
    template.innerHTML = `<section><p>Hello World!</p></section>`;

    const templateBtn = document.createElement('template');
    templateBtn.innerHTML = '<button>Click me!</button>';

    this._shadowRoot = this.attachShadow({
      mode: 'open',
      delegatesFocus: false
    });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
    this._shadowRoot.appendChild(templateBtn.content.cloneNode(true));

    this.$paragraph = this._shadowRoot.querySelector('p');
    this.$button = this._shadowRoot.querySelector('button');
    this.$button.addEventListener('click', () => {
      if (this.LuigiClient) {
        this.LuigiClient.uxManager().showAlert({
          text: 'Hello from uxManager in Web Component',
          type: 'info'
        });
      }
    });
  }

  set context(ctx) {
    this.$paragraph.innerHTML = ctx.title;
  }
}
```

As shown in the example, you can use a LuigiClient instance inside your Web Component class.
It is really important to note that this LuigiClient instance is different from the one than you can find in our [Client library](https://docs.luigi-project.io/docs/luigi-client-setup).

Normal micro frontends are embedded inside iframe: Luigi offers a library to allow the frontend to communicate with Luigi Core.
In a Web Component the situation is quite different: they are not encapsulated into an iframe, they are just loaded inside a shadow element. When Luigi Core loads a Web Component, it injects a LuigiClient instance.

### Luigi Client for Web Components

In this Javascript object, you can find two elements:
- `this.LuigiClient.uxManager()` : you can use all methods described in [Luigi Core UX](https://docs.luigi-project.io/docs/luigi-core-api?section=ux)
- `this.LuigiClient.linkManager()` : you can use all methods described in [Luigi Navigation](https://docs.luigi-project.io/docs/luigi-core-api?section=luiginavigation)

Below you have a simple Hello World Web Component example which shows an alert:
```javascript
export default class ExampleWC extends HTMLElement {
  constructor() {
    ........
    this.LuigiClient.uxManager().showAlert({
      text: 'Hello from uxManager in Web Component',
      type: 'info'
    });
    ........
  }
}
```

This example opens a drawer:
```javascript
export default class ExampleWC extends HTMLElement {
  constructor() {
    ........
     this.LuigiClient.linkManager().openAsDrawer('Your Drawer Url', {header:true, backdrop:true, size:'s'});
    ........
  }
}
```


## Tip: how to inject HTML Template code in web component

Sometimes your Web Component has an HTML template that you would like to use instead of creating DOM elements one by one.
We suggest putting your HTML template inside a variable at the beginning of the Javascript file, and appending it to the Web Component root in the constructor. An example is given below:
```javascript
const template = document.createElement('template');
template.innerHTML = `
<!DOCTYPE html>
<html lang="EN">
<head>
    <meta charset="utf-8">
    <title></title>
    <link href="//unpkg.com/fundamental-styles@latest/dist/fundamental-styles.css" rel="stylesheet">
    <style>     </style>
    <script></script>
</head>
<body>
      ......
      <main class="fd-page">.....</main>
      ......
</body>
`;

export default class ExampleWC extends HTMLElement {
  constructor() {
     super();
     this.attachShadow({ mode: 'open' });
     this.shadowRoot.appendChild(template.content.cloneNode(true));
     ..........
  }
}
```