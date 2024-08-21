import AcceptOwnership from "@/components/AcceptOwnership";
import Nav from "@/components/Header/Nav";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { NFTCollection } from "@/config/Abi";
import { Poppins } from "next/font/google";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  useAccount,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Admin() {
  const { data, error, isPending, writeContract } = useWriteContract();
  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    isError,
  } = useWaitForTransactionReceipt({
    hash: data,
  });
  const { address } = useAccount();
  const router = useRouter();
  const { id } = router.query;

  const pending = useReadContract({
    abi: NFTCollection,
    //@ts-ignore
    address: id,
    functionName: "pendingOwner",
    args: [],
  });

  const owner = useReadContract({
    abi: NFTCollection,
    //@ts-ignore
    address: id,
    functionName: "owner",
    args: [],
  });
  const whitelist = useReadContract({
    abi: NFTCollection,
    //@ts-ignore
    address: id,
    functionName: "whitelistPhase",
  });
  const fcfs = useReadContract({
    abi: NFTCollection,
    //@ts-ignore
    address: id,
    functionName: "fcfsPhase",
  });
  const publics = useReadContract({
    abi: NFTCollection,
    //@ts-ignore
    address: id,
    functionName: "publicPhase",
  });
  const baseUri = useReadContract({
    abi: NFTCollection,
    //@ts-ignore
    address: id,
    functionName: "baseUri",
  });
  const updateNFTContract = useCallback(() => {
    try {
      writeContract({
        //@ts-ignore
        address: id,
        abi: NFTCollection,
        //@ts-ignore
        functionName: "createCollection",
        args: [],
      });
    } catch (error) {
      console.log(`Error: ${error}`);
      toast.error("NFT Update Error");
    }
  }, [id, writeContract]);

  useEffect(() => {
    if (isConfirmed) {
      toast.success("NFT Contract Updated");
    } else if (isPending || isConfirming) {
      const toastId = toast.loading("Updating NFT Contract ...");
      setTimeout(() => toast.dismiss(toastId), 2000);
    } else if (isError || error) {
      toast.error("Error Updating NFT Contract");
    }
  }, [isConfirming, isConfirmed, isPending, isError, error]);
  useEffect(() => {
    if ((address && address !== pending?.data) || owner?.data) {
      // router.push(`/`);
    }
  }, [address, id, router, owner, pending]);
  const [whitelistSwitch, setWhitelistSwitch] = useState(
    //@ts-ignore
    whitelist?.data ? whitelist?.data[1] : false
  );
  const [fcfsSwitch, setFcfsSwitch] = useState(
    //@ts-ignore
    fcfs?.data ? fcfs?.data[1] : false
  );
  const [publicsSwitch, setPublicsSwitch] = useState(
    //@ts-ignore
    publics?.data ? publics?.data[1] : false
  );
  console.log(whitelistSwitch, fcfsSwitch, publicsSwitch);

  return (
    <main
      className={`flex min-h-screen flex-col items-center text-white bg-[#0b0f19] ${font.className} w-full`}
    >
      <Nav />
      <Toaster />
      {(address && address === pending?.data) || address === owner?.data ? (
        <div className="flex w-full justify-center items-center mx-auto flex-col px-4 md:px-6">
          <div className="animation-header3 text-2xl md:text-4xl mt-10 text-center whitespace-nowrap">
            MANAGE AN NFT LAUNCHPAD
          </div>

          {address && address === pending?.data ? (
            <AcceptOwnership contract={id} />
          ) : (
            <div className="w-full bg-[#111827] border border-gray-600 p-5 lg:p-8 rounded-2xl shadow-xl flex flex-col lg:items-center relative mt-6">
              <div className="flex w-full flex-col">
                <div className="w-full flex flex-row justify-between mt-5">
                  {/**@ts-ignore */}
                  {whitelist?.data && whitelist?.data[1] ? (
                    <div className="flex items-center space-x-2">
                      <Switch
                        //@ts-ignore
                        checked={whitelist?.data[1]}
                        onCheckedChange={(e: boolean) =>
                          //@ts-ignore
                          setWhitelistSwitch(e.currentTarget.value)
                        }
                        id="whitelistt"
                        className="border border-gray-600"
                      />
                      <label
                        htmlFor="whitelistt"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Whitelist
                      </label>
                    </div>
                  ) : null}
                  {/**@ts-ignore */}
                  {fcfs?.data && fcfs?.data[1] ? (
                    <div className="flex items-center space-x-2">
                      <Switch id="fcfss" className="border border-gray-600" />
                      <label
                        htmlFor="fcfss"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        FCFS
                      </label>
                    </div>
                  ) : null}
                  {/**@ts-ignore */}
                  {publics?.data && publics?.data[1] ? (
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="publicss"
                        className="border border-gray-600"
                      />
                      <label
                        htmlFor="publicss"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Public
                      </label>
                    </div>
                  ) : null}
                </div>
                <div className="italic text-xs mt-8 flex flex-row">
                  Note: if free mint or the sale stage is not selected you can
                  leave the price field empty
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 items-center w-full gap-5 mt-8">
                  {/**@ts-ignore */}
                  {whitelist?.data && whitelist?.data[1] ? (
                    <Input
                      type="number"
                      className="bg-[#111827] border border-gray-600 focus:border-gray-400 w-full"
                      placeholder="WL Price"
                    />
                  ) : null}
                  {/**@ts-ignore */}
                  {fcfs?.data && fcfs?.data[1] ? (
                    <Input
                      type="number"
                      className="bg-[#111827] border border-gray-600 focus:border-gray-400 w-full"
                      placeholder="FCFS Price"
                    />
                  ) : null}
                  {/**@ts-ignore */}
                  {publics?.data && publics?.data[1] ? (
                    <Input
                      type="number"
                      className="bg-[#111827] border border-gray-600 focus:border-gray-400 w-full"
                      placeholder="Public Price"
                    />
                  ) : null}
                </div>

                <div className="grid grid-cols-1 items-center w-full gap-5 mt-8">
                  <Input
                    className="bg-[#111827] border border-gray-600 focus:border-gray-400 w-full"
                    placeholder="baseURI"
                  />
                </div>

                <div className="w-full justify-between items-center mt-10">
                  <button className="w-full relative h-auto inline-flex items-center justify-center rounded-xl transition-colors text-sm sm:text-base font-medium px-4 py-3 sm:px-6 cursor-pointer disabled:bg-opacity-70 bg-green-500 active:bg-green-700 text-neutral-50 flex-1 delay-75">
                    Update Launchpad
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : null}
    </main>
  );
}
