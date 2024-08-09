import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './adminDashBoard.css';
import axios from 'axios';
import Sidebar from './Sidebar';
import Loader from './Loader';
import BackgroundLetterAvatars from './BackgroundAvatar';

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
      <Sidebar />
      <div className="content">
        <h2>Admin Dashboard</h2>
        <p>Welcome to the admin dashboard. Please select an option from the left panel.</p>
        {adminDetails ? (
          <div className="admin-details">
            <h3 className="admin-details-heading">Admin Details</h3>
            <BackgroundLetterAvatars name={adminDetails.actualName} />
            <p><strong>Username:</strong> {adminDetails.username}</p>
            <p><strong>Name:</strong> {adminDetails.actualName}</p>
            <p><strong>Email:</strong> {adminDetails.email}</p>
            <p><strong>Address:</strong> {adminDetails.address}</p>
            <p><strong>Mobile Number:</strong> {adminDetails.mobileNumber}</p>
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
