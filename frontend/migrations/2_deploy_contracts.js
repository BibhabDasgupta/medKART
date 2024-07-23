
const PharmaChain = artifacts.require("PharmaChain");
const PharmaDistribution = artifacts.require("PharmaDistribution");

module.exports = function (deployer) {
  deployer.deploy(PharmaChain);
  deployer.deploy(PharmaDistribution);
};

