// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract NFTContract is ERC721Enumerable, Ownable, ReentrancyGuard {
    uint256 public mintPrice;
    bool public isFreeMint;
    uint256 public whitelistLimit;
    uint256 public totalSupply;
    mapping(address => bool) public whitelist;
    mapping(address => uint256) public minted;

    constructor(string memory name, string memory symbol, uint256 price, bool freeMint, uint256 limit, address creator) ERC721(name, symbol) {
        mintPrice = price;
        isFreeMint = freeMint;
        whitelistLimit = limit;
        transferOwnership(creator);
    }

    function mint(uint256 quantity) public payable nonReentrant {
        require(totalSupply + quantity <= 10000, "Max supply reached");
        if (isFreeMint) {
            require(minted[msg.sender] + quantity <= whitelistLimit, "Minting limit exceeded");
        } else {
            require(msg.value >= mintPrice * quantity, "Insufficient funds");
        }

        for (uint256 i = 0; i < quantity; i++) {
            uint256 tokenId = totalSupply + 1;
            _safeMint(msg.sender, tokenId);
            totalSupply++;
        }

        if (isFreeMint) {
            minted[msg.sender] += quantity;
        }
    }

    function addToWhitelist(address[] calldata addresses) public onlyOwner {
        for (uint256 i = 0; i < addresses.length; i++) {
            whitelist[addresses[i]] = true;
        }
    }

    function removeFromWhitelist(address[] calldata addresses) public onlyOwner {
        for (uint256 i = 0; i < addresses.length; i++) {
            whitelist[addresses[i]] = false;
        }
    }

    function setMintPrice(uint256 price) public onlyOwner {
        mintPrice = price;
    }

    function setWhitelistLimit(uint256 limit) public onlyOwner {
        whitelistLimit = limit;
    }

    function withdraw() public onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}
