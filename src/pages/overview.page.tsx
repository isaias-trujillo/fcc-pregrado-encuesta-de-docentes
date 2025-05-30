import Navbar from "@/components/app/navbar.tsx";
import useGroups from "@/modules/groups/infrastructure/useGroups.ts";
import {useEffect, useState} from "react";
import useAuth from "@/modules/auth/infrastructure/stores/useAuth.ts";
import {Button} from "@/components/ui/button.tsx";
import {ArrowRight} from "lucide-react";
import {Link} from "react-router";
import type GroupResponseItem from "@/modules/groups/infrastructure/GroupResponseItem";

const OverviewPage = () => {
    const authStore = useAuth();
    const {init, getAll, groups, state} = useGroups();
    const [first, setFirst] = useState<GroupResponseItem | undefined>();

    useEffect(() => {
        if (authStore.state === 'authenticated') {
            init(authStore.code)
                .then(() => getAll(authStore.code).finally(() => setFirst(groups[0] ?? undefined)))
            ;
        }
    }, []);

    if (state === 'loading' || !first){
        return <span>Loading...</span>;
    }

    return <main
        className="flex flex-wrap-reverse flex-col place-content-center bg-violet-100 rounded-md p-8 gap-8 max-w-fit">
        <Navbar/>
        <section className='flex flex-row flex-wrap min-h-[20rem] gap-8 font-semibold'>
            <article className='bg-yellow-400 flex flex-col justify-center p-8 gap-8 rounded-2xl w-md'>
                <h1 className='text-7xl '>Docentes</h1>
                <span>10 preguntas por curso</span>
                <span>Progreso: 0 de {groups.length} cursos</span>
                <Button
                    className="flex w-full items-center text-[clamp(0.875rem,1.5vw,1rem)]"
                >
                    <Link to={`/cursos/${first?.course?.code}/seccion/${first?.section}`}>Continuar</Link>
                    <ArrowRight size={20}/>
                </Button>
            </article>
            <article className='bg-yellow-400 flex flex-col justify-center p-8 gap-8 rounded-2xl max-w-md'>
                <h1 className='text-7xl'>Calidad de servcios</h1>
                <span>30 preguntas</span>
                <span>0 de 30 de preguntas</span>
                <Button
                    className="flex w-full items-center text-[clamp(0.875rem,1.5vw,1rem)]"
                >
                    <span>Continuar</span>
                    <ArrowRight size={20}/>
                </Button>
            </article>
        </section>
    </main>
};

export default OverviewPage;
