import Image from "next/image";
import JumboCard from "./JumboCard";

const Banner = () => {
  return (
    <div className="relative w-full h-40 md:h-60 2xl:h-72">
      <Image
        alt="nft-img"
        className="w-full h-full inset-0 object-cove"
        width={750}
        height={750}
        src="/banner.webp"
      />
      <div>
        <JumboCard />
      </div>
    </div>
  );
};

export default Banner;
