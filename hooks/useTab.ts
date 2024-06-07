import { TabStore } from '@/types'
import { create } from 'zustand'

export const useTab = create<TabStore>((set) => ({
  currentTab: "Ongoing",
  setCurrentTab: (tab) => set({ currentTab: tab }),
}))