/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require("dotenv").config()
require("@nomiclabs/hardhat-ethers")
require("@nomicfoundation/hardhat-toolbox")

const { ALCHEMY_KEY, ACCOUNT_PRIVATE_KEY } = process.env

module.exports = {
  solidity: "0.8.17",
  defaultNetwork: "polygon_mumbai",
  settings: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  },
  networks: {
    hardhat: {},
    polygon_mumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/${ALCHEMY_KEY}`,
      accounts: [ACCOUNT_PRIVATE_KEY]
    }
  }
}
