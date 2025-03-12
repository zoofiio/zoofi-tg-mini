import { getTgUser, TGUser } from "@/libs/api";
import { getTgApp } from "@/libs/utils";
import { create } from "zustand";
import { useShallow } from "zustand/shallow";

export const useTgUser = create<{
  tguser?: TGUser;
  fetchTgUser: () => Promise<TGUser | undefined>;
}>((set) => ({
  fetchTgUser: async () => {
    const uid = getTgApp().initDataUnsafe.user?.id;
    if (uid) {
      const user = await getTgUser(uid);
      set({ tguser: user });
      return user;
    }
    return undefined;
  },
}));

export function useTGUser() {
  return useTgUser(useShallow((s) => s.tguser));
}

export function reFetchTGUser() {
  return useTgUser.getState().fetchTgUser();
}
