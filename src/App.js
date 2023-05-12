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

  const handleRegister = () => {
    document.getElementById("register").classList.add("show-modal")
  }

  const handleClose = () => {
    document.getElementById("register").classList.remove("show-modal")
  }

  const handleSave = async () => {
    const firstName = document.getElementById("firstName").value
    const lastName = document.getElementById("lastName").value

    const signer = await provider.getSigner()
    // add renter
    let transaction = await rent.connect(signer).addRenter(firstName, lastName, true, false, 0, 0, 0, 0)
    await transaction.wait()

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
            <button className="button primary" onClick={handleRegister}>Register as a renter</button>
          </div>
        </div>
      </div>
      <div className='section'>
        <div className="cards-container">
        {cars.map((car, index) => (
          <Card car={car} key={index} rent={rent} account={account} provider={provider}></Card>
        ))}
        </div>
      </div>
      <div className="modal" id="register">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Register as a renter</h5>
            </div>
            <div className="modal-body">
                <label for="firstName">First Name</label>
                <input type="text" id="firstName" className="form-field"/>
                <label for="lastName">Last Name</label>
                <input type="text" id="lastName" className="form-field"/>
            </div>
            <div className="modal-footer">
              <button type="button" className="button primary" onClick={handleSave}>Save</button>
              <button type="button" className="button secondary" onClick={handleClose}>Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
