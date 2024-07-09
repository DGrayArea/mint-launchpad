import Nav from "@/components/Header/Nav";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Poppins } from "next/font/google";
import nftHolders from "@/config/json/nftDistribution.json";
import { useWriteContract } from "wagmi";
import {
  AirdropContractABI,
  LaunchpadFactoryABI,
  LaunchpadFactoryContract,
  NftContract,
} from "@/config/Abi";
import data from "../data.json";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Admin() {
  const { writeContract } = useWriteContract();
  const [whitelistSale, setWhitelistSale] = useState(false);
  const [fcfsSale, setFcfsSale] = useState(false);
  const [publicSale, setPublicSale] = useState(false);
  const [metadata, setMetadata] = useState(false);
  const [socials, setSocials] = useState(false);
  const [media, setMedia] = useState(true);
  const [creator, setCreator] = useState(true);

  const handleGet = async () => {
    //     MetadataParams memory _metadata,
    //     SaleParams memory _saleParams,
    //     NFTData memory _nftData,
    //     bool _isFreeMint,
    //     uint256 _maxSupply,
    //     address _creator

    //     struct NFTData {
    //       address contractAddress;
    //       string website;
    //       string x;
    //       string telegram;
    //       string discord;
    //       string logoUri;
    //       string backgroundUri;
    //   }

    //  struct SaleParams {
    //       uint256 whitelistLimit;
    //       uint256 publicLimit;
    //       uint256 fcfsLimit;
    //       uint256 whitelistPrice;
    //       uint256 publicPrice;
    //       uint256 fcfsPrice;
    //       bool isWlActive;
    //       bool isPublicActive;
    //       bool isFcfsActive;
    //  }

    //  struct MetadataParams {
    //       string name;
    //       string symbol;
    //       string initBaseURI;
    //  }
    try {
      writeContract({
        abi: LaunchpadFactoryABI,
        //@ts-ignore
        contract: LaunchpadFactoryContract,
        functionName: "createCollection",
        args: [],
      });
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };
  console.log(data.recipients.length, data.tokensForRecipients.length);
  return (
    <main
      className={`flex min-h-screen flex-col items-center text-white bg-[#0b0f19] ${font.className} w-full`}
    >
      <Nav />
      <div className="flex w-full justify-center items-center mx-auto flex-col px-4 md:px-6 pb-20">
        <div className="animation-header3 text-2xl md:text-4xl mt-10 text-center whitespace-nowrap">
          CREATE AN NFT LAUNCHPAD
        </div>

        <div className="w-full bg-[#111827] border border-gray-600 p-5 lg:p-8 rounded-2xl shadow-xl flex flex-col lg:items-center relative mt-6">
          <div className="flex w-full flex-col">
            <div className="grid grid-cols-2 md:grid-cols-3 items-center w-full gap-5">
              <Input
                className="bg-[#111827] border border-gray-600 focus:border-gray-400 w-full"
                placeholder="Collection name"
              />
              <Input
                className="bg-[#111827] border border-gray-600 focus:border-gray-400 w-full"
                placeholder="Collection Symbol"
              />
              <Input
                type="number"
                className="bg-[#111827] border border-gray-600 focus:border-gray-400 w-full"
                placeholder="Collection Supply"
              />
            </div>
            <div className="w-full flex flex-row justify-between mt-10">
              <div className="flex items-center space-x-2">
                <Checkbox id="whitelist" className="border border-gray-600" />
                <label
                  htmlFor="terms2"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Whitelist Sale
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="fcfs" className="border border-gray-600" />
                <label
                  htmlFor="terms2"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  FCFS Sale
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="public" className="border border-gray-600" />
                <label
                  htmlFor="terms2"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Public Sale
                </label>
              </div>
            </div>
            <div className="italic text-xs mt-8 flex flex-row">
              Note: if free mint or the sale stage is not selected you can leave
              the price field empty
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 items-center w-full gap-5 mt-8">
              <Input
                type="number"
                className="bg-[#111827] border border-gray-600 focus:border-gray-400 w-full"
                placeholder="WL Price"
              />
              <Input
                type="number"
                className="bg-[#111827] border border-gray-600 focus:border-gray-400 w-full"
                placeholder="FCFS Price"
              />
              <Input
                type="number"
                className="bg-[#111827] border border-gray-600 focus:border-gray-400 w-full"
                placeholder="Public Price"
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 items-center w-full gap-5 mt-8">
              <Input
                className="bg-[#111827] border border-gray-600 focus:border-gray-400 w-full"
                placeholder="baseURI"
              />
              <Input
                className="bg-[#111827] border border-gray-600 focus:border-gray-400 w-full"
                placeholder="Contract Creator"
              />
            </div>
            <div className="text-xs mt-8 flex flex-col">
              Enter socials:
              <br />
              <div className="italic text-xs mt-2 flex flex-row">
                Note: if any social account is not available feel free to leave
                the field empty
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 items-center w-full gap-5 mt-8">
              <Input
                className="bg-[#111827] border border-gray-600 focus:border-gray-400 w-full"
                placeholder="Website"
              />
              <Input
                className="bg-[#111827] border border-gray-600 focus:border-gray-400 w-full"
                placeholder="X"
              />
              <Input
                className="bg-[#111827] border border-gray-600 focus:border-gray-400 w-full"
                placeholder="Telegram"
              />
              <Input
                className="bg-[#111827] border border-gray-600 focus:border-gray-400 w-full"
                placeholder="Discord"
              />
            </div>
            <div className="text-xs mt-8 flex flex-col">Upload Media:</div>
            <div className="grid grid-cols-2 md:grid-cols-3 items-center w-full gap-5 mt-8">
              {/* <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="picture">Logo</Label>
                <Input id="picture" type="file" />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="picture">Background</Label>
                <Input id="picture" type="file" />
              </div> */}
              <Input
                className="bg-[#111827] border border-gray-600 focus:border-gray-400 w-full"
                placeholder="Logo/Gif Uri"
              />
              <Input
                className="bg-[#111827] border border-gray-600 focus:border-gray-400 w-full"
                placeholder="Banner Uri"
              />
            </div>

            <div className="w-full justify-between items-center mt-10">
              <button className="w-full relative h-auto inline-flex items-center justify-center rounded-xl transition-colors text-sm sm:text-base font-medium px-4 py-3 sm:px-6 cursor-pointer disabled:bg-opacity-70 bg-green-500 active:bg-green-700 text-neutral-50 flex-1 delay-75">
                Create Launchpad
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
