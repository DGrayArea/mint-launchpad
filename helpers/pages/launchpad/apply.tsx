import Nav from "@/components/Header/Nav";
import { Poppins } from "next/font/google";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400"],
});

const Apply = () => {
  return (
    <main
      className={`flex min-h-screen flex-col items-center text-white bg-[#0b0f19] ${font.className} w-full`}
    >
      <Nav />
    </main>
  );
};

export default Apply;
