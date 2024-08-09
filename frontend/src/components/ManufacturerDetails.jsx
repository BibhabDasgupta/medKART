// import React, { useState } from 'react';
// import axios from 'axios';
// import './ManufacturerDetails.css';

// const ManufacturerDetailsForm = ({ onFormSubmit, onLogout }) => {
//   const [formData, setFormData] = useState({
//     username: '',
//     name: '',
//     address: '',
//     email: '',
//     mobileNumber: '',
//     role: 'Manufacturer',
//     accountNumber: '',
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('http://localhost:5000/api/pendingStakeholders', formData);
//       onFormSubmit();
//     } catch (error) {
//       console.error('Error submitting details:', error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="details-form">
//       <div className="form-group">
//         <label htmlFor="username">Username:</label>
//         <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required />
//       </div>
//       <div className="form-group">
//         <label htmlFor="name">Name:</label>
//         <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
//       </div>
//       <div className="form-group">
//         <label htmlFor="address">Address:</label>
//         <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} required />
//       </div>
//       <div className="form-group">
//         <label htmlFor="email">Email:</label>
//         <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
//       </div>
//       <div className="form-group">
//         <label htmlFor="mobileNumber">Mobile Number:</label>
//         <input type="text" id="mobileNumber" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} required />
//       </div>
//       <div className="form-group">
//         <label htmlFor="role">Role:</label>
//         <input type="text" id="role" name="role" value={formData.role} readOnly />
//       </div>
//       <div className="form-group">
//         <label htmlFor="accountNumber">Account Number:</label>
//         <input type="text" id="accountNumber" name="accountNumber" value={formData.accountNumber} onChange={handleChange} required />
//       </div>
//       <button type="submit" className="submit-button">Submit to Admin</button>
//       <button type="button" className="logout-button" onClick={onLogout}>Logout</button>
//     </form>
//   );
// };

// export default ManufacturerDetailsForm;


// import React, { useState } from 'react';
// import axios from 'axios';
// import './ManufacturerDetails.css';

// const ManufacturerDetailsForm = ({ onFormSubmit, onLogout }) => {
//   const [formData, setFormData] = useState({
//     username: '',
//     name: '',
//     address: '',
//     email: '',
//     mobileNumber: '',
//     role: 'Manufacturer',
//     accountNumber: '',
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('http://localhost:5000/api/pendingStakeholders', formData);
//       onFormSubmit();
//     } catch (error) {
//       console.error('Error submitting details:', error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="details-form">
//       <div className="form-group">
//         <label htmlFor="username">Username:</label>
//         <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required />
//       </div>
//       <div className="form-group">
//         <label htmlFor="name">Name:</label>
//         <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
//       </div>
//       <div className="form-group">
//         <label htmlFor="address">Address:</label>
//         <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} required />
//       </div>
//       <div className="form-group">
//         <label htmlFor="email">Email:</label>
//         <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
//       </div>
//       <div className="form-group">
//         <label htmlFor="mobileNumber">Mobile Number:</label>
//         <input type="text" id="mobileNumber" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} required />
//       </div>
//       <div className="form-group">
//         <label htmlFor="role">Role:</label>
//         <input type="text" id="role" name="role" value={formData.role} readOnly />
//       </div>
//       <div className="form-group">
//         <label htmlFor="accountNumber">Account Number:</label>
//         <input type="text" id="accountNumber" name="accountNumber" value={formData.accountNumber} onChange={handleChange} required />
//       </div>
//       <button type="submit" className="submit-button">Submit to Admin</button>
//       <button type="button" className="logout-button" onClick={onLogout}>Logout</button>
//     </form>
//   );
// };

// export default ManufacturerDetailsForm;

import React from 'react';
import axios from 'axios';
import './ManufacturerDetails.css';

const ManufacturerDetailsForm = ({ formData, setFormData, onFormSubmit, onLogout }) => {
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/pendingStakeholders', formData);
      onFormSubmit();
    } catch (error) {
      console.error('Error submitting details:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="details-form">
      <div className="form-group">
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} readOnly />
      </div>
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="address">Address:</label>
        <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="mobileNumber">Mobile Number:</label>
        <input type="text" id="mobileNumber" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="role">Role:</label>
        <input type="text" id="role" name="role" value={formData.role} readOnly />
      </div>
      <div className="form-group">
        <label htmlFor="accountNumber">Account Number:</label>
        <input type="text" id="accountNumber" name="accountNumber" value={formData.accountNumber} onChange={handleChange} required />
      </div>
      <button type="submit" className="submit-button">Submit to Admin</button>
      <button type="button" className="logout-button" onClick={onLogout}>Logout</button>
    </form>
  );
};

export default ManufacturerDetailsForm;
