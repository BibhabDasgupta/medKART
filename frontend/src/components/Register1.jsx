// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './Register1.css';

// const Register1 = () => {
//   const [formData, setFormData] = useState({
//     actualName: '',
//     address: '',
//     email: '',
//     mobileNumber: '',
//     username: '',
//     password: '',
//     confirmPassword: '',
//   });

//   const [focusedField, setFocusedField] = useState('');
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleFocus = (fieldName) => {
//     setFocusedField(fieldName);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:5000/api/manufacturers/register', formData);
//       if (response.data) {
//         navigate('/manufacturers/login'); // Redirect to login after successful registration
//       }
//     } catch (error) {
//       console.error('Error registering manufacturer:', error);
//       // Handle error, show message to user, etc.
//     }
//   };

//   const getInstruction = () => {
//     switch (focusedField) {
//       case 'actualName':
//         return 'Name should be at least 3 characters long.';
//       case 'address':
//         return 'Address should be at least 5 characters long.';
//       case 'email':
//         return 'Enter a valid email address.';
//       case 'mobileNumber':
//         return 'Enter a 10-digit mobile number.';
//       case 'username':
//         return 'Username should be at least 3 characters long.';
//       case 'password':
//         return 'Password should be at least 6 characters long.';
//       case 'confirmPassword':
//         return 'Confirm Password should match the above password.';
//       default:
//         return '';
//     }
//   };

//   return (
//     <div className="register-card">
//       <h2>Register</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label htmlFor="actualName">Name:</label>
//           <input
//             type="text"
//             id="actualName"
//             name="actualName"
//             value={formData.actualName}
//             onChange={handleChange}
//             onFocus={() => handleFocus('actualName')}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="address">Address:</label>
//           <input
//             type="text"
//             id="address"
//             name="address"
//             value={formData.address}
//             onChange={handleChange}
//             onFocus={() => handleFocus('address')}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="email">Email:</label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             onFocus={() => handleFocus('email')}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="mobileNumber">Mobile Number:</label>
//           <input
//             type="tel"
//             id="mobileNumber"
//             name="mobileNumber"
//             value={formData.mobileNumber}
//             onChange={handleChange}
//             onFocus={() => handleFocus('mobileNumber')}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="username">Username:</label>
//           <input
//             type="text"
//             id="username"
//             name="username"
//             value={formData.username}
//             onChange={handleChange}
//             onFocus={() => handleFocus('username')}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="password">Password:</label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             onFocus={() => handleFocus('password')}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="confirmPassword">Confirm Password:</label>
//           <input
//             type="password"
//             id="confirmPassword"
//             name="confirmPassword"
//             value={formData.confirmPassword}
//             onChange={handleChange}
//             onFocus={() => handleFocus('confirmPassword')}
//             required
//           />
//         </div>
//         <p className="instruction">{getInstruction()}</p>
//         <button type="submit">Register</button>
//         <p>
//           Already have an account? <Link to="/manufacturers/login">Login here</Link>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default Register1;


// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './Register1.css';
// import image from "./img/manufacturer.jpg"; // Import your image

// const Register1 = () => {
//   const [formData, setFormData] = useState({
//     actualName: '',
//     address: '',
//     email: '',
//     mobileNumber: '',
//     username: '',
//     password: '',
//     confirmPassword: '',
//   });

//   const [focusedField, setFocusedField] = useState('');
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleFocus = (fieldName) => {
//     setFocusedField(fieldName);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:5000/api/manufacturers/register', formData);
//       if (response.data) {
//         navigate('/manufacturers/login'); // Redirect to login after successful registration
//       }
//     } catch (error) {
//       console.error('Error registering manufacturer:', error);
//     }
//   };

//   const getInstruction = () => {
//     switch (focusedField) {
//       case 'actualName':
//         return 'Name should be at least 3 characters long.';
//       case 'address':
//         return 'Address should be at least 5 characters long.';
//       case 'email':
//         return 'Enter a valid email address.';
//       case 'mobileNumber':
//         return 'Enter a 10-digit mobile number.';
//       case 'username':
//         return 'Username should be at least 3 characters long.';
//       case 'password':
//         return 'Password should be at least 6 characters long.';
//       case 'confirmPassword':
//         return 'Confirm Password should match the above password.';
//       default:
//         return '';
//     }
//   };

//   return (
//     <div
//       style={{
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         height: "100vh",
//         backgroundColor: "#f7f7f7", // Optional: background color for the whole page
//       }}
//     >
//       <div
//         style={{
//           display: "flex",
//           width: "90%",
//           height: "90%",
//           backgroundColor: "#fff",
//           borderRadius: "15px",
//           boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Shadow for the card effect
//           overflow: "hidden", // Ensure content doesn't overflow the card
//           border: "1px solid #ddd", // Optional: border for the card
//         }}
//       >
//         <div
//           style={{
//             width: "50%", // 50% of the card width for the image
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             backgroundColor: "#f0f0f0", // Optional: background color for the image section
//           }}
//         >
//           <img
//             src={image}
//             alt="A meaningful description of the image"
//             style={{
//               width: "100%", // Ensure the image fits nicely within its section
//               height: "100%",
//               objectFit: "cover", // Ensure the image covers its container without distortion
//             }}
//           />
//         </div>
//         <div
//           style={{
//             width: "50%", // 50% of the card width for the form
//             padding: "40px", // Padding for the form section
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "center",
//              backgroundColor:"rgb(67,67, 67)"
//           }}
//         >
//           <div className="register-card">
//             <h2 style={{marginBottom:"2px"}}>Register</h2>
//             <form onSubmit={handleSubmit}>
//               <div className="form-group">
//                 <label htmlFor="actualName">Name:</label>
//                 <input
//                   type="text"
//                   id="actualName"
//                   name="actualName"
//                   value={formData.actualName}
//                   onChange={handleChange}
//                   onFocus={() => handleFocus('actualName')}
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="address">Address:</label>
//                 <input
//                   type="text"
//                   id="address"
//                   name="address"
//                   value={formData.address}
//                   onChange={handleChange}
//                   onFocus={() => handleFocus('address')}
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="email">Email:</label>
//                 <input
//                   type="email"
//                   id="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   onFocus={() => handleFocus('email')}
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="mobileNumber">Mobile Number:</label>
//                 <input
//                   type="tel"
//                   id="mobileNumber"
//                   name="mobileNumber"
//                   value={formData.mobileNumber}
//                   onChange={handleChange}
//                   onFocus={() => handleFocus('mobileNumber')}
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="username">Username:</label>
//                 <input
//                   type="text"
//                   id="username"
//                   name="username"
//                   value={formData.username}
//                   onChange={handleChange}
//                   onFocus={() => handleFocus('username')}
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="password">Password:</label>
//                 <input
//                   type="password"
//                   id="password"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   onFocus={() => handleFocus('password')}
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="confirmPassword">Confirm Password:</label>
//                 <input
//                   type="password"
//                   id="confirmPassword"
//                   name="confirmPassword"
//                   value={formData.confirmPassword}
//                   onChange={handleChange}
//                   onFocus={() => handleFocus('confirmPassword')}
//                   required
//                 />
//               </div>
//               <p className="instruction">{getInstruction()}</p>
//               <button type="submit">Register</button>
//               <p>
//                 Already have an account?{" "}
//                 <Link
//                   to="/manufacturers/login"
//                   style={{
//                     textDecoration: "none",
//                     color: "#3498db",
//                   }}
//                 >
//                   Login here
//                 </Link>
//               </p>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register1;



import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register1.css';
import image from './img/manufacturer.jpg';
import image1 from './img/backky.jpeg';

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
        navigate('/manufacturers/login');
      }
    } catch (error) {
      console.error('Error registering manufacturer:', error);
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
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundImage: `url(${image1})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div
        style={{
          display: 'flex',
          width: '80%',
          height: '95%',
          // backdropFilter: 'blur(5px)',
          // boxShadow: '0 0 10px rgb(245, 245, 245)',
          borderRadius: '15px',
          overflow: 'hidden',
          // border: '1px solid #ddd',
        }}
      >
        <div
          style={{
            width: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f0f0f0',
          }}
        >
          <img
            src={image}
            alt="A meaningful description of the image"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>
        <div
          style={{
            width: '50%',
            padding: '40px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
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
                Already have an account?{' '}
                <Link
                  to="/manufacturers/login"
                  style={{
                    textDecoration: 'none',
                    color: 'yellow',
                  }}
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register1;
