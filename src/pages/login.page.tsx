import aside from "@/assets/login.aside.svg";
import LoginForm from "@/modules/auth/infrastructure/ui/login.form";
import LoginHeader from "@/modules/auth/infrastructure/ui/login.header.tsx";

const LoginPage = () => {
  return (
    <main className="flex flex-wrap-reverse flex-row place-content-center min-h-dvh min-w-dvw p-2 bg-background text-foreground">
      <section className="flex flex-col max-sm:w-5/6">
        <LoginHeader />
        <LoginForm />
      </section>
      <aside className="w-[clamp(min(20rem,100%),25rem+5dvw,calc(4/10*100%))] flex flex-wrap flex-col place-content-center place-items-center">
        <img src={aside} alt="A woman" />
        <span>Image by storyset on Freepik</span>
      </aside>
    </main>
  );
};

export default LoginPage;
