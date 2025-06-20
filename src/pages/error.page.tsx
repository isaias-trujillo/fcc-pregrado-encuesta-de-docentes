import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
} from "@/components/ui/card";
import { LucideRefreshCw } from "lucide-react";
import type { FC } from "react";
import { toast } from "sonner";

const ErrorPage: FC<{ callback: () => Promise<void> }> = ({ callback }) => {
  return (
    <Card className="w-sm">
      <CardHeader>
        <CardTitle>Error al conectarse</CardTitle>
        <CardDescription>Ha tomado demasiado tiempo</CardDescription>
        <CardAction>
          <Button
            onClick={() =>
              toast.promise(callback, {
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
};

export default ErrorPage;
