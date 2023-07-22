import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { UsernameInput, PasswordInput } from "../../components";

export default function Login() {
  const goTo = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();

    const userDetails = new FormData(e.current.target);

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
