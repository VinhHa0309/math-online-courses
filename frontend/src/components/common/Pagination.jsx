import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({
  currentPage = 1,
  totalPages = 12,
  onPageChange = () => {},
}) {
  // Hàm tạo danh sách số trang hiển thị thông minh (có dấu ...)
  const getPages = () => {
    const pages = [];
    
    // Luôn thêm trang đầu
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
    
    // Luôn thêm trang cuối
    if (totalPages > 1 && !pages.includes(totalPages)) {
      pages.push(totalPages);
    }
    
    return pages;
  };

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
      {getPages().map((page, index) => {
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
