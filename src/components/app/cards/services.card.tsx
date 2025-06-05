import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

const ServicesCard = () => {
  return (
    <Card className="w-[clamp(min(35rem,100%),40rem+5dvw,45rem+5dvw)]">
      <CardHeader>
        <CardTitle className="text-[clamp(2rem,2rem+5dvw,2rem+2dvw)]">
          Calidad de servicios
        </CardTitle>
        <CardDescription>
          <span>Solo 30 preguntas.</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <span>Progreso: 0 de 30 preguntas</span>
      </CardContent>
      <CardFooter className="flex-col gap-2 justify-end">
        <Link to={`/servicios`} className="w-full">
          <Button className="w-full">
            Continuar
            <ArrowRight />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ServicesCard;
