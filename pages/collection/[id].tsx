import { Poppins } from "next/font/google";
import Nav from "@/components/Header/Nav";
import Banner from "@/components/Collection/Banner";
import CardGrid from "@/components/Collection/CardGrid";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Collection() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center text-white bg-[#0b0f19] ${font.className} w-full`}
    >
      <Nav />

      <div className="flex flex-row items-center w-full">
        <Banner />
      </div>

      <div className="mt-80">
        <CardGrid />
      </div>
    </main>
  );
}
