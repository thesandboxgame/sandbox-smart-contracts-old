const {starterPackCatalysts} = require("../data/starterPackv1");
module.exports = async ({deployments, getNamedAccounts}) => {
  const {execute} = deployments;
  const {catalystMinter} = await getNamedAccounts();

  const starterPack = await deployments.get("StarterPackV1");

  await execute(
    "Catalyst",
    {from: catalystMinter, skipUnknownSigner: true},
    "batchMint",
    starterPack.address,
    starterPackCatalysts.ids,
    starterPackCatalysts.quantities
  );
};
module.exports.skip = () => true;
