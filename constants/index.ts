import { CollectionType } from "@/types";

const lightGreen = "#017009";
const darkGreen = "#003503";
const plainGreen = "#30592f";
const brown = "#d6b395";
const blue = "#52d8fc";
const blueBg = "#0b0f19";
const cardBg = "#111827";

const collectionData: CollectionType[] = [
  {
    imageSrc: "/logo.png",
    title: "Future Forward",
    price: "FREE",
    items: "100",
    status: "Ongoing",
    contract: "0xFut"
  },
  {
    imageSrc: "/1.png",
    title: "Mint Chain",
    price: "FREE",
    items: "1000",
    status: "Ongoing",
    contract: "0xMin"
  },
  {
    imageSrc: "/2.png",
    title: "Backward Comp",
    price: "0.5",
    items: "900",
    status: "Ongoing",
    contract: "0xBac"
  },
  {
    imageSrc: "/3.png",
    title: "PEPE Gold",
    price: "FREE",
    items: "7000",
    status: "Ongoing",
    contract: "0xPep"
  },
  {
    imageSrc: "/4.png",
    title: "Golden Fold",
    price: "2",
    items: "200",
    status: "Ongoing",
    contract: "0xGol"
  },
  {
    imageSrc: "/5.png",
    title: "Rick San",
    price: "FREE",
    items: "100",
    status: "Ongoing",
    contract: "0xRik"
  },
  {
    imageSrc: "/six.mp4",
    title: "Punk Col",
    price: "FREE",
    items: "500",
    status: "Ongoing",
    contract: "0xPuk"
  },

];

const cards : string[] = ["/1.png", "/2.png", "/3.png", "/4.png", "/5.png", ]

export { lightGreen, darkGreen, plainGreen, brown, blue, blueBg, cardBg, collectionData };
