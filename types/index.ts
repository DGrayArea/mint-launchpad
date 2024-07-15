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

export interface SaleParamsType {
  whitelistLimit: number;
  publicLimit: number;
  fcfsLimit: number;
  whitelistPrice: number | string | bigint;
  publicPrice: number | string | bigint;
  fcfsPrice: number | string | bigint;
  isWlActive: boolean;
  isPublicActive: boolean;
  isFcfsActive: boolean;
}

export interface MetadataParamsType {
  name: string;
  symbol: string;
  initBaseURI: string;
}

export interface NftDataType {
  website: string;
  x: string;
  telegram: string;
  discord: string;
  logoUri: string;
  backgroundUri: string;
}

export interface TabItem {
  backgroundUri: string;
  contractAddress: string;
  discord: string;
  logoUri: string;
  telegram: string;
  website: string;
  x: string;
}

export interface CollectionType {
  imageSrc: string;
  title: string;
  price: string;
  items: string;
  status: string;
  contract: string;
}
