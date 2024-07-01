import Nav from "@/components/Header/Nav";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Poppins } from "next/font/google";
import nftHolders from "@/config/json/nftDistribution.json";
import { useWriteContract } from "wagmi";
import { AirdropContractABI, NftContract } from "@/config/Abi";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Admin() {
  const { writeContract } = useWriteContract();

  const handleGet = async () => {
    try {
      const nftAirdropContractAddress =
        "0x261BBF047773e331b70b80893d2a13907d3A9272";

      const nftAirdropAbi = [
        {
          inputs: [],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "owner",
              type: "address",
            },
          ],
          name: "OwnableInvalidOwner",
          type: "error",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "account",
              type: "address",
            },
          ],
          name: "OwnableUnauthorizedAccount",
          type: "error",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "recipient",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "tokenContract",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          name: "ERC20Withdrawn",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "recipient",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          name: "EtherWithdrawn",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address[]",
              name: "recipients",
              type: "address[]",
            },
            {
              indexed: true,
              internalType: "address",
              name: "nftContract",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256[][]",
              name: "tokenIds",
              type: "uint256[][]",
            },
          ],
          name: "NFTAirdropped",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "previousOwner",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "newOwner",
              type: "address",
            },
          ],
          name: "OwnershipTransferred",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address[]",
              name: "recipients",
              type: "address[]",
            },
            {
              indexed: true,
              internalType: "address",
              name: "tokenContract",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256[]",
              name: "amounts",
              type: "uint256[]",
            },
          ],
          name: "TokensAirdropped",
          type: "event",
        },
        {
          stateMutability: "payable",
          type: "fallback",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "nftContractAddress",
              type: "address",
            },
            {
              internalType: "address[]",
              name: "recipients",
              type: "address[]",
            },
            {
              internalType: "uint256[][]",
              name: "tokenIds",
              type: "uint256[][]",
            },
          ],
          name: "airdropNFTs",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "owner",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "renounceOwnership",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "newOwner",
              type: "address",
            },
          ],
          name: "transferOwnership",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "tokenContractAddress",
              type: "address",
            },
          ],
          name: "withdrawERC20",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "withdrawEther",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "nftContractAddress",
              type: "address",
            },
            {
              internalType: "uint256[]",
              name: "tokenIds",
              type: "uint256[]",
            },
          ],
          name: "withdrawNFTs",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          stateMutability: "payable",
          type: "receive",
        },
      ];
      const recipients = [];
      const tokensForRecipients = [];

      for (const holder of nftHolders) {
        recipients.push(String(holder.owner));
        tokensForRecipients.push(holder.tokens);
      }
      console.log(recipients, tokensForRecipients);
      writeContract({
        abi: AirdropContractABI,
        //@ts-ignore
        contract: "0x30c5151E9bfc8D8B861f3bc364d7Dd810D9BA636",
        functionName: "airdropNFTsInBatches",
        args: [NftContract, recipients, tokensForRecipients, 5],
      });
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center text-white bg-[#0b0f19] ${font.className} w-full`}
    >
      <Nav />
      <div className="flex w-full justify-center items-center mx-auto flex-col px-4 md:px-6">
        <div className="animation-header3 text-2xl md:text-4xl mt-10 text-center whitespace-nowrap">
          CREATE AN NFT LAUNCHPAD
        </div>

        <div className="w-full bg-[#111827] border border-gray-600 p-5 lg:p-8 rounded-2xl shadow-xl flex flex-col lg:items-center relative mt-6">
          <div className="flex w-full flex-col">
            {/* <div className="grid grid-cols-2 md:grid-cols-3 items-center w-full gap-5">
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

            <div className="w-full justify-between items-center mt-10">
              <button className="w-full relative h-auto inline-flex items-center justify-center rounded-xl transition-colors text-sm sm:text-base font-medium px-4 py-3 sm:px-6 cursor-pointer disabled:bg-opacity-70 bg-green-500 active:bg-green-700 text-neutral-50 flex-1 delay-75">
                Create Launchpad
              </button>
            </div> */}

            <div
              onClick={() => handleGet()}
              className="w-full justify-between items-center mt-10"
            >
              <button className="w-full relative h-auto inline-flex items-center justify-center rounded-xl transition-colors text-sm sm:text-base font-medium px-4 py-3 sm:px-6 cursor-pointer disabled:bg-opacity-70 bg-green-500 active:bg-green-700 text-neutral-50 flex-1 delay-75">
                Airdrop NFTs
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
