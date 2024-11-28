import "../css/Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import User_icon from "../Assets/person.png";
import logo_icon from "../Assets/logo.png";
import TomSelect from "tom-select";
import "tom-select/dist/css/tom-select.css"; // Import CSS của TomSelect

function Navbar({ setSearchQuery, cartCount }) {
  const navigate = useNavigate();
  const [username, setUserName] = useState(localStorage.getItem("username"));
  const [userId, setUserId] = useState(localStorage.getItem("userid"));
  const [isAdmin, setIsAdmin] = useState(
    localStorage.getItem("role") === "admin"
  );

  const searchRef = useRef(null); // Tạo ref cho phần tử input tìm kiếm

  // Lấy thông tin người dùng từ localStorage khi ứng dụng load
  useEffect(() => {
    const storedUserName = localStorage.getItem("username");
    const storedUserId = localStorage.getItem("userid");
    const storedUserRole = localStorage.getItem("role");

    setUserName(storedUserName);
    setUserId(storedUserId);
    setIsAdmin(storedUserRole === "admin");

    // Khởi tạo TomSelect cho input tìm kiếm
    const tomSelectInstance = new TomSelect(searchRef.current, {
      valueField: "productId", // Giá trị duy nhất cho mỗi sản phẩm
      labelField: "productName", // Tên sản phẩm hiển thị trong dropdown
      searchField: ["productName", "productId", "giaFormatted"], // Tìm kiếm theo tên, ID, và giá
      load: function (query, callback) {
        if (!query) {
          callback([]);
          return;
        }

        const url = `https://localhost:7256/api/Sanpham?q=${encodeURIComponent(
          query
        )}`;
        fetch(url)
          .then((response) => response.json())
          .then((json) => {
            json.forEach((item) => {
              item.label = `${item.productName} - ${item.giaFormatted}`; // Tạo label cho mỗi sản phẩm
            });
            callback(json); // Trả về dữ liệu đã xử lý
          })
          .catch((error) => {
            console.error("Lỗi API:", error);
            callback([]);
          });
      },
      render: {
        option: function (item, escape) {
          return `
            <div class="py-2 d-flex">
              <div class="icon me-3">
                <img class="img-fluid" src="${
                  item.hinh || "default-image.jpg"
                }" alt="${escape(item.productName)}" />
              </div>
              <div>
                <div class="mb-1">
                  <span class="h4">${escape(item.productName)}</span>
                </div>
                <div class="description">${escape(item.moTa)}</div>
                <div class="price">${escape(item.giaFormatted)}</div>
              </div>
            </div>`;
        },
        item: function (item, escape) {
          return `
            <div class="py-2 d-flex">
              <div class="icon me-3">
                <img class="img-fluid" src="${
                  item.hinh || "default-image.jpg"
                }" alt="${escape(item.productName)}" />
              </div>
              <div>
                <div class="mb-1">
                  <span class="h4">${escape(item.productName)}</span>
                </div>
              </div>
            </div>`;
        },
      },
      onChange: function (value) {
        if (value) {
          // Thay vì options.find(), sử dụng items.find()
          const selectedProduct = tomSelectInstance.items.find(
            (item) => String(item.productId) === String(value)
          );

          if (selectedProduct) {
            console.log("Sản phẩm được chọn:", selectedProduct);

            // Lưu thông tin sản phẩm vào localStorage
            try {
              // Chuyển đối tượng sản phẩm thành chuỗi trước khi lưu
              localStorage.setItem(
                "selectedProduct",
                JSON.stringify(selectedProduct)
              );
              console.log("Đã lưu sản phẩm vào localStorage:", selectedProduct);
            } catch (error) {
              console.error("Lỗi khi lưu vào localStorage:", error);
            }
          }

          // Cập nhật tìm kiếm và chuyển hướng
          setSearchQuery(value);
          navigate("/product", { state: { query: value } });
        }
      },
    });

    // Cleanup TomSelect instance khi component unmount
    return () => tomSelectInstance.destroy();
  });

  // Xử lý đăng xuất
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    localStorage.removeItem("userid");
    localStorage.removeItem("role");
    setUserName(null);
    setIsAdmin(false); // Reset trạng thái admin
    navigate("/");
    window.location.reload();
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
        {/* Thay thế input bằng TomSelect */}
        <input
          ref={searchRef}
          className="search-input"
          placeholder="Tìm kiếm sản phẩm..."
        />
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
            <Link to="/account">
              <img src={User_icon} alt="" />
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
