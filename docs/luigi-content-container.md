
By default, the Luigi content (top navigation, left navigation and content iframed area) are rendered in the body tag of your Luigi Core application. In this case, the Luigi content is taking the 100% of the viewport

There is also the possibility to render the Luigi elements in any other html container. An example case would be if you want to add a header or a footer on top of the Luigi content. All you have to do is add the html custom attribute `luigi-app-root` the html tag where you want to render the Luigi content. This will be the container of the Luigi content.

If rendering the Luigi content in a custom container, you can set the height and the width of the Luigi content through the General Settings, as can be read [here](./general-settings.md). 

Additionally, please consider the Luigi custom container is positioned relatively when using this option.