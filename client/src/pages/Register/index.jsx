import { Link, useNavigate } from "react-router-dom";

import { UsernameInput, PasswordInput } from "../../components";

export default function Register() {
  const goTo = useNavigate();

  const registerUser = async (e) => {
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

    const response = await fetch(
      `${process.env.SERVER}/users/register`,
      options
    );
    const data = await response.json();

    if (response.status == 201) {
      goTo("/")
    } else {
      alert(data.Error);
    }
  };

  return (
    <>
      <form id="register-form" onSubmit={registerUser}>
        <UsernameInput />
        <PasswordInput />
        <button type="submit">Register Account</button>
      </form>
      <p>
        Already registered? <Link to="/">Log in here</Link>
      </p>
    </>
  );
}
