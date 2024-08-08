// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./PendingRequests.css"; // Import the CSS file for styling
// import Sidebar from "./Sidebar";

// const PendingRequests = () => {
//   const [pendingRequests, setPendingRequests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchPendingRequests = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:5000/api/admin/pending-requests"
//         );
//         const pending = response.data.filter((request) => !request.status);
//         setPendingRequests(pending);
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchPendingRequests();
//   }, []);

//   return (
//     <div style={{
//       display:"flex",
//       height:"100vh"
//     }}>
//       <Sidebar/>
//       <div className="pending-requests-container">
//         <h2>Pending Requests</h2>
//         {loading ? (
//           <p>Loading...</p>
//         ) : error ? (
//           <p>Error loading requests: {error}</p>
//         ) : pendingRequests.length === 0 ? (
//           <p>No pending requests</p>
//         ) : (
//           <table className="requests-table">
//             <thead>
//               <tr>
//                 <th>Username</th>
//                 <th>Name</th>
//                 <th>Address</th>
//                 <th>Email</th>
//                 <th>Mobile Number</th>
//                 <th>Role</th>
//                 <th>Account Number</th>
//               </tr>
//             </thead>
//             <tbody>
//               {pendingRequests.map((request) => (
//                 <tr key={request._id}>
//                   <td>{request.username}</td>
//                   <td>{request.name}</td>
//                   <td>{request.address}</td>
//                   <td>{request.email}</td>
//                   <td>{request.mobileNumber}</td>
//                   <td>{request.role}</td>
//                   <td>{request.accountNumber}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PendingRequests;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./PendingRequests.css"; // Import the CSS file for styling
// import Sidebar from "./Sidebar";

// const PendingRequests = () => {
//   const [pendingRequests, setPendingRequests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchPendingRequests = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:5000/api/admin/pending-requests"
//         );
//         const pending = response.data.filter((request) => !request.status);
//         setPendingRequests(pending);
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchPendingRequests();
//   }, []);

//   const handleApprove = (id) => {
//     // Handle the approve logic here
//     console.log(`Approved request with id: ${id}`);
//   };

//   const handleReject = (id) => {
//     // Handle the reject logic here
//     console.log(`Rejected request with id: ${id}`);
//   };

//   return (
//     <div style={{ display: "flex", height: "100vh" }}>
//       <Sidebar />
//       <div className="pending-requests-container">
//         <h2>Pending Requests</h2>
//         {loading ? (
//           <p>Loading...</p>
//         ) : error ? (
//           <p>Error loading requests: {error}</p>
//         ) : pendingRequests.length === 0 ? (
//           <p>No pending requests</p>
//         ) : (
//           <table className="requests-table">
//             <thead>
//               <tr>
//                 <th>Username</th>
//                 <th>Name</th>
//                 <th>Address</th>
//                 <th>Email</th>
//                 <th>Mobile Number</th>
//                 <th>Role</th>
//                 <th>Account Number</th>
//                 <th>Actions</th> {/* Added Actions column */}
//               </tr>
//             </thead>
//             <tbody>
//               {pendingRequests.map((request) => (
//                 <tr key={request._id}>
//                   <td>{request.username}</td>
//                   <td>{request.name}</td>
//                   <td>{request.address}</td>
//                   <td>{request.email}</td>
//                   <td>{request.mobileNumber}</td>
//                   <td>{request.role}</td>
//                   <td>{request.accountNumber}</td>
//                   <td>
//                     <button
//                       className="approve-button"
//                       onClick={() => handleApprove(request._id)}
//                     >
//                       Approve
//                     </button>
//                     <button
//                       className="reject-button"
//                       onClick={() => handleReject(request._id)}
//                     >
//                       Reject
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PendingRequests;


import React, { useState, useEffect } from "react";
import axios from "axios";
import Web3 from "web3";
import Sidebar from "./Sidebar";
import PharmaChain from "../truffle_abis/PharmaChain.json";
import "./PendingRequests.css";
import Loader from "./Loader";

const PendingRequests = () => {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [owner, setOwner] = useState("");

  useEffect(() => {
    const fetchPendingRequests = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/admin/pending-requests"
        );
        const pending = response.data.filter((request) => !request.status);
        setPendingRequests(pending);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    const loadBlockchainData = async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.enable();

        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);

        const networkId = await web3.eth.net.getId();
        const networkData = PharmaChain.networks[networkId];
        if (networkData) {
          const contractInstance = new web3.eth.Contract(
            PharmaChain.abi,
            networkData.address
          );
          setContract(contractInstance);

          const ownerAddress = await contractInstance.methods.owner().call();
          setOwner(ownerAddress);
        } else {
          setError("PharmaChain contract not deployed to detected network.");
        }
      } else {
        setError("Non-Ethereum browser detected. You should consider trying MetaMask!");
      }
    };

    fetchPendingRequests();
    loadBlockchainData();
  }, []);

  const handleApprove = async (username, accountNumber, role) => {
    try {
      if (account !== owner) {
        alert("You are not authorized to approve this request.");
        return;
      }

      switch (role.toLowerCase()) {
        case "manufacturer":
          await contract.methods
            .registerManufacturer(username, accountNumber)
            .send({ from: account });
          break;
        case "wholesaler":
          await contract.methods
            .registerWholesaler(username, accountNumber)
            .send({ from: account });
          break;
        case "distributor":
          await contract.methods
            .registerDistributor(username, accountNumber)
            .send({ from: account });
          break;
        case "hospital/pharmacy":
          await contract.methods
            .registerHospitalPharmacy(username, accountNumber)
            .send({ from: account });
          break;
        default:
          throw new Error("Invalid role provided.");
      }

      await axios.post("http://localhost:5000/api/pendingStakeholders/accept", {
        username,
      });

      const updatedRequests = pendingRequests.filter(
        (request) => request.username !== username
      );
      setPendingRequests(updatedRequests);
    } catch (error) {
      setError("Failed to approve the request. Please try again.");
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/pendingStakeholders/reject/${id}`);

      const updatedRequests = pendingRequests.filter(
        (request) => request._id !== id
      );
      setPendingRequests(updatedRequests);
    } catch (error) {
      setError("Failed to reject the request. Please try again.");
    }
  };

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "1fr 8fr",
      height: "100vh"
    }}>
      <Sidebar />
      <div className="pending-requests-container">
        <h2>Pending Requests</h2>
        {loading ? (
          <Loader />
        ) : error ? (
          <p>Error loading requests: {error}</p>
        ) : pendingRequests.length === 0 ? (
          <p>No pending requests</p>
        ) : (
          <table className="requests-table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Name</th>
                <th>Address</th>
                <th>Email</th>
                <th>Mobile Number</th>
                <th>Role</th>
                <th>Account Number</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingRequests.map((request) => (
                <tr key={request._id}>
                  <td>{request.username}</td>
                  <td>{request.name}</td>
                  <td>{request.address}</td>
                  <td>{request.email}</td>
                  <td>{request.mobileNumber}</td>
                  <td>{request.role}</td>
                  <td>{request.accountNumber}</td>
                  <td>
                    <button
                      className="approve-button"
                      onClick={() =>
                        handleApprove(
                          request.username,
                          request.accountNumber,
                          request.role
                        )
                      }
                    >
                      Approve
                    </button>
                    <button
                      className="reject-button"
                      onClick={() => handleReject(request._id)}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default PendingRequests;
