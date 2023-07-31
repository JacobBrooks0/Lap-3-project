import React from "react";
import { useLocation } from "react-router-dom";
import Alien1 from "../../../graphics/aliens_back/1.svg";
import Alien2 from "../../../graphics/aliens_back/2.svg";
import Alien3 from "../../../graphics/aliens_back/3.svg";
import LeftWing from "../../../graphics/aliens_back/leftwing1.svg";
import RightWing from "../../../graphics/aliens_back/rightwing1.svg";
import style from "./style.module.css";

export default function BgImages() {
  const { pathname } = useLocation();
  return (
    <>
      <div
        className={`${style["night-town"]} ${style["background"]} ${
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
        className={`${style["alien-planet"]} ${style["background"]} ${
          pathname.split("/")[1] !== "practice" ? style["bg-out"] : ""
        }`}
      />
      <div
        className={`${style["mountain-road"]} ${style["background"]} ${
          pathname.split("/")[1] !== "learn" ? style["bg-out"] : ""
        }`}
      />
    </>
  );
}
