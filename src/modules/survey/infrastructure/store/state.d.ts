import type Group from "@/modules/groups/domain/group";
import type { Uuid } from "surrealdb";

type Props = {
  uuid?: Uuid; // query listenner id
  status: "completed" | "in progress" | "not started";
  progress: {
    completed: number;
    total: number;
    missing: number;
  };
};

type Actions = {
  listen: (payload: { group: Group }) => Promise<void>;
  search: (payload: { group: Group }) => Promise<void>;
};

type State = Props & Actions;
export type Data = Pick<Props, "status" | "progress">;

export default State;
