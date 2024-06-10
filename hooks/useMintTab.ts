import { MintTabStore } from '@/types'
import { create } from 'zustand'

export const useMintTab = create<MintTabStore>((set) => ({
  currentTab: "Whitelist",
  setCurrentTab: (tab) => set({ currentTab: tab }),
}))