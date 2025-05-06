import { useEffect } from 'react';
import Head from 'next/head';

export default function Home() {
  useEffect(() => {
    const LuigiClient = window['LuigiClient'];
    LuigiClient.addInitListener(() => {
      console.log('Luigi Initialized');
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
