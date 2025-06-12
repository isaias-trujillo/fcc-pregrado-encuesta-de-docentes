import "./App.css";
import { Route, Routes } from "react-router";
import LoginPage from "@/pages/login.page.tsx";
import PublicRoute from "@/routing/public.route";
import PrivateRoute from "@/routing/private.route";
import DashboardPage from "@/pages/dashboard.page";
import SurveyInstancePage from "@/pages/survey.page";
import CompletedPage from "@/pages/completed.page";

function App() {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/" element={<LoginPage />} />
      </Route>
      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<DashboardPage />}></Route>
        <Route path="/docentes" element={<SurveyInstancePage />}></Route>
        <Route path="/completed" element={<CompletedPage />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
