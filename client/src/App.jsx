import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import {
  Login,
  Register,
  Dashboard,
  Profile,
  Learn,
  NotFound,
  GetStarted,
  Leaderboard,
  Practice

} from "./pages";
import { AuthProvider } from "./contexts";
import { Welcome, User } from "./layouts";

import "./App.css";
import { LanguageProvider } from "./contexts/Language";
import { Popup } from "./components";


function App() {

  const [selectedLanguage, setSelectedLanguage] = useState("");

  return (
    <>
      <LanguageProvider>
        <AuthProvider>
          <Routes>
            <Route element={<Welcome />}>
              <Route path="/" element={<GetStarted />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>
            <Route element={<User />}>
              <Route
                path="/dashboard"
                element={
                  <Dashboard
                    selectedLanguage={selectedLanguage}
                    setSelectedLanguage={setSelectedLanguage}
                  />
                }
              />
              <Route path="/learn/:quizId" element={<Learn setSelectedLanguage={setSelectedLanguage} />} />
              <Route path="practice/:quizId" element={<Practice />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="*" element={<NotFound />} />
            </Route>
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
          <Popup />
        </AuthProvider>
      </LanguageProvider>
    </>
  );
}

export default App;
