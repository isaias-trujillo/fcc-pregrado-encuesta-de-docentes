import type Student from "@/modules/auth/domain/Student";
import { db } from "@/modules/shared/infrastructure/useSurreal";
import type State from "@/modules/survey/infrastructure/store/state";
import { RecordId, StringRecordId, Uuid } from "surrealdb";
import { create } from "zustand";

const useSurvey = create<State>((set, get) => ({
  listen: async (payload) => {
    return db.info<Student>().then(async (info) => {
      if (!info) {
        console.error("No student information found");
        return;
      }
      const { id: studentId } = info;
      const questionnaireId = new RecordId("questionnaire", {
        group: new RecordId("group", {
          course: new StringRecordId(payload.group.course.id),
          section: payload.group.section,
        }),
        professor: new StringRecordId(payload.group.professor.id),
        student: studentId,
      });
      return db
        .select<{ status: State["status"] }>(questionnaireId)
        .then(({ status }) => {
          if (!status) {
            console.error("No questionnaire found");
            return;
          }
          set({ status: status });
          if (!get().uuid) {
            return db
              .query<
                [Uuid]
              >(`live select value status from questionnaire where id = $id`, { id: questionnaireId })
              .then(([uuid]) => {
                set({ uuid });
                return db.subscribeLive(uuid, (action, result) => {
                  // action can be: "CREATE", "UPDATE", "DELETE" or "CLOSE"
                  if (action === "CLOSE") return;
                  // result contains either the entire record, or a set of JSON patches when diff mode is enabled
                  const { status } = result as { status: State["status"] };
                  set({ status });
                });
              });
          }
          const { uuid } = get();
          if (!uuid) {
            console.error("No uuid found");
            return;
          }
          return db.subscribeLive(uuid, (action, result) => {
            // action can be: "CREATE", "UPDATE", "DELETE" or "CLOSE"
            if (action === "CLOSE") return;
            // result contains either the entire record, or a set of JSON patches when diff mode is enabled
            const { status } = result as { status: State["status"] };
            set({ status });
          });
        });
    });
  },
}));

export default useSurvey;
