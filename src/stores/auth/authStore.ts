import { create } from "zustand";
import { IUser, Integration } from "./user.types";
import secureStorage from "@/utils/secureLs";

export interface State {
  isAuthenticated: boolean;
  accessToken: string | null;
  user: IUser | null;
  integration: Integration | null;
}

export interface Actions {
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setToken: (token: string) => void;
  clearToken: () => void;
  setUser: (user: IUser | null) => void;
  clearUser: () => void;
  logout: () => void;
  setIntegration: (integration: Integration | null) => void;
}

const initialState: State = {
  isAuthenticated: secureStorage.get("accessToken") ? true : false,
  accessToken: secureStorage.get("accessToken") || null,
  user: secureStorage.get("user") || null,
  integration: secureStorage.get("integration") || null,
};

const useAuthStore = create<State & Actions>((set) => ({
  ...initialState,
  setIsAuthenticated: (isAuthenticated) => {
    set(() => ({
      isAuthenticated,
    }));
  },
  setToken: (token) => {
    set((state) => {
      // Set the access token and refresh token in the state
      const newState: State = {
        ...state,
        accessToken: token,
      };

      // Store the access token in secure storage
      secureStorage.set("accessToken", token);
      return newState;
    });
  },
  clearToken: () => {
    set(() => ({
      accessToken: null,
    }));
    secureStorage.remove("accessToken");
    secureStorage.remove("user");
  },
  setUser: (user) => {
    set((state) => {
      // Update the user object in the state
      const newState: State = {
        ...state,
        user,
      };

      // Store the updated user object in secure storage
      secureStorage.set("user", user);

      return newState;
    });
  },
  clearUser: () => {
    set((state) => ({
      ...state,
      user: null,
    }));
    secureStorage.remove("user");
  },
  logout: async () => {
    set(() => ({
      accessToken: null,
      user: null,
      isAuthenticated: false,
    }));
    secureStorage.remove("accessToken");
    secureStorage.remove("user");
  },
  setIntegration: (integration) => {
    set((state) => {
      // Update the user object in the state
      const newState: State = {
        ...state,
        integration,
      };

      // Store the updated user object in secure storage
      secureStorage.set("integration", integration);

      return newState;
    });
  },
}));

export default useAuthStore;
