import React, { Component } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Web3 from 'web3';
import PharmaChain from '../truffle_abis/PharmaChain.json';
import Login from './Login4';
import Register from './Register4';
import DashBoard from './DashBoard4';
import Home4 from './Home4';
import withNavigation from './withNavigation'; // Import the HOC
import Loader from './Loader';

class HospitalsPharmacies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      web3: null,
      currentAccount: '',
      isHospitalPharmacy: null,
      loading: true,
    };
  }

  async componentDidMount() {
    await this.loadWeb3();
    if (this.state.web3 && this.state.currentAccount) {
      await this.checkHospitalPharmacyStatus();
    }
  }

  async loadWeb3() {
    try {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        this.setState({ web3: web3Instance });
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        this.setState({ currentAccount: accounts[0] });
      } else if (window.web3) {
        const web3Instance = new Web3(window.web3.currentProvider);
        this.setState({ web3: web3Instance });
        const accounts = await web3Instance.eth.getAccounts();
        this.setState({ currentAccount: accounts[0] });
      } else {
        console.error('Non-Ethereum browser detected. You should consider trying MetaMask!');
      }
    } catch (error) {
      console.error('Error loading web3:', error);
    }
  }

  async checkHospitalPharmacyStatus() {
    try {
      const networkId = await this.state.web3.eth.net.getId();
      const networkData = PharmaChain.networks[networkId];
      if (networkData) {
        const contract = new this.state.web3.eth.Contract(PharmaChain.abi, networkData.address);
        const hospitalpharmacy = await contract.methods.getHospitalPharmacy(this.state.currentAccount).call();
        console.log('HospitalPharmacy:', hospitalpharmacy);
        if (hospitalpharmacy.account.toLowerCase() === this.state.currentAccount.toLowerCase()) {
          this.setState({ isHospitalPharmacy: true }, () => {
            console.log('Updated isHospitalPharmacy to true');
          });
        } else {
          this.setState({ isHospitalPharmacy: false });
        }
      } else {
        console.error('PharmaChain contract not deployed to detected network.');
        this.setState({ isHospitalPharmacy: false });
      }
    } catch (error) {
      if (error.message.includes("Hospital/Pharmacy does not exist")) {
        this.setState({ isHospitalPharmacy: false });
      } else {
        console.error('Error checking hospital/pharmacy status:', error);
        this.setState({ isHospitalPharmacy: false });
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('Current Account:', this.state.currentAccount);
    console.log('Is Hospital/Pharmacy:', this.state.isHospitalPharmacy);
    console.log('Previous Is Hospital/Pharmacy:', prevState.isHospitalPharmacy);
    if (this.state.isHospitalPharmacy !== prevState.isHospitalPharmacy && this.state.isHospitalPharmacy !== null) {
      if (this.state.isHospitalPharmacy === true) {
        this.props.navigate('/hospitalspharmacies/home');
      } else {
        this.props.navigate('/hospitalspharmacies/login');
      }
    }
  }

  render() {
    const { isHospitalPharmacy, loading } = this.state;

    return (
      <div className="hospitalspharmacies-container">
        {loading || isHospitalPharmacy === null ? (
          <Loader />
        ) : (
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="/home" element={<Home4 />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        )}
      </div>
    );
  }
}

export default withNavigation(HospitalsPharmacies);