import create from "zustand";
import { devtools, persist } from "zustand/middleware";

let store = (set) => ({
  user: null,
  setUser: (user) => set(() => ({ user: user })),
  removeUser: () => set({ user: null })
});

store = devtools(store);
store = persist(store, { name: "changetalk-user" });

const useStore = create(store);

export default useStore;
