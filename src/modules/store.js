import create from "zustand";
import { devtools, persist } from "zustand/middleware";

let store = (set) => ({
  user: {
    email: null,
    name: null,
    accessToken: null,
    refreshToken: null,
    exp: null
  },
  setUser: (user) => set(() => ({ user: user })),
  logout: () => set({ user: null })
});

store = devtools(store);
store = persist(store, { name: "changetalk_user" });

const useStore = create(store);

export default useStore;
