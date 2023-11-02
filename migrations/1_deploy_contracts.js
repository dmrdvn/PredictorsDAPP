const fs = require("fs");

const PredictorsApp = artifacts.require("PredictorsApp");

module.exports = async function (deployer) {
  await deployer.deploy(PredictorsApp);
  const instance = await PredictorsApp.deployed();
  
  let contractAddress = await instance.address;
  console.log("PredictorsApp Contract Address => ", contractAddress);

  let config = `export const contractAddress = "${contractAddress}"`;

  let data = JSON.stringify(config);

  fs.writeFileSync("config.js", JSON.parse(data));
};