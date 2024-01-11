const { expect } = require('chai');
const { ethers } = require('hardhat');

const tokens = (n) => {
    return ethers.utils.parseUnits(n.toString(), 'ether')
}

describe('Transaction', () => {
    it('saves the addresses', async () => {
        const MoneyCert = await ethers.getContractFactory('MoneyCert')
        moneyC = await MoneyCert.deploy()
        moneyC1 = await MoneyCert.deploy()

        console.log(moneyC.address)
        console.log(moneyC1.address)
    })
})

