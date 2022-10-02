import { Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import SignIn from "./SignIn";

const RequireAuth = ({ roles }) => {
  const { user } = useAuth();

  return ["patient"].find((role) => roles?.includes(role)) ? (
    <Outlet />
  ) : (
    <SignIn />
  );
};

export default RequireAuth;
