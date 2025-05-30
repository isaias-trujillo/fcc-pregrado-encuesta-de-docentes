import useAuth from "@/modules/auth/infrastructure/stores/useAuth.ts";
import {useEffect, useState} from "react";
import {toast} from "sonner";
import {Button} from "@/components/ui/button.tsx";
import {LogOut} from "lucide-react";
import type Student from "@/modules/auth/domain/Student";

const Navbar = () => {
    const {info, logout} = useAuth();
    const [profile, setProfile] = useState<Student | undefined>();


    useEffect(() => {
        info().then(r => setProfile(() => r)).catch(() => toast.error(`No se pudo recuperar tu información.`))
    }, []);

    return <nav
        className='flex flex-wrap flex-row justify-between min-w-fit place-content-center place-items-center h-fit w-full'>
        <span
            className='px-6 py-2 rounded-full font-semibold bg-violet-200 text-[#1c1b1f] hover:bg-violet-300 text-[clamp(0.75rem,1vw,1rem)]'>
            Hola 👋, {profile?.given_names}
        </span>
        <Button onClick={logout}>
            <LogOut/>
            Cerrar Sesion
        </Button>
    </nav>
};
export default Navbar;