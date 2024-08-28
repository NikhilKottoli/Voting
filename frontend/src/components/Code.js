import React, { useState } from 'react';
import './Code.css';


const Navbar = () => (
    <nav className="navbar">
      <div className="container">
        <span className="logo">VoteNow</span>
        <div className="nav-links">
          <a href="/">Home</a>
        </div>
      </div>
    </nav>
  );

const EnterCode = () => {
  const [code, setCode] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the code to your backend
    console.log('Submitted code:', code);
    // For now, we'll just clear the input
    setCode('');
  };

  return (
    <div className="enter-code-page">
      <Navbar />
      <main className="main-content">
        <div className="code-form-container">
          <h2>Enter Event Code</h2>
          <p>Please enter the 6-digit code for the event you wish to vote on.</p>
          <form onSubmit={handleSubmit} className="code-form">
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.slice(0, 6))}
              maxLength={6}
              placeholder="Enter 6-digit code"
              className="code-input"
              required
            />
            <button type="submit" className="submit-btn">Submit</button>
          </form>
        </div>
      </main>
      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 VoteNow. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default EnterCode;