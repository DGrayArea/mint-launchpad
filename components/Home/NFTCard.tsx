// components/NFTCard.tsx
import { CollectionType } from "@/types";
import Image from "next/image";
import React from "react";

const NFTCard = ({ imageSrc, title, price, items, status }: CollectionType) => {
  return (
    <div className="bg-[#0B1E5A] rounded-lg overflow-hidden shadow-lg relative max-w-72">
      <div className="relative ">
        <Image
          src={imageSrc}
          alt={title}
          width={200}
          height={200}
          className="w-full h-full object-contain"
        />
        <div
          className={` ring-2 ring-white absolute top-2 right-2 px-3 py-1 rounded-full text-white ${
            status === "Sold out" ? "bg-[#F56565]" : "bg-[#48BB78]"
          }`}
        >
          {status}
        </div>
      </div>
      <div className="p-4 ">
        <h3 className="text-white font-semibold text-lg">{title}</h3>
        <div className="flex justify-between items-center mt-2">
          <span className="text-green-500 font-semibold">{price}</span>
          <span className="text-gray-400">{items} items</span>
        </div>
      </div>
    </div>
  );
};

export default NFTCard;
