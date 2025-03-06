import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { UserInterface } from '../types';

export const useUserStore = create<UserInterface>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
