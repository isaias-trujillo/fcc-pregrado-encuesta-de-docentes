import type Choice from "@/modules/choices/domain/choice";
import type { StringRecordId } from "surrealdb";

type Question = {
  id: StringRecordId;
  stem: string;
  order: number;
  choices: Choice[];
  answer?: StringRecordId;
};

export default Question;
