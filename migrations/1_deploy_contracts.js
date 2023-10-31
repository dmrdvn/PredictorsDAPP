// BSC Test ağına deploy etmek için 1_deploy_contracts.js dosyasını oluşturduk
const PredictorsApp = artifacts.require("PredictorsApp"); 

module.exports = function (deployer) {
  // Hangi adres üzerinden dağtmak istiyorsak o adresi yazıyoruz
  deployer.deploy(PredictorsApp, { from: '0xBa2dB1ab7510dDfCB34f7121a685611f81428894' });
};