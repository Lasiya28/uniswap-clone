require("@nomiclabs/hardhat-waffle");

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
const PRIVATE_KEY =
  "c93c241e83ebaa7313cf2a0e6fd404fe7788fc2d695675cedb95cbd7255fac73"; //TEST ACCOUNT PRIVATE KEY!!!
module.exports = {
  solidity: "0.8.4",
  networks: {
    rinkeby: {
      url: "https://eth-rinkeby.alchemyapi.io/v2/vdA-VFSNP66JJDpoSab32AR2QMIa3euW", //HTTP link from Alchemy project "Uniswap clone"
      accounts: [PRIVATE_KEY],
    },
  },
};
