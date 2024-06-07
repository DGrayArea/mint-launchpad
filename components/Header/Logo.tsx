import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link
      href="/"
      className="flex flex-row items-center font-extrabold text-3xl"
    >
      <Image
        src="/logo.png"
        width={80}
        height={80}
        alt="logo"
        className="rounded-full w-[60px] mr-3"
      />
      MintPad
    </Link>
  );
};

export default Logo;
