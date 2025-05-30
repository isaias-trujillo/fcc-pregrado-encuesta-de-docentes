import { Badge } from "@/components/ui/badge";

const LoginHeader = () => (
    <span className="text-center lg:text-left mb-6 lg:mb-8">
        <h1 className="text-[clamp(2rem,5vw,4rem)] font-bold mb-6 leading-tight">
            Encuesta de <br/>
            satisfacción ~ <br/>
            2025-1
        </h1>

        <Badge
            variant="secondary"
            className="px-6 py-2 rounded-full font-semibold bg-violet-200 text-[#1c1b1f] hover:bg-violet-300 text-[clamp(0.75rem,1vw,1rem)] animate-bounce"
        >
                Pregrado
            </Badge>
    </span>
);

export default LoginHeader;