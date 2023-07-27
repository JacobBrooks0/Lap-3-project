import React from "react";
import { useLocation } from "react-router-dom";
import Alien1 from "../../../assets/aliens_back/1.svg";
import Alien2 from "../../../assets/aliens_back/2.svg";
import Alien3 from "../../../assets/aliens_back/3.svg";
import LeftWing from "../../../assets/aliens_back/leftwing1.svg";
import RightWing from "../../../assets/aliens_back/rightwing1.svg";
import style from "./style.module.css";

export default function BgImages() {
  const { pathname } = useLocation();

  return (
    <>
      <div
        className={`${style["cliff-night"]} ${style["background"]} ${
          pathname !== "/dashboard" ? style["bg-out"] : ""
        }`}
      >
        <Alien3 className={style["alien3"]} />
        <Alien2 className={style["alien2"]} />
        <div className={style["alien1"]}>
          <LeftWing />
          <Alien1 />
          <RightWing />
        </div>
      </div>
      <div
        className={`${style["spaceship-view"]} ${style["background"]} ${
          pathname !== "/profile" ? style["bg-out"] : ""
        }`}
      />
      <div
        className={`${style["night-landscape-moon"]} ${style["background"]} ${
          pathname !== "/leaderboard" ? style["bg-out"] : ""
        }`}
      />
      <div
        className={`${style["river"]} ${style["background"]} ${
          pathname !== "/language" ? style["bg-out"] : ""
        }`}
      />
    </>
  );
}
