import { Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import SignIn from "./SignIn";

const RequireAuth = ({ rolesList }) => {
  const { roles } = useAuth();

  return roles.find((role) => rolesList?.includes(role)) ? (
    <Outlet />
  ) : (
    <SignIn />
  );
};

export default RequireAuth;
