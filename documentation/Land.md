Land, an ERC-721 token
============================

See: [src/Land.sol](../src/Land.sol)

Land is a smart contract that implements the [EIP-721](https://eips.ethereum.org/EIPS/eip-721) standard (for non fungible, unique tokens).

Each token represents a Land on our map, which is a grid of 408 x 408 lands.

The base of the contract is an implementation of the ERC-721 standard (see [ERC721BaseToken.sol](../src/Land/erc721/ERC721BaseToken.sol)) with some additional features, including batch transfers and meta-transactions.

On top of that, the [LandBaseToken.sol](../src/Land/erc721/LandBaseToken.sol) contract adds new features directly related to our lands. A "quad tree" algorithm has been used, allowing batch transfers of "quad" lands (1x1, 3x3, 6x6, 12x12 and 24x24). Transferring quad lands directly is cheaper than transferring lands individually (or in batchs).

Also, please note that quad transfers only work if all the lands of the quad are owned by the same user. If one land of a quad land is transferred to another user, the quad land won't be valid anymore and the "classic" transfer functions will have to be used. On the other hand, lands can be grouped again later in order to form new quad lands.
