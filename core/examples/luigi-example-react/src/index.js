import React, { Component } from 'react';
import { render } from 'react-dom';
import Home from './views/home.js';
import Sample1 from './views/sample1.js';
import Sample2 from './views/sample2.js';
import './index.css';
import { BrowserRouter, Route } from 'react-router-dom';
import LuigiClient from '@kyma-project/luigi-client';

class App extends Component {
  constructor(props) {
    super();
  }
  render() {
    //this.luigiClient.uxManager().hideLoadingIndicator();
    return (
      <BrowserRouter basename={`sampleapp.html#`}>
        <Route path="/home" component={Home} />
        <Route path="/sample1" component={Sample1} />
        <Route path="/sample2" component={Sample2} />
      </BrowserRouter>
    );
  }
}

render(<App />, document.getElementById('root'));
