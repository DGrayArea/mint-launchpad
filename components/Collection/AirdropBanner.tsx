import {
  AirdropContract,
  AirdropContractABI,
  NFTCollection,
} from "@/config/Abi";
import {
  validateAddresses,
  validateNumbers,
  validateTokenIds,
} from "@/helpers/validate";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { Input } from "../ui/input";
import { DialogTab } from "./LaunchTabs/DialogTab";
import { Upload } from "./LaunchTabs/Upload";
import { DialogMintedTab } from "./LaunchTabs/minted/DialogMintedTab";
import { UploadMinted } from "./LaunchTabs/minted/UploadMinted";
import { ArrowLeftCircleIcon } from "@heroicons/react/16/solid";

const AirdropBanner = () => {
  const { address } = useAccount();
  const { data, error, isPending, writeContract } = useWriteContract();
  const {
    data: airdrop,
    error: errorAirdrop,
    isPending: ispendingAirdrop,
    writeContract: writeAirdrop,
  } = useWriteContract();

  const [csvAddresses, setCsvAddresses] = useState<string[]>([]);
  const [csvAmounts, setcsvAmounts] = useState<number[]>([]);
  const [nftContract, setNftContract] = useState("");
  const [addresses, setAddresses] = useState("");
  const [numbers, setNumbers] = useState(0);
  const [amounts, setAmounts] = useState("");
  const [errordd, setErrorAdd] = useState(false);
  const [errorIds, setErrorIds] = useState(false);
  const [amtSwitch, setAmtSwitch] = useState(false);
  const [isApproved, setIsApproved] = useState(true);
  const [inputSwitch, setInputSwitch] = useState(false);
  const [isMintable, setIsMintable] = useState(true);
  const [selectOption, setSelectOption] = useState(false);
  const [errorIdInpt, setErrorIdInpt] = useState(false);
  const [tokenIds, setTokenIds] = useState("");
  const [invalidLength, setInvalidLength] = useState(false);

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
  //@todo set approval
  useEffect(() => {
    if (isConfirmed) {
      toast.success("NFTs approved");
    } else if (isPending || isConfirming) {
      const toastId = toast.loading("Approving NFTs for airdrop ...");
      setTimeout(() => toast.dismiss(toastId), 2500);
    } else if (isError || error) {
      toast.error("Error approving NFTs");
    }
  }, [isConfirming, isConfirmed, isPending, isError, error]);

  useEffect(() => {
    if (isConfirmedAirdrop) {
      toast.success("NFTs Airdropped");
    } else if (ispendingAirdrop || isConfirmingAirdrop) {
      const toastId = toast.loading("Airdropping NFTs ...");
      setTimeout(() => toast.dismiss(toastId), 2500);
    } else if (errorAirdrop || isErrorAirdrop) {
      toast.error("Error Airdropping NFTs");
    }
  }, [
    isConfirmingAirdrop,
    isConfirmedAirdrop,
    ispendingAirdrop,
    isErrorAirdrop,
    errorAirdrop,
  ]);

  const callApprove = () => {
    writeContract({
      abi: NFTCollection,
      //@ts-ignore
      address: nftContract,
      functionName: "setApprovalForAll",
      args: [AirdropContract, true],
    });
  };

  const callAirdrop = () => {
    setErrorIdInpt(false);
    setErrorAdd(false);
    setErrorIds(false);
    setInvalidLength(false);

    try {
      if (nftContract) {
        if (isMintable) {
          const addies = validateAddresses(addresses);
          const perAmounts = validateNumbers(amounts);
          if (inputSwitch) {
            const _result = csvAddresses.map((address, index) => {
              return [address, csvAmounts[index]];
            });
            const _content: [string | number][] = [];
            _result.forEach(([address, count]: any[]) => {
              for (let i = 0; i < count; i++) {
                //@ts-ignore
                _content.push([address, 1]);
              }
            });
            writeAirdrop({
              abi: NFTCollection,
              //@ts-ignore
              address: nftContract,
              functionName: "airdropSequentialWithBatch",
              args: [_content, 80],
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
                    const _content: [string | number][] = [];
                    const tokenArr: [string | number][] = [];
                    _contents.forEach(([address, count]: any[]) => {
                      for (let i = 0; i < count; i++) {
                        //@ts-ignore
                        _content.push([address, 1]);
                      }
                    });

                    if (_content.length > 0) {
                      _content.forEach(([address]: any[], i) => {
                        //@ts-ignore
                        tokenArr.push([address, 1]);
                      });
                      writeAirdrop({
                        abi: NFTCollection,
                        //@ts-ignore
                        address: nftContract,
                        functionName: "airdropSequentialWithBatch",
                        args: [tokenArr, 80],
                      });
                    } else {
                      setErrorAdd(true);
                      toast.error(`The addresses should not be empty`);
                    }
                  }
                } else {
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
                  const _content: [string | number][] = [];
                  const tokenArr: [string | number][] = [];
                  _input.forEach(([address, count]: any[]) => {
                    for (let i = 0; i < count; i++) {
                      //@ts-ignore
                      _content.push([address, 1]);
                    }
                  });

                  if (_content.length > 0) {
                    _content.forEach(([address]: any[], i) => {
                      //@ts-ignore
                      tokenArr.push([address, 1]);
                    });
                    writeAirdrop({
                      abi: NFTCollection,
                      //@ts-ignore
                      address: nftContract,
                      functionName: "airdropSequentialWithBatch",
                      args: [tokenArr, 80],
                    });
                  } else {
                    setErrorAdd(true);
                    toast.error(`The addresses should not be empty`);
                  }
                } else {
                  setErrorIds(true);
                  toast.error(`No or Invalid number value detected`);
                }
              }
            } else {
              setErrorAdd(true);
              toast.error(`No or Invalid address(es) detected`);
            }
          }
        } else {
          const addies = validateAddresses(addresses);
          const perAmounts = validateNumbers(amounts);
          const { validNumbers: tokenIdse, duplicate } =
            validateTokenIds(tokenIds);

          if (duplicate.size > 0) {
            setErrorIds(true);
            toast.error(
              `Diplicate tokenId(s) found at Id(s) ${Array.from(duplicate).join(
                ", "
              )}`
            );
            throw new Error();
          }
          if (tokenIdse.length > 0) {
            if (inputSwitch) {
              const _result = csvAddresses.map((address, index) => {
                return [address, csvAmounts[index]];
              });

              const _content: [string | number][] = [];
              const tokenArr: [string | number][] = [];
              _result.forEach(([address, count]: any[]) => {
                for (let i = 0; i < count; i++) {
                  //@ts-ignore
                  _content.push([address, 1]);
                }
              });

              if (_content.length == tokenIdse.length) {
                _content.forEach(([address]: any[], i) => {
                  //@ts-ignore
                  tokenArr.push([address, tokenIdse[i]]);
                });
                writeAirdrop({
                  abi: AirdropContractABI,
                  //@ts-ignore
                  address: AirdropContractMainet,
                  functionName: "airdropERC721",
                  args: [nftContract, address, tokenArr],
                });
              } else {
                setInvalidLength(true);
                setErrorIds(true);
                toast.error(
                  "The tokenId(s) length does not match the total count of NFTS to be airdropped"
                );
              }
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
                      const _input: [string | number][] = [];
                      const tokenArr: [string | number][] = [];
                      _contents.forEach(([address, count]: any[]) => {
                        for (let i = 0; i < count; i++) {
                          //@ts-ignore
                          _input.push([address, 1]);
                        }
                      });
                      if (_input.length == tokenIdse.length) {
                        _input.forEach(([address]: any[], i) => {
                          //@ts-ignore
                          tokenArr.push([address, tokenIdse[i]]);
                        });
                        writeAirdrop({
                          abi: AirdropContractABI,
                          //@ts-ignore
                          address: AirdropContractMainet,
                          functionName: "airdropERC721",
                          args: [nftContract, address, tokenArr],
                        });
                      } else {
                        setInvalidLength(true);
                        setErrorIds(true);
                        toast.error(
                          "The tokenId(s) length does not match the total count of NFTS to be airdropped"
                        );
                      }
                    } else {
                      setErrorIds(true);
                      toast.error(
                        `The Amounts and addresses are not equal in length`
                      );
                    }
                  } else {
                    setErrorIds(true);
                    toast.error(`No or Invalid number(s) detected`);
                  }
                } else {
                  if (numbers && numbers > 0) {
                    const _input: [string | number][] = [];
                    const tokenArr: [string | number][] = [];
                    addies.forEach((address: any) => {
                      for (let i = 0; i < numbers; i++) {
                        //@ts-ignore
                        _input.push([address, 1]);
                      }
                    });
                    if (_input.length == tokenIdse.length) {
                      _input.forEach(([address]: any[], i) => {
                        //@ts-ignore
                        tokenArr.push([address, tokenIdse[i]]);
                      });
                      writeAirdrop({
                        abi: AirdropContractABI,
                        //@ts-ignore
                        address: AirdropContractMainet,
                        functionName: "airdropERC721",
                        args: [nftContract, address, tokenArr],
                      });
                    } else {
                      setInvalidLength(true);
                      setErrorIds(true);
                      toast.error(
                        "The tokenId(s) length does not match the total count of NFTS to be airdropped"
                      );
                    }
                  } else {
                    setErrorIds(true);
                    toast.error(`No or Invalid number value detected`);
                  }
                }
              } else {
                setErrorAdd(true);
                toast.error(`No or Invalid address(es) detected`);
              }
            }
          } else {
            setErrorIdInpt(true);
            toast.error(`No or Invalid tokenId(s) detected`);
          }
        }
      } else {
        toast.error("Please enter the NFT contract");
        throw new Error();
      }
    } catch (error) {
      console.log(error);
      toast.error(`Error Airdropping NFTs`);
    }
  };
  const clearCsv = () => {
    setCsvAddresses([]);
    setcsvAmounts([]);
  };

  return (
    <div className="h-full mt-10 mb-10 container w-full px-3.5">
      {selectOption ? (
        <div className="w-full relative">
          <div
            className="my-8 cursor-pointer"
            onClick={() => setSelectOption(false)}
          >
            <ArrowLeftCircleIcon className="w-10" />
          </div>
          {isMintable ? (
            <div className="bg-[#111827] border border-gray-600 p-5 lg:p-8 rounded-2xl shadow-xl flex flex-col lg:items-center relative transition-all">
              <div className="w-full justify-center items-center flex text-center font-extrabold text-neutral-400 text-sm lg:text-xl">
                Manage Airdrops / Mintable NFTs (Punk Pad)
                <InformationCircleIcon className="text-neutral-400 w-5 md:w-6 ml-2" />
              </div>
              <Toaster />
              <div className="text-xs md:text-base text-center w-full mt-5">
                Airdroping NFTs (excluding gas), from unminted contracts
                launched on Punk Pad to different wallets e.g. airdrop winners,
                sweepstakes winners, send to your colleagues for free...
                Airdrops can be sent regardless of the current collection Phase.
                upload a list of addresses and the amount of NFTs that
                correspond to them,
              </div>
              <div className="w-full mt-10">
                <Input
                  onChange={(e) => setNftContract(e.currentTarget.value)}
                  placeholder="NFT Contract"
                />
              </div>

              <div className="mt-10 flex flex-row space-x-5 items-center justify-center">
                <DialogTab
                  adde={addresses}
                  amtArr={amounts}
                  setAddresses={setAddresses}
                  setAmount={setAmounts}
                  setNumber={setNumbers}
                  errordd={errordd}
                  errorIds={errorIds}
                  amtSwitch={amtSwitch}
                  setAmtSwitch={setAmtSwitch}
                  clear={clearCsv}
                  switchInput={setInputSwitch}
                  setErrorAdd={setErrorAdd}
                  setErrorIds={setErrorIds}
                />
                <Upload
                  addresses={csvAddresses}
                  setAddresses={setCsvAddresses}
                  amounts={csvAmounts}
                  setAmounts={setcsvAmounts}
                  resetAddress={setAddresses}
                  resetAmount={setAmounts}
                  switchInput={setInputSwitch}
                />

                {/* <button className="w-full relative h-auto inline-flex items-center justify-center rounded-xl transition-colors text-sm sm:text-base font-medium px-4 py-3 sm:px-6 cursor-pointer disabled:bg-opacity-70 bg-green-500 active:bg-green-700 text-neutral-50 flex-1 delay-75">
            Add Addresses
          </button> */}
              </div>
              <div className="mt-10 flex flex-row space-x-5 items-center justify-center">
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
                    Set Approval For all
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-[#111827] border border-gray-600 p-5 lg:p-8 rounded-2xl shadow-xl flex flex-col lg:items-center relative transition-all">
              <div className="w-full justify-center items-center flex text-center font-extrabold text-neutral-400 text-sm lg:text-xl">
                Manage Airdrops / Already minted NFTs
                <InformationCircleIcon className="text-neutral-400 w-5 md:w-6 ml-2" />
              </div>
              <Toaster />
              <div className="text-xs md:text-base text-center w-full mt-5">
                Airdroping NFTs (excluding gas) already minted to different
                wallets, e.g. airdrop winners, sweepstakes winners, send to your
                colleagues for free... Airdrops can be sent regardless of the
                current collection Phase. upload a list of addresses and the
                amount of NFTs that correspond to them,
              </div>
              <div className="w-full mt-10">
                <Input
                  onChange={(e) => setNftContract(e.currentTarget.value)}
                  placeholder="NFT Contract"
                />
              </div>

              <div className="mt-10 flex flex-row space-x-5 items-center justify-center">
                <DialogMintedTab
                  adde={addresses}
                  amtArr={amounts}
                  setAddresses={setAddresses}
                  setAmount={setAmounts}
                  setNumber={setNumbers}
                  errordd={errordd}
                  errorIds={errorIds}
                  amtSwitch={amtSwitch}
                  setAmtSwitch={setAmtSwitch}
                  clear={clearCsv}
                  switchInput={setInputSwitch}
                  setErrorAdd={setErrorAdd}
                  setErrorIds={setErrorIds}
                  setTokenIds={setTokenIds}
                  ids={tokenIds}
                  errorIdInpt={errorIdInpt}
                />
                <UploadMinted
                  addresses={csvAddresses}
                  setAddresses={setCsvAddresses}
                  amounts={csvAmounts}
                  setAmounts={setcsvAmounts}
                  resetAddress={setAddresses}
                  resetAmount={setAmounts}
                  switchInput={setInputSwitch}
                  errorIdInpt={errorIdInpt}
                  setTokenIds={setTokenIds}
                  ids={tokenIds}
                />

                {/* <button className="w-full relative h-auto inline-flex items-center justify-center rounded-xl transition-colors text-sm sm:text-base font-medium px-4 py-3 sm:px-6 cursor-pointer disabled:bg-opacity-70 bg-green-500 active:bg-green-700 text-neutral-50 flex-1 delay-75">
    Add Addresses
  </button> */}
              </div>
              <div className="mt-10 flex flex-row space-x-5 items-center justify-center">
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
                    Set Approval For all
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col md:flex-row items-center justify-center w-full space-y-6 md:space-y-0 md:space-x-8 text-sm transition-all">
          <div
            onClick={() => {
              setSelectOption(true);
              setIsMintable(true);
            }}
            className="bg-[#111827] border border-gray-600 p-5 lg:p-8 rounded-2xl shadow-xl flex flex-col lg:items-center relative transition-transform duration-300 transform hover:scale-110 cursor-pointer max-w-96 min-h-24 whitespace-nowrap"
          >
            Airdrop unminted NFTS launched on Punk Pad.
          </div>
          <div
            onClick={() => {
              setSelectOption(true);
              setIsMintable(false);
            }}
            className="bg-[#111827] border border-gray-600 p-5 lg:p-8 rounded-2xl shadow-xl flex flex-col lg:items-center relative transition-transform duration-300 transform hover:scale-110 cursor-pointer min-w-full md:min-w-96 min-h-24 whitespace-nowrap"
          >
            Airdrop already minted NFTS.
          </div>
        </div>
      )}
    </div>
  );
};

export default AirdropBanner;
