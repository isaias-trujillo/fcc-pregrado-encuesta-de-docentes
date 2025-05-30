export type GroupResponseItem = {
    _kind: 'regular 👍';
    career: {
        code: string;
        id: `career:${string}`;
        name: string;
    };
    classroom: string;
    course: {
        code: string;
        id: `course:${string}`;
        name: string;
    };
    cycle: number;
    professor: {
        given_names: string;
        id: `professor:${string}`;
        identity_document: string;
        surname: {
            maternal: string;
            paternal: string;
        };
    };
    section: number;
};;


export default GroupResponseItem;