import React, { useState, useEffect } from "react";
import {
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import "../css/thanhtoan.css";

function ThanhToan() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [total, setTotal] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");

  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cartItems")) || []
  );

  // Định dạng giá sản phẩm
  const formatPrice = (price) => {
    const priceString = typeof price === "string" ? price : price.toString();
    const priceNumber =
      parseFloat(priceString.replace(/[^\d.-]/g, "").replace(/\./g, "")) || 0;

    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(priceNumber);
  };

  // Effect tính toán tổng tiền giỏ hàng
  useEffect(() => {
    const totalAmount = cartItems.reduce((acc, item) => {
      const price =
        parseFloat(
          item.giaFormatted.replace(/[^\d.-]/g, "").replace(/\./g, "")
        ) || 0;
      const quantity = parseInt(item.quantity, 10) || 0;

      return acc + price * quantity;
    }, 0);
    setTotal(totalAmount);
  }, [cartItems]);

  const handleOrder = () => {
    if (!name || !phone || !address || !email) {
      alert("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    const orderData = {
      OrderId: Math.floor(Math.random() * 1000000),
      CustomerName: name,
      ProductName: cartItems.map((item) => item.productName).join(", "),
      NgayMua: new Date(),
      SoLuong: cartItems.reduce((acc, item) => acc + item.quantity, 1),
      DiaChi: address,
      Phone: phone,
      Email: email,
      TongTien: total,
      // Lưu thông tin kích cỡ và số lượng
      Details: cartItems.map((item) => ({
        productName: item.productName,
        size: item.selectedSize || "Chưa chọn kích cỡ", // Hiển thị kích cỡ nếu có
        quantity: item.quantity,
        price: item.giaFormatted,
      })),
    };

    console.log("Thông tin đơn hàng:", orderData);

    setModalOpen(true); // Mở modal khi đơn hàng hợp lệ
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setPaymentMethod("");
  };

  const handlePaymentMethod = (method) => {
    setPaymentMethod(method);
  };

  // Effect lưu giỏ hàng vào localStorage khi có sự thay đổi
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems)); // Chỉ lưu khi giỏ hàng có thay đổi
    }
  }, [cartItems]);

  return (
    <Container
      className="my-5 p-4 border rounded"
      style={{ maxWidth: "1000px" }}
    >
      <h2 className="mb-4">Nhập thông tin để xác nhận thanh toán</h2>
      <Form>
        <FormGroup>
          <Label for="name">Tên:</Label>
          <Input
            type="text"
            id="name"
            placeholder="Nhập tên của bạn"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label for="phone">Số điện thoại:</Label>
          <Input
            type="tel"
            id="phone"
            placeholder="Nhập số điện thoại"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label for="address">Địa chỉ:</Label>
          <Input
            type="text"
            id="address"
            placeholder="Nhập địa chỉ nhận hàng"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label for="email">Email:</Label>
          <Input
            type="email"
            id="email"
            placeholder="Nhập email của bạn"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>

        <h3>Đơn Hàng</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Tên sản phẩm</th>
              <th>Hình ảnh</th>
              <th>Giá</th>
              <th>Số lượng</th>
              <th>Kích cỡ</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index) => (
              <tr key={index}>
                <td>{item.productName}</td>
                <td>
                  <img
                    src={item.hinh}
                    alt={item.productName}
                    className="product-image1"
                  />
                </td>
                <td>{formatPrice(item.giaFormatted)}</td>
                <td>{item.quantity}</td>
                <td>{item.selectedSize || "Chưa chọn kích cỡ"}</td>{" "}
                {/* Hiển thị kích cỡ */}
              </tr>
            ))}
          </tbody>
        </table>

        <h3 className="total-price text-right">
          Tổng: {isNaN(total) ? 0 : formatPrice(total)}
        </h3>

        <Button color="success" className="w-100 mt-4" onClick={handleOrder}>
          Xác nhận thanh toán
        </Button>
      </Form>

      <Modal isOpen={modalOpen} toggle={handleCloseModal}>
        <ModalHeader toggle={handleCloseModal}>
          Chọn phương thức thanh toán
        </ModalHeader>
        <ModalBody>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>Phương thức thanh toán</th>
                <th>Mô tả</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Thanh toán trực tiếp</td>
                <td>Quý khách có thể thanh toán trực tiếp khi nhận hàng.</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Thanh toán qua mã QR</td>
                <td>
                  Quý khách có thể quét mã QR để thanh toán qua ngân hàng của
                  chúng tôi.
                </td>
              </tr>
            </tbody>
          </table>

          <Button color="primary" onClick={() => handlePaymentMethod("COD")}>
            Thanh toán khi nhận hàng
          </Button>
          <Button color="secondary" onClick={() => handlePaymentMethod("QR")}>
            Thanh toán qua QR
          </Button>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={handleCloseModal}>
            Đóng
          </Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
}

export default ThanhToan;
