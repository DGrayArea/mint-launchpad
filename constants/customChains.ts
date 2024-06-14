import { type Chain } from "viem";

export const avalanche: Chain = {
  id: 43_114,
  name: "Avalanche",
  nativeCurrency: {
    decimals: 18,
    name: "Avalanche",
    symbol: "AVAX",
  },
  rpcUrls: {
    default: { http: ["https://api.avax.network/ext/bc/C/rpc"] },
  },
  blockExplorers: {
    default: { name: "SnowTrace", url: "https://snowtrace.io" },
    snowtrace: { name: "SnowTrace", url: "https://snowtrace.io" },
  },
  testnet: false,
};

export const mintMainnet: Chain = {
    id: 185,
    name: "Mint Mainnet",
    nativeCurrency: {
      decimals: 18,
      name: "Mint Mainnet",
      symbol: "ETH",
    },
    rpcUrls: {
      default: { http: ["https://rpc.mintchain.io"] },
    },
    blockExplorers: {
      default: { name: "Mint Explorer", url: "https://explorer.mintchain.io" },
    },
    testnet: false,
  };

  export const mintSepoliaTestnet: Chain = {
    id: 1687,
    name: "Mint Sepolia Testnet",
    nativeCurrency: {
      decimals: 18,
      name: "Mint Sepolia Testnet",
      symbol: "ETH",
    },
    rpcUrls: {
      default: { http: ["https://sepolia-testnet-rpc.mintchain.io"] },
    },
    blockExplorers: {
      default: { name: "Mint Sepolia Testnet Explorer", url: "https://sepolia-testnet-explorer.mintchain.io" },
    },
    testnet: false,
  };