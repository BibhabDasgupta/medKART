import React, { Component } from 'react';
import Web3 from 'web3';
import axios from 'axios';
import PharmaChain from '../truffle_abis/PharmaChain.json';
import './RegisterManufacturer.css';

class RegisterManufacturer extends Component {
  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  async loadBlockchainData() {
    try {
      const web3 = window.web3;
      if (!web3) {
        console.error('Web3 instance not found');
        this.setState({ errorMessage: 'Web3 instance not found' });
        return;
      }

      const accounts = await web3.eth.getAccounts();
      if (!accounts.length) {
        console.error('No accounts found');
        this.setState({ errorMessage: 'No accounts found' });
        return;
      }
      const currentAccount = accounts[0];
      console.log('Current Account:', currentAccount);
      this.setState({ account: currentAccount });

      const networkId = await web3.eth.net.getId();
      console.log('Network ID:', networkId);

      const networkData = PharmaChain.networks[networkId];
      if (networkData) {
        const contract = new web3.eth.Contract(PharmaChain.abi, networkData.address);
        console.log('Contract Address:', networkData.address);
        this.setState({ contract, web3 });

        const owner = await contract.methods.owner().call();
        console.log('Owner Address:', owner);
        this.setState({ owner });
        if (currentAccount !== owner) {
          console.error('You are not authorized to register manufacturers.');
          this.setState({ errorMessage: 'You are not authorized to register manufacturers.' });
        }
      } else {
        console.error('PharmaChain contract not deployed to detected network.');
        this.setState({ errorMessage: 'PharmaChain contract not deployed to detected network.' });
      }
    } catch (error) {
      console.error('Error loading blockchain data:', error);
      this.setState({ errorMessage: 'Failed to load blockchain data.' });
    }
  }

  async loadWeb3() {
    try {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        console.log('Ethereum enabled');
      } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
        console.log('Web3 current provider enabled');
      } else {
        console.error('Non-Ethereum browser detected. You should consider trying MetaMask!');
        this.setState({ errorMessage: 'Non-Ethereum browser detected. You should consider trying MetaMask!' });
      }
    } catch (error) {
      console.error('Error loading Web3:', error);
      this.setState({ errorMessage: 'Failed to load Web3 instance.' });
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { contract, account, username, accountNumber, owner } = this.state;

      if (!contract) {
        console.error('Contract instance not initialized');
        this.setState({ errorMessage: 'Blockchain contract instance not initialized.' });
        return;
      }

      if (account !== owner) {
        this.setState({ errorMessage: 'You are not authorized to register manufacturers.' });
        return;
      }

      // Register manufacturer on blockchain
      await contract.methods.registerManufacturer(username, accountNumber).send({ from: account })
        .on('transactionHash', (hash) => {
          console.log('Transaction Hash:', hash);
        })
        .on('confirmation', (confirmationNumber, receipt) => {
          console.log('Confirmation Number:', confirmationNumber);
        })
        .on('receipt', (receipt) => {
          console.log('Receipt:', receipt);
          this.setState({ successMessage: `Manufacturer ${username} registered with account number ${accountNumber}` });
          this.setState({ username: '', accountNumber: '' });
        })
        .on('error', (error, receipt) => {
          console.error('Error:', error);
          this.setState({ errorMessage: 'Failed to register manufacturer. Please try again.' });
        });

      // Call acceptPendingStakeholder API
      await axios.post('http://localhost:5000/api/pendingStakeholders/accept', { username })
        .then(response => {
          console.log('Stakeholder accepted:', response.data);
          this.setState({ successMessage: `Stakeholder ${username} accepted successfully.` });
        })
        .catch(error => {
          console.error('Error accepting stakeholder:', error);
          this.setState({ errorMessage: 'Failed to accept stakeholder. Please try again.' });
        });

    } catch (error) {
      console.error('Error registering manufacturer:', error);
      this.setState({ errorMessage: 'Failed to register manufacturer. Please try again.' });
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      account: '',
      contract: null,
      owner: '',
      username: '',
      accountNumber: '',
      successMessage: '',
      errorMessage: ''
    };
  }

  render() {
    return (
      <div className="register-container">
        <h2>Register Manufacturer</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Username:</label>
            <input
              type="text"
              value={this.state.username}
              onChange={(e) => this.setState({ username: e.target.value })}
              required
            />
          </div>
          <div>
            <label>Account Number:</label>
            <input
              type="text"
              value={this.state.accountNumber}
              onChange={(e) => this.setState({ accountNumber: e.target.value })}
              required
            />
          </div>
          <button type="submit">Register</button>
        </form>
        {this.state.successMessage && <p>{this.state.successMessage}</p>}
        {this.state.errorMessage && <p>{this.state.errorMessage}</p>}
      </div>
    );
  }
}

export default RegisterManufacturer;




