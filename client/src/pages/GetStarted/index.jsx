import React from "react";
import { useNavigate } from "react-router";

export default function GetStarted() {
  const goTo = useNavigate();
  return <button onClick={() => goTo("/login")}>Get Started</button>;
}
