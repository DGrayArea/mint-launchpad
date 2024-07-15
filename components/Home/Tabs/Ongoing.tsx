import { collectionData } from "@/constants";
import NFTCard from "../NFTCard";
import { CollectionType, TabItem } from "@/types";

const Ongoing = ({ data }: { data: TabItem[] }) => {
  return (
    <div className="w-full">
      <div className="font-extrabold text-2xl lg:text-4xl mb-7 md:mb-7 lg:mb-12 px-2">
        Ongoing
      </div>
      <div className="flex w-full mx-auto justify-center items-center px-2">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center items-center mx-auto w-full gap-4 ml-0 lg:gap-10 mb-20 lg:ml-8">
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
