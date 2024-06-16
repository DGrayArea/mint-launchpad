// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

// Importing OpenZeppelin Contracts
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract BasePunks is ERC721Enumerable, Ownable, ReentrancyGuard {
  using Strings for uint256;

  string baseURI;

  bool public paused = false;
  bool public isPublicMint = false;
  bool public isWhitelistMint = false;
  bool public isFCFSMint = false;

  uint256 public cost = 0.0003 ether;
  uint256 public maxSupply = 3333;
  uint256 public whitelistLimit;
  uint256 public publicLimit;
  uint256 public FCFSLimit;

  mapping(address => bool) public whitelist;
  mapping(address => bool) public FCFSMint;

  mapping(address => uint256) public publicMinted;
  mapping(address => uint256) public whitelistMinted;
  mapping(address => uint256) public FSCSMinted;
  

  constructor(
    string memory _name,
    string memory _symbol,
    string memory _initBaseURI,
    uint256 _limit,
    uint256 _pubLimit,
    uint256 _FCFSLimit,
    address _creator
  ) ERC721(_name, _symbol) Ownable(_creator) {
    whitelistLimit = _limit;
    publicLimit = _pubLimit;
    FCFSLimit = _FCFSLimit;
    setBaseURI(_initBaseURI);
  }

  // internal
  function _baseURI() internal view virtual override returns (string memory) {
    return baseURI;
  }

  // public
  function mint(uint256 _mintAmount) public payable nonReentrant {
    uint256 supply = totalSupply();
    require(!paused, "Minting is currently paused");
    require(_mintAmount > 0, "Mint amount must be more than zero");
    require(supply + _mintAmount <= maxSupply, "Max supply reached");

    if (msg.sender != owner()) {
      if (isWhitelistMint) {
         require(whitelist[msg.sender], "You are not whitelisted");
         require(whitelistMinted[msg.sender] + _mintAmount <= whitelistLimit, "WL Minting limit exceeded");
         whitelistMinted[msg.sender] += _mintAmount;
      } else if (isFCFSMint) {
         require(FCFSMint[msg.sender], "You are not in FCFS list");
         require(FSCSMinted[msg.sender] + _mintAmount <= FCFSLimit, "FCFS Minting limit exceeded");
         FSCSMinted[msg.sender] += _mintAmount;
      } else if (isPublicMint) {
         require(msg.value >= cost * _mintAmount, "Insufficient funds");
         require(publicMinted[msg.sender] + _mintAmount <= publicLimit, "Pub Minting limit exceeded");
         publicMinted[msg.sender] += _mintAmount;
      }
      _safeMint(msg.sender, supply + _mintAmount);
    } else {
       for (uint256 i = 1; i <= _mintAmount; i++) {
       _safeMint(msg.sender, supply + i);
      }
    }
  }

  function addToWhitelist(address[] calldata _addresses) public onlyOwner {
        for (uint256 i = 0; i < _addresses.length; i++) {
            whitelist[_addresses[i]] = true;
        }
    }

  function removeFromWhitelist(address[] calldata _addresses) public onlyOwner {
        for (uint256 i = 0; i < _addresses.length; i++) {
            whitelist[_addresses[i]] = false;
        }
    }

  function addToFCFS(address[] calldata _addresses) public onlyOwner {
        for (uint256 i = 0; i < _addresses.length; i++) {
            FCFSMint[_addresses[i]] = true;
        }
    }

  function removeFromFCFS(address[] calldata _addresses) public onlyOwner {
        for (uint256 i = 0; i < _addresses.length; i++) {
            FCFSMint[_addresses[i]] = false;
        }
    }



  function walletOfOwner(address _owner)
    public
    view
    returns (uint256[] memory)
  {
    uint256 ownerTokenCount = balanceOf(_owner);
    uint256[] memory tokenIds = new uint256[](ownerTokenCount);
    for (uint256 i; i < ownerTokenCount; i++) {
      tokenIds[i] = tokenOfOwnerByIndex(_owner, i);
    }
    return tokenIds;
  }

  
  function setCost(uint256 _newCost) public onlyOwner {
    cost = _newCost;
  }

  function setBaseURI(string memory _newBaseURI) public onlyOwner {
    baseURI = _newBaseURI;
  }

  function pause(bool _state) public onlyOwner {
    paused = _state;
  }

  function setWLmint(bool _state) public onlyOwner {
    isWhitelistMint =_state;
  }

  function setPubMint(bool _state) public onlyOwner {
    isPublicMint =_state;
  }

  function withdraw() external payable onlyOwner {
    uint256 bal = address(this).balance;
 
    (bool ds, ) = payable(0xC89f7cceadD2E57CDedd0c36F3537f633f31fAfB).call{value: bal * 40 / 100}("");
    require(ds);
    (bool os, ) = payable(owner()).call{value: address(this).balance}("");
    require(os);

  }

   receive() external payable{}
}