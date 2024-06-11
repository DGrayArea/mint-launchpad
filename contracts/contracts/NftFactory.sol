// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./NftBase.sol";

contract NFTFactory {
    address[] public nftContracts;

    event NFTContractCreated(address nftContractAddress);

    function createNFTContract(string memory name, string memory symbol, uint256 price, bool isFreeMint, uint256 whitelistLimit) public {
        NFTContract newNFTContract = new NFTContract(name, symbol, price, isFreeMint, whitelistLimit, msg.sender);
        nftContracts.push(address(newNFTContract));
        emit NFTContractCreated(address(newNFTContract));
    }

    function getNFTContracts() public view returns (address[] memory) {
        return nftContracts;
    }
}
