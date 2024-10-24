import React, { useState } from 'react';
import './Code.css';
import axios from 'axios';

const EnterCode = () => {
  const [code, setCode] = useState('');
  const [pollData, setPollData] = useState(null);
  const [score, setScore] = useState(5);
  const [feedback, setFeedback] = useState("Enter Feedback");
  const [hasVoted, setHasVoted] = useState(false);

  // Function to check if the user has already voted for this poll
  const checkIfVoted = (pollId) => {
    const votedPolls = JSON.parse(localStorage.getItem('votedPolls')) || [];
    return votedPolls.includes(pollId);
  };

  const handleCodeSubmit = (e) => {
    e.preventDefault();
    axios.get(`https://voting-n7ug.onrender.com/vote/findpoll?code=${code}`)
      .then((res) => {
        console.log(res.data);
        if (res.data && res.data.poll) {
          setPollData(res.data.poll);
          if (checkIfVoted(res.data.poll._id)) {
            setHasVoted(true);
          }
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
    if (checkIfVoted(pollData._id)) {
      setFeedback({ type: 'error', message: 'You have already voted for this poll.' });
      return;
    }

    axios.post(`https://voting-n7ug.onrender.com/vote/submitvote`, {
      pollId: pollData._id,
      marks: score,
      feedback: feedback
    })
      .then((res) => {
        setFeedback({ type: 'success', message: 'Vote submitted successfully!' });

        // Store the poll ID in localStorage to prevent voting again
        const votedPolls = JSON.parse(localStorage.getItem('votedPolls')) || [];
        votedPolls.push(pollData._id);
        localStorage.setItem('votedPolls', JSON.stringify(votedPolls));

        setHasVoted(true);  // Update state to reflect that the user has voted
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
              {hasVoted ? (
                <p>You have already voted for this poll.</p>
              ) : (
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
                  <button type="submit" className="submit-btn">Submit Vote</button>
                </form>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default EnterCode;
