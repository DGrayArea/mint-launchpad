// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTAirdrop is Ownable {
    event NFTAirdropped(address[] indexed recipients, address indexed nftContract, uint256[][] tokenIds);
    event TokensAirdropped(address[] indexed recipients, address indexed tokenContract, uint256[] amounts);
    event EtherWithdrawn(address indexed recipient, uint256 amount);
    event ERC20Withdrawn(address indexed recipient, address indexed tokenContract, uint256 amount);


    receive() external payable {}
    fallback() external payable {}

    constructor() Ownable(msg.sender) {}

    function airdropNFTs(
        address nftContractAddress,
        address[] calldata recipients,
        uint256[][] calldata tokenIds // 2D array to hold token IDs for each recipient
    ) external onlyOwner {
        require(recipients.length == tokenIds.length, "Recipients and tokenIds length mismatch");

        IERC721 nftContract = IERC721(nftContractAddress);

        for (uint256 i = 0; i < recipients.length; ++i) {
            for (uint256 j = 0; j < tokenIds[i].length; ++j) {
                require(nftContract.ownerOf(tokenIds[i][j]) == msg.sender, "Sender does not own the token");
                nftContract.safeTransferFrom(msg.sender, recipients[i], tokenIds[i][j]);

            }
        }
             emit NFTAirdropped(recipients, nftContractAddress, tokenIds);
    }

	 function withdrawNFTs(address nftContractAddress, uint256[] calldata tokenIds) external onlyOwner {
        IERC721 nftContract = IERC721(nftContractAddress);

        for (uint256 i = 0; i < tokenIds.length; ++i) {
            require(nftContract.ownerOf(tokenIds[i]) == address(this), "Contract does not own the token");
            nftContract.safeTransferFrom(address(this), msg.sender, tokenIds[i]);
        }
    }


    function withdrawEther() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No Ether to withdraw");
        payable(owner()).transfer(balance);
        emit EtherWithdrawn(owner(), balance);
    }

    function withdrawERC20(address tokenContractAddress) external onlyOwner {
        IERC20 tokenContract = IERC20(tokenContractAddress);
        uint256 balance = tokenContract.balanceOf(address(this));
        require(balance > 0, "No ERC20 tokens to withdraw");
        tokenContract.transfer(owner(), balance);
        emit ERC20Withdrawn(owner(), tokenContractAddress, balance);
    }
}
