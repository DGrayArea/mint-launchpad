// components/NFTCard.tsx
import { CollectionType } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { FaLeaf } from "react-icons/fa";
import { VideoCameraIcon, PhotoIcon } from "@heroicons/react/24/outline";
import { RoundToK } from "@/helpers/RoundToK";

const NFTCard = ({
  imageSrc,
  title,
  price,
  items,
  status,
  contract,
}: CollectionType) => {
  return (
    <Link
      href={`/launchpad/${contract}`}
      className="bg-[#111827] rounded-lg h-full max-w-72 shadow-2xl drop-shadow-2xl"
    >
      <div className="w-full h-fit">
        {imageSrc.endsWith(".mp4") ? (
          <video
            muted
            autoPlay
            loop
            src={imageSrc}
            width={200}
            height={200}
            className="w-full h-fit object-contain rounded-t-xl hover:scale-110 transition-transform duration-300 ease-in-out will-change-transform delay-100"
          />
        ) : (
          <Image
            src={imageSrc}
            alt={title}
            width={200}
            height={200}
            className="w-full h-fit object-contain rounded-t-xl hover:scale-110 transition-transform duration-300 ease-in-out will-change-transform delay-100"
          />
        )}
        <div
          className={` ring-1 ring-white absolute top-2 right-2 px-1.5 md:px-2 lg:px-3 py-1 rounded-full text-white text-xs md:text-sm lg:text-base ${
            status === "Ended"
              ? "bg-red-500"
              : status === "Ongoing"
              ? "bg-[#48BB78]"
              : "bg-yellow-500"
          }`}
        >
          {status}
        </div>
        <div className="absolute bottom-24 md:bottom-28 right-3">
          {imageSrc.endsWith(".mp4") || imageSrc.endsWith(".gif") ? (
            <div className="p-1.5 rounded-full bg-black/50 w-fit">
              <VideoCameraIcon className="w-[18px] lg:w-[24px] stroke-2 text-white" />
            </div>
          ) : (
            <div className="p-1.5 rounded-full bg-black/50 w-fit">
              <PhotoIcon className="w-[18px] lg:w-[24px] stroke-2 text-white" />
            </div>
          )}
        </div>
      </div>
      <div className="p-4 z-50 bg-[#111827] text-white rounded-b-xl space-y-3">
        <h3 className="text-white font-semibold text-xs md:text-base lg:text-lg">
          {title}
        </h3>
        <div className="flex justify-between items-center mt-2 text-sm md:text-base lg:text-lg">
          <span className="text-green-500 font-semibold flex flex-row items-center">
            <span className="flex md:hidden">
              <FaLeaf size={18} className="mr-2" />
            </span>
            <span className="hidden md:flex">
              <FaLeaf size={22} className="mr-2" />
            </span>

            {price}
          </span>
          <span className="text-gray-400">{RoundToK(items)} items</span>
        </div>
      </div>
    </Link>
  );
};

export default NFTCard;
