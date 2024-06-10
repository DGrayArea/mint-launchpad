import Image from "next/image";
import Card from "./Card";
import Link from "next/link";

const Photo = () => {
  const contract = "0xCol";
  return (
    <Link href={`/collection/${contract}`} className="relative flex ml-[40%]">
      <div className="absolute -left-[500px] top-[8%] ml-[10%] transition-all">
        <Card />
      </div>

      <Image
        alt="nft-img"
        className="rounded-3xl sm:rounded-[40px] inset-0 object-cover border-4 sm:border-[14px] border-neutral-700/55 transition-all duration-100"
        width={750}
        height={750}
        src="/2.png"
      />
    </Link>
  );
};

export default Photo;
