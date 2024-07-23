// const Web3 = require('web3');
// const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7545')); // Connect to your Ganache instance

// const contractAddress = '0x5B66E3B74f6F6B65F764A5a8108982B492FD56a8'; // Update with your contract address
// const contractABI = [
//     {
//       "anonymous": false,
//       "inputs": [
//         {
//           "indexed": false,
//           "internalType": "string",
//           "name": "qrCode",
//           "type": "string"
//         },
//         {
//           "indexed": false,
//           "internalType": "string",
//           "name": "message",
//           "type": "string"
//         },
//         {
//           "indexed": false,
//           "internalType": "uint256",
//           "name": "timestamp",
//           "type": "uint256"
//         }
//       ],
//       "name": "Alert",
//       "type": "event"
//     },
//     {
//       "anonymous": false,
//       "inputs": [
//         {
//           "indexed": false,
//           "internalType": "uint256",
//           "name": "batchId",
//           "type": "uint256"
//         },
//         {
//           "indexed": true,
//           "internalType": "address",
//           "name": "owner",
//           "type": "address"
//         }
//       ],
//       "name": "BatchCreated",
//       "type": "event"
//     },
//     {
//       "anonymous": false,
//       "inputs": [
//         {
//           "indexed": false,
//           "internalType": "uint256",
//           "name": "batchId",
//           "type": "uint256"
//         },
//         {
//           "indexed": true,
//           "internalType": "address",
//           "name": "from",
//           "type": "address"
//         },
//         {
//           "indexed": true,
//           "internalType": "address",
//           "name": "to",
//           "type": "address"
//         },
//         {
//           "indexed": false,
//           "internalType": "string",
//           "name": "status",
//           "type": "string"
//         }
//       ],
//       "name": "BatchTransferred",
//       "type": "event"
//     },
//     {
//       "anonymous": false,
//       "inputs": [
//         {
//           "indexed": false,
//           "internalType": "uint256",
//           "name": "requestId",
//           "type": "uint256"
//         },
//         {
//           "indexed": false,
//           "internalType": "uint256",
//           "name": "batchId",
//           "type": "uint256"
//         },
//         {
//           "indexed": true,
//           "internalType": "address",
//           "name": "requester",
//           "type": "address"
//         },
//         {
//           "indexed": true,
//           "internalType": "address",
//           "name": "recipient",
//           "type": "address"
//         },
//         {
//           "indexed": false,
//           "internalType": "string",
//           "name": "status",
//           "type": "string"
//         }
//       ],
//       "name": "DeliveryRequestCreated",
//       "type": "event"
//     },
//     {
//       "anonymous": false,
//       "inputs": [
//         {
//           "indexed": false,
//           "internalType": "string",
//           "name": "qrCode",
//           "type": "string"
//         },
//         {
//           "indexed": true,
//           "internalType": "address",
//           "name": "manufacturer",
//           "type": "address"
//         }
//       ],
//       "name": "DrugCreated",
//       "type": "event"
//     },
//     {
//       "anonymous": false,
//       "inputs": [
//         {
//           "indexed": false,
//           "internalType": "string",
//           "name": "qrCode",
//           "type": "string"
//         },
//         {
//           "indexed": false,
//           "internalType": "string",
//           "name": "status",
//           "type": "string"
//         },
//         {
//           "indexed": true,
//           "internalType": "address",
//           "name": "newOwner",
//           "type": "address"
//         }
//       ],
//       "name": "DrugStatusChanged",
//       "type": "event"
//     },
//     {
//       "anonymous": false,
//       "inputs": [
//         {
//           "indexed": false,
//           "internalType": "string",
//           "name": "qrCode",
//           "type": "string"
//         },
//         {
//           "indexed": true,
//           "internalType": "address",
//           "name": "from",
//           "type": "address"
//         },
//         {
//           "indexed": true,
//           "internalType": "address",
//           "name": "to",
//           "type": "address"
//         },
//         {
//           "indexed": false,
//           "internalType": "string",
//           "name": "status",
//           "type": "string"
//         }
//       ],
//       "name": "DrugTransferred",
//       "type": "event"
//     },
//     {
//       "anonymous": false,
//       "inputs": [
//         {
//           "indexed": false,
//           "internalType": "string",
//           "name": "qrCode",
//           "type": "string"
//         },
//         {
//           "indexed": false,
//           "internalType": "int256",
//           "name": "temperature",
//           "type": "int256"
//         },
//         {
//           "indexed": false,
//           "internalType": "int256",
//           "name": "humidity",
//           "type": "int256"
//         },
//         {
//           "indexed": false,
//           "internalType": "uint256",
//           "name": "timestamp",
//           "type": "uint256"
//         }
//       ],
//       "name": "IoTDataUpdated",
//       "type": "event"
//     },
//     {
//       "anonymous": false,
//       "inputs": [
//         {
//           "indexed": false,
//           "internalType": "uint256",
//           "name": "requestId",
//           "type": "uint256"
//         },
//         {
//           "indexed": true,
//           "internalType": "address",
//           "name": "requester",
//           "type": "address"
//         },
//         {
//           "indexed": false,
//           "internalType": "string",
//           "name": "drugName",
//           "type": "string"
//         },
//         {
//           "indexed": false,
//           "internalType": "uint256",
//           "name": "quantity",
//           "type": "uint256"
//         },
//         {
//           "indexed": false,
//           "internalType": "address",
//           "name": "manufacturer",
//           "type": "address"
//         }
//       ],
//       "name": "RequestCreated",
//       "type": "event"
//     },
//     {
//       "anonymous": false,
//       "inputs": [
//         {
//           "indexed": false,
//           "internalType": "uint256",
//           "name": "requestId",
//           "type": "uint256"
//         },
//         {
//           "indexed": false,
//           "internalType": "string",
//           "name": "status",
//           "type": "string"
//         }
//       ],
//       "name": "RequestStatusChanged",
//       "type": "event"
//     },
//     {
//       "anonymous": false,
//       "inputs": [
//         {
//           "indexed": false,
//           "internalType": "uint256",
//           "name": "requestId",
//           "type": "uint256"
//         },
//         {
//           "indexed": false,
//           "internalType": "uint256",
//           "name": "batchId",
//           "type": "uint256"
//         },
//         {
//           "indexed": true,
//           "internalType": "address",
//           "name": "requester",
//           "type": "address"
//         },
//         {
//           "indexed": true,
//           "internalType": "address",
//           "name": "recipient",
//           "type": "address"
//         },
//         {
//           "indexed": false,
//           "internalType": "string",
//           "name": "status",
//           "type": "string"
//         }
//       ],
//       "name": "TransferRequestCreated",
//       "type": "event"
//     },
//     {
//       "inputs": [],
//       "name": "batchCounter",
//       "outputs": [
//         {
//           "internalType": "uint256",
//           "name": "",
//           "type": "uint256"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function",
//       "constant": true
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "uint256",
//           "name": "",
//           "type": "uint256"
//         }
//       ],
//       "name": "batches",
//       "outputs": [
//         {
//           "internalType": "uint256",
//           "name": "batchId",
//           "type": "uint256"
//         },
//         {
//           "internalType": "address",
//           "name": "owner",
//           "type": "address"
//         },
//         {
//           "internalType": "address",
//           "name": "finalRecipient",
//           "type": "address"
//         },
//         {
//           "internalType": "uint256",
//           "name": "quantity",
//           "type": "uint256"
//         },
//         {
//           "internalType": "string",
//           "name": "status",
//           "type": "string"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function",
//       "constant": true
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "address",
//           "name": "",
//           "type": "address"
//         }
//       ],
//       "name": "distributorRequestCounters",
//       "outputs": [
//         {
//           "internalType": "uint256",
//           "name": "",
//           "type": "uint256"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function",
//       "constant": true
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "uint256",
//           "name": "",
//           "type": "uint256"
//         }
//       ],
//       "name": "distributorRequests",
//       "outputs": [
//         {
//           "internalType": "uint256",
//           "name": "requestId",
//           "type": "uint256"
//         },
//         {
//           "internalType": "uint256",
//           "name": "batchId",
//           "type": "uint256"
//         },
//         {
//           "internalType": "address",
//           "name": "requester",
//           "type": "address"
//         },
//         {
//           "internalType": "address",
//           "name": "recipient",
//           "type": "address"
//         },
//         {
//           "internalType": "string",
//           "name": "status",
//           "type": "string"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function",
//       "constant": true
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "string",
//           "name": "",
//           "type": "string"
//         },
//         {
//           "internalType": "uint256",
//           "name": "",
//           "type": "uint256"
//         }
//       ],
//       "name": "drugIoTData",
//       "outputs": [
//         {
//           "internalType": "uint256",
//           "name": "timestamp",
//           "type": "uint256"
//         },
//         {
//           "internalType": "int256",
//           "name": "temperature",
//           "type": "int256"
//         },
//         {
//           "internalType": "int256",
//           "name": "humidity",
//           "type": "int256"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function",
//       "constant": true
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "string",
//           "name": "",
//           "type": "string"
//         }
//       ],
//       "name": "drugs",
//       "outputs": [
//         {
//           "internalType": "string",
//           "name": "qrCode",
//           "type": "string"
//         },
//         {
//           "internalType": "string",
//           "name": "cryptoKey",
//           "type": "string"
//         },
//         {
//           "internalType": "uint256",
//           "name": "expirationDate",
//           "type": "uint256"
//         },
//         {
//           "internalType": "address",
//           "name": "currentOwner",
//           "type": "address"
//         },
//         {
//           "internalType": "string",
//           "name": "status",
//           "type": "string"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function",
//       "constant": true
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "address",
//           "name": "",
//           "type": "address"
//         }
//       ],
//       "name": "hospitalRequestCounters",
//       "outputs": [
//         {
//           "internalType": "uint256",
//           "name": "",
//           "type": "uint256"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function",
//       "constant": true
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "uint256",
//           "name": "",
//           "type": "uint256"
//         }
//       ],
//       "name": "hospitalRequests",
//       "outputs": [
//         {
//           "internalType": "uint256",
//           "name": "requestId",
//           "type": "uint256"
//         },
//         {
//           "internalType": "uint256",
//           "name": "batchId",
//           "type": "uint256"
//         },
//         {
//           "internalType": "address",
//           "name": "requester",
//           "type": "address"
//         },
//         {
//           "internalType": "address",
//           "name": "recipient",
//           "type": "address"
//         },
//         {
//           "internalType": "string",
//           "name": "status",
//           "type": "string"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function",
//       "constant": true
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "address",
//           "name": "",
//           "type": "address"
//         }
//       ],
//       "name": "hospitalRequesttoWholesalerCounters",
//       "outputs": [
//         {
//           "internalType": "uint256",
//           "name": "",
//           "type": "uint256"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function",
//       "constant": true
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "uint256",
//           "name": "",
//           "type": "uint256"
//         }
//       ],
//       "name": "requests1",
//       "outputs": [
//         {
//           "internalType": "uint256",
//           "name": "requestId",
//           "type": "uint256"
//         },
//         {
//           "internalType": "string",
//           "name": "drugName",
//           "type": "string"
//         },
//         {
//           "internalType": "uint256",
//           "name": "quantity",
//           "type": "uint256"
//         },
//         {
//           "internalType": "address",
//           "name": "requester",
//           "type": "address"
//         },
//         {
//           "internalType": "address",
//           "name": "manufacturer",
//           "type": "address"
//         },
//         {
//           "internalType": "string",
//           "name": "status",
//           "type": "string"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function",
//       "constant": true
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "uint256",
//           "name": "",
//           "type": "uint256"
//         }
//       ],
//       "name": "requests2",
//       "outputs": [
//         {
//           "internalType": "uint256",
//           "name": "requestId",
//           "type": "uint256"
//         },
//         {
//           "internalType": "string",
//           "name": "drugName",
//           "type": "string"
//         },
//         {
//           "internalType": "uint256",
//           "name": "quantity",
//           "type": "uint256"
//         },
//         {
//           "internalType": "address",
//           "name": "requester",
//           "type": "address"
//         },
//         {
//           "internalType": "address",
//           "name": "wholesaler",
//           "type": "address"
//         },
//         {
//           "internalType": "string",
//           "name": "status",
//           "type": "string"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function",
//       "constant": true
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "string",
//           "name": "",
//           "type": "string"
//         },
//         {
//           "internalType": "uint256",
//           "name": "",
//           "type": "uint256"
//         }
//       ],
//       "name": "transactionHistory",
//       "outputs": [
//         {
//           "internalType": "string",
//           "name": "qrCode",
//           "type": "string"
//         },
//         {
//           "internalType": "address",
//           "name": "from",
//           "type": "address"
//         },
//         {
//           "internalType": "address",
//           "name": "to",
//           "type": "address"
//         },
//         {
//           "internalType": "string",
//           "name": "status",
//           "type": "string"
//         },
//         {
//           "internalType": "uint256",
//           "name": "timestamp",
//           "type": "uint256"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function",
//       "constant": true
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "address",
//           "name": "",
//           "type": "address"
//         }
//       ],
//       "name": "wholesalerRequestCounters",
//       "outputs": [
//         {
//           "internalType": "uint256",
//           "name": "",
//           "type": "uint256"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function",
//       "constant": true
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "uint256",
//           "name": "",
//           "type": "uint256"
//         }
//       ],
//       "name": "wholesalerRequests",
//       "outputs": [
//         {
//           "internalType": "uint256",
//           "name": "requestId",
//           "type": "uint256"
//         },
//         {
//           "internalType": "uint256",
//           "name": "batchId",
//           "type": "uint256"
//         },
//         {
//           "internalType": "address",
//           "name": "requester",
//           "type": "address"
//         },
//         {
//           "internalType": "address",
//           "name": "recipient",
//           "type": "address"
//         },
//         {
//           "internalType": "string",
//           "name": "status",
//           "type": "string"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function",
//       "constant": true
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "address",
//           "name": "",
//           "type": "address"
//         }
//       ],
//       "name": "wholesalerRequesttoManufacturerCounters",
//       "outputs": [
//         {
//           "internalType": "uint256",
//           "name": "",
//           "type": "uint256"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function",
//       "constant": true
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "string",
//           "name": "drugName",
//           "type": "string"
//         },
//         {
//           "internalType": "uint256",
//           "name": "quantity",
//           "type": "uint256"
//         },
//         {
//           "internalType": "address",
//           "name": "manufacturer",
//           "type": "address"
//         }
//       ],
//       "name": "requestDrugs",
//       "outputs": [],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "uint256",
//           "name": "requestId",
//           "type": "uint256"
//         },
//         {
//           "internalType": "string[]",
//           "name": "qrCodes",
//           "type": "string[]"
//         },
//         {
//           "internalType": "string[]",
//           "name": "cryptoKeys",
//           "type": "string[]"
//         },
//         {
//           "internalType": "uint256[]",
//           "name": "expirationDates",
//           "type": "uint256[]"
//         }
//       ],
//       "name": "approveRequest",
//       "outputs": [],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "uint256",
//           "name": "batchId",
//           "type": "uint256"
//         },
//         {
//           "internalType": "address",
//           "name": "distributor",
//           "type": "address"
//         }
//       ],
//       "name": "createTransferRequestToDistributor",
//       "outputs": [],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "uint256",
//           "name": "requestId",
//           "type": "uint256"
//         }
//       ],
//       "name": "acceptTransferRequestFromManufacturer",
//       "outputs": [],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "uint256",
//           "name": "batchId",
//           "type": "uint256"
//         },
//         {
//           "internalType": "address",
//           "name": "wholesaler",
//           "type": "address"
//         }
//       ],
//       "name": "createDeliveryRequestToWholesaler",
//       "outputs": [],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "uint256",
//           "name": "requestId",
//           "type": "uint256"
//         }
//       ],
//       "name": "acceptDeliveryRequestFromDistributor1",
//       "outputs": [],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "string",
//           "name": "drugName",
//           "type": "string"
//         },
//         {
//           "internalType": "uint256",
//           "name": "quantity",
//           "type": "uint256"
//         },
//         {
//           "internalType": "address",
//           "name": "wholesaler",
//           "type": "address"
//         }
//       ],
//       "name": "requestDrugsFromWholesaler",
//       "outputs": [],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "uint256",
//           "name": "batchId",
//           "type": "uint256"
//         },
//         {
//           "internalType": "address",
//           "name": "requesterr",
//           "type": "address"
//         }
//       ],
//       "name": "changeFinalStat",
//       "outputs": [],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "uint256",
//           "name": "requestId",
//           "type": "uint256"
//         },
//         {
//           "internalType": "uint256",
//           "name": "batchId",
//           "type": "uint256"
//         }
//       ],
//       "name": "approveRequestFromHospital",
//       "outputs": [],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "uint256",
//           "name": "batchId",
//           "type": "uint256"
//         },
//         {
//           "internalType": "address",
//           "name": "distributor",
//           "type": "address"
//         }
//       ],
//       "name": "createDeliveryRequestToDistributor",
//       "outputs": [],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "uint256",
//           "name": "requestId",
//           "type": "uint256"
//         }
//       ],
//       "name": "acceptDeliveryRequestFromWholesaler",
//       "outputs": [],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "uint256",
//           "name": "batchId",
//           "type": "uint256"
//         },
//         {
//           "internalType": "address",
//           "name": "hospital",
//           "type": "address"
//         }
//       ],
//       "name": "createDeliveryRequestToHospital",
//       "outputs": [],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "uint256",
//           "name": "requestId",
//           "type": "uint256"
//         }
//       ],
//       "name": "acceptDeliveryRequestFromDistributor2",
//       "outputs": [],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "string",
//           "name": "qrCode",
//           "type": "string"
//         },
//         {
//           "internalType": "int256",
//           "name": "temperature",
//           "type": "int256"
//         },
//         {
//           "internalType": "int256",
//           "name": "humidity",
//           "type": "int256"
//         }
//       ],
//       "name": "updateIoTData",
//       "outputs": [],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "string",
//           "name": "qrCode",
//           "type": "string"
//         }
//       ],
//       "name": "getLatestIoTData",
//       "outputs": [
//         {
//           "components": [
//             {
//               "internalType": "uint256",
//               "name": "timestamp",
//               "type": "uint256"
//             },
//             {
//               "internalType": "int256",
//               "name": "temperature",
//               "type": "int256"
//             },
//             {
//               "internalType": "int256",
//               "name": "humidity",
//               "type": "int256"
//             }
//           ],
//           "internalType": "struct PharmaDistribution.IoTData",
//           "name": "",
//           "type": "tuple"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function",
//       "constant": true
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "string",
//           "name": "qrCode",
//           "type": "string"
//         }
//       ],
//       "name": "getTransactionHistory",
//       "outputs": [
//         {
//           "components": [
//             {
//               "internalType": "string",
//               "name": "qrCode",
//               "type": "string"
//             },
//             {
//               "internalType": "address",
//               "name": "from",
//               "type": "address"
//             },
//             {
//               "internalType": "address",
//               "name": "to",
//               "type": "address"
//             },
//             {
//               "internalType": "string",
//               "name": "status",
//               "type": "string"
//             },
//             {
//               "internalType": "uint256",
//               "name": "timestamp",
//               "type": "uint256"
//             }
//           ],
//           "internalType": "struct PharmaDistribution.Transaction[]",
//           "name": "",
//           "type": "tuple[]"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function",
//       "constant": true
//     },
//     {
//       "inputs": [],
//       "name": "getAllBatches",
//       "outputs": [
//         {
//           "components": [
//             {
//               "internalType": "uint256",
//               "name": "batchId",
//               "type": "uint256"
//             },
//             {
//               "internalType": "string[]",
//               "name": "qrCodes",
//               "type": "string[]"
//             },
//             {
//               "internalType": "address",
//               "name": "owner",
//               "type": "address"
//             },
//             {
//               "internalType": "address",
//               "name": "finalRecipient",
//               "type": "address"
//             },
//             {
//               "internalType": "uint256",
//               "name": "quantity",
//               "type": "uint256"
//             },
//             {
//               "internalType": "string",
//               "name": "status",
//               "type": "string"
//             }
//           ],
//           "internalType": "struct PharmaDistribution.Batch[]",
//           "name": "",
//           "type": "tuple[]"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function",
//       "constant": true
//     },
//     {
//       "inputs": [],
//       "name": "getAllRequests1",
//       "outputs": [
//         {
//           "components": [
//             {
//               "internalType": "uint256",
//               "name": "requestId",
//               "type": "uint256"
//             },
//             {
//               "internalType": "string",
//               "name": "drugName",
//               "type": "string"
//             },
//             {
//               "internalType": "uint256",
//               "name": "quantity",
//               "type": "uint256"
//             },
//             {
//               "internalType": "address",
//               "name": "requester",
//               "type": "address"
//             },
//             {
//               "internalType": "address",
//               "name": "manufacturer",
//               "type": "address"
//             },
//             {
//               "internalType": "string",
//               "name": "status",
//               "type": "string"
//             }
//           ],
//           "internalType": "struct PharmaDistribution.Request1[]",
//           "name": "",
//           "type": "tuple[]"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function",
//       "constant": true
//     },
//     {
//       "inputs": [],
//       "name": "getAllRequests2",
//       "outputs": [
//         {
//           "components": [
//             {
//               "internalType": "uint256",
//               "name": "requestId",
//               "type": "uint256"
//             },
//             {
//               "internalType": "string",
//               "name": "drugName",
//               "type": "string"
//             },
//             {
//               "internalType": "uint256",
//               "name": "quantity",
//               "type": "uint256"
//             },
//             {
//               "internalType": "address",
//               "name": "requester",
//               "type": "address"
//             },
//             {
//               "internalType": "address",
//               "name": "wholesaler",
//               "type": "address"
//             },
//             {
//               "internalType": "string",
//               "name": "status",
//               "type": "string"
//             }
//           ],
//           "internalType": "struct PharmaDistribution.Request2[]",
//           "name": "",
//           "type": "tuple[]"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function",
//       "constant": true
//     },
//     {
//       "inputs": [],
//       "name": "getAllDistributorRequests",
//       "outputs": [
//         {
//           "components": [
//             {
//               "internalType": "uint256",
//               "name": "requestId",
//               "type": "uint256"
//             },
//             {
//               "internalType": "uint256",
//               "name": "batchId",
//               "type": "uint256"
//             },
//             {
//               "internalType": "address",
//               "name": "requester",
//               "type": "address"
//             },
//             {
//               "internalType": "address",
//               "name": "recipient",
//               "type": "address"
//             },
//             {
//               "internalType": "string",
//               "name": "status",
//               "type": "string"
//             }
//           ],
//           "internalType": "struct PharmaDistribution.TransferRequest[]",
//           "name": "",
//           "type": "tuple[]"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function",
//       "constant": true
//     },
//     {
//       "inputs": [],
//       "name": "getAllWholesalerRequests",
//       "outputs": [
//         {
//           "components": [
//             {
//               "internalType": "uint256",
//               "name": "requestId",
//               "type": "uint256"
//             },
//             {
//               "internalType": "uint256",
//               "name": "batchId",
//               "type": "uint256"
//             },
//             {
//               "internalType": "address",
//               "name": "requester",
//               "type": "address"
//             },
//             {
//               "internalType": "address",
//               "name": "recipient",
//               "type": "address"
//             },
//             {
//               "internalType": "string",
//               "name": "status",
//               "type": "string"
//             }
//           ],
//           "internalType": "struct PharmaDistribution.TransferRequest[]",
//           "name": "",
//           "type": "tuple[]"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function",
//       "constant": true
//     },
//     {
//       "inputs": [],
//       "name": "getAllHospitalRequests",
//       "outputs": [
//         {
//           "components": [
//             {
//               "internalType": "uint256",
//               "name": "requestId",
//               "type": "uint256"
//             },
//             {
//               "internalType": "uint256",
//               "name": "batchId",
//               "type": "uint256"
//             },
//             {
//               "internalType": "address",
//               "name": "requester",
//               "type": "address"
//             },
//             {
//               "internalType": "address",
//               "name": "recipient",
//               "type": "address"
//             },
//             {
//               "internalType": "string",
//               "name": "status",
//               "type": "string"
//             }
//           ],
//           "internalType": "struct PharmaDistribution.TransferRequest[]",
//           "name": "",
//           "type": "tuple[]"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function",
//       "constant": true
//     }
//   ]; // Update with your contract's ABI
// const contract = new web3.eth.Contract(contractABI, contractAddress);

// const account = '0xeF50d731B338aBBf1F2D9016Fb0bDFf4644C285e'; // Update with your account address from Ganache

// async function simulateIoTData(qrCode) {
//     const temperature = getRandomInt(0, 10); // Simulate temperature in Celsius
//     const humidity = getRandomInt(20, 60); // Simulate humidity in percentage

//     await contract.methods.updateIoTData(qrCode, temperature, humidity)
//         .send({ from: account });

//     console.log(`IoT data updated for ${qrCode}: Temperature = ${temperature}, Humidity = ${humidity}`);
// }

// function getRandomInt(min, max) {
//     return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// // Simulate data updates every 10 seconds
// setInterval(() => {
//     simulateIoTData('a');
// }, 10000);

// const Web3 = require('web3');
// const web3 = new Web3('http://127.0.0.1:7545'); // Connect to your Ganache instance

// const contractAddress = '0x5B66E3B74f6F6B65F764A5a8108982B492FD56a8'; // Update with your contract address
// const contractABI = [
//     // Replace with your actual ABI
//     // Make sure to provide the complete ABI here
// ];

// const contract = new web3.eth.Contract(contractABI, contractAddress);

// const account = '0xeF50d731B338aBBf1F2D9016Fb0bDFf4644C285e'; // Update with your account address from Ganache

// async function simulateIoTData(qrCode) {
//     const temperature = getRandomInt(0, 10); // Simulate temperature in Celsius
//     const humidity = getRandomInt(20, 60); // Simulate humidity in percentage

//     try {
//         await contract.methods.updateIoTData(qrCode, temperature, humidity)
//             .send({ from: account });
//         console.log(`IoT data updated for ${qrCode}: Temperature = ${temperature}, Humidity = ${humidity}`);
//     } catch (err) {
//         console.error('Error updating IoT data:', err);
//     }
// }

// function getRandomInt(min, max) {
//     return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// // Simulate data updates every 10 seconds
// setInterval(() => {
//     simulateIoTData('EXAMPLE_QR_CODE'); // Use a valid QR code
// }, 10000);

const {Web3} = require('web3');
const fs = require('fs');
const path = require('path');

// Load ABI from PharmaChain.json
const contractJson = JSON.parse(fs.readFileSync(path.join(__dirname, './src/truffle_abis/PharmaDistribution.json'), 'utf8'));
const contractABI = contractJson.abi;

const web3 = new Web3('http://127.0.0.1:7545'); // Connect to your Ganache instance

const contractAddress = '0xC5d2bBd23d01A0eE12fa418A275aD9c05e8fAa56'; // Update with your contract address
const contract = new web3.eth.Contract(contractABI, contractAddress);

const account = '0x59f68E71e740334eaa17a743244C64bDBE913798'; // Update with your account address from Ganache

async function simulateIoTData(qrCode) {
    const temperature = getRandomInt(0, 10); // Simulate temperature in Celsius
    const humidity = getRandomInt(20, 60); // Simulate humidity in percentage

    try {
        await contract.methods.updateIoTData(qrCode, temperature, humidity)
            .send({ from: account,gas: 3000000, gasPrice: '20000000000' });
        console.log(`IoT data updated for ${qrCode}: Temperature = ${temperature}, Humidity = ${humidity}`);
    } catch (err) {
        console.error('Error updating IoT data:', err);
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Simulate data updates every 10 seconds
setInterval(() => {
    simulateIoTData('k'); // Use a valid QR code
}, 10000);
