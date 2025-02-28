import { create } from "zustand";
import { UserInterface } from "../types";

interface UserState {
  user: UserInterface | null;
  setUser: (user: UserInterface | null) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
