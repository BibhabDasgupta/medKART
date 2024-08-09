import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Web3 from "web3";
import "./Home1.css";
import axios from "axios";
import PharmaChain from "../truffle_abis/PharmaChain.json";
import PharmaDistribution from "../truffle_abis/PharmaDistribution.json";
import Select from 'react-select';

const Home1 = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("Home");
  const [accountDetails, setAccountDetails] = useState(null);
  const [currentAccount, setCurrentAccount] = useState("");
  const [distributors, setDistributors] = useState([]);
  const [requests, setRequests] = useState([]);
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [qrCodes, setQrCodes] = useState([]);
  const [cryptoKeys, setCryptoKeys] = useState([]);
  const [expirationDates, setExpirationDates] = useState([]);
  const [batches, setBatches] = useState([]);
  const [sendDrugsBatchId, setSendDrugsBatchId] = useState("");
 const [sendDrugsDistributor, setSendDrugsDistributor] = useState("");
 const [isManufacturer, setIsManufacturer] = useState(null);
 const [sendDrugsDistributor1, setSendDrugsDistributor1] = useState(null);


  const loadWeb3 = async () => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("Accounts from MetaMask:", accounts[0]);
      setCurrentAccount(accounts[0]);
      fetchAccountDetails(accounts[0]);
      await loadContractData(web3, accounts[0]);
      await fetchBatches(web3, accounts[0]); 
      await checkManufacturerStatus(web3, accounts[0]);
    } else if (window.web3) {
      const web3 = new Web3(window.web3.currentProvider);
      const accounts = await web3.eth.getAccounts();
      console.log("Accounts from MetaMask (legacy):", accounts);
      setCurrentAccount(accounts[0]);
      fetchAccountDetails(accounts[0]);
      await loadContractData(web3, accounts[0]);
      await fetchBatches(web3, accounts[0]); 
      await checkManufacturerStatus(web3, accounts[0]);
    } else {
      console.error(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };

  const checkManufacturerStatus = async (web3, account) => {
    try {
      const networkId = await web3.eth.net.getId();
      const networkData = PharmaChain.networks[networkId];
      if (networkData) {
        const contract = new web3.eth.Contract(PharmaChain.abi, networkData.address);
        const manufacturer = await contract.methods.getManufacturer(account).call();
        if (manufacturer.account.toLowerCase() === account.toLowerCase()) {
          setIsManufacturer(true);
        } else {
          setIsManufacturer(false);
        }
      } else {
        setIsManufacturer(false);
      }
    } catch (error) {
      if (error.message.includes("Manufacturer does not exist")) {
        setIsManufacturer(false);
      } else {
        console.error('Error checking manufacturer status:', error);
        setIsManufacturer(false);
      }
    }
  };

  const fetchBatches = async (web3, account) => {
    try {
      const networkId = await web3.eth.net.getId();
      const pharmaDistributionNetwork = PharmaDistribution.networks[networkId];
      const pharmaDistributionContract = new web3.eth.Contract(
        PharmaDistribution.abi,
        pharmaDistributionNetwork && pharmaDistributionNetwork.address
      );
  
      const allBatches = await pharmaDistributionContract.methods.getAllBatches().call();
      const filteredBatches = allBatches
        .filter(batch => batch.owner.toLowerCase() === account.toLowerCase())
        .map(batch => ({
          ...batch,
          batchId: batch.batchId.toString(),
          quantity: batch.quantity.toString()
        }));
  
      setBatches(filteredBatches);
    } catch (error) {
      console.error("Error fetching batches:", error);
    }
  };
  

  const fetchAccountDetails = async (account) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/pendingStakeholders/find",
        { accountNumber: account }
      );
      setAccountDetails(response.data);
    } catch (error) {
      console.error("Error fetching account details:", error);
    }
  };

  const fetchDistributorDetails = async (username) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/pendingStakeholders/${username}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching distributor details:", error);
      return null;
    }
  };

  const loadContractData = async (web3, account) => {
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = PharmaChain.networks[networkId];
    const pharmaChain = new web3.eth.Contract(
      PharmaChain.abi,
      deployedNetwork && deployedNetwork.address
    );
    const pharmaDistributionNetwork = PharmaDistribution.networks[networkId];
    const pharmaDistributionContract = new web3.eth.Contract(
      PharmaDistribution.abi,
      pharmaDistributionNetwork && pharmaDistributionNetwork.address
    );
    const distributorAccounts = await pharmaChain.methods
      .getAllDistributors()
      .call();
    const distributorDetails = await Promise.all(
      distributorAccounts.map(async (addr) => {
        const distributor = await pharmaChain.methods
          .getDistributor(addr)
          .call();
        const additionalDetails = await fetchDistributorDetails(
          distributor.username
        );
        return { ...distributor, ...additionalDetails };
      })
    );
    setDistributors(distributorDetails);

    const allRequests = await pharmaDistributionContract.methods
      .getAllRequests1()
      .call();

      const formattedRequests = allRequests.map(request => ({
        requestId: Number(request.requestId),
        drugName: request.drugName,
        quantity: Number(request.quantity),
        requester: request.requester,
        status: request.status,
        manufacturer: request.manufacturer,
      }));

    const filteredRequests = formattedRequests.filter(request => 
      request.status === "Pending" && request.manufacturer.toLowerCase() === currentAccount.toLowerCase()
    );
    console.log("Filtered Requests:", filteredRequests);
    setRequests(filteredRequests);
  };

  useEffect(() => {
    loadWeb3();
  }, [currentAccount]);

  const handleLogout = () => {
    localStorage.removeItem("auth-token");
    localStorage.removeItem("username");
    navigate("/");
  };

  const handleApproveRequest = (requestId) => {
    setSelectedRequestId(requestId);
  };

  const handleApproveRequestSubmit = async (e) => {
    e.preventDefault();
    try {
      const web3 = new Web3(window.ethereum);
      const networkId = await web3.eth.net.getId();
      const pharmaDistributionNetwork = PharmaDistribution.networks[networkId];
      const pharmaDistributionContract = new web3.eth.Contract(
        PharmaDistribution.abi,
        pharmaDistributionNetwork && pharmaDistributionNetwork.address
      );

      await pharmaDistributionContract.methods
        .approveRequest(
          selectedRequestId,
          qrCodes,
          cryptoKeys,
          expirationDates
        )
        .send({ from: currentAccount });

      alert("Request approved successfully");
      setQrCodes([]);
      setCryptoKeys([]);
      setExpirationDates([]);
      setSelectedRequestId(null);

      await loadContractData(web3, currentAccount);
    } catch (error) {
      console.error("Error approving request:", error);
      alert("Failed to approve request");
    }
  };

  
const handleSendDrugsSubmit = async (e) => {
  e.preventDefault();
  try {
    const web3 = new Web3(window.ethereum);
    const networkId = await web3.eth.net.getId();
    const pharmaDistributionNetwork = PharmaDistribution.networks[networkId];
    const pharmaDistributionContract = new web3.eth.Contract(
      PharmaDistribution.abi,
      pharmaDistributionNetwork && pharmaDistributionNetwork.address
    );

    await pharmaDistributionContract.methods
      .createTransferRequestToDistributor(sendDrugsBatchId, sendDrugsDistributor)
      .send({ from: currentAccount });

    alert("Transfer request created successfully");
    setSendDrugsBatchId("");
    setSendDrugsDistributor("");
  } catch (error) {
    console.error("Error creating transfer request:", error);
    alert("Failed to create transfer request");
  }
};


  const renderPendingRequests = () => (
    <div>
      <h2>Pending Wholesaler Requests</h2>
      {requests.length > 0 ? (
        <table className="requests-table">
          <thead>
            <tr>
              <th>Drug Name</th>
              <th>Quantity</th>
              <th>Requester</th>
              <th>Approve</th>
            </tr>
          </thead>
          <tbody style={{color:'#0e0e0e'}}>
            {requests.map((request, index) => (
              <tr key={index}>
                <td>{request.drugName}</td>
                <td>{request.quantity}</td>
                <td>{request.requester}</td>
                <td>
                  <button onClick={() => handleApproveRequest(request.requestId)}>
                    Approve
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No pending requests</p>
      )}

      {selectedRequestId !== null && (
        <div>
          <h3>Approve Request</h3>
          <form onSubmit={handleApproveRequestSubmit}>
            <div>
              <label>QR Codes (comma-separated):</label>
              <input
                type="text"
                value={qrCodes.join(",")}
                onChange={(e) => setQrCodes(e.target.value.split(","))}
                required
              />
            </div>
            <div>
              <label>Crypto Keys (comma-separated):</label>
              <input
                type="text"
                value={cryptoKeys.join(",")}
                onChange={(e) => setCryptoKeys(e.target.value.split(","))}
                required
              />
            </div>
            <div>
              <label>Expiration Dates (comma-separated, timestamps):</label>
              <input
                type="text"
                value={expirationDates.join(",")}
                onChange={(e) => setExpirationDates(e.target.value.split(",").map(Number))}
                required
              />
            </div>
            <button type="submit">Approve Request</button>
          </form>
        </div>
      )}
    </div>
  );
  const renderSendDrugs = () => (
    <div className="form-container">
      <h2>Send Drugs</h2>
      <form onSubmit={handleSendDrugsSubmit}>
        <div className="form-group">
          <label htmlFor="sendDrugsBatchId">Batch ID:</label>
          <input
            type="text"
            id="sendDrugsBatchId"
            value={sendDrugsBatchId}
            onChange={(e) => setSendDrugsBatchId(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="sendDrugsDistributor">Distributor:</label>
          <Select
            options={distributors.map(distributor => ({
              value: distributor.account,
              label: `${distributor.username} (${distributor.account})`
            }))}
            onChange={(selectedOption) => setSendDrugsDistributor(selectedOption.value)}
            placeholder="Select a distributor"
          />
        </div>
        <button type="submit" className="submit-btn">Send Drugs</button>
      </form>
    </div>
  );
  

  const renderMyDrugs = () => (
    <div>
      <h2>My Drugs</h2>
      {batches.length > 0 ? (
        <table className="requests-table">
          <thead>
            <tr>
              <th>Batch ID</th>
              <th>QR Codes</th>
              <th>Owner</th>
              <th>Final Recipient</th>
              <th>Quantity</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody style={{color:"#0e0e0e"}}>
            {batches.map((batch, index) => (
              <tr key={index}>
                <td>{batch.batchId}</td>
                <td>{batch.qrCodes.join(", ")}</td>
                <td>{batch.owner}</td>
                <td>{batch.finalRecipient}</td>
                <td>{batch.quantity}</td>
                <td>{batch.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No drugs found</p>
      )}
    </div>
  );

  const renderContent = () => {
    switch (selectedOption) {
      case "Home":
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
      case "Distributor List":
        return (
          <div>
            <h2>Distributor List</h2>
            {distributors.length > 0 ? (
              <table className="requests-table">
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
                  {distributors.map((distributor, index) => (
                    <tr key={index}>
                      <td>{distributor.username}</td>
                      <td>{distributor.account}</td>
                      <td>{distributor.name}</td>
                      <td>{distributor.address}</td>
                      <td>{distributor.email}</td>
                      <td>{distributor.mobileNumber}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No distributors found</p>
            )}
          </div>
        );
      case "Pending Requests":
        return renderPendingRequests();
      case "My Drugs":
        return renderMyDrugs();
      case "Send Drugs":
        return renderSendDrugs();
      default:
        return <div>Invalid option selected</div>;
    }
  };

  return (
    <div>
    {isManufacturer === null ? (
      <div>Loading...</div>
    ) : isManufacturer === false ? (
      <div className="not-manufacturer-container">You are not a manufacturer</div>
    ) : (
    <div className="home1-container">
       <div className="sidebar">
        <ul>
          <li onClick={() => setSelectedOption("Home")}>Home</li>
          <li onClick={() => setSelectedOption("Distributor List")}>Distributor List</li>
          <li onClick={() => setSelectedOption("Pending Requests")}>Pending Requests</li>
          <li onClick={() => setSelectedOption("My Drugs")}>My Drugs</li>
          <li onClick={() => setSelectedOption("Send Drugs")}>Send Drugs</li>
          <li onClick={handleLogout}>Logout</li>
        </ul>
      </div>
      <div className="content">{renderContent()}</div>
    </div>
     )}
     </div>
  );
};

export default Home1;


