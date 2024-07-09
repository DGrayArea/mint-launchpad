import { ConnectKitButton } from "connectkit";
import Image from "next/image";
import truncateEthAddress from "truncate-eth-address";
import { createAvatar } from "@dicebear/core";
import { pixelArt } from "@dicebear/collection";

export const MintConnect = () => {
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
            className="w-full mt-1.5 relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-3 sm:px-6 cursor-pointer disabled:bg-opacity-70 bg-blue-500 active:bg-blue-700 text-neutral-50 flex-1 delay-75"
          >
            {isConnected
              ? truncateEthAddress(String(address))
              : "Connect Wallet "}
          </button>
        );
      }}
    </ConnectKitButton.Custom>
  );
};
