# Sample Luigi application written in ReactJS

## Overview
> :information_source: This is an **example app only** aimed to give an insight on the setup with Luigi micro frontends all within a React App. Make sure to adjust the settings according to your development and production requirements.  

This is a minimalistic React-based app which serves **Luigi Core** on the default `index.html` and some simple React-based micro frontends through `sampleapp.html`.

Since you would usually serve **Core** and **Client** micro frontends in different locations/environments, this example only serves as a playground and starting point to understand the setup. 

Webpack is used to bundle this React app.  

Webpack bundles the React logic and webpack dev server is used to serve the `index.html` file as main entry point.

The built React bundle, however, is injected onto `sampleapp.html` instead, which will act as a locally built micro frontend. 


## Development
1. Start the application: 

    `npm run start`

## Build 

1. Build the application: 

    `npm run build`

2. Serve the application:

    `npm run serve`