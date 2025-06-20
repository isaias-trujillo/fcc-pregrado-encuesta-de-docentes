import { useEffect, type ReactNode } from "react";
import useSurvey from "@/modules/survey/infrastructure/store/useSurvey";
import useGroups from "@/modules/groups/infrastructure/store/useGroups";
import LoadingPage from "@/pages/loading.page";

const SurveyProvider = ({ children }: { children: ReactNode }) => {
  const { search, listen } = useSurvey();
  const { value, index } = useGroups();
  const group = value();

  useEffect(() => {
    if (!group) return;
    search({ group }).then((id) =>
      listen({ questionnaireId: id, callback: () => search({ group }) }),
    );
  }, [index]);

  if (!group) return <LoadingPage />;

  return children;
};

export default SurveyProvider;
