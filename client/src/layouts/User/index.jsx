import React from "react";
import { NavLink, Outlet, Navigate } from "react-router-dom";

import { useAuth } from "../../contexts";
import { LogoutButton } from "../../components";
import BgImages from "./BgImages/index.jsx";

import style from "./style.module.css";

export default function User() {
  const { user } = useAuth();
  return user ? (
    <>
      <div id="user-wrapper" className={style["container"]}>
        <BgImages />
        <header className={style["nav-bar"]}>
          <LogoutButton />
          <nav className={style["nav"]}>
            <NavLink to="/dashboard">Dashboard</NavLink>
            <NavLink to="/games">Games</NavLink>
            <NavLink to="/language">Pick a language</NavLink>
            <NavLink to="/leaderboard">Leaderboard</NavLink>
            <NavLink to="/profile">Profile</NavLink>
          </nav>
        </header>
        <Outlet />
      </div>
    </>
  ) : (
    <Navigate to="/" />
  );
}
