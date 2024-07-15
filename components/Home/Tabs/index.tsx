import { useTab } from "@/hooks/useTab";
import Ongoing from "./Ongoing";
import Upcoming from "./Upcoming";
import Ended from "./Ended";
import {
  LaunchpadFactoryABI,
  LaunchpadFactoryContract,
  NFTCollection,
} from "@/config/Abi";
import { useAccount, useReadContract } from "wagmi";
import { useEffect, useState } from "react";
import { TabItem } from "@/types";
import { ethers } from "ethers";
import { provider, testnetProvider } from "@/config";

export const Tabs = () => {
  const { currentTab, setCurrentTab } = useTab();
  const { chainId } = useAccount();
  const [ongoing, setOngoing] = useState<TabItem[]>([]);
  const [upcoming, setupcoming] = useState<TabItem[]>([]);
  const [ended, setEnded] = useState<TabItem[]>([]);

  const { data: balance } = useReadContract({
    abi: LaunchpadFactoryABI,
    address: LaunchpadFactoryContract,
    functionName: "getAllCollections",
  });

  useEffect(() => {
    //@ts-ignore
    if (balance?.length > 0) {
      const arrangeData = async () => {
        const ethersProvider = chainId === 185 ? provider : testnetProvider;
        const Provider = new ethers.JsonRpcProvider(ethersProvider);
        const upcome: TabItem[] = [];
        const ongone: TabItem[] = [];
        const end: TabItem[] = [];

        await Promise.all(
          //@ts-ignore
          balance?.map(async (item: TabItem) => {
            const contract = new ethers.Contract(
              item.contractAddress,
              NFTCollection,
              Provider
            );
            const price = 0.0077;
            const owner = await contract.owner();
            const supply = await contract.totalSupply();
            const maxSupply = await contract.maxSupply();
            const getSalePhases = await contract.getSalePhases();
            const ownerBalance = await contract.balanceOf(owner);
            const name = await contract.name();
            const symbol = await contract.symbol();

            const allSalesFalse =
              getSalePhases[0] === false &&
              getSalePhases[1] === false &&
              getSalePhases[2] === false
                ? true
                : false;
            const oneSaleOpen =
              getSalePhases[0] === true ||
              getSalePhases[1] === true ||
              getSalePhases[2] === true
                ? true
                : false;
            if (parseInt(supply) === 0 && allSalesFalse) {
              upcome.push({ ...item, name, symbol, maxSupply, price });
            } else if (parseInt(supply) > 0 && oneSaleOpen) {
              ongone.push({ ...item, name, symbol, maxSupply, price });
            } else if (parseInt(supply) === parseInt(maxSupply)) {
              end.push({ ...item, name, symbol, maxSupply, price });
            } else if (
              parseInt(ownerBalance) === parseInt(supply) &&
              allSalesFalse &&
              parseInt(supply) < parseInt(maxSupply)
            ) {
              upcome.push({ ...item, name, symbol, maxSupply, price });
            } else {
              end.push({ ...item, name, symbol, maxSupply, price });
            }
          })
        );
        setupcoming(upcome);
        setOngoing(ongone);
        setEnded(end);
      };
      arrangeData();
    } else {
      console.log("GOT NONE");
    }
  }, [balance, chainId]);

  return (
    <div className="flex flex-col w-full px-0">
      <div className="w-full px-3">
        <div className="flex flex-row bg-gray-800/75 p-2 mt-8 w-full lg:w-fit lg:ml-4 rounded-xl justify-between">
          <div
            onClick={() => setCurrentTab("Ongoing")}
            className={`font-semibold lg:font-bold text-sm md:text-lg lg:text-xl flex flex-row items-center justify-center w-[150px] lg:w-[150px] md:w-[250px] px-5 py-3 rounded-xl cursor-pointer transition-all ease-in-out duration-75 ${
              currentTab === "Ongoing" ? "bg-[#111827]" : "bg-none"
            }`}
          >
            Ongoing
          </div>
          <div
            onClick={() => setCurrentTab("Upcoming")}
            className={`font-semibold lg:font-bold text-sm md:text-lg lg:text-xl flex flex-row items-center justify-center w-[150px] lg:w-[150px] md:w-[250px] px-5 py-3 rounded-xl cursor-pointer transition-all ease-in-out duration-75 ${
              currentTab === "Upcoming" ? "bg-[#111827]" : "bg-none"
            }`}
          >
            Upcoming
          </div>
          <div
            onClick={() => setCurrentTab("Ended")}
            className={`font-semibold lg:font-bold text-sm md:text-lg lg:text-xl flex flex-row items-center justify-center  w-[150px] lg:w-[150px] md:w-[250px] px-5 py-3 rounded-xl cursor-pointer transition-all ease-in-out duration-75 ${
              currentTab === "Ended" ? "bg-[#111827]" : "bg-none"
            }`}
          >
            Ended
          </div>
        </div>
      </div>

      <div className="px-2 lg:px-6 mt-5 md:mt-7 lg:mt-10 w-full">
        {currentTab === "Ongoing" ? (
          <Ongoing data={ongoing} />
        ) : currentTab === "Upcoming" ? (
          <Upcoming data={upcoming} />
        ) : (
          <Ended data={ended} />
        )}
      </div>
    </div>
  );
};
