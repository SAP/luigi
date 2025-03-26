import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="/core/luigi.css" />
        <script src="/luigi-client.js" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
