import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Login.css";
import axios from "axios";
import User_icon from "../Assets/person.png";
import password_icon from "../Assets/password.png";

const Login = () => {
  const navigate = useNavigate();
  const [action, setAction] = useState("Login");
  const [username, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.get("https://localhost:7256/api/Users");
      const users = response.data;
      const user = users.find(
        (user) => user.username === username && user.password === password
      );

      if (user) {
        alert("đăng nhập thành công");
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("username", username);
        navigate("/");
        window.location.reload();
      } else {
        alert("sai tài khoản hoặc mật khẩu xin đăng nhập lại");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      alert("Error fetching users");
    }
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  const handleSubmit = () => {
    if (action === "Login") {
      handleLogin();
    } else {
      handleSignup();
    }
  };

  return (
    <div className="background">
      <div className="container1">
        <div className="header1">
          <div className="text">{action}</div>
          <div className="underline"></div>
        </div>
        <div className="inputs">
          <div className="inp">
            <img src={User_icon} alt="" />
            <input
              className="log"
              type="text"
              placeholder="UserID"
              value={username}
              onChange={(e) => setUserId(e.target.value)}
            />
          </div>
          <div className="inp">
            <img src={password_icon} alt="" />
            <input
              className="log"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        {action === "Login" && (
          <div className="forgot-password">
            Forget Password? <span>Click Here!</span>
          </div>
        )}
        <div className="button-container">
          <div
            className={action === "Login" ? "button gray" : "button"}
            onClick={handleSubmit}
          >
            Login
          </div>
          <div
            className={action === "Sign Up" ? "button gray" : "button"}
            onClick={handleSignup}
          >
            Sign Up
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
