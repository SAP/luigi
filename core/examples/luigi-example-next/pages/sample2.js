import { useEffect } from 'react';
import Head from 'next/head';

export default function Sample2() {
  useEffect(() => {
    const LuigiClient = require('@luigi-project/client');

    LuigiClient.addInitListener(function(context) {
      console.log('Luigi Client initialised in Sample2');
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
          <h1 className="fd-section__title">Sample 2</h1>
        </div>
        <div className="fd-panel">
          Luigi ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua.
        </div>
      </section>
    </>
  );
}
