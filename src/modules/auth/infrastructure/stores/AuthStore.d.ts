import type Student from "@/modules/auth/domain/Student";

type Actions = {
    login: (payload: { email: string, password: string }) => Promise<void>;
    logout: () => Promise<void>;
    init: () => Promise<void>;
    info: () => Promise<Student | undefined>;
    code?: string;
};

type AuthStore = Actions & ({
    state: 'idle' | 'loading';
} | {
    state: 'failure';
    message: string;
} | {
    state: 'authenticated';
    token: string;
})
export default AuthStore;