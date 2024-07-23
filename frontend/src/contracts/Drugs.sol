// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract PharmaDistribution {
    struct Drug {
        string qrCode;
        string cryptoKey;
        uint256 expirationDate;
        address currentOwner;
        string status; // Manufactured, In Transit1, Wholesaler, In Transit2, HospitalOrPharmacy
    }

    struct Request1 {
        uint256 requestId;
        string drugName;
        uint256 quantity;
        address requester;
        address manufacturer;
        string status; // Pending, Approved, Rejected
    }

    struct Request2 {
        uint256 requestId;
        string drugName;
        uint256 quantity;
        address requester;
        address wholesaler;
        string status; // Pending, Approved, Rejected
    }

    struct Batch {
        uint256 batchId;
        string[] qrCodes;
        address owner;
        address finalRecipient;
        uint256 quantity;
        string status; // Manufactured, In Transit1, Wholesaler, In Transit2, HospitalOrPharmacy
    }

    struct TransferRequest {
        uint256 requestId;
        uint256 batchId;
        address requester;
        address recipient;
        string status; // Pending, Accepted, Rejected
    }

    struct Transaction {
        string qrCode;
        address from;
        address to;
        string status;
        uint256 timestamp;
    }

    mapping(string => Drug) public drugs;
    mapping(uint256 => Batch) public batches;
    // mapping(uint256 => Request) public requests;
    mapping(uint256 => Request1) public requests1;
    mapping(uint256 => Request2) public requests2;
    mapping(string => Transaction[]) public transactionHistory;
    uint256 public batchCounter;
    // mapping(address => uint256) public manufacturerBatchCounters;
    // mapping(address => uint256) public wholesalerBatchCounters;
    // mapping(address => uint256) public hospitalBatchCounters;
    // mapping(address => uint256) public distributorBatchCounters;
    // uint256 public requestCounter;
    mapping(uint256 => TransferRequest) public distributorRequests;
    mapping(uint256 => TransferRequest) public wholesalerRequests;
    mapping(uint256 => TransferRequest) public hospitalRequests;
    // uint256 public distributorRequestCounter;
    // uint256 public wholesalerRequestCounter;
    // uint256 public hospitalRequestCounter;

    mapping(address => uint256) public distributorRequestCounters;
    mapping(address => uint256) public wholesalerRequestCounters;
    mapping(address => uint256) public hospitalRequestCounters;
    mapping(address => uint256) public wholesalerRequesttoManufacturerCounters;
    mapping(address => uint256) public hospitalRequesttoWholesalerCounters;

    struct IoTData {
        uint256 timestamp;
        int256 temperature; // in Celsius
        int256 humidity; // in percentage
    }

    mapping(string => IoTData[]) public drugIoTData;

    // Events
    event DrugCreated(string qrCode, address indexed manufacturer);
    event BatchCreated(uint256 batchId, address indexed owner);
    event BatchTransferred(
        uint256 batchId,
        address indexed from,
        address indexed to,
        string status
    );
    event DrugTransferred(
        string qrCode,
        address indexed from,
        address indexed to,
        string status
    );
    event DrugStatusChanged(
        string qrCode,
        string status,
        address indexed newOwner
    );
    event RequestCreated(
        uint256 requestId,
        address indexed requester,
        string drugName,
        uint256 quantity,
        address manufacturer
    );
    event RequestStatusChanged(uint256 requestId, string status);
    event TransferRequestCreated(
        uint256 requestId,
        uint256 batchId,
        address indexed requester,
        address indexed recipient,
        string status
    );
    event DeliveryRequestCreated(
        uint256 requestId,
        uint256 batchId,
        address indexed requester,
        address indexed recipient,
        string status
    );
    event IoTDataUpdated(
        string qrCode,
        int256 temperature,
        int256 humidity,
        uint256 timestamp
    );
    event Alert(string qrCode, string message, uint256 timestamp);

    // Function to create a drug
    function createDrug(
        string memory qrCode,
        string memory cryptoKey,
        uint256 expirationDate
    ) internal {
        drugs[qrCode] = Drug(
            qrCode,
            cryptoKey,
            expirationDate,
            msg.sender,
            "Manufactured"
        );
        emit DrugCreated(qrCode, msg.sender);

        // Record transaction
        recordTransaction(qrCode, address(0), msg.sender, "Manufactured");
    }

    // Function to create a batch of drugs
    function createBatch(
        string[] memory qrCodes,
        string[] memory cryptoKeys,
        uint256[] memory expirationDates,
        address requesterr,
        uint256 quant
    ) internal {
        require(
            qrCodes.length == cryptoKeys.length &&
                qrCodes.length == expirationDates.length,
            "Array lengths must match"
        );
        uint256 batchId = batchCounter++;
        batches[batchId] = Batch(
            batchId,
            qrCodes,
            msg.sender,
            requesterr,
            quant,
            "Manufactured"
        );

        for (uint i = 0; i < qrCodes.length; i++) {
            createDrug(qrCodes[i], cryptoKeys[i], expirationDates[i]);
        }
        emit BatchCreated(batchId, msg.sender);
    }

    // Function for wholesaler to request drugs from manufacturer
    function requestDrugs(
        string memory drugName,
        uint256 quantity,
        address manufacturer
    ) public {
        uint256 requestId = wholesalerRequesttoManufacturerCounters[
            manufacturer
        ]++;
        requests1[requestId] = Request1(
            requestId,
            drugName,
            quantity,
            msg.sender,
            manufacturer,
            "Pending"
        );
        emit RequestCreated(
            requestId,
            msg.sender,
            drugName,
            quantity,
            manufacturer
        );
    }

    // Function for manufacturer to approve drug request
    function approveRequest(
        uint256 requestId,
        string[] memory qrCodes,
        string[] memory cryptoKeys,
        uint256[] memory expirationDates
    ) public {
        Request1 storage req = requests1[requestId];
        require(
            req.manufacturer == msg.sender,
            "Only the manufacturer can approve this request"
        );
        require(
            keccak256(bytes(req.status)) == keccak256(bytes("Pending")),
            "Request not pending"
        );
        req.status = "Approved";
        createBatch(
            qrCodes,
            cryptoKeys,
            expirationDates,
            req.requester,
            req.quantity
        );
        emit RequestStatusChanged(requestId, "Approved");
    }

    function createTransferRequestToDistributor(
        uint256 batchId,
        address distributor
    ) public {
        Batch storage batch = batches[batchId];
        require(
            batch.owner == msg.sender,
            "Only the owner can create a transfer request"
        );

        uint256 requestId = distributorRequestCounters[distributor]++;
        distributorRequests[requestId] = TransferRequest(
            requestId,
            batchId,
            msg.sender,
            distributor,
            "Pending"
        );

        emit TransferRequestCreated(
            requestId,
            batchId,
            msg.sender,
            distributor,
            "Pending"
        );
    }

    // Function for distributor to accept the transfer request
    function acceptTransferRequestFromManufacturer(uint256 requestId) public {
        TransferRequest storage request = distributorRequests[requestId];
        require(
            request.recipient == msg.sender,
            "Only the recipient can accept the request"
        );
        require(
            keccak256(bytes(request.status)) == keccak256(bytes("Pending")),
            "Request not pending"
        );

        request.status = "Accepted";
        Batch storage batch = batches[request.batchId];
        batch.owner = msg.sender;
        batch.status = "In Transit1";

        for (uint i = 0; i < batch.qrCodes.length; i++) {
            drugs[batch.qrCodes[i]].currentOwner = msg.sender;
            drugs[batch.qrCodes[i]].status = "In Transit1";
            emit DrugTransferred(
                batch.qrCodes[i],
                request.requester,
                msg.sender,
                "In Transit1"
            );
            emit DrugStatusChanged(batch.qrCodes[i], "In Transit1", msg.sender);

            // Record transaction
            recordTransaction(
                batch.qrCodes[i],
                request.requester,
                msg.sender,
                "In Transit1"
            );
        }

        emit BatchTransferred(
            request.batchId,
            request.requester,
            msg.sender,
            "In Transit1"
        );
    }

    // Function for distributor to create a delivery request to wholesaler
    function createDeliveryRequestToWholesaler(
        uint256 batchId,
        address wholesaler
    ) public {
        Batch storage batch = batches[batchId];
        require(
            batch.owner == msg.sender,
            "Only the owner can create a delivery request"
        );

        uint256 requestId = wholesalerRequestCounters[wholesaler]++;
        wholesalerRequests[requestId] = TransferRequest(
            requestId,
            batchId,
            msg.sender,
            wholesaler,
            "Pending"
        );

        emit DeliveryRequestCreated(
            requestId,
            batchId,
            msg.sender,
            wholesaler,
            "Pending"
        );
    }

    // Function for wholesaler to accept the delivery request
    function acceptDeliveryRequestFromDistributor1(uint256 requestId) public {
        TransferRequest storage request = wholesalerRequests[requestId];
        require(
            request.recipient == msg.sender,
            "Only the recipient can accept the request"
        );
        require(
            keccak256(bytes(request.status)) == keccak256(bytes("Pending")),
            "Request not pending"
        );

        request.status = "Accepted";
        Batch storage batch = batches[request.batchId];
        batch.owner = msg.sender;
        batch.status = "Wholesaler";

        for (uint i = 0; i < batch.qrCodes.length; i++) {
            drugs[batch.qrCodes[i]].currentOwner = msg.sender;
            drugs[batch.qrCodes[i]].status = "Wholesaler";
            emit DrugTransferred(
                batch.qrCodes[i],
                request.requester,
                msg.sender,
                "Wholesaler"
            );
            emit DrugStatusChanged(batch.qrCodes[i], "Wholesaler", msg.sender);

            // Record transaction
            recordTransaction(
                batch.qrCodes[i],
                request.requester,
                msg.sender,
                "Wholesaler"
            );
        }

        emit BatchTransferred(
            request.batchId,
            request.requester,
            msg.sender,
            "Wholesaler"
        );
    }

    // Function for hospital/pharmacy to request drugs from wholesaler
    function requestDrugsFromWholesaler(
        string memory drugName,
        uint256 quantity,
        address wholesaler
    ) public {
        uint256 requestId = hospitalRequesttoWholesalerCounters[wholesaler]++;
        requests2[requestId] = Request2(
            requestId,
            drugName,
            quantity,
            msg.sender,
            wholesaler,
            "Pending"
        );
        emit RequestCreated(
            requestId,
            msg.sender,
            drugName,
            quantity,
            wholesaler
        );
    }

    function changeFinalStat(uint256 batchId, address requesterr) public {
        Batch storage batch = batches[batchId];
        batch.finalRecipient = requesterr;
    }

    // Function for wholesaler to approve drug request
    function approveRequestFromHospital(
        uint256 requestId,
        uint256 batchId
    ) public {
        Request2 storage req = requests2[requestId];
        require(
            req.wholesaler == msg.sender,
            "Only the wholesaler can approve this request"
        );
        require(
            keccak256(bytes(req.status)) == keccak256(bytes("Pending")),
            "Request not pending"
        );
        req.status = "Approved";
        changeFinalStat(batchId, req.requester);
        emit RequestStatusChanged(requestId, "Approved");
    }

    function createDeliveryRequestToDistributor(
        uint256 batchId,
        address distributor
    ) public {
        Batch storage batch = batches[batchId];
        require(
            batch.owner == msg.sender,
            "Only the owner can create a delivery request"
        );

        uint256 requestId = distributorRequestCounters[distributor]++;
        distributorRequests[requestId] = TransferRequest(
            requestId,
            batchId,
            msg.sender,
            distributor,
            "Pending"
        );

        emit DeliveryRequestCreated(
            requestId,
            batchId,
            msg.sender,
            distributor,
            "Pending"
        );
    }

    // Function for hospital/pharmacy to accept the delivery request
    function acceptDeliveryRequestFromWholesaler(uint256 requestId) public {
        TransferRequest storage request = distributorRequests[requestId];
        require(
            request.recipient == msg.sender,
            "Only the recipient can accept the request"
        );
        require(
            keccak256(bytes(request.status)) == keccak256(bytes("Pending")),
            "Request not pending"
        );

        request.status = "Accepted";
        Batch storage batch = batches[request.batchId];
        batch.owner = msg.sender;
        batch.status = "In Transit2";

        for (uint i = 0; i < batch.qrCodes.length; i++) {
            drugs[batch.qrCodes[i]].currentOwner = msg.sender;
            drugs[batch.qrCodes[i]].status = "In Transit2";
            emit DrugTransferred(
                batch.qrCodes[i],
                request.requester,
                msg.sender,
                "In Transit2"
            );
            emit DrugStatusChanged(batch.qrCodes[i], "In Transit2", msg.sender);

            // Record transaction
            recordTransaction(
                batch.qrCodes[i],
                request.requester,
                msg.sender,
                "In Transit2"
            );
        }

        emit BatchTransferred(
            request.batchId,
            request.requester,
            msg.sender,
            "In Transit2"
        );
    }

    function createDeliveryRequestToHospital(
        uint256 batchId,
        address hospital
    ) public {
        Batch storage batch = batches[batchId];
        require(
            batch.owner == msg.sender,
            "Only the owner can create a delivery request"
        );

        uint256 requestId = hospitalRequestCounters[hospital]++;
        hospitalRequests[requestId] = TransferRequest(
            requestId,
            batchId,
            msg.sender,
            hospital,
            "Pending"
        );

        emit DeliveryRequestCreated(
            requestId,
            batchId,
            msg.sender,
            hospital,
            "Pending"
        );
    }

    function acceptDeliveryRequestFromDistributor2(uint256 requestId) public {
        TransferRequest storage request = hospitalRequests[requestId];
        require(
            request.recipient == msg.sender,
            "Only the recipient can accept the request"
        );
        require(
            keccak256(bytes(request.status)) == keccak256(bytes("Pending")),
            "Request not pending"
        );

        request.status = "Accepted";
        Batch storage batch = batches[request.batchId];
        batch.owner = msg.sender;
        batch.status = "Hospital/Pharmacy";

        for (uint i = 0; i < batch.qrCodes.length; i++) {
            drugs[batch.qrCodes[i]].currentOwner = msg.sender;
            drugs[batch.qrCodes[i]].status = "Hospital/Pharmacy";
            emit DrugTransferred(
                batch.qrCodes[i],
                request.requester,
                msg.sender,
                "Hospital/Pharmacy"
            );
            emit DrugStatusChanged(
                batch.qrCodes[i],
                "Hospital/Pharmacy",
                msg.sender
            );

            // Record transaction
            recordTransaction(
                batch.qrCodes[i],
                request.requester,
                msg.sender,
                "Hospital/Pharmacy"
            );
        }

        emit BatchTransferred(
            request.batchId,
            request.requester,
            msg.sender,
            "Hospital/Pharmacy"
        );
    }

    function updateIoTData(
        string memory qrCode,
        int256 temperature,
        int256 humidity
    ) public {
        IoTData memory data = IoTData(block.timestamp, temperature, humidity);
        drugIoTData[qrCode].push(data);

        emit IoTDataUpdated(qrCode, temperature, humidity, block.timestamp);

        // Check conditions and emit alert if out of range
        if (temperature < 2 || temperature > 8) {
            // Example temperature range: 2-8 Celsius
            emit Alert(qrCode, "Temperature out of range!", block.timestamp);
        }
        if (humidity < 30 || humidity > 50) {
            // Example humidity range: 30-50%
            emit Alert(qrCode, "Humidity out of range!", block.timestamp);
        }
    }

    function getLatestIoTData(
        string memory qrCode
    ) public view returns (IoTData memory) {
        require(drugIoTData[qrCode].length > 0, "No IoT data available");
        return drugIoTData[qrCode][drugIoTData[qrCode].length - 1];
    }

    // Function to record transactions
    function recordTransaction(
        string memory qrCode,
        address from,
        address to,
        string memory status
    ) internal {
        transactionHistory[qrCode].push(
            Transaction(qrCode, from, to, status, block.timestamp)
        );
    }

    // Function to get transaction history for a drug
    function getTransactionHistory(
        string memory qrCode
    ) public view returns (Transaction[] memory) {
        return transactionHistory[qrCode];
    }

    function getAllBatches() public view returns (Batch[] memory) {
        uint256 count = 0;
        for (uint256 i = 0; i < type(uint256).max; i++) {
            if (batches[i].owner != address(0)) {
                count++;
            } else {
                break;
            }
        }

        Batch[] memory allBatches = new Batch[](count);
        for (uint256 i = 0; i < count; i++) {
            allBatches[i] = batches[i];
        }
        return allBatches;
    }

    // Function to get all contents of requests1 mapping
    function getAllRequests1() public view returns (Request1[] memory) {
        uint256 count = 0;
        for (uint256 i = 0; i < type(uint256).max; i++) {
            if (requests1[i].requester != address(0)) {
                count++;
            } else {
                break;
            }
        }

        Request1[] memory allRequests1 = new Request1[](count);
        for (uint256 i = 0; i < count; i++) {
            allRequests1[i] = requests1[i];
        }
        return allRequests1;
    }

    // Function to get all contents of requests2 mapping
    function getAllRequests2() public view returns (Request2[] memory) {
        uint256 count = 0;
        for (uint256 i = 0; i < type(uint256).max; i++) {
            if (requests2[i].requester != address(0)) {
                count++;
            } else {
                break;
            }
        }

        Request2[] memory allRequests2 = new Request2[](count);
        for (uint256 i = 0; i < count; i++) {
            allRequests2[i] = requests2[i];
        }
        return allRequests2;
    }

    // Function to get all contents of distributorRequests mapping
    function getAllDistributorRequests()
        public
        view
        returns (TransferRequest[] memory)
    {
        uint256 count = 0;
        for (uint256 i = 0; i < type(uint256).max; i++) {
            if (distributorRequests[i].requester != address(0)) {
                count++;
            } else {
                break;
            }
        }

        TransferRequest[] memory allDistributorRequests = new TransferRequest[](
            count
        );
        for (uint256 i = 0; i < count; i++) {
            allDistributorRequests[i] = distributorRequests[i];
        }
        return allDistributorRequests;
    }

    // Function to get all contents of wholesalerRequests mapping
    function getAllWholesalerRequests()
        public
        view
        returns (TransferRequest[] memory)
    {
        uint256 count = 0;
        for (uint256 i = 0; i < type(uint256).max; i++) {
            if (wholesalerRequests[i].requester != address(0)) {
                count++;
            } else {
                break;
            }
        }

        TransferRequest[] memory allWholesalerRequests = new TransferRequest[](
            count
        );
        for (uint256 i = 0; i < count; i++) {
            allWholesalerRequests[i] = wholesalerRequests[i];
        }
        return allWholesalerRequests;
    }

    // Function to get all contents of hospitalRequests mapping
    function getAllHospitalRequests()
        public
        view
        returns (TransferRequest[] memory)
    {
        uint256 count = 0;
        for (uint256 i = 0; i < type(uint256).max; i++) {
            if (hospitalRequests[i].requester != address(0)) {
                count++;
            } else {
                break;
            }
        }

        TransferRequest[] memory allHospitalRequests = new TransferRequest[](
            count
        );
        for (uint256 i = 0; i < count; i++) {
            allHospitalRequests[i] = hospitalRequests[i];
        }
        return allHospitalRequests;
    }
}

// Function to get all contents of batches mapping
