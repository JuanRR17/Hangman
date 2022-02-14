import React from 'react';
import { BrowserRouter as Router, 
    Routes, Route } from 'react-router-dom';
import HangMan from './HangMan';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HangMan/>}/>
      </Routes>
    </Router>
  );
}

export default App;
