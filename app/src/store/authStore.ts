import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthState = {
  token: string | null;
  user: any | null;
  hydrated: boolean;

  login: (token: string, user: any) => Promise<void>;
  logout: () => Promise<void>;
  hydrate: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  hydrated: false,

  hydrate: async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const user = await AsyncStorage.getItem('user');

      set({
        token,
        user: user ? JSON.parse(user) : null,
        hydrated: true,
      });
    } catch {
      set({ hydrated: true });
    }
  },

  login: async (token, user) => {
    await AsyncStorage.setItem('token', token);
    await AsyncStorage.setItem('user', JSON.stringify(user));

    set({ token, user });
  },

  logout: async () => {
    await AsyncStorage.multiRemove(['token', 'user']);
    set({ token: null, user: null });
  },
}));
