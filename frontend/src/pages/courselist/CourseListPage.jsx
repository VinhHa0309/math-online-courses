import { useState, useEffect } from "react";
import SidebarFilter from "../../components/course/SidebarFilter";
import CourseCard from "../../components/course/CourseCard";
import Pagination from "../../components/common/Pagination";
import { LayoutGrid, List, SlidersHorizontal, X } from "lucide-react";

export default function CourseListPage() {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8085/api/courses")
      .then((res) => res.json())
      .then((data) => {
        setCourses(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi khi kết nối API khóa học:", err);
        setLoading(false);
      });
  }, []);

  // ✅ Đặt thành true để test empty state, false để hiện khóa học thật
  const forceEmpty = false; // ← đổi lại false khi test xong

  return (
    <div className="max-w-7xl mx-auto px-5 sm:px-8 py-10 min-h-screen bg-white">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* ── Sidebar Bộ lọc cho Desktop (Ẩn ở mobile) ── */}
        <div className="hidden lg:block shrink-0">
          <SidebarFilter />
        </div>

        {/* ── Khu vực nội dung chính ── */}
        <div className="flex-1 space-y-6">
          {/* Thanh tiêu đề và công cụ sắp xếp */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-100 pb-6">
            <div>
              <h2 className="text-2xl font-black text-[#1A2B47] tracking-tight">
                Khóa học Toán THPT
              </h2>
              <p className="text-slate-400 text-sm mt-1">
                Khám phá các khóa học chuyên sâu của Cô Thu Sương.
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* Nút lọc hiển thị ở Mobile */}
              <button
                onClick={() => setIsMobileFilterOpen(true)}
                className="lg:hidden flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm font-bold text-[#1A2B47] hover:bg-slate-50 active:scale-95 transition-all"
              >
                <SlidersHorizontal size={18} className="text-[#F08A4B]" />
                Bộ lọc
              </button>

              {/* Nút chuyển đổi View Grid/List */}
              <div className="hidden sm:flex bg-slate-50 p-1 rounded-xl border border-slate-100">
                <button className="p-2 bg-white shadow-sm rounded-lg text-[#F08A4B] transition-all">
                  <LayoutGrid size={18} />
                </button>
                <button className="p-2 text-slate-400 hover:text-slate-600 transition-all">
                  <List size={18} />
                </button>
              </div>

              {/* Dropdown Sắp xếp */}
              <select className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm font-bold text-[#1A2B47] outline-none focus:ring-2 focus:ring-orange-500/10 transition-all cursor-pointer">
                <option>Mới nhất</option>
                <option>Giá: Thấp đến Cao</option>
                <option>Giá: Cao đến Thấp</option>
                <option>Phổ biến nhất</option>
              </select>
            </div>
          </div>

          {/* ── Danh sách Thẻ khóa học (Grid) ── */}
          {loading ? (
            // Skeleton loading
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-slate-100 rounded-3xl h-64 animate-pulse" />
              ))}
            </div>
          ) : courses.length === 0 || forceEmpty ? (
            // Empty state khi chưa có khóa học
            <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
              {/* Illustration */}
              <div className="relative mb-8">
                <div className="w-36 h-36 bg-gradient-to-br from-orange-50 to-blue-50 rounded-[40px] flex items-center justify-center shadow-lg shadow-slate-100 rotate-3">
                  <svg className="w-20 h-20 text-[#1A2B47]/20" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="8" y="14" width="46" height="56" rx="6" fill="currentColor" />
                    <rect x="18" y="10" width="46" height="56" rx="6" fill="white" stroke="currentColor" strokeWidth="3" />
                    <line x1="30" y1="28" x2="52" y2="28" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                    <line x1="30" y1="38" x2="52" y2="38" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                    <line x1="30" y1="48" x2="44" y2="48" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                </div>
                {/* Decorative dots */}
                <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-orange-300/60 blur-sm" />
                <div className="absolute -bottom-1 -left-3 w-4 h-4 rounded-full bg-blue-200/70 blur-sm" />
              </div>

              {/* Text */}
              <h3 className="text-2xl font-black text-[#1A2B47] tracking-tight mb-3">
                Chưa có khóa học nào
              </h3>
              <p className="text-slate-400 text-sm max-w-sm leading-relaxed mb-2">
                Giáo viên chưa đăng tải khóa học nào. Hãy quay lại sau hoặc xem các nội dung học tập khác của{" "}
                <span className="font-semibold text-[#F08A4B]">SuongMath</span>.
              </p>

              {/* Suggested actions */}
              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <a
                  href="/practice"
                  className="flex items-center justify-center gap-2 bg-[#1A2B47] hover:bg-[#243857] text-white font-bold px-6 py-3 rounded-xl text-sm transition-all active:scale-95 shadow-md"
                >
                  🎯 Vào Luyện Tập Ngay
                </a>
                <a
                  href="/resources"
                  className="flex items-center justify-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 text-[#1A2B47] font-bold px-6 py-3 rounded-xl text-sm transition-all active:scale-95"
                >
                  📄 Xem Tài Liệu Miễn Phí
                </a>
              </div>

              {/* Subtle hint */}
              <p className="text-[11px] text-slate-300 font-medium mt-8 uppercase tracking-wider">
                Được cập nhật bởi Cô Thu Sương · SuongMath
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
              {courses.map((course) => (
                <CourseCard key={course.id} {...course} />
              ))}
            </div>
          )}

          {/* ── Thanh Phân trang (Pagination) ── */}
          <Pagination
            currentPage={currentPage}
            totalPages={12}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>

      {/* ── Mobile Filter Drawer ── */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Lớp nền tối mờ */}
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setIsMobileFilterOpen(false)}
          />

          {/* Khung Drawer trượt từ bên trái */}
          <div className="relative flex flex-col w-full max-w-[280px] bg-white h-full shadow-2xl p-6 overflow-y-auto z-10 animate-in slide-in-from-left duration-300">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
              <h3 className="text-lg font-black text-[#1A2B47] tracking-tight">Bộ lọc kết quả</h3>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-900 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <SidebarFilter onClose={() => setIsMobileFilterOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
