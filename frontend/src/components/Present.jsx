import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PendingRequests.css"; // Import the CSS file for styling
import Sidebar from "./Sidebar";
import Loader from "./Loader";


const PendingRequests = () => {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPendingRequests = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/admin/pending-requests"
        );
        const pending = response.data.filter((request) => request.status);
        setPendingRequests(pending);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPendingRequests();
  }, []);

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "1fr 8fr",
      height: "100vh"
    }}>
      <Sidebar />
      <div className="pending-requests-container">
        <h2>Current Stakeholders</h2>
        {loading ? (
          // <p>Loading...</p>
          <div className="loading">
            <Loader />
          </div>
        ) : error ? (
          <p>Error loading requests: {error}</p>
        ) : pendingRequests.length === 0 ? (
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
                <th>Account Number</th>
              </tr>
            </thead>
            <tbody>
              {pendingRequests.map((request) => (
                <tr key={request._id}>
                  <td>{request.username}</td>
                  <td>{request.name}</td>
                  <td>{request.address}</td>
                  <td>{request.email}</td>
                  <td>{request.mobileNumber}</td>
                  <td>{request.role}</td>
                  <td>{request.accountNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div >
  );
};

export default PendingRequests;
