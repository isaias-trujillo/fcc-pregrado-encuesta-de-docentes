import db from "@/modules/shared/infrastructure/surreal.db";
import {create} from "zustand";
import {persist} from "zustand/middleware";
import type AuthStore from "./AuthStore.d.ts";
import type Student from "@/modules/auth/domain/Student";

const useAuth = create(persist<AuthStore>(
        (set, get) => ({
            state: 'idle',
            login: async ({email, password}) => {
                set({state: 'loading'});
                try {
                    await db.connect(import.meta.env.VITE_SURREAL_ENDPOINT);
                    await db.use({namespace: "undergraduate", database: "surveys"});
                    const token = await db.signin({
                        access: "account",
                        variables: {
                            "email": email,
                            "password": password,
                        }
                    });
                    set({token, state: 'authenticated', code: password});
                } catch (error) {
                    set({state: 'failure', message: `Failed to authenticate with ${email}: ${error}`});
                    throw new Error('Revise sus credenciales.');
                }
            },

            logout: async () => await db.invalidate()
                .then(() => set({
                    state: 'idle'
                })).finally(() => localStorage.clear()),

            init: async () => {
                const previous = get();
                const token = previous.state === 'authenticated' ? previous.token : undefined;
                if (!token) return;

                try {
                    set({state: 'loading'});
                    await db.connect(import.meta.env.VITE_SURREAL_ENDPOINT);
                    await db.use({namespace: "undergraduate", database: "surveys"});
                    await db.authenticate(token);
                    set({state: 'authenticated'});
                } catch (error) {
                    set({state: 'failure', message: `Failed to restore session: ${error}`});
                    await get().logout();
                    throw new Error('No se pudo recuperar su sesión.');
                }
            },
            info: async () => {
                return db.info<Student>();
            }
        }),
        {
            name: "auth-storage",
        }
    )
);

export default useAuth;