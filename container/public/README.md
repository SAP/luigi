
# Luigi Container 

## Overview
Luigi Container is a [web component](https://developer.mozilla.org/en-US/docs/Web/Web_Components) that can be included in an arbitrary application, in order to render a Luigi micro frontend (iframe or web component based) without the need of being a Luigi Core application.

## Usage
1. Install the container package: `@luigi-project/container` 

```
npm install @luigi-project/container
```

2. Import it into your project:


```
import '@luigi-project/container';
```

3. You can now use the Luigi container as follows anywhere in your application:

```
    <luigi-container 
        viewURL="https://www.example-microfronted.com" 
        webcomponent="false" 
        label="my label"
        context='{"label": "Calendar"}'>
    </luigi-container>
```

4. In a similar way you can use the Luigi compound container as follows:

```
    <luigi-compound-container 
        context='{"label": "Dashboard"}'
        compoundConfig = { your config here }
    </luigi-compound-container>
```


## Development 

Build the bundle and start an example app: 

```bash
npm install
npm run build
npm start
```

Check `./test-app/index.html` for how it is used.