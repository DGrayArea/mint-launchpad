import Image from "next/image";
import Link from "next/link";
import { AiOutlineDiscord } from "react-icons/ai";
import { LiaTelegramPlane } from "react-icons/lia";
import { PiGlobeHemisphereWestLight } from "react-icons/pi";
import { TfiTwitter } from "react-icons/tfi";

const JumboCard = () => {
  return (
    <div className="relative container -mt-14 lg:-mt-20 w-full px-3.5">
      <div className="bg-[#111827] border border-gray-600 p-5 lg:p-8 rounded-3xl md:rounded-[40px] shadow-xl flex flex-col md:flex-row lg:items-center relative">
        <p className=" absolute right-3 sm:right-5 top-4 text-xs sm:text-xl w-fit px-4 font-semibold p-1 border-2 rounded-full flex justify-center items-center border-blue-500 text-blue-500">
          DA
        </p>
        <div className="flex flex-col sm:flex-row md:block items-center sm:items-start sm:justify-between">
          <div className="w-40 sm:w-48 md:w-56 xl:w-60">
            <div
              className="nc-NcImage aspect-w-1 aspect-h-1 rounded-3xl overflow-hidden"
              data-nc-id="NcImage"
            >
              <Image
                width={200}
                height={200}
                src="https://ipfs.bluemove.net/uploads3/eragon-passport/logo.gif"
                className="object-cover w-full h-full "
                alt="nc-imgs"
              />
            </div>
          </div>
          <div className="flex items-center sm:justify-center space-x-3 !mt-4">
            <div className="flex space-x-1.5 text-neutral-300">
              <div className="flex flex-row space-x-2 items-center">
                <Link className="p-1.5 bg-gray-500/50 rounded-full" href="#">
                  <AiOutlineDiscord size={25} />
                </Link>
                <Link className="p-1.5 bg-gray-500/50 rounded-full" href="#">
                  <LiaTelegramPlane size={24} />
                </Link>
                <Link className="p-1.5 bg-gray-500/50 rounded-full" href="#">
                  <TfiTwitter size={22} />
                </Link>
                <Link className="p-1.5 bg-gray-500/50 rounded-full" href="#">
                  <PiGlobeHemisphereWestLight size={24} />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5 md:mt-0 md:ml-8 xl:ml-14 flex-grow">
          <div className="max-w-screen-sm">
            <div className="flex gap-2 items-center">
              <h2 className="inline-block text-2xl sm:text-3xl lg:text-4xl font-semibold ">
                Eragon Passport
              </h2>
              <div className="relative w-fit z-10">
                <div className="ml-1 cursor-pointer">
                  <p className="min-w-8 mb-1">
                    <svg className="w-8 h-8" viewBox="0 0 17 17" fill="none">
                      <path
                        d="M7.66691 2.62178C8.12691 2.22845 8.88025 2.22845 9.34691 2.62178L10.4002 3.52845C10.6002 3.70178 10.9736 3.84178 11.2402 3.84178H12.3736C13.0802 3.84178 13.6602 4.42178 13.6602 5.12845V6.26178C13.6602 6.52178 13.8002 6.90178 13.9736 7.10178L14.8802 8.15512C15.2736 8.61512 15.2736 9.36845 14.8802 9.83512L13.9736 10.8884C13.8002 11.0884 13.6602 11.4618 13.6602 11.7284V12.8618C13.6602 13.5684 13.0802 14.1484 12.3736 14.1484H11.2402C10.9802 14.1484 10.6002 14.2884 10.4002 14.4618L9.34691 15.3684C8.88691 15.7618 8.13358 15.7618 7.66691 15.3684L6.61358 14.4618C6.41358 14.2884 6.04025 14.1484 5.77358 14.1484H4.62025C3.91358 14.1484 3.33358 13.5684 3.33358 12.8618V11.7218C3.33358 11.4618 3.19358 11.0884 3.02691 10.8884L2.12691 9.82845C1.74025 9.36845 1.74025 8.62178 2.12691 8.16178L3.02691 7.10178C3.19358 6.90178 3.33358 6.52845 3.33358 6.26845V5.12178C3.33358 4.41512 3.91358 3.83512 4.62025 3.83512H5.77358C6.03358 3.83512 6.41358 3.69512 6.61358 3.52178L7.66691 2.62178Z"
                        fill="#38BDF8"
                        stroke="#38BDF8"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                      <path
                        d="M6.08691 8.98833L7.69358 10.6017L10.9136 7.375"
                        stroke="white"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                    </svg>
                  </p>
                </div>
              </div>
            </div>
            <span className="block mt-4 text-sm text-neutral-400">
              Unlock Eragon{"'"}s world with Eragon Passport NFT: Limited 999
              tickets to exclusive benefits &amp; gaming supremacy.
            </span>
          </div>
          <div className="mt-6 xl:mt-8 grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 xl:gap-6">
            <div className="rounded-2xl flex flex-col items-center justify-center shadow-md border border-gray-600 p-5 lg:p-6">
              <span className="text-sm text-neutral-400">Mint Price</span>
              <span className="font-medium text-base mt-4 sm:text-xl sm:mt-6">
                0.285 MNT
              </span>
              <span className="text-xs mt-1 text-green-500">+0.35%</span>
            </div>
            <div className="rounded-2xl flex flex-col items-center justify-center shadow-md border border-gray-600 p-5 lg:p-6">
              <span className="text-sm text-neutral-400">Volume</span>
              <span className="font-medium text-base mt-4 sm:text-xl sm:mt-6">
                55.51 MNT
              </span>
              <span className="text-xs text-neutral-400 mt-1">total</span>
            </div>
            <div className="rounded-2xl flex flex-col items-center justify-center shadow-md border border-gray-600 p-5 lg:p-6">
              <span className="text-sm text-neutral-400">Latest Price</span>
              <span className="font-medium text-base mt-4 sm:text-xl sm:mt-6">
                0.284 MNT
              </span>
              <span className="text-xs mt-1 text-red-500">-11.20%</span>
            </div>
            <div className="rounded-2xl flex flex-col items-center justify-center shadow-md border border-gray-600 p-5 lg:p-6">
              <span className="text-sm text-neutral-400">Items</span>
              <span className="font-medium text-base mt-4 sm:text-xl sm:mt-6">
                999
              </span>
              <span className="text-xs text-neutral-400 mt-1">total</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JumboCard;
