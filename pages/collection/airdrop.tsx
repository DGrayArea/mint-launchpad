import { Poppins } from "next/font/google";
import Nav from "@/components/Header/Nav";
import AirdropBanner from "@/components/Collection/AirdropBanner";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Airdrop() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center text-white bg-[#0b0f19] ${font.className} w-full`}
    >
      <Nav />

      <div className="flex flex-row items-center w-full">
        <AirdropBanner />
      </div>
    </main>
  );
}
