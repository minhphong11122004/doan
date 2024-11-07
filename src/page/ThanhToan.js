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
} from "reactstrap";
import "../css/thanhtoan.css";

function ThanhToan() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [total, setTotal] = useState(0);

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
    alert(
      `Cảm ơn ${name} đã đặt hàng!\nTổng số tiền: ${total} VND\nSẽ giao hàng đến: ${address}`
    );
  };

  return (
    <Container
      className="my-5 p-4 border rounded"
      style={{ maxWidth: "500px" }}
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

        <h3>Đơn Hàng</h3>
        {orderItems.map((item, index) => (
          <Row key={index} className="d-flex justify-content-between` my-2">
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
    </Container>
  );
}

export default ThanhToan;
