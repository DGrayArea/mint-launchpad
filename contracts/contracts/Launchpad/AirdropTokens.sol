pragma solidity ^0.8.0;

contract Example {
    function encode(address _to, uint96 _amount) external pure returns (bytes32) {
        // Convert the address to uint160
        uint160 encodedAddress = uint160(_to);

        // Combine the address and amount into a bytes32
        bytes32 encodedData = bytes32((uint256(_amount) << 160) | uint256(encodedAddress));

        return encodedData;
    }

    function decode(bytes32 encodedData) external pure returns (address, uint96) {
        // Extract the address
        address to = address(uint160(uint256(encodedData)));

        // Extract the amount
        uint96 amount = uint96(uint256(encodedData) >> 160);

        return (to, amount);
    }

    /// @param soulbound True if the NFT is a Soulbound Token (SBT). If set, it can't be transferred.
function airdropSequential(bytes32[] calldata toAndAmount, bool soulbound)
    external
    payable
    override
    onlyOwner
{
    uint256 toLength = toAndAmount.length;

    for (uint256 i = 0; i < toLength; i++) {
        address to = address(uint160(uint256(toAndAmount[i])));
        uint256 amount = uint256(toAndAmount[i] >> 160);
        _mintSequential(to, amount, soulbound);
    }

    if (_actualSoldTokens() > _availableCollectionSize) revert CollectionSoldOut();
}
}