import { Poppins } from "next/font/google";
import Nav from "@/components/Header/Nav";
import AirdropBanner from "@/components/Collection/AirdropBanner";
import { useState } from "react";
import TokensBanner from "@/components/Collection/TokensBanner";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Airdrop() {
  const [Tab, setSurrentTab] = useState<"NFTs" | "Tokens">("NFTs");
  return (
    <main
      className={`flex min-h-screen flex-col items-center text-white bg-[#0b0f19] ${font.className} w-full`}
    >
      <Nav />
      <div className="flex flex-row bg-gray-800/75 py-2 w-[80%] lg:w-[30%] rounded-xl items-center justify-center px-2 mt-10">
        <div
          onClick={() => setSurrentTab("NFTs")}
          className={`font-extrabold text-base lg:text-lg flex flex-row items-center justify-center w-full lg:w-full px-1 py-1 rounded-md cursor-pointer transition-all ease-in-out duration-75 ${
            Tab === "NFTs" ? "bg-[#dbeafe]" : "bg-none"
          }`}
        >
          <div className="animation-header font-extrabold">NFTs</div>
        </div>
        <div
          onClick={() => setSurrentTab("Tokens")}
          className={`font-extrabold text-base lg:text-lg flex flex-row items-center justify-center  w-full lg:w-full px-1 py-1 rounded-md cursor-pointer transition-all ease-in-out duration-75 ${
            Tab === "Tokens" ? "bg-[#dbeafe]" : "bg-none"
          }`}
        >
          <div className="animation-header2 font-extrabold">Tokens</div>
        </div>
      </div>

      <div className="flex flex-row items-center w-full">
        {Tab === "NFTs" ? <AirdropBanner /> : <TokensBanner />}
      </div>
    </main>
  );
}
