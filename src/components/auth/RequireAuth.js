import { Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import SignIn from "./SignIn";

const RequireAuth = ({ rolesList }) => {
  const { isLoggedIn } = useAuth();

  /*return roles.find((role) => rolesList?.includes(role)) ? (
    <Outlet />
  ) : (
    <SignIn />
  );*/
  return isLoggedIn ? <Outlet /> : <SignIn />;
};

export default RequireAuth;
