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
            const result = await rent.renter()
            expect(result).to.be.equal(renter.address)
        })
        it('Returns bookstore', async () => {
            const result = await rent.bookstore()
            expect(result).to.be.equal(bookstore.address)
        })
    })

    // Check-out book
    describe('Check-out', () => {
        it('Updates checkout status to true', async () => {
            const transaction = await rent.connect(renter).checkOut(1)
            await transaction.wait()
            const result = await rent.isCheckedOut(1)
            expect(result).to.be.equal(true)
        })
    })

    // Check-in book
    describe('Check-in', () => {
        beforeEach(async () => {
            const transaction = await rent.connect(renter).checkIn(1)
            await transaction.wait()
        })
        it('Updates checkout status to false', async () => {
            const result = await rent.isCheckedOut(1)
            expect(result).to.be.equal(false)
        })
        it('Sets duration of rental', async () => {
            const result = await rent.duration(1)
            expect(result).to.be.greaterThan(0)
        })
        it('Sets amount due', async () => {
            const result = await rent.amountDue(1)
            expect(result).to.be.greaterThan(0)
        })
    })

    
})
