import React from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";

const Header = ({isauthenticated,setisAuthenticated}) => {
  const navigate=useNavigate()
  const handleLogin=()=>{
      navigate('/login')
  }

  const handleRegister=()=>{
    navigate('/register')
}
const handleLogout=()=>{
  localStorage.removeItem("token");
  setisAuthenticated(false);
  navigate('/')
}
  
  return (
    <header className="header">
      <h1>ClipLink</h1>
      <div className="auth-buttons">
        {isauthenticated ? (
          <button className="login-btn" onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <button className="login-btn" onClick={handleLogin}>Login</button>
            <button className="register-btn" onClick={handleRegister}>Register</button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
