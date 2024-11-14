import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/Cart.css";

function Cart({ cartItems, setCartItems }) {
  const [notification, setNotification] = useState("");

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0); // Đếm số sản phẩm trong giỏ hàng

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleIncrease = (index) => {
    const updatedItems = [...cartItems];
    updatedItems[index].quantity += 1;
    setCartItems(updatedItems);
    setNotification(
      `Đã tăng số lượng ${updatedItems[index].productName} trong giỏ hàng.`
    );
  };

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

  const handleRemove = (index) => {
    if (
      window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?")
    ) {
      const updatedItems = cartItems.filter((_, i) => i !== index);
      setCartItems(updatedItems);
      setNotification(`Đã xóa sản phẩm khỏi giỏ hàng.`);
    }
  };

  const total = cartItems.reduce((acc, item) => {
    const price = parseFloat(item.giaFormatted) || 0; // Thay đổi từ price sang gia
    const quantity = parseInt(item.quantity, 10) || 0;
    return acc + price * quantity;
  }, 0);

  return (
    <div className="body1">
      <div className="cart-section">
        <div className="container">
          <h1 className="mb-5 text-center">Giỏ Hàng ({cartCount})</h1>
          {notification && <div className="notification">{notification}</div>}
          {cartItems.length === 0 ? (
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
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item, index) => (
                    <tr key={index}>
                      <td>{item.productName}</td>
                      <td>
                        <img
                          src={item.imageUrl}
                          alt={item.productName}
                          className="product-image1"
                        />
                      </td>
                      <td>{item.moTa}</td>
                      <td>{parseFloat(item.giaFormatted).toFixed(2)}</td>
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
                        <button
                          onClick={() => handleRemove(index)}
                          className="remove-button"
                        >
                          Xóa
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <h3 className="total-price text-right">
                Tổng: {total.toFixed(2)}
              </h3>
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
