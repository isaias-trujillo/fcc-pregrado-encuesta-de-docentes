import { Button } from "@/components/ui/button.tsx";
import useSurreal from "@/modules/shared/infrastructure/useSurreal";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const Navbar = () => {
  const { user, disconnect } = useSurreal();
  const navigate = useNavigate();

  const onClick = () => {
    toast.promise(
      disconnect().finally(() => navigate("/")),
      {
        success: "Hasta pronto. 👋",
        error: `Error al cerrar sesion.`,
      },
    );
  };

  return (
    <nav className="flex flex-wrap flex-row justify-between w-full place-content-center place-items-center h-fit max-sm:justify-center gap-8">
      <span className="px-6 py-2 rounded-full font-semibold bg-accent text-[clamp(0.75rem,1rem+5vw,1.05rem)]">
        Hola 👋, {user}
      </span>
      <Button onClick={onClick}>
        <LogOut />
        Cerrar Sesion
      </Button>
    </nav>
  );
};
export default Navbar;
