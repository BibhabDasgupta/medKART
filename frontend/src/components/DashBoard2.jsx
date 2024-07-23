import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import WholesalerDetailsForm from './WholesalerDetails';
import './DashBoard2.css';

const DashBoard2 = () => {
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
        setLoading(false); // Set loading to false after fetching data
      }
    };

    fetchPendingStatus();
  }, []);

  useEffect(() => {
    const fetchPendingStatus = async () => {
      try {
        const username = localStorage.getItem('username');
        if (username) {
          const response = await axios.get(`http://localhost:5000/api/pendingStakeholders/${username}`);
          const data = response.data;

          if (data) {
            setAccountNumber(data.accountNumber); // Set account number from the response
          }
        } else {
          console.error('No username found in localStorage');
        }
      } catch (error) {
        console.error('Error fetching pending status:', error);
      }
    };

    fetchPendingStatus();

    const interval = setInterval(fetchPendingStatus, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('auth-token');
    localStorage.removeItem('username'); // Remove username from localStorage as well
    navigate('/');
  };

  const handleFormSubmit = () => {
    setFormSubmitted(true);
  };

  const handleAcceptAccountNumber = async () => {
    try {
      const username = localStorage.getItem('username');
      if (username) {
        await axios.post('http://localhost:5000/api/pendingStakeholders/accept', {username});
        setIsAccepted(true);
      } else {
        console.error('No username found in localStorage');
      }
    } catch (error) {
      console.error('Error accepting account number:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
    return null; 
  }

  
 

  return (
    <div className="dashboard-container">
      <h2>Wholesalers Dashboard</h2>
      {status && formSubmitted ? (
        <div>
          <p>You have successfully accepted the account number. Please logout and login with the approppriate metamask account again to continue.</p>
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <>
          {!status && formSubmitted ? (
            <div>
              <p>Your submission is pending approval. Please wait for further instructions.</p>
              <p>Account Number: {accountNumber ? accountNumber : 'Not assigned yet'}</p>
              {accountNumber && (
                <button className="accept-button" onClick={handleAcceptAccountNumber}>Accept Account Number</button>
              )}
              {isAccepted && <p>Account number accepted. Please logout and login again with appropriate metamask account.</p>}
              <button className="logout-button" onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <WholesalerDetailsForm onFormSubmit={handleFormSubmit} onLogout={handleLogout} />
          )}
        </>
      )}
    </div>
  );
}

export default DashBoard2;
