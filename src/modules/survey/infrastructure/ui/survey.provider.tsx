import { useEffect, type ReactNode } from "react";
import useSurvey from "../store/useSurvey";
import useGroups from "@/modules/groups/infrastructure/store/useGroups";

const SurveyProvider = ({ children }: { children: ReactNode }) => {
  const { listen } = useSurvey();
  const { value, index } = useGroups();

  useEffect(() => {
    const group = value();
    if (!group) return;
    listen({ group });
  }, [index]);

  return children;
};

export default SurveyProvider;
