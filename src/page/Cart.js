import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // Đảm bảo bạn có axios để gọi API
import "../css/Cart.css";

function Cart({ cartItems, setCartItems }) {
  const [notification, setNotification] = useState("");
  const [loading, setLoading] = useState(true); // Thêm state loading
  const [updatedCartItems, setUpdatedCartItems] = useState([]);

  // Lấy giỏ hàng từ localStorage khi trang tải
  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      try {
        setCartItems(JSON.parse(storedCartItems)); // Khôi phục giỏ hàng từ localStorage
      } catch (error) {
        console.error("Lỗi khi parse dữ liệu giỏ hàng từ localStorage:", error);
        setCartItems([]);
      }
    }
  }, [setCartItems]);

  // Lưu giỏ hàng vào localStorage khi cartItems thay đổi
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems)); // Lưu giỏ hàng vào localStorage
    }
  }, [cartItems]);

  // Lấy thông tin chi tiết của sản phẩm từ API khi giỏ hàng được hiển thị
  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true); // Bắt đầu tải
      try {
        const updatedItems = await Promise.all(
          cartItems.map(async (item) => {
            if (item.productId) {
              try {
                const response = await axios.get(
                  `https://localhost:7256/api/Sanpham/${item.productId}` // Thay URL API của bạn ở đây
                );
                return {
                  ...item,
                  productDetails: response.data.productDetails || [], // Cập nhật productDetails
                };
              } catch (error) {
                console.error("Lỗi khi lấy productDetails:", error);
                return item;
              }
            }
            return item;
          })
        );
        setUpdatedCartItems(updatedItems); // Cập nhật lại giỏ hàng với productDetails
      } catch (error) {
        console.error("Lỗi khi cập nhật giỏ hàng:", error);
      } finally {
        setLoading(false); // Kết thúc tải
      }
    };

    if (cartItems.length > 0) {
      fetchProductDetails(); // Gọi API để lấy productDetails
    } else {
      setLoading(false);
    }
  }, [cartItems]);

  // Tính tổng số sản phẩm trong giỏ hàng
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Hàm chọn size trong giỏ hàng
  const handleSizeChange = (index, size) => {
    const updatedItems = [...cartItems];
    updatedItems[index].selectedSize = size; // Lưu kích cỡ đã chọn vào sản phẩm
    setCartItems(updatedItems);

    // Lưu giỏ hàng với thông tin kích cỡ vào localStorage
    localStorage.setItem("cartItems", JSON.stringify(updatedItems));

    setNotification(
      `Đã chọn kích cỡ ${size} cho ${updatedItems[index].productName}.`
    );
  };

  // Hàm tăng số lượng sản phẩm trong giỏ hàng
  const handleIncrease = (index) => {
    const updatedItems = [...cartItems];
    updatedItems[index].quantity += 1;
    setCartItems(updatedItems);
    setNotification(
      `Đã tăng số lượng ${updatedItems[index].productName} trong giỏ hàng.`
    );
  };

  // Hàm giảm số lượng sản phẩm trong giỏ hàng
  const handleDecrease = (index) => {
    const updatedItems = [...cartItems];
    if (updatedItems[index].quantity > 1) {
      updatedItems[index].quantity -= 1;
      setCartItems(updatedItems);
      setNotification(
        `Đã giảm số lượng ${updatedItems[index].productName} trong giỏ hàng.`
      );
    }
  };

  // Hàm xóa sản phẩm khỏi giỏ hàng
  const handleRemove = (index) => {
    if (
      window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?")
    ) {
      const updatedItems = cartItems.filter((_, i) => i !== index); // Xóa sản phẩm khỏi giỏ hàng
      setCartItems(updatedItems); // Cập nhật lại giỏ hàng trong state
      localStorage.setItem("cartItems", JSON.stringify(updatedItems)); // Lưu giỏ hàng mới vào localStorage
      setNotification(`Đã xóa sản phẩm khỏi giỏ hàng.`);
      window.location.reload();
    }
  };

  // Tính tổng giá trị giỏ hàng
  const total = updatedCartItems.reduce((acc, item) => {
    const price = parseFloat(
      item.giaFormatted.replace(/[^\d.-]/g, "").replace(/\./g, "")
    );
    const quantity = item.quantity;
    if (!isNaN(price)) {
      return acc + price * quantity;
    }
    return acc; // Tránh cộng dồn khi giá trị không phải là số hợp lệ
  }, 0);

  // Định dạng tổng tiền theo kiểu tiền tệ (ví dụ: 1.964.000 VND)
  const formattedTotal = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(total);

  return (
    <div className="body1">
      <div className="cart-section">
        <div className="container">
          <h1 className="mb-5 text-center">Giỏ Hàng ({cartCount})</h1>
          {notification && <div className="notification">{notification}</div>}
          {loading ? (
            <p>Đang tải giỏ hàng...</p> // Hiển thị khi đang tải
          ) : updatedCartItems.length === 0 ? (
            <p className="text-center">Giỏ hàng của bạn đang trống.</p>
          ) : (
            <div>
              <table className="table cart-table">
                <thead>
                  <tr className="table-head">
                    <th>Sản phẩm</th>
                    <th>Hình ảnh</th>
                    <th>Mô tả</th>
                    <th>Giá</th>
                    <th>Số lượng</th>
                    <th>Màu sắc</th>
                    <th>Kích cỡ</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {updatedCartItems.map((item, index) => {
                    // Tách size từ chuỗi
                    const sizes =
                      item.productDetails && item.productDetails[0]?.size
                        ? item.productDetails[0].size.split(", ") // Tách chuỗi thành mảng
                        : [];

                    return (
                      <tr key={index}>
                        <td>{item.productName}</td>
                        <td>
                          <img
                            src={item.hinh}
                            alt={item.productName}
                            className="product-image1"
                          />
                        </td>
                        <td>{item.moTa}</td>
                        <td>{item.giaFormatted}</td>
                        <td>
                          <div className="qty-box">
                            <button onClick={() => handleDecrease(index)}>
                              -
                            </button>
                            <span>{item.quantity}</span>
                            <button onClick={() => handleIncrease(index)}>
                              +
                            </button>
                          </div>
                        </td>
                        <td>
                          {item.productDetails && item.productDetails[0]
                            ? item.productDetails[0].color
                            : "Chưa có màu"}
                        </td>
                        <td>
                          {/* Dropdown chọn size */}
                          <select
                            value={item.selectedSize || ""}
                            onChange={(e) =>
                              handleSizeChange(index, e.target.value)
                            }
                          >
                            <option value="">Chọn kích cỡ</option>
                            {sizes.map((size, sizeIndex) => (
                              <option key={sizeIndex} value={size}>
                                {size}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <button
                            onClick={() => handleRemove(index)}
                            className="remove-button"
                          >
                            Xóa
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <h3 className="total-price text-right">Tổng: {formattedTotal}</h3>
              <div className="left-side-button">
                <Link to="/thanhtoan">
                  <button className="checkout-button">
                    Tiến Hành Thanh Toán
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
