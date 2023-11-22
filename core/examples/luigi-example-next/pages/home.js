import { useEffect } from 'react';
import Head from 'next/head';

export default function Home() {
  useEffect(() => {
    if (window.self) {
      console.log('Test', window.self);
      const loadLuigiClient = async () => {
        // const { LuigiClient } = await import('@luigi-project/client')

        try {
          const { LuigiClient } = await import('@luigi-project/client');

          // Check if LuigiClient is a class before attempting to instantiate
          if (typeof LuigiClient === 'function' || typeof LuigiClient === 'object') {
            const luigi = new LuigiClient();
            // Use the 'luigi' instance as needed
            console.log('Luigi instance:', luigi);
          } else {
            console.error('LuigiClient is not a class');
          }
        } catch (error) {
          console.error('Error loading LuigiClient:', error);
        }
      };
      loadLuigiClient();
    }
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
