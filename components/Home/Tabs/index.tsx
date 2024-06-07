import { useTab } from "@/hooks/useTab";
import Ongoing from "./Ongoing";
import Upcoming from "./Upcoming";
import Ended from "./Ended";

export const Tabs = () => {
  const { currentTab, setCurrentTab } = useTab();

  return (
    <div className="flex flex-col w-full px-7">
      <div className="flex flex-row bg-gray-800/75 p-2 mt-8 w-fit ml-4 rounded-xl">
        <div
          onClick={() => setCurrentTab("Ongoing")}
          className={`font-bold text-xl flex flex-row items-center justify-center w-[150px] px-5 py-3 rounded-xl cursor-pointer transition-all ease-in-out duration-75 ${
            currentTab === "Ongoing" ? "bg-[#111827]" : "bg-none"
          }`}
        >
          Ongoing
        </div>
        <div
          onClick={() => setCurrentTab("Upcoming")}
          className={`font-bold text-xl flex flex-row items-center justify-center  w-[150px] px-5 py-3 rounded-xl cursor-pointer transition-all ease-in-out duration-75 ${
            currentTab === "Upcoming" ? "bg-[#111827]" : "bg-none"
          }`}
        >
          Upcoming
        </div>
        <div
          onClick={() => setCurrentTab("Ended")}
          className={`font-bold text-xl flex flex-row items-center justify-center  w-[150px] px-5 py-3 rounded-xl cursor-pointer transition-all ease-in-out duration-75 ${
            currentTab === "Ended" ? "bg-[#111827]" : "bg-none"
          }`}
        >
          Ended
        </div>
      </div>

      <div className="px-6 mt-10 w-full">
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
