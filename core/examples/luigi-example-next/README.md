# Sample Luigi application written in NextJS

## Overview

This is the NextJS-based sample application which runs with Luigi framework.

Due to the nature of NextJS's routing strategy, it is not possible to use `useHashRouting: false` in the Luigi Configuration. If you want to use path based routing, Luigi Core's index.html should be served separately.

>**NOTE**: Due to NextJS's server side nature, injecting Luigi Client in your pages is not straightforward, since Luigi Client relies on the window object only available at the client side. To resolve that, simply include the `luigi-client.js` file as the source of an HTML script as shown in the `home.js` file. 
This will allow you to use Luigi Client as part of the window object of that micro frontend, for example: `window['LuigiClient']`

## Getting Started

First, install dependencies

```bash
npm install
```

Second, build the NextJS app:

```bash
npm run build
```

Next, run the server:

```bash
# for production mode
npm run start

# or for development mode
npm run dev  
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

The [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/import?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
