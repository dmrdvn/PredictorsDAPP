# Predictors dAPP Platform on Binance Smart Chain Testnet!

## Overview
The Predictors dApp application is still under development.
All details will be available here very soon.

## Prerequisites
- Node.js
  - 10.x or later
- NPM version 
  - 5.2 or later
- Truffle Version
  - Truffle v5.8.1 (core: 5.8.1)
  - Solidity v0.8.7 (solc-js)
- Ganache-cli --version Ganache-cli v7.7.7

## Setup
```
# Clone the repository
$ https://github.com/dmrdvn/PredictorsDAPP.git
# Install ganache and truffle
$ npm install -g ganache-cli
# Install node modules
$ npm install
# Open a new terminal, run below command to test compile smart contract on Binance Smart Chain Testnet
$ npm run compile --network bsctest
# Run tests on Binance Smart Chain Testnet
$ npm run test --network bsctest
# To deploy on Binance Smart Chain Testnet
$ npm migrate --network bsctest
# To run the frontend cd into directory
$ cd frontend
# Install dependencies
$ npm install
# Run the server
$ npm run start
```

## Scripts for Binance Smart Chain Testnet
```
$ npm run compile bsctest
$ npm run test bsctest
$ npm run migrate bsctest
```

## Structure
```
.
│
├── contracts/
│   └─ PredictorsApp.sol
│   
├── frontend/
│   ├── node_modules
│   ├── public
│   ├── src/
│   │   ├── assets/css
│   │   │   └── tailwind.css
│   │   │
│   │   ├── components/
│   │   │   ├── button
│   │   │   │   ├── index.jsx
│   │   │   │   └── UserInput.jsx
│   │   │   ├── buyweb3
│   │   │   │   └── Modal.jsx
│   │   │   ├── connect-wallet
│   │   │   ├── header-logo
│   │   │   ├── home-tab
│   │   │   ├── left-menu
│   │   │   ├── left-sidebar-box
│   │   │   ├── post
│   │   │   ├── search
│   │   │   ├── stickyheader
│   │   │   └── topic
│   │   │   └── trendpredictions
│   │   ├── contracts
│   │   ├── data
│   │   ├── layouts
│   │   ├── pages
│   │   ├── routes
│   │   ├── store
│   │   ├── utils
│   │   ├── index.js
│   │   └── Web3Client.js
│   ├── package-lock.json
│   ├── package.json
│   └── postcss-config.js
│   └── README.md
│   └── tailwind.config.js
├── migrations/
│   └── 1_deploy_contracts.js
├── node_modules
├── test/
│   └── predictorsApp.js
├── .env
├── package-lock.json
├── package.json
├── README.md
└── truffle-config.js
```

## How it Works
Checklist
```
npm install # intall dependencies
npm run compile bsctest # compile your contract
npm run test bsctest # run tests on Binance Smart Chain Testnet
MetaMask chrome addon installed
cd frontend # cd the directory of the frontend
npm install # install the dependencies
npm run start # start the development server
```

## How To
```
1. Open a browser and go to http://localhost:3000
2. If your metamask is installed, then the website will automatically ask you to connect to Binance Smart Chain Testnet
3. Enter your name and surname to register (your chosen address from metamask will be used to register your address)
4. Experiment!
```