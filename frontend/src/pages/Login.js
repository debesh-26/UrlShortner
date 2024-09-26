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
      const response = await axios.post("http://localhost:3000/auth/login", {
        email,
        password,
      });
      console.log(response);
      localStorage.setItem("token", response.data.token);
      setisAuthenticated(true);
      navigate("/");
    } catch (error) {
      setError("Login failed");
    }
  };
  const goToRegisterinPage=()=>{
    navigate('/register')
  }

  return (
    <div className="body">
      <div className="login-container">
        <h2>Login</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
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
