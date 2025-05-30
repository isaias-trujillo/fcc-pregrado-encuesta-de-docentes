import useAuth from "@/modules/auth/infrastructure/stores/useAuth.ts";
import {Navigate, Outlet} from "react-router";
import {useEffect, useState} from "react";
import {toast} from "sonner";

const PrivateRoute = () => {
    const {init, state} = useAuth();
    const [started, setStarted] = useState(false);

    useEffect(() => {
        init().then(() => setStarted(true)).catch(r => console.error(r));
    }, []);


    if (state === 'loading' || !started) {
        return <span>Loading</span>
    }
    if (state === 'authenticated') {
        return <Outlet/>
    }
    toast.error('No has iniciado sesión.')
    return <Navigate to="/" />
}

export default PrivateRoute;