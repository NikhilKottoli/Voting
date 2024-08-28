import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Create.css';

const CreatePoll = () => {
  const [pollCode, setPollCode] = useState('');
  const [isVotingActive, setIsVotingActive] = useState(false);
  const [voterCount, setVoterCount] = useState(0);

  const generateCode = () => {
    const newCode = Math.floor(100000 + Math.random() * 900000).toString();
    setPollCode(newCode);
  };

  const toggleVoting = () => {
    setIsVotingActive(!isVotingActive);
    if (isVotingActive) {
      // Reset voter count when ending the poll
      setVoterCount(0);
    }
  };

  const simulateVote = () => {
    if (isVotingActive) {
      setVoterCount(prevCount => prevCount + 1);
    }
  };

  return (
    <div className="create-poll-page">
      <header className="header">
        <div className="container">
          <h1 className="logo text-white">VoteNow</h1>
          <nav>
            <Link to="/" className="nav-link">Home</Link>
          </nav>
        </div>
      </header>
      <main className="main-content">
        <div className="poll-container">
          <h2 className='font-bold text-2xl'>Create a New Poll</h2>
          <div className="poll-actions">
            <button onClick={generateCode} className="action-btn generate-btn">
              Generate Code
            </button>
            <button onClick={toggleVoting} className={`action-btn ${isVotingActive ? 'end-btn' : 'start-btn'}`}>
              {isVotingActive ? 'End Voting' : 'Start Voting'}
            </button>
          </div>
          {pollCode && (
            <div className="poll-info">
              <p className="poll-code">Poll Code: <strong>{pollCode}</strong></p>
              <p className="voter-count">Number of Voters: {voterCount}</p>
            </div>
          )}
          {isVotingActive && (
            <button onClick={simulateVote} className="simulate-vote-btn">
              Simulate Vote (for demo)
            </button>
          )}
        </div>
      </main>
      <footer className="footer">
        <div className="container flex justify-center">
          <p>&copy; 2024 VoteNow. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default CreatePoll;