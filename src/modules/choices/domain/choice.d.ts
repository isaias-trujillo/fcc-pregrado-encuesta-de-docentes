import type { StringRecordId } from "surrealdb";

type Choice = {
  id: StringRecordId;
  text: string;
  score: number;
};

export default Choice;
