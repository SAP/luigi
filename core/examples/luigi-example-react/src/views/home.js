import React, { Component } from 'react';
import '../../node_modules/fiori-fundamentals/dist/fiori-fundamentals.css';
import LuigiClient from '@kyma-project/luigi-client';

export default class Home extends Component {
  constructor(props) {
    super(props);
    let luigiClient = LuigiClient;
    this.state = {
      message: ''
    };
    luigiClient.addInitListener(initialContext => {
      this.setState({
        message: 'Luigi Client initialized.'
      });
    });
    luigiClient.addContextUpdateListener(updatedContext => {
      this.setState({
        message: 'Luigi Client updated.'
      });
    });
  }
  render() {
    return (
      <div>
        <section className="fd-section">
          <div className="fd-section__header">
            <h1 className="fd-section__title">Home</h1>
          </div>
          <div className="fd-panel">{this.state.message}</div>
        </section>
      </div>
    );
  }
}
