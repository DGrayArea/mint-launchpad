import { contract } from "@/config";
import { abi } from "@/config/Abi";
import { useEffect, useState } from "react";
import {
  useAccount,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { useToast } from "@/components/ui/use-toast";
import { parseEther } from "viem";

const Whitelist = () => {
  const { toast } = useToast();
  const { address } = useAccount();
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
    functionName: "whitelist",
    args: [address],
  });

  const mintAmountLeft = useReadContract({
    abi,
    address: contract,
    functionName: "whitelistMinted",
    args: [address],
  });

  //@ts-ignore
  const [mintDone, setMintDone] = useState<any | unknown>(true);
  const [mintAmount, setMintAmount] = useState(10);
  const [totalSupply, setTotalSupply] = useState(0);

  useEffect(() => {
    //@ts-ignore
    if (result.data && supply && mintAmountLeft) {
      //setMintDone(!result?.data[0]);
      //@ts-ignore
      setMintDone(!result?.data[0]);
      //@ts-ignore
      setTotalSupply(Number(supply?.data));
      //@ts-ignore
      setMintAmount(Number(mintAmountLeft?.data));
    }
  }, [result, supply, mintAmountLeft]);

  const callMint = () => {
    if (isWhitelisted.data) {
      if (Number(mintAmountLeft?.data) > 0) {
        toast({
          title: "Error Minting",
          description: "Minting Limit Exceeded",
        });
      } else {
        writeContract({
          abi,
          address: contract,
          functionName: "mint",
          args: [1],
          value: parseEther("0.00078"),
        });

        if (isWhitelisted.data) {
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
    } else {
      toast({
        title: "Error Minting",
        description: "You are not Whitelisted",
      });
    }
  };

  // const callWhitelist = async () => {
  //   const getProviderAndSigner = () => {
  //     const provider = new ethers.JsonRpcProvider("https://rpc.mintchain.io");

  //     // Get the private key from the environment variable
  //     const privateKey =
  //       "";

  //     if (!privateKey) {
  //       throw new Error("Private key is not defined in environment variables");
  //     }

  //     // Create a wallet instance with the private key and provider
  //     const wallet = new ethers.Wallet(privateKey, provider);

  //     return { provider, signer: wallet };
  //   };

  //   try {
  //     const { signer } = getProviderAndSigner();
  //     const contractC = new ethers.Contract(contract, abi, signer);

  //     // Replace `yourFunctionName` with the actual function name and add any parameters if required
  //     const tx = await contractC.addToFCFS([]);

  //     // Wait for the transaction to be mined
  //     const receipt = await tx.wait();
  //     console.log("Transaction successful with hash:", receipt.transactionHash);
  //   } catch (error) {
  //     console.error("Error calling contract function:", error);
  //   }

  //   // writeContract({
  //   //   abi,
  //   //   address: contract,
  //   //   functionName: "addToWhitelist",
  //   //   args: [["0xa31420f5bc6cf8a9d4ac7b6132b7fc2f93546fab"]],
  //   // });
  // };

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-baseline p-5 lg:p-6 border-2 border-green-500 rounded-xl relative mb-3">
        <div>
          <span className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold text-green-500">
            FREE
          </span>
          <span className="text-base lg:text-lg text-neutral-400 sm:ml-3.5">
            ({mintAmount ? mintAmount : 0}/1)
          </span>
        </div>
        <span className="block absolute bottom-full translate-y-2.5 py-1 px-1.5 bg-[#111827] text-xs lg:text-sm text-neutral-400">
          Mint Price Of <span className="text-xs text-blue-500">Whitelist</span>
        </span>
        <div className="bg-blue-500/30 text-blue-200 w-fit p-2 rounded-md text-xs lg:text-sm absolute top-2 right-2">
          Total: 10000 NFTs
        </div>
      </div>
      {mintDone ? (
        <span className="leading-none mt-10 font-semibold text-red-500 whitespace-nowrap text-sm lg:text-base w-full text-center md:text-left">
          Whitelist minting done, switch to FCFS tab
        </span>
      ) : (
        <span className="leading-none mt-10 font-semibold text-green-500 whitespace-nowrap text-sm lg:text-base w-full text-center md:text-left">
          Whitelist minting ongoing
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

      <div className="border-b-[0.3px] border-b-white w-full my-8" />
      {mintDone || mintAmount === 1 ? (
        <button
          disabled
          className="w-full mt-1.5 relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-3 sm:px-6 cursor-not-allowed disabled:bg-opacity-70 bg-red-400 hover:bg-red-700 text-neutral-50 flex-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0"
        >
          Sold out
        </button>
      ) : (
        <button
          onClick={() => callMint()}
          className="w-full mt-1.5 relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-3 sm:px-6 cursor-pointer disabled:bg-opacity-70 bg-green-400 active:bg-green-700 text-neutral-50 flex-1 delay-75"
        >
          Mint NFT
        </button>
      )}
      {/* <button
        onClick={() => callWhitelist()}
        className="w-full mt-1.5 relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-3 sm:px-6 cursor-pointer disabled:bg-opacity-70 bg-green-400 active:bg-green-700 text-neutral-50 flex-1 delay-75"
      >
        Whitelist
      </button> */}
    </div>
  );
};

export default Whitelist;
