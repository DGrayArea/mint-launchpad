import Image from "next/image";
import { FaLeaf } from "react-icons/fa";
import { Button } from "../ui/button";
import Link from "next/link";

const CardItem = ({ image }: { image: string }) => {
  return (
    <div className="pt-3">
      <div className="flex flex-col items-baseline border-2 border-gray-500 p-2 rounded-xl relative py-1.5 md:py-2 px-2.5 2xl:px-3.5 text-sm sm:text-base font-semibold ">
        <Image
          className="rounded-xl"
          src={image}
          alt="card-image"
          width={300}
          height={300}
        />

        <div className="border-b-[1px] border-b-gray-500 w-full my-10" />
        <div className="flex flex-row w-full justify-between mb-4 items-center space-x-3">
          <div className="flex justify-between items-center border-green-500 border-2 rounded-lg py-2.5 px-4 cursor-pointer relative">
            <span className="text-green-500 font-semibold flex flex-row justify-between items-center">
              <FaLeaf size={22} className="mr-4" />
              0.3
            </span>
            <span className="block absolute font-normal bottom-full translate-y-3 p-1 -mx-1 text-xs sm:text-sm text-white z-10 bg-[#111827]/90">
              Price
            </span>
          </div>

          <div className=" !leading-none flex justify-center items-center">
            <Button className="text-xs sm:text-sm 2xl:text-base py-6 px-2.5">
              <Link href="#"> View on Explorer</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardItem;
