import { create } from "zustand";
import { persist } from "zustand/middleware";
import type State from "@/modules/groups/infrastructure/store/state";
import type Group from "@/modules/groups/domain/group";
import { db } from "@/modules/shared/infrastructure/useSurreal";

const initialState: Partial<State> = {
  tag: "idle",
  attempts: 0,
  data: [],
  message: undefined,
};

const useGroups = create<State>()(
  persist(
    (set, get) => ({
      tag: "idle",
      attempts: 0,
      data: [],
      index: 0,
      value: () => {
        const { data, index } = get();
        if (!data.length) return undefined;
        return data[index];
      },
      goTo: (page) => {
        const { data, index } = get();
        if (!data.length) return;
        if (typeof page === "number") {
          set({ index: Math.min(Math.max(0, page), get().data.length - 1) });
          return;
        }
        switch (page) {
          case "first":
            set({ index: 0 });
            break;
          case "last":
            set({ index: data.length - 1 });
            break;
          case "next":
            set({ index: Math.min(index + 1, data.length - 1) });
            break;
          case "previous":
            set({ index: Math.max(0, index - 1) });
            break;
          default:
            break;
        }
      },
      previous: () => {
        const { index } = get();
        set({ index: Math.max(0, index - 1) });
      },
      next: () => {
        const { data, index } = get();
        set({ index: Math.min(index + 1, data.length - 1) });
      },
      has: (position) => {
        const { data, index } = get();
        if (!data.length) return false;
        if (position === "next") return index < data.length - 1;
        if (position === "previous") return index > 0;
        return false;
      },
      reset: () => set(initialState),
      retry: async () => {},
      search: async () => {
        set({ tag: "loading" });
        const query =
          "select value groups.filter(|$i| $i.professor) from only type::thing('full_group', record::id($auth));";
        return db
          .query<[Group[]]>(query)
          .then(([data]) => {
            if (!data.length) {
              return Promise.reject(new Error("No se encontró ningún grupo."));
            }
            set({ tag: "success", data });
          })
          .catch((error) => set({ tag: "error", message: error.message }));
      },
    }),
    {
      name: "groups",
    },
  ),
);
export default useGroups;
