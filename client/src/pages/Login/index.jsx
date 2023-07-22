import { Link } from "react-router-dom";

import { UsernameInput, PasswordInput } from "../../components";

export default function Login() {
  const loginUser = async (e) => {
    e.preventDefault();

    const userDetails = new FormData(e.current.target);

    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: userDetails.get("username"),
        password: userDetails.get("password"),
      }),
    };

    const response = await fetch(`${process.env.SERVER}/users/login`, options);
    const data = await response.json();

    if (response.status == 201) {
      localStorage.setItem("token", data.token);
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
