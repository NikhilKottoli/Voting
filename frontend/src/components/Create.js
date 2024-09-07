import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Create.css';
import axios from 'axios';

const CreatePoll = () => {
  const [pollTitle, setPollTitle] = useState('');
  const [pollDescription, setPollDescription] = useState('');
  const [pollCreated, setPollCreated] = useState(false);
  const navigate = useNavigate();

  const createPoll = async (e) => {
    e.preventDefault();
    if (pollTitle && pollDescription) {
      try {
        const response = await axios.post('http://localhost:4000/poll/createpoll', {
          title: pollTitle,
          description: pollDescription,
        });

        if (response.status === 201) {
          const { _id } = response.data.poll; // Adjust based on actual response structure
          setPollCreated(true);
          navigate('/history', { state: { poll: { _id, title: pollTitle, description: pollDescription } } });
        }
      } catch (error) {
        console.error('Error creating poll:', error);
        alert('Error creating poll');
      }
    } else {
      alert('Please enter both title and description');
    }
  };

  return (
    <div className="create-poll-page">
      <main className="main-content">
        <div className="poll-container">
          <h2>Create a New Poll</h2>
          {!pollCreated ? (
            <form onSubmit={createPoll} className="poll-form">
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
              <button type="submit" className="action-btn generate-btn">
                Create Poll
              </button>
            </form>
          ) : (
            <p>Poll created successfully!</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default CreatePoll;
