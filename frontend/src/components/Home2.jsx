import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Web3 from "web3";
import "./Home2.css";
import axios from "axios";
import PharmaChain from "../truffle_abis/PharmaChain.json";
import PharmaDistribution from "../truffle_abis/PharmaDistribution.json";
import Select from "react-select";

const Home2 = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("Home");
  const [accountDetails, setAccountDetails] = useState(null);
  const [currentAccount, setCurrentAccount] = useState("");
  const [manufacturers, setManufacturers] = useState([]);
  const [distributors, setDistributors] = useState([]);
  const [drugName, setDrugName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [manufacturerAddress, setManufacturerAddress] = useState("");
  const [pharmaChain, setPharmaChain] = useState(null);
  const [pharmaDistribution, setPharmaDistribution] = useState(null);
  const [wholesalerRequests, setWholesalerRequests] = useState([]);
  const [myBatches, setMyBatches] = useState([]);
  const [batchId, setBatchId] = useState("");
  const [requestIdToApprove, setRequestIdToApprove] = useState(null);
  const [hospitalRequests, setHospitalRequests] = useState([]);
  const [sendBatchId, setSendBatchId] = useState("");
  const [sendDistributorAddress, setSendDistributorAddress] = useState("");
  const [isWholesaler, setIsWholesaler] = useState(null);
  const [manufacturerOptions, setManufacturerOptions] = useState([]);
  const [distributorOptions, setDistributorOptions] = useState([]);

  // useEffect(() => {
  //   const loadWeb3 = async () => {
  //     if (window.ethereum) {
  //       const web3 = new Web3(window.ethereum);
  //       const accounts = await window.ethereum.request({
  //         method: "eth_requestAccounts",
  //       });
  //       console.log("Accounts from MetaMask:", accounts[0]);
  //       setCurrentAccount(accounts[0]);
  //       fetchAccountDetails(accounts[0]);
  //       await checkWholesalerStatus(web3, accounts[0]);
  //       await loadContractData(web3);
  //     } else if (window.web3) {
  //       const web3 = new Web3(window.web3.currentProvider);
  //       const accounts = await web3.eth.getAccounts();
  //       console.log("Accounts from MetaMask (legacy):", accounts);
  //       setCurrentAccount(accounts[0]);
  //       fetchAccountDetails(accounts[0]);
  //       await checkWholesalerStatus(web3, accounts[0]);
  //       await loadContractData(web3);
  //     } else {
  //       console.error(
  //         "Non-Ethereum browser detected. You should consider trying MetaMask!"
  //       );
  //     }
  //   };

  //   const fetchAccountDetails = async (account) => {
  //     try {
  //       const response = await axios.post(
  //         "http://localhost:5000/api/pendingStakeholders/find",
  //         { accountNumber: account }
  //       );
  //       setAccountDetails(response.data);
  //     } catch (error) {
  //       console.error("Error fetching account details:", error);
  //     }
  //   };

  //   const fetchDetails = async (url, username) => {
  //     try {
  //       const response = await axios.get(`${url}/${username}`);
  //       return response.data;
  //     } catch (error) {
  //       console.error("Error fetching details:", error);
  //       return null;
  //     }
  //   };

  //   const checkWholesalerStatus = async (web3, account) => {
  //     try {
  //       const networkId = await web3.eth.net.getId();
  //       const networkData = PharmaChain.networks[networkId];
  //       if (networkData) {
  //         const contract = new web3.eth.Contract(PharmaChain.abi, networkData.address);
  //         const wholesaler = await contract.methods.getWholesaler(account).call();
  //         if (wholesaler.account.toLowerCase() === account.toLowerCase()) {
  //           setIsWholesaler(true);
  //         } else {
  //           setIsWholesaler(false);
  //         }
  //       } else {
  //         setIsWholesaler(false);
  //       }
  //     } catch (error) {
  //       if (error.message.includes("Wholesaler does not exist")) {
  //         setIsWholesaler(false);
  //       } else {
  //         console.error('Error checking Wholesaler status:', error);
  //         setIsWholesaler(false);
  //       }
  //     }
  //   };

  //   const loadContractData = async (web3) => {
  //     const networkId = await web3.eth.net.getId();
  //     const deployedNetwork = PharmaChain.networks[networkId];
  //     const pharmaChain = new web3.eth.Contract(
  //       PharmaChain.abi,
  //       deployedNetwork && deployedNetwork.address
  //     );
  //     const pharmaDistributionNetwork = PharmaDistribution.networks[networkId];
  //     const pharmaDistributionContract = new web3.eth.Contract(
  //       PharmaDistribution.abi,
  //       pharmaDistributionNetwork && pharmaDistributionNetwork.address
  //     );
  //     setPharmaDistribution(pharmaDistributionContract);

  //     const manufacturerAccounts = await pharmaChain.methods
  //       .getAllManufacturers()
  //       .call();
  //     const manufacturerDetails = await Promise.all(
  //       manufacturerAccounts.map(async (addr) => {
  //         const manufacturer = await pharmaChain.methods
  //           .getManufacturer(addr)
  //           .call();
  //         const additionalDetails = await fetchDetails(
  //           "http://localhost:5000/api/pendingStakeholders",
  //           manufacturer.username
  //         );
  //         return { ...manufacturer, ...additionalDetails };
  //       })
  //     );
  //     setManufacturers(manufacturerDetails);

  //     const distributorAccounts = await pharmaChain.methods
  //       .getAllDistributors()
  //       .call();
  //     const distributorDetails = await Promise.all(
  //       distributorAccounts.map(async (addr) => {
  //         const distributor = await pharmaChain.methods
  //           .getDistributor(addr)
  //           .call();
  //         const additionalDetails = await fetchDetails(
  //           "http://localhost:5000/api/pendingStakeholders",
  //           distributor.username
  //         );
  //         return { ...distributor, ...additionalDetails };
  //       })
  //     );
  //     setDistributors(distributorDetails);

  //     if (pharmaDistribution) {
  //       try {
  //         const requests = await pharmaDistribution.methods
  //         .getAllWholesalerRequests()
  //           .call();
  //         const filteredRequests = requests
  //           .map((request) => ({
  //             ...request,
  //             requestId: Number(request.requestId), // Convert BigInt to Number
  //             batchId: Number(request.batchId), // Convert BigInt to Number
  //           }))
  //           .filter(
  //             (request) =>
  //               request.recipient.toLowerCase() ===
  //                 currentAccount.toLowerCase() && request.status === "Pending"
  //           );
  //         setWholesalerRequests(filteredRequests);
  //       } catch (error) {
  //         console.error("Error fetching wholesaler requests:", error);
  //       }
  //     }
  //     if (pharmaDistribution) {
  //       try {
  //         const requests = await pharmaDistribution.methods
  //           .getAllRequests2()
  //           .call();
  //         const filteredRequests = requests
  //           .map((request) => ({
  //             ...request,
  //             requestId: request.requestId.toString(),
  //             quantity: request.quantity.toString(),
  //           }))
  //           .filter(
  //             (request) =>
  //               request.wholesaler.toLowerCase() ===
  //                 currentAccount.toLowerCase() && request.status === "Pending"
  //           );
  //         setHospitalRequests(filteredRequests);
  //       } catch (error) {
  //         console.error("Error fetching hospital/pharmacy requests:", error);
  //       }
  //     }
  //     const manufacturerOpts = manufacturerDetails.map(m => ({
  //       value: m.account,
  //       label: `${m.name} (${m.account})`
  //     }));
  //     setManufacturerOptions(manufacturerOpts);

  //     const distributorOpts = distributorDetails.map(d => ({
  //       value: d.account,
  //       label: `${d.name} (${d.account})`
  //     }));
  //     setDistributorOptions(distributorOpts);
  //     await renderMyDrugs1();
  //   };

  //   loadWeb3();
  // }, [currentAccount]);

  // const handleLogout = () => {
  //   localStorage.removeItem("auth-token");
  //   localStorage.removeItem("username");
  //   navigate("/");
  // };

  useEffect(() => {
    const loadWeb3 = async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log("Accounts from MetaMask:", accounts[0]);
        setCurrentAccount(accounts[0]);
        fetchAccountDetails(accounts[0]);
        await checkWholesalerStatus(web3, accounts[0]);
        await loadContractData(web3);
      } else if (window.web3) {
        const web3 = new Web3(window.web3.currentProvider);
        const accounts = await web3.eth.getAccounts();
        console.log("Accounts from MetaMask (legacy):", accounts);
        setCurrentAccount(accounts[0]);
        fetchAccountDetails(accounts[0]);
        await checkWholesalerStatus(web3, accounts[0]);
        await loadContractData(web3);
      } else {
        console.error(
          "Non-Ethereum browser detected. You should consider trying MetaMask!"
        );
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

    loadWeb3();
  }, [currentAccount, pharmaDistribution]);
  //Changed here

  const handleLogout = async () => {
    localStorage.removeItem("auth-token");
    localStorage.removeItem("username");
    navigate("/");
  };

  const fetchDetails = async (url, username) => {
    try {
      const response = await axios.get(`${url}/${username}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching details:", error);
      return null;
    }
  };

  const checkWholesalerStatus = async (web3, account) => {
    try {
      const networkId = await web3.eth.net.getId();
      const networkData = PharmaChain.networks[networkId];
      if (networkData) {
        const contract = new web3.eth.Contract(
          PharmaChain.abi,
          networkData.address
        );
        const wholesaler = await contract.methods.getWholesaler(account).call();
        if (wholesaler.account.toLowerCase() === account.toLowerCase()) {
          setIsWholesaler(true);
        } else {
          setIsWholesaler(false);
        }
      } else {
        setIsWholesaler(false);
      }
    } catch (error) {
      if (error.message.includes("Wholesaler does not exist")) {
        setIsWholesaler(false);
      } else {
        console.error("Error checking Wholesaler status:", error);
        setIsWholesaler(false);
      }
    }
  };

  const loadContractData = async (web3) => {
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
    setPharmaDistribution(pharmaDistributionContract);

    const manufacturerAccounts = await pharmaChain.methods
      .getAllManufacturers()
      .call();
    const manufacturerDetails = await Promise.all(
      manufacturerAccounts.map(async (addr) => {
        const manufacturer = await pharmaChain.methods
          .getManufacturer(addr)
          .call();
        const additionalDetails = await fetchDetails(
          "http://localhost:5000/api/pendingStakeholders",
          manufacturer.username
        );
        return { ...manufacturer, ...additionalDetails };
      })
    );
    setManufacturers(manufacturerDetails);

    const distributorAccounts = await pharmaChain.methods
      .getAllDistributors()
      .call();
    const distributorDetails = await Promise.all(
      distributorAccounts.map(async (addr) => {
        const distributor = await pharmaChain.methods
          .getDistributor(addr)
          .call();
        const additionalDetails = await fetchDetails(
          "http://localhost:5000/api/pendingStakeholders",
          distributor.username
        );
        return { ...distributor, ...additionalDetails };
      })
    );
    setDistributors(distributorDetails);

    if (pharmaDistribution) {
      try {
        const requests = await pharmaDistribution.methods
          .getAllWholesalerRequests()
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
        setWholesalerRequests(filteredRequests);
      } catch (error) {
        console.error("Error fetching wholesaler requests:", error);
      }
    }
    if (pharmaDistribution) {
      try {
        const requests = await pharmaDistribution.methods
          .getAllRequests2()
          .call();
        const filteredRequests = requests
          .map((request) => ({
            ...request,
            requestId: request.requestId.toString(),
            quantity: request.quantity.toString(),
          }))
          .filter(
            (request) =>
              request.wholesaler.toLowerCase() ===
                currentAccount.toLowerCase() && request.status === "Pending"
          );
        setHospitalRequests(filteredRequests);
      } catch (error) {
        console.error("Error fetching hospital/pharmacy requests:", error);
      }
    }
    await renderMyDrugs1();
  };

  const renderMyDrugs1 = async () => {
    const web3 = new Web3(window.ethereum); // Ensure web3 instance is available
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = PharmaDistribution.networks[networkId];
    const pharmaDistribution = new web3.eth.Contract(
      PharmaDistribution.abi,
      deployedNetwork && deployedNetwork.address
    );

    try {
      const allBatches = await pharmaDistribution.methods
        .getAllBatches()
        .call();
      console.log("All Batches:", allBatches);
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

  const handleRequestDrugs = async (e) => {
    e.preventDefault();
    try {
      if (pharmaDistribution) {
        await pharmaDistribution.methods
          .requestDrugs(drugName, quantity, manufacturerAddress)
          .send({ from: currentAccount });
        alert("Request sent successfully");
        setDrugName("");
        setQuantity("");
        setManufacturerAddress("");
      }
    } catch (error) {
      console.error("Error sending drug request:", error);
      alert("Failed to send request");
    }
  };

  const handleApproveRequest = async (requestId) => {
    try {
      if (pharmaDistribution) {
        await pharmaDistribution.methods
          .acceptDeliveryRequestFromDistributor1(requestId)
          .send({ from: currentAccount });
        alert("Request approved successfully");
        // Refresh the request list
        const requests = await pharmaDistribution.methods
          .getAllWholesalerRequests()
          .call();
        const filteredRequests = requests.filter(
          (request) =>
            request.recipient.toLowerCase() === currentAccount.toLowerCase() &&
            request.status === "Pending"
        );
        setWholesalerRequests(filteredRequests);
      }
    } catch (error) {
      console.error("Error approving request:", error);
      alert("Failed to approve request");
    }
  };

  const handleApproveRequestFromHospital = async () => {
    try {
      if (pharmaDistribution && batchId && requestIdToApprove) {
        const batchIdStr = batchId.toString();
        const requestIdStr = requestIdToApprove.toString();

        console.log(
          "Approving request with ID:",
          requestIdStr,
          "and Batch ID:",
          batchIdStr
        );

        await pharmaDistribution.methods
          .approveRequestFromHospital(requestIdStr, batchIdStr)
          .send({ from: currentAccount });

        alert("Request approved successfully");

        const requests = await pharmaDistribution.methods
          .getAllRequests2()
          .call();
        const filteredRequests = requests
          .map((request) => ({
            ...request,
            requestId: request.requestId.toString(),
            quantity: request.quantity.toString(),
          }))
          .filter(
            (request) =>
              request.wholesaler.toLowerCase() ===
                currentAccount.toLowerCase() && request.status === "Pending"
          );
        setHospitalRequests(filteredRequests);
        setBatchId("");
        setRequestIdToApprove(null);
      } else {
        console.error("Missing parameters: batchId or requestIdToApprove");
        alert("Please provide valid Batch ID and Request ID");
      }
    } catch (error) {
      console.error("Error approving request:", error.message);
      alert("Failed to approve request. See console for details.");
    }
  };

  const handleSendDrugs = async (e) => {
    e.preventDefault();
    try {
      if (pharmaDistribution && sendBatchId && sendDistributorAddress) {
        await pharmaDistribution.methods
          .createDeliveryRequestToDistributor(
            sendBatchId,
            sendDistributorAddress
          )
          .send({ from: currentAccount });
        alert("Delivery request sent successfully");
        setSendBatchId("");
        setSendDistributorAddress("");
      } else {
        alert("Please provide valid Batch ID and Distributor Address");
      }
    } catch (error) {
      console.error("Error sending delivery request:", error);
      alert("Failed to send delivery request");
    }
  };

  const renderTable = (data, title) => (
    <div>
      <h2>{title}</h2>
      {data.length > 0 ? (
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
          <tbody style={{ color: "#0e0e0e" }}>
            {data.map((item, index) => (
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
        <table className="requests-table">
          <thead>
            <tr>
              <th>Batch ID</th>
              <th>Owner</th>
              <th>Quantity</th>
              <th>Final Recipient</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody style={{ color: "#0e0e0e" }}>
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

  const renderTable1 = (data, title, onApprove) => (
    <div>
      <h2>{title}</h2>
      {data.length > 0 ? (
        <table className="requests-table">
          <thead>
            <tr>
              <th>Request ID</th>
              <th>Batch ID</th>
              <th>Requester</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody style={{ color: "#0e0e0e" }}>
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

  const renderTable2 = (data, title, onApprove) => (
    <div>
      <h2>{title}</h2>
      {data.length > 0 ? (
        <table className="requests-table">
          <thead>
            <tr>
              <th>Request ID</th>
              <th>Drug Name</th>
              <th>Requester</th>
              <th>Quantity</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody style={{ color: "#0e0e0e" }}>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.requestId}</td>
                <td>{item.drugName}</td>
                <td>{item.requester}</td>
                <td>{item.quantity}</td>
                <td>{item.status}</td>
                <td>
                  {item.status === "Pending" && (
                    <>
                      <button
                        onClick={() => setRequestIdToApprove(item.requestId)}
                      >
                        Approve
                      </button>
                      {requestIdToApprove === item.requestId && (
                        <div>
                          <input
                            type="text"
                            placeholder="Enter Batch ID"
                            value={batchId}
                            onChange={(e) => setBatchId(e.target.value)}
                          />
                          <button onClick={handleApproveRequestFromHospital}>
                            Submit
                          </button>
                        </div>
                      )}
                    </>
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
      case "Manufacturer List":
        return renderTable(manufacturers, "Manufacturer List");
      case "Distributor List":
        return renderTable(distributors, "Distributor List");
      case "Request Drugs":
        return (
          <div className="form-container">
            <h2>Request Drugs</h2>
            <form onSubmit={handleRequestDrugs}>
              <div className="form-group">
                <label htmlFor="drugName">Drug Name:</label>
                <input
                  type="text"
                  id="drugName"
                  value={drugName}
                  onChange={(e) => setDrugName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="quantity">Quantity:</label>
                <input
                  type="number"
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  required
                />
              </div>
                {/* <Select
                    options={manufacturerOptions}
                    onChange={(selectedOption) => setManufacturerAddress(selectedOption.value)}
                    placeholder="Select a manufacturer"
                  /> */}
                <div className="form-group">
                  <label htmlFor="manufacturerAddress">Manufacturer:</label>
                  <input
                    type="text"
                    id="manufacturerAddress"
                    className="form-control"
                    value={manufacturerAddress}
                    onChange={(e) => setManufacturerAddress(e.target.value)}
                    placeholder="Enter manufacturer address"
                  />
              </div>
              <button type="submit" className="submit-btn">
                Submit Request
              </button>
            </form>
          </div>
        );
      case "Pending Hospital/Pharmacy Requests":
        return renderTable2(
          hospitalRequests,
          "Pending Hospital/Pharmacy Requests",
          handleApproveRequestFromHospital
        );
      case "Pending Distributor Requests":
        return renderTable1(
          wholesalerRequests,
          "Pending Distributor Requests",
          handleApproveRequest
        );
      case "My Drugs":
        return renderMyDrugs();
      case "Send Drugs":
        return (
          <div className="form-container">
            <h2>Send Drugs</h2>
            <form onSubmit={handleSendDrugs}>
              <div className="form-group">
                <label htmlFor="sendBatchId">Batch ID:</label>
                <input
                  type="text"
                  id="sendBatchId"
                  value={sendBatchId}
                  onChange={(e) => setSendBatchId(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="sendDistributorAddress">Distributor:</label>
                <Select
                  options={distributorOptions}
                  onChange={(selectedOption) =>
                    setSendDistributorAddress(selectedOption.value)
                  }
                  placeholder="Select a distributor"
                />
              </div>
              <button type="submit" className="submit-btn">
                Send Request
              </button>
            </form>
          </div>
        );
      default:
        return <div>404 Not Found</div>;
    }
  };

  return (
    <div>
      {isWholesaler === null ? (
        <div>Loading...</div>
      ) : isWholesaler === false ? (
        <div className="not-wholesaler-container">You are not a wholesaler</div>
      ) : (
        <div className="home2-container">
          <div className="sidebar">
            <ul>
              <li onClick={() => setSelectedOption("Home")}>Home</li>
              <li onClick={() => setSelectedOption("Manufacturer List")}>
                Manufacturer List
              </li>
              <li onClick={() => setSelectedOption("Distributor List")}>
                Distributor List
              </li>
              <li onClick={() => setSelectedOption("Request Drugs")}>
                Request Drugs
              </li>
              <li
                onClick={() =>
                  setSelectedOption("Pending Hospital/Pharmacy Requests")
                }
              >
                Pending Hospital/Pharmacy Requests
              </li>
              <li
                onClick={() =>
                  setSelectedOption("Pending Distributor Requests")
                }
              >
                Pending Distributor Requests
              </li>
              <li onClick={() => setSelectedOption("My Drugs")}>My Drugs</li>
              <li onClick={() => setSelectedOption("Send Drugs")}>
                Send Drugs
              </li>
              <li onClick={handleLogout}>Logout</li>
            </ul>
          </div>
          <div className="content">{renderContent()}</div>
        </div>
      )}
    </div>
  );
};

export default Home2;
