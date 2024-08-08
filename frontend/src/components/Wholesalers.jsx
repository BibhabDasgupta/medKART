import React, { Component } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Web3 from 'web3';
import PharmaChain from '../truffle_abis/PharmaChain.json';
import Login from './Login2';
import Register from './Register2';
import DashBoard from './DashBoard2';
import Home2 from './Home2';
import withNavigation from './withNavigation'; // Import the HOC
import Loader from './Loader';

class Wholesalers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      web3: null,
      currentAccount: '',
      isWholesaler: null,
      loading: true,
    };
  }

  async componentDidMount() {
    await this.loadWeb3();
    if (this.state.web3 && this.state.currentAccount) {
      await this.checkWholesalerStatus();
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

  async checkWholesalerStatus() {
    try {
      const networkId = await this.state.web3.eth.net.getId();
      const networkData = PharmaChain.networks[networkId];
      if (networkData) {
        const contract = new this.state.web3.eth.Contract(PharmaChain.abi, networkData.address);
        const wholesaler = await contract.methods.getWholesaler(this.state.currentAccount).call();
        console.log('Wholesaler:', wholesaler);
        if (wholesaler.account.toLowerCase() === this.state.currentAccount.toLowerCase()) {
          this.setState({ isWholesaler: true }, () => {
            console.log('Updated isWholesaler to true');
          });
        } else {
          this.setState({ isWholesaler: false });
        }
      } else {
        console.error('PharmaChain contract not deployed to detected network.');
        this.setState({ isWholesaler: false });
      }
    } catch (error) {
      if (error.message.includes("Wholesaler does not exist")) {
        this.setState({ isWholesaler: false });
      } else {
        console.error('Error checking wholealer status:', error);
        this.setState({ isWholesaler: false });
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('Current Account:', this.state.currentAccount);
    console.log('Is Wholesaler:', this.state.isWholesaler);
    console.log('Previous Is Wholesaler:', prevState.isWholesaler);
    if (this.state.isWholesaler !== prevState.isWholesaler && this.state.isWholesaler !== null) {
      if (this.state.isWholesaler === true) {
        this.props.navigate('/wholesalers/home');
      } else {
        this.props.navigate('/wholesalers/login');
      }
    }
  }

  render() {
    const { isWholesaler, loading } = this.state;

    return (
      <div className="wholesalerss-container">
        {loading || isWholesaler === null ? (
          <Loader />
        ) : (
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="/home" element={<Home2 />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        )}
      </div>
    );
  }
}

export default withNavigation(Wholesalers);
