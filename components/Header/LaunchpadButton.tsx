import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import {
  InboxArrowDownIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

export default function LaunchpadButton() {
  return (
    <div className="w-52 text-right">
      <Menu>
        <MenuButton className="font-bold text-xl flex flex-row items-center px-7 py-2.5 bg-gray-800/75 rounded-3xl data-[hover]:bg-gray-700 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white shadow-inner focus:outline-none  shadow-white/10">
          Launchpad
          <ChevronDownIcon width={22} height={22} className="text-white ml-2" />
        </MenuButton>
        <Transition
          enter="transition ease-out duration-75"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <MenuItems
            anchor="bottom end"
            className="w-52 origin-top-right rounded-xl border border-white/5 bg-[#111827] p-1 text-sm/6 text-white [--anchor-gap:var(--spacing-1)] focus:outline-none"
          >
            <MenuItem>
              <Link
                href="/"
                className="group flex w-full items-center gap-2 rounded-lg py-3 px-3 data-[focus]:bg-white/10"
              >
                <InboxArrowDownIcon className="size-4 fill-white/30" />
                Launches
              </Link>
            </MenuItem>

            <div className="my-1 h-px bg-white/5" />
            <MenuItem>
              {/**@dev includes a link to a google form for launchpad application */}
              <Link
                href="#"
                className="group flex w-full items-center gap-2 rounded-lg py-3 px-3 data-[focus]:bg-white/10"
              >
                <RocketLaunchIcon className="size-4 fill-white/30" />
                Apply for Launchpad
              </Link>
            </MenuItem>
          </MenuItems>
        </Transition>
      </Menu>
    </div>
  );
}
