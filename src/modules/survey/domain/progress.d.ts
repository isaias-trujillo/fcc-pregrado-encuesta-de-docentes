import type Question from "@/modules/survey/domain/question";
import type Alternative from "@/modules/survey/domain/alternative";

type Progress = {
    questions: Question[]
    alternatives: Alternative[],
    save: any;
};

export default Progress;