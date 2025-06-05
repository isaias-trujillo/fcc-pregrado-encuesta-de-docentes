import Surreal, { StringRecordId } from "surrealdb";
import { create } from "zustand";
import type State from "@/modules/shared/infrastructure/state";
import type Student from "@/modules/auth/domain/Student";
import { persist } from "zustand/middleware";
import { toast } from "sonner";

export const db = new Surreal();
const endpoint = import.meta.env.VITE_SURREAL_ENDPOINT;

const initalState: Partial<State> = {
  authenticated: false,
  token: undefined,
  user: undefined,
  id: undefined,
};

const useSurreal = create(
  persist<State>(
    (set, get) => ({
      status: () => db.status,
      reset: () => {
        set(initalState);
        localStorage.clear();
      },
      connect: async () => {
        await db.connect(endpoint, {
          namespace: "undergraduate",
          database: "surveys",
        });
        const { token } = get();
        if (!token) {
          return;
        }
        await db
          .authenticate(token)
          .then(() => set({ authenticated: true }))
          .catch(() => {
            get().reset();
            toast.error("Tu sesión ha expirado.");
          });
      },
      disconnect: async () => await db.invalidate().finally(get().reset),
      login: async (payload) => {
        const token = await db.signin({
          access: "account",
          variables: payload,
        });
        await db.authenticate(token).then(() => set({ authenticated: true }));
        const info = await db.info<Student>();
        if (!info) {
          return;
        }
        set({ token, user: info.given_names, id: new StringRecordId(info.id) });
      },
    }),
    {
      name: "surrealdb-storage",
    },
  ),
);

export default useSurreal;
