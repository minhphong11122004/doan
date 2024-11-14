import "../css/Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
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
        <Link to="/" className="brand-logo">
        <img src={logo_icon} alt="" />
        </Link>
      </div>
      <div className="navbar-links">
        <Link to="/">Trang chủ</Link>
        <Link to="/product">Bộ sưu tập</Link>
        <Link to="/cart" className="nav-link">
          Giỏ hàng{" "}
          <span className="cart-count">
            {cartCount > 0 ? `(${cartCount})` : ""}
          </span>
        </Link>
      </div>

      <div className="navbar-search">
        <input type="text" className="search-input" placeholder="Tìm kiếm" />
      </div>


      <div className="navbar-user">
        {username ? (
          <>
            <Link to={`/account`} className="user-id">
              {username}
            </Link>
            <button onClick={handleLogout} className="logout">
              Đăng xuất
            </button>
          </>
        ) : (
          <button onClick={handleLogin} className="login">
            Đăng nhập
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
