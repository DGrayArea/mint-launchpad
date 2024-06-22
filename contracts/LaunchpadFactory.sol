// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "./HorrorApeClub.sol";

contract LaunchpadFactory {
    HorrorApeClub[] public collections;

    function createCollection(
        string memory _name,
        string memory _symbol,
        string memory _initBaseURI,
        string memory _initNotRevealedUri,
        bool _publicMint,
        bool _whitelistMint,
        uint256 _whitelistLimit,
        uint256 _publicLimit,
        address _creator
    ) public {
        MintPhase memory whitelistPhase = MintPhase(_whitelistMint, 0, _whitelistLimit, 0);
        MintPhase memory fcfsPhase = MintPhase(false, 0, 0, 0);
        MintPhase memory publicPhase = MintPhase(_publicMint, 0.01 ether, _publicLimit, 0);
        
        HorrorApeClub newCollection = new HorrorApeClub(
            _name,
            _symbol,
            _initBaseURI,
            _initNotRevealedUri,
            whitelistPhase,
            fcfsPhase,
            publicPhase,
            _creator
        );
        collections.push(newCollection);
    }

    function createCollectionWithFCFS(
        string memory _name,
        string memory _symbol,
        string memory _initBaseURI,
        string memory _initNotRevealedUri,
        bool _publicMint,
        bool _whitelistMint,
        uint256 _whitelistLimit,
        uint256 _fcfsLimit,
        uint256 _publicLimit,
        address _creator
    ) public {
        MintPhase memory whitelistPhase = MintPhase(_whitelistMint, 0, _whitelistLimit, 0);
        MintPhase memory fcfsPhase = MintPhase(true, 0, _fcfsLimit, 0);
        MintPhase memory publicPhase = MintPhase(_publicMint, 0.01 ether, _publicLimit, 0);
        
        HorrorApeClub newCollection = new HorrorApeClub(
            _name,
            _symbol,
            _initBaseURI,
            _initNotRevealedUri,
            whitelistPhase,
            fcfsPhase,
            publicPhase,
            _creator
        );
        collections.push(newCollection);
    }
}
