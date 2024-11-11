import React, { useRef } from "react";
import  { useState } from "react";
import axios from 'axios';
import '../css/Home.css';
import '../css/product.css';

function Product({ cartItems, setCartItems }) { // Nhận cartItems và setCartItems từ props
    const hiddenItemsRef = useRef([]);
    const [products, setProducts] = React.useState([]);
    const [showModal, setShowModal] = useState(false);
    const [quantity, setQuantity] = useState(1);


    // Fetch data from API
    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://localhost:7256/api/Sanpham'); // Thay YOUR_API_URL_HERE bằng URL của bạn
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };

        fetchData();
    }, []);

    const showMore = () => {
        hiddenItemsRef.current.forEach(item => {
            if (item) {
                item.classList.remove('hidden'); // Bỏ lớp ẩn cho các sản phẩm ẩn
            }
        });
        document.getElementById('Show').style.display = 'none'; // Ẩn nút sau khi hiển thị
    };
    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);
    const handleQuantityChange = (e) => {
        const value = Math.max(1, parseInt(e.target.value) || 1); // Ensure minimum quantity of 1
        setQuantity(value);
    };

    const handleAddToCart = (product) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.productId === product.productId); // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
            if (existingItem) {
                return prevItems.map(item =>
                    item.productId === product.productId ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                return [...prevItems, { ...product, quantity: 1 }]; // Thêm sản phẩm mới
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
                        className={`col-md-3 ${index >= 8 ? 'hidden' : ''}`} 
                        ref={el => index >= 8 && (hiddenItemsRef.current[index - 8] = el)} // Lưu các sản phẩm ẩn vào ref
                    >
                        <div className="card card-border product-card mb-4">
                            <div className="product-image">
                                <img 
                                    className="card-img-top" 
                                    src={product.imageUrl || "https://i.ebayimg.com/images/g/HDEAAOSwArFc9qBa/s-l400.jpg"} 
                                    alt={product.productName} 
                                />
                                <div className="button-container1">
                                <button className="btn btn-hover-primary xem-them" 
                                        onClick={handleShowModal}>Xem Thêm
                                </button>
                                <button 
                                    className="btn btn-hover-orange buy-now" 
                                    onClick={() => handleAddToCart(product)} // Gọi hàm với tham số sản phẩm
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
                <button id="Show" onClick={showMore} className="mt-3 btn btn-primary mx-auto d-block">Show more</button>
            </div>
            {showModal && (
                <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Vòng tay bạc</h5>
                                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
                            </div>
                            <div className="modal-body">
                                <div id="more-img" className="carousel slide" data-bs-ride="carousel">
                                    <div className="carousel-inner">
                                        <div className="carousel-item active">
                                            <img src="https://i.ebayimg.com/images/g/HDEAAOSwArFc9qBa/s-l400.jpg" className="d-block w-100 img-thumbnail" alt="Product Image 1" />
                                        </div>
                                        <div className="carousel-item">
                                            <img src="https://i.ebayimg.com/images/g/CUoAAOSwALNm2eR0/s-l960.webp" className="d-block w-100 img-thumbnail" alt="Product Image 2" />
                                        </div>
                                        <div className="carousel-item">
                                            <img src="https://i.ebayimg.com/images/g/V0cAAOSwWpBm2eRz/s-l1600.webp" className="d-block w-100 img-thumbnail" alt="Product Image 3" />
                                        </div>
                                    </div>
                                    <button className="carousel-control-prev" type="button" data-bs-target="#productCarousel" data-bs-slide="prev">
                                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                        <span className="visually-hidden">Previous</span>
                                    </button>
                                    <button className="carousel-control-next" type="button" data-bs-target="#productCarousel" data-bs-slide="next">
                                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                        <span className="visually-hidden">Next</span>
                                    </button>
                                </div>
                                <p className="product-description">Vòng tay bạc chất liệu cao cấp, thiết kế tinh xảo, phù hợp làm quà tặng.</p>
                                <p className="product-price">Giá: 500,000₫</p>
                                <div className="quantity-control">
                                    <label htmlFor="quantity" className="form-label">Số lượng:</label>
                                    <input type="number" id="quantity" className="form-control" min="1" value={quantity} onChange={handleQuantityChange} />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Đóng</button>
                                <button type="button" className="btn btn-primary">Mua Ngay</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Product;
