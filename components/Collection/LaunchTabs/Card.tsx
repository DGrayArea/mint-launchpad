import Image from "next/image";
import truncateEthAddress from "truncate-eth-address";
import { HiBadgeCheck } from "react-icons/hi";
import { AiOutlineDiscord } from "react-icons/ai";
import { LiaTelegramPlane } from "react-icons/lia";
import { TfiTwitter } from "react-icons/tfi";
import { PiGlobeHemisphereWestLight } from "react-icons/pi";
import Link from "next/link";
import { useMintTab } from "@/hooks/useMintTab";
import Whitelist from "./Tabs/Whitelist";
import Fcfs from "./Tabs/Fcfs";
import Public from "./Tabs/Public";
import { useEffect, useState } from "react";
import { useReadContract } from "wagmi";
import { NFTCollection } from "@/config/Abi";
import Loading from "./Tabs/Loading";
import { createAvatar } from "@dicebear/core";
import { pixelArt } from "@dicebear/collection";

const Card = ({
  collectionData,
  contract,
}: {
  collectionData: any;
  contract: string | any;
}) => {
  const { currentTab, setCurrentTab } = useMintTab();
  const [socials, setSocials] = useState({
    website: "",
    twitter: "",
    telegram: "",
    discord: "",
  });
  const [loading, setLoading] = useState(false);
  const totalSupply = useReadContract({
    abi: NFTCollection,
    address: contract,
    functionName: "totalSupply",
  });
  const maxSupply = useReadContract({
    abi: NFTCollection,
    address: contract,
    functionName: "maxSupply",
  });
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
  const publics = useReadContract({
    abi: NFTCollection,
    address: contract,
    functionName: "publicPhase",
  });
  const name = useReadContract({
    abi: NFTCollection,
    address: contract,
    functionName: "name",
  });
  const price = useReadContract({
    abi: NFTCollection,
    address: contract,
    functionName: "baseFee",
  });

  useEffect(() => {
    //@ts-ignore
    setLoading(true);
    //@ts-ignore
    if (collectionData?.data && collectionData.data.length > 0) {
      setSocials({
        //@ts-ignore
        website: collectionData?.data[1],
        //@ts-ignore
        twitter: collectionData?.data[2],
        //@ts-ignore
        telegram: collectionData?.data[3],
        //@ts-ignore
        discord: collectionData?.data[4],
      });
      setLoading(false);
    }
  }, [collectionData]);
  // console.log(socials, loading);
  // const [socials, setSocials] = useState({
  //   website: "https://punkverse.xyz",
  //   twitter: "https://x.com/PunkonMint?s=09",
  //   telegram: "https://t.me/punkshield",
  //   discord: "https://discord.com/punk",
  // });
  const avatar = createAvatar(pixelArt, {
    seed: contract,
    // ... other options
  });

  const png = avatar.toString();
  // Convert the SVG string to a data URI
  const avatarDataUri = `data:image/svg+xml;utf8,${encodeURIComponent(png)}`;
  return (
    <div className="bg-[#111827] rounded-3xl overflow-hidden relative shadow-2xl drop-shadow-2xl py-4 px-5 lg:py-8 lg:px-10 p-4 w-full">
      <div className="text-2xl lg:text-3xl lg:leading-[2.5rem] 2xl:text-4xl 2xl:leading-[3rem] font-extrabold flex items-end gap-2.5 whitespace-nowrap min-w-[200px] w-full">
        {/*@ts-ignore*/}
        {name?.data ? name?.data : ""}
      </div>
      <div className="w-full justify-between items-center flex mt-4 lg:mt-6 space-x-6">
        <div className="flex flex-row items-center space-x-1.5 lg:space-x-3 w-full">
          <div>
            <Image
              src={avatarDataUri}
              width={42}
              height={42}
              alt="creator-img"
              className="rounded-full"
            />
          </div>
          <div className="space-y-[2px]">
            <div className="text-xs dark:text-neutral-400">
              {contract ? truncateEthAddress(contract) : ""}
            </div>
            <div className="text-xs lg:text-sm font-bold flex flex-row items-center">
              CREATOR
              <span className="hidden lg:flex">
                <HiBadgeCheck
                  size={20}
                  fill="rgb(56, 189, 248)"
                  className="ml-1"
                />
              </span>
              <span className="flex lg:hidden">
                <HiBadgeCheck
                  size={16}
                  fill="rgb(56, 189, 248)"
                  className="ml-1"
                />
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-row space-x-2 items-center">
          {socials.website ? (
            <Link
              className="p-1.5 bg-gray-500/50 rounded-full"
              href={socials.website}
              target="_blank"
            >
              <PiGlobeHemisphereWestLight size={22} />
            </Link>
          ) : null}
          {socials.twitter ? (
            <Link
              className="p-1.5 bg-gray-500/50 rounded-full"
              href={socials.twitter}
              target="_blank"
            >
              <TfiTwitter size={20} />
            </Link>
          ) : null}
          {socials.telegram ? (
            <Link
              className="p-1.5 bg-gray-500/50 rounded-full"
              href={socials.telegram}
              target="_blank"
            >
              <LiaTelegramPlane size={22} />
            </Link>
          ) : null}
          {socials.discord ? (
            <Link
              className="p-1.5 bg-gray-500/50 rounded-full"
              href={socials.discord}
              target="_blank"
            >
              <AiOutlineDiscord size={23} />
            </Link>
          ) : null}
        </div>
      </div>

      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="flex flex-row bg-gray-800/75 py-2 my-8 w-full rounded-xl items-center justify-center px-2">
            {
              //@ts-ignore
              whitelist?.data?.length > 0 && whitelist?.data[1] === true ? (
                <div
                  onClick={() => setCurrentTab("Whitelist")}
                  className={`font-extrabold text-base lg:text-lg flex flex-row items-center justify-center w-full lg:w-full px-1 py-1 rounded-md cursor-pointer transition-all ease-in-out duration-75 ${
                    currentTab === "Whitelist" ? "bg-[#dbeafe]" : "bg-none"
                  }`}
                >
                  <div className="animation-header font-extrabold">
                    Whitelist
                  </div>
                </div>
              ) : null
            }
            {
              //@ts-ignore
              fcfs?.data?.length > 0 && fcfs?.data[1] === true ? (
                <div
                  onClick={() => setCurrentTab("FCFS")}
                  className={`font-extrabold text-base lg:text-lg flex flex-row items-center justify-center  w-full lg:w-full px-1 py-1 rounded-md cursor-pointer transition-all ease-in-out duration-75 ${
                    currentTab === "FCFS" ? "bg-[#dbeafe]" : "bg-none"
                  }`}
                >
                  <div className="animation-header2 font-extrabold">FCFS</div>
                </div>
              ) : null
            }
            {
              //@ts-ignore
              publics?.data?.length > 0 && publics?.data[1] === true ? (
                <div
                  onClick={() => setCurrentTab("Public")}
                  className={`font-extrabold text-base lg:text-lg flex flex-row items-center justify-center  w-full lg:w-full px-1 py-1 rounded-md cursor-pointer transition-all ease-in-out duration-75 ${
                    currentTab === "Public" ? "bg-[#dbeafe]" : "bg-none"
                  }`}
                >
                  <div className="animation-header3 font-extrabold">Public</div>
                </div>
              ) : null
            }
          </div>
          <div className="w-full">
            {currentTab === "Whitelist" ? (
              <Whitelist
                //@ts-ignore
                data={whitelist?.data}
                //@ts-ignore
                price={Number(price?.data)}
                contract={contract}
                //@ts-ignore
                totalSupply={parseInt(totalSupply.data)}
                //@ts-ignore
                maxSupply={parseInt(maxSupply.data)}
              />
            ) : currentTab === "FCFS" ? (
              <Fcfs
                //@ts-ignore
                data={fcfs?.data}
                //@ts-ignore
                price={Number(price?.data)}
                contract={contract}
                //@ts-ignore
                totalSupply={parseInt(totalSupply.data)}
                //@ts-ignore
                maxSupply={parseInt(maxSupply.data)}
              />
            ) : (
              <Public
                //@ts-ignore
                data={publics?.data}
                //@ts-ignore
                price={Number(price?.data)}
                contract={contract}
                //@ts-ignore
                totalSupply={parseInt(totalSupply.data)}
                //@ts-ignore
                maxSupply={parseInt(maxSupply.data)}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Card;
