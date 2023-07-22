import { useRef } from "react";
import style from "./style.module.css";

export default function UsernameInput() {
  const inputRef = useRef(null);

  return (
    <fieldset className={style["input-container"]}>
      <label>Username: </label>
      <input
        type="text"
        name="username"
        placeholder="Username"
        ref={inputRef}
        size={1}
        required
        autoComplete="username"
      />
    </fieldset>
  );
}
