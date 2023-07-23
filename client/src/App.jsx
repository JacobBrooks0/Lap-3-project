import { Routes, Route, Navigate } from "react-router-dom";

import {
  Login,
  Register,
  Dashboard,
  Profile,
  Games,
  Learn,
  NotFound,
} from "./pages";
import { AuthProvider } from "./contexts";
import { Welcome, User } from "./layouts";

import "./App.css";

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<User />}>
            <Route index element={<Dashboard />} />
            <Route path="games" element={<Games />} />
            <Route path="learn" element={<Learn />} />
            <Route path="profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route element={<Welcome />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
