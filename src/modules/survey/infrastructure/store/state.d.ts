import type Group from "@/modules/groups/domain/group";

type Props = {
  status: "completed" | "in progress" | "not started";
  progress: {
    completed: number;
    total: number;
    missing: number;
  };
};

type Actions = {
  listen: (payload: {
    questionnaireId: RecordId;
    callback: (data: Data) => void;
  }) => Promise<void>;
  search: (payload: { group: Group }) => Promise<RecordId>;
};

type State = Props & Actions;
export type Data = Pick<Props, "status" | "progress">;

export default State;
