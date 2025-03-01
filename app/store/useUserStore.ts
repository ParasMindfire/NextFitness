import { create } from "zustand";
import { UserInterface } from "../types";


export const useUserStore = create<UserInterface>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

