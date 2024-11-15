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
  const [searchQuery, setSearchQuery] = useState(""); // Tạo state cho từ khóa tìm kiếm

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
    const lowerSearchTerm = removeAccents(searchQuery.toLowerCase()); // Loại bỏ dấu khi tìm kiếm
    const filtered = products.filter((product) => {
      // Kiểm tra tên sản phẩm và giá có chứa từ khóa hay không (loại bỏ dấu)
      const productName = product.productName
        ? removeAccents(product.productName.toLowerCase()) // Loại bỏ dấu khi so sánh
        : "";
      const priceMatches = product.giaFormatted
        ? product.giaFormatted.toString().includes(lowerSearchTerm)
        : false;

      // Trả về true nếu tên sản phẩm hoặc giá khớp với từ khóa
      return productName.includes(lowerSearchTerm) || priceMatches;
    });

    setFilteredProducts(filtered); // Cập nhật sản phẩm đã lọc
  }, [searchQuery, products]); // Lọc lại khi searchQuery hoặc products thay đổi

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
    setSelectedProduct(product); // Set thông tin sản phẩm khi mở modal
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
            onChange={(e) => setSearchQuery(e.target.value)} // Cập nhật từ khóa khi người dùng nhập
          />
        </div>
        <h1 className="mb-5">Bộ sưu tập</h1>
        {products.map((product, index) => (
          <div
            key={product.productId} className={`col-md-3 ${index >= 8 ? "hidden" : ""}`}
            ref={(el) => index >= 8 && (hiddenItemsRef.current[index - 8] = el)} // Lưu các sản phẩm ẩn vào ref
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
                <p className="card-text">{product.giaFormatted} VND</p>
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
              {/* Modal Body */}
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
                            className={`carousel-item ${index === 0 ? "active" : ""}`}
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
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#more-img"
                    data-bs-slide="next"
                  >
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                  </button>
                </div>

                <div className="modal-text" style={{ width: "50%", paddingLeft: "20px" }}>
                  <p className="product-description"
                    style={{
                      height: "20vh",
                    }}>
                    {selectedProduct.productDetails?.[0]?.processor ||
                      "VÒNG TAY ĐÁ THẠCH ANH HỒNG CÓ SAO TỰ NHIÊN VÒNG TAY ĐÁ THẠCH ANH HỒNG CÓ SAO TỰ NHIÊN VÒNG TAY ĐÁ THẠCH ANH HỒNG CÓ SAO TỰ NHIÊN"}
                  </p>
                  <p className="product-color">
                    Màu sắc: {selectedProduct.productDetails?.[0]?.color || "Chưa có"}
                  </p>
                  <div className="product-size">
                    <label htmlFor="size-select">Kích thước:</label>
                    <span></span>
                  </div>

                  <div className="quantity-control"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: "20px",
                      textAlign: "center"
                    }}
                  >
                    <label htmlFor="quantity" className="form-label">
                      Số lượng:
                    </label>
                    <input
                      style={{ width: "200px", }}
                      type="number"
                      id="quantity"
                      className="form-control"
                      min="1"
                      value={quantity}
                      onChange={handleQuantityChange}
                    />
                  </div>
                  <p className="product-price"
                    style={{
                      textAlign: "center",
                    }}
                  >
                    Giá: {selectedProduct.giaFormatted}₫
                  </p>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button" className="btn btn-secondary"
                  onClick={handleCloseModal}
                >
                  Đóng
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => handleAddToCart(selectedProduct)}
                >
                  Thêm vào giỏ hàng
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
