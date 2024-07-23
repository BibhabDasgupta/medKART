// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PharmaChain {
    address public owner;

    struct Manufacturer {
        string username;
        address account;
    }

    mapping(address => Manufacturer) public manufacturers;
    address[] public manufacturerAccounts;

    struct Wholesaler {
        string username;
        address account;
    }

    mapping(address => Wholesaler) public wholesalers;
     address[] public wholesalerAccounts;

    struct Distributor {
        string username;
        address account;
    }

    mapping(address => Distributor) public distributors;
    address[] public distributorAccounts;

    struct HospitalPharmacy {
        string username;
        address account;
    }

    mapping(address => HospitalPharmacy) public hospitalpharmacies;
     address[] public hospitalpharmacyAccounts;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function registerManufacturer(string memory _username, address _account) public onlyOwner {
        manufacturers[_account] = Manufacturer(_username, _account);
        manufacturerAccounts.push(_account);
    }

    function getManufacturer(address _account) public view returns (Manufacturer memory) {
        Manufacturer memory manufacturer = manufacturers[_account];
        require(manufacturer.account != address(0), "Manufacturer does not exist");
        return manufacturer;
    }

     function registerWholesaler(string memory _username, address _account) public onlyOwner {
        wholesalers[_account] = Wholesaler(_username, _account);
        wholesalerAccounts.push(_account);
    }

    function getWholesaler(address _account) public view returns (Wholesaler memory) {
        Wholesaler memory wholesaler = wholesalers[_account];
        require(wholesaler.account != address(0), "Wholesaler does not exist");
        return wholesaler;
    }

     function registerDistributor(string memory _username, address _account) public onlyOwner {
        distributors[_account] = Distributor(_username, _account);
        distributorAccounts.push(_account);
    }

    function getDistributor(address _account) public view returns (Distributor memory) {
        Distributor memory distributor = distributors[_account];
        require(distributor.account != address(0), "Distributor does not exist");
        return distributor;
    }

     function registerHospitalPharmacy(string memory _username, address _account) public onlyOwner {
        hospitalpharmacies[_account] = HospitalPharmacy(_username, _account);
        hospitalpharmacyAccounts.push(_account);
    }

    function getHospitalPharmacy(address _account) public view returns (HospitalPharmacy memory) {
        HospitalPharmacy memory hospitalpharmacy = hospitalpharmacies[_account];
        require(hospitalpharmacy.account != address(0), "Hospital/Pharmacy does not exist");
        return hospitalpharmacy;
    }


     function getAllDistributors() public view returns (address[] memory) {
        return distributorAccounts;
    }

    
     function getAllWholesalers() public view returns (address[] memory) {
        return wholesalerAccounts;
    }

    
     function getAllManufacturers() public view returns (address[] memory) {
        return manufacturerAccounts;
    }

    
     function getAllHospitalPharmacies() public view returns (address[] memory) {
        return hospitalpharmacyAccounts;
    }


}

