import type Student from "@/modules/auth/domain/Student";
import { db } from "@/modules/shared/infrastructure/useSurreal";
import type State from "@/modules/survey/infrastructure/store/state";
import type { Data } from "@/modules/survey/infrastructure/store/state";
import { RecordId, Uuid } from "surrealdb";
import { create } from "zustand";

const useSurvey = create<State>((set, get) => ({
  status: "not started",
  progress: {
    completed: 0,
    total: 0,
    missing: 0,
  },
  search: async (payload) => {},
  listen: async (payload) => {
    const { uuid } = get();
    if (uuid) {
      return await db.subscribeLive<Data>(uuid, (action, result) => {
        // action can be: "CREATE", "UPDATE", "DELETE" or "CLOSE"
        if (action === "CLOSE") return;
        // result contains either the entire record, or a set of JSON patches when diff mode is enabled
        set(result);
      });
    }
    return db.info<Student>().then(async (info) => {
      if (!info) return;
      const { id: studentId } = info;
      const questionnaireId = new RecordId("questionnaire", {
        group: payload.group.id.toString(),
        professor: payload.group.professor.id.toString(),
        student: studentId,
      });
      console.log({ questionnaireId });
      return db.select<Data>(questionnaireId).then((data) => {
        if (!data) {
          return Promise.reject(new Error("No se encontró la encuesta."));
        }
        set(data);
        if (!get().uuid) {
          return db
            .query<[Uuid]>(
              "live select value status, progress from questionnaire where id = $id",
              {
                id: questionnaireId.id,
              },
            )
            .then(([uuid]) => {
              set({ uuid });
              return db.subscribeLive<Data>(uuid, (action, result) => {
                // action can be: "CREATE", "UPDATE", "DELETE" or "CLOSE"
                if (action === "CLOSE") return;
                // result contains either the entire record, or a set of JSON patches when diff mode is enabled
                set(result);
              });
            });
        }
      });
    });
  },
}));

export default useSurvey;
