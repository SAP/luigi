import React from 'react';
import App from './App';
import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Router basename='sampleapp.html'>
      <App />
    </Router>
  </React.StrictMode>
);