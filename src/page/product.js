import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import "../css/Home.css";
import "../css/product.css";

// Hàm loại bỏ dấu tiếng Việt
function removeAccents(str) {
  const accents =
    "àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ";
  const withoutAccents =
    "aaaaaaaaaaaaaaaaaeeeeeeeeeeiiiiiooooooooooooooouuuuuuuuuuuuuuyyyddaAAAAAAAAAAAAAAAAAEEEEEEEEEEEIIIIOOOOOOOOOOOOOOUUUUUUUUUUUUUUYYYYD";

  return str
    .split("")
    .map((char, index) => {
      const accentIndex = accents.indexOf(char);
      return accentIndex !== -1 ? withoutAccents[accentIndex] : char;
    })
    .join("");
}

function Product({ cartItems, setCartItems }) {
  const hiddenItemsRef = useRef([]); // Tham chiếu tới các sản phẩm ẩn
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSize, setSelectedSize] = useState(""); // State cho kích cỡ đã chọn

  // Fetch data từ API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://localhost:7256/api/Sanpham");
        setProducts(response.data);
        setFilteredProducts(response.data); // Cập nhật sản phẩm khi tải xong
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  // Lọc sản phẩm khi searchQuery thay đổi
  useEffect(() => {
    const lowerSearchTerm = removeAccents(searchQuery.toLowerCase());
    const filtered = products.filter((product) => {
      const productName = product.productName
        ? removeAccents(product.productName.toLowerCase())
        : "";
      const priceMatches = product.giaFormatted
        ? product.giaFormatted.toString().includes(lowerSearchTerm)
        : false;
      return productName.includes(lowerSearchTerm) || priceMatches;
    });
    setFilteredProducts(filtered); // Cập nhật sản phẩm đã lọc
  }, [searchQuery, products]);

  const showMore = () => {
    hiddenItemsRef.current.forEach((item) => {
      if (item) {
        item.classList.remove("hidden");
        item.classList.add("fade-in");
      }
    });
    document.getElementById("Show").style.display = "none"; // Ẩn nút "Show More"
  };

  const handleShowModal = async (product) => {
    setSelectedProduct(product);
    setSelectedSize(""); // Reset size khi mở modal
    setShowModal(true);
    localStorage.setItem("productId", product.productId);

    // Lấy kích cỡ đã lưu từ localStorage (nếu có)
    const savedSize = localStorage.getItem("selectedSize");
    if (savedSize) {
      setSelectedSize(savedSize);
    }

    try {
      const storedProductId = localStorage.getItem("productId");
      if (storedProductId) {
        const response = await axios.get(
          `https://localhost:7256/api/Sanpham/${storedProductId}`
        );
        setSelectedProduct(response.data); // Cập nhật thông tin vào modal
        console.log(response.data);
      }
    } catch (error) {
      console.error("Error fetching product details", error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    localStorage.removeItem("productId");
    setSelectedSize(""); // Reset size khi đóng modal
  };

  const handleQuantityChange = (e) => {
    const value = Math.max(1, parseInt(e.target.value) || 1);
    setQuantity(value);
  };

  const handleAddToCart = (product) => {
    if (!selectedSize) {
      alert("Vui lòng chọn kích cỡ!");
      return;
    }

    // Lưu thông tin size vào localStorage
    localStorage.setItem("selectedSize", selectedSize);

    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) =>
          item.productId === product.productId && item.size === selectedSize
      );
      if (existingItem) {
        return prevItems.map((item) =>
          item.productId === product.productId && item.size === selectedSize
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity, size: selectedSize }];
      }
    });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="navbar-search mb-4 col-12">
          <input
            className="search-input"
            placeholder="Tìm kiếm sản phẩm theo tên hoặc giá"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <h1 className="mb-5">Bộ sưu tập</h1>
        {filteredProducts.map((product, index) => (
          <div
            key={product.productId}
            className={`col-md-3 ${index >= 8 ? "hidden" : ""}`}
            ref={(el) => index >= 8 && (hiddenItemsRef.current[index - 8] = el)}
          >
            <div className="card card-border product-card mb-4">
              <div className="product-image">
                <img
                  className="card-img-top"
                  src={product.hinh}
                  alt={product.productName}
                />
                <div className="button-container1">
                  <button
                    className="btn btn-hover-primary xem-them"
                    onClick={() => handleShowModal(product)}
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
                <p className="card-text">{product.giaFormatted} VND</p>
              </div>
            </div>
          </div>
        ))}
        {!searchQuery && (
          <button
            id="Show"
            onClick={showMore}
            className="mt-3 btn btn-primary mx-auto d-block"
          >
            Xem thêm
          </button>
        )}
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
              <div className="modal-body d-flex">
                {/* Hình ảnh sản phẩm */}
                <div
                  id="more-img"
                  className="carousel slide"
                  data-bs-ride="carousel"
                  style={{ width: "50%" }}
                >
                  <div className="carousel-inner">
                    {selectedProduct?.productDetails?.[0]?.hinhAnh &&
                    selectedProduct.productDetails[0].hinhAnh.length > 0 ? (
                      JSON.parse(selectedProduct.productDetails[0].hinhAnh).map(
                        (image, index) => (
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
                        )
                      )
                    ) : (
                      <div className="carousel-item active">
                        <img
                          src=""
                          className="d-block w-100 img-thumbnail"
                          alt="Default Product Image"
                        />
                      </div>
                    )}

                    <button
                      className="carousel-control-prev"
                      type="button"
                      data-bs-target="#more-img"
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
                      data-bs-target="#more-img"
                      data-bs-slide="next"
                    >
                      <span
                        className="carousel-control-next-icon"
                        aria-hidden="true"
                      ></span>
                      <span className="visually-hidden">Next</span>
                    </button>
                  </div>
                </div>

                {/* Chi tiết sản phẩm */}
                <div
                  style={{
                    width: "50%",
                    marginLeft: "20px",
                    textAlign: "left",
                  }}
                >
                  <h5>{selectedProduct.productName}</h5>
                  <p>{selectedProduct.moTa}</p>
                  <p>{selectedProduct.giaFormatted} VND</p>
                  {selectedProduct.productDetails &&
                    selectedProduct.productDetails.length > 0 &&
                    selectedProduct.productDetails[0].size && (
                      <div className="mt-3">
                        <label htmlFor="size" className="form-label">
                          Chọn kích cỡ
                        </label>
                        <select
                          id="size"
                          className="form-select"
                          onChange={(e) => setSelectedSize(e.target.value)}
                          value={selectedSize}
                        >
                          <option value="">Chọn kích cỡ</option>
                          {selectedProduct.productDetails[0].size
                            .split(", ")
                            .map((size, index) => (
                              <option key={index} value={size}>
                                {size}
                              </option>
                            ))}
                        </select>
                      </div>
                    )}
                  {/* Nhập số lượng */}
                  <div className="quantity-container mt-3">
                    <input
                      type="number"
                      className="quantity-input"
                      value={quantity}
                      onChange={handleQuantityChange}
                      min="1"
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-primary mt-3"
                  onClick={() => {
                    handleAddToCart(selectedProduct);
                    handleCloseModal();
                  }}
                >
                  Thêm vào giỏ hàng
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseModal}
                >
                  Đóng
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
