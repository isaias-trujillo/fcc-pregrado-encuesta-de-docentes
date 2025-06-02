import useGroups from "@/modules/groups/infrastructure/store/useGroups";
import LoadingPage from "@/pages/loading.page";
import { useEffect, type FC, type ReactNode } from "react";

const GroupProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { search, tag } = useGroups();
  useEffect(() => {
    search();
  }, []);
  if (tag === "loading") {
    return <LoadingPage />;
  }
  return children;
};

export default GroupProvider;
