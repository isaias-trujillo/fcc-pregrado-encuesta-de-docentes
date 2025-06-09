import type Student from "@/modules/auth/domain/Student";
import type { ConnectionStatus } from "surrealdb";

type Actions = {
  connect: () => Promise<void>;
  disconnect: () => Promise<boolean>;
  login: (payload: { email: string; password: string }) => Promise<void>;
  reset: () => void;
};
type Props = {
  status: () => ConnectionStatus;
  token?: string;
  user?: Student["given_names"];
  authenticated?: boolean;
};

type State = Actions & Props;

export default State;
