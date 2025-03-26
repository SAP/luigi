import { useEffect } from 'react';
import Head from 'next/head';

export default function Sample1() {
  useEffect(() => {
    const LuigiClient = window['LuigiClient'];
    LuigiClient.addInitListener(() => {
      console.log('Sample 1 Initialized');
    });
  }, []);

  return (
    <>
      <Head />
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
