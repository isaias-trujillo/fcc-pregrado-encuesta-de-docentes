import Navbar from "@/components/app/navbar.tsx";
import useGroups from "@/modules/groups/infrastructure/store/useGroups";
import QuestionProvider from "@/modules/questions/infrastructure/ui/question.provider";
import QuestionContainer from "@/modules/questions/infrastructure/ui/question.container";
import { Button } from "@/components/ui/button";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  LucideMoveLeft,
  LucideMoveRight,
} from "lucide-react";
import { Link } from "react-router";
import useSurvey from "@/modules/survey/infrastructure/store/useSurvey";

const SurveyInstancePage = () => {
  const { value, has, goTo } = useGroups();
  const group = value();
  const { status, progress, uuid } = useSurvey();

  return (
    <main className="flex flex-wrap-reverse flex-col place-content-center p-8 gap-8 m-8 shadow-xl rounded-md">
      <Navbar />
      <section className="flex flex-col px-6 py-4 gap-4 font-semibold bg-accent rounded-md text-[clamp(0.75rem,1vw,1rem)] transition-colors">
        <span>Docente: {group?.professor?.full_name}</span>
        <span>Curso: {group?.course.name}</span>
      </section>
      <QuestionProvider>
        <span>Status: {status ?? "🍊 🍊 🍊"}</span>
        <span>Progress: {JSON.stringify(progress) ?? "0%"}</span>
        <span>UUID: {uuid?.toString()}</span>
        <QuestionContainer />
      </QuestionProvider>
      <div className="flex flex-row gap-4 self-center">
        {has("previous") && (
          <Button onClick={() => goTo("previous")}>
            <LucideMoveLeft />
            Anterior
          </Button>
        )}
        {!has("previous") && (
          <Link to="/dashboard">
            <Button
              variant="link"
              className="gap-1"
              onClick={() => goTo("first")}
            >
              <ChevronLeftIcon
                className="opacity-60"
                size={16}
                aria-hidden="true"
              />
              Regresar
            </Button>
          </Link>
        )}
        {has("next") && (
          <Button onClick={() => goTo("next")}>
            Siguiente
            <LucideMoveRight />
          </Button>
        )}
        {!has("next") && (
          <Link to="/dashboard">
            <Button
              variant="link"
              className="gap-1"
              onClick={() => goTo("first")}
            >
              <ChevronRightIcon
                className="opacity-60"
                size={16}
                aria-hidden="true"
              />
              Enviar
            </Button>
          </Link>
        )}
      </div>
    </main>
  );
};

export default SurveyInstancePage;
