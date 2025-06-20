import useGroups from "@/modules/groups/infrastructure/store/useGroups";
import { useEffect, type FC, type ReactNode } from "react";
import { toast } from "sonner";
import useQuestions from "../store/useQuestions";

type Props = {
  children: ReactNode;
};

const QuestionProvider: FC<Props> = ({ children }) => {
  const { value, index } = useGroups();
  const { search, tag, message } = useQuestions();
  useEffect(() => {
    const group = value();
    if (group) {
      search({ group });
    }
  }, [index]);

  useEffect(() => {
    switch (tag) {
      case "max attempts reached":
        toast.error("No se pudo cargar la encuesta.");
        break;
      case "not found":
        toast.error("No se encontró la encuesta.");
        break;
      case "error":
        toast.error(`Ocurrió un error al cargar la encuesta: ${message}`);
        break;
    }
  }, [tag]);

  if (tag === "loading" || tag === "retrying") {
    return <span>Cargando...</span>;
  }

  return children;
};

export default QuestionProvider;
