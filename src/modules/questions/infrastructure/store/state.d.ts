import type Group from "@/modules/groups/domain/group";
import type Question from "@/modules/questions/domain/question";
import type { StringRecordId } from "surrealdb";

type Actions = {
  search: (payload: { group: Group }) => Promise<void>;
  retry: () => Promise<void>;
  reset: () => void;
  save: (payload: { question: Question }) => Promise<void>;
};

type Props = {
  data: Question[];
  attempts: number;
  message?: string;
};

type Tags =
  | { tag: "idle"; attempts: 0; data: [] }
  | {
      tag: "loading" | "max attempts reached" | "retrying";
    }
  | {
      tag: "not found";
      data: [];
    }
  | {
      tag: "error";
      message: string;
    }
  | {
      tag: "success";
      data: Question[];
      id: StringRecordId;
    };

type State = Props & Actions & Tags;

export default State;
