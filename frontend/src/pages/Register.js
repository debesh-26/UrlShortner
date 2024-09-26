import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/auth/register", {
        email,
        password,
      });
      alert("User registered successfully");
      navigate("/login");
    } catch (error) {
      setError("Registration failed");
    }
  };
  const goToLoginPage=()=>{
    navigate('/login')
  }
  return (
    <div className="body">
      <div className="login-container">
        <h2>Register</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleRegister}>
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
            Register
          </button>
          <button type="submit" className="button" onClick={goToLoginPage}>
          Already have a account ? Login Here
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
