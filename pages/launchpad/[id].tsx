import Photo from "@/components/Collection/Photo";
import Nav from "@/components/Header/Nav";
import { Poppins } from "next/font/google";

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
      <div className="flex flex-row items-center mt-5 md:mt-16 lg:mt-16 w-full justify-center min-h-sreen">
        <Photo />
      </div>
    </main>
  );
}
