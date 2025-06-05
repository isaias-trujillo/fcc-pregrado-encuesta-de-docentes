import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useGroups from "@/modules/groups/infrastructure/store/useGroups";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

const ProfessorCard = () => {
  const { data } = useGroups();

  return (
    <Card className="w-[clamp(min(30rem,100%),40rem+5dvw,45rem+5dvw)]">
      <CardHeader>
        <CardTitle className="text-[clamp(2rem,2rem+5dvw,2rem+2dvw)]">
          Docentes
        </CardTitle>
        <CardDescription>
          <span>10 preguntas por curso</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <span>Progreso: 0 de {data.length} cursos</span>
      </CardContent>
      <CardFooter className="flex-col gap-2 justify-end h-full">
        <Link to={`/docentes`} className="w-full">
          <Button className="w-full">
            Continuar
            <ArrowRight />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ProfessorCard;
