import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { WagmiProvider, createConfig, http } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { mintMainnet } from "@/constants/customChains";
import { Toaster } from "@/components/ui/toaster";

const config = createConfig(
  getDefaultConfig({
    // Your dApps chains
    chains: [mintMainnet],
    transports: {
      // RPC URL for each chain
      // [mainnet.id]: http(
      //   `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`
      // ),
      [mintMainnet.id]: http("https://rpc.mintchain.io"),
      // [mintSepoliaTestnet.id]: http("https://sepolia-testnet-rpc.mintchain.io"),
    },

    // Required API Keys
    // @ts-ignore
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,

    // Required App Info
    appName: "Your App Name",

    // Optional App Info
    appDescription: "Mint Blockchain NFT Launchpad",
    appUrl: "https://family.co", // your app's url
    appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
  })
);

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>
          <Component {...pageProps} />
          <Toaster />
        </ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
