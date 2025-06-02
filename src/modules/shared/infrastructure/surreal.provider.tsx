import { useEffect, useState, type FC, type ReactNode } from "react";
import useSurreal, { db } from "@/modules/shared/infrastructure/useSurreal";
import LoadingPage from "@/pages/loading.page";

const SurrealProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { connect } = useSurreal();
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    connect()
      .then(() => db.ready.then(() => setChecked(() => true)))
      .catch(() => setChecked(() => false));
  }, []);
  if (!checked) return <LoadingPage />;
  return children;
};

export default SurrealProvider;
