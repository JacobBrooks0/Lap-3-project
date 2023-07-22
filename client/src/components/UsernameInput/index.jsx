import style from "./style.module.css";

export default function UsernameInput() {
  return (
    <fieldset className={style["input-container"]}>
      <label>Username: </label>
      <input
        type="text"
        name="username"
        placeholder="Username"
        size={1}
        required
      />
    </fieldset>
  );
}
