import { Badge } from "@/components/ui/badge";

const LoginHeader = () => (
  <span className="text-center lg:text-left mb-6 lg:mb-8">
    <p className="text-[clamp(2rem,5vw,4rem)] font-bold mb-6 leading-tight">
      <span>Encuesta de</span> <br />
      <span>satisfacción ~ </span> <br />
      <span className="dark:text-yellow-300 text-yellow-700"> 2025-1</span>
    </p>

    <Badge
      variant="secondary"
      className="px-6 py-2 rounded-full font-semibold bg-yellow-200 text-black text-[clamp(0.75rem,1vw+5dvw,1.15rem)] animate-bounce"
    >
      Pregrado
    </Badge>
  </span>
);

export default LoginHeader;
