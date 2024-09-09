import { InformationCircleIcon } from "@heroicons/react/24/outline";
import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import {
  NftContract,
  AirdropContractMainet,
  AirdropContractABI,
} from "@/config/Abi";
import { erc20Abi } from "viem";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { provider, testnetProvider } from "@/config";
import { ethers } from "ethers";
import { DialogUpload } from "./LaunchTabs/DialogUpload";
import { UploadTokens } from "./LaunchTabs/UploadTokens";
import toast, { Toaster } from "react-hot-toast";
import { validateAddresses, validateNumbers } from "@/helpers/validate";

const TokensBanner = () => {
  const { address, chainId } = useAccount();
  const { data, error, isPending, writeContract } = useWriteContract();
  const {
    data: airdrop,
    error: errorAirdrop,
    isPending: ispendingAirdrop,
    writeContract: writeAirdrop,
  } = useWriteContract();

  const [tokenContract, setTokenContract] = useState("");
  const [csvAddresses, setCsvAddresses] = useState<string[]>([]);
  const [csvAmounts, setcsvAmounts] = useState<number[]>([]);
  const [addresses, setAddresses] = useState("");
  const [numbers, setNumbers] = useState(0);
  const [amounts, setAmounts] = useState("");
  const [error1, setError1] = useState(false);
  const [error2, setError2] = useState(false);
  const [errorAmount, setErrorAmount] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [errorIds, setErrorIds] = useState(false);
  const [amtSwitch, setAmtSwitch] = useState(false);
  const [inputSwitch, setInputSwitch] = useState(false);
  const [balance, setBalance] = useState<BigInt>(BigInt(0));
  const [selectOption, setSelectOption] = useState(false);

  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    isError,
  } = useWaitForTransactionReceipt({
    hash: data,
  });

  const {
    isLoading: isConfirmingAirdrop,
    isSuccess: isConfirmedAirdrop,
    isError: isErrorAirdrop,
  } = useWaitForTransactionReceipt({
    hash: airdrop,
  });

  useEffect(() => {
    if (isConfirmed) {
      toast.success("Tokens approved");
    } else if (isPending || isConfirming) {
      const toastId = toast.loading("Approving tokens for airdrop ...");
      setTimeout(() => toast.dismiss(toastId), 2500);
    } else if (isError || error) {
      toast.error("Error approving tokens");
    }
  }, [isConfirming, isConfirmed, isPending, isError, error]);

  useEffect(() => {
    if (isConfirmedAirdrop) {
      toast.success("Tokens Airdropped");
    } else if (ispendingAirdrop || isConfirmingAirdrop) {
      const toastId = toast.loading("Airdropping Tokens ...");
      setTimeout(() => toast.dismiss(toastId), 2500);
    } else if (errorAirdrop || isErrorAirdrop) {
      toast.error("Error Airdropping Tokens");
    }
  }, [
    isConfirmingAirdrop,
    isConfirmedAirdrop,
    ispendingAirdrop,
    isErrorAirdrop,
    errorAirdrop,
  ]);

  const callApprove = () => {
    const amount = parseInt(String(balance)) === 0 ? BigInt(1e50) : balance;

    if (tokenContract) {
      writeContract({
        abi: erc20Abi,
        //@ts-ignore
        address: tokenContract,
        functionName: "approve",
        args: [
          //@ts-ignore
          AirdropContractMainet,
          //@ts-ignore
          amount,
        ],
      });
    } else {
      toast.error("no or invalid token contract entered");
    }
  };

  const callAirdrop = () => {
    try {
      if (tokenContract) {
        setError1(false);
        setError2(false);
        setErrorIds(false);

        const addies = validateAddresses(addresses);
        const perAmounts = validateNumbers(amounts);
        if (inputSwitch) {
          const _result = csvAddresses.map((address, index) => {
            return [address, csvAmounts[index]];
          });
          writeAirdrop({
            abi: AirdropContractABI,
            //@ts-ignore
            address: AirdropContractMainet,
            functionName: "airdropSequentialWithBatch",
            args: [tokenContract, address, _result],
          });
        } else {
          if (addies && addies?.length > 0) {
            if (!amtSwitch) {
              if (perAmounts && perAmounts.length > 0) {
                if (addies.length === perAmounts.length) {
                  const _result = addies.map((address, index) => {
                    return {
                      recipient: address,
                      amount: perAmounts[index],
                    };
                  });
                  const _contents = _result.map((content) => {
                    return [content.recipient, content.amount];
                  });
                  writeAirdrop({
                    abi: AirdropContractABI,
                    //@ts-ignore
                    address: AirdropContractMainet,
                    functionName: "airdropSequentialWithBatch",
                    args: [tokenContract, address, _contents],
                  });
                } else {
                  setErrorIds(true);
                  setError1(true);
                  toast.error("The amounts are not equal to the addresses");
                }
              } else {
                setError1(true);
                setErrorIds(true);
                toast.error(`No or Invalid number(s) detected`);
              }
            } else {
              if (numbers && numbers > 0) {
                const _input: [string | number][] = [];
                addies.forEach((address: any) => {
                  //@ts-ignore
                  _input.push([address, numbers]);
                });
                writeAirdrop({
                  abi: AirdropContractABI,
                  //@ts-ignore
                  address: AirdropContractMainet,
                  functionName: "airdropSequentialWithBatch",
                  args: [tokenContract, address, _input],
                });
              } else {
                setError1(true);
                setErrorIds(true);
                toast.error(`No or Invalid number value detected`);
              }
            }
          } else {
            setError1(true);
            setErrorIds(true);
            toast.error(`No or Invalid address(es) detected`);
          }
        }
      } else {
        toast.error("Please provide a token contract address");
      }
    } catch (error) {
      console.log(error);
      toast.error(`Error Airdropping Tokens`);
    }
  };
  useEffect(() => {
    const fetchApproval = async () => {
      if (tokenContract) {
        const ethersProvider = chainId === 185 ? provider : testnetProvider;
        const Provider = new ethers.JsonRpcProvider(ethersProvider);
        const contract = new ethers.Contract(tokenContract, erc20Abi, Provider);
        // await Promise.all()
        const balance = await contract.balanceOf(address);
        const approvale = await contract.allowance(
          address,
          AirdropContractMainet
        );
        setBalance(BigInt(balance));
        if (
          parseInt(approvale) > 0 &&
          parseInt(approvale) >= parseInt(balance)
        ) {
          setIsApproved(true);
        } else {
          setIsApproved(false);
        }
      }
    };
    if (tokenContract) {
      fetchApproval();
    }
  }, [chainId, tokenContract, address]);
  const clearCsv = () => {
    setCsvAddresses([]);
    setcsvAmounts([]);
  };

  return (
    <div className="h-full mt-10 mb-10 container w-full px-3.5">
      <div className="bg-[#111827] border border-gray-600 p-5 lg:p-8 rounded-2xl shadow-xl flex flex-col lg:items-center relative">
        <div className="w-full justify-center items-center flex text-center font-extrabold text-neutral-400 text-sm lg:text-xl">
          Manage Airdrops / Free Minting
          <InformationCircleIcon className="text-neutral-400 w-5 md:w-6 ml-2" />
        </div>
        <Toaster />
        <div className="text-xs md:text-base text-center w-full mt-5">
          Airdroping Tokens (excluding gas) to different wallets, e.g. airdrop
          winners, sweepstakes winners, send to your colleagues for free...
          upload a list of addresses and the amount of tokens that correspond to
          them,
        </div>
        <div className="w-full mt-10">
          <Input
            onChange={(e) => setTokenContract(e.currentTarget.value)}
            placeholder="Token Contract"
          />
        </div>
        <div className="mt-10 flex flex-col space-y-5 items-center justify-center">
          <div className="w-full flex flex-row space-x-8 items-center">
            <DialogUpload
              adde={addresses}
              amtArr={amounts}
              setAddresses={setAddresses}
              setAmount={setAmounts}
              setNumber={setNumbers}
              amtSwitch={amtSwitch}
              setAmtSwitch={setAmtSwitch}
              clear={clearCsv}
              switchInput={setInputSwitch}
              error={error1}
              setError={setError1}
            />
            <div className="text-lg">OR</div>
            <UploadTokens
              addresses={csvAddresses}
              setAddresses={setCsvAddresses}
              amounts={csvAmounts}
              setAmounts={setcsvAmounts}
              resetAddress={setAddresses}
              resetAmount={setAmounts}
              error={error2}
              switchInput={setInputSwitch}
              setError={setError2}
            />
          </div>
          {isApproved ? (
            <button
              onClick={() => callAirdrop()}
              className="w-full relative h-auto inline-flex items-center justify-center rounded-xl transition-colors text-sm sm:text-base font-medium px-4 py-3 sm:px-6 cursor-pointer disabled:bg-opacity-70 bg-red-500 active:bg-red-700 text-neutral-50 flex-1 delay-75"
            >
              Airdrop
            </button>
          ) : (
            <button
              onClick={() => callApprove()}
              className="w-full relative h-auto inline-flex items-center justify-center rounded-xl transition-colors text-sm sm:text-base font-medium px-4 py-3 sm:px-6 cursor-pointer disabled:bg-opacity-70 bg-red-500 active:bg-red-700 text-neutral-50 flex-1 delay-75"
            >
              Approve Tokens
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TokensBanner;
