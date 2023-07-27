import React from "react";
import { NavLink, Outlet, Navigate, Link } from "react-router-dom";

import { useAuth } from "../../contexts";
import BgImages from "./BgImages/index.jsx";

import style from "./style.module.css";

export default function User() {
  const { user } = useAuth();
  return user ? (
    <>
      <div id="user-wrapper" className={style["container"]}>
        <header className={style["nav-bar"]}>
          <Link to="/language">
            <div className={style["logo"]}>
              <svg viewBox="490 -180 700 250">
                <text>COSMOGLOTS</text>
              </svg>
            </div>
          </Link>
          <nav className={style["nav"]}>
            <NavLink to="/language">Pick a language</NavLink>
            <NavLink to="/dashboard">Dashboard</NavLink>
            <NavLink to="/leaderboard">Leaderboard</NavLink>
            <NavLink to="/profile">Profile</NavLink>
          </nav>
        </header>
        <BgImages />
        <Outlet />
      </div>
    </>
  ) : (
    <Navigate to="/" />
  );
}
