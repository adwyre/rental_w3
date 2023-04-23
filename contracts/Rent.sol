// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Rent {

  address public owner;
  address public nftAddress;
  address public renter;
  address public bookstore;

  constructor(address _nftAddress, address _renter, address _bookstore) {
    owner = msg.sender;

    nftAddress = _nftAddress;
    renter = _renter;
    bookstore = _bookstore;
  }

  // Add renter

  // Check-out book

  // Check-in book

  // Get total duration of book use

  // Get Contract Balance

  // Get Renter's balance

  // Set Due amount
}