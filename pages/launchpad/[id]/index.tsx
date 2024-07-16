import Nav from "@/components/Header/Nav";
import { Poppins } from "next/font/google";
import { useState } from "react";

import AllTabs from "@/components/Collection/LaunchTabs/AllTabs";
import LaunchTabs from "@/components/Collection/Launchpad/LaunchTabs";
import CheckWL from "@/components/Collection/Launchpad/CheckWL";
import { useRouter } from "next/router";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Collection() {
  const [Tab, setSurrentTab] = useState<"Mint" | "CheckWL">("Mint");
  const router = useRouter();
  const { id } = router.query;

  return (
    <main
      className={`flex min-h-screen flex-col items-center text-white bg-[#0b0f19] ${font.className} w-full`}
    >
      <Nav />
      <div className="flex w-full justify-center items-center mx-auto">
        <LaunchTabs tab={Tab} setCurrentTab={setSurrentTab} />
      </div>
      {Tab === "Mint" ? <AllTabs contract={id} /> : <CheckWL />}
    </main>
  );
}
