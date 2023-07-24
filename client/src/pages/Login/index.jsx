import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts";
import axios from "axios";

import { UsernameInput, PasswordInput } from "../../components";

export default function Login() {
  const goTo = useNavigate();

  const { user } = useAuth();
  if (user) goTo("/");

  const loginUser = async (e) => {
    e.preventDefault();

    const userDetails = new FormData(e.current.target);

    try {
      const config = {
        data: JSON.stringify({
          username: userDetails.get("username"),
          password: userDetails.get("password"),
        }),
      };

      const { status, data } = await axios.post(
        `${process.env.SERVER}/users/login`,
        config
      );

      if (status == 201) {
        localStorage.setItem("token", data.token);
        goTo("/");
      } else {
        alert(data.Error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form id="login-form" onSubmit={loginUser}>
        <UsernameInput />
        <PasswordInput />
        <button type="submit">Login</button>
      </form>
      <p>
        No account? <Link to="/register">Sign up here</Link>
      </p>
    </>
  );
}