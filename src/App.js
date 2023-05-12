import './index.css';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

// Components
import Navbar from './components/Navbar';
import Card from './components/Card';

// ABIs
import Rent from './abis/Rent.json'

// Config
import config from './config.json';


function App() {
  const [provider, setProvider] = useState(null)
  const [rent, setRent] = useState(null);
  const [account, setAccount] = useState(null)
  const [cars, setCars] = useState([
    {
        "name": "Car 1",
        "image": "https://images.unsplash.com/photo-1614200179396-2bdb77ebf81b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3432&q=80",
        "id": "1",
        "color": "Red",
        "type": "Sport"
    },
    {
        "name": "Car 2",
        "image": "https://images.unsplash.com/photo-1615063029891-497bebd4f03c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=4000&q=80",
        "id": "2",
        "color": "Grey",
        "type": "SUV"
    },
    {
        "name": "Car 3",
        "image": "https://images.unsplash.com/photo-1579827672466-075fa21e0589?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=4063&q=80",
        "id": "3",
        "color": "White",
        "type": "Truck"
    }
])


  const loadBlockchainData = async () => {
    
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
      <Navbar account={account} setAccount={setAccount}></Navbar>
      <div className="section">
        <div className="hero-container">
          <span>Explore the world in the best way. Get started with a car rental today!</span>
          <div className="cta-buttons">
            <button className="button primary">Click here</button>
            <button className="button secondary">Click here</button>
          </div>
        </div>
      </div>
      <div className='section'>
        <div className="cards-container">
        {cars.map((car, index) => (
          <Card car={car} key={index} rent={rent} account={account}></Card>
        ))}
        </div>
      </div>
    </div>
  );
}

export default App;
