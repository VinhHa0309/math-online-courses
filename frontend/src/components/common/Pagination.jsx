import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({
  currentPage = 1,
  totalPages = 1,
  onPageChange = () => {},
  hideOnSinglePage = true,
}) {
  if (hideOnSinglePage && totalPages <= 1) {
    return null;
  }

  // Hàm tạo danh sách số trang hiển thị thông minh (không bị thừa ... khi tổng số trang ít)
  const getPages = () => {
    // Nếu tổng số trang ít (<= 7), hiển thị đầy đủ các số trang
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages = [];

    // Luôn có trang 1
    pages.push(1);

    if (currentPage > 3) {
      pages.push("...");
    }

    // Các trang xung quanh trang hiện tại
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      if (!pages.includes(i)) {
        pages.push(i);
      }
    }

    if (currentPage < totalPages - 2) {
      pages.push("...");
    }

    // Luôn có trang cuối
    if (totalPages > 1 && !pages.includes(totalPages)) {
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = getPages();

  return (
    <div className="flex justify-center items-center gap-2 pt-10 border-t border-slate-50">
      {/* Nút Trước */}
      <button
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`p-2.5 rounded-xl border border-slate-100 transition-all ${
          currentPage === 1
            ? "text-slate-200 cursor-not-allowed"
            : "text-slate-400 hover:bg-slate-50 active:scale-95"
        }`}
        aria-label="Previous Page"
      >
        <ChevronLeft size={20} />
      </button>

      {/* Các số trang */}
      {pages.map((page, index) => {
        if (page === "...") {
          return (
            <span key={`dots-${index}`} className="text-slate-300 px-1 font-bold select-none">
              ...
            </span>
          );
        }

        const isCurrent = page === currentPage;
        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-10 h-10 rounded-xl text-sm transition-all active:scale-95 ${
              isCurrent
                ? "font-black bg-[#1A2B47] text-white shadow-lg shadow-blue-900/20"
                : "font-bold text-slate-400 hover:bg-slate-50"
            }`}
          >
            {page}
          </button>
        );
      })}

      {/* Nút Tiếp */}
      <button
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`p-2.5 rounded-xl border border-slate-100 transition-all ${
          currentPage === totalPages
            ? "text-slate-200 cursor-not-allowed"
            : "text-slate-400 hover:bg-slate-50 active:scale-95"
        }`}
        aria-label="Next Page"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}
