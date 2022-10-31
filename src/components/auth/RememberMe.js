import { useEffect } from "react";
import useAuth from "./useAuth";
const RememberMe = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { setIsLoggedIn, isLoggedIn, rememberMe } = useAuth();
  useEffect(() => {
    const persistLogin = () => {};
  }, []);
};

export default RememberMe;
