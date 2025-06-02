import type { RecordId } from "surrealdb";

type Student = {
  id: RecordId<"student">;
  given_names: string;
  surname: {
    paternal: string;
    maternal: string;
  };
  code: string;
  email: string;
};

export default Student;
