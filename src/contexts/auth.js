import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    const userToken = localStorage.getItem("access_token");

    if (userToken) {
      setUser(userToken);
    }
  }, []);

  const signin = async (username, password) => {
    const res = await fetch(
      "https://mack-championship-api.herokuapp.com/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      }
    ).then((res) => res.json());

    if (res.access_token) {
      localStorage.setItem("access_token", res.access_token);
      setUser({ username, password });
      return;
    } else {
      return "Usuário ou senha inválidos";
    }
  };

  const signout = () => {
    setUser(null);
    localStorage.removeItem("access_token");
  };

  return (
    <AuthContext.Provider value={{ user, signed: !!user, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
};
