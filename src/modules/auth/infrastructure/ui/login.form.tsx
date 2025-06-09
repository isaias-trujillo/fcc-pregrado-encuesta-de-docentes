import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import loginSchema from "@/modules/auth/infrastructure/schemas/login.schema.ts";
import { ArrowRight, KeyRound, Mail } from "lucide-react";
import { toast } from "sonner";
import useSurreal from "@/modules/shared/infrastructure/useSurreal";

const LoginForm = () => {
  const { login } = useSurreal();

  // 1. Define your form.
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = (payload: z.infer<typeof loginSchema>) => {
    toast.promise(() => login(payload), {
      success: "Bienvenido.",
      error: `Revisa tus credenciales.`,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2 text-[clamp(0.875rem,1.5vw,1rem)] font-medium">
                <Mail size={20} />
                Correo institucional
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="alex.martin@unmsm.edu.pe"
                  className="px-4 py-3 rounded-md border border-[#d9d9d9] focus:ring-2 focus:ring-[#ebdaf1] focus:border-transparent text-[clamp(0.75rem,1.5vw,0.875rem)]"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-[clamp(0.75rem,1vw,0.875rem)]" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2 text-[clamp(0.875rem,1.5vw,1rem)] font-medium">
                <KeyRound size={20} />
                Código de estudiante
              </FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="11234578"
                  className="px-4 py-3 rounded-md border border-gray-300 focus:ring-2 text-[clamp(0.75rem,1.5vw,1.25rem)]"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-[clamp(0.75rem,1vw,0.875rem)]" />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="flex w-full items-center text-[clamp(0.875rem,1.5vw,1rem)]"
        >
          <span>Continuar</span>
          <ArrowRight size={20} />
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
