import { useRef } from "react";

import ShowPassword from "../../assets/show_password.svg";
import style from "./style.module.css";

export default function PasswordInput() {
  const inputRef = useRef(null);

  return (
    <fieldset className={style["input-container"]}>
      <label>Password: </label>
      <div className={style["password-container"]}>
        <input
          type="password"
          name="password"
          placeholder="*********"
          ref={inputRef}
          size={1}
          required
          autoComplete="current-password"
        />
        <a
          className={style["password-toggler"]}
          onClick={() => {
            const input = inputRef.current;
            input.type = input.type == "text" ? "password" : "text";
          }}
        >
          <ShowPassword />
        </a>
      </div>
    </fieldset>
  );
}
