import React, { createContext, useContext, useState } from "react";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [rememberMe, setRememberMe] = useState(
    JSON.parse(localStorage.getItem("rememberMe")) || false
  );
  const [user, setUser] = ["test"];
  const [roles, setRoles] = ["test"];
  const [members, setMembers] = React.useState({});

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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
