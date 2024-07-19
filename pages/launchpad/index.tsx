import Nav from "@/components/Header/Nav";
import { Poppins } from "next/font/google";
import { useRouter } from "next/router";
import { useEffect } from "react";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400"],
});

const Index = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/");
  }, [router]);
  return (
    <main
      className={`flex min-h-screen flex-col items-center text-white bg-[#0b0f19] ${font.className} w-full`}
    >
      <Nav />
    </main>
  );
};

export default Index;
