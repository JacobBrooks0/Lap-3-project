import { useNavigate } from "react-router-dom";
import axios from "axios";

import { writePopup } from "../Popup";

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
      await writePopup("You're being logged out");
      //we don't care whether the token has been deleted on the db or not
      axios.delete(`${import.meta.env.VITE_SERVER}/users/logout`, config);
      goTo("/");
    } catch (error) {
      writePopup(error.response.data.error);
      console.log(error);
    }
  };
  return <button onClick={LogOut}>Logout</button>;
}
