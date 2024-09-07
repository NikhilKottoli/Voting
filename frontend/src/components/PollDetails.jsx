import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './PollDetails.css';
import axios from 'axios';

const PollDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { poll } = location.state || {};

  const [avgRating, setAvgRating] = useState(null);
  const [totalVotes, setTotalVotes] = useState(0);
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    if (poll) {
      const fetchPollStats = async () => {
        try {
          const response = await axios.get('http://localhost:4000/vote/getstats', {
            params: { id: poll._id }
          });
          console.log(response.data);
          const stats = response.data.stats[0];
          setAvgRating(stats.averageMarks);
          setTotalVotes(stats.totalVotes);
        } catch (error) {
          console.error('Error fetching poll stats:', error);
        }
      };

      const fetchFeedbacks = async () => {
        try {
          const response = await axios.get('http://localhost:4000/vote/getvotes', {
            params: { id: poll._id }
          });
          console.log(response.data);
          setFeedbacks(response.data.votes);
        } catch (error) {
          console.error('Error fetching votes:', error);
        }
      };

      fetchPollStats();
      fetchFeedbacks();
    }
  }, [poll]);

  if (!poll) {
    return <div className="error">Poll not found</div>;
  }

  return (
    <div className="poll-details-page">
      <div className="poll-details-container">
        <button className="back-button" onClick={() => navigate(-1)}>← Back to History</button>
        <h2 className="poll-title">{poll.title}</h2>
        <div className="poll-info">
          <p><strong>Code:</strong> {poll.code}</p>
          <p><strong>Created:</strong> {new Date(poll.createdAt).toLocaleString()}</p>
          <p><strong>Last Updated:</strong> {new Date(poll.updatedAt).toLocaleString()}</p>
          <p><strong>Status:</strong> <span className={poll.votingOn ? 'status-enabled' : 'status-disabled'}>{poll.votingOn ? "Enabled" : "Disabled"}</span></p>
          <p><strong>Average Rating:</strong> {avgRating ? avgRating.toFixed(2) : 'N/A'}</p>
          <p><strong>Number of Voters:</strong> {totalVotes || 0}</p>
        </div>
        <div className="poll-feedback">
          <h3>Feedback Comments:</h3>
          {feedbacks.length > 0 ? (
            <ol>
              {feedbacks.map((vote) => (
                <li key={vote._id} className={`feedback-item ${vote.marks >= 7 ? 'high-score' : vote.marks >= 5 ? 'medium-score' : 'low-score'}`}>
                  <strong>Score:</strong> {vote.marks} <br />
                  <strong>Feedback:</strong> {vote.feedback}
                </li>
              ))}
            </ol>
          ) : (
            <p>No feedback available for this poll.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PollDetails;
