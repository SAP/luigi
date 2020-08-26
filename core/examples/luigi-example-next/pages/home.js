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
      <Head>
        <link
          href="//unpkg.com/fundamental-styles@0.11.0/dist/fundamental-styles.css"
          rel="stylesheet"
        />
      </Head>
      <section className="fd-section">
        <div className="fd-section__header">
          <h1 className="fd-section__title">Welcome to Luigi with Next.js</h1>
        </div>
      </section>
    </>
  );
}
