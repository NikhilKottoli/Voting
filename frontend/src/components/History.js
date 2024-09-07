import React, { useState, useEffect } from 'react';
import './History.css';
import axios from 'axios';

const History = () => {
  const [polls, setPolls] = useState([]);  // State to store fetched polls

  // Function to fetch past polls
  const getPastPolls = () => {
    axios.get('http://localhost:4000/poll/polls')
      .then((response) => {
        if (response.status === 200) {
          setPolls(response.data.polls);  // Store the data in state
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Error fetching polls");
      });
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
              </tr>
            </thead>
            <tbody>
              {polls.length > 0 ? (
                polls.map((poll) => (
                  <tr key={poll._id}>
                    <td>{poll.title}</td>
                    <td>{poll.code}</td>
                    <td>{poll.voters}</td>
                    <td>{poll.date}</td>
                    <td>{poll.rating}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No polls available</td>
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
