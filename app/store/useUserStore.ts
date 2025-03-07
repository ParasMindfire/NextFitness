import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { UserInterface } from '../types';

export const useUserStore = create(
  persist<UserInterface>(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
    }),
    {
      name: "user-storage", // Storage key name
      storage: createJSONStorage(() => localStorage), // Correct way to use localStorage
    }
  )
);
