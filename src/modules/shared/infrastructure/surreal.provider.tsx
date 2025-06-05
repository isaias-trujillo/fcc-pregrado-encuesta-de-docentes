import { useEffect, useState, type FC, type ReactNode } from "react";
import useSurreal, { db } from "@/modules/shared/infrastructure/useSurreal";
import LoadingPage from "@/pages/loading.page";

const SurrealProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { connect } = useSurreal();
  const [checked, setChecked] = useState(false);
  const [accTime, setAccTime] = useState(0);

  useEffect(() => {
    connect()
      .then(() =>
        db.ready.then(() => {
          setChecked(() => true);
          setAccTime(0);
        }),
      )
      .catch(() => {
        setChecked(() => false);
        setInterval(() => {
          setAccTime((prev) => prev + 500);
        }, 500);
      });
  }, []);
  if (!checked) return <LoadingPage />;
  if (accTime >= 5000) {
    return <span>It took too many time of connection</span>;
  }
  return children;
};

export default SurrealProvider;
