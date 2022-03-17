//(11)...
const main = async () => {
  //Getting transactions from the factory.
  //After deploying transactions smart contract this pulls from there.
  const transactionFactory = await hre.ethers.getContractFactory(
    "Transactions"
  );
  const transactionContract = await transactionFactory.deploy();

  await transactionContract.deployed();

  console.log("Transaction deployed to:", transactionContract.address);
};

// code in hardhat documentation, but with added async/await function.
(async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
