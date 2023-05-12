
import { ethers } from 'ethers';
import React, { useState, useEffect } from 'react';


const Navbar = ({ account, setAccount, rent }) => {
  
  const [total, setTotal] = useState(0)

  const fetchTotal = async () => {
    const balance = await rent.Renters[account].balance
    const amountDue = await rent.Renters[account].amountDue
    setTotal(balance - amountDue)
  }

  const connectHandler = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = ethers.utils.getAddress(accounts[0])
    setAccount(account);
  }

  useEffect(() => {
    fetchTotal()
    console.log(total)
  }, [])

  return (
    <nav className="nav-bar">
      <div className='nav-container'>
        <ul>
            <li>
              <a href="#">Car Rentals</a>
            </li>
        </ul>
        {account ? (
          <div>
            <span></span>
            <button type="button" className='nav-connect button primary'>
            {account.slice(0, 6) + '...' + account.slice(38, 42)}
            </button>
          </div>
        ):(
          <button type="button" className='nav-connect button primary' onClick={connectHandler}>
          Connect
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;