import useAuth from "@/modules/auth/infrastructure/stores/useAuth.ts";
import {Navigate} from "react-router";
import {type ReactNode, useEffect} from "react";

const PublicRoute = ({children}: { children: ReactNode }) => {
    const {state,init} = useAuth();

    useEffect(() => {
        init().catch(r => console.error(r));
    }, [init]);

    if (state === 'loading') {
        return <span>Loading</span>
    }
    if (state === 'authenticated') {
        return <Navigate to="/resumen"/>
    }
    return children
}

export default PublicRoute;