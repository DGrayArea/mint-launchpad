export type TabType = "Ongoing" | "Upcoming" | "Ended";
export type MintTabType = "Whitelist" | "FCFS" | "Public";

export interface TabStore {
  currentTab: TabType;
  setCurrentTab: (tab: TabType) => void;
}


export interface MintTabStore {
  currentTab: MintTabType;
  setCurrentTab: (tab: MintTabType) => void;
}

export interface CollectionType {
  imageSrc: string;
  title: string;
  price: string;
  items: string;
  status: string;
  contract: string
}
