import React from 'react';
import { BrowserRouter as Router, 
    Routes, Route } from 'react-router-dom';
import HangMan from './HangMan';
import NotFoundPage from './components/NotFoundPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HangMan/>}/>
        <Route path = "*" element={<NotFoundPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
