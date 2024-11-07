import React, { useState } from "react";
import "../css/Home.css";
import "../css/Account.css";

function Account() {
  // State để lưu thông tin người dùng
  const [activeTab, setActiveTab] = useState("personalInfo");
  const [userInfo, setUserInfo] = useState({
    userId: "123456",
    fullName: "Nguyễn Văn A",
    email: "nguyen@example.com",
    phone: "0123456789",
  });
  const [passwordInfo, setPasswordInfo] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Hàm mở tab
  const openTab = (tabId) => {
    setActiveTab(tabId);
  };

  // Hàm lưu thay đổi
  const saveChanges = (tabId) => {
    let message = "";
    switch (tabId) {
      case "personalInfo":
        message = "Thông tin cá nhân đã được lưu!";
        break;
      case "changePassword":
        message = "Mật khẩu đã được thay đổi!";
        break;
      case "transactionHistory":
        message = "Lịch sử giao dịch đã được cập nhật!";
        break;
      default:
        message = "Lưu thay đổi không thành công!";
    }
    alert(message);
  };

  // Hàm xử lý thay đổi thông tin cá nhân
  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Hàm xử lý thay đổi mật khẩu
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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
            activeTab === "transactionHistory" ? "active" : ""
          }`}
          onClick={() => openTab("transactionHistory")}
        >
          Lịch sử giao dịch
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
              <small>Đây là ID duy nhất của bạn trong hệ thống.</small>
            </div>
            <div className="custom-form-group">
              <label htmlFor="fullName">Họ và tên</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Nhập họ và tên"
                value={userInfo.fullName}
                onChange={handlePersonalInfoChange}
                required
              />
            </div>
            <div className="custom-form-group">
              <label htmlFor="email">Địa chỉ email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Nhập email"
                value={userInfo.email}
                onChange={handlePersonalInfoChange}
                required
              />
            </div>
            <div className="custom-form-group">
              <label htmlFor="phone">Số điện thoại</label>
              <input
                type="text"
                id="phone"
                name="phone"
                placeholder="Nhập số điện thoại"
                value={userInfo.phone}
                onChange={handlePersonalInfoChange}
              />
            </div>
          </form>
          <div className="text-center">
            <button
              className="custom-btn"
              onClick={() => saveChanges("personalInfo")}
            >
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
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                placeholder="Nhập mật khẩu hiện tại"
                value={passwordInfo.currentPassword}
                onChange={handlePasswordChange}
                required
              />
            </div>
            <div className="custom-form-group">
              <label htmlFor="newPassword">Mật khẩu mới</label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                placeholder="Nhập mật khẩu mới"
                value={passwordInfo.newPassword}
                onChange={handlePasswordChange}
                required
              />
            </div>
            <div className="custom-form-group">
              <label htmlFor="confirmPassword">Xác nhận mật khẩu mới</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Xác nhận mật khẩu mới"
                value={passwordInfo.confirmPassword}
                onChange={handlePasswordChange}
                required
              />
            </div>
          </form>
          <div className="text-center">
            <button
              className="custom-btn"
              onClick={() => saveChanges("changePassword")}
            >
              Lưu thay đổi
            </button>
          </div>
        </div>

        {/* Tab Lịch sử giao dịch */}
        <div
          id="transactionHistory"
          className={`custom-tab-content ${
            activeTab === "transactionHistory" ? "active" : ""
          }`}
        >
          <h3>Lịch sử giao dịch</h3>
          <div className="custom-table-container">
            <table>
              <thead>
                <tr>
                  <th>Mã đơn</th>
                  <th>Mã sản phẩm</th>
                  <th>Tên sản phẩm</th>
                  <th>Giá tiền sản phẩm</th>
                  <th>Số lượng</th>
                  <th>Tổng tiền</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>HD12345</td>
                  <td>SP001</td>
                  <td>Áo thun</td>
                  <td>150,000 VND</td>
                  <td>2</td>
                  <td>300,000 VND</td>
                </tr>
                <tr>
                  <td>HD12346</td>
                  <td>SP002</td>
                  <td>Quần jean</td>
                  <td>500,000 VND</td>
                  <td>1</td>
                  <td>500,000 VND</td>
                </tr>
                <tr>
                  <td>HD12347</td>
                  <td>SP003</td>
                  <td>Giày thể thao</td>
                  <td>1,200,000 VND</td>
                  <td>1</td>
                  <td>1,200,000 VND</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
