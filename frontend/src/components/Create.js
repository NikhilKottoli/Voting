import React, { useState } from 'react';
import './Create.css';
import axios from 'axios';

const CreatePoll = () => {
  const [pollTitle, setPollTitle] = useState('');
  const [pollDescription, setPollDescription] = useState('');
  const [isVotingActive, setIsVotingActive] = useState(false);
  const [voterCount, setVoterCount] = useState(0);
  const [pollCreated, setPollCreated] = useState(false);

  const createPoll = (e) => {
    e.preventDefault();
    if (pollTitle && pollDescription) {
      axios.post('http://localhost:4000/poll/createpoll', {
        title: pollTitle,
        description: pollDescription,
      })
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          setPollCreated(true);
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Error creating poll");
      });
    } else {
      alert("Please enter both title and description");
    }
  };
  

  const toggleVoting = () => {
    setIsVotingActive(!isVotingActive);
    if (isVotingActive) {
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
      <main className="main-content">
        <div className="poll-container">
          <h2>Create a New Poll</h2>
          {!pollCreated ? (
            <div className="poll-form">
              <input
                type="text"
                placeholder="Enter poll title"
                value={pollTitle}
                onChange={(e) => setPollTitle(e.target.value)}
                className="poll-input"
              />
              <textarea
                placeholder="Enter poll description"
                value={pollDescription}
                onChange={(e) => setPollDescription(e.target.value)}
                className="poll-input"
                rows="4"
              />
              <button onClick={createPoll} className="action-btn generate-btn">
                Create Poll
              </button>
            </div>
          ) : (
            <>
              <div className="poll-info">
                <h3 className="poll-title">{pollTitle}</h3>
                <p className="poll-description">{pollDescription}</p>
                <p className="voter-count">Number of Voters: {voterCount}</p>
              </div>
              <div className="poll-actions">
                <button onClick={toggleVoting} className={`action-btn ${isVotingActive ? 'end-btn' : 'start-btn'}`}>
                  {isVotingActive ? 'End Voting' : 'Start Voting'}
                </button>
              </div>
              {isVotingActive && (
                <button onClick={simulateVote} className="simulate-vote-btn">
                  Simulate Vote (for demo)
                </button>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default CreatePoll;