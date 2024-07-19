import { Input } from "@/components/ui/input";
import { contract, provider, testnetProvider } from "@/config";
import { abi, NFTCollection } from "@/config/Abi";
import { isAddress } from "@/helpers/isAddress";
import { useCallback, useMemo, useState, useEffect } from "react";
import { useAccount, useReadContract } from "wagmi";
import { ethers } from "ethers";
import toast, { Toaster } from "react-hot-toast";

const CheckWL = ({ contract }: { contract: string | any }) => {
  const { chainId } = useAccount();
  const [address, setAddress] = useState("");
  const [wl, setWl] = useState(false);
  const [fcf, setFcf] = useState(false);
  const [isGot, setGot] = useState(false);
  const whitelist = useReadContract({
    abi: NFTCollection,
    address: contract,
    functionName: "whitelistPhase",
  });
  const fcfs = useReadContract({
    abi: NFTCollection,
    address: contract,
    functionName: "fcfsPhase",
  });

  const ethersProvider = chainId === 185 ? provider : testnetProvider;
  const Provider = useMemo(
    () => new ethers.JsonRpcProvider(ethersProvider),
    [ethersProvider]
  );
  const callCheck = useCallback(async () => {
    const toastId = toast.loading("Checking Eligibility");
    try {
      const load = async () => {
        const contractI = new ethers.Contract(
          contract,
          NFTCollection,
          Provider
        );
        const first = await contractI.whitelist(address);
        const second = await contractI.fcfsListed(address);
        // @ts-ignore
        setWl(first);
        //@ts-ignore
        setFcf(second);
      };
      await load();
      toast.success("Confirmed", { id: toastId });
      setGot(true);
    } catch (error) {
      console.log(error);
      toast.error("Error Checking Whitelist", { id: toastId });
    }
  }, [Provider, address, contract]);

  useEffect(() => {
    if (isGot) setTimeout(() => setGot(false), 5000);
  }, [isGot]);

  return (
    <div className="flex flex-col items-center mt-5 md:mt-12 lg:mt-12 w-full justify-center min-h-sreen lg:mb-16">
      <Toaster />
      <Input
        onChange={(e) => setAddress(e.currentTarget.value)}
        placeholder="Enter an Address"
        className="max-w-[80%] lg:max-w-96 py-7 border-gray-600 rounded-xl px-4 text-center mt-36"
      />

      <div
        className={`mt-16 text-center ${
          isGot ? "block" : "hidden"
        } transition-all delay-75`}
      >
        You are
        <>
          {/**@ts-ignore */}
          {whitelist?.data[1] ? (
            <>
              {" "}
              <span className={`${wl ? "text-green-500" : "text-red-500"}`}>
                {wl
                  ? "whitelisted for whitelist mint"
                  : "not whitelisted for whitelist mint"}
              </span>
              <br />
              and
              <br />
            </>
          ) : null}
        </>
        <>
          {" "}
          {/**@ts-ignore */}
          {fcfs?.data[1] ? (
            <>
              {" "}
              <span className={`${fcf ? "text-green-500" : "text-red-500"}`}>
                {fcf
                  ? "whitelisted for fcfs mint"
                  : "not whitelisted for fcfs mint"}
              </span>
              <br />
            </>
          ) : null}
        </>
      </div>

      <button
        onClick={() => callCheck()}
        className="w-[80%] mt-6 relative h-auto inline-flex items-center justify-center rounded-2xl transition-colors text-sm sm:text-base font-medium px-4 py-3 sm:px-6 cursor-pointer disabled:bg-opacity-70 bg-green-400 active:bg-green-700 text-neutral-50 flex-1 delay-75"
      >
        Check WL
      </button>
    </div>
  );
};

export default CheckWL;
