import { Input } from "@/components/ui/input";
import { contract } from "@/config";
import { abi } from "@/config/Abi";
import { useState } from "react";
import { useReadContract } from "wagmi";

const CheckWL = () => {
  const Whitelisted = false;

  const [address, setAddress] = useState("");
  const [wl, setWl] = useState(false);
  const [fcf, setFcf] = useState(false);

  const isWhitelisted = useReadContract({
    abi,
    address: contract,
    functionName: "whitelist",
    args: [address],
  });

  const isFCFS = useReadContract({
    abi,
    address: contract,
    functionName: "FCFSMint",
    args: [address],
  });

  // const callCheck = () => {
  //   setWl(wl)
  //   setFcf(fc)
  // }

  return (
    <div className="flex flex-col items-center mt-5 md:mt-16 lg:mt-16 w-full justify-center min-h-sreen lg:mb-20">
      <Input
        placeholder="Enter an Address"
        className="max-w-[80%] lg:max-w-96 py-7 border-gray-600 rounded-xl px-4 text-center mt-36"
      />

      <div
        className={`mt-20 ${Whitelisted ? "text-green-500" : "text-red-500"}`}
      >
        The Address above is {Whitelisted ? "Whitelisted" : "Not Whitelisted"}
      </div>

      <button

        className="w-full mt-1.5 relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-3 sm:px-6 cursor-pointer disabled:bg-opacity-70 bg-green-400 active:bg-green-700 text-neutral-50 flex-1 delay-75"
      >
        Mint NFT
      </button>
    </div>
  );
};

export default CheckWL;
