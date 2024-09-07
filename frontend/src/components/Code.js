import React, { useState } from 'react';
import './Code.css';
import axios from 'axios';

const EnterCode = () => {
  const [code, setCode] = useState('');
  const [pollData, setPollData] = useState(null);
  const [score, setScore] = useState(5);
  const [feedback, setFeedback] = useState("Enter Feedback");

  const handleCodeSubmit = (e) => {
    e.preventDefault();
    axios.get(`http://localhost:4000/vote/findpoll?code=${code}`)
      .then((res) => {
        console.log(res.data);
        if (res.data && res.data.poll) {
          setPollData(res.data.poll);
        } else {
          setFeedback({ type: 'error', message: 'Invalid poll data received.' });
        }
      })
      .catch((err) => {
        console.error(err);
        setFeedback({ type: 'error', message: 'Error fetching poll. Please try again.' });
      });
  };

  const handleVoteSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the vote to your server
    axios.post(`http://localhost:4000/vote/submitvote`, {
      pollId: pollData._id,
      marks: score,
      feedback: feedback
    })
      .then((res) => {
        setFeedback({ type: 'success', message: 'Vote submitted successfully!' });
      })
      .catch((err) => {
        console.error(err);
        setFeedback({ type: 'error', message: 'Error submitting vote. Please try again.' });
      });
  };

  return (
    <div className="enter-code-page">
      <main className="main-content">
        <div className="code-form-container">
          {!pollData ? (
            <>
              <h2>Enter Event Code</h2>
              <p>Please enter the 6-digit code for the event you wish to vote on.</p>
              <form onSubmit={handleCodeSubmit} className="code-form">
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value.slice(0, 6))}
                  maxLength={6}
                  placeholder="Enter 6-digit code"
                  className="code-input"
                  required
                />
                <button type="submit" className="submit-btn">Submit Code</button>
              </form>
            </>
          ) : (
            <>
              <h2>{pollData.title || 'Untitled Poll'}</h2>
              <p>{pollData.description || 'No description available.'}</p>
              <form onSubmit={handleVoteSubmit} className="code-form">
                <div className="score-container">
                  <label htmlFor="score-slider">Your Rating (out of 10): {score}</label>
                  <input
                    id="score-slider"
                    type="range"
                    min="0"
                    max="10"
                    value={score}
                    onChange={(e) => setScore(parseInt(e.target.value))}
                    className="score-slider"
                  />
                </div>
                <textarea
                  value={feedback || ''}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Enter Feedback"
                  className="feedback-input"
                  required
                />
                <button type="submit" className="submit-btn" >Submit Vote</button>
              </form>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default EnterCode;