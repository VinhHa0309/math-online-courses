# 🗄️ Mathematiq — Database Schema Documentation

> **Database:** SQL Server | **File schema:** [`schema_and_seed.sql`](file:///d:/Vha.JS/math-online-courses/database/schema_and_seed.sql)

---

## 📊 Tổng quan các bảng

| # | Bảng | Mô tả | Tính năng UI liên quan |
|---|------|-------|------------------------|
| 1 | `users` | Tài khoản người dùng | Đăng nhập, Đăng ký, Google OAuth |
| 2 | `instructors` | Thông tin giảng viên | Trang chủ - Giảng viên nổi bật |
| 3 | `courses` | Khóa học | Danh sách khóa học, CourseCard |
| 4 | `lessons` | Bài học trong khóa học | Trang chi tiết khóa học |
| 5 | `enrollments` | Đăng ký học | Admin - Duyệt học viên |
| 6 | `payments` | Lịch sử thanh toán | PaymentPage, MoMo, VietQR |
| 7 | `documents` | Tài liệu học tập | Thư viện tài liệu |
| 8 | `practice_topics` | Chủ đề luyện tập | Đấu trường luyện tập |
| 9 | `questions` | Câu hỏi trắc nghiệm | PracticePlayerPage |
| 10 | `practice_results` | Kết quả luyện tập | Điểm số, XP |
| 11 | `leaderboard` | Bảng xếp hạng | Bảng xếp hạng XP |
| 12 | `news` | Tin tức / Bài viết | Trang tin tức |

---

## 🔗 Sơ đồ quan hệ (ERD)

```
users ────────────────────────────────────────────────────────────────┐
  │                                                                    │
  ├──< instructors (user_id)                                           │
  │       └──< courses (instructor_id)                                 │
  │               └──< lessons (course_id)                             │
  │                                                                    │
  ├──< enrollments (user_id) >── courses (course_id)                   │
  │                                                                    │
  ├──< payments (user_id) >──── courses (course_id)                    │
  │                                                                    │
  ├──< practice_results (user_id) >── practice_topics (topic_id)       │
  │                                       └──< questions (topic_id)    │
  │                                                                    │
  ├──< leaderboard (user_id)                                           │
  │                                                                    │
  ├──< documents (uploaded_by)                                         │
  │                                                                    │
  └──< news (author_id) ───────────────────────────────────────────────┘
```

---

## 📋 Chi tiết từng bảng

### 1. `users` — Tài khoản

| Cột | Kiểu | Ghi chú |
|-----|------|---------|
| `id` | BIGINT PK | Auto-increment |
| `full_name` | NVARCHAR(100) | Tên hiển thị |
| `email` | NVARCHAR(150) UNIQUE | Dùng để đăng nhập |
| `password` | NVARCHAR(255) | BCrypt hash |
| `role` | NVARCHAR(20) | `USER` / `ADMIN` / `INSTRUCTOR` |
| `avatar_url` | NVARCHAR(500) | URL ảnh Google hoặc upload |
| `created_at` | DATETIME2 | Tự động gán |

> Tích hợp trực tiếp với Spring Boot — `com.mathcourses.model.User.java`

---

### 2. `instructors` — Giảng viên

| Cột | Kiểu | Ghi chú |
|-----|------|---------|
| `user_id` | FK → users | Liên kết tài khoản |
| `full_name` | NVARCHAR(100) | |
| `title` | NVARCHAR(100) | VD: "Tiến sĩ Lý Thuyết Số" |
| `specialty` | NVARCHAR(100) | Chuyên môn |
| `description` | NVARCHAR(MAX) | |
| `avatar_url` | NVARCHAR(500) | |
| `course_count` | INT | Số khóa đang dạy |

---

### 3. `courses` — Khóa học

| Cột | Kiểu | Ghi chú |
|-----|------|---------|
| `instructor_id` | FK → instructors | |
| `title` | NVARCHAR(255) | |
| `category` | NVARCHAR(50) | `Đại số` / `Hình học` / `Giải tích` / `Xác suất` |
| `grade` | NVARCHAR(5) | `10` / `11` / `12` / NULL (đại học) |
| `price` | INT | Giá VND |
| `original_price` | INT | Giá gốc (trước giảm) |
| `tag` | NVARCHAR(30) | `Bán chạy` / `Mới` / `Hot` |
| `lesson_count` | INT | Số bài học |
| `duration_hours` | FLOAT | Tổng số giờ |
| `student_count` | INT | Số học viên đã đăng ký |
| `is_active` | BIT | Hiển thị / ẩn khóa học |

---

### 4. `enrollments` — Đăng ký học *(Admin: Duyệt học viên)*

| Cột | Kiểu | Ghi chú |
|-----|------|---------|
| `user_id` | FK → users | |
| `course_id` | FK → courses | |
| `status` | NVARCHAR(20) | `PENDING` → `APPROVED` / `REJECTED` |
| `enrolled_at` | DATETIME2 | Thời điểm đăng ký |
| `approved_at` | DATETIME2 | Thời điểm admin duyệt |

> [!IMPORTANT]
> Đây là nguồn dữ liệu thật cho widget **"Duyệt học viên"** trên Admin Dashboard. API cần: `GET /api/admin/enrollments?status=PENDING` và `PATCH /api/admin/enrollments/{id}/approve`.

---

### 5. `payments` — Thanh toán

| Cột | Kiểu | Ghi chú |
|-----|------|---------|
| `order_id` | NVARCHAR(50) UNIQUE | Hiển thị lên màn hình |
| `amount` | INT | Số tiền VND |
| `method` | NVARCHAR(30) | `MOMO` / `VIETQR` / `CARD` |
| `status` | NVARCHAR(20) | `PENDING` / `SUCCESS` / `FAILED` |
| `momo_trans_id` | NVARCHAR(100) | transId từ MoMo IPN callback |
| `paid_at` | DATETIME2 | Thời điểm thanh toán thành công |

---

### 6. `documents` — Thư viện tài liệu

| Cột | Kiểu | Ghi chú |
|-----|------|---------|
| `tag` | NVARCHAR(50) | `CHÍNH THỨC` / `MINH HỌA` / `ÔN TẬP` / `CHUYÊN ĐỀ` |
| `grade` | NVARCHAR(5) | `10` / `11` / `12` |
| `doc_type` | NVARCHAR(50) | Loại tài liệu |
| `file_type` | NVARCHAR(50) | `Trắc nghiệm` / `Tự luận` / `Lý thuyết` |
| `file_url` | NVARCHAR(500) | Đường dẫn tải PDF |
| `view_count` | INT | Lượt xem |
| `is_free` | BIT | Tài liệu miễn phí hay trả phí |

---

### 7. `questions` — Câu hỏi trắc nghiệm *(Đấu trường)*

| Cột | Kiểu | Ghi chú |
|-----|------|---------|
| `topic_id` | FK → practice_topics | |
| `grade` | NVARCHAR(5) | Lớp áp dụng |
| `question_text` | NVARCHAR(MAX) | Nội dung câu hỏi |
| `formula` | NVARCHAR(500) | Công thức toán (LaTeX / Unicode) |
| `option_a/b/c/d` | NVARCHAR(200) | 4 đáp án |
| `correct_option` | CHAR(1) | `A` / `B` / `C` / `D` |
| `difficulty` | NVARCHAR(20) | `easy` / `medium` / `hard` |

---

### 8. `leaderboard` — Bảng xếp hạng XP

| Cột | Kiểu | Ghi chú |
|-----|------|---------|
| `user_id` | FK UNIQUE → users | |
| `total_xp` | INT | Tổng XP tích lũy |
| `rank` | INT | Hạng (cập nhật định kỳ) |

---

## 🔑 Views có sẵn

| View | Mục đích |
|------|----------|
| `v_pending_enrollments` | Danh sách học viên đang chờ admin duyệt |
| `v_admin_stats` | Thống kê nhanh: tổng học viên, khóa học, doanh thu |
| `v_leaderboard` | Bảng xếp hạng kèm thông tin user |

---

## 🚀 Các API cần xây dựng tiếp theo

### Admin Dashboard
```
GET    /api/admin/enrollments?status=PENDING   → Danh sách chờ duyệt
PATCH  /api/admin/enrollments/{id}/approve     → Duyệt học viên
PATCH  /api/admin/enrollments/{id}/reject      → Từ chối học viên
POST   /api/admin/courses                      → Tạo khóa học mới
GET    /api/admin/stats                        → Thống kê dashboard
```

### Frontend hiện tại cần dữ liệu thật
```
GET  /api/courses           → CourseListPage.jsx     (thay courses.js)
GET  /api/documents         → DocumentPage.jsx        (thay documents.js)
GET  /api/news              → NewsPage.jsx            (thay news.js)
GET  /api/practice/topics   → PracticePage.jsx        (thay practiceTopics.js)
GET  /api/practice/questions/{topicId} → PracticePlayerPage.jsx
GET  /api/leaderboard       → PracticePage.jsx        (thay practiceLeaderboard.js)
```

### Auth (đã có)
```
POST /api/auth/register
POST /api/auth/login
POST /api/auth/google
```

---

## ⚡ Hướng dẫn chạy database

```sql
-- 1. Mở SQL Server Management Studio (SSMS)
-- 2. Kết nối: localhost:61596 | user: sa | pass: Vinhha1234@
-- 3. Chọn database: math_courses_db
-- 4. Mở và chạy file:
--    d:\Vha.JS\math-online-courses\database\schema_and_seed.sql
```

> [!WARNING]
> Script có lệnh `DROP TABLE` ở đầu. Nếu đang có dữ liệu thật, hãy **xóa phần DROP** trước khi chạy lần 2.

> [!TIP]
> Mật khẩu mẫu trong seed data là placeholder (`HASH_PLACEHOLDER_...`). Trong thực tế, tạo user qua API `POST /api/auth/register` để password được BCrypt tự động.
