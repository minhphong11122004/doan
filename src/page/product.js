import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import "../css/Home.css";
import "../css/product.css";

function Product({ cartItems, setCartItems }) {
  const hiddenItemsRef = useRef([]); // Tham chiếu tới các sản phẩm ẩn
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null); // Lưu thông tin sản phẩm đã chọn trong modal
  const [quantity, setQuantity] = useState(1);

  // Fetch data từ API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://localhost:7256/api/Sanpham");
        setProducts(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  // Hàm hiển thị các sản phẩm bị ẩn
  const showMore = () => {
    hiddenItemsRef.current.forEach((item) => {
      if (item) {
        item.classList.remove("hidden");
        item.classList.add("fade-in");
      }
    });
    document.getElementById("Show").style.display = "none"; // Ẩn nút "Show More"
  };

  const handleShowModal = (product) => {
    setSelectedProduct(product); // Set thông tin sản phẩm khi mở modal
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);
  const handleQuantityChange = (e) => {
    const value = Math.max(1, parseInt(e.target.value) || 1); // Đảm bảo số lượng >= 1
    setQuantity(value);
  };

  const handleAddToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.productId === product.productId
      );
      if (existingItem) {
        return prevItems.map((item) =>
          item.productId === product.productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <h1 className="mb-5">Bộ sưu tập</h1>
        {products.map((product, index) => (
          <div
            key={product.productId}
            className={`col-md-3 ${index >= 8 ? "hidden" : ""}`}
            ref={(el) => index >= 8 && (hiddenItemsRef.current[index - 8] = el)} // Lưu các sản phẩm ẩn vào ref
          >
            <div className="card card-border product-card mb-4">
              <div className="product-image">
                <img
                  className="card-img-top"
                  // Dùng thuộc tính Hinh từ API
                  src={product.hinh}
                  alt={product.productName}
                />
                <div className="button-container1">
                  <button
                    className="btn btn-hover-primary xem-them"
                    onClick={() => handleShowModal(product)} // Mở modal khi nhấn "Xem Thêm"
                  >
                    Xem Thêm
                  </button>
                  <button
                    className="btn btn-hover-orange buy-now"
                    onClick={() => handleAddToCart(product)}
                  >
                    Mua Ngay
                  </button>
                </div>
              </div>
              <div className="card-body">
                <h5 className="card-title">{product.productName}</h5>
                <p className="card-text">{product.moTa}</p>
                <p className="card-text">{product.gia} VND</p>
              </div>
            </div>
          </div>
        ))}
        <button
          id="Show"
          onClick={showMore}
          className="mt-3 btn btn-primary mx-auto d-block"
        >
          Show more
        </button>
      </div>

      {/* Modal (Xem Thêm sản phẩm) */}
      {showModal && selectedProduct && (
        <div
          className="modal fade show"
          style={{ display: "block" }}
          tabIndex="-1"
          role="dialog"
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedProduct.productName}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseModal}
                ></button>
              </div>
              <div className="modal-body">
                <div
                  id="more-img"
                  className="carousel slide"
                  data-bs-ride="carousel"
                >
                  <div className="carousel-inner">
                    {/* Duyệt qua các hình ảnh trong mảng Hinh */}
                    {selectedProduct.Hinh && selectedProduct.Hinh.length > 0 ? (
                      selectedProduct.Hinh.map((image, index) => (
                        <div
                          key={index}
                          className={`carousel-item ${
                            index === 0 ? "active" : ""
                          }`}
                        >
                          <img
                            src={image}
                            className="d-block w-100 img-thumbnail"
                            alt={`Product Image ${index + 1}`}
                          />
                        </div>
                      ))
                    ) : (
                      <div className="carousel-item active">
                        <img
                          src="https://i.ebayimg.com/images/g/HDEAAOSwArFc9qBa/s-l400.jpg"
                          className="d-block w-100 img-thumbnail"
                          alt="Default Product Image"
                        />
                      </div>
                    )}
                  </div>
                  <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#productCarousel"
                    data-bs-slide="prev"
                  >
                    <span
                      className="carousel-control-prev-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#productCarousel"
                    data-bs-slide="next"
                  >
                    <span
                      className="carousel-control-next-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Next</span>
                  </button>
                </div>
                <p className="product-description">{selectedProduct.moTa}</p>
                <p className="product-price">Giá: {selectedProduct.gia}₫</p>
                <div className="quantity-control">
                  <label htmlFor="quantity" className="form-label">
                    Số lượng:
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    className="form-control"
                    min="1"
                    value={quantity}
                    onChange={handleQuantityChange}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseModal}
                >
                  Đóng
                </button>
                <button type="button" className="btn btn-primary">
                  Mua Ngay
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Product;
