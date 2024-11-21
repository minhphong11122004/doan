import "../css/Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import User_icon from "../Assets/person.png";
import logo_icon from "../Assets/logo.png";

function Navbar({ cartCount }) {
  const navigate = useNavigate();
  const [username, setUserName] = useState(localStorage.getItem("username"));
  const [userId, setUserId] = useState(localStorage.getItem("userid"));
  const [isAdmin, setIsAdmin] = useState(
    localStorage.getItem("role") === "admin"
  );

  // Lấy thông tin người dùng từ localStorage khi ứng dụng load
  useEffect(() => {
    const storedUserName = localStorage.getItem("username");
    const storedUserId = localStorage.getItem("userid");
    const storedUserRole = localStorage.getItem("role");

    setUserName(storedUserName);
    setUserId(storedUserId);
    setIsAdmin(storedUserRole === "admin");
  }, []);

  // Xử lý đăng xuất
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    localStorage.removeItem("userid");
    localStorage.removeItem("role"); // Xóa role nếu có
    setUserName(null);
    setIsAdmin(false); // Reset trạng thái admin
    navigate("/");
    window.location.reload(); // Tải lại trang khi đăng xuất
  };

  // Chuyển hướng đến trang đăng nhập
  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="brand-logo">
          <img src={logo_icon} alt="Logo" />
        </Link>
      </div>

      <div className="navbar-links">
        <Link to="/">Trang chủ</Link>
        <Link to="/product">Bộ sưu tập</Link>
        <Link to="/about">Về chúng tôi</Link>
      </div>
      <div className="navbar-search">
        <div className="search-icon"></div>
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

        {/* Hiển thị thêm link quản lý nếu là admin */}
        {isAdmin && (
          <Link to="/admin" className="nav-link">
            Quản lý
          </Link>
        )}
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
