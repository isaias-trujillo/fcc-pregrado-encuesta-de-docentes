import type State from "@/modules/questions/infrastructure/store/state";
import { create } from "zustand";
import type Question from "@/modules/questions/domain/question";
import { db } from "@/modules/shared/infrastructure/useSurreal";
import { persist } from "zustand/middleware";
import { RecordId, StringRecordId } from "surrealdb";
import type Student from "@/modules/auth/domain/Student";

const useQuestions = create(
  persist<State>(
    (setState) => ({
      tag: "idle",
      attempts: 0,
      data: [],
      retry: async () => {},
      reset: () => setState({ tag: "idle", attempts: 0, data: [] }),
      search: async (payload) => {
        setState({ tag: "loading" });
        return await db.info<Student>().then(async (info) => {
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
          const query = `
        LET $c = (SELECT * FROM choice order by score asc);
        return (SELECT *, $c as choices, ($questionnaireId->(asks where out = $parent.id).answer)[0] as answer FROM question ORDER BY _order);
      `;
          return db
            .query<[undefined, Question[]]>(query, {
              questionnaireId,
            })
            .then(([, data]) => {
              if (!data.length) {
                setState({ tag: "not found" });
                return;
              }
              setState({ tag: "success", data });
            })
            .catch((error) =>
              setState({ tag: "error", message: error.message }),
            );
        });
      },
    }),
    {
      name: "questions",
    },
  ),
);

export default useQuestions;
