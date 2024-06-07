export type TabType = "Ongoing" | "Upcoming" | "Ended";

export interface TabStore {
  currentTab: TabType;
  setCurrentTab: (tab: TabType) => void;
}

export interface CollectionType {
  imageSrc: string;
  title: string;
  price: string;
  items: string;
  status: string;
}
