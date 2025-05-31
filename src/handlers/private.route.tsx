import useAuth from "@/modules/auth/infrastructure/stores/useAuth.ts";
import {Navigate, Outlet} from "react-router";
import {useEffect, useState} from "react";

const PrivateRoute = () => {
    const {init, state} = useAuth();
    const [started, setStarted] = useState(false);

    useEffect(() => {
        init().then(() => setStarted(true));
    }, []);


    if (state === 'loading' || !started) {
        return <span>Loading</span>
    }
    if (state === 'authenticated') {
        console.log('rendering private children.')
        return <Outlet/>
    }
    return <Navigate to="/"/>
}

export default PrivateRoute;