import { FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa6";
import { FaTelegram, FaDiscord } from "react-icons/fa";
import Link from "next/link";

const MobileSocials = () => {
  return (
    <div className="flex flex-row space-x-2">
      <Link href="#">
        <FaFacebookF
          size={32}
          className="p-1.5 rounded-full bg-[#1877F2] stroke-white"
        />
      </Link>
      <Link href="#">
        <FaTwitter
          size={32}
          className="p-1.5 rounded-full bg-[#1DA1F2] stroke-white"
        />
      </Link>
      <Link href="#">
        <FaYoutube
          size={32}
          className="p-1.5 rounded-full bg-[#FF0000] stroke-white"
        />
      </Link>
      <Link href="#">
        <FaTelegram
          size={32}
          className="p-1.5 rounded-full bg-[#24A1DE] stroke-white"
        />
      </Link>
      <Link href="#">
        <FaDiscord
          size={32}
          className="p-1.5 rounded-full bg-[#7785cc] stroke-white"
        />
      </Link>
    </div>
  );
};

export default MobileSocials;
