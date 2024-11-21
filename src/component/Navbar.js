import "../css/Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import User_icon from "../Assets/person.png";
import logo_icon from "../Assets/logo.png";

function Navbar({ cartCount = 0 }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // Lấy thông tin người dùng từ localStorage khi ứng dụng load
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedUserRole = localStorage.getItem("role");

    setUsername(storedUsername);
    setIsAdmin(storedUserRole === "admin");
  }, []);

  // Xử lý đăng xuất
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    localStorage.removeItem("userid");
    localStorage.removeItem("role"); // Xóa role nếu có
    setUsername(null);
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
          <i className="fa fa-search"></i>
        </div>
        <input className="search-input" placeholder="Tìm kiếm sản phẩm..." />
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
              <img src={User_icon} alt="user-icon" />
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
