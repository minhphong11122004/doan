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
    <Container className="thanhtoan-container">
      <h2 className="thanhtoan-header">Nhập thông tin để xác nhận thanh toán</h2>
      <Form>
        <FormGroup>
          <Label className="thanhtoan-label" for="name">Tên:</Label>
          <Input
            className="thanhtoan-input"
            type="text"
            id="name"
            placeholder="Nhập tên của bạn"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label className="thanhtoan-label" for="phone">Số điện thoại:</Label>
          <Input
            className="thanhtoan-input"
            type="tel"
            id="phone"
            placeholder="Nhập số điện thoại"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label className="thanhtoan-label" for="address">Địa chỉ:</Label>
          <Input
            className="thanhtoan-input"
            type="text"
            id="address"
            placeholder="Nhập địa chỉ nhận hàng"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </FormGroup>

        <h3>Đơn Hàng</h3>
        {orderItems.map((item, index) => (
          <Row key={index} className="thanhtoan-row">
            <Col className="thanhtoan-col">{item.name}</Col>
            <Col className="thanhtoan-text-right">{item.price} VND</Col>
          </Row>
        ))}

        <div className="thanhtoan-font-weight-bold thanhtoan-text-right mt-3">
          Tổng tiền: <span>{total}</span> VND
        </div>

        <Button className="thanhtoan-button" onClick={handleOrder}>
          Xác nhận thanh toán
        </Button>
      </Form>
    </Container>
  );
}

export default ThanhToan;
