import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = ({ setisAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://urlshortner-2ndt.onrender.com/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("urlLimit",response.data.user.urlLimit)
      
      
      setisAuthenticated(true);
      navigate("/");
      
      
    } catch (error) {
      
      setError((error.response.data.msg+" Please Register").toUpperCase());
    }
  };
  const goToRegisterinPage=()=>{
    navigate('/register')
  }

  return (
    <div className="body">
      <div className="login-container">
        <h2>Login</h2>
        {error && <p className="loginFailed" style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              className="in"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              className="in"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="button">
            Login
          </button>
          <button type="submit" className="button" onClick={goToRegisterinPage}>
            Don't have a account ? Register Here
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
