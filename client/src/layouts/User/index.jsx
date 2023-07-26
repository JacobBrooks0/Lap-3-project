import React from "react";
import { NavLink, Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../../contexts";
import { LogoutButton } from "../../components";

import style from "./style.module.css";

export default function User() {
  const { user } = useAuth();
  return user ? (
    <>

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
    </>
  ) : (
    <Navigate to="/" />
  );
}
