// components/NFTCard.tsx
import { CollectionType } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { FaLeaf } from "react-icons/fa";
import { VideoCameraIcon, PhotoIcon } from "@heroicons/react/24/outline";

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
      className="bg-[#111827] rounded-lg overflow-hidden relative max-w-72 shadow-2xl drop-shadow-2xl"
    >
      <div className="relative">
        {imageSrc.endsWith(".mp4") ? (
          <video
            muted
            autoPlay
            loop
            src={imageSrc}
            width={200}
            height={200}
            className="w-full h-full object-contain hover:scale-110 transition-all delay-100"
          />
        ) : (
          <Image
            src={imageSrc}
            alt={title}
            width={200}
            height={200}
            className="w-full h-full object-contain hover:scale-110 transition-all delay-100"
          />
        )}
        <div
          className={` ring-2 ring-white absolute top-2 right-2 px-3 py-1 rounded-full text-white ${
            status === "Sold out" ? "bg-[#F56565]" : "bg-[#48BB78]"
          }`}
        >
          {status}
        </div>
        <div className="absolute bottom-4 right-3">
          {imageSrc.endsWith(".mp4") || imageSrc.endsWith(".gif") ? (
            <div className="p-1.5 rounded-full bg-black/50 w-fit">
              <VideoCameraIcon className="w-[24px] stroke-2 text-white" />
            </div>
          ) : (
            <div className="p-1.5 rounded-full bg-black/50 w-fit">
              <PhotoIcon className="w-[24px] stroke-2 text-white" />
            </div>
          )}
        </div>
      </div>
      <div className="p-4 ">
        <h3 className="text-white font-semibold text-lg">{title}</h3>
        <div className="flex justify-between items-center mt-2">
          <span className="text-green-500 font-semibold flex flex-row">
            <FaLeaf size={22} className="mr-2" />
            {price}
          </span>
          <span className="text-gray-400">{items} items</span>
        </div>
      </div>
    </Link>
  );
};

export default NFTCard;
