# Luigi React Example

> :information_source: This is an **example app only** aimed to give an insight on the setup with Luigi Microfronteds all within a React App. Make sure to adjust the settings according to your development and production requirements.  

This is a simple **minimalistic** React Based App, serving **Luigi Core** on the default **index.html** and some simple React based microfrontends through **sampleapp.html**.

Since usually you would serve **Core** and **Client microfrontends** in different locations/environments this example only serves as a playground and starting point to understand the setup. 

Webpack is used to bundle this React app.  

Webpack bundles the React logic and webpack dev server is used to serve the **index.html** file as main entry point.

The built react bundle however is injected onto **sampleapp.html** instead, which will act as a locally built microfrontend. 


# Development
1. Start app

    `npm run start`

# Production 

1. Build

    `npm run build`

2. Serve

    `npm run serve`