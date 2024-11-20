import React, { useState, useEffect } from "react";
import "../css/Home.css";
import "../css/Account.css";

function Account() {
  const [activeTab, setActiveTab] = useState("personalInfo");
  const [userInfo, setUserInfo] = useState({
    userName: "",
    userId: "",
    fullName: "",
    email: "",
    phone: "",
    diachi: "",
    password: "",
  });
  const [passwordInfo, setPasswordInfo] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [orderHistory, setOrderHistory] = useState([]); // Giữ thông tin lịch sử đơn hàng

  // Lấy thông tin người dùng và lịch sử đơn hàng khi component được render
  useEffect(() => {
    const userId = localStorage.getItem("userid");
    if (userId) {
      // Lấy thông tin người dùng
      fetch(`https://localhost:7256/api/Users/${userId}`)
        .then((response) => response.json())
        .then((data) => {
          setUserInfo({
            userName: data.username,
            userId: data.userId,
            fullName: data.fullName,
            email: data.email,
            phone: data.phone,
            diachi: data.diachi,
            password: data.password,
          });
        })
        .catch((error) =>
          console.error("Lỗi khi lấy dữ liệu người dùng:", error)
        );

      // Lấy lịch sử đơn hàng
      fetch(`https://localhost:7256/api/Orders/${userId}`)
        .then((response) => {
          if (response.status === 404) {
            // Nếu API trả về 404 (không tìm thấy đơn hàng), cập nhật orderHistory
            setOrderHistory("Chưa đặt đơn hàng nào");
            setOrderHistory([]);
          }
          return response.json();
        })
        .then((data) => {
          if (Array.isArray(data) && data.length > 0) {
            // Nếu dữ liệu là đối tượng đơn hàng, đặt state với đối tượng đó
            setOrderHistory(data);
          }
        })
        .catch((error) =>
          console.error("Lỗi khi lấy dữ liệu đơn hàng:", error)
        );
    } else {
      console.error("User ID không tồn tại trong localStorage");
    }
  }, []);

  const openTab = (tabId) => {
    setActiveTab(tabId);
  };

  const savePersonalInfo = () => {
    const apiEndpoint = `https://localhost:7256/api/Users/${userInfo.userId}`;
    fetch(apiEndpoint, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    })
      .then((response) => {
        if (response.ok) {
          alert("Thông tin cá nhân đã được lưu!");
        } else {
          alert("Lưu thay đổi không thành công!");
        }
      })
      .catch((error) => {
        console.error("Lỗi khi cập nhật dữ liệu:", error);
        alert("Đã xảy ra lỗi khi lưu thay đổi!");
      });
  };

  const savePassword = async () => {
    if (passwordInfo.currentPassword !== userInfo.password) {
      alert("Mật khẩu hiện tại không đúng!");
      return;
    }

    if (passwordInfo.newPassword !== passwordInfo.confirmPassword) {
      alert("Mật khẩu mới và xác nhận mật khẩu không khớp!");
      return;
    }

    const payload = {
      userId: userInfo.userId,
      username: userInfo.userName,
      password: passwordInfo.newPassword || userInfo.password,
      fullName: userInfo.fullName,
      email: userInfo.email,
      roleId: userInfo.roleId,
      diachi: userInfo.diachi,
      phone: userInfo.phone,
    };

    try {
      const response = await fetch(
        `https://localhost:7256/api/Users/${userInfo.userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        alert("Mật khẩu đã được thay đổi!");
        window.location.reload();
      } else {
        const errorData = await response.json();
        alert(`Lỗi: ${errorData.message || "Không thể thay đổi mật khẩu!"}`);
      }
    } catch (error) {
      console.error("Lỗi khi kết nối API:", error);
      alert("Đã xảy ra lỗi khi kết nối API!");
    }
  };

  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Hàm để định dạng ngày tháng dễ đọc
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString("vi-VN", options);
  };

  return (
    <div className="custom-container">
      <div className="custom-tab-container">
        <div
          className={`custom-tab-button ${
            activeTab === "personalInfo" ? "active" : ""
          }`}
          onClick={() => openTab("personalInfo")}
        >
          Thông tin cá nhân
        </div>
        <div
          className={`custom-tab-button ${
            activeTab === "changePassword" ? "active" : ""
          }`}
          onClick={() => openTab("changePassword")}
        >
          Thay đổi mật khẩu
        </div>
        <div
          className={`custom-tab-button ${
            activeTab === "orderHistory" ? "active" : ""
          }`}
          onClick={() => openTab("orderHistory")}
        >
          Lịch sử đơn hàng
        </div>
      </div>

      <div className="custom-content-container">
        {/* Tab Thông tin cá nhân */}
        <div
          id="personalInfo"
          className={`custom-tab-content ${
            activeTab === "personalInfo" ? "active" : ""
          }`}
        >
          <h3>Thông tin cá nhân</h3>
          <form id="accountSettingsForm" className="custom-form-container">
            <div className="custom-form-group">
              <label htmlFor="userId">ID Người Dùng</label>
              <input
                type="text"
                id="userId"
                name="userId"
                value={userInfo.userId}
                disabled
              />
            </div>
            <div className="custom-form-group">
              <label htmlFor="userName">Tài khoản</label>
              <input
                type="text"
                id="userName"
                name="userName"
                value={userInfo.userName}
                onChange={handlePersonalInfoChange}
              />
            </div>
            <div className="custom-form-group">
              <label htmlFor="fullName">Họ và tên</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={userInfo.fullName}
                onChange={handlePersonalInfoChange}
              />
            </div>
            <div className="custom-form-group">
              <label htmlFor="email">Địa chỉ email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={userInfo.email}
                onChange={handlePersonalInfoChange}
              />
            </div>
            <div className="custom-form-group">
              <label htmlFor="diachi">Địa chỉ</label>
              <input
                type="text"
                id="diachi"
                name="diachi"
                value={userInfo.diachi}
                onChange={handlePersonalInfoChange}
              />
            </div>
            <div className="custom-form-group">
              <label htmlFor="phone">Số điện thoại</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={userInfo.phone}
                onChange={handlePersonalInfoChange}
              />
            </div>
          </form>
          <div className="text-center">
            <button className="custom-btn" onClick={savePersonalInfo}>
              Lưu thay đổi
            </button>
          </div>
        </div>
        {/* Tab Thay đổi mật khẩu */}
        <div
          id="changePassword"
          className={`custom-tab-content ${
            activeTab === "changePassword" ? "active" : ""
          }`}
        >
          <h3>Thay đổi mật khẩu</h3>
          <form id="changePasswordForm" className="custom-form-container">
            <div className="custom-form-group">
              <label htmlFor="currentPassword">Mật khẩu hiện tại</label>
              <div className="password-container">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  id="currentPassword"
                  name="currentPassword"
                  value={passwordInfo.currentPassword}
                  onChange={handlePasswordChange}
                />
                <button
                  type="button"
                  className="toggle-password-btn"
                  onClick={() => setShowCurrentPassword((prev) => !prev)}
                >
                  {showCurrentPassword ? "Ẩn" : "Hiện"}
                </button>
              </div>
            </div>

            <div className="custom-form-group">
              <label htmlFor="newPassword">Mật khẩu mới</label>
              <div className="password-container">
                <input
                  type={showNewPassword ? "text" : "password"}
                  id="newPassword"
                  name="newPassword"
                  value={passwordInfo.newPassword}
                  onChange={handlePasswordChange}
                />
                <button
                  type="button"
                  className="toggle-password-btn"
                  onClick={() => setShowNewPassword((prev) => !prev)}
                >
                  {showNewPassword ? "Ẩn" : "Hiện"}
                </button>
              </div>
            </div>

            <div className="custom-form-group">
              <label htmlFor="confirmPassword">Xác nhận mật khẩu mới</label>
              <div className="password-container">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={passwordInfo.confirmPassword}
                  onChange={handlePasswordChange}
                />
                <button
                  type="button"
                  className="toggle-password-btn"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  {showConfirmPassword ? "Ẩn" : "Hiện"}
                </button>
              </div>
            </div>
          </form>
          <div className="text-center">
            <button className="custom-btn" onClick={savePassword}>
              Thay đổi mật khẩu
            </button>
          </div>
        </div>

        {/* Tab Lịch sử giao dịch */}
        <div
          id="orderHistory"
          className={`custom-tab-content ${
            activeTab === "orderHistory" ? "active" : ""
          }`}
        >
          <h3>Lịch sử đơn hàng</h3>
          {/* Kiểm tra nếu orderHistory là chuỗi thông báo lỗi hoặc không có đơn hàng */}
          {orderHistory === "Chưa đặt đơn hàng nào" ? (
            <p>{orderHistory}</p>
          ) : (
            <table className="order-history-table">
              <thead>
                <tr>
                  <th>ID Đơn hàng</th>
                  <th>Ngày mua</th>

                  <th>Số lượng</th>
                  <th>Địa chỉ</th>
                  <th>Số điện thoại</th>
                  <th>Email</th>
                  <th>Tổng tiền</th>
                </tr>
              </thead>
              <tbody>
                {orderHistory.map((order) => (
                  <tr key={order.orderId}>
                    <td>{order.orderId}</td>
                    <td>{formatDate(order.ngayMua)}</td>
                    <td>{order.soLuong}</td>
                    <td>{order.diaChi}</td>
                    <td>{order.phone}</td>
                    <td>{order.email}</td>
                    <td>{order.tongTien} VND</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default Account;
