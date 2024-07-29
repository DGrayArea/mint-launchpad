import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { Textarea } from "../ui/textarea";
import { useAccount, useWriteContract } from "wagmi";
import { useToast } from "@/components/ui/use-toast";
import { NftContract, NftABI, AirdropContract } from "@/config/Abi";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { DialogTab } from "./LaunchTabs/DialogTab";
import { useState } from "react";
import { Upload } from "./LaunchTabs/Upload";

const AirdropBanner = () => {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const { toast } = useToast();
  const [addresses, setAddresses] = useState<string[]>();
  const [numbers, setNumbers] = useState(0);
  const [amounts, setAmounts] = useState<number[] | string[]>();
  const [files, setFile] = useState<any>(null);

  const callApprove = () => {
    writeContract({
      abi: NftABI,
      address: NftContract,
      functionName: "setApprovalForAll",
      args: [AirdropContract, true],
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
  console.log(addresses, numbers, amounts);
  return (
    <div className="h-full mt-10 mb-10 container w-full px-3.5">
      <div className="bg-[#111827] border border-gray-600 p-5 lg:p-8 rounded-2xl shadow-xl flex flex-col lg:items-center relative">
        <div className="w-full justify-center items-center flex text-center font-extrabold text-neutral-400 text-sm lg:text-xl">
          Manage Airdrops / Free Minting
          <InformationCircleIcon className="text-neutral-400 w-5 md:w-6 ml-2" />
        </div>

        <div className="text-xs md:text-base text-center w-full mt-5">
          Airdroping NFTs (excluding gas) to different wallets, e.g. airdrop
          winners, sweepstakes winners, send to your colleagues for free...
          Airdrops can be sent regardless of the current collection Phase.
          upload a list of addresses and the amount of NFTs that correspond to
          them,
        </div>
        <div className="w-full mt-10">
          <Input placeholder="NFT Contract" />
        </div>

        <div className="mt-10 flex flex-row space-x-5 items-center justify-center">
          <DialogTab
            setAddresses={setAddresses}
            setAmount={setAmounts}
            setNumber={setNumbers}
          />
          <Upload setFile={setFile} />

          {/* <button className="w-full relative h-auto inline-flex items-center justify-center rounded-xl transition-colors text-sm sm:text-base font-medium px-4 py-3 sm:px-6 cursor-pointer disabled:bg-opacity-70 bg-green-500 active:bg-green-700 text-neutral-50 flex-1 delay-75">
            Add Addresses
          </button> */}
        </div>
        <div className="mt-10 flex flex-row space-x-5 items-center justify-center">
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

export default AirdropBanner;
