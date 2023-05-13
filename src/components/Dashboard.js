import { ethers } from 'ethers';
import { useEffect, useState } from 'react';

const Dashboard = ({renter, provider, rent, updated}) => {

  const [netBalance, setNetBalance] = useState()

  const fetchNetBalance = async () => {
    const netData = await rent.getNetBalance();
    setNetBalance(ethers.utils.formatEther(parseInt(netData._hex).toString()))
  }

  useEffect(() => {
    fetchNetBalance();
  }, [updated])


  const handleDeposit = () => {
    document.getElementById("deposit").classList.add("show-modal")
  }
  const handleDepositClose = () => {
    document.getElementById("deposit").classList.remove("show-modal")
  }

  const handleDepositSave = async () => {
    const depositAmount = document.getElementById("depositAmount").value

    const signer = await provider.getSigner()
    // make deposit
    let transaction = await rent.connect(signer).deposit({ value: depositAmount})
    await transaction.wait()

  }

  return (
    <div className="dashboard">
      <span>Hello, {renter.firstName}. Welcome to your dashboard.</span>
      <span className="info">Account Balance: {netBalance}</span>
      <span className="info">Rental Status: {renter.active ? "Active" : "Inactive"}</span>
      <button className="button secondary" onClick={handleDeposit}>Deposit</button>
      <button className="button secondary" onClick="">Pay</button>

      <div className="modal" id="deposit">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Make a deposit</h5>
            </div>
            <div className="modal-body">
                <label for="depositAmount">Amount</label>
                <input type="number" id="depositAmount" className="form-field"/>
            </div>
            <div className="modal-footer">
              <button type="button" className="button primary" onClick={handleDepositSave}>Save</button>
              <button type="button" className="button secondary" onClick={handleDepositClose}>Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;