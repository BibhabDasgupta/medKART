// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import WholesalerDetailsForm from './WholesalerDetails';
// import './DashBoard2.css';
// import Loader from './Loader';

// const DashBoard2 = () => {
//   const [loading, setLoading] = useState(true);
//   const [formSubmitted, setFormSubmitted] = useState(false);
//   const [status, setStatus] = useState(false);
//   const [accountNumber, setAccountNumber] = useState('');
//   const [isAccepted, setIsAccepted] = useState(false);
//   const navigate = useNavigate();


//   useEffect(() => {
//     const fetchPendingStatus = async () => {
//       try {
//         const username = localStorage.getItem('username');
//         if (username) {
//           const response = await axios.get(`http://localhost:5000/api/pendingStakeholders/${username}`);
//           const data = response.data;

//           if (data) {
//             setFormSubmitted(data.formSubmitted);
//             setStatus(data.status);
//           }
//         } else {
//           console.error('No username found in localStorage');
//         }
//       } catch (error) {
//         console.error('Error fetching pending status:', error);
//       } finally {
//         setLoading(false); // Set loading to false after fetching data
//       }
//     };

//     fetchPendingStatus();
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem('auth-token');
//     localStorage.removeItem('username'); // Remove username from localStorage as well
//     navigate('/');
//   };

//   const handleFormSubmit = () => {
//     setFormSubmitted(true);
//   };


//   if (loading) {
//     return <div><Loader /></div>;
//     return null;
//   }




//   return (
//     <div className="dashboard-container">
//       <h2>Wholesalers Dashboard</h2>
//       {status && formSubmitted ? (
//         <div>
//           <p>Admin have successfully accepted the account number. Please logout and login with the approppriate metamask account again to continue.</p>
//           <button className="logout-button" onClick={handleLogout}>Logout</button>
//         </div>
//       ) : (
//         <>
//           {!status && formSubmitted ? (
//             <div>
//               <p>Your submission is pending approval. Please wait for further instructions.</p>
//               <button className="logout-button" onClick={handleLogout}>Logout</button>
//             </div>
//           ) : (
//             <WholesalerDetailsForm onFormSubmit={handleFormSubmit} onLogout={handleLogout} />
//           )}
//         </>
//       )}
//     </div>
//   );
// }

// export default DashBoard2;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import WholesalerDetailsForm from './WholesalerDetails';
import './DashBoard2.css';
import Loader from './Loader';

const DashBoard2 = () => {
  const [loading, setLoading] = useState(true);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [status, setStatus] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    address: '',
    email: '',
    mobileNumber: '',
    role: 'Wholesaler',
    accountNumber: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const username = localStorage.getItem('username');
        if (username) {
          const response = await axios.get(`http://localhost:5000/api/wholesalers/${username}`);
          const data = response.data;

          if (data) {
            setFormData({
              username: data.username,
              name: data.name,
              address: data.address,
              email: data.email,
              mobileNumber: data.mobileNumber,
              role: 'Wholesaler',
              accountNumber: '' // Leave this field empty for the user to fill
            });
            setFormSubmitted(data.formSubmitted);
            setStatus(data.status);
          }
        } else {
          console.error('No username found in localStorage');
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserDetails();

    const fetchPendingStatus = async () => {
      try {
        const username = localStorage.getItem('username');
        if (username) {
          const response = await axios.get(`http://localhost:5000/api/pendingStakeholders/${username}`);
          const data = response.data;

          if (data) {
            setFormSubmitted(data.formSubmitted);
            setStatus(data.status);
          }
        } else {
          console.error('No username found in localStorage');
        }
      } catch (error) {
        console.error('Error fetching pending status:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPendingStatus();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('auth-token');
    localStorage.removeItem('username');
    navigate('/');
  };

  const handleFormSubmit = () => {
    setFormSubmitted(true);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <h2>Wholesalers Dashboard</h2>
        {status && formSubmitted ? (
          <div>
            <p>Admin has successfully accepted your account number. Please log out and log in with the appropriate MetaMask account again to continue.</p>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <>
            {!status && formSubmitted ? (
              <div>
                <p>Your submission is pending approval. Please wait for further instructions.</p>
                <button className="logout-button" onClick={handleLogout}>Logout</button>
              </div>
            ) : (
              <WholesalerDetailsForm
                formData={formData}
                setFormData={setFormData}
                onFormSubmit={handleFormSubmit}
                onLogout={handleLogout}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DashBoard2;

