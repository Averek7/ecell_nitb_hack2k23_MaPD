

async function main() {
  const Products = await ethers.getContractFactory("Products");

  // Start deployment, returning a promise that resolves to a contract object
  const products = await Products.deploy();   
  console.log("Contract deployed to address:", products.address);
}

main()
 .then(() => process.exit(0))
 .catch(error => {
   console.error(error);
   process.exit(1);
 });