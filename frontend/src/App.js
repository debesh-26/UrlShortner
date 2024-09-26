import React, { useEffect, useState } from "react";
// import Header from "./components/Header";
import ThemeSwitcher from "./components/ThemeSwitcher";
import Register from "./pages/Register";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";

const App = () => {
  const [isauthenticated, setisAuthenticated] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setisAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setisAuthenticated(false);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/login"
          element={<Login setisAuthenticated={setisAuthenticated} />}
        />
      </Routes>
      {/* <ThemeSwitcher /> */}
    </Router>
  );
};

export default App;
