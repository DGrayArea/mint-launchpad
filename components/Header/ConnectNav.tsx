import { ConnectKitButton } from "connectkit";
import Image from "next/image";
import truncateEthAddress from "truncate-eth-address";
import { createAvatar } from "@dicebear/core";
import { pixelArt } from "@dicebear/collection";

export const ConnectNav = () => {
  return (
    <ConnectKitButton.Custom>
      {({ isConnected, isConnecting, show, hide, address, ensName, chain }) => {
        const avatar = createAvatar(pixelArt, {
          seed: address,
          // ... other options
        });

        const png = avatar.toString();
        // Convert the SVG string to a data URI
        const avatarDataUri = `data:image/svg+xml;utf8,${encodeURIComponent(
          png
        )}`;
        return (
          <button
            onClick={show}
            className="bg-inherit border border-gray-500 px-4 py-4 whitespace-nowrap rounded-3xl text-sm font-bold w-full flex flex-roe items-center"
          >
            <Image
              width={24}
              height={24}
              className="rounded-full ring ring-gray-600 p-1 mr-4"
              src={avatarDataUri}
              alt="avatar"
            />
            {isConnected
              ? truncateEthAddress(String(address))
              : "Connect Wallet "}
          </button>
        );
      }}
    </ConnectKitButton.Custom>
  );
};
