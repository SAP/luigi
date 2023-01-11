import { useEffect } from 'react';
import Head from 'next/head';

export default function Home() {
  useEffect(() => {
    const LuigiClient = require('@luigi-project/client');

    LuigiClient.addInitListener(function(context) {
      console.log('Luigi Client initialised in Home');
    });
  }, []);

  return (
    <>
      <Head />
      <div>
        <h1>Welcome to Luigi with Next.js</h1>
      </div>
    </>
  );
}
