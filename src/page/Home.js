import React from "react";
import '../css/Home.css'
import { useState} from "react";
import { useEffect} from "react";
import { useRef} from "react";

function  Home (){
    const hiddenItemsRef = useRef([]);

    const showMore = () => {
        hiddenItemsRef.current.forEach(item => {
            item.classList.remove('hidden'); // Bỏ lớp ẩn cho các sản phẩm ẩn
        });
        document.getElementById('Show').style.display = 'none'; // Ẩn nút sau khi hiển thị
    };
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrentIndex((currentIndex + 1) % 2); // Giả sử bạn có 2 hình ảnh
        }, 3000); // Thay đổi sau 3 giây

        return () => clearTimeout(timer);
    }, [currentIndex]);

    

    
    return(
        
        <div className="header">
        <div className="logo2"></div>
        <img className="background2" src="https://bizweb.dktcdn.net/100/090/662/products/vong-tay-handmade-nu-3.jpg?v=1614570377983"/>
        <img className='background1'src="https://lili.vn/wp-content/uploads/2021/12/Lac-tay-bac-cap-doi-tinh-yeu-Forever-Love-LILI_986852_11.jpg"/>
        <div className="logo">
            <div  className="box">
            <h1>
                Vòng tay trang sức cao cấp
            </h1>
            <p>
                Ở đây có bán trang sức đẹp
            </p>
            <button className="button1">
                Mua ngay kẻo hết
            </button>
            </div>
        </div>
    <div className="product2">
        <div className="product">
        <div className="row">
                        <div className="col-md-3">
                            <div className="the">
                                <img className="productimg" src="https://i.ebayimg.com/images/g/HDEAAOSwArFc9qBa/s-l400.jpg" alt="Vòng tay bạc 1" />
                                <h2>Vòng tay bạc 1</h2>
                                <p className="mota">Vòng tay bạc chất liệu cao cấp</p>
                                <p className="giatien">2.500.000</p>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="the">
                                <img className="productimg" src="https://i.ebayimg.com/images/g/HDEAAOSwArFc9qBa/s-l400.jpg" alt="Vòng tay bạc 2" />
                                <h2>Vòng tay bạc 2</h2>
                                <p className="mota">Vòng tay bạc chất liệu cao cấp</p>
                                <p className="giatien">2.500.000</p>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="the">
                                <img className="productimg" src="https://i.ebayimg.com/images/g/HDEAAOSwArFc9qBa/s-l400.jpg" alt="Vòng tay bạc 3" />
                                <h2>Vòng tay bạc 3</h2>
                                <p className="mota">Vòng tay bạc chất liệu cao cấp</p>
                                <p className="giatien">2.500.000</p>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="the">
                                <img className="productimg" src="https://i.ebayimg.com/images/g/HDEAAOSwArFc9qBa/s-l400.jpg" alt="Vòng tay bạc 4" />
                                <h2>Vòng tay bạc 4</h2>
                                <p className="mota">Vòng tay bạc chất liệu cao cấp</p>
                                <p className="giatien">2.500.000</p>
                            </div>
                        </div>

                        {/* Hiển thị 4 sản phẩm ẩn */}
                        <div className="col-md-3 hidden" ref={el => hiddenItemsRef.current[0] = el}>
                            <div className="the">
                                <img className="productimg" src="https://i.ebayimg.com/images/g/HDEAAOSwArFc9qBa/s-l400.jpg" alt="Vòng tay bạc 5" />
                                <h2>Vòng tay bạc 5</h2>
                                <p className="mota">Vòng tay bạc chất liệu cao cấp</p>
                                <p className="giatien">2.500.000</p>
                            </div>
                        </div>
                        <div className="col-md-3 hidden" ref={el => hiddenItemsRef.current[1] = el}>
                            <div className="the">
                                <img className="productimg" src="https://i.ebayimg.com/images/g/HDEAAOSwArFc9qBa/s-l400.jpg" alt="Vòng tay bạc 6" />
                                <h2>Vòng tay bạc 6</h2>
                                <p className="mota">Vòng tay bạc chất liệu cao cấp</p>
                                <p className="giatien">2.500.000</p>
                            </div>
                        </div>
                        <div className="col-md-3 hidden" ref={el => hiddenItemsRef.current[2] = el}>
                            <div className="the">
                                <img className="productimg" src="https://i.ebayimg.com/images/g/HDEAAOSwArFc9qBa/s-l400.jpg" alt="Vòng tay bạc 7" />
                                <h2>Vòng tay bạc 7</h2>
                                <p className="mota">Vòng tay bạc chất liệu cao cấp</p>
                                <p className="giatien">2.500.000</p>
                            </div>
                        </div>
                        <div className="col-md-3 hidden" ref={el => hiddenItemsRef.current[3] = el}>
                            <div className="the">
                                <img className="productimg" src="https://i.ebayimg.com/images/g/HDEAAOSwArFc9qBa/s-l400.jpg" alt="Vòng tay bạc 8" />
                                <h2>Vòng tay bạc 8</h2>
                                <p className="mota">Vòng tay bạc chất liệu cao cấp</p>
                                <p className="giatien">2.500.000</p>
                            </div>
                        </div>
                    </div>
                </div>
                <button id="Show" onClick={showMore}>Show more</button>
        </div>
        <div className="introduce">
            <div className="introduce1">
                <h1 className="intro">
                50+ các loại vòng tay trang sức khác nhau
                </h1>
                <p className="in">
                Thiết kế của chúng tôi vẫn còn rất nhiều mẫu khác nhau, trong đó cũng có rất nhiều mẫu độc nhất và bán chạy trên thị trường
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
                <h1>
                    Thong tin
                </h1>
                <p>
                Cơ sở : 331/7/52 Phan huy ích
                </p>
                <p>
                TPHCM: so dien thoai 0335552225
                </p>
                <p>
                Email: t2ngvn@gmail.com
                </p>
                
            </div>
            <div className="gioithieu">
                <h1>
                Menu
                </h1>
                <p>Sản phẩm</p>
                <p>Về chúng tôi</p>
                <p>Giấy phép và điều khoản</p>
            </div>
            <div className="taikhoan">
                <h1>
                Tài khoản
                </h1>
                <p>Tài khoản của bạn</p>
                <p>Kiểm tra tài khoản</p>
                <p>Giỏ hàng của bạn</p>
                <p>Đơn hàng cảu bạn</p>
            </div>
            <div className="lienhe">
                <h1>
                Liên hệ
                </h1>
                <p>Facebook</p>
                <p>Instagram</p>
                <p>Twitter</p>
            </div>

            <div className="phanhoi">
                <h1>phan hoi</h1>
                <input className='phanhoi1' type="text" placeholder="nhap email cua ban"></input>
                <button id="gui">Gửi</button>
            </div>
        </div>
    </div>

    
    )


}
export default Home;