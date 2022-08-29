import React, { Component } from 'react';
import '../../node_modules/fundamental-styles/dist/fundamental-styles.css';

export default class Sample1 extends Component {
  render() {
    return (
      <div>
        <section className="fd-section">
          <div className="fd-section__header">
            <h1 className="fd-section__title">Sample 1</h1>
          </div>
          <div className="fd-panel">
            Luigi ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua.
          </div>
        </section>
      </div>
    );
  }
}
