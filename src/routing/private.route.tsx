import GroupProvider from "@/modules/groups/infrastructure/ui/group.provider";
import useSurreal from "@/modules/shared/infrastructure/useSurreal";
import { Navigate, Outlet } from "react-router";

const PrivateRoute = () => {
  const { authenticated } = useSurreal();
  if (!authenticated) {
    return <Navigate to="/" />;
  }
  return (
    <GroupProvider>
      <Outlet />
    </GroupProvider>
  );
};

export default PrivateRoute;
