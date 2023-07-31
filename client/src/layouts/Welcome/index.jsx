import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import UFO from "../../graphics/Welcome/alien_space_ship.png";

import style from "./style.module.css";

export default function Home() {
  const { pathname } = useLocation();
  const onWelcome = pathname === "/";
  return (
    <>
      <div
        id="welcome-wrapper"
        className={`${style["container"]} ${
          onWelcome ? style["w"] : style["lr"]
        }`}
      >
        <div
          className={`${style["earth-bg"]} ${style["background"]} ${
            onWelcome ? style["bg-out"] : ""
          } `}
        />
        <div
          className={`${style["alien-bg"]} ${style["background"]} ${
            !onWelcome ? style["bg-out"] : ""
          }`}
        />
        <main>
          <header className={style["header"]}>
            <div className={style["logo"]}>
              <svg viewBox="490 -180 700 250">
                <text>COSMOGLOTS</text>
              </svg>
            </div>
            <p>How long can you survive on Earth undetected?</p>
          </header>

          <img className={style["ufo"]} src={UFO} alt="alien spaceship" />
          {/* ---------------------------------------------------------------- */}
          <Outlet />
        </main>
      </div>
    </>
  );
}
