import useAuth from "@/modules/auth/infrastructure/stores/useAuth.ts";
import {Navigate} from "react-router";
import {type ReactNode, useEffect, useState} from "react";

const PublicRoute = ({children}: { children: ReactNode }) => {
    const {state, init} = useAuth();
    const [started, setStarted] = useState(false);

    useEffect(() => {
        init().then(() => setStarted(true));
    }, []);

    if (state === 'loading' || !started) {
        return <span>Loading</span>
    }
    if (state === 'authenticated') {
        return <Navigate to="/resumen"/>
    }
    console.log('rendering public children.')
    return children
}

export default PublicRoute;