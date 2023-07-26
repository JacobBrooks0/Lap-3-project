import { Routes, Route, Navigate } from "react-router-dom";

import {
  Login,
  Register,
  Dashboard,
  Profile,
  Games,
  Learn,
  NotFound,
  GetStarted,
  Language,
  Leaderboard,
} from "./pages";
import { AuthProvider } from "./contexts";
import { Welcome, User } from "./layouts";

import "./App.css";
import { Popup } from "./components";

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route element={<Welcome />}>
            <Route path="/" element={<GetStarted />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route element={<User />}>

            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/games" element={<Games />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/language" element={<Language/>} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
        <Popup />
      </AuthProvider>
    </>
  );
}

export default App;
