import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './adminDashBoard.css';
import axios from 'axios';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [adminDetails, setAdminDetails] = useState(null);

  useEffect(() => {
    const fetchAdminDetails = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/details');
        setAdminDetails(response.data);
      } catch (error) {
        console.error('Error fetching admin details:', error);
      }
    };

    fetchAdminDetails();
  }, []);


  const handleLogout = () => {
    localStorage.removeItem('auth-token');
    navigate('/');
  };

  return (
    <div className="dashboardcontainer">
      <div className="sidebar">
        <ul>
          <li onClick={() => navigate('/admin/pending-requests')}>Pending Requests</li>
          <li onClick={() => navigate('/admin/current-stakeholders')}>Current Stakeholders</li>
          <li onClick={() => navigate('/admin/register-manufacturer')}>Register Manufacturer</li>
          <li onClick={() => navigate('/admin/register-wholesaler')}>Register Wholesaler</li>
          <li onClick={() => navigate('/admin/register-distributor')}>Register Distributor</li>
          <li onClick={() => navigate('/admin/register-hospital-pharmacy')}>Register Hospital/Pharmacy</li>
          <li onClick={handleLogout}>Logout</li>
        </ul>
      </div>
      <div className="content">
        <h2>Admin Dashboard</h2>
        <p>Welcome to the admin dashboard. Please select an option from the left panel.</p>
        {adminDetails ? (
          <div className="admin-details">
            <h3 className="admin-details-heading">Admin Details</h3>
            <p><strong>Username:</strong> {adminDetails.username}</p>
            <p><strong>Name:</strong> {adminDetails.actualName}</p>
            <p><strong>Email:</strong> {adminDetails.email}</p>
            <p><strong>Address:</strong> {adminDetails.address}</p>
            <p><strong>Mobile Number:</strong> {adminDetails.mobileNumber}</p>
          </div>
        ) : (
          <p>Loading admin details...</p>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
