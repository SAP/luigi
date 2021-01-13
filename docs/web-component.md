<!-- meta
{
  "node": {
    "label": "Web Component",
    "category": {
      "label": "Luigi Core"
    },
    "metaData": {
      "categoryPosition": 2,
      "position": 12
    }
  }
}
meta -->

# Web Component

<!-- add-attribute:class:success -->
>**TIP:** You can find some examples how to write/include web components in our test application [Luigi Fiddle](https://fiddle.luigi-project.io).

### Overview

Luigi offers the possibility to open a micro frontend as a web component; if you want to have more information about web component, please have a look at the page: [Web Component](https://developer.mozilla.org/en-US/docs/Web/Web_Components).

For no-complex micro frontend, it can be a good and fast alternative: all the frontend will be loaded in a single javascript file.

In this page you wil find:
-   [Navigation Configuration](#navigation-configuration) - how to configure web component in Luigi Core navigation
-   [Write a Web Component](#write-a-web-component) - quick description how to write a Web Component compatible with Luigi Framework
-   [Luigi Client for web component](#luigi-client-for-web-component) js object injected in that Web Component, to leverage some Luigi core features
-   [Tip: how to inject HTML Template code in web component](#tip-how-to-inject-html-template-code-in-web-component) - recommendation how to inject the html in a Web Component

## Navigation Configuration

If you want to declare a menu item to be open as Web Component, you need to specify this configuration in Luigi config:
```javascript
Luigi.setConfig({
    navigation: { 
   		// To enable CORS Web component Loading: basically you need to add external domains where the Web Components are hosted;
   		// in this examle, we are sepcify that we can load Web Components from everyhere
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
	.......
})
```

### Write a Web Component
Luigi supports Web Component that are slightly different from standard:
- You don’t need to declare any special tag definition inside the component like customElements.define(….., ….)
- Inside the component, Luigi core will inject an object in your class called LuigiClient

Here below, a very easy Hello World web component example:
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

As you could notice from previous example, you can use a LuigiClient instance inside your  web component class. 
It is really important to notice, that this LuigiClient instance is different from the one than you can find in [client library](https://docs.luigi-project.io/docs/luigi-client-setup).

Normal micro frontends are embedded inside iFrame: Luigi offers a library to allow the frontend to communicate with Luigi Core.
In Web Component the situation is quite different: they are not encapsulated into an iframe, they are just loaded inside a shadow element; 
when Luigi Core loads a Web Component, it injects a LuigiClient instance.

### Luigi Client for web component

In this javascript object, you can basically find two elements:
- `this.LuigiClient.uxManager()` : you can use all methods described in [Luigi Core UX](https://docs.luigi-project.io/docs/luigi-core-api?section=ux)
- `this.LuigiClient.linkManager()` : you can use all methods described in [Luigi Navigation](https://docs.luigi-project.io/docs/luigi-core-api?section=luiginavigation)

Below you have a a very easy Hello World web component example which shows an alert:
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

If you want to open a drawer:
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

Sometimes your Web Component has some HTML template that you would like to use, instead of creating DOM elements one by one.
We suggest putting your HTML template inside a variable at the beginning of the js file and append to the web component root in the constructor. An example is given below:
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
