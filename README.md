# NestJS Backend - Huong dan su dung

Day la tai lieu chi tiet cho du an Backend NestJS, bao gom cau truc, cach cai dat va cac tieu chuan ky thuat.

---

## Kien truc he thong

Du an tuan thu mo hinh MVC (Model-View-Controller):

- Model (Entities & DTOs): Dinh nghia du lieu va quy tac kiem tra.
- Controller: Tiep nhan Request va tra ve Response (RESTful).
- Service: Chua logic nghiep vu.
- Module: Dong goi cac thanh phan lien quan.

---

## Cong nghe su dung

- Framework: NestJS (Node.js)
- Database: PostgreSQL
- ORM: TypeORM (Ho tro Migrations)
- Security: Passport.js, JWT (2 luong rieng biet), Bcrypt
- Documentation: Swagger API
- Standards: ESLint & Prettier

---

## Huong dan cai dat

### 1. Chuan bi moi truong

Tao file .env va dien cac thong so:

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_NAME=backend_db

JWT_USER_SECRET=secret_for_user
JWT_USER_EXPIRES_IN=7d

JWT_ADMIN_SECRET=secret_for_admin
JWT_ADMIN_EXPIRES_IN=1d

### 2. Cai dat Dependencies

```bash
npm install
```

### 3. Khoi tao Database

Dự án sử dụng Migrations để quản lý cấu trúc bảng. Chạy lệnh sau để tạo bảng:

```bash
npm run migration:run
```

### 4. Chay ung dung

```bash
# Chế độ phát triển (watch mode)
npm run start:dev
```

---

## He thong xac thuc

He thong duoc thiet ke voi 2 phan quyen doc lap:

1.  User: Dung bang users. Token duoc ky bang JWT_USER_SECRET.
2.  Admin: Dung bang admins. Token duoc ky bang JWT_ADMIN_SECRET.

Luu y: Token cua User khong dung duoc cho Admin va nguoc lai.

### Cach tao tai khoan Admin:

Hay dung SQL de tao tai khoan:

```sql
INSERT INTO admins (id, email, password, name)
VALUES (
  uuid_generate_v4(),
  'admin@example.com',
  '$2b$10$wN1G6W6P67LdC0y79p/lqe6O6yvG7rF6vR6N6S6H6M6K6L6J6I6H6',
  'Super Admin'
);
```

---

## Danh muc API (Endpoints)

| Module | Phuong Thuc | Duong Dan         | Bao Mat   | Mo Ta                   |
| :----- | :---------- | :---------------- | :-------- | :---------------------- |
| Auth   | POST        | /auth/user/login  | Public    | Dang nhap User          |
|        | POST        | /auth/admin/login | Public    | Dang nhap Admin         |
| User   | GET         | /users/me         | User JWT  | Xem Profile             |
|        | PATCH       | /users/me         | User JWT  | Cap nhat Profile        |
| Gifts  | GET         | /gifts            | User JWT  | Danh sach qua tang      |
|        | GET         | /gifts/:id        | User JWT  | Chi tiet qua tang       |
| Admin  | GET         | /admin/gifts      | Admin JWT | Quan ly qua tang (Full) |
|        | POST        | /admin/gifts      | Admin JWT | Tao qua moi             |
|        | PATCH       | /admin/gifts/:id  | Admin JWT | Cap nhat qua            |
|        | DELETE      | /admin/gifts/:id  | Admin JWT | Xoa qua                 |

---

## Tieu chuan chat luong

1.  RESTful API: Dung dung HTTP Verbs va Status codes.
2.  Bao mat: Khong tra ve mat khau trong JSON.
3.  Tai lieu: Swagger tai http://localhost:3000/api/docs.
4.  Format: ESLint va Prettier.

---

## Lenh thao tac nhanh

- `npm run lint`: Kiem tra code.
- `npm run build`: Bien dich du an.
- `npm run migration:generate -- name`: Tao migration moi.
- `npm run migration:revert`: Hoan tac migration.
