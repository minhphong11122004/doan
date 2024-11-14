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
    password: "", // password lấy từ dữ liệu hiện tại trong cơ sở dữ liệu
  });
  const [passwordInfo, setPasswordInfo] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Lấy userId từ localStorage khi component được khởi tạo
  useEffect(() => {
    const userId = localStorage.getItem("userid"); // Lấy userId từ localStorage
    if (userId) {
      fetch(`https://localhost:7256/api/Users/${userId}`) // Thay bằng endpoint thực tế của bạn
        .then((response) => response.json())
        .then((data) => {
          setUserInfo({
            userName: data.username,
            userId: data.userId,
            fullName: data.fullName,
            email: data.email,
            phone: data.phone,
            diachi: data.diachi,
            password: data.password, // Đặt mật khẩu hiện tại từ dữ liệu lấy được
          });
          console.log(data);
        })
        .catch((error) =>
          console.error("Lỗi khi lấy dữ liệu người dùng:", error)
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
    console.log("Dữ liệu cá nhân:", userInfo);

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
    const userId = userInfo.userId;
    const apiEndpoint = `https://localhost:7256/api/Users/${userId}`;

    // Kiểm tra mật khẩu hiện tại
    if (passwordInfo.currentPassword !== userInfo.password) {
      alert("Mật khẩu hiện tại không đúng!");
      return;
    }

    // Kiểm tra mật khẩu mới và xác nhận mật khẩu
    if (passwordInfo.newPassword !== passwordInfo.confirmPassword) {
      alert("Mật khẩu mới và xác nhận mật khẩu không khớp!");
      return;
    }

    // Chỉ gửi mật khẩu mới nếu nó không trống
    const payload = {
      userId: userInfo.userId,
      username: userInfo.userName,
      password: passwordInfo.newPassword || userInfo.password, // Nếu không có mật khẩu mới, dùng mật khẩu cũ
      fullName: userInfo.fullName,
      email: userInfo.email,
      roleId: userInfo.roleId, // Cần giữ nguyên nếu không thay đổi
      diachi: userInfo.diachi,
      phone: userInfo.phone,
    };

    console.log("Dữ liệu mật khẩu gửi lên:", payload);

    try {
      const response = await fetch(apiEndpoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("Mật khẩu đã được thay đổi!");
        window.location.reload();
      } else {
        const errorData = await response.json();
        console.error("Chi tiết lỗi:", errorData);
        alert(
          `Lỗi ${response.status}: ${
            errorData.message || "Không thể thay đổi mật khẩu!"
          }`
        );
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
              Lưu thay đổi mật khẩu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
