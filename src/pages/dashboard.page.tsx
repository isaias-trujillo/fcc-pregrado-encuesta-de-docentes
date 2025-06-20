import ProfessorCard from "@/components/app/cards/professor.card";
import Navbar from "@/components/app/navbar.tsx";
import LoginHeader from "@/modules/auth/infrastructure/ui/login.header";
import useGroups from "@/modules/groups/infrastructure/store/useGroups.ts";
import {useEffect} from "react";

const DashboardPage = () => {
    const {goTo} = useGroups();

    useEffect(() => goTo('first'), [])

    return (
        <main
            className="bg-background text-foreground h-dvh max-w-max justify-self-center flex flex-col flex-wrap items-center justify-center rounded-md gap-6 p-6">
            <Navbar/>
            <LoginHeader/>
            <ProfessorCard/>
            <section className="flex flex-row flex-wrap gap-4">
                {/* <ServicesCard /> */}
            </section>
        </main>
    );
};

export default DashboardPage;
