import { useState } from "react";
import { Input } from "../ui/input";
import Logo from "./Logo";
import Menus from "./Menus";
import Wallet from "./Wallet";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import {
  Bars3Icon,
  ChevronDownIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import MobileSocials from "../Mobile/MobileSocials";
import Link from "next/link";

const Nav = () => {
  const [search, setSearch] = useState<string>("");
  const [openMobileMenu, setOpenMobileMenu] = useState<boolean>(false);
  return (
    <div className="w-full relative">
      <div
        className={`w-full flex flex-row justify-between space-x-5 lg:space-x-16 h-full bg-[#111827] py-5 items-center lg:justify-center px-4 lg:px-0 overflow-x-auto scrollbar-hide`}
      >
        <div>
          <Logo />
        </div>

        <div className="lg:w-[350px] hidden lg:flex">
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

        <div className="hidden lg:flex">
          <Menus />
        </div>
        <div className="">
          <Wallet />
        </div>
        <div className="flex lg:hidden items-center">
          <Bars3Icon
            onClick={() => setOpenMobileMenu(!openMobileMenu)}
            className="w-10 md:w-12"
          />
        </div>
      </div>
      <div
        className={`absolute top-0 min-h-screen z-50 bg-[#111827] transition-all duration-150 ease-in-out ${
          openMobileMenu ? "w-full" : "w-0"
        }`}
      >
        <div
          className={`w-full h-full bg-inherit relative ${
            !openMobileMenu ? "hidden" : "block"
          } transition-all duration-150 delay-75`}
        >
          <div className="w-full mb-3 flex items-end justify-end mt-3">
            <XMarkIcon
              onClick={() => setOpenMobileMenu(!openMobileMenu)}
              className="flex justify-end items-center w-7 mr-4"
            />
          </div>

          <div className="px-5">
            <Logo />
          </div>
          <div className="px-5 text-sm md:text-lg mt-4">
            Explore the latest NFT collections on Mint Blockchain.
          </div>
          <div className="px-5 mt-5">
            <MobileSocials />
          </div>

          <div className="w-full flex flex-col mt-5">
            <ul className="flex flex-col py-6 border-t border-b border-b-gray-500 border-t-gray-500">
              <li className="text-white">
                <Link
                  className="flex w-full items-center py-2.5 px-4 font-medium uppercase tracking-wide text-sm hover:bg-neutral-500/40 rounded-lg"
                  href="#"
                >
                  <span className="block w-full">Explore</span>
                </Link>
              </li>
              <li className="text-white">
                <Link
                  className="flex w-full items-center py-2.5 px-4 font-medium uppercase tracking-wide text-sm hover:bg-neutral-500/40 rounded-lg"
                  href="#"
                >
                  <span className="">Stats</span>
                  <span className="block flex-grow">
                    <span
                      className="flex justify-end flex-grow"
                      id="headlessui-disclosure-button-:r9k:"
                      aria-expanded="false"
                    >
                      <ChevronDownIcon className="ml-2 h-4 w-4 text-neutral-500" />
                    </span>
                  </span>
                </Link>
              </li>

              <li className="text-white">
                <Link
                  className="flex w-full items-center py-2.5 px-4 font-medium uppercase tracking-wide text-sm hover:bg-neutral-500/40 rounded-lg"
                  href="/"
                >
                  <span className="">Launches</span>
                  <span className="block flex-grow">
                    <span
                      className="flex justify-end flex-grow"
                      id="headlessui-disclosure-button-:r9k:"
                      aria-expanded="false"
                    >
                      <ChevronDownIcon className="ml-2 h-4 w-4 text-neutral-500" />
                    </span>
                  </span>
                </Link>
              </li>
              <li className="text-white">
                <Link
                  className="flex w-full items-center py-2.5 px-4 font-medium uppercase tracking-wide text-sm hover:bg-neutral-500/40 rounded-lg"
                  href="#"
                >
                  <span className="">Apply for launchpad</span>
                  <span className="block flex-grow">
                    <span
                      className="flex justify-end flex-grow"
                      id="headlessui-disclosure-button-:r9k:"
                      aria-expanded="false"
                    >
                      <ChevronDownIcon className="ml-2 h-4 w-4 text-neutral-500" />
                    </span>
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex lg:hidden items-center mt-6 flex-row justify-between px-5 w-full space-x-3">
            <button className="bg-inherit border border-gray-500 px-4 py-4 whitespace-nowrap rounded-3xl text-sm font-bold w-full  bg-gradient-to-r to-pink-500 from-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none text-center">
              Mint BasePunk
            </button>
            <button className="bg-inherit border border-gray-500 px-4 py-4 whitespace-nowrap rounded-3xl text-sm font-bold w-full">
              Connect Wallet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
