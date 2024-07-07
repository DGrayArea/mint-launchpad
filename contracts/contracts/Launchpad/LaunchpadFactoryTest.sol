// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "./NFTCollection.sol";
import "./DataTypes.sol";

contract LaunchpadFactory is Ownable2Step {


    event PlatformFeeUpdated(uint256 newFee, uint256 newCost);
    event FeeCollectorUpdated(address newCollector);
    event BaseFeeUpdated(uint256 baseFee);
    event CollectionCreated(address collcection, NFTData collectionData);

    address private feeAddress;
    address[] public collectionAddresses;

    uint256 private feeAmount = 66;
    uint256 private costAmount = 20;
    uint256 public collectionCount;
    uint256 public baseFee = 0.00078 ether;


    mapping (address => NFTData) public collections;

    constructor(address _initialCollector) Ownable(msg.sender) {
        feeAddress = _initialCollector;
    }


    function createCollection(
        MetadataParams memory _metadata,
        SaleParams memory _saleParams,
        NFTData memory _nftData,
        bool _isFreeMint,
        uint256 _maxSupply,
        address _creator
    ) external onlyOwner returns (address) {

        uint256 _platformFee;

        if(_isFreeMint){
             _platformFee = feeAmount;
         } else {
            _platformFee = costAmount;
        }

        NFTCollection newCollection = new NFTCollection(
            _metadata,
            _saleParams,
            _maxSupply,
            _platformFee,
            feeAddress,
            baseFee,
            _creator
        );
        address collectionAddress = address(newCollection);
        NFTData memory collection = NFTData(collectionAddress, _nftData.website, _nftData.x, _nftData.telegram, _nftData.discord, _nftData.logoUri, _nftData.backgroundUri);
        collections[collectionAddress] = collection;
        collectionAddresses.push(collectionAddress);
        collectionCount++;
        emit CollectionCreated(address(newCollection), collection);
        return collectionAddress;
    }

    function updateCollection(address _collectionAddress, string memory _website, string memory _x, string memory _telegram, string memory _discord, string memory _logo, string memory _background) external onlyOwner {
        collections[_collectionAddress].website = _website;
        collections[_collectionAddress].x = _x;
        collections[_collectionAddress].telegram = _telegram;
        collections[_collectionAddress].discord = _discord;
        collections[_collectionAddress].logoUri = _logo;
        collections[_collectionAddress].backgroundUri = _background;
    }

    function getCollection(address _collectionContract) public view returns(NFTData memory) {
        return collections[_collectionContract];
    }

    function getAllCollections() public view returns(NFTData[] memory) {
        uint256 length = collectionAddresses.length;
        NFTData[] memory values = new NFTData[](length);

        for (uint256 i = 0; i < length; i++) {
            values[i] = collections[collectionAddresses[i]];
        }

        return (values);
    }

    function getPlatformFee() external view returns (uint256[2] memory) {
        return [feeAmount, costAmount];
    }

    // Function to get the current fee collector address
    function getFeeCollector() external view returns (address) {
        return feeAddress;
    }

    // Function to update the platform fee
    function updatePlatformFee(uint256 _newFeeAmount, uint256 _newCostAmount) external onlyOwner {
        feeAmount = _newFeeAmount;
        costAmount = _newCostAmount;
        emit PlatformFeeUpdated(_newFeeAmount, _newCostAmount);
    }

    function updateBaseFee(uint256 _baseFee) external onlyOwner {
        baseFee = _baseFee;
        emit BaseFeeUpdated(_baseFee);
    }

    // Function to update the fee collector address
    function updateFeeCollector(address newCollector) external onlyOwner {
        feeAddress = newCollector;
        emit FeeCollectorUpdated(newCollector);
    }

    // Function to collect fees
    function collectFees() external onlyOwner {
        uint256 amount = address(this).balance;
        require(amount > 0, "No Ether to withdraw");
        payable(feeAddress).transfer(amount);
    }

    receive() external payable {}
    
    fallback() external payable {}
}
