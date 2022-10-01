import { useAuth } from "../../context/AuthProvider";

const RequireAuth = () => {
  const { auth } = useAuth();
};

export default RequireAuth;
