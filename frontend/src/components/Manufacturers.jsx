import React, { Component } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Web3 from 'web3';
import PharmaChain from '../truffle_abis/PharmaChain.json';
import Login from './Login1';
import Register from './Register1';
import DashBoard from './DashBoard1';
import Home1 from './Home1';
import withNavigation from './withNavigation'; // Import the HOC
import Loader from './Loader';

class Manufacturers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      web3: null,
      currentAccount: '',
      isManufacturer: null,
      loading: true,
    };
  }

  async componentDidMount() {
    await this.loadWeb3();
    if (this.state.web3 && this.state.currentAccount) {
      await this.checkManufacturerStatus();
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

  async checkManufacturerStatus() {
    try {
      const networkId = await this.state.web3.eth.net.getId();
      const networkData = PharmaChain.networks[networkId];
      if (networkData) {
        const contract = new this.state.web3.eth.Contract(PharmaChain.abi, networkData.address);
        console.log('Current Account:', this.state.currentAccount);
        const manufacturer = await contract.methods.getManufacturer(this.state.currentAccount).call();
        console.log('Manufacturer:', manufacturer);
        if (manufacturer.account.toLowerCase() === this.state.currentAccount.toLowerCase()) {
          this.setState({ isManufacturer: true }, () => {
            console.log('Updated isManufacturer to true');
          });
        } else {
          this.setState({ isManufacturer: false });
        }
      } else {
        console.error('PharmaChain contract not deployed to detected network.');
        this.setState({ isManufacturer: false });
      }
    } catch (error) {
      if (error.message.includes("Manufacturer does not exist")) {
        this.setState({ isManufacturer: false });
      } else {
        console.error('Error checking manufacturer status:', error);
        this.setState({ isManufacturer: false });
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('Current Account:', this.state.currentAccount);
    console.log('Is Manufacturer:', this.state.isManufacturer);
    console.log('Previous Is Manufacturer:', prevState.isManufacturer);
    if (this.state.isManufacturer !== prevState.isManufacturer && this.state.isManufacturer !== null) {
      if (this.state.isManufacturer === true) {
        this.props.navigate('/manufacturers/home');
      } else {
        this.props.navigate('/manufacturers/login');
      }
    }
  }

  render() {
    const { isManufacturer, loading } = this.state;

    return (
      <div className="manufacturers-container">
        {loading || isManufacturer === null ? (
          <Loader />
        ) : (
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="/home" element={<Home1 />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        )}
      </div>
    );
  }
}

export default withNavigation(Manufacturers);
