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
        rent = await Rent.connect(renter).deploy()
        
    })

    // Test Deployment
    describe('Deployment', () => {
        it('Returns contract address', async () => {
            const result = await rent.address
            expect(result).not.to.be.equal(undefined)
        })
        it('Returns Owner', async () => {
            const result = await rent.owner()
            expect(result).to.be.equal(renter.address)
        })
    })
    // Test Add Renter Function
    describe('Add Renter', () => {
        it('Returns renter', async () => {
            console.log(renter.address)
            // Add renter
            transaction = await rent.addRenter(renter.address, "Joe", "Smith", true, false, 0, 0, 0)
            await transaction.wait()
            // Check renter
            console.log(renter.address)
            const result = rent.renters[renter.address]
            expect(result).not.to.be.equal(undefined)
        })
    })


    // Check-out book
    describe('Check-out', () => {
        beforeEach(async () => {
            rent.connect(renter).checkOut(renter.address)
        })
         it('Updates can rent status to false', async () => {
            const result = await rent.renters[renter.address].canRent
            expect(result).to.be.equal(false)
        })
        it('Updates active renter status to true', async () => {
            const result = await rent.renters[renter.address].active
            expect(result).to.be.equal(true)
        })
        it('Sets Start Time', async () => {
            const result = await rent.renters[renter.address].startTime
            expect(result).to.be.greaterThan(0)
        })
    })

    // Check-in book
    describe('Check-in', () => {
        beforeEach(async () => {
            const transaction = await rent.connect(renter.address).checkIn(1)
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
