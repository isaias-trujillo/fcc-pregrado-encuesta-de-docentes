import aside from "@/assets/login.aside.svg";
import { Button } from "@/components/ui/button";
import LoginHeader from "@/modules/auth/infrastructure/ui/login.header.tsx";
import useSurreal from "@/modules/shared/infrastructure/useSurreal";
import { LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const CompletedPage = () => {
  const { disconnect } = useSurreal();
  const navigate = useNavigate();
  const [regresiveTime, setRegresiveTime] = useState(10);

  const onClick = () => {
    toast.promise(
      disconnect()
        .then(() => navigate("/"))
        .finally(() => window.location.reload()),
      {
        success: "Hasta pronto. 👋",
        error: `Error al cerrar sesion.`,
      },
    );
  };

  useEffect(() => {
    // each second decrease 1 second
    const id = setInterval(() => setRegresiveTime((prev) => prev - 1), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (regresiveTime <= 0) {
      console.log("Regresive time expired");
      return onClick();
    }
  }, [regresiveTime]);

  return (
    <main className="flex flex-wrap-reverse flex-row place-content-center min-h-dvh min-w-dvw p-2 bg-background text-foreground">
      <section className="flex flex-col">
        <LoginHeader />
        <span className="text-[clamp(1rem,2.5vw,2rem)] font-bold mb-6 leading-tight">
          ¡Gracias por tu participación! 😊
          <br />
        </span>
        <Button onClick={onClick}>
          <LogOut />
          Cerrar Sesion
        </Button>
        <span className="p-4 text-center">
          Esta página se cerrará en {regresiveTime} segundos.
        </span>
      </section>
      <aside className="w-[clamp(min(20rem,100%),25rem+5dvw,calc(4/10*100%))] flex flex-wrap flex-col place-content-center place-items-center">
        <img src={aside} alt="A woman" />
        <a
          target="_blank"
          href="https://www.freepik.com/free-vector/team-checklist-concept-illustration_29808405.htm#fromView=search&page=1&position=5&uuid=c501743a-afca-460a-bafc-5f39407ae441"
        >
          Image by storyset on Freepik
        </a>
      </aside>
    </main>
  );
};

export default CompletedPage;
