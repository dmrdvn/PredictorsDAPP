const HDWalletProvider = require("@truffle/hdwallet-provider");
require("dotenv").config();
//const mnemonic = process.env["MNEMONIC"].toString().trim();
const mnemonic = "";
const bscURL = "https://data-seed-prebsc-1-s1.bnbchain.org:8545"; // BSC Testnet (bsctest) URL'si
const infuraURL =
  "https://goerli.infura.io/v3/a4fb4cc763be46399d843403359d1acf";

// require('dotenv').config();
// const mnemonic = process.env["MNEMONIC"];
// const infuraProjectId = process.env["INFURA_PROJECT_ID"];
// const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {
  /**
   * Networks define how you connect to your ethereum client and let you set the
   * defaults web3 uses to send transactions. If you don't specify one truffle
   * will spin up a development blockchain for you on port 9545 when you
   * run `develop` or `test`. You can ask a truffle command to use a specific
   * network from the command line, e.g
   *
   * $ truffle test --network <network-name>
   */
  contracts_directory: "./contracts",
  contracts_build_directory: "./frontend/src/contracts",

  networks: {
    development: {
      host: "127.0.0.1", // Localhost (default: none)
      port: 7545, // Standard Ethereum port (default: none)
      network_id: "*", // Any network (default: none)
      networkCheckTimeout: 1000000,
    },
    /*  bsctest: {
      provider: function () {
        return new HDWalletProvider(mnemonic, infuraURL);
      },
      network_id: "97",
    },  */
    bsctest: {
      provider: () => new HDWalletProvider(mnemonic, bscURL),
      network_id: 97,
      confirmations: 3,
      timeoutBlocks: 200,
      skipDryRun: true,

      gasPrice: 10000000000,
    },

    goerli: {
      provider: () => {
        return new HDWalletProvider(mnemonic, infuraURL);
      },
      network_id: "5", // eslint-disable-line camelcase
      gas: 4465030,
      gasPrice: 10000000000,
    },
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.13",
    },
  },
  db: {
    //enabled: true
  },
};
