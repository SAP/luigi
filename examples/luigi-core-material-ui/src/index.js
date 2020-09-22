import React from 'react';
import ReactDOM from 'react-dom';
import '@rmwc/icon/styles';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const luigiConfig = window.OUR_LUIGI_CONFIG;
window.Luigi.setConfig(luigiConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
