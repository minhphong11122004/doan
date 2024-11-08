import React, { useState, useEffect } from "react";
import {
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Row,
  Col,
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
  const [total, setTotal] = useState(0);
  const [modalOpen, setModalOpen] = useState(false); // State to control modal visibility
  const [paymentMethod, setPaymentMethod] = useState(""); // To track selected payment method

  const orderItems = [
    { name: "Sản phẩm A", price: 50000 },
    { name: "Sản phẩm B", price: 75000 },
    { name: "Sản phẩm C", price: 100000 },
  ];

  useEffect(() => {
    const totalAmount = orderItems.reduce((acc, item) => acc + item.price, 0);
    setTotal(totalAmount);
  }, []);

  const handleOrder = () => {
    if (!name || !phone || !address) {
      alert("Vui lòng điền đầy đủ thông tin.");
      return;
    }
    // Open modal after order details are valid
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false); // Close the modal when user clicks on "Cancel"
    setPaymentMethod(""); // Reset payment method
  };

  const handlePaymentMethod = (method) => {
    setPaymentMethod(method); // Set the selected payment method
  };

  return (
    <Container className="my-5 p-4 border rounded" style={{ maxWidth: "500px" }}>
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

        <h3>Đơn Hàng</h3>
        {orderItems.map((item, index) => (
          <Row key={index} className="d-flex justify-content-between my-2">
            <Col>{item.name}</Col>
            <Col className="text-right">{item.price} VND</Col>
          </Row>
        ))}

        <div className="text-right font-weight-bold mt-3">
          Tổng tiền: <span>{total}</span> VND
        </div>

        <Button color="success" className="w-100 mt-4" onClick={handleOrder}>
          Xác nhận thanh toán
        </Button>
      </Form>

      <Modal isOpen={modalOpen} toggle={handleCloseModal}>
        <ModalHeader toggle={handleCloseModal}>Chọn phương thức thanh toán</ModalHeader>
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
                <td>Quý khách có thể quét mã QR để thanh toán qua ngân hàng của chúng tôi.</td>
              </tr>
            </tbody>
          </table>

          {/* Display image when the method is selected */}
          {paymentMethod === "Thanh toán qua mã QR" && (
            <div className="text-center mt-4">
              <img
                src="https://via.placeholder.com/300x100.png?text=M%C3%A3+QR" // Thay đổi URL của hình ảnh ở đây
                alt="Mã QR"
                style={{ width: "300px", height: "10vh", objectFit: "cover" }}
              />
              <p className="mt-3">Số tiền: {total} VND</p>
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => handlePaymentMethod("Thanh toán trực tiếp")}>
            Thanh toán trực tiếp
          </Button>
          <Button color="secondary" onClick={() => handlePaymentMethod("Thanh toán qua mã QR")}>
            Thanh toán qua mã QR
          </Button>
          <Button color="danger" onClick={handleCloseModal}>
            Hủy
          </Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
}

export default ThanhToan;
  