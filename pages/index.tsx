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

export default function Home() {
  function getUnixTimeFiveMinutesFromNow(): number {
    const now = new Date();
    const fiveMinutesLater = new Date(now.getTime() + 2 * 60 * 1000);
    return Math.floor(fiveMinutesLater.getTime() / 1000);
  }
  function getUnixTimeTenAmUtcToday(): number {
    const now = new Date();

    // Create a new Date object for today at 10 AM UTC
    const tenAmUtcToday = new Date(
      Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate(),
        11,
        0,
        0
      )
    );

    return Math.floor(tenAmUtcToday.getTime() / 1000);
  }
  // console.log(new Date(1718532000));
  console.log(getUnixTimeTenAmUtcToday());
  // console.log(getUnixTimeFiveMinutesFromNow());

  // console.log(result.data);

  // const addresses =
  // `
  //   const formattedAddresses = addresses
  //     .split(",")
  //     .map((address) => address.trim())
  //     .filter((address) => address.length > 0)
  //     .map((address) => `"${address}"`)
  //     .join(",\n");

  // console.log(formattedAddresses);

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
