import { Poppins } from "next/font/google";
import Nav from "@/components/Header/Nav";
import { Tabs } from "@/components/Home/Tabs";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Main() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center text-white bg-[#0b0f19] ${font.className} w-full`}
    >
      <Nav />
      <Tabs />
    </main>
  );
}
