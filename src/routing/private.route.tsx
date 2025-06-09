import GroupProvider from "@/modules/groups/infrastructure/ui/group.provider";
import useSurreal from "@/modules/shared/infrastructure/useSurreal";
import SurveyProvider from "@/modules/survey/infrastructure/ui/survey.provider";
import { Navigate, Outlet } from "react-router";

const PrivateRoute = () => {
  const { authenticated } = useSurreal();
  if (!authenticated) {
    return <Navigate to="/" />;
  }
  return (
    <GroupProvider>
      <SurveyProvider>
        <Outlet />
      </SurveyProvider>
    </GroupProvider>
  );
};

export default PrivateRoute;
