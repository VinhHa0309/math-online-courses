-- ============================================================
--  MATHEMATIQ ONLINE COURSES - SQL SERVER DATABASE SCRIPT
--  Database: math_courses_db (SQL Server)
--  Phiên bản: 1.0 | Tác giả: Mathematiq Dev Team
-- ============================================================
-- Cách chạy: Mở SQL Server Management Studio (SSMS), kết nối
--            vào instance, chọn database math_courses_db rồi
--            chạy toàn bộ script này.
-- ============================================================

USE math_courses_db;
GO

-- ============================================================
-- 0.  DROP TẤT CẢ BẢNG (nếu cần chạy lại từ đầu)
-- ============================================================
IF OBJECT_ID('dbo.payments',          'U') IS NOT NULL DROP TABLE dbo.payments;
IF OBJECT_ID('dbo.enrollments',       'U') IS NOT NULL DROP TABLE dbo.enrollments;
IF OBJECT_ID('dbo.practice_results',  'U') IS NOT NULL DROP TABLE dbo.practice_results;
IF OBJECT_ID('dbo.questions',         'U') IS NOT NULL DROP TABLE dbo.questions;
IF OBJECT_ID('dbo.practice_topics',   'U') IS NOT NULL DROP TABLE dbo.practice_topics;
IF OBJECT_ID('dbo.leaderboard',       'U') IS NOT NULL DROP TABLE dbo.leaderboard;
IF OBJECT_ID('dbo.lessons',           'U') IS NOT NULL DROP TABLE dbo.lessons;
IF OBJECT_ID('dbo.courses',           'U') IS NOT NULL DROP TABLE dbo.courses;
IF OBJECT_ID('dbo.documents',         'U') IS NOT NULL DROP TABLE dbo.documents;
IF OBJECT_ID('dbo.news',              'U') IS NOT NULL DROP TABLE dbo.news;
IF OBJECT_ID('dbo.instructors',       'U') IS NOT NULL DROP TABLE dbo.instructors;
IF OBJECT_ID('dbo.users',             'U') IS NOT NULL DROP TABLE dbo.users;
GO

-- ============================================================
-- 1.  BẢNG USERS - Tài khoản người dùng
--     Tương ứng: com.mathcourses.model.User.java
-- ============================================================
CREATE TABLE dbo.users (
    id          BIGINT IDENTITY(1,1) PRIMARY KEY,
    full_name   NVARCHAR(100)  NOT NULL,
    email       NVARCHAR(150)  NOT NULL UNIQUE,
    password    NVARCHAR(255)  NOT NULL,
    role        NVARCHAR(20)   NOT NULL DEFAULT 'USER',  -- 'USER' | 'ADMIN' | 'INSTRUCTOR'
    avatar_url  NVARCHAR(500)  NULL,
    created_at  DATETIME2      NOT NULL DEFAULT GETDATE()
);
GO

-- ============================================================
-- 2.  BẢNG INSTRUCTORS - Giảng viên
-- ============================================================
CREATE TABLE dbo.instructors (
    id          BIGINT IDENTITY(1,1) PRIMARY KEY,
    user_id     BIGINT         NULL REFERENCES dbo.users(id) ON DELETE SET NULL,
    full_name   NVARCHAR(100)  NOT NULL,
    title       NVARCHAR(100)  NULL,      -- Ví dụ: "Tiến sĩ Lý Thuyết Số"
    specialty   NVARCHAR(100)  NULL,
    description NVARCHAR(MAX)  NULL,
    avatar_url  NVARCHAR(500)  NULL,
    course_count INT           NOT NULL DEFAULT 0,
    created_at  DATETIME2      NOT NULL DEFAULT GETDATE()
);
GO

-- ============================================================
-- 3.  BẢNG COURSES - Khóa học
-- ============================================================
CREATE TABLE dbo.courses (
    id              BIGINT IDENTITY(1,1) PRIMARY KEY,
    instructor_id   BIGINT         NULL REFERENCES dbo.instructors(id) ON DELETE SET NULL,
    title           NVARCHAR(255)  NOT NULL,
    description     NVARCHAR(MAX)  NULL,
    category        NVARCHAR(50)   NULL,   -- 'Đại số' | 'Hình học' | 'Giải tích' | 'Xác suất'
    grade           NVARCHAR(5)    NULL,   -- '10' | '11' | '12'
    price           INT            NOT NULL DEFAULT 0,  -- VND
    original_price  INT            NULL,                -- Giá gốc trước khi giảm
    tag             NVARCHAR(30)   NULL,   -- 'Bán chạy' | 'Mới' | 'Hot' | NULL
    image_url       NVARCHAR(500)  NULL,
    lesson_count    INT            NOT NULL DEFAULT 0,
    duration_hours  FLOAT          NOT NULL DEFAULT 0,  -- Tổng số giờ học
    student_count   INT            NOT NULL DEFAULT 0,
    is_active       BIT            NOT NULL DEFAULT 1,
    created_at      DATETIME2      NOT NULL DEFAULT GETDATE()
);
GO

-- ============================================================
-- 4.  BẢNG LESSONS - Bài học trong khóa học
-- ============================================================
CREATE TABLE dbo.lessons (
    id          BIGINT IDENTITY(1,1) PRIMARY KEY,
    course_id   BIGINT         NOT NULL REFERENCES dbo.courses(id) ON DELETE CASCADE,
    title       NVARCHAR(255)  NOT NULL,
    order_num   INT            NOT NULL DEFAULT 1,
    duration_min INT           NULL,       -- Thời lượng tính bằng phút
    video_url   NVARCHAR(500)  NULL,
    is_free     BIT            NOT NULL DEFAULT 0,
    created_at  DATETIME2      NOT NULL DEFAULT GETDATE()
);
GO

-- ============================================================
-- 5.  BẢNG ENROLLMENTS - Đăng ký khóa học
--     Liên kết Users <-> Courses; dùng cho tính năng "duyệt học viên"
-- ============================================================
CREATE TABLE dbo.enrollments (
    id              BIGINT IDENTITY(1,1) PRIMARY KEY,
    user_id         BIGINT         NOT NULL REFERENCES dbo.users(id)   ON DELETE CASCADE,
    course_id       BIGINT         NOT NULL REFERENCES dbo.courses(id)  ON DELETE CASCADE,
    status          NVARCHAR(20)   NOT NULL DEFAULT 'PENDING',
    -- 'PENDING'  - Chờ admin duyệt (Student Approval widget)
    -- 'APPROVED' - Đã duyệt
    -- 'REJECTED' - Từ chối
    -- 'COMPLETED'- Hoàn thành khóa học
    enrolled_at     DATETIME2      NOT NULL DEFAULT GETDATE(),
    approved_at     DATETIME2      NULL,
    UNIQUE (user_id, course_id)
);
GO

-- ============================================================
-- 6.  BẢNG PAYMENTS - Lịch sử thanh toán
--     Kết hợp với MoMo và VietQR trong PaymentPage.jsx
-- ============================================================
CREATE TABLE dbo.payments (
    id              BIGINT IDENTITY(1,1) PRIMARY KEY,
    user_id         BIGINT         NOT NULL REFERENCES dbo.users(id),
    course_id       BIGINT         NULL     REFERENCES dbo.courses(id),
    order_id        NVARCHAR(50)   NOT NULL UNIQUE,   -- Mã đơn hàng hiển thị lên màn hình
    amount          INT            NOT NULL,           -- Số tiền VND
    method          NVARCHAR(30)   NOT NULL,           -- 'MOMO' | 'VIETQR' | 'CARD'
    status          NVARCHAR(20)   NOT NULL DEFAULT 'PENDING',
    -- 'PENDING' | 'SUCCESS' | 'FAILED' | 'REFUNDED'
    momo_trans_id   NVARCHAR(100)  NULL,               -- transId từ MoMo IPN callback
    paid_at         DATETIME2      NULL,
    created_at      DATETIME2      NOT NULL DEFAULT GETDATE()
);
GO

-- ============================================================
-- 7.  BẢNG DOCUMENTS - Tài liệu học tập (Thư viện)
--     Dữ liệu từ: frontend/src/data/documents.js
-- ============================================================
CREATE TABLE dbo.documents (
    id              BIGINT IDENTITY(1,1) PRIMARY KEY,
    title           NVARCHAR(500)  NOT NULL,
    tag             NVARCHAR(50)   NULL,   -- 'CHÍNH THỨC' | 'MINH HỌA' | 'ÔN TẬP' | 'CHUYÊN ĐỀ' | 'CƠ BẢN' | 'HỌC SINH GIỎI'
    year            NVARCHAR(10)   NULL,   -- Năm (VD: '2024')
    academic_year   NVARCHAR(20)   NULL,   -- Năm học (VD: '2023-2024')
    grade           NVARCHAR(5)    NULL,   -- '10' | '11' | '12'
    doc_type        NVARCHAR(50)   NULL,   -- 'Đề thi chính thức' | 'Đề minh họa' | 'Tài liệu ôn tập' | 'Chuyên đề NC'
    file_type       NVARCHAR(50)   NULL,   -- 'Trắc nghiệm' | 'Tự luận' | 'Lý thuyết' | 'Tổng hợp'
    file_url        NVARCHAR(500)  NULL,   -- Đường dẫn tải file PDF
    file_size_mb    NVARCHAR(20)   NULL,   -- '2.4 MB'
    view_count      INT            NOT NULL DEFAULT 0,
    download_count  INT            NOT NULL DEFAULT 0,
    is_free         BIT            NOT NULL DEFAULT 1,
    uploaded_by     BIGINT         NULL REFERENCES dbo.users(id),
    created_at      DATETIME2      NOT NULL DEFAULT GETDATE()
);
GO

-- ============================================================
-- 8.  BẢNG PRACTICE_TOPICS - Chủ đề luyện tập (Đấu trường)
--     Dữ liệu từ: frontend/src/data/practiceTopics.js
-- ============================================================
CREATE TABLE dbo.practice_topics (
    id          BIGINT IDENTITY(1,1) PRIMARY KEY,
    name        NVARCHAR(100)  NOT NULL,
    name_vi     NVARCHAR(100)  NULL,     -- Tên tiếng Việt
    description NVARCHAR(500)  NULL,
    icon        NVARCHAR(10)   NULL,     -- Emoji icon
    is_active   BIT            NOT NULL DEFAULT 1,
    created_at  DATETIME2      NOT NULL DEFAULT GETDATE()
);
GO

-- ============================================================
-- 9.  BẢNG QUESTIONS - Câu hỏi trắc nghiệm
--     Dữ liệu từ: frontend/src/data/practiceQuestions.js
-- ============================================================
CREATE TABLE dbo.questions (
    id              BIGINT IDENTITY(1,1) PRIMARY KEY,
    topic_id        BIGINT         NULL REFERENCES dbo.practice_topics(id),
    grade           NVARCHAR(5)    NULL,   -- '10' | '11' | '12'
    question_text   NVARCHAR(MAX)  NOT NULL,
    sub_text        NVARCHAR(500)  NULL,   -- Gợi ý / chú thích
    formula         NVARCHAR(500)  NULL,   -- Công thức toán (LaTeX)
    option_a        NVARCHAR(200)  NOT NULL,
    option_b        NVARCHAR(200)  NOT NULL,
    option_c        NVARCHAR(200)  NOT NULL,
    option_d        NVARCHAR(200)  NOT NULL,
    correct_option  CHAR(1)        NOT NULL CHECK (correct_option IN ('A','B','C','D')),
    difficulty      NVARCHAR(20)   NULL DEFAULT 'medium',  -- 'easy' | 'medium' | 'hard'
    created_at      DATETIME2      NOT NULL DEFAULT GETDATE()
);
GO

-- ============================================================
-- 10. BẢNG PRACTICE_RESULTS - Kết quả luyện tập của học viên
-- ============================================================
CREATE TABLE dbo.practice_results (
    id              BIGINT IDENTITY(1,1) PRIMARY KEY,
    user_id         BIGINT         NOT NULL REFERENCES dbo.users(id)   ON DELETE CASCADE,
    topic_id        BIGINT         NULL     REFERENCES dbo.practice_topics(id),
    score           INT            NOT NULL DEFAULT 0,   -- Số câu đúng
    total_questions INT            NOT NULL DEFAULT 0,
    xp_earned       INT            NOT NULL DEFAULT 0,
    combo_count     INT            NOT NULL DEFAULT 0,   -- Streak liên tiếp đúng
    played_at       DATETIME2      NOT NULL DEFAULT GETDATE()
);
GO

-- ============================================================
-- 11. BẢNG LEADERBOARD - Bảng xếp hạng tổng hợp XP
--     Cập nhật qua trigger hoặc job định kỳ
-- ============================================================
CREATE TABLE dbo.leaderboard (
    id              BIGINT IDENTITY(1,1) PRIMARY KEY,
    user_id         BIGINT         NOT NULL UNIQUE REFERENCES dbo.users(id) ON DELETE CASCADE,
    total_xp        INT            NOT NULL DEFAULT 0,
    rank            INT            NULL,    -- Cập nhật bằng job định kỳ
    updated_at      DATETIME2      NOT NULL DEFAULT GETDATE()
);
GO

-- ============================================================
-- 12. BẢNG NEWS - Tin tức / Bài viết
--     Dữ liệu từ: frontend/src/data/news.js
-- ============================================================
CREATE TABLE dbo.news (
    id          BIGINT IDENTITY(1,1) PRIMARY KEY,
    title       NVARCHAR(500)  NOT NULL,
    excerpt     NVARCHAR(MAX)  NULL,
    content     NVARCHAR(MAX)  NULL,   -- Nội dung bài đầy đủ (HTML/Markdown)
    category    NVARCHAR(50)   NULL,   -- 'Thi cử' | 'Kiến thức' | 'Toán học' | 'Video'
    image_url   NVARCHAR(500)  NULL,
    tags        NVARCHAR(500)  NULL,   -- JSON string: '["Toán học","THPT 2026"]'
    is_featured BIT            NOT NULL DEFAULT 0,
    is_video    BIT            NOT NULL DEFAULT 0,
    view_count  INT            NOT NULL DEFAULT 0,
    read_time   NVARCHAR(20)   NULL,   -- '8 phút'
    author_id   BIGINT         NULL REFERENCES dbo.users(id),
    published_at DATETIME2     NULL,
    created_at  DATETIME2      NOT NULL DEFAULT GETDATE()
);
GO


-- ============================================================
--  PHẦN 2: INSERT DỮ LIỆU MẪU (SEED DATA)
-- ============================================================

-- ============================================================
-- SEED: USERS
-- Mật khẩu mặc định đều là "Mathematiq@2024" (đã BCrypt)
-- Trong thực tế tạo user qua API POST /api/auth/register
-- ============================================================
INSERT INTO dbo.users (full_name, email, password, role, avatar_url) VALUES
(N'Admin Mathematiq',     'admin@mathematiq.vn',   '$2a$10$HASH_PLACEHOLDER_ADMIN', 'ADMIN',      'https://i.pravatar.cc/150?u=admin'),
(N'Hoàng Nguyên',         'hoang@gmail.com',        '$2a$10$HASH_PLACEHOLDER_U1',    'USER',       'https://i.pravatar.cc/150?u=1'),
(N'Minh Anh',             'minhanh@gmail.com',      '$2a$10$HASH_PLACEHOLDER_U2',    'USER',       'https://i.pravatar.cc/150?u=2'),
(N'Quốc Huy',             'quochuy@gmail.com',      '$2a$10$HASH_PLACEHOLDER_U3',    'USER',       'https://i.pravatar.cc/150?u=3'),
(N'TS. Sarah Chen',       'sarah.chen@mathematiq.vn','$2a$10$HASH_PLACEHOLDER_I1',   'INSTRUCTOR', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop'),
(N'GS. Marcus Vane',      'marcus.vane@mathematiq.vn','$2a$10$HASH_PLACEHOLDER_I2',  'INSTRUCTOR', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop'),
(N'Elena Rodriguez',      'elena@mathematiq.vn',    '$2a$10$HASH_PLACEHOLDER_I3',    'INSTRUCTOR', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop'),
(N'TS. James Wilson',     'james@mathematiq.vn',    '$2a$10$HASH_PLACEHOLDER_I4',    'INSTRUCTOR', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop'),
(N'John Doe',             'johndoe@gmail.com',      '$2a$10$HASH_PLACEHOLDER_U4',    'USER',       NULL),
(N'Alice Smith',          'alice@gmail.com',        '$2a$10$HASH_PLACEHOLDER_U5',    'USER',       NULL);
GO

-- ============================================================
-- SEED: INSTRUCTORS
-- ============================================================
INSERT INTO dbo.instructors (user_id, full_name, title, specialty, description, avatar_url, course_count) VALUES
(5, N'TS. Sarah Chen',   N'Tiến sĩ Lý Thuyết Số',     N'Lý thuyết số',      N'Cựu giáo sư MIT, chuyên sâu về toán học mật mã học và bảo mật số.',                              'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop', 12),
(6, N'GS. Marcus Vane',  N'Hình Học Ứng Dụng',         N'Hình học',          N'Chuyên gia trực quan hoá cấu trúc tô pô và hình học không gian.',                                  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop', 9),
(7, N'Elena Rodriguez',  N'Nhà Khoa Học Dữ Liệu',      N'Khoa học dữ liệu',  N'Kết nối toán học thuần tuý với học máy và trí tuệ nhân tạo hiện đại.',                            'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop', 15),
(8, N'TS. James Wilson', N'Logic & Lý Thuyết Tập Hợp', N'Logic học',         N'Tiên phong trong phát triển lộ trình học logic hình thức thích ứng.',                              'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop', 11);
GO

-- ============================================================
-- SEED: COURSES
-- Từ frontend/src/data/courses.js + CourseController.java
-- ============================================================
INSERT INTO dbo.courses (instructor_id, title, description, category, grade, price, original_price, tag, image_url, lesson_count, duration_hours, student_count) VALUES
(1, N'Chuyên đề Hàm số bậc nhất và bậc hai nâng cao',      N'Nắm vững lý thuyết và bài tập chuyên sâu về hàm số bậc nhất, bậc hai. Phù hợp học sinh ôn thi THPT.',    N'Đại số',   N'12', 850000,  1200000, N'Bán chạy', 'https://placehold.co/600x400/1e293b/white?text=Algebra+Lvl+10',  24, 12.5, 450),
(2, N'Hình học trực quan: Vector và ứng dụng thực tế',      N'Khóa học trực quan về vector và ứng dụng trong hình học giải tích không gian. Có bài tập thực hành.',     N'Hình học', N'12', 720000,  1000000, NULL,        'https://placehold.co/600x400/0f172a/white?text=Vector+Geometry',  18, 9.0,  320),
(3, N'Thống kê và Xác suất: Nền tảng cho tương lai',        N'Từ lý thuyết xác suất đến ứng dụng thống kê trong đời sống và nghiên cứu khoa học dữ liệu.',             N'Xác suất', N'12', 490000,  700000,  N'Mới',     'https://placehold.co/600x400/334155/white?text=Probability',       12, 6.0,  180),
(1, N'Bất đẳng thức và Bất phương trình một ẩn',            N'Hệ thống kiến thức bất đẳng thức từ cơ bản đến vận dụng cao, kèm phương pháp giải nhanh.',              N'Đại số',   N'12', 920000,  1300000, NULL,        'https://placehold.co/600x400/1e293b/white?text=Inequalities',     20, 10.0, 510),
(2, N'Lượng giác căn bản và các công thức biến đổi',        N'Tổng hợp toàn bộ kiến thức lượng giác THPT: công thức, phương trình, bài tập phong phú.',              N'Đại số',   N'11', 550000,  800000,  N'Hot',     'https://placehold.co/600x400/0f172a/white?text=Trigonometry',     16, 8.0,  390),
(2, N'Hệ thức lượng trong tam giác và ứng dụng',            N'Khám phá các định lý cos, sin, hệ thức lượng trong tam giác với nhiều bài toán thực tế sinh động.',      N'Hình học', N'10', 680000,  950000,  NULL,        'https://placehold.co/600x400/334155/white?text=Triangle+Geometry',14, 7.0,  270),
(1, N'Toán Cao Cấp 1 - Giải Tích',                          N'Giải tích một biến cho sinh viên đại học năm nhất: giới hạn, đạo hàm, tích phân.',                      N'Giải tích',NULL,  299000,  500000,  NULL,        'https://placehold.co/600x400/1e3a5f/white?text=Calculus+I',       30, 20.0, 120),
(4, N'Toán Rời Rạc',                                        N'Lý thuyết đồ thị, tổ hợp, logic, quan hệ - nền tảng cho lập trình và khoa học máy tính.',               N'Đại số',   NULL,  399000,  600000,  NULL,        'https://placehold.co/600x400/1e3a5f/white?text=Discrete+Math',    25, 15.0, 85),
(2, N'Đại Số Tuyến Tính',                                   N'Ma trận, định thức, không gian vectơ, ánh xạ tuyến tính - kiến thức thiết yếu cho kỹ sư và nhà khoa học.',N'Đại số',  NULL,  349000,  550000,  NULL,        'https://placehold.co/600x400/1e3a5f/white?text=Linear+Algebra',   28, 18.0, 95),
(3, N'Giải Tích Chuyên Sâu - Đội tuyển',                    N'Toán học nâng cao cho đội tuyển học sinh giỏi: giải tích nhiều biến, bài toán cực trị nâng cao.',        N'Giải tích',N'12', 1200000, 1800000, N'Bán chạy','https://placehold.co/600x400/0c1445/white?text=Advanced+Calculus',  36, 22.0, 320);
GO

-- ============================================================
-- SEED: LESSONS (mẫu cho khóa học ID = 1)
-- ============================================================
INSERT INTO dbo.lessons (course_id, title, order_num, duration_min, is_free) VALUES
(1, N'Bài 1: Ôn tập khái niệm hàm số và đồ thị',          1,  45, 1),
(1, N'Bài 2: Hàm số bậc nhất - Tính chất và đồ thị',       2,  50, 1),
(1, N'Bài 3: Hàm số bậc hai - Đỉnh parabol và trục đối xứng', 3, 60, 0),
(1, N'Bài 4: Phương trình bậc hai và biệt thức Delta',      4,  55, 0),
(1, N'Bài 5: Hệ phương trình bậc nhất hai ẩn',             5,  65, 0),
(1, N'Bài 6: Bất phương trình bậc hai - Phương pháp số học',6,  70, 0),
(1, N'Bài 7: Ứng dụng thực tế - Bài toán kinh tế và tối ưu',7, 80, 0),
(1, N'Bài 8: Đề thi thử - Ôn tập tổng hợp chủ đề 1',      8, 120, 0);
GO

-- ============================================================
-- SEED: ENROLLMENTS - Đăng ký học / Chờ duyệt
-- ============================================================
INSERT INTO dbo.enrollments (user_id, course_id, status) VALUES
(9,  1, 'PENDING'),   -- John Doe chờ duyệt vào Khóa 1
(10, 3, 'PENDING'),   -- Alice Smith chờ duyệt vào Khóa 3
(2,  1, 'APPROVED'),  -- Hoàng Nguyên đã học Khóa 1
(2,  5, 'APPROVED'),  -- Hoàng Nguyên đã học Khóa 5
(3,  2, 'APPROVED'),  -- Minh Anh đã học Khóa 2
(4,  4, 'APPROVED'),  -- Quốc Huy đã học Khóa 4
(4,  6, 'APPROVED'),  -- Quốc Huy đã học Khóa 6
(9,  7, 'APPROVED'),  -- John Doe đã học Khóa 7
(10, 8, 'COMPLETED'); -- Alice đã hoàn thành Khóa 8
GO

-- ============================================================
-- SEED: DOCUMENTS - Thư viện tài liệu
-- ============================================================
INSERT INTO dbo.documents (title, tag, year, academic_year, grade, doc_type, file_type, file_size_mb, view_count, is_free, uploaded_by) VALUES
(N'Đề thi THPT Quốc gia môn Toán năm học 2022-2023',                               N'CHÍNH THỨC',    '2023', '2022-2023', '12', N'Đề thi chính thức', N'Trắc nghiệm',              '2.4 MB', 12400, 1, 1),
(N'Đề tham khảo kỳ thi tốt nghiệp THPT năm 2024 môn Toán',                        N'MINH HỌA',      '2024', '2023-2024', '12', N'Đề minh họa',       N'Trắc nghiệm',              '1.8 MB', 45200, 1, 1),
(N'Tổng hợp công thức Hình học Giải tích trong không gian Oxyz',                   N'ÔN TẬP',        '2024', '2023-2024', '12', N'Tài liệu ôn tập',   N'Lý thuyết',                '5.6 MB',  8900, 1, 5),
(N'50 bài toán vận dụng cao Nguyên hàm - Tích phân (Có giải chi tiết)',            N'CHUYÊN ĐỀ',     '2023', '2022-2023', '12', N'Chuyên đề NC',      N'Vận dụng cao',             '12.4 MB',15100, 0, 5),
(N'Đề thi chọn học sinh giỏi quốc gia môn Toán năm 2023',                         N'HỌC SINH GIỎI', '2023', '2022-2023', '12', N'Đề thi chính thức', N'Tự luận',                  '3.2 MB',  5400, 1, 1),
(N'Bộ đề ôn tập học kỳ 2 Toán lớp 12 (10 đề thi có đáp án)',                      N'CƠ BẢN',        '2024', '2023-2024', '12', N'Tài liệu ôn tập',   N'Tổng hợp',                 '8.1 MB', 22700, 1, 5),
(N'Đề thi học kỳ 1 Toán lớp 11 năm học 2023-2024 trường THPT Chuyên Hà Nội - Amsterdam', N'CHÍNH THỨC','2023','2023-2024','11', N'Đề thi chính thức', N'Trắc nghiệm + Tự luận',  '1.5 MB',  9200, 1, 1),
(N'Đề cương ôn tập Toán lớp 11 Học kỳ 2 - Trọng tâm kiến thức Lượng giác và Xác suất', N'ÔN TẬP', '2024', '2023-2024', '11', N'Tài liệu ôn tập',   N'Lý thuyết & Bài tập',      '4.2 MB', 14800, 1, 6),
(N'Chuyên đề nâng cao Hình học không gian 11: Quan hệ song song và vuông góc',    N'CHUYÊN ĐỀ',     '2022', '2022-2023', '11', N'Chuyên đề NC',      N'Vận dụng cao',             '8.5 MB',  6100, 0, 6),
(N'Đề thi khảo sát chất lượng đầu năm Toán 10 năm học 2023-2024',                 N'CHÍNH THỨC',    '2023', '2023-2024', '10', N'Đề thi chính thức', N'Trắc nghiệm',              '1.2 MB',  5100, 1, 1),
(N'Chuyên đề Vector và hệ tọa độ Oxy - Lý thuyết và bài tập tự luyện lớp 10',    N'CHUYÊN ĐỀ',     '2022', '2022-2023', '10', N'Chuyên đề NC',      N'Bài tập chuyên đề',        '6.7 MB', 11200, 0, 6),
(N'Tóm tắt công thức Toán lớp 10 Học kỳ 2 - Đại số & Hình học',                  N'CƠ BẢN',        '2024', '2023-2024', '10', N'Tài liệu ôn tập',   N'Tóm tắt công thức',        '2.8 MB', 19300, 1, 5);
GO

-- ============================================================
-- SEED: PRACTICE_TOPICS - Các chủ đề luyện tập
-- ============================================================
INSERT INTO dbo.practice_topics (name, name_vi, description, icon) VALUES
(N'Algebra',     N'Đại số',    N'Linear equations, polynomials, and complex functions.',   N'🔢'),
(N'Geometry',    N'Hình học',  N'Euclidean geometry, trigonometry, and spatial logic.',    N'📐'),
(N'Calculus',    N'Giải tích', N'Derivatives, integrals, and differential equations.',     N'📈'),
(N'Statistics',  N'Xác suất', N'Probability distributions and data analysis.',            N'📊');
GO

-- ============================================================
-- SEED: QUESTIONS - Câu hỏi luyện tập
-- ============================================================
INSERT INTO dbo.questions (topic_id, grade, question_text, sub_text, formula, option_a, option_b, option_c, option_d, correct_option, difficulty) VALUES
-- Giải tích (topic_id=3)
(3, '12', N'Tính tích phân sau:',               N'Áp dụng phương pháp đổi biến hoặc từng phần.', N'∫₀¹ x² dx',        N'1/2', N'1/3', N'1/4', N'1',   'B', 'easy'),
(3, '12', N'Tính tích phân sau:',               N'Dùng công thức tích phân từng phần.',           N'∫₀¹ x·eˣ dx',      N'1',   N'e-1', N'e',   N'e+1', 'B', 'medium'),
(3, '12', N'Đạo hàm của hàm số sau là:',        N'Sử dụng quy tắc đạo hàm của hàm hợp.',         N'y = sin(x²)',       N'2x·cos(x²)', N'cos(x²)', N'2cos(x²)', N'-2x·cos(x²)', 'A', 'medium'),
(3, '12', N'Tính giới hạn:',                    N'Nhân liên hợp hoặc khai triển Taylor.',         N'lim(x→0) sin(x)/x',N'0',  N'1',   N'∞',   N'1/2', 'B', 'easy'),
-- Đại số (topic_id=1)
(1, '12', N'Phương trình bậc hai có hai nghiệm phân biệt khi nào?', N'Xét biệt thức Δ.', N'ax² + bx + c = 0', N'Δ > 0', N'Δ = 0', N'Δ < 0', N'a ≠ 0', 'A', 'easy'),
(1, '11', N'Giá trị của sin(30°) là:',          NULL, NULL,   N'√3/2', N'1/2',  N'√2/2', N'1',   'B', 'easy'),
(1, '11', N'Rút gọn biểu thức:',                N'Sử dụng công thức hằng đẳng thức đáng nhớ.',   N'(a+b)² - (a-b)²', N'4ab', N'2ab', N'a²-b²', N'0', 'A', 'medium'),
-- Hình học (topic_id=2)
(2, '12', N'Trong không gian Oxyz, vectơ pháp tuyến của mặt phẳng 2x - y + 3z = 5 là:', NULL, NULL, N'(2,-1,3)', N'(2,1,3)', N'(-2,1,-3)', N'(1,-2,3)', 'A', 'medium'),
(2, '10', N'Hai đường thẳng song song khi và chỉ khi:',  NULL, NULL, N'Không có điểm chung', N'Có đúng 1 điểm chung', N'Trùng nhau', N'Cắt nhau', 'A', 'easy'),
-- Xác suất (topic_id=4)
(4, '12', N'Xác suất tung đồng xu 3 lần được đúng 2 mặt ngửa là:', NULL, N'P(X=2)',  N'1/8', N'3/8', N'1/4', N'1/2', 'B', 'medium'),
(4, '11', N'Có bao nhiêu cách chọn 3 học sinh từ lớp 10 người?',   NULL, N'C(10,3)', N'30',  N'120', N'720', N'10',  'B', 'easy');
GO

-- ============================================================
-- SEED: LEADERBOARD
-- ============================================================
INSERT INTO dbo.leaderboard (user_id, total_xp, rank) VALUES
(2,  12450, 1),   -- Hoàng Nguyên
(3,  10890, 2),   -- Minh Anh
(4,   9420, 3),   -- Quốc Huy
(9,   7850, 4),   -- John Doe
(10,  6320, 5);   -- Alice Smith
GO

-- ============================================================
-- SEED: NEWS - Tin tức bài viết
-- ============================================================
INSERT INTO dbo.news (title, excerpt, category, image_url, tags, is_featured, is_video, view_count, read_time, published_at) VALUES
(N'Gợi ý đáp án đề thi môn Toán tốt nghiệp THPT 2026 chi tiết nhất',
 N'Phân tích chuyên sâu về cấu trúc đề thi năm nay, những cạm bẫy cần tránh và hướng dẫn giải các bài toán vận dụng...',
 N'Thi cử', 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200&q=80',
 '["Toán học","THPT 2026","Đáp án"]', 1, 0, 48200, N'8 phút', '2026-07-09'),

(N'Xem video hướng dẫn cách xử lý thông báo hệ thống',
 N'Hướng dẫn chi tiết từng bước để xử lý các tình huống gặp khó khăn khi sử dụng nền tảng Mathematiq.',
 N'Video', 'https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?w=600&q=80',
 '["Video","Hướng dẫn"]', 0, 1, 12100, N'5 phút', '2026-06-24'),

(N'Gợi ý trả lời đề thi môn Vật Lý tốt nghiệp THPT 2026',
 N'Phân tích các câu hỏi Điện xoay chiều và Dao động con lắc trong đề minh họa 2026.',
 N'Thi cử', 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=600&q=80',
 '["Vật Lý","THPT 2026"]', 0, 0, 9400, N'6 phút', '2026-06-26'),

(N'Chiến lược ôn thi Toán THPT 2026 hiệu quả trong 30 ngày',
 N'Lộ trình chi tiết từng tuần, từng ngày giúp bạn nắm chắc kiến thức trọng tâm.',
 N'Kiến thức', 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&q=80',
 '["Chiến lược","Ôn tập"]', 0, 0, 23400, N'12 phút', '2026-07-01'),

(N'Top 10 dạng bài tích phân hay gặp trong đề thi Toán',
 N'Tổng hợp và phân tích 10 dạng bài tích phân thường xuất hiện nhất trong 5 năm gần đây.',
 N'Kiến thức', 'https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?w=600&q=80',
 '["Giải tích","Tích phân"]', 0, 0, 18700, N'9 phút', '2026-06-28');
GO

-- ============================================================
-- SEED: PAYMENTS - Lịch sử giao dịch mẫu
-- ============================================================
INSERT INTO dbo.payments (user_id, course_id, order_id, amount, method, status, paid_at) VALUES
(2,  1, 'ORD-241001-001', 850000, 'MOMO',    'SUCCESS', '2024-10-01 09:14:00'),
(2,  5, 'ORD-241015-002', 550000, 'VIETQR',  'SUCCESS', '2024-10-15 14:32:00'),
(3,  2, 'ORD-241102-003', 720000, 'MOMO',    'SUCCESS', '2024-11-02 16:48:00'),
(4,  4, 'ORD-250110-004', 920000, 'CARD',    'SUCCESS', '2025-01-10 11:20:00'),
(4,  6, 'ORD-250210-005', 680000, 'VIETQR',  'SUCCESS', '2025-02-10 08:55:00'),
(9,  7, 'ORD-250301-006', 299000, 'MOMO',    'SUCCESS', '2025-03-01 20:10:00'),
(10, 8, 'ORD-250305-007', 399000, 'VIETQR',  'SUCCESS', '2025-03-05 10:05:00'),
(9,  1, 'ORD-250320-008', 850000, 'MOMO',    'PENDING', NULL);  -- Chờ xử lý
GO


-- ============================================================
--  PHẦN 3: VIEWS HỮU ÍCH CHO API ADMIN DASHBOARD
-- ============================================================

-- View: Danh sách học viên đang chờ duyệt
CREATE OR ALTER VIEW dbo.v_pending_enrollments AS
SELECT
    e.id            AS enrollment_id,
    u.id            AS user_id,
    u.full_name,
    u.email,
    u.avatar_url,
    c.id            AS course_id,
    c.title         AS course_title,
    e.enrolled_at
FROM dbo.enrollments e
JOIN dbo.users  u ON e.user_id  = u.id
JOIN dbo.courses c ON e.course_id = c.id
WHERE e.status = 'PENDING';
GO

-- View: Thống kê Dashboard Admin
CREATE OR ALTER VIEW dbo.v_admin_stats AS
SELECT
    (SELECT COUNT(*) FROM dbo.users WHERE role = 'USER')                        AS total_students,
    (SELECT COUNT(*) FROM dbo.courses WHERE is_active = 1)                      AS total_courses,
    (SELECT COUNT(*) FROM dbo.enrollments WHERE status = 'PENDING')             AS pending_approvals,
    (SELECT ISNULL(SUM(amount),0) FROM dbo.payments WHERE status = 'SUCCESS')   AS total_revenue,
    (SELECT COUNT(*) FROM dbo.documents)                                        AS total_documents,
    (SELECT COUNT(*) FROM dbo.news)                                             AS total_news;
GO

-- View: Bảng xếp hạng chi tiết
CREATE OR ALTER VIEW dbo.v_leaderboard AS
SELECT
    lb.rank,
    u.full_name,
    u.avatar_url,
    lb.total_xp,
    lb.updated_at
FROM dbo.leaderboard lb
JOIN dbo.users u ON lb.user_id = u.id;
GO

PRINT N'✅ Database schema và seed data đã được tạo thành công!';
GO
