import React, { useState } from 'react';
import Web3 from 'web3';
import PharmaDistribution from "../truffle_abis/PharmaDistribution.json";// Adjust the import path as needed
import './Track.css'; // Import the CSS file

const Track = () => {
  const [qrCode, setQrCode] = useState('');
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);

  // Initialize Web3 and Contract
  React.useEffect(() => {
    const initWeb3 = async () => {
      const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');
      setWeb3(web3);

      const networkId = await web3.eth.net.getId();
      const deployedNetwork = PharmaDistribution.networks[networkId];
      const instance = new web3.eth.Contract(
        PharmaDistribution.abi,
        deployedNetwork && deployedNetwork.address,
      );
      setContract(instance);
    };
    initWeb3();
  }, []);

  const handleQrCodeChange = (e) => {
    setQrCode(e.target.value);
  };

  const fetchTransactionHistory = async () => {
    if (contract && qrCode) {
      try {
        const history = await contract.methods.getTransactionHistory(qrCode).call();
        setTransactionHistory(history);
      } catch (error) {
        console.error("Error fetching transaction history:", error);
      }
    }
  };

  const handleLogout = () => {
    // Clear web3 instance and redirect or handle logout logic
    setWeb3(null);
    setContract(null);
    // For redirecting, you might use React Router's history.push('/login') or similar
    window.location.href = '/'; // Replace with your actual login route
  };

  return (
    <div className="track-container">
      <h1 className='track'>Track Drug</h1>
      <div className="form-container">
        <input
          type="text"
          value={qrCode}
          onChange={handleQrCodeChange}
          placeholder="Enter QR Code"
          className="qr-input"
        />
        <button onClick={fetchTransactionHistory} className="track-button">Track</button>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
      {transactionHistory.length > 0 && (
        <div className="history-container">
          <h2>Transaction History</h2>
          <ul className="history-list">
            {transactionHistory.map((tx, index) => (
              <li key={index} className="history-item">
                <p><strong>QR Code:</strong> {tx.qrCode}</p>
                <p><strong>From:</strong> {tx.from}</p>
                <p><strong>To:</strong> {tx.to}</p>
                <p><strong>Status:</strong> {tx.status}</p>
                <p><strong>Timestamp:</strong> {new Date(parseInt(tx.timestamp)).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Track;


