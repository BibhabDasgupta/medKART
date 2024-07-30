import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register1.css';

const Register1 = () => {
  const [formData, setFormData] = useState({
    actualName: '',
    address: '',
    email: '',
    mobileNumber: '',
    username: '',
    password: '',
    confirmPassword: '',
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
      const response = await axios.post('http://localhost:5000/api/manufacturers/register', formData);
      if (response.data) {
        navigate('/manufacturers/login'); // Redirect to login after successful registration
      }
    } catch (error) {
      console.error('Error registering manufacturer:', error);
      // Handle error, show message to user, etc.
    }
  };

  const getInstruction = () => {
    switch (focusedField) {
      case 'actualName':
        return 'Name should be at least 3 characters long.';
      case 'address':
        return 'Address should be at least 5 characters long.';
      case 'email':
        return 'Enter a valid email address.';
      case 'mobileNumber':
        return 'Enter a 10-digit mobile number.';
      case 'username':
        return 'Username should be at least 3 characters long.';
      case 'password':
        return 'Password should be at least 6 characters long.';
      case 'confirmPassword':
        return 'Confirm Password should match the above password.';
      default:
        return '';
    }
  };

  return (
    <div className="register-card">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="actualName">Name:</label>
          <input
            type="text"
            id="actualName"
            name="actualName"
            value={formData.actualName}
            onChange={handleChange}
            onFocus={() => handleFocus('actualName')}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            onFocus={() => handleFocus('address')}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onFocus={() => handleFocus('email')}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="mobileNumber">Mobile Number:</label>
          <input
            type="tel"
            id="mobileNumber"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            onFocus={() => handleFocus('mobileNumber')}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            onFocus={() => handleFocus('username')}
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
            onFocus={() => handleFocus('password')}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            onFocus={() => handleFocus('confirmPassword')}
            required
          />
        </div>
        <p className="instruction">{getInstruction()}</p>
        <button type="submit">Register</button>
        <p>
          Already have an account? <Link to="/manufacturers/login">Login here</Link>
        </p>
      </form>
    </div>
  );
};

export default Register1;


