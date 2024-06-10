import { collectionData } from "@/constants";
import NFTCard from "../NFTCard";
import { CollectionType } from "@/types";

const Ongoing = () => {
  return (
    <div className="w-full">
      <div className="font-extrabold text-4xl mb-12">Ongoing</div>
      <div className="flex w-full mx-auto justify-center items-center">
        <div className="grid grid-cols-4 justify-center items-center mx-auto w-full gap-10 mb-20 ml-8">
          {collectionData.map((item: CollectionType, index) => (
            <NFTCard
              key={index}
              imageSrc={item.imageSrc}
              title={item.title}
              price={item.price}
              items={item.items}
              status={item.status}
              contract={item.contract}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Ongoing;
