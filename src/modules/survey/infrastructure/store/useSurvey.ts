import type Student from "@/modules/auth/domain/Student";
import {db} from "@/modules/shared/infrastructure/useSurreal";
import type State from "@/modules/survey/infrastructure/store/state";
import type {Data} from "@/modules/survey/infrastructure/store/state";
import {RecordId, StringRecordId, Uuid} from "surrealdb";
import {create} from "zustand";


const initialState: Pick<State, 'status' | 'progress'> = {
    status: 'not started',
    progress: {
        completed: 0,
        total: 0,
        missing: 0
    }
};

const useSurvey = create<State>((set) => ({
    ...initialState,
    search: async (payload) => {
        return db.info<Student>().then(async (info) => {
            if (!info) return;
            const {id: studentId} = info;
            const questionnaireId = new RecordId("questionnaire", {
                group: new RecordId("group", {
                    course: new StringRecordId(payload.group.course.id),
                    section: payload.group.section,
                }),
                professor: new StringRecordId(payload.group.professor.id),
                student: studentId,
            });
            return db
                .select<Data>(questionnaireId)
                .then((data) => {
                    if (!data) {
                        return set(initialState);
                    }
                    console.log({
                        context: 'fetching survey progress',
                        data
                    })
                    set(data);
                })
                .then(() => questionnaireId)
                .catch(() => set(initialState));
        });
    },
    listen: async ({questionnaireId, callback}) =>
        db
            .query<[Uuid]>(
                `live select value in.{status,progress}
  from asks
  where in = r"${questionnaireId.toString().replace(/\\/g, "")}"`,
            )
            .then(([uuid]) =>
                db.subscribeLive<Data>(uuid, (action, result) => {
                    // action can be: "CREATE", "UPDATE", "DELETE" or "CLOSE"
                    if (action === "CLOSE") return;
                    // result contains either the entire record, or a set of JSON patches when diff mode is enabled
                    callback(result);
                }),
            ),
}));

export default useSurvey;
