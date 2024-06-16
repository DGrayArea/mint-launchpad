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
import { contract } from "@/config";

const Card = () => {
  const { currentTab, setCurrentTab } = useMintTab();
  return (
    <div className="bg-[#111827] rounded-3xl overflow-hidden relative shadow-2xl drop-shadow-2xl py-4 px-5 lg:py-8 lg:px-10 p-4 w-full">
      <div className="text-2xl lg:text-3xl lg:leading-[2.5rem] 2xl:text-4xl 2xl:leading-[3rem] font-extrabold flex items-end gap-2.5 whitespace-nowrap min-w-[200px] w-full">
        Eragon Passport
      </div>
      <div className="w-full justify-between items-center flex mt-4 lg:mt-6 space-x-6">
        <div className="flex flex-row items-center space-x-1.5 lg:space-x-3 w-full">
          <div>
            <Image
              src="/1.png"
              width={42}
              height={42}
              alt="creator-img"
              className="rounded-full"
            />
          </div>
          <div className="space-y-[2px]">
            <div className="text-xs dark:text-neutral-400">
              {truncateEthAddress(contract)}
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

        <div className="hidden lg:flex flex-row space-x-2 items-center">
          <Link
            className="p-1.5 bg-gray-500/50 rounded-full"
            href="https://discord.com/invite/punkecosystem"
            target="_blank"
          >
            <AiOutlineDiscord size={25} />
          </Link>
          {/* <Link
            className="p-1.5 bg-gray-500/50 rounded-full"
            href="#"
            target="_blank"
          >
            <LiaTelegramPlane size={24} />
          </Link> */}
          <Link
            className="p-1.5 bg-gray-500/50 rounded-full"
            href="https://x.com/PunkonMint?s=09"
            target="_blank"
          >
            <TfiTwitter size={22} />
          </Link>
          {/* <Link
            className="p-1.5 bg-gray-500/50 rounded-full"
            href="#"
            target="_blank"
          >
            <PiGlobeHemisphereWestLight size={24} />
          </Link> */}
        </div>
        <div className="flex lg:hidden flex-row space-x-2 items-center w-full">
          <Link
            className="p-1.5 bg-gray-500/50 rounded-full"
            href="https://discord.com/invite/punkecosystem"
            target="_blank"
          >
            <AiOutlineDiscord size={16} />
          </Link>
          {/* <Link
            className="p-1.5 bg-gray-500/50 rounded-full"
            href="#"
            target="_blank"
          >
            <LiaTelegramPlane size={16} />
          </Link> */}
          <Link
            className="p-1.5 bg-gray-500/50 rounded-full"
            href="https://x.com/PunkonMint?s=09"
            target="_blank"
          >
            <TfiTwitter size={16} />
          </Link>
          {/* <Link
            className="p-1.5 bg-gray-500/50 rounded-full"
            href="#"
            target="_blank"
          >
            <PiGlobeHemisphereWestLight size={16} />
          </Link> */}
        </div>
      </div>

      <div className="flex flex-row bg-gray-800/75 py-2 my-8 w-full rounded-xl items-center justify-center px-2">
        <div
          onClick={() => setCurrentTab("Whitelist")}
          className={`font-extrabold text-base lg:text-lg flex flex-row items-center justify-center w-full lg:w-full px-1 py-1 rounded-md cursor-pointer transition-all ease-in-out duration-75 ${
            currentTab === "Whitelist" ? "bg-[#dbeafe]" : "bg-none"
          }`}
        >
          <div className="animation-header font-extrabold">Whitelist</div>
        </div>
        <div
          onClick={() => setCurrentTab("FCFS")}
          className={`font-extrabold text-base lg:text-lg flex flex-row items-center justify-center  w-full lg:w-full px-1 py-1 rounded-md cursor-pointer transition-all ease-in-out duration-75 ${
            currentTab === "FCFS" ? "bg-[#dbeafe]" : "bg-none"
          }`}
        >
          <div className="animation-header2 font-extrabold">FCFS</div>
        </div>
        <div
          onClick={() => setCurrentTab("Public")}
          className={`font-extrabold text-base lg:text-lg flex flex-row items-center justify-center  w-full lg:w-full px-1 py-1 rounded-md cursor-pointer transition-all ease-in-out duration-75 ${
            currentTab === "Public" ? "bg-[#dbeafe]" : "bg-none"
          }`}
        >
          <div className="animation-header3 font-extrabold">Public</div>
        </div>
      </div>
      {currentTab === "Whitelist" ? (
        <Whitelist />
      ) : currentTab === "FCFS" ? (
        <Fcfs />
      ) : (
        <Public />
      )}
    </div>
  );
};

export default Card;
