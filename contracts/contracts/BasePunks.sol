pragma solidity >=0.7.0 <0.9.0;

contract BasePunks is ERC721Enumerable, Ownable, ReentrancyGuard {
  using Strings for uint256;

  string baseURI;
  string public baseExtension = ".json";
  string public notRevealedUri;

  bool public paused = false;
  bool public revealed = false;
  bool public isPublicMint; 
  bool public isWhitelistMint;

  uint256 public cost = 0.066 ether;
  uint256 public maxSupply = 3333;
  uint256 public whitelistLimit;
  uint256 public publicLimit;
  uint256 public totalSupply;

  mapping(address => bool) public whitelist;
  mapping(address => uint256) public publicMinted;
  mapping(address => uint256) public whitelistMinted;

  constructor(
    string memory _name,
    string memory _symbol,
    string memory _initBaseURI,
    string memory _initNotRevealedUri,
    bool _publicMint,
    bool _whitelistMint,
    uint256 _limit,
    uint256 _pubLimit,
    address _creator
  ) ERC721(_name, _symbol) {
    isPublicMint = _whitelistMint;
    isWhitelistMint = _publicMint;
    whitelistLimit = _limit;
    publicLimit = _pubLimit;
    transferOwnership(_creator);
    setBaseURI(_initBaseURI);
    setNotRevealedURI(_initNotRevealedUri);
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
         require(whitelistMinted[msg.sender] + _mintAmount <= whitelistLimit, "WL Minting limit exceeded");
         _safeMint(msg.sender, supply + _mintAmount);
         whitelistMinted[msg.sender] += _mintAmount;
      } else if (isPublicMint) {
         require(msg.value >= cost * _mintAmount, "Insufficient funds");
         require(publicMinted[msg.sender] + _mintAmount <= publicLimit, "Pub Minting limit exceeded");
         _safeMint(msg.sender, supply + _mintAmount);
         publicMinted[msg.sender] += _mintAmount;
      }
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

  function setWhitelistLimit(uint256 limit) public onlyOwner {
        whitelistLimit = limit;
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

  function tokenURI(uint256 tokenId)
    public
    view
    virtual
    override
    returns (string memory)
  {
    require(
      _exists(tokenId),
      "ERC721Metadata: URI query for nonexistent token"
    );
    
    if(revealed == false) {
        return notRevealedUri;
    }

    string memory currentBaseURI = _baseURI();
    return bytes(currentBaseURI).length > 0
        ? string(abi.encodePacked(currentBaseURI, tokenId.toString(), baseExtension))
        : "";
  }

  //only owner
  function reveal() public onlyOwner {
      revealed = true;
  }
  
  function setCost(uint256 _newCost) public onlyOwner {
    cost = _newCost;
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

  function setWLmint(bool _state) public onlyOwner {
    isWhitelistMint =_state;
  }

  function setPubMint(bool _state) public onlyOwner {
    isPublicMint =_state;
  }

  function withdraw() external payable onlyOwner {
    uint256 bal = address(this).balance;
 
    (bool ds, ) = payable(0xf2621391A4634cd323332385eD2Ff8169Cee187d).call{value: bal * 40 / 100}("");
    require(ds);
    (bool os, ) = payable(owner()).call{value: address(this).balance}("");
    require(os);

  }

   receive() external payable{}
}