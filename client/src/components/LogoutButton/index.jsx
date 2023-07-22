import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function LogoutButton() {
  const goTo = useNavigate();
  const LogOut = async () => {
    const config = {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    };

    try {
      localStorage.removeItem("token");
      //we don't care whether the token has been deleted on the db or not
      await axios.delete(`${process.env.SERVER}/users/logout`, config);
      goTo("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return <button onClick={LogOut}>Logout</button>;
}
