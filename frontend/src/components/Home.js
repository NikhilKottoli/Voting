import React from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';





const Home = () => {
    const navigate = useNavigate();

    const gotoVoteNow = () => {
        navigate('/entercode');
    }

    const gotoCreatePoll = () => {
        navigate('/create');
    }

  return (
    <div className="app">
      <main className="main-content">
        <div className="content-wrapper">
          <h1 >Welcome to VoteNow</h1>
          <p>Make your voice heard or create your own poll</p>
          <div className="button-group">
            <button className="btn btn-primary"onClick={gotoVoteNow} >Vote Now</button>
            <button className="btn btn-secondary" onClick={gotoCreatePoll}>Create Poll</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;