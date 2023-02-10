// require("@nomicfoundation/hardhat-toolbox");

// /** @type import('hardhat/config').HardhatUserConfig */
// module.exports = {
//   solidity: "0.8.17",
// };

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require("dotenv").config()
require("@nomiclabs/hardhat-ethers")
require("@nomicfoundation/hardhat-toolbox")

const { ALCHEMY_KEY, ACCOUNT_PRIVATE_KEY } = process.env

module.exports = {
  solidity: "0.8.17",
  defaultNetwork: "hardhat",
  settings: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  },
  networks: {
    hardhat: {},
    matic: {
      url: "https://polygon-mumbai.g.alchemy.com/v2/LiGXrk7o-hoVB-RupB65dJHMTlT7NY9U",
      accounts: [process.env.ACCOUNT_PRIVATE_KEY]
    }
  }
}
