import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Nhập useNavigate
import "../css/sign.css";
import User_icon from "../Assets/person.png";
import email_icon from "../Assets/email.png";
import password_icon from "../Assets/password.png";

function Signup() {
  const navigate = useNavigate(); // Khởi tạo useNavigate
  const [username, setUserid] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const handleInput = (event) => {
    const { name, value } = event.target;
    if (name === "username") {
      setUserid(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const submit = async (event) => {
    event.preventDefault();
    if (!username || !password) {
      setError("vui lòng điền đầy đủ thông tin");
      setMsg("");
    } else {
      setError("");

      try {
        // Gửi yêu cầu đăng ký tới API
        const response = await axios.post(
          "https://localhost:7256/api/Users/register",
          {
            username: username,
            password: password,
          }
        );

        console.log("Response:", response.data); // In ra phản hồi từ API

        // Kiểm tra phản hồi từ API
        if (response.status === 201) {
          // Kiểm tra mã trạng thái HTTP
          setMsg(`${username}: đăng ký thành công`);
          setUserid("");
          setPassword("");

          // Chuyển hướng về trang đăng nhập sau 2 giây
          setTimeout(() => {
            setMsg(""); // Xóa thông báo sau 2 giây
            navigate("/login"); // Chuyển hướng về trang đăng nhập
          }, 2000);
        } else {
          setError("lỗi thiếu thông tin"); // Nếu mã trạng thái không phải 200
        }
      } catch (error) {
        if (error.response && error.response.status === 409) {
          setError("lỗi 500");
        } else {
          setError("tên đã được sử dụng vui lòng nhập tên khác");
        }
        console.error("Signup error:", error);
      }
    }
  };

  return (
    <div className="BG">
      <form onSubmit={submit} className="container1">
        {msg && <h2>{msg}</h2>}
        {error && <h3 style={{ color: "red" }}>{error}</h3>}

        <div className="text">Sign Up</div>

        <div className="inputs">
          <div className="inp">
            <img src={User_icon} alt="" />
            <input
              className="log"
              type="text"
              placeholder="Tên đăng nhập"
              name="username"
              value={username}
              onChange={handleInput}
            />
          </div>
          <div className="inp">
            <img src={password_icon} alt="" />
            <input
              className="log"
              type="password"
              placeholder="Mật khẩu"
              name="password"
              value={password}
              onChange={handleInput}
            />
          </div>
        </div>

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
