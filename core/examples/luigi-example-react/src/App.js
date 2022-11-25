import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './views/home.js';
import Sample1 from './views/sample1.js';
import Sample2 from './views/sample2.js';

const App = () => {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/sample1" element={<Sample1 />} />
      <Route path="/sample2" element={<Sample2 />} />
    </Routes>
  )
}

export default App;