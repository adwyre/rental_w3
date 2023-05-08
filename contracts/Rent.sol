// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

interface IERC721 {
    function transferFrom(
        address _from,
        address _to,
        uint256 _id
    ) external;
}

contract Rent {

  address public owner;

  struct Renter {
    address payable walletAddress;
    string firstName;
    string lastName;
    bool canRent;
    bool active;
    uint256 amountDue;
    uint256 startTime;
    uint256 endTime;
  }

  struct Rental {
    bool isCheckedOut;
    uint256 price;
    Renter renter;
  }

  // renters mapping with renter wallet address as key
  mapping (address => Renter) public renters;

  // rentals mapping with book nftId as key
  mapping (uint256 => Rental) public rentals;

  constructor() {
    owner = msg.sender;

  }

  // Add renter
  function addRenter(
    address payable _walletAddress,
    string memory _firstName,
    string memory _lastName,
    bool _canRent,
    bool _active,
    uint256 _amountDue,
    uint256 _startTime,
    uint256 _endTime) public {
      renters[_walletAddress] = Renter(_walletAddress, _firstName, _lastName, _canRent, _active, _amountDue, _startTime, _endTime);
    }
  // Check-out book
  function checkOut(address _walletAddress) public {
    // set renter to active, add start time, and make unable to rent anything else
    renters[_walletAddress].active = true;
    renters[_walletAddress].startTime = block.timestamp;
    renters[_walletAddress].canRent = false;
    //rentals[_nftAddress] = Rental(true, 1, _walletAddress);
  }
  // Check-in book
  function checkIn(
      address _walletAddress
    ) public {
      // set renter to active, add start time, and make unable to rent anything else
      renters[_walletAddress].active = false;
      renters[_walletAddress].endTime = block.timestamp;
      // set amount due
      setDue(_walletAddress);
    }
  // Get total duration of book use
  function getTotalTime(address _walletAddress) public view returns(uint){
    uint total = renters[_walletAddress].endTime - renters[_walletAddress].startTime;
    uint totalHours = total/60/60;
    return  totalHours;
  }

  // Get Balance
  function getBalance() public view returns(uint){
    return address(this).balance;
  }
  // Set Due amount
  function setDue(address _walletAddress) internal {
    uint totalHours = getTotalTime(_walletAddress);
    renters[_walletAddress].amountDue = totalHours * 500000000000000;
  }
  // Check if able to rent
  function canRentBook(address _walletAddress) public view returns(bool){
    return renters[_walletAddress].canRent;
  }
}