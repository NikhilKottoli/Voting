import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import './index.css';
import Home from './components/Home';
import EnterCode from './components/Code';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/entercode" element={<EnterCode />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;