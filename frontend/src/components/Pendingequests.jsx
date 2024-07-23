import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PendingRequests.css'; // Import the CSS file for styling

const PendingRequests = () => {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [accountNumber, setAccountNumber] = useState(''); // State for account number input
  const [selectedUser, setSelectedUser] = useState(null); // State to track which user is being edited

  useEffect(() => {
    const fetchPendingRequests = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/pending-requests');
        setPendingRequests(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPendingRequests();
  }, []);

  const handleSendAccountNumber = async (username) => {
    try {
      await axios.post('http://localhost:5000/api/admin/send-account-number', {
        username,
        accountNumber,
      });
      alert('Account number sent successfully!');
      setAccountNumber('');
      setSelectedUser(null);
    } catch (err) {
      setError('Error sending account number');
    }
  };

  return (
    <div className="pending-requests-container">
      <h2>Pending Requests</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>No pending requests</p>
      ) : (
        <table className="requests-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Name</th>
              <th>Address</th>
              <th>Email</th>
              <th>Mobile Number</th>
              <th>Role</th>
              <th>Send Account Number</th>
            </tr>
          </thead>
          <tbody>
            {pendingRequests.map((request) => (
              <React.Fragment key={request._id}>
                <tr>
                  <td>{request.username}</td>
                  <td>{request.name}</td>
                  <td>{request.address}</td>
                  <td>{request.email}</td>
                  <td>{request.mobileNumber}</td>
                  <td>{request.role}</td>
                  <td>
                    <button
                      onClick={() => {
                        setSelectedUser(request.username);
                        setAccountNumber(''); // Clear the input field
                      }}
                    >
                      Send Account Number
                    </button>
                  </td>
                </tr>
                {selectedUser === request.username && (
                  <tr>
                    <td colSpan="7">
                      <div className="actions">
                        <input
                          type="text"
                          value={accountNumber}
                          onChange={(e) => setAccountNumber(e.target.value)}
                          placeholder="Enter account number"
                        />
                        <button
                          onClick={() => handleSendAccountNumber(request.username)}
                        >
                          Send
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PendingRequests;

