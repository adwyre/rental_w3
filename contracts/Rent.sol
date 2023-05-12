// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Rent {

  address payable public owner;

  struct Renter {
    string firstName;
    string lastName;
    bool canRent;
    bool active;
    uint256 balance;
    uint256 amountDue;
    uint256 startTime;
    uint256 endTime;
  }

  // renters mapping with renter wallet address as key
  mapping (address => Renter) public renters;
  // available cars by id 
  mapping (uint => bool) public carAvailable;


  constructor() {
    owner = payable(msg.sender);

  }

  // Able to rent
  modifier canRentCar{
    require (renters[msg.sender].canRent == true, "Must not have a current rental or outstanding balance");
    _;
  }
  // check if active renter
  modifier isActive{
    require (renters[msg.sender].active == true, "Must have a car checked out");
    _;
  }

  // Add renter
  function addRenter(
    string memory _firstName,
    string memory _lastName,
    bool _canRent,
    bool _active,
    uint256 _balance,
    uint256 _amountDue,
    uint256 _startTime,
    uint256 _endTime) public {
      renters[msg.sender] = Renter(_firstName, _lastName, _canRent, _active, _balance, _amountDue, _startTime, _endTime);
    }
  // Check-out car
  function checkOut() public canRentCar{
    // set renter to active, add start time, and make unable to rent anything else
    renters[msg.sender].active = true;
    renters[msg.sender].startTime = block.timestamp;
    renters[msg.sender].canRent = false;
  }
  // Check-in car
  function checkIn() public isActive{
      // set renter to active, add start time, and make unable to rent anything else
      renters[msg.sender].active = false;
      renters[msg.sender].endTime = block.timestamp;
      // set amount due
      //setDue();
      renters[msg.sender].amountDue = 190000000000000;
    }

  // Make deposit
  function deposit() public payable{
    renters[msg.sender].balance += msg.value;
  }

  // Pay balance due
  function payDue() public payable{
    require(msg.value == renters[msg.sender].amountDue, "Value must equal amount due");
    require(msg.value <= renters[msg.sender].balance, "Balance is too low. Please make a deposit.");
    renters[msg.sender].balance -= msg.value;
    renters[msg.sender].amountDue = 0;
    renters[msg.sender].canRent = true;
  }


  // Get total duration of car use
  function getTotalTime() public view returns(uint){
    uint total = renters[msg.sender].endTime - renters[msg.sender].startTime;
    uint totalMinutes = total/60;
    return  totalMinutes;
  }
  // Set Due amount
  function setDue() internal {
    uint totalMinutes = getTotalTime();
    renters[msg.sender].amountDue = totalMinutes * 190000000000000;
  }
  // returns balance - amount due
  function getNetBalance() public view returns(uint) {
    uint currBalance = renters[msg.sender].balance;
    uint currDue = renters[msg.sender].amountDue;
    return currBalance - currDue;
  }
  // Get Balance
  function getBalance() public view returns(uint){
    return address(this).balance;
  }
  

}