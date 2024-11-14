-- Create database
CREATE DATABASE Vongtay3;
GO

USE Vongtay;
GO

-- Create table Roles (PhanQuyen)
CREATE TABLE Roles (
    role_id INT PRIMARY KEY IDENTITY(1,1),
    role_name NVARCHAR(50) UNIQUE NOT NULL
);

-- Insert sample roles
INSERT INTO Roles (role_name) VALUES ('admin');
INSERT INTO Roles (role_name) VALUES ('user');

-- Create table Users (Nguoidung)
CREATE TABLE Users (
    user_id INT PRIMARY KEY IDENTITY(1,1),
    username NVARCHAR(50) UNIQUE NOT NULL,
    password NVARCHAR(255) NOT NULL,
    full_name NVARCHAR(100),
    email NVARCHAR(100),
    role_id INT,
    FOREIGN KEY (role_id) REFERENCES Roles (role_id)
);

-- Insert sample users
INSERT INTO Users (username, password, full_name, email, role_id) 
VALUES ('admin', 'admin123', 'Admin User', 'admin@example.com', 1);
INSERT INTO Users (username, password, full_name, email, role_id) 
VALUES ('user', 'user123', 'Regular User', 'user@example.com', 2);

-- Create table Products (Sanpham)
CREATE TABLE Products (
    product_id INT PRIMARY KEY IDENTITY(1,1),
    product_name NVARCHAR(255),
    mo_ta TEXT,
    gia DECIMAL(10, 2),
    so_luong INT
);

-- Insert sample products (remove duplicates)
INSERT INTO Products (product_name, mo_ta, gia, so_luong) 
VALUES ('CECI 1', 'Vong tay chuoi xich manh phoi mat chu nhat', 329.00, 50);
INSERT INTO Products (product_name, mo_ta, gia, so_luong) 
VALUES ('CECI 2', 'Vong tay nu day da ban to phoi chu đinh đa Queen', 249.00, 30);
INSERT INTO Products (product_name, mo_ta, gia, so_luong) 
VALUES ('CECI 3', 'Vong đeo tay nu mac xich lon ca tinh', 149.00, 10);
INSERT INTO Products (product_name, mo_ta, gia, so_luong) 
VALUES ('CECI 4', 'Vong đeo tay nu ban lon phoi mau tre trung', 389.00, 50);

-- Create table ProductDetails (Chitietsanpham)
CREATE TABLE ProductDetails (
    product_id INT PRIMARY KEY,
    processor NVARCHAR(100),
    color NVARCHAR(50),
    so_luong INT,
    size NVARCHAR(50),  
    FOREIGN KEY (product_id) REFERENCES Products (product_id)
);

-- Insert Products
INSERT INTO ProductDetails (product_id, processor, color, HinhAnh, size)
VALUES
(16, N'Lấy cảm hứng từ vòng tròn vô cực, tượng trưng cho vẻ đẹp bền chặt vĩnh cửu của tình yêu đôi lứa, vòng bạc được thiết kế một cách tinh xảo, với chất liệu bạc S925 cao cấp, sang trọng.', N'Vàng', N'["https://lili.vn/wp-content/uploads/2020/12/Vong-tay-bac-theo-cap-LILI_986852-02.jpg", "https://lili.vn/wp-content/uploads/2020/12/Vong-tay-bac-theo-cap-LILI_986852-01.jpg", "https://lili.vn/wp-content/uploads/2020/12/Vong-tay-bac-theo-cap-LILI_986852-05.jpg", "https://lili.vn/wp-content/uploads/2020/12/Vong-tay-bac-theo-cap-LILI_986852-04.jpg"]', N'Lấy cảm hứng từ vòng tròn vô cực, tượng trưng cho vẻ đẹp bền chặt vĩnh cửu của tình yêu đôi lứa, vòng bạc được thiết kế một cách tinh xảo, với chất liệu bạc S925 cao cấp, sang trọng.',N'L, XL, XXL'),
(17, N'Sản phẩm được làm từ bạc S925 với ngôn ngữ thiết kế mang đến vẻ đẹp đơn giản nhưng không đơn điệu, trưởng thành nhưng lại rất trẻ. Món trang sức không chỉ giúp bạn trông thật thanh lịch và duyên dáng, mà còn như như một tín hiệu của tình yêu và hạnh phúc.', N'Đỏ', N'["https://lili.vn/wp-content/uploads/2022/05/Vong-tay-bac-cap-doi-tinh-yeu-Sun-And-Moon-LILI_836993_4.jpg", "https://lili.vn/wp-content/uploads/2022/05/Vong-tay-bac-cap-doi-tinh-yeu-Sun-And-Moon-LILI_836993_2.jpg", "https://lili.vn/wp-content/uploads/2022/05/Vong-tay-bac-cap-doi-tinh-yeu-Sun-And-Moon-LILI_836993_5.jpg", "https://lili.vn/wp-content/uploads/2022/05/Vong-tay-bac-cap-doi-tinh-yeu-Sun-And-Moon-LILI_836993_3.jpg"]', N'Sản phẩm được làm từ bạc S925 với ngôn ngữ thiết kế mang đến vẻ đẹp đơn giản nhưng không đơn điệu, trưởng thành nhưng lại rất trẻ. Món trang sức không chỉ giúp bạn trông thật thanh lịch và duyên dáng, mà còn như một tín hiệu của tình yêu và hạnh phúc.',N'L, XL, XXL'),
(18, N'Sản phẩm được làm từ bạc S925 đính đá Cubic Zirconia cao cấp với điểm nhấn là bông hoa hồng ở trung tâm', N'Xanh', N'["https://lili.vn/wp-content/uploads/2022/06/Lac-tay-bac-nu-dinh-da-CZ-hinh-bong-hoa-hong-LILI_787759_5.jpg", "https://lili.vn/wp-content/uploads/2022/06/Lac-tay-bac-nu-dinh-da-CZ-hinh-bong-hoa-hong-LILI_787759_4.jpg", "https://lili.vn/wp-content/uploads/2022/06/Lac-tay-bac-nu-dinh-da-CZ-hinh-bong-hoa-hong-LILI_787759_2.jpg", "https://lili.vn/wp-content/uploads/2022/06/Lac-tay-bac-nu-dinh-da-CZ-hinh-bong-hoa-hong-LILI_787759_3.jpg"]', N'Sản phẩm được làm từ bạc S925 đính đá Cubic Zirconia cao cấp với điểm nhấn là bông hoa hồng ở trung tâm.',N'L, XL, XXL'),
(19, N'Chiếc vòng tay là từ bạc S925 đính đá Cubic Zirconia mang đến cho bạn một vẻ đẹp hoàn hảo là điểm nhấn nhá tuyệt vời mỗi khi bạn xuất hiện. ', N'Lục Bảo', N'["https://lili.vn/wp-content/uploads/2022/04/Lac-tay-bac-nu-dinh-da-CZ-hinh-canh-loc-non-LILI_247931_6.jpg", "https://lili.vn/wp-content/uploads/2022/04/Lac-tay-bac-nu-dinh-da-CZ-hinh-canh-loc-non-LILI_247931_9.jpg", "https://lili.vn/wp-content/uploads/2022/04/Lac-tay-bac-nu-dinh-da-CZ-hinh-canh-loc-non-LILI_247931_8.jpg", "https://lili.vn/wp-content/uploads/2022/04/Lac-tay-bac-nu-dinh-da-CZ-hinh-canh-loc-non-LILI_247931_3.jpg"]', N'Chiếc vòng tay là từ bạc S925 đính đá Cubic Zirconia mang đến cho bạn một vẻ đẹp hoàn hảo là điểm nhấn nhá tuyệt vời mỗi khi bạn xuất hiện.',N'L, XL, XXL'),
(20, N'Chiếc vòng được làm từ bạc S925 đính đá Cubic Zirconia kết hợp đá mã não đen với thiết kế cỏ 4 lá, mang đến sự cuốn hút toát lên vẻ sang chảnh và nổi bật cho bạn.', N'Cam', N'["https://lili.vn/wp-content/uploads/2024/02/Lac-tay-bac-nu-dinh-da-CZ-ma-nao-hinh-co-la-Vera-LILI_449223_21.jpg", "https://lili.vn/wp-content/uploads/2022/07/Lac-tay-bac-nu-dinh-da-CZ-ma-nao-hinh-co-la-Vera-LILI_449223_5.jpg", "https://lili.vn/wp-content/uploads/2024/02/Lac-tay-bac-nu-dinh-da-CZ-ma-nao-hinh-co-la-Vera-LILI_449223_23.jpg", "https://lili.vn/wp-content/uploads/2022/07/Lac-tay-bac-nu-dinh-da-CZ-ma-nao-hinh-co-la-Vera-LILI_449223_4.jpg"]', N'Chiếc vòng được làm từ bạc S925 đính đá Cubic Zirconia kết hợp đá mã não đen với thiết kế cỏ 4 lá, mang đến sự cuốn hút toát lên vẻ sang chảnh và nổi bật cho bạn.',N'L, XL, XXL'),
(21, N'Sản phẩm được làm từ bạc 925, xung quanh là 3 chiếc cỏ 4 lá. Một phong cách thiết kế tượng trưng cho sự nữ tính, thanh lịch.', N'Đen', N'["https://lili.vn/wp-content/uploads/2020/12/Vong-tay-bac-hinh-co-4-la-LILI_827243-04.jpg", "https://lili.vn/wp-content/uploads/2020/12/Vong-tay-bac-hinh-co-4-la-LILI_827243-01.jpg", "https://lili.vn/wp-content/uploads/2020/12/Vong-tay-bac-hinh-co-4-la-LILI_827243-04.jpg", "https://lili.vn/wp-content/uploads/2020/12/Vong-tay-bac-hinh-co-4-la-LILI_827243-03.jpg"]', N'Sản phẩm được làm từ bạc 925, xung quanh là 3 chiếc cỏ 4 lá. Một phong cách thiết kế tượng trưng cho sự nữ tính, thanh lịch.',N'L, XL, XXL'),
(22, N'Chiếc vòng được làm từ đá mã não trắng 5A dạng chuỗi hạt. Mã não trắng có thể giúp chủ nhân trở nên giao tiếp tốt hơn, làm cho bản thân trở nên dễ mến, ứng biến linh hoạt và chống lại kẻ thù xấu xa.', N'TRắng', N'["https://lili.vn/wp-content/uploads/2021/11/Vong-tay-ma-nao-trang-5A-nu-nam-LILI_491843_3.jpg", "https://lili.vn/wp-content/uploads/2021/11/Vong-tay-ma-nao-trang-5A-nu-nam-LILI_491843_4.jpg", "https://lili.vn/wp-content/uploads/2021/11/Vong-tay-ma-nao-trang-5A-nu-nam-LILI_491843_2.jpg"]', N'Chiếc vòng được làm từ đá mã não trắng 5A dạng chuỗi hạt. Mã não trắng có thể giúp chủ nhân trở nên giao tiếp tốt hơn, làm cho bản thân trở nên dễ mến, ứng biến linh hoạt và chống lại kẻ thù xấu xa.',N'L, XL, XXL'),
(23, N'Chiếc vòng được làm từ đá mã não đen 7A dạng chuỗi hạt. Việc đeo vòng mã não đen giúp bạn có tinh thần thoải mái, giảm áp lực giúp bạn luôn tràn đầy năng lượng trong cuộc sống.', N'Thủy tinh', N'["https://lili.vn/wp-content/uploads/2021/11/Vong-tay-ma-nao-den-7A-nu-nam-LILI_525552_6.jpg", "https://lili.vn/wp-content/uploads/2021/11/Vong-tay-ma-nao-den-7A-nu-nam-LILI_525552_2.jpg", "https://lili.vn/wp-content/uploads/2021/11/Vong-tay-ma-nao-den-7A-nu-nam-LILI_525552_1.jpg"]', N'Chiếc vòng được làm từ đá mã não đen 7A dạng chuỗi hạt. Việc đeo vòng mã não đen giúp bạn có tinh thần thoải mái, giảm áp lực giúp bạn luôn tràn đầy năng lượng trong cuộc sống.',N'L, XL, XXL'),
(24, N'Vòng tay được làm từ bạc S925 cao cấp với thiết kế dạng trơn hình chú mèo xinh xắn, thời trang và phong cách sẽ là sự lựa chọn hoàn hảo cho các cô gái cá tính, trẻ trung, phóng khoáng. ',N'Hồng', N'["https://lili.vn/wp-content/uploads/2022/10/Vong-tay-bac-dac-nu-tron-hinh-meo-xinh-xan-Sarah-LILI_192123_4.jpg", "https://lili.vn/wp-content/uploads/2022/10/Vong-tay-bac-dac-nu-tron-hinh-meo-xinh-xan-Sarah-LILI_192123_1.jpg", "https://lili.vn/wp-content/uploads/2022/10/Vong-tay-bac-dac-nu-tron-hinh-meo-xinh-xan-Sarah-LILI_192123_5.jpg"]', N'Chiếc vòng tay bạc đặc nữ trơn, hình mèo xinh xắn được làm từ bạc S925 mạ vàng tinh tế, là sự lựa chọn hoàn hảo cho các cô nàng yêu thích sự ngọt ngào, dễ thương.',N'L, XL, XXL'),
(25, N'Chiếc vòng tay được làm bằng bạc S925 với thiết kế hình chuỗi trái tim mang đến cho bạn sự sang trọng và quý phái. Dù trong hoàn cảnh nào: đi làm, đi dự tiệc hay đi chơi với bạn bè, đôi tay của bạn sẽ cực kỳ nổi bật.', N'', N'["https://lili.vn/wp-content/uploads/2022/04/Vong-tay-bac-nu-thiet-ke-ban-tron-dinh-da-CZ-LILI_649318_1.jpg", "https://lili.vn/wp-content/uploads/2022/04/Vong-tay-bac-nu-thiet-ke-ban-tron-dinh-da-CZ-LILI_649318_4.jpg", "https://lili.vn/wp-content/uploads/2022/04/Vong-tay-bac-nu-thiet-ke-ban-tron-dinh-da-CZ-LILI_649318_5.jpg"]', N'Vòng tay bạc nữ được thiết kế bản trơn đính đá CZ tinh tế, mang lại vẻ đẹp quyến rũ và sang trọng cho phái đẹp.',N'L, XL, XXL'),
(26, N'Sản phẩm được làm từ bạc S925, mạ 3 lớp bạch kim cao cấp. Thiết kế dạng dây mềm kết hợp cùng bông cỏ bốn lá điểm xuyến với điểm nhấn là các họa tiết nhỏ xinh mang đến nét đẹp tinh tế và nữ tính cho bạn gái. ', N'Tím', N'["https://lili.vn/wp-content/uploads/2022/07/Vong-tay-bac-nu-thiet-ke-hinh-trai-tim-dinh-da-CZ-LILI_885536_4.jpg", "https://lili.vn/wp-content/uploads/2022/07/Vong-tay-bac-nu-thiet-ke-hinh-trai-tim-dinh-da-CZ-LILI_885536_5.jpg", "https://lili.vn/wp-content/uploads/2022/07/Vong-tay-bac-nu-thiet-ke-hinh-trai-tim-dinh-da-CZ-LILI_885536_1.jpg"]', N'Sản phẩm được làm từ bạc S925 thiết kế hình trái tim với các chi tiết tinh xảo, đính đá CZ.',N'L, XL, XXL'),
(27, N'Chiếc vòng được làm từ bạc S925 đính đá Cubic Zirconia với thiết kế hình cỏ 4 lá may mắn tinh xảo, tỉ mỉ mang đến cho bạn cho sự nữ tính và thanh lịch.', N'xanh da trời', N'["https://lili.vn/wp-content/uploads/2022/04/Vong-tay-bac-nu-thiet-ke-thanh-lich-dinh-da-LILI_246193_5.jpg", "https://lili.vn/wp-content/uploads/2022/04/Vong-tay-bac-nu-thiet-ke-thanh-lich-dinh-da-LILI_246193_6.jpg", "https://lili.vn/wp-content/uploads/2022/04/Vong-tay-bac-nu-thiet-ke-thanh-lich-dinh-da-LILI_246193_3.jpg"]', N'Vòng tay bạc nữ với thiết kế thanh lịch, đính đá CZ sang trọng, phù hợp cho những buổi tiệc sang trọng hoặc ngày lễ đặc biệt.',N'L, XL, XXL');


-- Create table Customers (Khachhang)
CREATE TABLE Customers (
    customer_id INT PRIMARY KEY IDENTITY(1,1),
    customer_name NVARCHAR(50),
    dia_chi NVARCHAR(MAX),
    email NVARCHAR(100),
    phone NVARCHAR(20)
);

-- Insert sample customers
INSERT INTO Customers (customer_name, dia_chi, email, phone) 
VALUES ('VanCong', '456 P6 GoVap', 'cong@gmail.com', '0987654321');
INSERT INTO Customers (customer_name, dia_chi, email, phone) 
VALUES ('ThaoNguyen', '8/17 LinhDong ThuDuc TP.HCM', 'nguyen@gmail.com', '1234567890');
INSERT INTO Customers (customer_name, dia_chi, email, phone) 
VALUES ('MinhTri', '14/7 LinhTrung ThuDuc', 'tri@gmail.com', '0987654321');
INSERT INTO Customers (customer_name, dia_chi, email, phone) 
VALUES ('HuuPhuc', 'PhodiboNguyenHue', 'phuc@gmail.com', '0987654321');

-- Create table Departments (Quanly)
CREATE TABLE Departments (
    department_id INT PRIMARY KEY IDENTITY(1,1),
    department_name NVARCHAR(50) UNIQUE NOT NULL
);

-- Insert sample departments
INSERT INTO Departments (department_name) VALUES ('sales');
INSERT INTO Departments (department_name) VALUES ('quality_control');

-- Create table Orders (Donhang)
CREATE TABLE Orders (
    order_id INT PRIMARY KEY IDENTITY(1,1),
    customer_id INT,
    user_id INT,
    customer_name NVARCHAR(50),
    product_name NVARCHAR(255),
    ngay_mua DATE,
    so_luong INT,
    dia_chi NVARCHAR(MAX),
    phone NVARCHAR(20),
    email NVARCHAR(100),
    tong_tien DECIMAL(10, 2),
    FOREIGN KEY (customer_id) REFERENCES Customers (customer_id),
    FOREIGN KEY (user_id) REFERENCES Users (user_id)
);

-- Insert sample orders
INSERT INTO Orders (customer_id, user_id, customer_name, product_name, ngay_mua, so_luong, dia_chi, phone, email, tong_tien)
VALUES (1, 1, 'Thao Nguyen', 'CECI 1', '2024-05-29', 2, '123 HCM', '1234567890', 'nguyen@gmail.com', 2400.00);

INSERT INTO Orders (customer_id, user_id, customer_name, product_name, ngay_mua, so_luong, dia_chi, phone, email, tong_tien)
VALUES (2, 2, 'Van Cong', 'CECI 2', '2024-05-09', 1, '456 HCM', '0987654321', 'cong@gmail.com', 1500.00);

-- Create table OrderDetails (Chitietdonhang)
CREATE TABLE OrderDetails (
    order_detail_id INT PRIMARY KEY IDENTITY(1,1),
    order_id INT,
    product_id INT,
    customer_id INT,
    user_id INT,
    customer_name NVARCHAR(50),
    product_name NVARCHAR(255),
    ngay_mua DATE,
    so_luong INT,
    dia_chi NVARCHAR(MAX),
    phone NVARCHAR(20),
    email NVARCHAR(100),
    tong_tien DECIMAL(10, 2),
    FOREIGN KEY (product_id) REFERENCES Products (product_id)
);

-- Insert sample order details
INSERT INTO OrderDetails (order_id, product_id, customer_id, user_id, customer_name, product_name, ngay_mua, so_luong, dia_chi, phone, email, tong_tien)
VALUES (1, 1, 1, 1, 'Thao Nguyen', 'CECI 1', '2024-05-13', 2, '8/17 LinhDong ThuDuc TP.HCM', '1234567890', 'nguyen@gmail.com', 639.00);

INSERT INTO OrderDetails (order_id, product_id, customer_id, user_id, customer_name, product_name, ngay_mua, so_luong, dia_chi, phone, email, tong_tien)
VALUES (2, 2, 2, 2, 'VanCong', 'CECI 2', '2024-05-14', 1, '456 P6 GoVap', '0987654321', 'cong@gmail.com', 149.00);

-- Create table QualityControl (Kiemsoatchatluong)
CREATE TABLE QualityControl (
    qc_id INT PRIMARY KEY IDENTITY(1,1),
    product_id INT,    
    date_checked DATE,
    result NVARCHAR(50),
    FOREIGN KEY (product_id) REFERENCES Products (product_id)
);

-- Insert sample quality control checks
INSERT INTO QualityControl (product_id, date_checked, result) 
VALUES (1, '2026-05-10', 'Pass');
