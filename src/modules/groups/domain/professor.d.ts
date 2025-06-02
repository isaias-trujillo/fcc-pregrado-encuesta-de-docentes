import type { StringRecordId } from "surrealdb";

type Professor = {
  given_names: string;
  id: StringRecordId;
  identity_document: string;
  last_names: string;
  full_name: string;
};

export default Professor;
