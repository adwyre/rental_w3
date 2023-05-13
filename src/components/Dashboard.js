import { ethers } from 'ethers';
import { useEffect, useState } from 'react';

const Dashboard = ({renter, provider, rent, netBalance, setUpdated, updated}) => {


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
    // update net balance
    setUpdated(!updated)
  }

  const handlePayment = () => {
    document.getElementById("payment").classList.add("show-modal")
  }
  const handlePaymentClose = () => {
    document.getElementById("payment").classList.remove("show-modal")
  }

  const handlePaymentSave = async () => {
    const paymentAmount = document.getElementById("paymentAmount").value

    const signer = await provider.getSigner()
    // make payment
    let transaction = await rent.connect(signer).payDue({ value: paymentAmount})
    await transaction.wait()
    // update net balance
    setUpdated(!updated)
  }

  return (
    <div className="dashboard">
      <span>Hello, {renter.firstName}. Welcome to your dashboard.</span>
      <span className="info">Account Balance: {netBalance}</span>
      <span className="info">Rental Status: {renter.active ? "Active" : "Inactive"}</span>
      <button className="button secondary" onClick={handleDeposit}>Deposit</button>
      <button className="button secondary" onClick={handlePayment}>Pay</button>

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

      <div className="modal" id="payment">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Make a payment</h5>
            </div>
            <div className="modal-body">
                <label for="paymentAmount">Amount</label>
                <input type="number" id="paymentAmount" className="form-field"/>
            </div>
            <div className="modal-footer">
              <button type="button" className="button primary" onClick={handlePaymentSave}>Save</button>
              <button type="button" className="button secondary" onClick={handlePaymentClose}>Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;