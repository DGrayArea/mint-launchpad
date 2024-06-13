import { useTab } from "@/hooks/useTab";
import Ongoing from "./Ongoing";
import Upcoming from "./Upcoming";
import Ended from "./Ended";

export const Tabs = () => {
  const { currentTab, setCurrentTab } = useTab();

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
          <Ongoing />
        ) : currentTab === "Upcoming" ? (
          <Upcoming />
        ) : (
          <Ended />
        )}
      </div>
    </div>
  );
};
