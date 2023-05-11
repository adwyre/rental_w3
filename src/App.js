import './index.css';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import carMetadata from '../../metadata/carMetadata';

// Components
import Navbar from './components/Navbar';
import Card from './components/Card';

// ABIs
import Rent from './abis/Rent.json'

// Config
import config from './config.json';


function App() {
  const [rent, setRent] = useState(null);
  const [account, setAccount] = useState(null)
  const [cars, setCars] = useState([])


  const loadBlockchainData = async () => {

    setCars(carMetadata)
    
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    setProvider(provider)
    const network = await provider.getNetwork()

    const rent = new ethers.Contract(config[network.chainId].rent.address, Rent, provider)
    setRent(rent)

    


    window.ethereum.on('accountsChanged', async () => {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = ethers.utils.getAddress(accounts[0])
      setAccount(account);
    })
  }

  useEffect(() => {
    loadBlockchainData()
  }, [])

  return (
    <div className="App">
      <Navbar></Navbar>
      <div className="section">
        <div className="hero-container">
          <span>Header text goes here. Description of business and services for the rental application. Sign up or rent something today!</span>
          <div className="cta-buttons">
            <button className="button primary">Click here</button>
            <button className="button secondary">Click here</button>
          </div>
        </div>
      </div>
      <div className='section'>
        <div className="cards-container">
          <Card></Card>
          <Card></Card>
          <Card></Card>
        </div>
      </div>
    </div>
  );
}

export default App;
