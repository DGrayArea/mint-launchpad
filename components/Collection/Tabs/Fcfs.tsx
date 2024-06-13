const Fcfs = () => {
  const mintDone = true;
  return (
    <div>
      <div className="flex flex-col sm:flex-row items-baseline p-5 lg:p-6 border-2 border-green-500 rounded-xl relative mb-3">
        <div>
          <span className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold text-green-500">
            FREE
          </span>
          <span className="text-base lg:text-lg text-neutral-400 sm:ml-3.5">
            (0/3)
          </span>
        </div>
        <span className="block absolute bottom-full translate-y-2.5 py-1 px-1.5 bg-[#111827] text-xs lg:text-sm text-neutral-400">
          Mint Price Of <span className="text-xs text-blue-500">FCFS</span>
        </span>
        <div className="bg-blue-500/30 text-blue-200 w-fit p-2 rounded-md text-xs lg:text-sm absolute top-2 right-2">
          Total: 100 NFTs
        </div>
      </div>
      {mintDone ? (
        <span className="leading-none mt-10 font-semibold text-red-500 whitespace-nowrap text-sm lg:text-base w-full text-center md:text-left">
          FCFS minting done, switch to Public tab
        </span>
      ) : (
        <span className="leading-none mt-10 font-semibold text-green-500 whitespace-nowrap text-sm lg:text-base w-full text-center md:text-left">
          FCFS minting ongoing
        </span>
      )}

      <p className="text-neutral-500 dark:text-neutral-400 text-sm mt-10 mb-1.5">
        Total minted
      </p>

      <div className="w-full bg-gray-300 rounded-full dark:bg-gray-700 relative h-[22px] overflow-hidden mt-1">
        <div
          className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full h-full transition-all duration-75"
          style={{ width: "100%" }}
        >
          <p className="absolute top-0 right-0 bottom-0 left-0 m-auto p-1.5 text-white transition-all duration-75">
            <b>100%</b> (100/100)
          </p>
        </div>
      </div>

      <div className="border-b-[0.3px] border-b-white w-full my-8" />
      {mintDone ? (
        <button
          disabled
          className="w-full mt-1.5 relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-3 sm:px-6 cursor-not-allowed disabled:bg-opacity-70 bg-red-400 hover:bg-red-700 text-neutral-50 flex-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0"
        >
          Sold out
        </button>
      ) : (
        <button className="w-full mt-1.5 relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-3 sm:px-6 cursor-pointer disabled:bg-opacity-70 bg-green-400 hover:bg-green-700 text-neutral-50 flex-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-600 dark:focus:ring-offset-0">
          Mint NFT
        </button>
      )}
    </div>
  );
};

export default Fcfs;
