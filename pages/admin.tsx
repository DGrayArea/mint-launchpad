import Nav from "@/components/Header/Nav";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { LaunchpadFactoryABI, LaunchpadFactoryContract } from "@/config/Abi";
import { MetadataParamsType, NftDataType, SaleParamsType } from "@/types";
import { Poppins } from "next/font/google";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import toast, { Toaster } from "react-hot-toast";

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

  const [whitelistSale, setWhitelistSale] = useState({
    isActive: false,
    limit: 0,
    price: 0,
  });
  const [fcfsSale, setFcfsSale] = useState({
    isActive: false,
    limit: 0,
    price: 0,
  });
  const [publicSale, setPublicSale] = useState({
    isActive: true,
    limit: 0,
    price: 0,
  });
  const [metadata, setMetadata] = useState({
    name: "",
    symbol: "",
    baseUri: "",
  });
  const [socials, setSocials] = useState({
    website: "",
    x: "",
    telegram: "",
    discord: "",
  });
  const [media, setMedia] = useState({
    logoUri: "",
    backgroundUri: "",
  });
  const [creator, setCreator] = useState("");
  const [maxSupply, setMaxSupply] = useState(0);
  const isFreeMint = useMemo(() => {
    return whitelistSale.price || fcfsSale.price || publicSale.price !== 0
      ? false
      : true;
  }, [whitelistSale, fcfsSale, publicSale]);
  // https://ipfs.io/ipfs/QmXWLrvd3FQEFuLN64qmAFyTWV2vy8KiMCrBB4WbTX1JnK/1.png
  useEffect(() => {
    if (isConfirmed) {
      toast.success("Launchpad Created");
    } else if (isPending || isConfirming) {
      const toastId = toast.loading("Creating Launchpad ...");
      setTimeout(() => toast.dismiss(toastId), 2000);
    } else if (isError || error) {
      toast.error("Error Creating Launchpad");
    }
  }, [isConfirming, isConfirmed, isPending, isError, error]);

  const handleGet = useCallback(async () => {
    const metadataParams: MetadataParamsType = {
      name: metadata.name,
      symbol: metadata.symbol,
      initBaseURI: metadata.baseUri,
    };
    const saleParams: SaleParamsType = {
      whitelistLimit: whitelistSale.limit,
      publicLimit: publicSale.limit,
      fcfsLimit: fcfsSale.limit,
      whitelistPrice: String(Number(BigInt(whitelistSale.price * 1e18))),
      publicPrice: String(Number(BigInt(publicSale.price * 1e18))),
      fcfsPrice: String(Number(BigInt(fcfsSale.price * 1e18))),
      isWlActive: whitelistSale.isActive,
      isPublicActive: publicSale.isActive,
      isFcfsActive: fcfsSale.isActive,
    };
    const nftData: NftDataType = {
      website: socials.website,
      x: socials.x,
      telegram: socials.telegram,
      discord: socials.discord,
      logoUri: media.logoUri,
      backgroundUri: media.backgroundUri,
    };

    try {
      writeContract({
        address: LaunchpadFactoryContract,
        abi: LaunchpadFactoryABI,
        //@ts-ignore
        functionName: "createCollection",
        args: [
          [
            metadataParams.name,
            metadataParams.symbol,
            metadataParams.initBaseURI,
          ],
          [
            saleParams.whitelistLimit,
            saleParams.publicLimit,
            saleParams.fcfsLimit,
            saleParams.whitelistPrice,
            saleParams.publicPrice,
            saleParams.fcfsPrice,
            saleParams.isWlActive,
            saleParams.isPublicActive,
            saleParams.isFcfsActive,
          ],
          [
            nftData.website,
            nftData.x,
            nftData.telegram,
            nftData.discord,
            nftData.logoUri,
            nftData.backgroundUri,
          ],
          isFreeMint,
          maxSupply,
          creator,
        ],
      });
    } catch (error) {
      console.log(`Error: ${error}`);
    }
    setWhitelistSale({
      isActive: false,
      limit: 0,
      price: 0,
    });
    setFcfsSale({
      isActive: false,
      limit: 0,
      price: 0,
    });
    setPublicSale({
      isActive: false,
      limit: 0,
      price: 0,
    });
    setMetadata({
      name: "",
      symbol: "",
      baseUri: "",
    });
    setSocials({
      website: "",
      x: "",
      telegram: "",
      discord: "",
    });
    setMedia({
      logoUri: "",
      backgroundUri: "",
    });
    setMaxSupply(0);
    setCreator("");
  }, [
    writeContract,
    metadata,
    whitelistSale,
    fcfsSale,
    publicSale,
    socials,
    media,
    isFreeMint,
    maxSupply,
    creator,
  ]);

  return (
    <main
      className={`flex min-h-screen flex-col items-center text-white bg-[#0b0f19] ${font.className} w-full`}
    >
      <Nav />
      <div className="flex w-full justify-center items-center mx-auto flex-col px-4 md:px-6 pb-20">
        <div className="animation-header3 text-2xl md:text-4xl mt-10 text-center whitespace-nowrap">
          CREATE AN NFT LAUNCHPAD
        </div>
        <Toaster />
        <div className="w-full bg-[#111827] border border-gray-600 p-5 lg:p-8 rounded-2xl shadow-xl flex flex-col lg:items-center relative mt-6">
          <div className="flex w-full flex-col">
            <div className="grid grid-cols-2 md:grid-cols-3 items-center w-full gap-5">
              <Input
                onChange={(e) =>
                  setMetadata((prev) => ({
                    ...prev,
                    name: e.currentTarget.value,
                  }))
                }
                className="bg-[#111827] border border-gray-600 focus:border-gray-400 w-full"
                placeholder="Collection name"
              />
              <Input
                onChange={(e) =>
                  setMetadata((prev) => ({
                    ...prev,
                    symbol: e.currentTarget.value,
                  }))
                }
                className="bg-[#111827] border border-gray-600 focus:border-gray-400 w-full"
                placeholder="Collection Symbol"
              />
              <Input
                onChange={(e) => setMaxSupply(Number(e.currentTarget.value))}
                type="number"
                className="bg-[#111827] border border-gray-600 focus:border-gray-400 w-full"
                placeholder="Collection Supply"
              />
            </div>
            <div className="w-full flex flex-row justify-between mt-10">
              <div className="flex items-center space-x-2">
                <Switch
                  id="whitelist"
                  className="border border-gray-600"
                  checked={whitelistSale.isActive}
                  onCheckedChange={(e: boolean) =>
                    setWhitelistSale((prev) => ({ ...prev, isActive: e }))
                  }
                />
                <label
                  htmlFor="whitelist"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Whitelist Sale
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={fcfsSale.isActive}
                  onCheckedChange={(e: boolean) =>
                    setFcfsSale((prev) => ({ ...prev, isActive: e }))
                  }
                  id="fcfs"
                  className="border border-gray-600"
                />
                <label
                  htmlFor="fcfs"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  FCFS Sale
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={publicSale.isActive}
                  onCheckedChange={(e: boolean) =>
                    setPublicSale((prev) => ({ ...prev, isActive: e }))
                  }
                  id="public"
                  className="border border-gray-600"
                />
                <label
                  htmlFor="public"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Public Sale
                </label>
              </div>
            </div>
            <div className="italic text-xs mt-8 flex flex-row">
              Note: if free mint or the sale stage is not selected you can leave
              the price field empty, prices also in ether
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 items-center w-full gap-5 mt-8 transition-all ease-in-out delay-100">
              {whitelistSale.isActive ? (
                <Input
                  onChange={(e) =>
                    setWhitelistSale((prev) => ({
                      ...prev,
                      price: Number(e.currentTarget.value),
                    }))
                  }
                  type="number"
                  className="bg-[#111827] border border-gray-600 focus:border-gray-400 w-full transition-all ease-in-out delay-100"
                  placeholder="WL Price"
                />
              ) : (
                false
              )}
              {fcfsSale.isActive ? (
                <Input
                  onChange={(e) =>
                    setFcfsSale((prev) => ({
                      ...prev,
                      price: Number(e.currentTarget.value),
                    }))
                  }
                  type="number"
                  className="bg-[#111827] border border-gray-600 focus:border-gray-400 w-full transition-all ease-in-out delay-100"
                  placeholder="FCFS Price"
                />
              ) : (
                false
              )}

              {publicSale.isActive ? (
                <Input
                  onChange={(e) =>
                    setPublicSale((prev) => ({
                      ...prev,
                      price: Number(e.currentTarget.value),
                    }))
                  }
                  type="number"
                  className="bg-[#111827] border border-gray-600 focus:border-gray-400 w-full transition-all ease-in-out delay-100"
                  placeholder="Public Price"
                />
              ) : (
                false
              )}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 items-center w-full gap-5 mt-8 transition-all ease-in-out delay-100">
              {whitelistSale.isActive ? (
                <Input
                  onChange={(e) =>
                    setWhitelistSale((prev) => ({
                      ...prev,
                      limit: Number(e.currentTarget.value),
                    }))
                  }
                  type="number"
                  className="bg-[#111827] border border-gray-600 focus:border-gray-400 w-full transition-all ease-in-out delay-100"
                  placeholder="WL Limit"
                />
              ) : (
                false
              )}
              {fcfsSale.isActive ? (
                <Input
                  onChange={(e) =>
                    setFcfsSale((prev) => ({
                      ...prev,
                      limit: Number(e.currentTarget.value),
                    }))
                  }
                  type="number"
                  className="bg-[#111827] border border-gray-600 focus:border-gray-400 w-full transition-all ease-in-out delay-100"
                  placeholder="FCFS Limit"
                />
              ) : (
                false
              )}

              {publicSale.isActive ? (
                <Input
                  onChange={(e) =>
                    setPublicSale((prev) => ({
                      ...prev,
                      limit: Number(e.currentTarget.value),
                    }))
                  }
                  type="number"
                  className="bg-[#111827] border border-gray-600 focus:border-gray-400 w-full transition-all ease-in-out delay-100"
                  placeholder="Public Limit"
                />
              ) : (
                false
              )}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 items-center w-full gap-5 mt-8">
              <Input
                onChange={(e) =>
                  setMetadata((prev) => ({
                    ...prev,
                    baseUri: e.currentTarget.value,
                  }))
                }
                className="bg-[#111827] border border-gray-600 focus:border-gray-400 w-full"
                placeholder="baseURI"
              />
              <Input
                onChange={(e) => setCreator(e.currentTarget.value)}
                className="bg-[#111827] border border-gray-600 focus:border-gray-400 w-full"
                placeholder="Contract Creator"
              />
            </div>
            <div className="text-xs mt-8 flex flex-col">
              Enter socials:
              <br />
              <div className="italic text-xs mt-2 flex flex-row">
                Note: if any social account is not available feel free to leave
                the field empty
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 items-center w-full gap-5 mt-8">
              <Input
                onChange={(e) =>
                  setSocials((prev) => ({
                    ...prev,
                    website: e.currentTarget.value,
                  }))
                }
                className="bg-[#111827] border border-gray-600 focus:border-gray-400 w-full"
                placeholder="Website"
              />
              <Input
                onChange={(e) =>
                  setSocials((prev) => ({ ...prev, x: e.currentTarget.value }))
                }
                className="bg-[#111827] border border-gray-600 focus:border-gray-400 w-full"
                placeholder="X"
              />
              <Input
                onChange={(e) =>
                  setSocials((prev) => ({
                    ...prev,
                    telegram: e.currentTarget.value,
                  }))
                }
                className="bg-[#111827] border border-gray-600 focus:border-gray-400 w-full"
                placeholder="Telegram"
              />
              <Input
                onChange={(e) =>
                  setSocials((prev) => ({
                    ...prev,
                    discord: e.currentTarget.value,
                  }))
                }
                className="bg-[#111827] border border-gray-600 focus:border-gray-400 w-full"
                placeholder="Discord"
              />
            </div>
            <div className="text-xs mt-8 flex flex-col">Upload Media:</div>
            <div className="grid grid-cols-2 md:grid-cols-3 items-center w-full gap-5 mt-8">
              {/* <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="picture">Logo</Label>
                <Input id="picture" type="file" />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="picture">Background</Label>
                <Input id="picture" type="file" />
              </div> */}
              <Input
                onChange={(e) =>
                  setMedia((prev) => ({
                    ...prev,
                    logoUri: e.currentTarget.value,
                  }))
                }
                className="bg-[#111827] border border-gray-600 focus:border-gray-400 w-full"
                placeholder="Logo/Gif Uri"
              />
              <Input
                onChange={(e) =>
                  setMedia((prev) => ({
                    ...prev,
                    backgroundUri: e.currentTarget.value,
                  }))
                }
                className="bg-[#111827] border border-gray-600 focus:border-gray-400 w-full"
                placeholder="Banner Uri"
              />
            </div>

            <div className="w-full justify-between items-center mt-10">
              <button
                disabled={isPending}
                onClick={() => handleGet()}
                className="w-full relative h-auto inline-flex items-center justify-center rounded-xl transition-colors text-sm sm:text-base font-medium px-4 py-3 sm:px-6 cursor-pointer disabled:bg-opacity-70 bg-green-500 active:bg-green-700 text-neutral-50 flex-1 delay-75"
              >
                Create Launchpad
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
