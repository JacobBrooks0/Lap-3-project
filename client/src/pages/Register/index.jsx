import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { UsernameInput, PasswordInput } from "../../components";

export default function Register() {
  const goTo = useNavigate();

  const registerUser = async (e) => {
    e.preventDefault();

    const userDetails = new FormData(e.current.target);

    try {
      const config = {
        body: JSON.stringify({
          username: userDetails.get("username"),
          password: userDetails.get("password"),
        }),
      };

      const response = await axios.post(
        `${process.env.SERVER}/users/register`,
        config
      );
      const data = await response.json();

      if (response.status == 201) {
        goTo("/login");
      } else {
        alert(data.Error);
      }
    } catch (error) {
      console.log(error);
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
