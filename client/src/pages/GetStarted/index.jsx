import React from "react";
import { useNavigate } from "react-router";
import style from "./style.module.css";

export default function GetStarted() {
  const goTo = useNavigate();
  return (
    <>
      <div id="get-started" className={style["container"]}>
        <button
          className={style["get-started"]}
          onClick={() => goTo("/login#fw")}
        >
          Get Started
        </button>
      </div>
    </>
  );
}
