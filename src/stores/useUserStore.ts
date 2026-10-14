import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { initialUsers } from '@/data/mock'
import type { User, UserInput } from '@/types'

interface UserState {
  users: User[]
  saveUser: (input: UserInput, id?: string) => boolean
  deleteUser: (id: string) => void
  toggleStatus: (id: string) => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      users: initialUsers,
      saveUser: (input, id) => {
        const normalized = { ...input, name: input.name.trim(), email: input.email.trim().toLowerCase(), department: input.department.trim() }
        if (get().users.some((user) => user.id !== id && user.email.toLowerCase() === normalized.email)) return false
        set((state) => ({
          users: id
            ? state.users.map((user) => user.id === id ? { ...user, ...normalized } : user)
            : [{ ...normalized, id: crypto.randomUUID(), createdAt: new Date().toISOString() }, ...state.users],
        }))
        return true
      },
      deleteUser: (id) => set((state) => ({ users: state.users.filter((user) => user.id !== id) })),
      toggleStatus: (id) => set((state) => ({ users: state.users.map((user) => user.id === id ? { ...user, status: user.status === '正常' ? '停用' : '正常' } : user) })),
    }),
    { name: 'orbit-admin-users', version: 1, partialize: (state) => ({ users: state.users }) },
  ),
)
