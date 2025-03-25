import { useEffect } from 'react';
import Head from 'next/head';

export default function Sample2() {
  useEffect(() => {
    const LuigiClient = window['LuigiClient'];
    LuigiClient.addInitListener(() => {
      console.log('Sample 2 Initialized');
    });
  }, []);

  return (
    <>
      <Head />
      <div>
        <h1>Sample 2</h1>
      </div>
      <div>
        Luigi ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
        dolore magna aliquyam erat, sed diam voluptua.
      </div>
    </>
  );
}
