import { Routes, Route } from "react-router-dom";

import { Login, Register } from "./pages";
import { Home } from "./layouts";

import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
