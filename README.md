# Predictors dAPP Platform on Binance Smart Chain Testnet!

## Overview
PredictorsApp app is a distributed entertainment platform on Binance Smart Chain.
This dApp is deployed on the BSC network in the web3 ecosystem and targets web3 users.
Users can share their predictions for the future on this platform and place bets on their predictors based on these predictors.
To immortalize their successful predictions, they can print them as NFTs and share them with their friends.

In PredictorsApp, which aims to have high user interaction, <b>users will understand the web3 world better</b> and will have already reserved their place in this Web3 world.

The project is still in the development stage. Therefore, errors are likely to occur.
To contribute to the project, you can let me know about any errors you find or open an Issues.

Thank you for your valuable contributions.

With love ❤️

[Live Demo](https://predictors-dapp.vercel.app/)

## Updates Notes
💪 Available Version
  - Users can register on the platform and customize their profile.
  - Users can create a prediction and bet on other predictions.
  - Users can withdraw the rewards of the predictions they have won to their Metamask wallet.
  - Users can change the language and theme of the site.
    
🧑‍💻 Next Versions
  - Users can like and comment on prediction posts of other users shared in the timeline.
  - Each user can gain Predictor Badges based on the experience they gain. (Head Predictor, Novice Predictor, etc.)
  - Each predictor can create a special NFT for their winning prediction.
  - Predictors can sell the NFTs they earn/produce on the marketplace.
  - Detailed statistics of shared predictions.
  - User can interact with.
  - Users can purchase a web3 ID to benefit from all the features of the platform.
  - Users can filter and browse "Trending Predictions" available on the platform.
  - Users can share their predictions as different post types.

## Test-Case Results & Deploy
<img src="https://github.com/dmrdvn/PredictorsDAPP/blob/main/screenshots/testanddeploy.gif" width="auto">

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
