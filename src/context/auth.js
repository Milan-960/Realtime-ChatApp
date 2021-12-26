import { createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "@firebase/auth";
import { auth } from "../firebase";
import Loading from "../components/loading";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
      setloading(false);
    });
  }, []);
  if (loading) {
    return <Loading />;
  }

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
