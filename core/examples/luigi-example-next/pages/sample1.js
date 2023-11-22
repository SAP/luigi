import { useEffect } from 'react';
import Head from 'next/head';

export default function Sample1() {
  useEffect(() => {
    // const LuigiClient = require('@luigi-project/client');

    // LuigiClient.addInitListener(function(context) {
    //   console.log('Luigi Client initialised in Sample1');
    // });
  }, []);

  return (
    <>
      <Head></Head>
      <div>
        <h1>Sample 1</h1>
      </div>
      <div>
        Luigi ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
        dolore magna aliquyam erat, sed diam voluptua.
      </div>
    </>
  );
}
