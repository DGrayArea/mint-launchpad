import { contract } from "@/config";
import { abi } from "@/config/Abi";
import { useEffect, useState } from "react";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { useToast } from "@/components/ui/use-toast";
import { parseEther } from "viem";
import { Input } from "@/components/ui/input";

const Public = () => {
  const { toast } = useToast();
  const { address, chainId } = useAccount();
  const { writeContract } = useWriteContract();

  const result = useReadContract({
    abi,
    address: contract,
    functionName: "getSalePhases",
  });
  const supply = useReadContract({
    abi,
    address: contract,
    functionName: "totalSupply",
  });

  const isWhitelisted = useReadContract({
    abi,
    address: contract,
    functionName: "FCFSMint",
    args: [address],
  });

  const mintAmountLeft = useReadContract({
    abi,
    address: contract,
    functionName: "publicMinted",
    args: [address],
  });

  //@ts-ignore
  const [mintDone, setMintDone] = useState<any | unknown>(true);
  const [mintAmount, setMintAmount] = useState(0);
  const [totalSupply, setTotalSupply] = useState(0);
  const [amount, setAmount] = useState(1);

  useEffect(() => {
    //@ts-ignore
    if (result.data && supply && mintAmountLeft) {
      //setMintDone(!result?.data[0]);
      //@ts-ignore
      setMintDone(!result?.data[2]);
      //@ts-ignore
      setTotalSupply(Number(supply?.data));
      //@ts-ignore
      setMintAmount(Number(mintAmountLeft?.data));
    }
  }, [result, supply, mintAmountLeft]);

  const callMint = () => {
    console.log("Clicked");
    if (chainId !== 185) {
      toast({
        title: "Wrong Chain",
        description:
          "Please connect to the Mint mainnet blockchain before minting",
      });
    } else {
      if (Number(mintAmountLeft?.data) >= 5) {
        toast({
          title: "Error Minting",
          description: "Minting Limit Exceeded",
        });
      } else {
        if (amount + Number(mintAmountLeft?.data) > 5) {
          toast({
            title: "Error Minting",
            description:
              "Total amount will Exceeded Limit adjust your mint amount",
          });
        } else {
          writeContract({
            abi,
            address: contract,
            functionName: "mint",
            args: [amount],
            value: parseEther(String(Number(amount * 0.00078))),
          });
          setTimeout(
            () =>
              toast({
                title: "Mint Successful",
                description: "NFT Succesfully minted",
              }),
            4000
          );
        }
      }
    }
  };
  console.log(mintAmount);
  return (
    <div>
      <div className="flex flex-col sm:flex-row items-baseline p-5 lg:p-6 border-2 border-green-500 rounded-xl relative mb-3">
        <div>
          <span className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold text-green-500">
            FREE
          </span>
          <span className="text-base lg:text-lg text-neutral-400 sm:ml-3.5">
            ({mintAmount ? mintAmount : 0}/5)
          </span>
        </div>
        <span className="block absolute bottom-full translate-y-2.5 py-1 px-1.5 bg-[#111827] text-xs lg:text-sm text-neutral-400">
          Mint Price Of <span className="text-xs text-blue-500">Public</span>
        </span>
        <div className="bg-blue-500/30 text-blue-200 w-fit p-2 rounded-md text-xs lg:text-sm absolute top-2 right-2">
          Total: 10000 NFTs
        </div>
      </div>
      {mintDone ? (
        <span className="leading-none mt-10 font-semibold text-yellow-500 whitespace-nowrap text-sm lg:text-base w-full text-center md:text-left">
          Public minting pending Please wait ...
        </span>
      ) : (
        <span className="leading-none mt-10 font-semibold text-green-500 whitespace-nowrap text-sm lg:text-base w-full text-center md:text-left">
          Public minting ongoing
        </span>
      )}

      <p className="text-neutral-500 dark:text-neutral-400 text-sm mt-10 mb-1.5">
        Total minted
      </p>

      <div className="w-full bg-gray-300 rounded-full dark:bg-gray-700 relative h-[22px] overflow-hidden mt-1">
        <div
          className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full h-full transition-all duration-75"
          style={{ width: `${(totalSupply / 10000) * 100}%` }}
        >
          <p className="absolute top-0 right-0 bottom-0 left-0 m-auto p-1.5 text-white transition-all duration-75">
            <b>{(totalSupply / 10000) * 100}%</b> ({totalSupply}/10000)
          </p>
        </div>
      </div>
      <div>
        <Input
          onChange={(w) => setAmount(Number(w.currentTarget.value))}
          type="number"
          min={1}
          max={5}
          placeholder="Enter Amount"
          className="max-w-full border-gray-600 rounded-xl px-4 py-5 text-center mt-4"
        />
      </div>
      <div className="border-b-[0.3px] border-b-white w-full mt-4 mb-8" />
      {mintDone || mintAmount >= 5 ? (
        <button
          disabled
          className="w-full mt-1.5 relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-3 sm:px-6 cursor-not-allowed disabled:bg-opacity-70 bg-yellow-400 hover:bg-yellow-700 text-neutral-50 flex-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0"
        >
          Mint Pending
        </button>
      ) : (
        <button
          onClick={() => callMint()}
          className="w-full mt-1.5 relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-3 sm:px-6 cursor-pointer disabled:bg-opacity-70 bg-green-400 active:bg-green-700 text-neutral-50 flex-1 delay-75"
        >
          Mint NFT
        </button>
      )}
    </div>
  );
};

export default Public;
