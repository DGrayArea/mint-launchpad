require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      { version: "0.8.24" },
      { version: "0.8.21", settings: {} },
      { version: "0.8.17", settings: {} },
      { version: "0.8.9", settings: {} },
      { version: "0.8.7", settings: {} },
      { version: "0.8.0", settings: {} },
      { version: "0.7.5", settings: {} },
      { version: "0.7.0", settings: {} },
    ],
  },
  defaultNetwork: "mint-local",
  networks: {
    // for mainnets
    "mint-mainnet": {
      url: "https://rpc.mintchain.io",
      accounts: [process.env.PRIVATE_KEY],
      gasPrice: 1000000000,
    },
    // for Sepolia testnet
    "mint-sepolia": {
      url: "https://sepolia-testnet-rpc.mintchain.io",
      accounts: [process.env.PRIVATE_KEY],
      gasPrice: 1000000000,
    },
    // for local dev environment
    "mint-local": {
      url: "http://localhost:8545",
      accounts: [process.env.PRIVATE_KEY],
      gasPrice: 1000000000,
    },
  },
};
