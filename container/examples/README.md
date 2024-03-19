
# Luigi Container Examples

## Usage
To run the examples, go to `../container` and run the following commands:

```bash
npm install
npm run build
npm run start-examples
```
This will load a page with 3 different Luigi container examples:

1. A **webcomponent** based microfrontend container:
```
    <luigi-container
      viewURL="./myWebComponent.js"
      webcomponent="true"
      context='{"content":"some extra content"}'
    ></luigi-container>
```
When using web components the [viewURL](https://docs.luigi-project.io/docs/navigation-parameters-reference?section=viewurl) parameter expects a javacript file that contains the web component.

2. An **iframe** based microfrontend container:
```
    <luigi-container
      viewURL="./microfrontend.html"
    ></luigi-container>
```
When using iframes the [viewURL](https://docs.luigi-project.io/docs/navigation-parameters-reference?section=viewurl) parameter expects a HTML file that contains the iframe.

3. A **compound container** that inserts 4 microfrontends in one page:
```
    <luigi-compound-container
      id="compound1"
      webcomponent="true"
      context='{"content":"some extra content"}'
    ></luigi-compound-container>
```
The *compoundConfig* parameter works similar to the [compound parameter](https://docs.luigi-project.io/docs/navigation-parameters-reference?section=compound). It is used to configure your compound microfrontend structure by letting you arrange a customizable grid layout of the microfrontends. In this example we have 2 columns and 4 web components.

```
    yourCompoundContainerElement.compoundConfig = {
      renderer: { 
        use: 'grid', 
        config: { 
          columns: '1fr 1fr', 
          gap: '20px',
        } 
      },
      children: [
        {
          id: 'input1',
          viewUrl: './myCompoundWebComponent1.js',
        },
        {
          viewUrl: './myCompoundWebComponent2.js',
        },
        {
          viewUrl: './myCompoundWebComponent3.js',
        },
        {
          viewUrl: './myCompoundWebComponent4.js',
        },
      ]
    };
```

