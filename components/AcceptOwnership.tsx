import { NFTCollection } from "@/config/Abi";
import { useCallback, useEffect } from "react";
import toast from "react-hot-toast";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";

const AcceptOwnership = ({ contract }: { contract: string | any }) => {
  const { data, error, isPending, writeContract } = useWriteContract();
  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    isError,
  } = useWaitForTransactionReceipt({
    hash: data,
  });

  const acceptOwnership = useCallback(() => {
    try {
      writeContract({
        //@ts-ignore
        address: contract,
        abi: NFTCollection,
        //@ts-ignore
        functionName: "acceptOwnership",
        args: [],
      });
    } catch (error) {
      console.log(`Error: ${error}`);
      toast.error("Ownership Acceptance Error");
    }
  }, [contract, writeContract]);
  useEffect(() => {
    if (isConfirmed) {
      toast.success("Ownership Accepted");
    } else if (isPending || isConfirming) {
      const toastId = toast.loading("Accepting Ownership ...");
      setTimeout(() => toast.dismiss(toastId), 2000);
    } else if (isError || error) {
      toast.error("Error Accepting Ownership");
    }
  }, [isConfirming, isConfirmed, isPending, isError, error]);

  return (
    <div className="w-full justify-between items-center mt-10">
      <button
        disabled={isPending}
        onClick={() => acceptOwnership()}
        className="w-full relative h-auto inline-flex items-center justify-center rounded-xl transition-colors text-sm sm:text-base font-medium px-4 py-3 sm:px-6 cursor-pointer disabled:bg-opacity-70 bg-green-500 active:bg-green-700 text-neutral-50 flex-1 delay-75"
      >
        Accept Ownership
      </button>
    </div>
  );
};

export default AcceptOwnership;
