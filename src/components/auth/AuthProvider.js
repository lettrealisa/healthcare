import { createContext, useContext, useState } from "react";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [user, setUser] = ["test"];
  const [roles, setRoles] = ["test"];
  const [members, setMembers] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [rememberMe, setRememberMe] = useState(
    JSON.parse(localStorage.getItem("rememberMe")) || false
  );

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        rememberMe,
        setRememberMe,
        user,
        setUser,
        roles,
        setRoles,
        members,
        setMembers,
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
