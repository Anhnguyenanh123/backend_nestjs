# 🚀 NestJS Backend — Tài Liệu Hướng Dẫn Sử Dụng (Full)

Chào mừng bạn đến với bản hướng dẫn chi tiết cho dự án Backend được xây dựng bằng **NestJS**. Tài liệu này cung cấp cái nhìn toàn diện từ cấu trúc code, cách cài đặt cho đến các tiêu chuẩn kỹ thuật được áp dụng.

---

## 🏗️ Kiến Trúc Hệ Thống (Architecture)

Dự án tuân thủ nghiêm ngặt mô hình **MVC (Model-View-Controller)** và triết lý thiết kế của NestJS:

- **Model (Entities & DTOs)**: Định nghĩa cấu trúc dữ liệu và quy tắc kiểm tra (Validation).
- **Controller**: Tiếp nhận Request, điều phối dữ liệu và trả về Response (RESTful).
- **Service**: Nơi chứa 100% logic nghiệp vụ (Business Logic).
- **Module**: Đóng gói các thành phần liên quan để đảm bảo tính module hóa và dễ bảo trì.

---

## 🛠️ Công Nghệ Sử Dụng (Tech Stack)

- **Framework**: NestJS (Node.js)
- **Database**: PostgreSQL
- **ORM**: TypeORM (Hỗ trợ Migrations)
- **Security**: Passport.js, JWT (2 luồng riêng biệt), Bcrypt (Hash password)
- **Documentation**: Swagger API
- **Standards**: ESLint & Prettier

---

## 🚦 Hướng Dẫn Cài Đặt (Setup)

### 1. Chuẩn bị môi trường

Copy file `.env.example` (hoặc tạo mới `.env`) và điền các thông số:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_NAME=backend_db

JWT_USER_SECRET=secret_for_user
JWT_USER_EXPIRES_IN=7d

JWT_ADMIN_SECRET=secret_for_admin
JWT_ADMIN_EXPIRES_IN=1d
```

### 2. Cài đặt Dependencies

```bash
npm install
```

### 3. Khởi tạo Database & Migrations

Dự án sử dụng Migrations để quản lý cấu trúc bảng. Chạy lệnh sau để tạo bảng:

```bash
npm run migration:run
```

### 4. Chạy ứng dụng

```bash
# Chế độ phát triển (watch mode)
npm run start:dev
```

---

## 🔐 Hệ Thống Xác Thực (Authentication)

Hệ thống được thiết kế với **2 phân quyền độc lập**:

1.  **User**: Sử dụng bảng `users`. Token được ký bằng `JWT_USER_SECRET`.
2.  **Admin**: Sử dụng bảng `admins`. Token được ký bằng `JWT_ADMIN_SECRET`.

> [!IMPORTANT]
> Token của User không thể dùng cho các API của Admin và ngược lại. Điều này đảm bảo an toàn tuyệt đối cho các tính năng quản trị.

### Cách tạo tài khoản Admin đầu tiên:

Vì không có API đăng ký Admin công khai, bạn hãy dùng SQL để tạo tài khoản:

```sql
INSERT INTO admins (id, email, password, name)
VALUES (
  uuid_generate_v4(),
  'admin@example.com',
  '$2b$10$wN1G6W6P67LdC0y79p/lqe6O6yvG7rF6vR6N6S6H6M6K6L6J6I6H6', -- Hash của 'adminpassword'
  'Super Admin'
);
```

---

## 📋 Danh Mục API (Endpoints)

| Module    | Phương Thức | Đường Dẫn           | Bảo Mật   | Mô Tả                    |
| :-------- | :---------- | :------------------ | :-------- | :----------------------- |
| **Auth**  | POST        | `/auth/user/login`  | Public    | Đăng nhập User           |
|           | POST        | `/auth/admin/login` | Public    | Đăng nhập Admin          |
| **User**  | GET         | `/users/me`         | User JWT  | Xem Profile cá nhân      |
|           | PATCH       | `/users/me`         | User JWT  | Cập nhật Profile         |
| **Gifts** | GET         | `/gifts`            | User JWT  | Xem danh sách quà tặng   |
|           | GET         | `/gifts/:id`        | User JWT  | Xem chi tiết quà tặng    |
| **Admin** | GET         | `/admin/gifts`      | Admin JWT | Quản lý toàn bộ quà tặng |
|           | POST        | `/admin/gifts`      | Admin JWT | Tạo quà tặng mới         |
|           | PATCH       | `/admin/gifts/:id`  | Admin JWT | Cập nhật quà tặng        |
|           | DELETE      | `/admin/gifts/:id`  | Admin JWT | Xóa quà tặng (Xóa mềm)   |

---

## ✨ Tiêu Chuẩn Chất Lượng (Standards)

1.  **RESTful API**: Sử dụng đúng HTTP Verbs, Resource naming (số nhiều) và Status codes chuẩn.
2.  **Bảo mật dữ liệu**: Sử dụng `@Exclude()` để không bao giờ trả về mật khẩu trong JSON.
3.  **Tài liệu tự động**: Truy cập [http://localhost:3000/api/docs](http://localhost:3000/api/docs) để xem Swagger.
4.  **Format Code**: Đã cấu hình ESLint và Prettier để đảm bảo code luôn sạch sẽ, nhất quán.

---

## 🚀 Lệnh Thao Tác Nhanh

- `npm run lint`: Kiểm tra và sửa lỗi format code.
- `npm run build`: Biên dịch dự án ra thư mục `dist`.
- `npm run migration:generate -- path/to/name`: Tạo file migration mới khi thay đổi Entity.
- `npm run migration:revert`: Hoàn tác migration cuối cùng.
