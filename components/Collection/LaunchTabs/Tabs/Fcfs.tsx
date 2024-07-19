import { NFTCollection } from "@/config/Abi";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  useAccount,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { parseEther, formatEther } from "viem";
import { MintConnect } from "../../Launchpad/MintConnect";
import { MintPhase } from "@/types";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";

const Fcfs = ({
  data,
  price,
  contract,
  totalSupply,
  maxSupply,
}: {
  data: MintPhase | any;
  price: number | string | any;
  contract: string | any;
  totalSupply: number | string | any;
  maxSupply: number | string | any;
}) => {
  const { address } = useAccount();
  const { data: txData, error, isPending, writeContract } = useWriteContract();
  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    isError,
  } = useWaitForTransactionReceipt({
    hash: txData,
  });

  const isWhitelisted = useReadContract({
    abi: NFTCollection,
    address: contract,
    functionName: "fcfsListed",
    args: [address],
  });

  const mintAmountLeft = useReadContract({
    abi: NFTCollection,
    address: contract,
    functionName: "fcfsMinted",
    args: [address],
  });

  //@ts-ignore
  const [mintDone, setMintDone] = useState<any | unknown>(false);
  const [mintAmount, setMintAmount] = useState(1);
  const [limit, setLimit] = useState(0);
  const [free, setFree] = useState(false);
  const cost = useMemo(() => {
    if (data) {
      return Number(formatEther(data[2])) > 0
        ? Number(formatEther(data[2]))
        : formatEther(price);
    }
  }, [data, price]);
  const [amountToMint, setAmountToMint] = useState(1);

  const percentage = useMemo(
    () =>
      isNaN(Number(totalSupply) / Number(maxSupply))
        ? 0
        : Number(totalSupply) / Number(maxSupply),
    [totalSupply, maxSupply]
  );

  useEffect(() => {
    if (isConfirmed) {
      toast.success("NFTs Mint Succesfully ...");
    } else if (isPending || isConfirming) {
      const toastId = toast.loading("Minting NFTs ...");
      setTimeout(() => toast.dismiss(toastId), 1500);
    } else if (isError || error) {
      toast.error("Error Minting NFTs ...");
    }
  }, [isConfirming, isConfirmed, isPending, isError, error]);
  useEffect(() => {
    //@ts-ignore
    if (mintAmountLeft && data) {
      setFree(Number(formatEther(data[2])) > 0 ? false : true);
      //@ts-ignore
      setMintDone(Number(data[4]) > 0 && data[0] === false ? true : false);
      //@ts-ignore
      setLimit(Number(data[3]));
      setMintAmount(Number(mintAmountLeft?.data));
    }
  }, [mintAmountLeft, data]);

  const callMint = useCallback(() => {
    try {
      if (amountToMint && amountToMint < 1) {
        toast.error("Error ... Enter a valid mint amount");
      } else {
        if (isWhitelisted.data) {
          if (Number(limit) > 0) {
            if (
              Number(limit) === Number(mintAmountLeft?.data) ||
              Number(limit) < mintAmount + Number(mintAmountLeft?.data)
            ) {
              toast.error(
                "Error minting... Minting limit reached or will exceed, try reducing your mint amount.."
              );
            } else {
              writeContract({
                abi: NFTCollection,
                address: contract,
                functionName: "mint",
                args: [mintAmount, address],
                value: parseEther(String(Number(cost) * mintAmount)),
              });
            }
          } else {
            writeContract({
              abi: NFTCollection,
              address: contract,
              functionName: "mint",
              args: [mintAmount, address],
              value: parseEther(String(Number(cost) * mintAmount)),
            });
          }
        } else {
          toast.error("Error minting... You are not whitelisted");
        }
      }
    } catch (error) {
      toast.error("Error minting... ");
      console.log(error);
    }
  }, [
    address,
    amountToMint,
    contract,
    cost,
    isWhitelisted,
    limit,
    mintAmount,
    mintAmountLeft,
    writeContract,
  ]);

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row items-baseline p-5 lg:p-6 border-2 border-green-500 rounded-xl relative mb-3">
        <div>
          <span className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-green-500">
            {free ? "FREE" : `${cost ? cost : 0.0} ETH`}
          </span>
          <span className="text-base lg:text-lg text-neutral-400 ml-3.5">
            {free
              ? `(${isNaN(mintAmount) ? 0 : mintAmount}/${limit})`
              : `(${isNaN(totalSupply) ? 0 : totalSupply}/${
                  isNaN(maxSupply) ? 0 : maxSupply
                })`}
          </span>
        </div>
        <span className="block absolute bottom-full translate-y-2.5 py-1 px-1.5 bg-[#111827] text-xs lg:text-sm text-neutral-400">
          Mint Price Of <span className="text-xs text-blue-500">FCFS</span>
        </span>
        <div className="bg-blue-500/30 text-blue-200 w-fit p-2 rounded-md text-xs lg:text-sm absolute top-2 right-2">
          Total: {maxSupply ? maxSupply : 0} NFTs
        </div>
      </div>
      <div>
        {mintDone ? (
          <span className="leading-none mt-10 font-bold text-red-500 whitespace-nowrap text-sm lg:text-base w-full text-center md:text-left">
            FCFS minting done, switch to Public or the next tab if available.
          </span>
        ) : (
          <>
            {data && Number(data[4]) <= 0 && data[0] === false ? (
              <span className="leading-none mt-10 font-bold text-yellow-500 whitespace-nowrap text-sm lg:text-base w-full text-center md:text-left">
                FCFS minting not started
              </span>
            ) : (
              <span className="leading-none mt-10 font-bold text-green-500 whitespace-nowrap text-sm lg:text-base w-full text-center md:text-left">
                FCFS minting ongoing
              </span>
            )}
          </>
        )}
      </div>

      <div>
        <p className="text-neutral-500 dark:text-neutral-400 text-sm mt-10 mb-1.5">
          Total minted
        </p>
      </div>

      <div className="w-full bg-gray-300 rounded-full dark:bg-gray-700 relative h-[22px] overflow-hidden mt-1">
        <div
          className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full h-full transition-all duration-75"
          style={{
            width: `${percentage * 100}%`,
          }}
        >
          <p className="absolute top-0 right-0 bottom-0 left-0 m-auto p-1.5 text-white transition-all duration-75">
            <b>{percentage * 100}%</b> ({Number(totalSupply)}/{" "}
            {Number(maxSupply)})
          </p>
        </div>
      </div>

      <div className="border-b-[0.3px] border-b-white w-full my-8" />
      <div className="w-full flex justify-center items-center my-5">
        {limit > 1 ? (
          <Input
            value={amountToMint}
            onChange={(e) => setAmountToMint(Number(e.currentTarget.value))}
            placeholder="Enter an Amount"
            className="max-w-[100%] py-5 border-gray-600 rounded-xl px-4 text-center"
          />
        ) : null}
      </div>
      <div>
        {address ? (
          <div>
            {mintDone ? (
              <div>
                <button
                  disabled
                  className="w-full mt-1.5 relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-3 sm:px-6 cursor-not-allowed disabled:bg-opacity-70 bg-red-400 hover:bg-red-700 text-neutral-50 flex-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0"
                >
                  Sold out
                </button>
              </div>
            ) : (
              <>
                {(mintAmount > 0 && mintAmount === limit) ||
                amountToMint + mintAmount > limit ? (
                  <div>
                    <button
                      disabled={true}
                      className="w-full mt-1.5 relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-3 sm:px-6 cursor-pointer disabled:bg-opacity-70 bg-yellow-400 active:bg-yellow-700 disabled:bg-yellow-400 disabled:hover:bg-yellow-700 text-neutral-50 flex-1 delay-75"
                    >
                      Minting Limit Exceeded
                    </button>
                  </div>
                ) : (
                  <>
                    {Number(data[4]) <= 0 && data[0] === false ? (
                      <div>
                        <button
                          disabled={true}
                          className="w-full mt-1.5 relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-3 sm:px-6 cursor-pointer disabled:bg-opacity-70 bg-yellow-400 active:bg-yellow-700 disabled:bg-yellow-400 disabled:hover:bg-yellow-700 text-neutral-50 flex-1 delay-75"
                        >
                          Minting Pending
                        </button>
                      </div>
                    ) : (
                      <div>
                        <button
                          disabled={isPending}
                          onClick={() => callMint()}
                          className="w-full mt-1.5 relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-3 sm:px-6 cursor-pointer disabled:bg-opacity-70 bg-green-400 active:bg-green-700 disabled:bg-red-400 disabled:hover:bg-red-700 text-neutral-50 flex-1 delay-75"
                        >
                          Mint NFT
                        </button>
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        ) : (
          <MintConnect />
        )}
      </div>
    </div>
  );
};

export default Fcfs;
