import { useEffect } from 'react';
import Head from 'next/head';

export default function Home() {
  useEffect(() => {
    require('@luigi-project/client/luigi-client.js');
  }, []);

  return (
    <>
      <Head>
        <link
          href="//unpkg.com/fundamental-styles@latest/dist/fundamental-styles.css"
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
