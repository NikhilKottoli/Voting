import React, { useState, useEffect } from 'react';
import './History.css';
import axios from 'axios';

const History = () => {
  const [polls, setPolls] = useState([]);
  const [votes, setVotes] = useState({});

  // Function to fetch past polls
  const getPastPolls = async () => {
    try {
      const response = await axios.get('http://localhost:4000/poll/getpolls');
      if (response.status === 200) {
        const fetchedPolls = response.data.polls;
        setPolls(fetchedPolls);
        // Fetch votes after polls are fetched
        fetchVotes(fetchedPolls);
      }
    } catch (error) {
      console.error('Error fetching polls:', error);
      alert("Error fetching polls");
    }
  };

  // Function to fetch votes
  const fetchVotes = async (polls) => {
    try {
      const votesData = await Promise.all(polls.map(async (poll) => {
        const response = await axios.get('http://localhost:4000/vote/avgMarks', {
          params: { id: poll._id }
        });
        return { pollId: poll._id, avg: response.data.avg }; // Store the avg value
      }));

      // Create a map to easily access the avg value by pollId
      const votesMap = votesData.reduce((acc, { pollId, avg }) => {
        acc[pollId] = avg;
        return acc;
      }, {});

      setVotes(votesMap);
    } catch (error) {
      console.error('Error fetching vote stats:', error);
    }
  };

  // useEffect to fetch polls on component mount
  useEffect(() => {
    getPastPolls();
  }, []);

  return (
    <div className="history-page">
      <main className="main-content">
        <div className="history-container">
          <h2 className="MainHeading">Poll History</h2>
          <table className="history-table">
            <thead>
              <tr>
                <th>Session Title</th>
                <th>Code</th>
                <th>Voters</th>
                <th>Date</th>
                <th>Rating</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {polls.length > 0 ? (
                polls.map((poll) => (
                  <tr key={poll._id}>
                    <td>{poll.title}</td>
                    <td>{poll.code}</td>
                    <td></td>
                    <td>{new Date(poll.updatedAt).toLocaleDateString()}</td>
                    <td>{votes[poll._id] || 'Loading...'}</td>
                    <td style={{ fontWeight: 'bold', color: poll.votingOn ? 'green' : 'red' }}>
                      {poll.votingOn ? "Enabled" : "Disabled"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No polls available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default History;
