// SPDX-License-Identifier: MIT

pragma solidity >=0.8.0;

    struct MintPhase {
        bool isActive;
        bool isLive;
        uint256 price;
        uint256 limit;
        uint256 minted;
    }

    struct NFTData {
        address contractAddress;
        string website;
        string x;
        string telegram;
        string discord;
        string logoUri;
        string backgroundUri;
    }

    struct CollectionDetails {
        string website;
        string x;
        string telegram;
        string discord;
        string logoUri;
        string backgroundUri;
    }

   struct SaleParams {
        uint256 whitelistLimit;
        uint256 publicLimit;
        uint256 fcfsLimit;
        uint256 whitelistPrice;
        uint256 publicPrice;
        uint256 fcfsPrice;
        bool isWlActive;
        bool isPublicActive;
        bool isFcfsActive;
   }

   struct MetadataParams {
        string name;
        string symbol;
        string initBaseURI;
   }


