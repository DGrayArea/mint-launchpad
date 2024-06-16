import { Poppins } from "next/font/google";
import Nav from "@/components/Header/Nav";
import { Tabs } from "@/components/Home/Tabs";
import CsvUploader from "@/components/CsvUploader";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/mint");
  });

  return (
    <main
      className={`flex min-h-screen flex-col items-center text-white bg-[#0b0f19] ${font.className} w-full`}
    >
      <Nav />
      <CsvUploader />
      <Tabs />
    </main>
  );
}
