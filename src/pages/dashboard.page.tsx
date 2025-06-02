import Navbar from "@/components/app/navbar.tsx";
import { Button } from "@/components/ui/button.tsx";
import useGroups from "@/modules/groups/infrastructure/store/useGroups";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

const DashboardPage = () => {
  const { data } = useGroups();

  console.count("Rendering dashbord page");

  return (
    <main className="flex flex-wrap-reverse flex-col place-content-center rounded-md p-8 gap-8 max-w-fit">
      <Navbar />
      <section className="flex flex-row flex-wrap min-h-[20rem] gap-8 font-semibold">
        <article className="bg-yellow-400 flex flex-col justify-center p-8 gap-8 rounded-2xl w-md">
          <h1 className="text-7xl ">Docentes</h1>
          <span>10 preguntas por curso</span>
          <span>Progreso: 0 de {data.length} cursos</span>
          <Button className="flex w-full items-center text-[clamp(0.875rem,1.5vw,1rem)]">
            <Link to={`/`}>Continuar</Link>
            <ArrowRight size={20} />
          </Button>
        </article>
        <article className="bg-yellow-400 flex flex-col justify-center p-8 gap-8 rounded-2xl max-w-md">
          <h1 className="text-7xl">Calidad de servcios</h1>
          <span>30 preguntas</span>
          <span>0 de 30 de preguntas</span>
          <Button className="flex w-full items-center text-[clamp(0.875rem,1.5vw,1rem)]">
            <span>Continuar</span>
            <ArrowRight size={20} />
          </Button>
        </article>
      </section>
    </main>
  );
};

export default DashboardPage;
