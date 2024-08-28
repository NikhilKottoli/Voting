import './Navbar.css';

const Navbar = () => (
    <nav className="navbar">
      <div className="container">
        <span className="logo">VoteNow</span>
        <div className="nav-links flex gap-10">
          <a href="/">Home</a>
          <a href='/history'>History</a>
        </div>
      </div>
    </nav>
  );

export default Navbar;