import Image from "next/image";
import { FaLeaf } from "react-icons/fa";
import { Button } from "../ui/button";
import Link from "next/link";

const CardItem = ({ image }: { image: string }) => {
  return (
    <div className="pt-3 w-full h-full">
      <div className="flex flex-col items-baseline border border-gray-500 rounded-lg relative text-xs md:text-base font-semibold w-full h-full px-1.5">
        <Image
          className="rounded-md w-full h-full mt-1.5 hover:scale-110 transition-transform duration-300 ease-in-out will-change-transform delay-100 cursor-pointer"
          src={image}
          alt="card-image"
          width={400}
          height={400}
        />

        <div className="border-b-[1px] border-b-gray-600 w-full my-4 mx-auto" />
        <div className="flex flex-row w-full justify-between mb-2 items-center space-x-3">
          <div className="flex justify-between items-center border-green-500 border-2 md:rounded-lg rounded-md lg:py-2.5 py-2 px-3 lg:px-4 cursor-pointer relative">
            <span className="text-green-500 font-semibold hidden lg:flex flex-row justify-between items-center">
              <FaLeaf size={22} className="mr-4" />
              0.3
            </span>
            <span className="text-green-500 font-semibold flex lg:hidden flex-row justify-between items-center">
              <FaLeaf size={16} className="mr-4" />
              0.3
            </span>
            <span className="block absolute font-normal bottom-full translate-y-3 p-1 -mx-1 text-xs md:text-base text-white z-10 bg-[#111827]/90">
              Price
            </span>
          </div>

          <div className=" !leading-none flex justify-center items-center">
            <Button className="text-xs sm:text-sm 2xl:text-base py-6 px-2.5 hidden md:flex">
              <Link href="#"> View on Explorer</Link>
            </Button>
            <Button className="text-xs sm:text-sm 2xl:text-base py-2 px-4 flex md:hidden">
              <Link href="#"> View</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardItem;
