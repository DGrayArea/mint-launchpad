import { TabItem } from "@/types";
import NFTCard from "../NFTCard";
import { useMemo } from "react";
import Empty from "./Empty";

const Upcoming = ({ data }: { data: TabItem[] }) => {
  const isEmpty = useMemo(() => (data.length == 0 ? true : false), [data]);

  return (
    <div className="w-full">
      <div className="font-extrabold text-2xl lg:text-4xl mb-7 md:mb-7 lg:mb-12 px-2">
        Upcoming
      </div>
      {isEmpty ? (
        <Empty />
      ) : (
        <div className="flex w-full mx-auto justify-center items-center px-2">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center items-center mx-auto w-full gap-4 ml-0 lg:gap-10 mb-20 lg:ml-8">
            {data?.map((item: TabItem, index) => (
              <NFTCard
                key={index}
                imageSrc={item.logoUri}
                title={item.name}
                price={item.price}
                items={item.maxSupply}
                status="Upcoming"
                contract={item.contractAddress}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Upcoming;
