import React, { useState } from 'react';
import Web3 from 'web3';
import PharmaDistribution from '../truffle_abis/PharmaDistribution.json';
import './Iot.css'; // Adjust path if needed

const Iot = () => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [qrCode, setQrCode] = useState('');
  const [iotData, setIotData] = useState(null);
  const [alertMessages, setAlertMessages] = useState([]);
  const [error, setError] = useState(null);

  const contractAddress = '0x5B66E3B74f6F6B65F764A5a8108982B492FD56a8'; // Update with your contract address

  const loadWeb3AndContract = async () => {
    if (window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);

      const networkId = await web3Instance.eth.net.getId();
      const deployedNetwork = PharmaDistribution.networks[networkId];
      const contractInstance = new web3Instance.eth.Contract(PharmaDistribution.abi, deployedNetwork && deployedNetwork.address);

      setContract(contractInstance);
      contractInstance.events.Alert({
        fromBlock: 'latest'
      })
      .on('data', event => {
        const { qrCode, message, timestamp } = event.returnValues;
        setAlertMessages(prevAlerts => [...prevAlerts, { qrCode, message, timestamp }]);
      })
    }
     else {
      alert('Please install MetaMask!');
    }
  };


  const handleFetchIoTData = async () => {
    if (contract) {
      try {
        const latestData = await contract.methods.getLatestIoTData(qrCode).call();
        // Convert BigInt to number for display
        const convertedData = {
          timestamp: parseInt(latestData.timestamp),
          temperature: parseInt(latestData.temperature),
          humidity: parseInt(latestData.humidity),
        };
        setIotData(convertedData);
        setError(null);
      } catch (err) {
        setError('Error fetching IoT data');
        setIotData(null);
      }
    }
  };

  const handleLogout = () => {
    // Clear Web3 and contract instances
    setWeb3(null);
    setContract(null);
  
    // Redirect to the home page
    window.location.href = '/';
  };

  React.useEffect(() => {
    loadWeb3AndContract();
  }, []);

  return (
    <div className="iot-container">
      <h2>Check IoT Data</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleFetchIoTData();
        }}
      >
        <div>
          <label htmlFor="qrCode">QR Code:</label>
          <input
            type="text"
            id="qrCode"
            value={qrCode}
            onChange={(e) => setQrCode(e.target.value)}
            required
          />
        </div>
        <button type="submit">Fetch IoT Data</button>
        <button type="button" onClick={handleLogout} className="logout-button">Logout</button>
      </form>

      {error && <p className="error">{error}</p>}

      {iotData && (
        <div>
          <h3>Latest IoT Data for QR Code: {qrCode}</h3>
          <p>Timestamp: {new Date(parseInt(iotData.timestamp) * 1000).toLocaleString()}</p>
          <p>Temperature: {iotData.temperature}°C</p>
          <p>Humidity: {iotData.humidity}%</p>
        </div>
      )}

      {alertMessages.length > 0 && (
        <div className="alerts">
          <h3>Alerts</h3>
          <ul>
            {alertMessages.map((alert, index) => (
              <li key={index}>
                <p>QR Code: {alert.qrCode}</p>
                <p>Message: {alert.message}</p>
                <p>Timestamp: {new Date(parseInt(alert.timestamp) * 1000).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};


export default Iot;

