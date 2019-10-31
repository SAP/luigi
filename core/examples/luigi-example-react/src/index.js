import React, { Component } from 'react';
import { render } from 'react-dom';
import Home from './views/home.js';
import Sample1 from './views/sample1.js';
import Sample2 from './views/sample2.js';
import './index.css';
import { HashRouter, Route } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import LuigiClient from '@kyma-project/luigi-client';

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      luigiClient: LuigiClient
    };
  }
  render() {
    //this.luigiClient.uxManager().hideLoadingIndicator();
    return (
      <HashRouter>
        <Route path="/home" component={Home} />
        <Route path="/sample1" component={Sample1} />
        <Route path="/sample2" component={Sample2} />
      </HashRouter>
    );
  }
}

render(<App />, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
