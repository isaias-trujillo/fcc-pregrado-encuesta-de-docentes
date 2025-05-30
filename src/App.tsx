import './App.css'
import {Route, Routes} from "react-router";
import LoginPage from "@/pages/login.page.tsx";
import PublicRoute from "@/handlers/public.route.tsx";
import PrivateRoute from "@/handlers/private.route.tsx";
import OverviewPage from "@/pages/overview.page.tsx";
import ProfessorSurveyPage from "@/pages/professors-survey/professor.survey.page.tsx";

function App() {

    return <Routes>
        <Route path="/" element={<PublicRoute><LoginPage/></PublicRoute>}/>
        <Route element={<PrivateRoute/>}>
            <Route path="/resumen" element={<OverviewPage/>}></Route>
            <Route path="/cursos/:course/seccion/:section" element={<ProfessorSurveyPage/>}></Route>
        </Route>
    </Routes>
}

export default App
