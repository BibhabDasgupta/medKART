import React, { Component } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Web3 from 'web3';
import PharmaChain from '../truffle_abis/PharmaChain.json';
import Login from './Login3';
import Register from './Register3';
import DashBoard from './DashBoard3';
import Home3 from './Home3';
import withNavigation from './withNavigation'; // Import the HOC
import Loader from './Loader';

class Distributors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      web3: null,
      currentAccount: '',
      isDistributor: null,
      loading: true,
    };
  }

  async componentDidMount() {
    await this.loadWeb3();
    if (this.state.web3 && this.state.currentAccount) {
      await this.checkDistributorStatus();
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

  async checkDistributorStatus() {
    try {
      const networkId = await this.state.web3.eth.net.getId();
      const networkData = PharmaChain.networks[networkId];
      if (networkData) {
        const contract = new this.state.web3.eth.Contract(PharmaChain.abi, networkData.address);
        const distributor = await contract.methods.getDistributor(this.state.currentAccount).call();
        console.log('Distributor:', distributor);
        if (distributor.account.toLowerCase() === this.state.currentAccount.toLowerCase()) {
          this.setState({ isDistributor: true }, () => {
            console.log('Updated isDistributor to true');
          });
        } else {
          this.setState({ isDistributor: false });
        }
      } else {
        console.error('PharmaChain contract not deployed to detected network.');
        this.setState({ isDistributor: false });
      }
    } catch (error) {
      if (error.message.includes("Distributor does not exist")) {
        this.setState({ isDistributor: false });
      } else {
        console.error('Error checking distributor status:', error);
        this.setState({ isDistributor: false });
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('Current Account:', this.state.currentAccount);
    console.log('Is Distributor:', this.state.isDistributor);
    console.log('Previous Is Distributor:', prevState.isDistributor);
    if (this.state.isDistributor !== prevState.isDistributor && this.state.isDistributor !== null) {
      if (this.state.isDistributor === true) {
        this.props.navigate('/distributors/home');
      } else {
        this.props.navigate('/distributors/login');
      }
    }
  }

  render() {
    const { isDistributor, loading } = this.state;

    return (
      <div className="distibutors-container">
        {loading || isDistributor === null ? (
          <p><Loader /></p>
        ) : (
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="/home" element={<Home3 />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        )}
      </div>
    );
  }
}

export default withNavigation(Distributors);
