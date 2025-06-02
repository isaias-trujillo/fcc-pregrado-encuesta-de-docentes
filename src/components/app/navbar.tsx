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
        error: (e) => `Error al cerrar sesion: ${e.message}`,
      },
    );
  };

  return (
    <nav className="flex flex-wrap flex-row justify-between min-w-fit place-content-center place-items-center h-fit w-full">
      <span className="px-6 py-2 rounded-full font-semibold bg-gray-100 text-[clamp(0.75rem,1vw,1rem)]">
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
