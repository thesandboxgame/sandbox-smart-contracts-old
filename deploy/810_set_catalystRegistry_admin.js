const {guard} = require("../lib");
module.exports = async ({getNamedAccounts, deployments}) => {
  const {call, sendTxAndWait, log} = deployments;

  const {catalystRegistryAdmin} = await getNamedAccounts();
  const currentAdmin = await call("CatalystRegistry", "getAdmin");
  if (currentAdmin.toLowerCase() !== catalystRegistryAdmin.toLowerCase()) {
    log("setting CatalystRegistry Admin");
    await sendTxAndWait(
      {from: currentAdmin, gas: 1000000, skipUnknownSigner: true},
      "CatalystRegistry",
      "changeAdmin",
      catalystRegistryAdmin
    );
  }
};