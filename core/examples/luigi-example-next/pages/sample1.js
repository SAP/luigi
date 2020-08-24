import { useEffect } from 'react';

export default function Sample1() {
  useEffect(() => {
    require('@luigi-project/client/luigi-client.js');
  }, []);

  return (
    <section className="fd-section">
      <div className="fd-section__header">
        <h1 className="fd-section__title">Sample 1</h1>
      </div>
      <div className="fd-panel">
        Luigi ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
        eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
        voluptua.
      </div>
    </section>
  );
}
