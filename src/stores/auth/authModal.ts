import { create } from "zustand";

export interface State {
  authModal: boolean;
}

export interface Actions {
  setAuthModal: (authModal: boolean) => void;
}

const initialState: State = {
  authModal: false,
};

const useAuthModalStore = create<State & Actions>((set) => ({
  ...initialState,
  setAuthModal: (authModal) => {
    set(() => ({
      authModal,
    }));
  },
}));

export default useAuthModalStore;
