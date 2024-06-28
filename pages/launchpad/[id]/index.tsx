import Nav from "@/components/Header/Nav";
import { Poppins } from "next/font/google";
import { useState } from "react";

import AllTabs from "@/components/Collection/LaunchTabs/AllTabs";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Collection() {
  const [Tab, setSurrentTab] = useState<"Whitelist" | "FCFS" | "Public">(
    "Whitelist"
  );
  return (
    <main
      className={`flex min-h-screen flex-col items-center text-white bg-[#0b0f19] ${font.className} w-full`}
    >
      <Nav />
      <div className="flex w-full justify-center items-center mx-auto"></div>
      <AllTabs />
      {/* {Tab === "Whitelist" ? (
        <div className="relative flex lg:ml-[25%] justify-center items-center px-3 lg:pb-0">
          <div className="absolute lg:-left-[500px] -left-0 lg:top-[7%] top-[37%] md:top-[44%] lg:ml-[10%] transition-all w-full px-3.5">
            <Whitelist />
          </div>
          <div className="w-full h-[945px] md:h-[1150px] lg:h-full">
            <Link
              // href={`/collection/${contract}`}
              href="#"
              className="w-full h-fit"
            >
              <Image
                alt="nft-img"
                className="rounded-3xl sm:rounded-[40px] inset-0 object-cover border-4 sm:border-[14px] border-neutral-700/55 transition-all duration-100 lg:w-[750px] lg:h-[750px] w-full h-fit"
                width={750}
                height={750}
                src="/2.png"
              />
            </Link>
          </div>
        </div>
      ) : Tab === "FCFS" ? (
        <FCFS />
      ) : (
        <Public />
      )} */}
    </main>
  );
}
