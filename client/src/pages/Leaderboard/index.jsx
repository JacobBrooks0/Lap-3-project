import { Leaderboard } from "../../components";
import style from "./style.module.css";
import { Users } from "../../components";

import React from "react";

export default function ShowLeaderboard() {
  return (
    <main className={`${style["outer-container"]} page`}>
      <div className={style["leader"]}>
        <Leaderboard />
        <Users />
      </div>
    </main>
  );
}
