-- Create database
CREATE DATABASE Vongtay3;
GO

USE Vongtay3;
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

-- Insert sample Product details
INSERT INTO ProductDetails (product_id, processor, color, so_luong, size) 
VALUES (1, 'CECI', 'Do', 23, 'S');
INSERT INTO ProductDetails (product_id, processor, color, so_luong, size) 
VALUES (2, 'CECI', 'Vang', 17, 'M');

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
