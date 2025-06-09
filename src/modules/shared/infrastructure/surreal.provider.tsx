import { useEffect, useState, type FC, type ReactNode } from "react";
import useSurreal, { db } from "@/modules/shared/infrastructure/useSurreal";
import LoadingPage from "@/pages/loading.page";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LucideRefreshCw } from "lucide-react";
import { toast } from "sonner";

const SurrealProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { connect } = useSurreal();
  const [checked, setChecked] = useState(false);
  const [accTime, setAccTime] = useState(0);

  const tryToConnect = async () => {
    try {
      await connect();
      await db.ready;
      setChecked(true);
      setAccTime(0); // Reset timer on successful connection
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
    return (
      <Card className="w-sm">
        <CardHeader>
          <CardTitle>Error al conectarse</CardTitle>
          <CardDescription>Ha tomado demasiado tiempo</CardDescription>
          <CardAction>
            <Button
              onClick={() =>
                toast.promise(tryToConnect, {
                  loading: "Reintentando...",
                  success: "Conectado",
                  error: "No se pudo conectar.",
                })
              }
            >
              <LucideRefreshCw />
              Reintentar
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <p>Podría deberse a un problema con la conexión a Internet.</p>
        </CardContent>
      </Card>
    );
  }

  if (!checked) return <LoadingPage />;

  return children;
};

export default SurrealProvider;
