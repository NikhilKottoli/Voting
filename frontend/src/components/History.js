import React from 'react';
import { Link } from 'react-router-dom';
import './History.css';

const History = () => {
  // Dummy data for past polls
  const pastPolls = [
    { id: 1, title: "Half Adder And Full Adder", code: "123456", voters: 150, date: "2024-08-15",rating:9 },
    { id: 2, title: "Best Pizza Topping", code: "789012", voters: 89, date: "2024-08-10",rating:8 },
    { id: 3, title: "Next Company Outing", code: "345678", voters: 45, date: "2024-08-05",rating:7 },
    { id: 4, title: "New Office Location", code: "901234", voters: 72, date: "2024-07-30",rating:6 },
    { id: 5, title: "Annual Budget Allocation", code: "567890", voters: 23, date: "2024-07-25",rating:5 },
  ];

  return (
    <div className="history-page">
      <main className="main-content">
        <div className="history-container">
          <h2 className='MainHeading'>Poll History</h2>
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
              {pastPolls.map((poll) => (
                <tr key={poll.id}>
                  <td>{poll.title}</td>
                  <td>{poll.code}</td>
                  <td>{poll.voters}</td>
                  <td>{poll.date}</td>
                  <td>{poll.rating}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default History;