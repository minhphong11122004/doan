import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Nhập useNavigate
import "../css/sign.css";

function Signup() {
  const navigate = useNavigate(); // Khởi tạo useNavigate
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const handleInput = (event) => {
    const { name, value } = event.target;
    if (name === "userid") {
      setUserid(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const submit = async (event) => {
    event.preventDefault();
    if (!userid || !password) {
      setError("All fields are required");
      setMsg("");
    } else {
      setError("");

      try {
        // Gửi yêu cầu đăng ký tới API
        const response = await axios.post(
          "https://localhost:7256/api/Account",
          {
            userid: userid,
            password: password,
          }
        );

        console.log("Response:", response.data); // In ra phản hồi từ API

        // Kiểm tra phản hồi từ API
        if (response.status === 200) {
          // Kiểm tra mã trạng thái HTTP
          setMsg(`${userid}: Signup Successfully!`);
          setUserid("");
          setPassword("");

          // Chuyển hướng về trang đăng nhập sau 2 giây
          setTimeout(() => {
            setMsg(""); // Xóa thông báo sau 2 giây
            navigate("/login"); // Chuyển hướng về trang đăng nhập
          }, 2000);
        } else {
          setError("Signup failed. Please try again."); // Nếu mã trạng thái không phải 200
        }
      } catch (error) {
        if (error.response && error.response.status === 409) {
          setError("User ID already exists. Please choose another.");
        } else {
          setError("Error signing up. Please try again.");
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
          <div className="input">
            <input
              type="text"
              placeholder="User ID"
              name="userid"
              value={userid}
              onChange={handleInput}
            />
          </div>
          <div className="input">
            <input
              type="password"
              placeholder="Password"
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
