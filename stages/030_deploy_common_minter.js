const Web3 = require('web3');
const rocketh = require('rocketh');
const {
    deployIfDifferent,
    getDeployedContract
} = require('rocketh-web3')(rocketh, Web3);
const {guard} = require('../lib');

module.exports = async ({namedAccounts, initialRun}) => {
    function log(...args) {
        if (initialRun) {
            console.log(...args);
        }
    }

    const {
        deployer,
        mintingFeeCollector,
    } = namedAccounts;

    const asset = getDeployedContract('Asset');
    if (!asset) {
        throw new Error('no Asset contract deployed');
    }
    const sand = getDeployedContract('Sand');
    if (!sand) {
        throw new Error('no Sand contract deployed');
    }

    const deployResult = await deployIfDifferent(['data'],
        'CommonMinter',
        {from: deployer, gas: 1000000},
        'CommonMinter',
        asset.options.address,
        sand.options.address,
        mintingFeeCollector,
    );

    if (deployResult.newlyDeployed) {
        log(' - CommonMinter deployed at : ' + deployResult.contract.options.address + ' for gas : ' + deployResult.receipt.gasUsed);
    } else {
        log('reusing CommonMinter at ' + deployResult.contract.options.address);
    }
};
module.exports.skip = guard(['1']);
