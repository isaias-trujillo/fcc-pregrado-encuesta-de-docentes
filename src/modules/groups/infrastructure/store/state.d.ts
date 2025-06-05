import type Group from "@/modules/groups/domain/group";

type Props = {
  data: Group[];
  attempts: number;
  message?: string;
  index: number;
};

type Actions = {
  search: () => Promise<void>;
  reset: () => void;
  retry: () => Promise<void>;
  value: () => Group | undefined;
  next: () => void;
  previous: () => void;
  goTo: (page: "first" | "previous" | number | "next" | "last") => void;
  has: (position: "previous" | "next") => boolean;
};

type Tags =
  | {
      tag:
        | "idle"
        | "loading"
        | "retrying"
        | "not found"
        | "max attempts reached";
    }
  | {
      tag: "success";
      data: Group[];
    }
  | {
      tag: "error";
      message: string;
    };

type State = Props & Actions & Tags;

export default State;
