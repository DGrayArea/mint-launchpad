// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/access/Ownable2Step.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./DataTypes.sol";

contract NFTCollection is ERC721Enumerable, Ownable2Step, ReentrancyGuard {
    using Strings for uint256;

    string baseURI;

    bool public paused = false;

    uint256 public maxSupply;
    uint256 public platformFee;
    uint256 public baseFee;

    address private feeAddress;

    MintPhase public whitelistPhase;
    MintPhase public fcfsPhase;
    MintPhase public publicPhase;

    mapping(address => bool) public whitelist;
    mapping(address => bool) public fcfsListed;

    mapping(address => uint256) public whitelistMinted;
    mapping(address => uint256) public fcfsMinted;
    mapping(address => uint256) public publicMinted;

    constructor(
        MetadataParams memory _metadata,
        SaleParams memory _saleParams,
        uint256 _maxSupply,
        uint256 _platformFee,
        address _feeAddress,
        uint256 _baseFee,
        address _creator
    ) ERC721(_metadata.name, _metadata.symbol) Ownable(_creator) {

        whitelistPhase = MintPhase(
         false,
         _saleParams.isWlActive, 
         _saleParams.whitelistPrice,
         _saleParams.whitelistLimit, 
         0
        );

        fcfsPhase = MintPhase(
         false,
         _saleParams.isFcfsActive, 
         _saleParams.fcfsPrice,
         _saleParams.fcfsLimit, 
         0
        );

        publicPhase = MintPhase(
         false,
         _saleParams.isPublicActive, 
         _saleParams.publicPrice,
         _saleParams.publicLimit, 
         0
        );

        maxSupply = _maxSupply;
        baseFee = _baseFee;
        platformFee = _platformFee;
        setBaseURI(_metadata.initBaseURI);
        feeAddress = _feeAddress;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }

    function mint(uint256 _mintAmount, address _to) public payable nonReentrant {

      uint256 supply = totalSupply();
      require(!paused, "Minting is currently paused");
      require(_mintAmount > 0, "Mint amount must be more than zero");
      require(supply + _mintAmount <= maxSupply, "Max supply reached");

      if (msg.sender != owner()) {
        bool phaseFound = false;
        uint256 cost;

        if (whitelistPhase.isActive && whitelist[_to]) {
            cost = whitelistPhase.price <= 0 ? baseFee : whitelistPhase.price;
            phaseFound = true;
            require(whitelistMinted[_to] + _mintAmount <= whitelistPhase.limit, "WL Minting limit exceeded");
            require(msg.value >= cost * _mintAmount, "Insufficient funds for whitelist mint");
            whitelistPhase.minted += _mintAmount;
            whitelistMinted[_to] += _mintAmount;
        }

        else if (!phaseFound && fcfsPhase.isActive && fcfsListed[_to]) {
            cost = fcfsPhase.price <= 0 ? baseFee : fcfsPhase.price;
            phaseFound = true;
            require(fcfsMinted[_to] + _mintAmount <= fcfsPhase.limit, "FCFS Minting limit exceeded");
            require(msg.value >= cost* _mintAmount, "Insufficient funds for FCFS mint");
            fcfsPhase.minted += _mintAmount;
            fcfsMinted[_to] += _mintAmount;
        }

        else if (!phaseFound && publicPhase.isActive) {
            cost = publicPhase.price <= 0 ? baseFee : publicPhase.price;
            phaseFound = true;
            require(publicMinted[_to] + _mintAmount <= publicPhase.limit, "FCFS Minting limit exceeded");
            require(msg.value >= cost * _mintAmount, "Insufficient funds for public mint");
            publicPhase.minted += _mintAmount;
            publicMinted[_to] += _mintAmount;
        }

        require(phaseFound, "No active mint phase or not eligible for any active phase");
      } 

      for (uint256 i = 1; i <= _mintAmount; i++) {
            _safeMint(_to, supply + i);
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

    function addToFCFS(address[] calldata addresses) public onlyOwner {
        for (uint256 i = 0; i < addresses.length; i++) {
            fcfsListed[addresses[i]] = true;
        }
    }

    function removeFromFCFS(address[] calldata addresses) public onlyOwner {
        for (uint256 i = 0; i < addresses.length; i++) {
            fcfsListed[addresses[i]] = false;
        }
    }


    function resetPhaseState(
        string memory phase, 
        bool isActive,
        bool isLive,
        uint256 price, 
        uint256 limit
    ) public onlyOwner {
        if (keccak256(abi.encodePacked((phase))) == keccak256(abi.encodePacked(("whitelist")))) {
            whitelistPhase = MintPhase(isActive, isLive, price, limit, whitelistPhase.minted);
        } else if (keccak256(abi.encodePacked((phase))) == keccak256(abi.encodePacked(("fcfs")))) {
            fcfsPhase = MintPhase(isActive, isLive, price, limit, fcfsPhase.minted);
        } else if (keccak256(abi.encodePacked((phase))) == keccak256(abi.encodePacked(("public")))) {
            publicPhase = MintPhase(isActive, isLive, price, limit, publicPhase.minted);
        }
    }


    function activateSale(
        string memory phase
    ) public onlyOwner {
        if (keccak256(abi.encodePacked((phase))) == keccak256(abi.encodePacked(("whitelist")))) {
            whitelistPhase = MintPhase(true, whitelistPhase.isLive, whitelistPhase.price, whitelistPhase.limit, whitelistPhase.minted);
        } else if (keccak256(abi.encodePacked((phase))) == keccak256(abi.encodePacked(("fcfs")))) {
            fcfsPhase = MintPhase(true, fcfsPhase.isLive, fcfsPhase.price, fcfsPhase.limit, fcfsPhase.minted);
        } else if (keccak256(abi.encodePacked((phase))) == keccak256(abi.encodePacked(("public")))) {
            publicPhase = MintPhase(true, publicPhase.isLive, publicPhase.price, publicPhase.limit, publicPhase.minted);
        }
    }


    function closeAllSales () public onlyOwner {
        whitelistPhase = MintPhase(false, false, whitelistPhase.price, whitelistPhase.limit, whitelistPhase.minted);
        fcfsPhase = MintPhase(false, false, fcfsPhase.price, fcfsPhase.limit, fcfsPhase.minted);
        publicPhase = MintPhase(false, false, publicPhase.price, publicPhase.limit, publicPhase.minted);
    }


    function setMintPhases(
        bool whitelistActive,
        bool fcfsActive,
        bool publicActive
    ) public onlyOwner {
        whitelistPhase.isActive = whitelistActive;
        fcfsPhase.isActive = fcfsActive;
        publicPhase.isActive = publicActive;
    }

    function walletOfOwner(address _owner) public view returns (uint256[] memory) {
        uint256 ownerTokenCount = balanceOf(_owner);
        uint256[] memory tokenIds = new uint256[](ownerTokenCount);
        for (uint256 i; i < ownerTokenCount; i++) {
            tokenIds[i] = tokenOfOwnerByIndex(_owner, i);
        }
        return tokenIds;
    }


    function setBaseURI(string memory _newBaseURI) public onlyOwner {
        baseURI = _newBaseURI;
    }

    function pause(bool _state) public onlyOwner {
        paused = _state;
    }

    function getSalePhases() public view returns (bool[3] memory) {
        bool isWhitelistOngoing = whitelistPhase.isActive;
        bool isFCFSOngoing = fcfsPhase.isActive;
        bool isPublicOngoing = publicPhase.isActive;
        return [isWhitelistOngoing, isFCFSOngoing, isPublicOngoing];
    }

    function withdraw() external payable onlyOwner {
        uint256 bal = address(this).balance;
        (bool ds, ) = payable(feeAddress).call{value: bal * platformFee / 100}("");
        require(ds);
        (bool os, ) = payable(owner()).call{value: address(this).balance}("");
        require(os);
    }

    receive() external payable {}

    fallback() external payable {}
}
