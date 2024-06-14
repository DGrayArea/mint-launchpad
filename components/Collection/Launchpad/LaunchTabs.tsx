const LaunchTabs = ({
  tab,
  setCurrentTab,
}: {
  tab: "Mint" | "CheckWL";
  setCurrentTab: (tab: "Mint" | "CheckWL") => void;
}) => {
  return (
    <div className="w-full px-3 justify-center items-center flex">
      <div className="flex flex-row bg-gray-800/75 p-2 mt-8 w-full lg:w-fit lg:ml-4 rounded-xl justify-between">
        <div
          onClick={() => setCurrentTab("Mint")}
          className={`font-semibold lg:font-bold text-sm md:text-lg lg:text-xl flex flex-row items-center justify-center w-[150px] lg:w-[150px] md:w-[250px] px-5 py-3 rounded-xl cursor-pointer transition-all ease-in-out duration-75 ${
            tab === "Mint" ? "bg-[#111827]" : "bg-none"
          }`}
        >
          Mint
        </div>
        <div
          onClick={() => setCurrentTab("CheckWL")}
          className={`font-semibold lg:font-bold text-sm md:text-lg lg:text-xl flex flex-row items-center justify-center w-[150px] lg:w-[150px] md:w-[250px] px-5 py-3 rounded-xl cursor-pointer transition-all ease-in-out duration-75 ${
            tab === "CheckWL" ? "bg-[#111827]" : "bg-none"
          }`}
        >
          Check WL
        </div>
      </div>
    </div>
  );
};

export default LaunchTabs;
