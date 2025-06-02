import { StringRecordId } from "surrealdb";
import type Professor from "@/modules/groups/domain/professor";
import type Course from "@/modules/groups/domain/course";

type Group = {
  _kind: string;
  course: Course;
  section: number;
  classroom: string;
  cycle: number;
  id: StringRecordId;
  professor: Professor;
};

export default Group;
