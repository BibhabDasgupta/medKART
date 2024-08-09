import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';  // Import CSS for styling

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div 
      className="home-container"
      style={{ 
        backgroundImage: `url(${process.env.PUBLIC_URL}/images/background.avif)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh'
      }}
    >
      <header className="home-header">
        <div className="hamburger" onClick={toggleMenu}>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <nav>
          <ul className={isOpen ? 'open' : ''}>
            <li><Link to="/manufacturers">Manufacturers</Link></li>
            <li><Link to="/wholesalers">Wholesalers</Link></li>
            <li><Link to="/distributors">Distributors</Link></li>
            <li><Link to="/hospitalspharmacies">Hospitals/Pharmacies</Link></li>
            <li><Link to="/track">Track Drugs</Link></li>
            <li><Link to="/iot">Track Temperature/Humidity</Link></li>
            <li><Link to="/admin">Admin</Link></li>
          </ul>
        </nav>
      </header>
      <div className="home-content">
        <h1 className="animated-title">Welcome to the Pharmaceutical Supply Chain</h1>
        {/* Other content as needed */}
      </div>
    </div>
  );
}

export default Home;
