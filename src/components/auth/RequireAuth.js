import { Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import SignIn from "./SignIn";

const RequireAuth = () => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? <Outlet /> : <SignIn />;
};

export default RequireAuth;
