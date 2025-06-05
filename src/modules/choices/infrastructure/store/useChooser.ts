import type Student from "@/modules/auth/domain/Student";
import type State from "@/modules/choices/infrastructure/store/state";
import { db } from "@/modules/shared/infrastructure/useSurreal";
import { toast } from "sonner";
import { RecordId, StringRecordId } from "surrealdb";
import { create } from "zustand";

const useChooser = create<State>((setState) => {
  const state: State = {
    tag: "idle",
    submit: async (payload) => {
      setState({ tag: "loading" });
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
          .upsert(questionnaireId)
          .then(() =>
            db.relate(questionnaireId, "asks", payload.questionId, {
              answer: payload.answerId,
            }),
          )
          .catch(() =>
            db
              .query(
                `update only asks set answer = $answerId where in = $in and out = $out`,
                {
                  in: questionnaireId,
                  out: payload.questionId,
                  answerId: payload.answerId,
                },
              )
              .catch(() => {
                setState({
                  tag: "error",
                  message: "No se pudo guardar tu respuesta.",
                });
                toast.error("No se pudo guardar tu respuesta.");
              }),
          );
      });
    },
    reset: async () => setState({ tag: "idle" }),
  };
  return state;
});

export default useChooser;
