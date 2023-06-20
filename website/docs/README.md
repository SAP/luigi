Luigi documentation, deployed via netlify and accessible at https://docs.luigi-project.io


## Development

1. Install dependencies. 

    `npm install`

2. Build Project.

    `npm run build`

3. Run Project: This command will serve Luigi Core on Port 4000 and the Client Microfrontends on Port 4001 on separate servers in parallel. The ports are cleared right before starting the servers to make sure they are not occupied when running docu on these ports locally: 

    `npm run dev`

Visit [localhost:4000](http://localhost:4000) to visit site

## Building for Production

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy the app only the npm run build command is needed. The files are transferred to the public folder from where the Netlify build will serve them on production 
