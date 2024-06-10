import { ChevronDownIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import LaunchpadButton from "./LaunchpadButton";

const Menus = () => {
  return (
    <div className="flex flex-row items-center space-x-12">
      <Link href="#" className="font-bold text-xl">
        Explore
      </Link>
      <Link
        href="#"
        className="font-bold text-xl animation-header flex flex-row items-center "
      >
        Stats
        <ChevronDownIcon width={22} height={22} className="text-white ml-2" />
      </Link>

      {/* <Link
        href="#"
        className="font-bold text-xl flex flex-row items-center px-7 py-2.5 bg-gray-800/75 rounded-3xl"
      >
        Launchpad
        <ChevronDownIcon width={22} height={22} className="text-white ml-2" />
      </Link> */}
      <LaunchpadButton />
    </div>
  );
};

export default Menus;
