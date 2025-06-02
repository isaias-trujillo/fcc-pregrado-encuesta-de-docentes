import Navbar from "@/components/app/navbar.tsx";
import useGroups from "@/modules/groups/infrastructure/store/useGroups";
import QuestionProvider from "@/modules/questions/infrastructure/ui/question.provider";
import QuestionContainer from "@/modules/questions/infrastructure/ui/question.container";
import { Button } from "@/components/ui/button";
import { LucideMoveLeft, LucideMoveRight } from "lucide-react";
import { Link } from "react-router";

const SurveyInstancePage = () => {
  const { value, previous, next, has } = useGroups();
  const group = value();

  return (
    <main className="flex flex-wrap-reverse flex-col place-content-center p-8 gap-8 m-8 shadow-xl rounded-md">
      <Navbar />
      <section className="flex flex-col px-6 py-4 gap-4 font-semibold bg-accent rounded-md text-[clamp(0.75rem,1vw,1rem)] transition-colors">
        <span>Docente: {group?.professor?.full_name}</span>
        <span>Curso: {group?.course.name}</span>
      </section>
      <QuestionProvider>
        <QuestionContainer />
      </QuestionProvider>
      <div className="flex flex-row gap-4 self-center">
        {has("previous") && (
          <Button onClick={previous}>
            <LucideMoveLeft />
            Anterior
          </Button>
        )}
        {!has("previous") && (
          <Link to="/dashboard">
            <Button>
              <LucideMoveLeft />
              Dashboard
            </Button>
          </Link>
        )}
        {has("next") && (
          <Button onClick={next}>
            Siguiente
            <LucideMoveRight />
          </Button>
        )}
        {!has("next") && (
          <Link to="/dashboard">
            <Button onClick={next}>
              Finalizar
              <LucideMoveRight />
            </Button>
          </Link>
        )}
      </div>
    </main>
  );
};

export default SurveyInstancePage;
