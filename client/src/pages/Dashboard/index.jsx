import React from "react";
import { useAuth } from "../../contexts";

import style from "./style.module.css";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <>
      <main id="dashboard" className={style["container"]}>
        <div />
        <div />
        <div />
        <div>
          <div>Profile</div>
          <h1>Well done!</h1>
          <h2>You made it {user}!</h2>
          <h2>🙌</h2>
        </div>
      </main>
    </>
  );
}
