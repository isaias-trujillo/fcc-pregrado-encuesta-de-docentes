import {LoginForm} from "@/modules/auth/infrastructure/ui/login.form.tsx";
import LoginHeader from "@/modules/auth/infrastructure/ui/login.header.tsx";
import aside from '/public/login.aside.svg'

const LoginPage = () => {
    return <main className="flex flex-wrap-reverse flex-row bg-violet-50 place-content-center min-h-dvh p-2">
        <section className="flex flex-col">
            <LoginHeader/>
            <LoginForm/>
        </section>
        <aside className="w-[clamp(min(20rem,100%),25rem+5dvw,calc(4/10*100%))] flex flex-wrap flex-col place-content-center place-items-center">
            <img src={aside} alt='A woman'/>
            <a target='_blank'
               href='https://www.freepik.com/free-vector/team-checklist-concept-illustration_29808405.htm#fromView=search&page=1&position=5&uuid=c501743a-afca-460a-bafc-5f39407ae441'>Image
                by storyset on Freepik</a>
        </aside>
    </main>

};

export default LoginPage;