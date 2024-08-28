import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import './index.css';
import Home from './components/Home';
import EnterCode from './components/Code';
import CreatePoll from './components/Create';
import History from './components/History';
import Navbar from './components/navbar/Navbar';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/entercode" element={<EnterCode />} />
          <Route path="/create" element={<CreatePoll />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </div>
      <footer className="footer">
        <p>&copy; 2024 VoteNow. All rights reserved.</p>
      </footer>
    </Router>
    
  );
}

export default App;