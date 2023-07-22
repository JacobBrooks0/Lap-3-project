import { Routes, Route } from "react-router-dom";

import { Login, Register, Home } from "./pages";
import ProtectedRoute from "./routes";
import { AuthProvider } from "./contexts";
import { Welcome } from "./layouts";

import "./App.css";

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<ProtectedRoute redirectTo="/login" />}>
            <Route index element={<Home />} />
          </Route>
          <Route element={<Welcome />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
