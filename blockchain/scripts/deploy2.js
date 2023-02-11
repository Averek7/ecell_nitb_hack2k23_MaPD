// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat")
// const saveFiles = require("./helper");
// const LenderBorrowerAddress= require("../contractsData/LenderBorrower-address.json").address;
async function main() {
  const MAPD = await hre.ethers.getContractFactory("mapd")
  const mapd = await MAPD.deploy()

  await mapd.deployed()

  //   await zappnft.transferOwnership("0x94e99f2247f855841e73a82c0562f2bfd760c1fe");
  //   saveFiles(zappnft,"ZD");
  console.log(`NFT Contract deploted to ${mapd.address}`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
