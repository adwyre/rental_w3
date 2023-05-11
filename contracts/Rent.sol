// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

// interface IERC721 {
//     function transferFrom(
//         address _from,
//         address _to,
//         uint256 _id
//     ) external;
// }

contract Rent {

  address public owner;

  struct Renter {
    string firstName;
    string lastName;
    bool canRent;
    bool active;
    uint256 amountDue;
    uint256 startTime;
    uint256 endTime;
  }

  // struct Rental {
  //   bool isCheckedOut;
  //   uint256 price;
  //   Renter renter;
  // }

  // renters mapping with renter wallet address as key
  mapping (address => Renter) public renters;

  // rentals mapping with car nftId as key
  //mapping (uint256 => Rental) public rentals;

  constructor() {
    owner = msg.sender;

  }

  // Able to rent
  modifier canRentCar{
    require (renters[msg.sender].canRent == true, "Must not have a current rental or outstanding balance");
    _;
  }

  // Add renter
  function addRenter(
    string memory _firstName,
    string memory _lastName,
    bool _canRent,
    bool _active,
    uint256 _amountDue,
    uint256 _startTime,
    uint256 _endTime) public {
      renters[msg.sender] = Renter(_firstName, _lastName, _canRent, _active, _amountDue, _startTime, _endTime);
    }
  // Check-out car
  function checkOut() public canRentCar{
    // set renter to active, add start time, and make unable to rent anything else
    renters[msg.sender].active = true;
    renters[msg.sender].startTime = block.timestamp;
    renters[msg.sender].canRent = false;
    //rentals[_nftAddress] = Rental(true, 1, _walletAddress);
  }
  // Check-in car
  function checkIn() public {
      // set renter to active, add start time, and make unable to rent anything else
      renters[msg.sender].active = false;
      renters[msg.sender].endTime = block.timestamp;
      // set amount due
      setDue();
    }
  // Pay balance
  function payBalance() public payable{

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
    renters[msg.sender].amountDue = totalMinutes * 11000000000000;
  }
  // Get Balance
  function getBalance() public view returns(uint){
    return address(this).balance;
  }
  

}