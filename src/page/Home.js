import React, { useState, useEffect, useRef } from "react";
import "../css/Home.css";

function Home() {
  const hiddenItemsRef = useRef([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [cartItems, setCartItems] = useState([]); // Initialize cart items state

  const showMore = () => {
    hiddenItemsRef.current.forEach((item) => {
      if (item) item.classList.remove("hidden");
    });
    document.getElementById("Show").style.display = "none";
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentIndex((currentIndex + 1) % 2);
    }, 3000);

    return () => clearTimeout(timer);
  }, [currentIndex]);

  const handleShowModal = (product) => {
    setCurrentProduct(product);
    setShowModal(true);
    setQuantity(1); // Reset quantity when opening a new product modal
  };  

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentProduct(null);
  };

  const handleIncreaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecreaseQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  const productList = [
    {
      id: 1,
      name: "Vòng tay bạc 1",
      img: "https://i.ebayimg.com/images/g/HDEAAOSwArFc9qBa/s-l400.jpg",
      price: "2.500.000",
      description: "Vòng tay bạc chất liệu cao cấp",
    },
    {
      id: 2,
      name: "Vòng tay bạc 2",
      img: "https://i.ebayimg.com/images/g/HDEAAOSwArFc9qBa/s-l400.jpg",
      price: "2.500.000",
      description: "Vòng tay bạc chất liệu cao cấp",
    },
    {
      id: 3,
      name: "Vòng tay bạc 3",
      img: "https://i.ebayimg.com/images/g/HDEAAOSwArFc9qBa/s-l400.jpg",
      price: "2.500.000",
      description: "Vòng tay bạc chất liệu cao cấp",
    },
    {
      id: 4,
      name: "Vòng tay bạc 4",
      img: "https://i.ebayimg.com/images/g/HDEAAOSwArFc9qBa/s-l400.jpg",
      price: "2.500.000",
      description: "Vòng tay bạc chất liệu cao cấp",
    },
    {
      id: 5,
      name: "Vòng tay bạc 5",
      img: "https://i.ebayimg.com/images/g/HDEAAOSwArFc9qBa/s-l400.jpg",
      price: "2.500.000",
      description: "Vòng tay bạc chất liệu cao cấp",
    },
    {
      id: 6,
      name: "Vòng tay bạc 6",
      img: "https://i.ebayimg.com/images/g/HDEAAOSwArFc9qBa/s-l400.jpg",
      price: "2.500.000",
      description: "Vòng tay bạc chất liệu cao cấp",
    },
    {
      id: 7,
      name: "Vòng tay bạc 7",
      img: "https://i.ebayimg.com/images/g/HDEAAOSwArFc9qBa/s-l400.jpg",
      price: "2.500.000",
      description: "Vòng tay bạc chất liệu cao cấp",
    },
    {
      id: 8,
      name: "Vòng tay bạc 8",
      img: "https://i.ebayimg.com/images/g/HDEAAOSwArFc9qBa/s-l400.jpg",
      price: "2.500.000",
      description: "Vòng tay bạc chất liệu cao cấp",
    },
  ];

  const handleAddToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity }];
      }
    });
    setShowModal(false); // Close modal after adding to cart
  };

  return (
    <div>
      {/* Phần giới thiệu */}
      <div className="header">
        <div className="logo2"></div>
        <img
          className="background2"
          src="https://bizweb.dktcdn.net/100/090/662/products/vong-tay-handmade-nu-3.jpg?v=1614570377983"
        />
        <img
          className="background1"
          src="https://lili.vn/wp-content/uploads/2021/12/Lac-tay-bac-cap-doi-tinh-yeu-Forever-Love-LILI_986852_11.jpg"
        />
        <div className="logo">
          <div className="box">
            <h1>Vòng tay trang sức cao cấp</h1>
            <p>Ở đây có bán trang sức đẹp</p>
            <button className="button1">Mua ngay kẻo hết</button>
          </div>
        </div>
      </div>

      {/* Danh sách sản phẩm */}
      <div className="product2">
        <div className="product">
          <div className="row justify-content-center">
            {productList.map((product, index) => (
              <div
                key={product.id}
                className={`col-md-3 ${index > 3 ? "hidden" : ""}`}
                ref={(el) => (hiddenItemsRef.current[index - 4] = el)}
                onClick={() => handleShowModal(product)}
              >
                <div className="the">
                  <img
                    className="productimg"
                    src={product.img}
                    alt={product.name}
                  />
                  <h2>{product.name}</h2>
                  <p className="mota">{product.description}</p>
                  <p className="giatien">{product.price}</p>
                </div>
              </div>
            ))}
          </div>
          <button id="Show" onClick={showMore}>
            Show more
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && currentProduct && (
        <div
          className="modal fade show"
          style={{ display: "block" }}
          tabIndex="-1"
          role="dialog"
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{currentProduct.name}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseModal}
                ></button>
              </div>
              <div className="modal-body">
                <img
                  src={currentProduct.img}
                  className="d-block img-thumbnail modal-image"
                  alt={currentProduct.name}
                />
                <div className="product-info">
                  <p className="product-description">
                    {currentProduct.description}
                  </p>
                  <p className="product-price text-danger fw-bold fs-4 ">
                    {currentProduct.price}₫
                  </p>
                  {/* Số lượng sản phẩm */}
                  <div className="quantity-control">
                    <button
                      className="btn btn-outline-secondary"
                      onClick={handleDecreaseQuantity}
                    >
                      -
                    </button>
                    <span className="quantity mx-2">{quantity}</span>
                    <button
                      className="btn btn-outline-secondary"
                      onClick={handleIncreaseQuantity}
                    >
                      +
                    </button>
                  </div>
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
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => handleAddToCart(currentProduct)}
                >
                  Mua Ngay
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="introduce">
        <div className="introduce1">
          <h1 className="intro">50+ các loại vòng tay trang sức khác nhau</h1>
          <p className="in">
            Thiết kế của chúng tôi vẫn còn rất nhiều mẫu khác nhau, trong đó
            cũng có rất nhiều mẫu độc nhất và bán chạy trên thị trường
          </p>
        </div>
        <div className="introduce2">
          <img
            className={`minhhoa ${currentIndex === 0 ? "visible" : ""}`}
            src="https://cdn.pnj.io/images/detailed/138/gv0000w000690-vong-tay-vang-trang-y-18k-pnj-05.jpg"
            alt="Slideshow"
          />
          <img
            className={`minhhoa ${currentIndex === 1 ? "visible" : ""}`}
            src="https://th.bing.com/th/id/R.399bd796a096b1b4e83f6f618cda7138?rik=QVyM2V9KglG2rQ&riu=http%3a%2f%2fwww.exoticexcess.com%2fwp-content%2fuploads%2f2014%2f07%2fTiffany-Co.-Atlas-Hinged-Bangle-2.jpg&ehk=M3pxuDL4gpoag2T2YyMlZWG59SRFaoRQYUH038rCBDs%3d&risl=&pid=ImgRaw&r=0"
            alt="Slideshow"
          />
        </div>
      </div>
      <div className="contact">
        <div className="thongtin">
          <h1>Thong tin</h1>
          <p>Cơ sở : 331/7/52 Phan huy ích</p>
          <p>TPHCM: so dien thoai 0335552225</p>
          <p>Email: t2ngvn@gmail.com</p>
        </div>
        <div className="gioithieu">
          <h1>Menu</h1>
          <p>Sản phẩm</p>
          <p>Về chúng tôi</p>
          <p>Giấy phép và điều khoản</p>
        </div>
        <div className="taikhoan">
          <h1>Tài khoản</h1>
          <p>Tài khoản của bạn</p>
          <p>Kiểm tra tài khoản</p>
          <p>Giỏ hàng của bạn</p>
          <p>Đơn hàng cảu bạn</p>
        </div>
        <div className="lienhe">
          <h1>Liên hệ</h1>
          <p>Facebook</p>
          <p>Instagram</p>
          <p>Twitter</p>
        </div>

        <div className="phanhoi">
          <h1>phan hoi</h1>
          <input
            className="phanhoi1"
            type="text"
            placeholder="nhap email cua ban"
          ></input>
          <button id="gui">Gửi</button>
        </div>
      </div>
    </div>
  );
}

export default Home;