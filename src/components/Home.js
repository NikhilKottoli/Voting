import React from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';

const Navbar = () => (
  <nav className="navbar">
    <div className="container">
      <span className="logo">VoteNow</span>
      <div className="nav-links">
        <a href="#">History</a>
      </div>
    </div>
  </nav>
);



const Home = () => {
    const navigate = useNavigate();

    const gotoVoteNow = () => {
        navigate('/entercode');
    }

  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <div className="content-wrapper">
          <h1 >Welcome to VoteNow</h1>
          <p>Make your voice heard or create your own poll</p>
          <div className="button-group">
            <button className="btn btn-primary"onClick={gotoVoteNow} >Vote Now</button>
            <button className="btn btn-secondary">Create Poll</button>
          </div>
        </div>
      </main>
      <footer className="footer">
        <p>&copy; 2024 VoteNow. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;