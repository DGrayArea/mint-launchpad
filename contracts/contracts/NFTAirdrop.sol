// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTAirdrop is Ownable {
    event NFTDeposited(address indexed sender, address indexed nftContract, uint256 tokenId);
    event NFTWithdrawn(address indexed recipient, address indexed nftContract, uint256 tokenId);
    event NFTAirdropped(address[] indexed recipient, address indexed nftContract, uint256[] tokenId);
    event TokensAirdropped(address[] indexed recipient, address indexed tokenContract, uint256[] amounts);
    event EtherWithdrawn(address indexed recipient, uint256 amount);
    event ERC20Withdrawn(address indexed recipient, address indexed tokenContract, uint256 amount);

    uint256 public fee = 0.01 ether;

    // Receive function to accept Ether deposits
    receive() external payable {}

    // Fallback function to accept Ether
    fallback() external payable {}

    function airdropNFTS(
        address nftContractAddress,
        address from,
        address[] calldata recipients,
        uint256[] calldata tokenIds
    ) external {
        require(recipients.length == tokenIds.length, "Recipients and tokenIds length mismatch");

        IERC721 nftContract = IERC721(nftContractAddress);
        
        for (uint256 i = 0; i < recipients.length; i++) {
            require(nftContract.ownerOf(tokenIds[i]) == from, "Sender does not own the token");
            nftContract.safeTransferFrom(from, recipients[i], tokenIds[i]);
           
        }
         emit NFTAirdropped(recipient, nftContractAddress, tokenIds);
    }

        function airdropTokens(
        address erc20TokenAddress,
        address from,
        address[] calldata recipients,
        uint256[] calldata amounts
    ) external {
        require(recipients.length == amounts.length, "Recipients and amount length mismatch");

        IERC20 tokenContract = IERC721(erc20TokenAddress);
        
        for (uint256 i = 0; i < recipients.length; i++) {
            tokenContract.transferFrom(from, recipients[i], amounts[i]);
        }
         emit TokensAirdropped(recipients, erc20TokenAddress, amounts);
    }


    function withdrawNFTs(address nftContractAddress, uint256[] calldata tokenIds) external onlyOwner {
        IERC721 nftContract = IERC721(nftContractAddress);

        for (uint256 i = 0; i < tokenIds.length; i++) {
            require(nftContract.ownerOf(tokenIds[i]) == address(this), "Contract does not own the token");
            nftContract.safeTransferFrom(address(this), msg.sender, tokenIds[i]);
            emit NFTWithdrawn(msg.sender, nftContractAddress, tokenIds[i]);
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
