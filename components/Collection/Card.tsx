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

const Card = () => {
  const { currentTab, setCurrentTab } = useMintTab();
  return (
    <div className="bg-[#111827] rounded-3xl overflow-hidden relative shadow-2xl drop-shadow-2xl py-8 px-10 p-4">
      <div className="text-2xl lg:text-3xl lg:leading-[2.5rem] 2xl:text-4xl 2xl:leading-[3rem] font-semibold flex items-end gap-2.5 whitespace-nowrap min-w-[200px]">
        Eragon Passport
      </div>
      <div className="w-full justify-between items-center flex mt-6">
        <div className="flex flex-row items-center space-x-3">
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
              {truncateEthAddress("0xC89f7cceadD2E57CDedd0c36F3537f633f31fAfB")}
            </div>
            <div className="text-sm font-bold flex flex-row items-center">
              CREATOR
              <HiBadgeCheck
                size={20}
                fill="rgb(56, 189, 248)"
                className="ml-1"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-row space-x-2 items-center">
          <Link className="p-1.5 bg-gray-500/50 rounded-full" href="#">
            <AiOutlineDiscord size={25} />
          </Link>
          <Link className="p-1.5 bg-gray-500/50 rounded-full" href="#">
            <LiaTelegramPlane size={24} />
          </Link>
          <Link className="p-1.5 bg-gray-500/50 rounded-full" href="#">
            <TfiTwitter size={22} />
          </Link>
          <Link className="p-1.5 bg-gray-500/50 rounded-full" href="#">
            <PiGlobeHemisphereWestLight size={24} />
          </Link>
        </div>
      </div>

      <div className="flex flex-row bg-gray-800/75 py-2 my-8 w-full rounded-xl items-center justify-center">
        <div
          onClick={() => setCurrentTab("Whitelist")}
          className={`font-bold text-lg flex flex-row items-center justify-center w-[162px] px-1 py-1 rounded-md cursor-pointer transition-all ease-in-out duration-75 ${
            currentTab === "Whitelist" ? "bg-[#dbeafe]" : "bg-none"
          }`}
        >
          <div className="animation-header">Whitelist</div>
        </div>
        <div
          onClick={() => setCurrentTab("FCFS")}
          className={`font-bold text-lg flex flex-row items-center justify-center  w-[162px] px-1 py-1 rounded-md cursor-pointer transition-all ease-in-out duration-75 ${
            currentTab === "FCFS" ? "bg-[#dbeafe]" : "bg-none"
          }`}
        >
          <div className="animation-header2">FCFS</div>
        </div>
        <div
          onClick={() => setCurrentTab("Public")}
          className={`font-bold text-lg flex flex-row items-center justify-center  w-[162px] px-1 py-1 rounded-md cursor-pointer transition-all ease-in-out duration-75 ${
            currentTab === "Public" ? "bg-[#dbeafe]" : "bg-none"
          }`}
        >
          <div className="animation-header3">Public</div>
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
