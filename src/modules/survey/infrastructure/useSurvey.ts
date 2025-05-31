import {create} from "zustand";
import {persist} from "zustand/middleware";
import db from "@/modules/shared/infrastructure/surreal.db.ts";
import type Progress from "@/modules/survey/domain/progress";
import type Question from "@/modules/survey/domain/question";
import type Alternative from "@/modules/survey/domain/alternative";
import type GroupResponseItem from "@/modules/groups/infrastructure/GroupResponseItem";

type Store = {
    init(payload: Partial<{
        studentCode: string,
        group: GroupResponseItem
    }>): Promise<void>;
    progress: Progress;
    check: (payload: {
        question: string;
        choice: string;
        studentCode: string;
        group: {
            course: string;
            section: number;
        }
    }) => Promise<unknown[]>;
};

const useSurvey = create(persist<Store>((set) => {
    return {
        progress: {
            questions: [],
            alternatives: [],
            save: [],
        },
        init: async (payload) => {
            // noinspection SqlNoDataSourceInspection
            const [questions, alternatives, ...save] = await db.query<[Question[], Alternative[], any[]]>(
                `select * from question;
                        select * from alternative;
                       select * from participates_in;`, {
                    code: payload.studentCode,
                    course: payload.group?.course?.code,
                    section: payload.group?.section,
                }).then(r => {
                    console.log({
                        message: 'result of many queries',
                        result: r
                    })
                    return r
            });
            set({
                progress: {
                    questions: questions?? [],
                    alternatives: alternatives??[],
                    save,
                } as Progress
            })
        },
        check: async (payload) => {
            return await db.query(`
            $course = type::thing('course', $course);
            $group = type::thing('group', { course: $course, section: $section });
            $student = type::thing('student', $code);
            $question = r'${payload.question}';
            $choice = r'${payload.choice}';
            $id = {
              group: $group,
              student: $student,
              question: $question
            };
            relate $student->answers->$question set id = $id, choice = $choice;
            `, {
                code: payload.studentCode,
                course: payload.group.course,
                section: payload.group.section,
                question: payload.question,
                choice: payload.choice
            })
        }
    }
}, {
    name: 'survey-storage',
}));

export default useSurvey;