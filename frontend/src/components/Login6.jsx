import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login6.css';

const Login6 = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [focusedField, setFocusedField] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFocus = (fieldName) => {
    setFocusedField(fieldName);
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

  const handleBackToHome = () => {
    navigate('/');
  };

  const getInstruction = () => {
    switch (focusedField) {
      case 'username':
        return 'Username should be at least 3 characters long.';
      case 'password':
        return 'Password should be at least 6 characters long.';
      default:
        return '';
    }
  };


  return (
    <div className="login-card">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} onFocus={() => handleFocus('username')} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} onFocus={() => handleFocus('password')} required />
        </div>
        <p className="instruction">{getInstruction()}</p>
        <button type="submit">Login</button>
      </form>
      <br></br>
      <button onClick={handleBackToHome} className="back-to-home">Back to Home</button>
      <p>
        New user? <Link to="/admin/register">Register</Link>
      </p>
    </div>
  );
};

export default Login6;
