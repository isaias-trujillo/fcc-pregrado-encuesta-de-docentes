import type Group from "@/modules/groups/domain/group";
import type { StringRecordId } from "surrealdb";

type Actions = {
  submit: (payload: {
    questionId: StringRecordId;
    answerId: StringRecordId;
    group: Group;
  }) => Promise<void | { [x: string]: unknown }[]>;
  reset: () => Promise<void>;
};

type Tags =
  | {
      tag: "idle" | "loading";
    }
  | {
      tag: "error";
      message: string;
    };

type State = Tags & Actions;

export default State;
