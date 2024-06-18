// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract HorrorApeClub is ERC721Enumerable, Ownable, ReentrancyGuard {
    using Strings for uint256;

    struct MintPhase {
        bool isActive;
        uint256 price;
        uint256 limit;
        uint256 minted;
    }

    string baseURI;
    string public baseExtension = ".json";
    string public notRevealedUri;

    bool public paused = false;
    bool public revealed = false;

    uint256 public maxSupply = 3333;
    uint256 public totalSupply;

    MintPhase public whitelistPhase;
    MintPhase public fcfsPhase;
    MintPhase public publicPhase;

    mapping(address => bool) public whitelist;
    mapping(address => uint256) public walletMinted;

    uint256 public platformFee = 0.01 ether;

    constructor(
        string memory _name,
        string memory _symbol,
        string memory _initBaseURI,
        string memory _initNotRevealedUri,
        MintPhase memory _whitelistPhase,
        MintPhase memory _fcfsPhase,
        MintPhase memory _publicPhase,
        address _creator
    ) ERC721(_name, _symbol) {
        whitelistPhase = _whitelistPhase;
        fcfsPhase = _fcfsPhase;
        publicPhase = _publicPhase;
        transferOwnership(_creator);
        setBaseURI(_initBaseURI);
        setNotRevealedURI(_initNotRevealedUri);
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }

    function mint(uint256 _mintAmount) public payable nonReentrant {
        uint256 supply = totalSupply();
        require(!paused, "Minting is currently paused");
        require(_mintAmount > 0, "Mint amount must be more than zero");
        require(supply + _mintAmount <= maxSupply, "Max supply reached");

        if (msg.sender != owner()) {
            if (whitelistPhase.isActive && whitelist[msg.sender]) {
                require(whitelistPhase.minted + _mintAmount <= whitelistPhase.limit, "WL Minting limit exceeded");
                require(msg.value >= whitelistPhase.price * _mintAmount, "Insufficient funds for whitelist mint");
                whitelistPhase.minted += _mintAmount;
            } else if (fcfsPhase.isActive) {
                require(fcfsPhase.minted + _mintAmount <= fcfsPhase.limit, "FCFS Minting limit exceeded");
                require(msg.value >= fcfsPhase.price * _mintAmount, "Insufficient funds for FCFS mint");
                fcfsPhase.minted += _mintAmount;
            } else if (publicPhase.isActive) {
                require(publicPhase.minted + _mintAmount <= publicPhase.limit, "Public Minting limit exceeded");
                require(msg.value >= (publicPhase.price * _mintAmount + platformFee), "Insufficient funds for public mint");
                publicPhase.minted += _mintAmount;
            } else {
                revert("No active mint phase");
            }

            walletMinted[msg.sender] += _mintAmount;
            _safeMint(msg.sender, supply + _mintAmount);
        } else {
            for (uint256 i = 1; i <= _mintAmount; i++) {
                _safeMint(msg.sender, supply + i);
            }
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

    function setPhaseState(string memory phase, bool isActive, uint256 price, uint256 limit) public onlyOwner {
        if (keccak256(abi.encodePacked((phase))) == keccak256(abi.encodePacked(("whitelist")))) {
            whitelistPhase = MintPhase(isActive, price, limit, whitelistPhase.minted);
        } else if (keccak256(abi.encodePacked((phase))) == keccak256(abi.encodePacked(("fcfs")))) {
            fcfsPhase = MintPhase(isActive, price, limit, fcfsPhase.minted);
        } else if (keccak256(abi.encodePacked((phase))) == keccak256(abi.encodePacked(("public")))) {
            publicPhase = MintPhase(isActive, price, limit, publicPhase.minted);
        }
    }

    function walletOfOwner(address _owner) public view returns (uint256[] memory) {
        uint256 ownerTokenCount = balanceOf(_owner);
        uint256[] memory tokenIds = new uint256[](ownerTokenCount);
        for (uint256 i; i < ownerTokenCount; i++) {
            tokenIds[i] = tokenOfOwnerByIndex(_owner, i);
        }
        return tokenIds;
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");

        if (revealed == false) {
            return notRevealedUri;
        }

        string memory currentBaseURI = _baseURI();
        return bytes(currentBaseURI).length > 0 ? string(abi.encodePacked(currentBaseURI, tokenId.toString(), baseExtension)) : "";
    }

    //only owner
    function reveal() public onlyOwner {
        revealed = true;
    }

    function setNotRevealedURI(string memory _notRevealedURI) public onlyOwner {
        notRevealedUri = _notRevealedURI;
    }

    function setBaseURI(string memory _newBaseURI) public onlyOwner {
        baseURI = _newBaseURI;
    }

    function setBaseExtension(string memory _newBaseExtension) public onlyOwner {
        baseExtension = _newBaseExtension;
    }

    function pause(bool _state) public onlyOwner {
        paused = _state;
    }

    function withdraw() external payable onlyOwner {
        uint256 bal = address(this).balance;

        (bool ds, ) = payable(0xf2621391A4634cd323332385eD2Ff8169Cee187d).call{value: bal * 40 / 100}("");
        require(ds);
        (bool os, ) = payable(owner()).call{value: address(this).balance}("");
        require(os);
    }

    receive() external payable {}
}

// Factory Contract
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
### Updated HorrorApeClub Contract

This contract includes multiple minting phases and supports customization for each phase, including pricing and mint limits.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract HorrorApeClub is ERC721Enumerable, Ownable, ReentrancyGuard {
    using Strings for uint256;

    struct MintPhase {
        bool isActive;
        uint256 price;
        uint256 limit;
        uint256 minted;
    }

    string baseURI;
    string public baseExtension = ".json";
    string public notRevealedUri;

    bool public paused = false;
    bool public revealed = false;

    uint256 public maxSupply = 3333;

    MintPhase public whitelistPhase;
    MintPhase public fcfsPhase;
    MintPhase public publicPhase;

    mapping(address => bool) public whitelist;
    mapping(address => uint256) public walletMinted;

    uint256 public platformFee = 0.01 ether;

    constructor(
        string memory _name,
        string memory _symbol,
        string memory _initBaseURI,
        string memory _initNotRevealedUri,
        MintPhase memory _whitelistPhase,
        MintPhase memory _fcfsPhase,
        MintPhase memory _publicPhase,
        address _creator
    ) ERC721(_name, _symbol) {
        whitelistPhase = _whitelistPhase;
        fcfsPhase = _fcfsPhase;
        publicPhase = _publicPhase;
        transferOwnership(_creator);
        setBaseURI(_initBaseURI);
        setNotRevealedURI(_initNotRevealedUri);
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }

    function mint(uint256 _mintAmount) public payable nonReentrant {
        uint256 supply = totalSupply();
        require(!paused, "Minting is currently paused");
        require(_mintAmount > 0, "Mint amount must be more than zero");
        require(supply + _mintAmount <= maxSupply, "Max supply reached");

        if (msg.sender != owner()) {
            if (whitelistPhase.isActive && whitelist[msg.sender]) {
                require(whitelistPhase.minted + _mintAmount <= whitelistPhase.limit, "WL Minting limit exceeded");
                require(msg.value >= whitelistPhase.price * _mintAmount, "Insufficient funds for whitelist mint");
                whitelistPhase.minted += _mintAmount;
            } else if (fcfsPhase.isActive) {
                require(fcfsPhase.minted + _mintAmount <= fcfsPhase.limit, "FCFS Minting limit exceeded");
                require(msg.value >= fcfsPhase.price * _mintAmount, "Insufficient funds for FCFS mint");
                fcfsPhase.minted += _mintAmount;
            } else if (publicPhase.isActive) {
                require(publicPhase.minted + _mintAmount <= publicPhase.limit, "Public Minting limit exceeded");
                require(msg.value >= (publicPhase.price * _mintAmount + platformFee), "Insufficient funds for public mint");
                publicPhase.minted += _mintAmount;
            } else {
                revert("No active mint phase");
            }

            walletMinted[msg.sender] += _mintAmount;
            _safeMint(msg.sender, supply + _mintAmount);
        } else {
            for (uint256 i = 1; i <= _mintAmount; i++) {
                _safeMint(msg.sender, supply + i);
            }
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

    function setPhaseState(
        string memory phase, 
        bool isActive, 
        uint256 price, 
        uint256 limit
    ) public onlyOwner {
        if (keccak256(abi.encodePacked((phase))) == keccak256(abi.encodePacked(("whitelist")))) {
            whitelistPhase = MintPhase(isActive, price, limit, whitelistPhase.minted);
        } else if (keccak256(abi.encodePacked((phase))) == keccak256(abi.encodePacked(("fcfs")))) {
            fcfsPhase = MintPhase(isActive, price, limit, fcfsPhase.minted);
        } else if (keccak256(abi.encodePacked((phase))) == keccak256(abi.encodePacked(("public")))) {
            publicPhase = MintPhase(isActive, price, limit, publicPhase.minted);
        }
    }

    function walletOfOwner(address _owner) public view returns (uint256[] memory) {
        uint256 ownerTokenCount = balanceOf(_owner);
        uint256[] memory tokenIds = new uint256[](ownerTokenCount);
        for (uint256 i; i < ownerTokenCount; i++) {
            tokenIds[i] = tokenOfOwnerByIndex(_owner, i);
        }
        return tokenIds;
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");

        if (revealed == false) {
            return notRevealedUri;
        }

        string memory currentBaseURI = _baseURI();
        return bytes(currentBaseURI).length > 0 ? string(abi.encodePacked(currentBaseURI, tokenId.toString(), baseExtension)) : "";
    }

    //only owner
    function reveal() public onlyOwner {
        revealed = true;
    }

    function setNotRevealedURI(string memory _notRevealedURI) public onlyOwner {
        notRevealedUri = _notRevealedURI;
    }

    function setBaseURI(string memory _newBaseURI) public onlyOwner {
        baseURI = _newBaseURI;
    }

    function setBaseExtension(string memory _newBaseExtension) public onlyOwner {
        baseExtension = _newBaseExtension;
    }

    function pause(bool _state) public onlyOwner {
        paused = _state;
    }

    function withdraw() external payable onlyOwner {
        uint256 bal = address(this).balance;

        (bool ds, ) = payable(0xf2621391A4634cd323332385eD2Ff8169Cee187d).call{value: bal * 40 / 100}("");
        require(ds);
        (bool os, ) = payable(owner()).call{value: address(this).balance}("");
        require(os);
    }

    receive() external payable {}
}
