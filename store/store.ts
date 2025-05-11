import { LocationObject } from 'expo-location';
import { create } from 'zustand';

type UserStore = {
  email?: string;
  isAuth?: boolean;
  setEmail: (email: string) => void;
  setAuth: (isAuth: boolean) => void;
};

const useUserStore = create<UserStore>()((set) => ({
  email: '',
  isAuth: false,
  setEmail: (email: string) => set(() => ({ email: email })),
  setAuth: (isAuth: boolean) => set(() => ({ isAuth: isAuth })),
}));

export type LocationT = { latitude: number; longitude: number };

type LocationStore = {
  location: LocationT | null;
  setLocation: (location: LocationT | null) => void;
};

const useLocationStore = create<LocationStore>()((set) => ({
  location: null,
  setLocation: (location) => set(() => ({ location: location })),
}));

export { useUserStore, useLocationStore };
