import {RecordId} from "surrealdb";

type Group = {
    course: {
        code: string,
        name: string,
    };
    id: RecordId<{
        course: {
            code: string,
            name: string,
        };
        section: number;
    }>
    section: number;
};

export default Group;