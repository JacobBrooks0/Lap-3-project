import { useState, useContext, createContext, useEffect } from "react";
import { useNavigate } from "react-router";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const goTo = useNavigate();

  useEffect(() => {
    const getUserDataByToken = async () => {
      const token = localStorage.getItem("token");
      //if no token, user must also be null
      if (!token) {
        setUser(null);
        return;
      }

      const options = {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          authorization: token,
        },
      };

      const response = await fetch(`${process.env.SERVER}/users`, options);
      const data = await response.json();

      if (response.statusCode === 200) {
        setUser(data);
      } else {
        //if token exists but the fetch request returns anything other than a 200 status code the token is invalid or the token never existed in the db at all
        alert("Couldn't get user information or your session has expired");
        localStorage.removeItem("token");
        setTimeout(() => goTo("/login"), 2000);
      }
    };

    getUserDataByToken();
  }, [localStorage.getItem("token")]);
    
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
