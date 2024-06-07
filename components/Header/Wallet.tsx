import { BellIcon } from "@radix-ui/react-icons";
import { WalletIcon } from "@heroicons/react/24/outline";
import { Button } from "../ui/button";

const Wallet = () => {
  return (
    <div className="border-l border-l-white flex flex-row pl-5 items-center space-x-7">
      <div>
        <button className="bg-inherit border border-gray-500 px-4 py-2.5 whitespace-nowrap rounded-xl">
          Connect Wallet
        </button>
      </div>
      <div className="cursor-pointer">
        <BellIcon className="outline-white" width={34} height={34} />
      </div>
      <div className="bg-green-500 rounded-full p-2 cursor-pointer">
        <WalletIcon className="w-[34px]" />
      </div>
    </div>
  );
};

export default Wallet;
