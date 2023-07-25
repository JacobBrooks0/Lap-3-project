import React from "react";
import { Outlet } from "react-router-dom";

import style from "./style.module.css";

export default function Home() {
  return (
    <>
      <div id="welcome-wrapper" className={style["container"]}>

        {/* ---------------------------------------------------------------- */}
        <Outlet />
      </div>
    </>
  );
}
