import type Group from "@/modules/groups/domain/group";
import type { Uuid } from "surrealdb";

type Props = Partial<{
  uuid: Uuid; // query listenner id
  status: "completed" | "in progress" | "not started";
}>;

type Actions = {
  listen: (payload: { group: Group }) => Promise<void>;
};

type State = Props & Actions;

export default State;
