import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ManufacturerDetailsForm from './ManufacturerDetails';
import './DashBoard1.css';

const DashBoard1 = () => {
  const [loading, setLoading] = useState(true);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [status, setStatus] = useState(false);
  const [accountNumber, setAccountNumber] = useState('');
  const [isAccepted, setIsAccepted] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchPendingStatus = async () => {
      try {
        const username = localStorage.getItem('username');
        if (username) {
          const response = await axios.get(`http://localhost:5000/api/pendingStakeholders/${username}`);
          const data = response.data;

          if (data) {
            setFormSubmitted(data.formSubmitted);
            setStatus(data.status);
          }
        } else {
          console.error('No username found in localStorage');
        }
      } catch (error) {
        console.error('Error fetching pending status:', error);
      }finally {
        setLoading(false);}
    };

    fetchPendingStatus();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('auth-token');
    localStorage.removeItem('username'); 
    navigate('/');
  };

  const handleFormSubmit = () => {
    setFormSubmitted(true);
  };

  if (loading) {
    return <div>Loading...</div>;
    return null; 
  }


  return (
    <div className="dashboard-container">
      <h2>Manufacturers Dashboard</h2>
      {status && formSubmitted ? (
        <div>
          <p>Admin have successfully accepted your account number. Please logout and login with the approppriate metamask account again to continue.</p>
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <>
          {!status && formSubmitted ? (
            <div>
              <p>Your submission is pending approval. Please wait for further instructions.</p>
              <button className="logout-button" onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <ManufacturerDetailsForm onFormSubmit={handleFormSubmit} onLogout={handleLogout} />
          )}
        </>
       )} 
    </div>
  );
}

export default DashBoard1;




