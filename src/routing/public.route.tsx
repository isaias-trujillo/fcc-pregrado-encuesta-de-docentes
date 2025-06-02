import useSurreal from "@/modules/shared/infrastructure/useSurreal";
import { Navigate, Outlet } from "react-router";

const PublicRoute = () => {
  const { authenticated } = useSurreal();
  if (authenticated) {
    return <Navigate to="/dashboard" />;
  }
  return <Outlet />;
};

export default PublicRoute;
