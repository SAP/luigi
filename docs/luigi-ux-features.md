
# Luigi UX features

### Rendering of Luigi application in the DOM

By default, the Luigi content (top navigation, left navigation and content iframed area) are rendered in the body tag of your Luigi Core application. In this case, the Luigi content is taking the whole space from your browser window.

There is also the possibility to render the Luigi content in any other html container. For example in case you want to add a header or a footer on top of the Luigi content. All you have to do is add the html custom attribute `luigi-app-root` to the html tag where you want to render the Luigi content.

If rendering the Luigi content in a custom container as described above, the height and the width of the Luigi content can be set through the [General Settings](./general-settings.md). 

>**NOTE:** When rendering the luigi content in a custom container, please consider the container is positioned relatively when applying your own css styles.

