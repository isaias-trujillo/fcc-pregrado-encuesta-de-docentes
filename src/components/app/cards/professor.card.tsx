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
    <Card className="w-md max-sm:w-[calc(100dvw-4rem)] font-semibold">
      <CardHeader>
        <CardTitle className="text-[clamp(2rem,2rem+5dvw,2rem+2dvw)]"></CardTitle>
        <CardDescription>
          <span className="text-[clamp(1rem,1rem+5dvw,1rem+2dvw)]">
            10 preguntas por curso
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <span className="text-[clamp(0.75rem,0.75rem+0.75dvw,0.75rem+1dvw)]">
          Cursos: {data.length}
        </span>
      </CardContent>
      <CardFooter className="flex-col gap-2 justify-end h-full">
        <Link to={`/docentes`} className="w-full">
          <Button className="w-full">
            Empezar
            <ArrowRight />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ProfessorCard;
