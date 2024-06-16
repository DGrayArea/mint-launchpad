import Nav from "@/components/Header/Nav";
import LaunchTabs from "@/components/Collection/Launchpad/LaunchTabs";
import { Poppins } from "next/font/google";
import { useState } from "react";
import MintTab from "@/components/Collection/Launchpad/MintTab";
import CheckWL from "@/components/Collection/Launchpad/CheckWL";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Collection() {
  const [Tab, setSurrentTab] = useState<"Mint" | "CheckWL">("Mint");
  return (
    <main
      className={`flex min-h-screen flex-col items-center text-white bg-[#0b0f19] ${font.className} w-full`}
    >
      <Nav />
      <div className="flex w-full justify-center items-center mx-auto">
        <LaunchTabs tab={Tab} setCurrentTab={setSurrentTab} />
      </div>
      {Tab === "Mint" ? <MintTab /> : <CheckWL />}
    </main>
  );
}
