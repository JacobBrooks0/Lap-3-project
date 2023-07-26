import React from "react";
import { NavLink, Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../../contexts";

import style from "./style.module.css";

export default function User() {
  const { user } = useAuth();
  return user ? (
    <>
      <nav className={style["nav"]}>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/games">Games</NavLink>
        <NavLink to="/learn">Learn</NavLink>
        <NavLink to="/profile">Profile</NavLink>
        <NavLink to="/leaderboard">Leaderboard</NavLink>
      </nav>
      <Outlet />
      {/* <footer>Snack Rankings 2022</footer> */}
    </>
  ) : (
    <Navigate to="/" />
  );
}
