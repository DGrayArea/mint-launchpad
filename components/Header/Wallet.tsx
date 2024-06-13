import { BellIcon } from "@radix-ui/react-icons";
import { WalletIcon } from "@heroicons/react/24/outline";

const Wallet = () => {
  return (
    <div className="lg:border-l lg:border-l-white flex flex-row pl-0 lg:pl-5 items-center space-x-0 lg:space-x-7">
      <div className="hidden lg:flex items-center">
        <button className="bg-inherit border border-gray-500 px-4 py-2.5 whitespace-nowrap rounded-xl">
          Connect Wallet
        </button>
      </div>
      <div className="flex lg:hidden items-center">
        <button className="bg-inherit border border-gray-500 px-4 py-2 whitespace-nowrap rounded-2xl text-xs md:text-lg">
          Connect Wallet
        </button>
      </div>
      <div className="cursor-pointer hidden lg:block">
        <BellIcon className="outline-white" width={34} height={34} />
      </div>
      <div className="bg-green-500 rounded-full p-2 cursor-pointer hidden lg:block">
        <WalletIcon className="w-[34px]" />
      </div>
    </div>
  );
};

export default Wallet;
