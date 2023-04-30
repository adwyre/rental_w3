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
  address public nftAddress;
  address public renter;
  address public bookstore;

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

  constructor(address _nftAddress, address _renter, address _bookstore) {
    owner = msg.sender;

    nftAddress = _nftAddress;
    renter = _renter;
    bookstore = _bookstore;
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
  function checkOut()
  // Check-in book

  // Get total duration of book use

  // Set Due amount
}