import { create } from 'zustand';

interface ThemeState {
  theme: string;
  setTheme: (theme: string) => void;
}

const useThemeStore = create<ThemeState>((set) => ({
  theme: 'default', // Default theme
  setTheme: (theme: string) => set(() => ({ theme })),
}));

export default useThemeStore;
