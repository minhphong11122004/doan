import "../css/Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import User_icon from "../Assets/person.png";
import logo_icon from "../Assets/logo.png";

function Navbar({ cartCount }) {
  const navigate = useNavigate();
  const [username, setUserName] = useState(localStorage.getItem("username"));
  const [userId, setUserId] = useState(localStorage.getItem("userid"));

  useEffect(() => {
    const storedUserName = localStorage.getItem("username");
    const storedUserId = localStorage.getItem("userid");
    setUserName(storedUserName);
    setUserId(storedUserId);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    localStorage.removeItem("userid");
    setUserName(null);
    navigate("/");
    window.location.reload();
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">
          <img src={logo_icon} alt="logo" />
        </Link>
      </div>
      <div className="navbar-links">
        <Link to="/">Trang chủ</Link>
        <Link to="/product">Bộ sưu tập</Link>
        <Link to="/about">Về chúng tôi</Link>
      </div>
      <div className="navbar-search">
        <div className="search-icon">
        </div>
        <input className="search-input" />
      </div>
      <div className="navbar-icons">
        <Link to="/wishlist">
          <i className="fa fa-heart"></i>
        </Link>
        <Link to="/cart">
          <i className="fa fa-shopping-cart"></i>
          {cartCount > 0 && <span className="cart-count">({cartCount})</span>}
        </Link>
      </div>
      <div className="navbar-user">
        {username ? (
          <>
            {/* Hiển thị ảnh đại diện khi đăng nhập */}
            <Link to="/account">
              <img src={User_icon} alt="" />
            </Link>
            <button onClick={handleLogout} className="logout">
              Đăng xuất
            </button>
          </>
        ) : (
          // Nút đăng nhập khi chưa có người dùng
          <button onClick={handleLogin} className="login">
            Đăng nhập
          </button>
        )}
      </div>

    </nav>
  );
}

export default Navbar;
