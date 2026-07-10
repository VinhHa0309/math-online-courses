import { useState } from "react";
import SidebarFilter from "../../components/course/SidebarFilter";
import CourseCard from "../../components/course/CourseCard";
import Pagination from "../../components/common/Pagination";
import { LayoutGrid, List, SlidersHorizontal, X } from "lucide-react";
import { courses } from "../../data/courses";

export default function CourseListPage() {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

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
                Khóa học Toán Lớp 10
              </h2>
              <p className="text-slate-400 text-sm mt-1">
                Khám phá 24 khóa học chuyên sâu về Đại số và Hình học lớp 10.
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {courses.map((course, index) => (
              <CourseCard key={index} {...course} />
            ))}
          </div>

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
