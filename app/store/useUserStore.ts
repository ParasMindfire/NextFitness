import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { UserInterface } from '../types';
import { signOut } from 'next-auth/react';

export const useUserStore = create(
  persist<UserInterface>(
    (set) => ({
      user: null,
      accessToken: null,
      setUser: (user) => set({ user }),
        logout: () => {
          sessionStorage.removeItem('user-storage');
          set({ user: null, accessToken: null });
          signOut(); // Logout from NextAuth as well
        },
      }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => sessionStorage), // Use sessionStorage instead of localStorage
    }
  )
);
