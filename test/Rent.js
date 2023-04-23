const { expect } = require('chai');
const { ethers } = require('hardhat');

const tokens = (n) => {
    return ethers.utils.parseUnits(n.toString(), 'ether')
}

describe('Rent', () => {
    let renter, bookstore
    let book, rent

    beforeEach(async () => {
        // Set up accounts
        [renter, bookstore] = await ethers.getSigners()

        // Deploy Book smart contract
        const Book = await ethers.getContractFactory('Book')
        book = await Book.deploy()

        // Mint book - use bookstore account
        let transaction = await book.connect(bookstore).mint('https://images.unsplash.com/photo-1485989835538-fbc0f2f48014?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80')
        await transaction.wait()

        // Deploy Rent contract using created account addresses
        const Rent = await ethers.getContractFactory('Rent')
        rent = await Rent.deploy(
            book.address,
            renter.address,
            bookstore.address
        )

    })

    // Test Deployment
    describe('Deployment', () => {
        it('Returns NFT address', async () => {
            const result = await rent.nftAddress()
            expect(result).to.be.equal(book.address)
        })
        it('Returns renter', async () => {
       
        })
        it('Returns bookstore', async () => {
            
        })
    })

    // Check-out book

    // Check-in book

    // Get total duration of book use

    // Get Contract Balance

    // Get Renter's balance

    // Set Due amount
})
