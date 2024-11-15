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

  // Fetch data từ API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://localhost:7256/api/Sanpham");
        setProducts(response.data);
        setFilteredProducts(response.data); // Cập nhật sản phẩm khi tải xong
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
    setShowModal(true);
    localStorage.setItem("productId", product.productId);

    try {
      const storedProductId = localStorage.getItem("productId");
      if (storedProductId) {
        const response = await axios.get(
          `https://localhost:7256/api/Sanpham/${storedProductId}`
        );
        setSelectedProduct(response.data); // Cập nhật thông tin vào modal
      }
    } catch (error) {
      console.error("Error fetching product details", error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    localStorage.removeItem("productId");
  };

  const handleQuantityChange = (e) => {
    const value = Math.max(1, parseInt(e.target.value) || 1);
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

                {/* Chi tiết sản phẩm */}
                <div style={{ width: "50%", marginLeft: "20px" }}>
                  <h5>{selectedProduct.productName}</h5>
                  <p>{selectedProduct.moTa}</p>
                  <p>{selectedProduct.giaFormatted} VND</p>
                  <div className="quantity-container mt-3">
                    <button
                      className="quantity-btn"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      className="quantity-input"
                      value={quantity}
                      onChange={handleQuantityChange}
                      min="1"
                    />
                    <button
                      className="quantity-btn"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="btn btn-primary mt-3"
                    onClick={() => {
                      handleAddToCart(selectedProduct);
                      handleCloseModal();
                    }}
                  >
                    Thêm vào giỏ hàng
                  </button>
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
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Product;
