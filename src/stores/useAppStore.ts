import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { defaultSettings } from '@/data/mock'
import type { Settings } from '@/types'

interface AppState {
  sidebarCollapsed: boolean
  settings: Settings
  toggleSidebar: () => void
  saveSettings: (settings: Settings) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      sidebarCollapsed: false,
      settings: defaultSettings,
      toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
      saveSettings: (settings) => set({ settings }),
    }),
    { name: 'orbit-admin-preferences', version: 1 },
  ),
)
