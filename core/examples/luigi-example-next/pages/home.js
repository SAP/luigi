import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    require('@luigi-project/client/luigi-client.js');
  }, []);

  return (
    <section className="fd-section">
      <div className="fd-section__header">
        <h1 className="fd-section__title">Welcome to Luigi with Next.js</h1>
      </div>
    </section>
  );
}
