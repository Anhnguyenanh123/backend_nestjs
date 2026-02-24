HƯỚNG DẪN KIỂM THỬ HỆ THỐNG (TEST GUIDE)

Tài liệu này hướng dẫn chi tiết các bước để kiểm tra toàn bộ luồng hoạt động của dự án từ góc nhìn của người dùng cuối và quản trị viên.

---

PHẦN 1: CHUẨN BỊ MÔI TRƯỜNG

1. Đảm bảo PostgreSQL đã được khởi động.
2. Kiểm tra file .env đã cấu hình đúng thông số database.
3. Chạy lệnh: npm run migration:run để khởi tạo cấu trúc bảng.
4. Chạy lệnh: npm run start:dev để bật server.
5. Truy cập địa chỉ: http://localhost:3000/api/docs (Giao diện Swagger).

---

PHẦN 2: CÁC BƯỚC KIỂM THỬ CHI TIẾT

BƯỚC 1: KIỂM TRA DATABASE
Hành động: Mở phần mềm pgAdmin, đăng nhập vào database đã cấu hình. Kiểm tra xem các bảng "users", "admins" và "gifts" đã xuất hiện chưa.
[Hình ảnh 1: Chụp danh sách các bảng trong pgAdmin]

BƯỚC 2: TẠO DỮ LIỆU MẪU (SQL SEEDING)
Vì hệ thống chưa có trang đăng ký, bạn cần tạo tài khoản trực tiếp trong Database để test.
Hành động: Mở Query Tool trong pgAdmin và chạy lệnh SQL sau:

-- Tạo tài khoản Quản trị viên (Admin)
INSERT INTO admins (id, email, password, name)
VALUES (uuid_generate_v4(), 'admin@test.com', '$2b$10$wN1G6W6P67LdC0y79p/lqe6O6yvG7rF6vR6N6S6H6M6K6L6J6I6H6', 'Quản trị viên');

-- Tạo tài khoản Người dùng (User)
INSERT INTO users (id, email, password, full_name)
VALUES (uuid_generate_v4(), 'user@test.com', '$2b$10$wN1G6W6P67LdC0y79p/lqe6O6yvG7rF6vR6N6S6H6M6K6L6J6I6H6', 'Người dùng thử');

[Hình ảnh 2: Chụp kết quả thông báo chạy SQL thành công]

---

PHẦN 3: KIỂM THỬ QUYỀN QUẢN TRỊ (ADMIN FLOW)

1. ĐĂNG NHẬP ADMIN

- Tìm đến mục Admin Auth trong Swagger, chọn API POST /auth/admin/login.
- Nhập Email: admin@test.com / Mật khẩu: adminpassword.
- Kết quả: Hệ thống trả về một mã "accessToken". Bạn hãy sao chép mã này.
  [Hình ảnh 3: Chụp kết quả trả về mã Token của Admin trên Swagger]

2. XÁC THỰC QUYỀN

- Bấm nút "Authorize" ở phía trên cùng trang Swagger.
- Dán mã Token vừa copy vào ô "admin-auth" và bấm Authorize.

3. TẠO QUÀ TẶNG MỚI

- Tìm API POST /admin/gifts. Nhập thông tin quà (Tên, mô tả, số lượng).
- Kết quả: Hệ thống báo tạo thành công và trả về thông tin món quà.
  [Hình ảnh 4: Chụp kết quả tạo quà thành công]

---

PHẦN 4: KIỂM THỬ QUYỀN NGƯỜI DÙNG (USER FLOW)

1. ĐĂNG NHẬP USER

- Tìm đến mục User Auth trong Swagger, chọn API POST /auth/user/login.
- Nhập Email: user@test.com / Mật khẩu: adminpassword.
- Kết quả: Nhận về mã "accessToken" dành riêng cho User.
  [Hình ảnh 5: Chụp mã Token của User]

2. XEM DANH SÁCH QUÀ

- Dùng mã Token mới copy dán vào ô "user-auth" trong phần Authorize.
- Tìm API GET /gifts và bấm thực hiện.
- Kết quả: Người dùng phải thấy được món quà mà Admin vừa tạo ở bước trên.
  [Hình ảnh 6: Chụp danh sách quà hiển thị phía User]

3. QUẢN LÝ THÔNG TIN CÁ NHÂN

- Chạy API GET /users/me để xem thông tin cá nhân.
- Chạy API PATCH /users/me để sửa tên (fullName).
- Kết quả: Tên được đổi thành công và hiển thị đúng khi xem lại.
  [Hình ảnh 7: Chụp thông tin Profile trước và sau khi sửa]

---

PHẦN 5: KIỂM TRA TÍNH ĐỒNG BỘ (XÓA QUÀ)

- Quay lại quyền Admin, dùng API DELETE /admin/gifts/{id} de xóa món quà.
- Quay lại phía Người dùng (User), chạy lại API GET /gifts.
- Kết quả: Món quà đó không còn xuất hiện trong danh sách của User nữa.
  [Hình ảnh 8: Chụp danh sách quà trống sau khi Admin đã xóa]

---

PHẦN 6: KIỂM THỬ CÁC TRƯỜNG HỢP LỖI (UNHAPPY CASES)

1. NHẬP THÔNG TIN SAI HOẶC THIẾU (400 BAD REQUEST)

- Hành động: Tại API POST /admin/gifts, bỏ trống trường "name" hoặc nhập "quantity" là số âm.
- Kết quả mong muốn: Hệ thống trả về lỗi 400 Bad Request. Phần "message" sẽ liệt kê chi tiết các lỗi validation (ví dụ: "name should not be empty", "quantity must not be less than 0").
  [Hình ảnh 9: Chụp thông báo lỗi 400 chi tiết trên Swagger]

2. TRUY CẬP KHÔNG XÁC THỰC (401 UNAUTHORIZED)

- Hành động: Bấm nut "Logout" trong phần Authorize để xóa sạch Token. Sau đó thử chạy API GET /users/me.
- Kết quả mong muốn: Hệ thống trả về lỗi 401 Unauthorized với thông báo "Unauthorized".
  [Hình ảnh 10: Chụp lỗi 401 khi chưa đăng nhập]

3. DÙNG SAI LOẠI TOKEN (401 UNAUTHORIZED)

- Hành động: Sao chép Token của User nhưng lại dán vào ô "admin-auth" để thử gọi API dành cho Admin (ví dụ: POST /admin/gifts).
- Kết quả mong muốn: Hệ thống tiếp tục trả về lỗi 401 Unauthorized. Điều này là do hệ thống sử dụng hai mã bí mật (Secret Key) khác nhau cho User và Admin, đảm bảo không thể dùng nhầm quyền.
  [Hình ảnh 11: Chụp lỗi 401 khi dùng sai loại Token]

4. TÌM KIẾM DỮ LIỆU KHÔNG TỒN TẠI (404 NOT FOUND)

- Hành động: Tại API GET /gifts/{id}, nhập một mã ID ngẫu nhiên không có trong database.
- Kết quả mong muốn: Hệ thống trả về lỗi 404 Not Found kèm thông báo "Gift with id ... not found".
  [Hình ảnh 12: Chụp lỗi 404 khi không tìm thấy dữ liệu]

5. SAI THÔNG TIN ĐĂNG NHẬP (401 UNAUTHORIZED)

- Hành động: Tại API POST /auth/user/login hoặc /auth/admin/login:
  - Nhập Email sai: Kỳ vọng trả về "Email does not exist".
  - Nhập Password sai: Kỳ vọng trả về "Incorrect password".
- Kết quả mong muốn: Hệ thống trả về lỗi 401 Unauthorized với thông báo cụ thể như trên.
  [Hình ảnh 13: Chụp lỗi 401 khi đăng nhập sai thông tin]

6. THIẾU THÔNG TIN ĐĂNG NHẬP (400 BAD REQUEST)

- Hành động: Tại API đăng nhập, để trống trường "email" hoặc "password" khi gửi Request.
- Kết quả mong muốn: Hệ thống trả về lỗi 400 Bad Request. Thông báo sẽ chỉ rõ trường nào bị thiếu (ví dụ: "email should not be empty").
  [Hình ảnh 14: Chụp lỗi 400 khi thiếu thông tin đăng nhập]

7. CẬP NHẬT/XÓA VỚI ID SAI ĐỊNH DẠNG (400 BAD REQUEST)

- Hành động: Tại các API có tham số `{id}` (như PATCH/DELETE /admin/gifts/{id}), nhập một chuỗi bất kỳ không phải mã UUID (ví dụ: `123`, `abc`).
- Kết quả mong muốn: Hệ thống trả về lỗi 400 Bad Request với thông báo "Validation failed (uuid is expected)".
  [Hình ảnh 15: Chụp lỗi 400 do sai định dạng UUID]

8. CẬP NHẬT QUÀ VỚI DỮ LIỆU SAI (400 BAD REQUEST)

- Hành động: Tại API PATCH /admin/gifts/{id}, gửi Body là JSON hợp lệ nhưng sai kiểu dữ liệu. Ví dụ: `{"quantity": "abc"}`.
- Kết quả mong muốn: Hệ thống trả về lỗi 400 Bad Request kèm chi tiết "quantity must be a number".
- Lưu ý quan trọng: Nếu bạn gửi `asdasd` mà không có ngoặc kép, hệ thống sẽ báo lỗi "is not valid JSON" thay vì lỗi validation, vì đây là lỗi cú pháp JSON.
  [Hình ảnh 16: Chụp lỗi 400 khi update dữ liệu sai kiểu]

9. CẬP NHẬT PROFILE VỚI TRƯỜNG KHÔNG CHO PHÉP (400 BAD REQUEST)

- Hành động: Tại API PATCH /users/me, gửi Body đúng chuẩn JSON nhưng chứa thêm trường bị cấm, ví dụ: `{"fullName": "Ten moi", "email": "hack@test.com"}`.
- Kết quả mong muốn: Hệ thống trả về lỗi 400 Bad Request (do cấu hình `forbidNonWhitelisted: true`).
  [Hình ảnh 17: Chụp lỗi 400 khi cố sửa các trường bị cấm]

---
