import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import CourseListPage from "./pages/courselist/CourseListPage";
import PaymentPage from "./pages/courselist/PaymentPage";
import PracticePage from "./pages/practice/PracticePage";
import PracticePlayerPage from "./pages/practice-player/PracticePlayerPage";
import DocumentPage from "./pages/document/DocumentPage";
import DocumentDetailPage from "./pages/document/DocumentDetailPage";
import NewsPage from "./pages/news/NewsPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* ── NHÓM 1: CÁC TRANG TRÀN MÀN HÌNH (Không Header/Footer) ── */}
        {/* Ưu tiên đặt các trang này lên đầu để tránh bị lọt vào Layout chung */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/practice/calculus-1" element={<PracticePlayerPage />} />

        {/* ── NHÓM 2: CÁC TRANG CÓ HEADER & FOOTER (Dùng MainLayout) ── */}
        <Route
          path="/*"
          element={
            <MainLayout>
              <Routes>
                {/* Trang chủ */}
                <Route path="/" element={<HomePage />} />

                {/* Trang danh sách khóa học */}
                <Route path="/courses" element={<CourseListPage />} />

                {/* Trang thanh toán khóa học */}
                <Route path="/courses/payment" element={<PaymentPage />} />

                {/* Trang đấu trường luyện tập */}
                <Route path="/practice" element={<PracticePage />} />

                {/* Trang thư viện tài liệu */}
                <Route path="/resources" element={<DocumentPage />} />
                <Route path="/document" element={<DocumentPage />} />

                {/* Trang chi tiết tài liệu */}
                <Route path="/document/:id" element={<DocumentDetailPage />} />

                {/* Trang tin tức */}
                <Route path="/news" element={<NewsPage />} />

                {/* Bạn có thể thêm các trang như Profile, Settings... vào đây sau này */}
              </Routes>
            </MainLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
