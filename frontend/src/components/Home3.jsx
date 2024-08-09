import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home3.css';
import Web3 from 'web3';
import axios from 'axios';
import PharmaChain from '../truffle_abis/PharmaChain.json';
import PharmaDistribution from '../truffle_abis/PharmaDistribution.json';
import Select from 'react-select';

const Home3 = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState('Home');
  const [accountDetails, setAccountDetails] = useState(null);
  const [currentAccount, setCurrentAccount] = useState('');
  const [manufacturers, setManufacturers] = useState([]);
  const [wholesalers, setWholesalers] = useState([]);
  const [hospitalsPharmacies, setHospitalsPharmacies] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [pendingRequests1, setPendingRequests1] = useState([]);
  const [myBatches, setMyBatches] = useState([]);
  const [batchIdToSend, setBatchIdToSend] = useState('');
  const [hospitalAddressToSend, setHospitalAddressToSend] = useState('');
  const [isDistributor, setIsDistributor] = useState(null);
  const [wholesalerOptions, setWholesalerOptions] = useState([]);
const [hospitalPharmacyOptions, setHospitalPharmacyOptions] = useState([]);
const [selectedWholesaler, setSelectedWholesaler] = useState(null);
const [selectedHospitalPharmacy, setSelectedHospitalPharmacy] = useState(null);


  useEffect(() => {
    const loadWeb3 = async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        console.log('Accounts from MetaMask:', accounts[0]);
        setCurrentAccount(accounts[0]);
        fetchAccountDetails(accounts[0]);
        await checkDistributorStatus(web3, accounts[0]);
        await loadContractData(web3);
      } else if (window.web3) {
        const web3 = new Web3(window.web3.currentProvider);
        const accounts = await web3.eth.getAccounts();
        console.log('Accounts from MetaMask (legacy):', accounts);
        setCurrentAccount(accounts[0]);
        fetchAccountDetails(accounts[0]);
        await checkDistributorStatus(web3, accounts[0]);
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

    const checkDistributorStatus = async (web3, account) => {
      try {
        const networkId = await web3.eth.net.getId();
        const networkData = PharmaChain.networks[networkId];
        if (networkData) {
          const contract = new web3.eth.Contract(PharmaChain.abi, networkData.address);
          const distributor = await contract.methods.getDistributor(account).call();
          if (distributor.account.toLowerCase() === account.toLowerCase()) {
            setIsDistributor(true);
          } else {
            setIsDistributor(false);
          }
        } else {
          setIsDistributor(false);
        }
      } catch (error) {
        if (error.message.includes("Distributor does not exist")) {
          setIsDistributor(false);
        } else {
          console.error('Error checking distributor status:', error);
          setIsDistributor(false);
        }
      }
    };


    const loadContractData = async (web3) => {
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = PharmaChain.networks[networkId];
      const pharmaChain = new web3.eth.Contract(PharmaChain.abi, deployedNetwork && deployedNetwork.address);

      const fetchAndSetDetails = async (method, getMethod) => {
        const accounts = await pharmaChain.methods[method]().call();
        const details = await Promise.all(
          accounts.map(async (addr) => {
            const data = await pharmaChain.methods[getMethod](addr).call();
            const additionalDetails = await fetchDetails(data.username);
            return { ...data, ...additionalDetails };
          })
        );
        return details;
      };

      const manufacturers = await fetchAndSetDetails('getAllManufacturers', 'getManufacturer');
      setManufacturers(manufacturers);

      const wholesalers = await fetchAndSetDetails('getAllWholesalers', 'getWholesaler');
      setWholesalers(wholesalers);

      const hospitalsPharmacies = await fetchAndSetDetails('getAllHospitalPharmacies', 'getHospitalPharmacy');
      setHospitalsPharmacies(hospitalsPharmacies);
      const wholesalerOpts = wholesalers.map(w => ({
        value: w.account,
        label: `${w.username} (${w.account})`
      }));
      setWholesalerOptions(wholesalerOpts);
  
      const hospitalPharmacyOpts = hospitalsPharmacies.map(hp => ({
        value: hp.account,
        label: `${hp.username} (${hp.account})`
      }));
      setHospitalPharmacyOptions(hospitalPharmacyOpts);

      await fetchPendingRequests();
      await fetchPendingRequests1();
      await renderMyDrugs1(); // Move this call here to ensure it's called after contract data is loaded
    };

   

    loadWeb3();
  }, [currentAccount]);

  const fetchPendingRequests = async () => {
    const web3 = new Web3(window.ethereum); // Ensure web3 instance is available
    const networkId = await web3.eth.net.getId();
  
    // Get PharmaChain contract instance
    const pharmaChainNetwork = PharmaChain.networks[networkId];
    const pharmaChain = new web3.eth.Contract(PharmaChain.abi, pharmaChainNetwork && pharmaChainNetwork.address);
  
    // Get PharmaDistribution contract instance
    const pharmaDistributionNetwork = PharmaDistribution.networks[networkId];
    const pharmaDistribution = new web3.eth.Contract(PharmaDistribution.abi, pharmaDistributionNetwork && pharmaDistributionNetwork.address);
  
    try {
      // Fetch all manufacturer addresses
      const manufacturerAddresses = await pharmaChain.methods.getAllManufacturers().call();
  
      // Fetch all distributor requests
      const allRequests = await pharmaDistribution.methods.getAllDistributorRequests().call();
      console.log('All Requests:', allRequests); // Debugging statement
  
      // Convert manufacturer addresses to a set for quick lookup
      const manufacturerSet = new Set(manufacturerAddresses.map(addr => addr.toLowerCase()));
  
      // Filter requests to include only those where the requester is a manufacturer
      const filteredRequests = allRequests
        .filter(request => {
          // Check if requester is in the set of manufacturer addresses
          return manufacturerSet.has(request.requester.toLowerCase()) && request.recipient.toLowerCase() === currentAccount.toLowerCase() && request.status === 'Pending';
        })
        .map(request => ({
          ...request,
          requestId: request.requestId.toString(),  // Convert BigInt to string
          batchId: request.batchId.toString(),      // Convert BigInt to string
        }));
      
      console.log('Filtered Requests:', filteredRequests); // Debugging statement
      setPendingRequests(filteredRequests);
    } catch (error) {
      console.error('Error fetching pending requests:', error);
    }
  };
  

  const fetchPendingRequests1 = async () => {
    const web3 = new Web3(window.ethereum); // Ensure web3 instance is available
    const networkId = await web3.eth.net.getId();
  
    // Get PharmaChain contract instance
    const pharmaChainNetwork = PharmaChain.networks[networkId];
    const pharmaChain = new web3.eth.Contract(PharmaChain.abi, pharmaChainNetwork && pharmaChainNetwork.address);
  
    // Get PharmaDistribution contract instance
    const pharmaDistributionNetwork = PharmaDistribution.networks[networkId];
    const pharmaDistribution = new web3.eth.Contract(PharmaDistribution.abi, pharmaDistributionNetwork && pharmaDistributionNetwork.address);
  
    try {
      // Fetch all manufacturer addresses
      const wholesalerAddresses = await pharmaChain.methods.getAllWholesalers().call();
  
      // Fetch all distributor requests
      const allRequests = await pharmaDistribution.methods.getAllDistributorRequests().call();
      console.log('All Requests:', allRequests); // Debugging statement
  
      // Convert manufacturer addresses to a set for quick lookup
      const wholesalerSet = new Set(wholesalerAddresses.map(addr => addr.toLowerCase()));
  
      // Filter requests to include only those where the requester is a manufacturer
      const filteredRequests = allRequests
        .filter(request => {
          // Check if requester is in the set of manufacturer addresses
          return wholesalerSet.has(request.requester.toLowerCase()) && request.recipient.toLowerCase() === currentAccount.toLowerCase() && request.status === 'Pending';
        })
        .map(request => ({
          ...request,
          requestId: request.requestId.toString(),  // Convert BigInt to string
          batchId: request.batchId.toString(),      // Convert BigInt to string
        }));
      
      console.log('Filtered Requests:', filteredRequests); // Debugging statement
      setPendingRequests1(filteredRequests);
    } catch (error) {
      console.error('Error fetching pending requests:', error);
    }
  };

  const renderMyDrugs1 = async () => {
    const web3 = new Web3(window.ethereum); // Ensure web3 instance is available
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = PharmaDistribution.networks[networkId];
    const pharmaDistribution = new web3.eth.Contract(PharmaDistribution.abi, deployedNetwork && deployedNetwork.address);

    try {
      // Fetch all batches
      const allBatches = await pharmaDistribution.methods.getAllBatches().call();
      console.log('All Batches:', allBatches); // Debugging statement

      // Filter batches owned by the current account
      const myBatches = allBatches
        .filter(batch => batch.owner.toLowerCase() === currentAccount.toLowerCase())
        .map(batch => ({
          ...batch,
          batchId: batch.batchId.toString(),
          quantity: batch.quantity.toString(), // Convert BigInt to string
        }));
      console.log('My Batches:', myBatches); // Debugging statement
      setMyBatches(myBatches);
    } catch (error) {
      console.error('Error fetching batches:', error);
    }
  };

  const handleSendDrugs = async () => {
    const web3 = new Web3(window.ethereum); // Ensure web3 instance is available
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = PharmaDistribution.networks[networkId];
    const pharmaDistribution = new web3.eth.Contract(PharmaDistribution.abi, deployedNetwork && deployedNetwork.address);

    try {
      // const regex = /\(([^)]+)\)/;
      console.log(typeof hospitalAddressToSend)
      
      // const match = hospitalAddressToSend.match(regex);
      
      // console.log(match)
      await pharmaDistribution.methods.createDeliveryRequestToWholesaler(
        
        parseInt(batchIdToSend), // Convert string to BigInt
       hospitalAddressToSend.value
      ).send({ from: currentAccount });
      
      // Clear form fields and refresh the list
      setBatchIdToSend('');
      setHospitalAddressToSend('');
      alert("Succesfully Sent Drugs");
      await renderMyDrugs1(); // Refresh the batch list
    } catch (error) {
      console.error('Error sending drugs:', error);
    }
  };

  const handleSendDrugs1 = async () => {
    const web3 = new Web3(window.ethereum); // Ensure web3 instance is available
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = PharmaDistribution.networks[networkId];
    const pharmaDistribution = new web3.eth.Contract(PharmaDistribution.abi, deployedNetwork && deployedNetwork.address);

    try {
      await pharmaDistribution.methods.createDeliveryRequestToHospital(
        parseInt(batchIdToSend), // Convert string to BigInt
        hospitalAddressToSend
      ).send({ from: currentAccount });
      
      // Clear form fields and refresh the list
      setBatchIdToSend('');
      setHospitalAddressToSend('');
      alert("Succesfully Sent Drugs");
      await renderMyDrugs1(); // Refresh the batch list
    } catch (error) {
      console.error('Error sending drugs:', error);
    }
  };

  const handleApproveRequest = async (requestId) => {
    const web3 = new Web3(window.ethereum); // Ensure web3 instance is available
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = PharmaDistribution.networks[networkId];
    const pharmaDistribution = new web3.eth.Contract(PharmaDistribution.abi, deployedNetwork && deployedNetwork.address);
  
    try {
      await pharmaDistribution.methods.acceptTransferRequestFromManufacturer(requestId).send({ from: currentAccount });
      // Refresh the pending requests list
      fetchPendingRequests();
    } catch (error) {
      console.error('Error approving request:', error);
    }
  };

  
  const handleApproveRequest1 = async (requestId) => {
    const web3 = new Web3(window.ethereum); // Ensure web3 instance is available
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = PharmaDistribution.networks[networkId];
    const pharmaDistribution = new web3.eth.Contract(PharmaDistribution.abi, deployedNetwork && deployedNetwork.address);
  
    try {
      await pharmaDistribution.methods.acceptDeliveryRequestFromWholesaler(requestId).send({ from: currentAccount });
      // Refresh the pending requests list
      fetchPendingRequests1();
    } catch (error) {
      console.error('Error approving request:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('auth-token');
    localStorage.removeItem('username');
    navigate('/');
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

  const renderSendDrugs = () => (
    <div className="form-container">
      <h2>Send Drugs to Wholesalers</h2>
      <form onSubmit={(e) => {
        e.preventDefault();
        handleSendDrugs();
      }}>
        <div className="form-group">
          <label htmlFor="batchId">Batch ID:</label>
          <input
            type="text"
            id="batchId"
            value={batchIdToSend}
            onChange={(e) => setBatchIdToSend(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="wholesalerAddress">Wholesaler:</label>
          <Select
            options={wholesalerOptions}
            onChange={(selectedOption) => setHospitalAddressToSend(selectedOption)}
            value={hospitalAddressToSend}
            placeholder="Select a wholesaler"
          />
        </div>
        <button type="submit" className="submit-btn">Send Drugs</button>
      </form>
    </div>
  );

  const renderSendDrugs1 = () => (
    <div className="form-container">
      <h2>Send Drugs to Hospitals/Pharmacies</h2>
      <form onSubmit={(e) => {
        e.preventDefault();
        handleSendDrugs1();
      }}>
        <div className="form-group">
          <label htmlFor="batchId">Batch ID:</label>
          <input
            type="text"
            id="batchId"
            value={batchIdToSend}
            onChange={(e) => setBatchIdToSend(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="hospitalPharmacyAddress">Hospital/Pharmacy:</label>
          <Select
            options={hospitalPharmacyOptions}
            onChange={(selectedOption) => setSelectedHospitalPharmacy(selectedOption)}
            value={selectedHospitalPharmacy}
            placeholder="Select a hospital/pharmacy"
          />
        </div>
        <button type="submit" className="submit-btn">Send Drugs</button>
      </form>
    </div>
  );

  const renderPendingRequests = () => (
    <div>
      <h2>Pending Delivery Requests</h2>
      {pendingRequests.length > 0 ? (
        <table className='requests-table'>
          <thead>
            <tr>
              <th>Request ID</th>
              <th>Batch ID</th>
              <th>Requester</th>
              <th>Recipient</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody style={{color:'#0e0e0e'}}>
            {pendingRequests.map((request, index) => (
              <tr key={index}>
                <td>{request.requestId}</td>
                <td>{request.batchId}</td>
                <td>{request.requester}</td>
                <td>{request.recipient}</td>
                <td>{request.status}</td>
                <td>
                  <button onClick={() => handleApproveRequest(request.requestId)}>Approve</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No pending requests</p>
      )}
    </div>
  );

  const renderPendingRequests1 = () => (
    <div>
      <h2>Pending Delivery Requests</h2>
      {pendingRequests1.length > 0 ? (
        <table className="requests-table">
          <thead>
            <tr>
              <th>Request ID</th>
              <th>Batch ID</th>
              <th>Requester</th>
              <th>Recipient</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody style={{color:'#0e0e0e'}}>
            {pendingRequests1.map((request, index) => (
              <tr key={index}>
                <td>{request.requestId}</td>
                <td>{request.batchId}</td>
                <td>{request.requester}</td>
                <td>{request.recipient}</td>
                <td>{request.status}</td>
                <td>
                  <button onClick={() => handleApproveRequest1(request.requestId)}>Approve</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No pending requests</p>
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
      case 'Manufacturer List':
        return renderList(manufacturers, 'Manufacturer List');
      case 'Wholesaler List':
        return renderList(wholesalers, 'Wholesaler List');
      case 'Hospital/Pharmacy List':
        return renderList(hospitalsPharmacies, 'Hospital/Pharmacy List');
      case 'Pending Delivery Requests from Manufacturers':
        return renderPendingRequests();
      case 'Pending Delivery Requests from Wholesalers':
        return renderPendingRequests1();
      case 'My Drugs':
        return renderMyDrugs();
      case 'Send Drugs':
        return renderSendDrugs();
      case 'Send Drugs1':
        return renderSendDrugs1();
      default:
        return <div>404 Not Found</div>;
    }
  };

  return (
    <div>
    {isDistributor === null ? (
      <div>Loading...</div>
    ) : isDistributor === false ? (
      <div className="not-distributor-container">You are not a distributor</div>
    ) : (
    <div className="home3-container">
      <div className="sidebar">
        <ul>
          <li onClick={() => setSelectedOption('Home')}>Home</li>
          <li onClick={() => setSelectedOption('Manufacturer List')}>Manufacturer List</li>
          <li onClick={() => setSelectedOption('Wholesaler List')}>Wholesaler List</li>
          <li onClick={() => setSelectedOption('Hospital/Pharmacy List')}>Hospital/Pharmacy List</li>
          <li onClick={() => setSelectedOption('Pending Delivery Requests from Manufacturers')}>Pending Delivery Requests from Manufacturers</li>
          <li onClick={() => setSelectedOption('Pending Delivery Requests from Wholesalers')}>Pending Delivery Requests from Wolesalers</li>
          <li onClick={() => setSelectedOption('My Drugs')}>My Drugs</li>
          <li onClick={() => setSelectedOption('Send Drugs')}>Send Drugs to Wholesalers</li>
          <li onClick={() => setSelectedOption('Send Drugs1')}>Send Drugs to Hospitals/Pharmacies</li>
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

export default Home3;
