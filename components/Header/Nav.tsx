import { useState } from "react";
import { Input } from "../ui/input";
import Logo from "./Logo";
import Menus from "./Menus";
import Wallet from "./Wallet";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { XMarkIcon } from "@heroicons/react/24/outline";

const Nav = () => {
  const [search, setSearch] = useState<string>("");
  return (
    <div
      className={`w-full flex flex-row space-x-24 h-full bg-[#111827] py-5 items-center justify-center`}
    >
      <div>
        <Logo />
      </div>

      <div className="w-[350px]">
        <form className="relative flex flex-row items-center w-full">
          <Input
            value={search}
            onChange={(e) => setSearch(e.currentTarget.value)}
            placeholder="Search NFT, collection or user..."
            className="block w-full focus:border-sky-300 focus:ring focus:ring-primary-200 border-gray-500 focus:ring-sky-600 focus:ring-opacity-25  disabled:bg-neutral-800 rounded-2xl text-sm font-normal h-[50px] pl-4 py-3 pr-10"
          />
          {search !== "" ? (
            <XMarkIcon
              onClick={() => setSearch("")}
              className="text-white stroke-2 w-[22px] absolute right-12 cursor-pointer"
            />
          ) : null}
          <MagnifyingGlassIcon
            width={22}
            height={22}
            className="text-neutral-700 absolute right-4"
          />
        </form>
      </div>

      <div>
        <Menus />
      </div>
      <div>
        <Wallet />
      </div>
    </div>
  );
};

export default Nav;
