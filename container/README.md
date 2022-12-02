
# Luigi Container (Experimental!)

# Introduction
Luigi Container is a component (web component) that can be included in an arbitrary application rendering a luigi micro frontend (iframe or web component based) without the need of being a luigi core application.

# Usage
1. Install the container package: `@luigi-project/container` 

```
npm install @luigi-project/container
```

2. Import it into your project:


```
    import { LuigiContainer } from '@luigi-project/container';
```

3. Define your own component with a given tag name that you can use in your applicatoin:

```
customElements.define('my-luigi-container', LuigiContainer);
```

Having defined the tag you can now use the Luigi container as follows anywhere in your application:

```
    <my-luigi-container 
        viewURL="https://www.example-microfronted.com" 
        webcomponent="false" 
        label="my label"
        context='{"label": "Calendar"}'>
    </my-luigi-container>
```



# Development 
### Build the bundle and start an example app

```bash
npm install
npm run build
npm start
```

Check [./public/index.html] for how it is used.