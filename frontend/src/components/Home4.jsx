import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home4.css';
import Web3 from 'web3';
import axios from 'axios';
import PharmaChain from '../truffle_abis/PharmaChain.json';
import PharmaDistribution from '../truffle_abis/PharmaDistribution.json';

const Home4 = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState('Home');
  const [accountDetails, setAccountDetails] = useState(null);
  const [currentAccount, setCurrentAccount] = useState('');
  const [wholesalers, setWholesalers] = useState([]);
  const [drugName, setDrugName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [wholesalerId, setWholesalerId] = useState('');
  const [pharmaChain, setPharmaChain] = useState(null);
  const [pharmaDistribution, setPharmaDistribution] = useState(null);
  const [myBatches, setMyBatches] = useState([]);
  const [hospitalRequests, setHospitalRequests] = useState([]);
  const [isHospitalPharmacy, setIsHospitalPharmacy] = useState(null);

  useEffect(() => {
    const loadWeb3 = async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setCurrentAccount(accounts[0]);
        fetchAccountDetails(accounts[0]);
        await checkHospitalPharmacyStatus(web3, accounts[0]);
        await loadContractData(web3);
      } else if (window.web3) {
        const web3 = new Web3(window.web3.currentProvider);
        const accounts = await web3.eth.getAccounts();
        setCurrentAccount(accounts[0]);
        fetchAccountDetails(accounts[0]);
        await checkHospitalPharmacyStatus(web3, accounts[0]);
        await loadContractData(web3);
      } else {
        console.error('Non-Ethereum browser detected. You should consider trying MetaMask!');
      }
    };

    const fetchAccountDetails = async (account) => {
      try {
        const response = await axios.post('http://localhost:5000/api/pendingStakeholders/find', { accountNumber: account });
        setAccountDetails(response.data);
      } catch (error) {
        console.error('Error fetching account details:', error);
      }
    };

    const fetchDetails = async (username) => {
      try {
        const response = await axios.get(`http://localhost:5000/api/pendingStakeholders/${username}`);
        return response.data;
      } catch (error) {
        console.error('Error fetching details:', error);
        return null;
      }
    };

    const checkHospitalPharmacyStatus = async (web3, account) => {
      try {
        const networkId = await web3.eth.net.getId();
        const networkData = PharmaChain.networks[networkId];
        if (networkData) {
          const contract = new web3.eth.Contract(PharmaChain.abi, networkData.address);
          const hospitalpharmacy = await contract.methods.getHospitalPharmacy(account).call();
          if (hospitalpharmacy.account.toLowerCase() === account.toLowerCase()) {
            setIsHospitalPharmacy(true);
          } else {
            setIsHospitalPharmacy(false);
          }
        } else {
          setIsHospitalPharmacy(false);
        }
      } catch (error) {
        if (error.message.includes("Hospital/Pharmacy does not exist")) {
          setIsHospitalPharmacy(false);
        } else {
          console.error('Error checking Hospital/Pharmacy status:', error);
          setIsHospitalPharmacy(false);
        }
      }
    };


    const loadContractData = async (web3) => {
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = PharmaChain.networks[networkId];
      const pharmaChainInstance = new web3.eth.Contract(PharmaChain.abi, deployedNetwork && deployedNetwork.address);
      setPharmaChain(pharmaChainInstance);

      const deployedNetwork2 = PharmaDistribution.networks[networkId];
      const pharmaDistributionInstance = new web3.eth.Contract(PharmaDistribution.abi, deployedNetwork2 && deployedNetwork2.address);
      setPharmaDistribution(pharmaDistributionInstance);

      const fetchAndSetDetails = async (method, getEntityMethod) => {
        const accounts = await pharmaChainInstance.methods[method]().call();
        const details = await Promise.all(
          accounts.map(async (addr) => {
            const data = await pharmaChainInstance.methods[getEntityMethod](addr).call();
            const additionalDetails = await fetchDetails(data.username);
            return { ...data, ...additionalDetails };
          })
        );
        return details;
      };

      const wholesalers = await fetchAndSetDetails('getAllWholesalers', 'getWholesaler');
      setWholesalers(wholesalers);

      if (pharmaDistribution) {
        try {
          const requests = await pharmaDistribution.methods
            .getAllHospitalRequests()
            .call();
          const filteredRequests = requests
            .map((request) => ({
              ...request,
              requestId: Number(request.requestId), // Convert BigInt to Number
              batchId: Number(request.batchId), // Convert BigInt to Number
            }))
            .filter(
              (request) =>
                request.recipient.toLowerCase() ===
                  currentAccount.toLowerCase() && request.status === "Pending"
            );
          setHospitalRequests(filteredRequests);
        } catch (error) {
          console.error("Error fetching wholesaler requests:", error);
        }
      }

      await renderMyDrugs1();
    };
  
    loadWeb3();
  }, [currentAccount]);

  const renderMyDrugs1 = async () => {
    const web3 = new Web3(window.ethereum); // Ensure web3 instance is available
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = PharmaDistribution.networks[networkId];
    const pharmaDistribution = new web3.eth.Contract(
      PharmaDistribution.abi,
      deployedNetwork && deployedNetwork.address
    );

    try {
      // Fetch all batches
      const allBatches = await pharmaDistribution.methods
        .getAllBatches()
        .call();
      console.log("All Batches:", allBatches); // Debugging statement

      // Filter batches owned by the current account
      const myBatches = allBatches
        .filter(
          (batch) => batch.owner.toLowerCase() === currentAccount.toLowerCase()
        )
        .map((batch) => ({
          ...batch,
          batchId: batch.batchId.toString(),
          quantity: batch.quantity.toString(), // Convert BigInt to string
        }));
      console.log("My Batches:", myBatches); // Debugging statement
      setMyBatches(myBatches);
    } catch (error) {
      console.error("Error fetching batches:", error);
    }
  };


  const handleLogout = () => {
    localStorage.removeItem('auth-token');
    localStorage.removeItem('username');
    navigate('/');
  };

  const handleRequestDrugsSubmit = async (e) => {
    e.preventDefault();
    if (pharmaDistribution) {
      try {
        await pharmaDistribution.methods.requestDrugsFromWholesaler(drugName, quantity, wholesalerId).send({ from: currentAccount });
        alert('Drug request sent successfully!');
      } catch (error) {
        console.error('Error sending drug request:', error);
      }
    }
  };

  const handleApproveRequest = async (requestId) => {
    try {
      if (pharmaDistribution) {
        await pharmaDistribution.methods
          .acceptDeliveryRequestFromDistributor2(requestId)
          .send({ from: currentAccount });
        alert("Request approved successfully");
        // Refresh the request list
        const requests = await pharmaDistribution.methods
          .getAllHospitalRequests()
          .call();
        const filteredRequests = requests.filter(
          (request) =>
            request.recipient.toLowerCase() === currentAccount.toLowerCase() &&
            request.status === "Pending"
        );
        setHospitalRequests(filteredRequests);
      }
    } catch (error) {
      console.error("Error approving request:", error);
      alert("Failed to approve request");
    }
  };

  const renderList = (list, title) => (
    <div>
      <h2>{title}</h2>
      {list.length > 0 ? (
        <table className='requests-table'>
          <thead>
            <tr>
              <th>Username</th>
              <th>Account</th>
              <th>Name</th>
              <th>Address</th>
              <th>Email</th>
              <th>Mobile Number</th>
            </tr>
          </thead>
          <tbody style={{color:'#0e0e0e'}}>
            {list.map((item, index) => (
              <tr key={index}>
                <td>{item.username}</td>
                <td>{item.account}</td>
                <td>{item.name}</td>
                <td>{item.address}</td>
                <td>{item.email}</td>
                <td>{item.mobileNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No {title.toLowerCase()} found</p>
      )}
    </div>
  );

  const renderMyDrugs = () => (
    <div>
      <h2>My Drugs</h2>
      {myBatches.length > 0 ? (
        <table className='requests-table'>
          <thead>
            <tr>
              <th>Batch ID</th>
              <th>Owner</th>
              <th>Quantity</th>
              <th>Final Recipient</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody style={{color:'#0e0e0e'}}>
            {myBatches.map((batch, index) => (
              <tr key={index}>
                <td>{batch.batchId}</td>
                <td>{batch.owner}</td>
                <td>{batch.quantity}</td>
                <td>{batch.finalRecipient}</td>
                <td>{batch.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No batches available.</p>
      )}
    </div>
  );

  const renderRequestDrugsForm = () => (
    <div>
      <h2>Request Drugs</h2>
      <form onSubmit={handleRequestDrugsSubmit}>
        <div>
          <label htmlFor="drugName">Drug Name:</label>
          <input
            type="text"
            id="drugName"
            value={drugName}
            onChange={(e) => setDrugName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="wholesalerId">Wholesaler ID:</label>
          <input
            type="text"
            id="wholesalerId"
            value={wholesalerId}
            onChange={(e) => setWholesalerId(e.target.value)}
            required
          />
        </div>
        <button type="submit">Send Request</button>
      </form>
    </div>
  );

  const renderTable1 = (data, title, onApprove) => (
    <div>
      <h2>{title}</h2>
      {data.length > 0 ? (
        <table className='requests-table'>
          <thead>
            <tr>
              <th>Request ID</th>
              <th>Batch ID</th>
              <th>Requester</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody style={{color:'#0e0e0e'}}>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.requestId}</td>
                <td>{item.batchId}</td>
                <td>{item.requester}</td>
                <td>{item.status}</td>
                <td>
                  {item.status === "Pending" && (
                    <button onClick={() => onApprove(item.requestId)}>
                      Approve
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No {title.toLowerCase()} found</p>
      )}
    </div>
  );

  const renderContent = () => {
    switch (selectedOption) {
      case 'Home':
        return (
          <div>
            {accountDetails && (
              <div>
                <h2>Account Details</h2>
                <p>Username: {accountDetails.username}</p>
                <p>Name: {accountDetails.name}</p>
                <p>Address: {accountDetails.address}</p>
                <p>Email: {accountDetails.email}</p>
                <p>Mobile Number: {accountDetails.mobileNumber}</p>
                <p>Role: {accountDetails.role}</p>
              </div>
            )}
          </div>
        );
      case 'Wholesaler List':
        return renderList(wholesalers, 'Wholesaler List');
      case 'Request Drugs':
        return renderRequestDrugsForm();
      case 'Pending Delivery Requests':
        return renderTable1(
          hospitalRequests,
          "Pending Distributor Requests",
          handleApproveRequest
        );
      case 'My Drugs':
        return renderMyDrugs();
      default:
        return <div>404 Not Found</div>;
    }
  };

  return (
    <div>
    {isHospitalPharmacy === null ? (
      <div>Loading...</div>
    ) : isHospitalPharmacy === false ? (
      <div className="not-hospitalpharmacy-container">You are not a hospital/pharmacy</div>
    ) : (
    <div className="home4-container">
      <div className="sidebar">
        <ul>
          <li onClick={() => setSelectedOption('Home')}>Home</li>
          <li onClick={() => setSelectedOption('Wholesaler List')}>Wholesaler List</li>
          <li onClick={() => setSelectedOption('Request Drugs')}>Request Drugs</li>
          <li onClick={() => setSelectedOption('Pending Delivery Requests')}>Pending Delivery Requests</li>
          <li onClick={() => setSelectedOption('My Drugs')}>My Drugs</li>
          <li onClick={handleLogout}>Logout</li>
        </ul>
      </div>
      <div className="content">
        {renderContent()}
      </div>
    </div>
      )}
     </div>
  );
};

export default Home4;



