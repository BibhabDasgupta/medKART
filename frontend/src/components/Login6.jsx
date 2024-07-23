import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login6.css';

const Login6 = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5000/api/admin/login`, formData);
      if (response.data.token) {
        localStorage.setItem('auth-token', response.data.token);
        console.log('User is logged in');
        navigate('/admin/dashboard'); // Adjust the path as needed
      }
    } catch (error) {
      console.error('Error logging in:', error);
      // Handle error, show message to user, etc.
    }
  };

  return (
    <div className="login-card">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
        New user? <Link to="/admin/register">Register</Link>
      </p>
    </div>
  );
};

export default Login6;
