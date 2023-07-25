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
} from "./pages";
import { AuthProvider } from "./contexts";
import { Welcome, User } from "./layouts";

import "./App.css";

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
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
