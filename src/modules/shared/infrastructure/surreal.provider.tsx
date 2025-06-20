import useSurreal, { db } from "@/modules/shared/infrastructure/useSurreal";
import ErrorPage from "@/pages/error.page";
import LoadingPage from "@/pages/loading.page";
import { useEffect, useState, type FC, type ReactNode } from "react";

const SurrealProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { connect } = useSurreal();
  const [checked, setChecked] = useState(false);
  const [accTime, setAccTime] = useState(0);

  const tryToConnect = async () => {
    setAccTime(0); // Reset timer before attempting connection
    setChecked(false); // Reset checked state before attempting connection
    try {
      await connect();
      await db.ready;
      setChecked(true);
    } catch (e) {
      setChecked(false);
      throw e;
    }
  };

  // Intentar conectar una vez al montar
  useEffect(() => {
    tryToConnect();
  }, []);

  // Manejar el incremento de accTime si no se ha verificado la conexión
  useEffect(() => {
    if (checked || accTime >= 5000) return;

    const interval = setInterval(() => {
      setAccTime((prev) => prev + 1000);
    }, 1000);

    return () => clearInterval(interval);
  }, [checked, accTime]);

  if (accTime >= 5000) {
    return <ErrorPage callback={tryToConnect} />;
  }

  if (!checked) return <LoadingPage />;

  return children;
};

export default SurrealProvider;
