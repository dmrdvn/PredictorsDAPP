const PredictorsApp = artifacts.require("PredictorsApp");

module.exports = function(deployer) {
//  deployer.link(PredictorsApp);
  deployer.deploy(PredictorsApp);
};