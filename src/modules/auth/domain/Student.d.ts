type Student = {
    given_names: string;
    surname: {
        paternal: string;
        maternal: string;
    };
    code: string;
    email: string;
};

export default Student;