import { useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts";
import axios from "axios";
import { UsernameInput, PasswordInput } from "../../components";
import { writePopup } from "../../components";

import style from "./style.module.css";

export default function Login() {
  const goTo = useNavigate();

  const { user, setUser } = useAuth();

  //if user already logged go directly to dashboard
  useEffect(() => {
    if (user) goTo("/dashboard");
  }, []);

  const loginUser = async (e) => {
    e.preventDefault();

    const userDetails = new FormData(e.target);

    try {
      const config = {
        username: userDetails.get("username"),
        password: userDetails.get("password"),
      };

      const { status, data } = await axios.post(
        `${import.meta.env.VITE_SERVER}/users/login`,
        config
      );

      if (status === 200) {
        localStorage.setItem("token", data.token);
        setUser(data.user);
        goTo("/language");
      }
    } catch (error) {
      writePopup(error.response.data.error);
      console.log(error);
    }
  };

  const { hash } = useLocation();
  return (
    <>
      <div
        className={`${hash !== "#fw" ? style["f-transition"] : ""} ${style["container"]
          }`}
      >
        <h1>Login</h1>
        <form id="login-form" onSubmit={loginUser}>
          <UsernameInput />
          <PasswordInput />
          <button type="submit">Login</button>
        </form>
        <p>
          No account? <Link to="/register">Sign up here</Link>
        </p>
      </div>
    </>
  );
}
