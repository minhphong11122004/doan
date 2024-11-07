import "../css/Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar({ cartCount }) {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(localStorage.getItem("userId"));

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    setUserId(storedUserId);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userId");
    setUserId(null);
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
          Logo
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
        {userId ? (
          <>
            <Link to={`/account`} className="user-id">
              {userId}
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
