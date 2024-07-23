import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login1.css';

const Login1 = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState(''); // State for error messages
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
      const response = await axios.post('http://localhost:5000/api/manufacturers/login', formData);
      if (response.data.token) {
        localStorage.setItem('auth-token', response.data.token);
        localStorage.setItem('username', formData.username); // Store the username
        console.log('User is logged in');
        navigate('/manufacturers/dashboard'); // Redirect to the dashboard or desired page
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Login failed. Please check your username and password and try again.'); // Set error message
    }
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="login-card">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input 
            type="text" 
            id="username" 
            name="username" 
            value={formData.username} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            value={formData.password} 
            onChange={handleChange} 
            required 
          />
        </div>
        {error && <p className="error-message">{error}</p>} {/* Display error message */}
        <button type="submit">Login</button>
      </form>
      <br></br>
      <button onClick={handleBackToHome} className="back-to-home">Back to Home</button>
      <p>
        New user? <Link to="/manufacturers/register">Register</Link>
      </p>
    </div>
  );
};

export default Login1;


