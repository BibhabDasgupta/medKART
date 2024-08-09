// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './Login6.css';

// const Login6 = () => {
//   const [formData, setFormData] = useState({
//     username: '',
//     password: '',
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
//       const response = await axios.post(`http://localhost:5000/api/admin/login`, formData);
//       if (response.data.token) {
//         localStorage.setItem('auth-token', response.data.token);
//         console.log('User is logged in');
//         navigate('/admin/dashboard'); // Adjust the path as needed
//       }
//     } catch (error) {
//       console.error('Error logging in:', error);
//       // Handle error, show message to user, etc.
//     }
//   };

//   const handleBackToHome = () => {
//     navigate('/');
//   };

//   const getInstruction = () => {
//     switch (focusedField) {
//       case 'username':
//         return 'Username should be at least 3 characters long.';
//       case 'password':
//         return 'Password should be at least 6 characters long.';
//       default:
//         return '';
//     }
//   };


//   return (
//     <div className="login-card">
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label htmlFor="username">Username:</label>
//           <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} onFocus={() => handleFocus('username')} required />
//         </div>
//         <div className="form-group">
//           <label htmlFor="password">Password:</label>
//           <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} onFocus={() => handleFocus('password')} required />
//         </div>
//         <p className="instruction">{getInstruction()}</p>
//         <button type="submit">Login</button>
//       </form>
//       <br></br>
//       <button onClick={handleBackToHome} className="back-to-home">Back to Home</button>
//       <p>
//         New user? <Link to="/admin/register">Register</Link>
//       </p>
//     </div>
//   );
// };

// export default Login6;


import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login6.css";
import image from "./img/admin.jpg";
import image1 from "./img/backky.jpeg" // Import your image

const Login6 = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [focusedField, setFocusedField] = useState("");
  const [error, setError] = useState(""); // State for error messages
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
      const response = await axios.post(
        "http://localhost:5000/api/admin/login",
        formData
      );
      if (response.data.token) {
        localStorage.setItem("auth-token", response.data.token);
        localStorage.setItem("username", formData.username); // Store the username
        console.log("User is logged in");
        navigate("/admin/dashboard"); // Redirect to the dashboard or desired page
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setError(
        "Login failed. Please check your username and password and try again."
      ); // Set error message
    }
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  const getInstruction = () => {
    switch (focusedField) {
      case "username":
        return "Username should be at least 3 characters long.";
      case "password":
        return "Password should be at least 6 characters long.";
      default:
        return "";
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        // backgroundColor: "red", 
        backgroundImage: `url(${image1})`,  // Replace with your image path
        backgroundSize: "cover", // Ensures the image covers the entire background
        backgroundPosition: "center",// Optional: background color for the whole page
      }}
    >
      <div
        style={{
          display: "flex",
          width: "70%",
          height: "80%",
          // backgroundColor: "#fff",
          backdropFilter:"blur(5px)",
          boxShadow: "0 0 10px rgb(245, 245, 245)",
          borderRadius: "15px",
          // boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Shadow for the card effect
          overflow: "hidden", // Ensure content doesn't overflow the card
          border: "1px solid #ddd", // Optional: border for the card
        }}
      >
        <div
          style={{
            width: "50%", // 50% of the card width for the image
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#f0f0f0", // Optional: background color for the image section
          }}
        >
          <img
            src={image}
            alt="A meaningful description of the image"
            style={{
              width: "100%", // Ensure the image fits nicely within its section
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
        <div
          style={{
            width: "50%", // 50% of the card width for the login form
            padding: "40px", // Padding for the login form section
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
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
                  onFocus={() => handleFocus("username")}
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
                  onFocus={() => handleFocus("password")}
                  required
                />
              </div>
              {error && <p className="error-message">{error}</p>}{" "}
              {/* Display error message */}
              <p className="instruction">{getInstruction()}</p>
              <button type="submit">Login</button>
            </form>
            <br />
            <button onClick={handleBackToHome} className="back-to-home">
              Back to Home
            </button>
            <p>
              New user?{" "}
              <Link
                to="/admin/register"
                style={{
                  textDecoration: "none",
                  color: "#3498db",
                }}
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login6;
