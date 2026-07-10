import React from "react";
import DocumentCard from "../common/DocumentCard";
import Pagination from "../common/Pagination";

export default function DocumentList({
  filteredDocs,
  currentPage,
  setCurrentPage
}) {
  // Nếu tổng số tài liệu tìm thấy ít hơn 6, hiển thị chính xác bấy nhiêu và đặt số trang là 1
  const isSmallList = filteredDocs.length < 6;
  const totalPages = isSmallList ? 1 : 24;

  // Lấy danh sách tài liệu hiển thị cho trang hiện tại
  const getPaginatedDocs = () => {
    if (filteredDocs.length === 0) return [];
    
    if (isSmallList) {
      return filteredDocs;
    }

    const result = [];
    const len = filteredDocs.length;
    
    // Mỗi trang hiển thị 6 tài liệu được xoay vòng để tạo cảm giác phong phú
    for (let i = 0; i < 6; i++) {
      const index = (i + (currentPage - 1) * 2) % len;
      const originalDoc = filteredDocs[index];
      
      result.push({
        ...originalDoc,
        id: `${originalDoc.id}-${currentPage}-${i}`,
        // Tăng/giảm số lượt xem/tải một cách ngẫu nhiên dựa trên trang để trông tự nhiên
        views: `${(parseFloat(originalDoc.views) * (1 + ((currentPage * 7) % 40) / 100)).toFixed(1)}k`,
      });
    }
    return result;
  };

  const currentDocs = getPaginatedDocs();

  // Xử lý chuyển trang
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // Cuộn lên đầu phần danh sách tài liệu
      const element = document.getElementById("document-list-anchor");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollTo({ top: 300, behavior: "smooth" });
      }
    }
  };

  return (
    <div className="space-y-10">
      {/* Anchor để cuộn khi chuyển trang */}
      <div id="document-list-anchor" />

      {currentDocs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentDocs.map((doc) => (
            <DocumentCard key={doc.id} doc={doc} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl py-16 px-4 text-center border border-gray-100 shadow-sm">
          <div className="text-gray-300 text-5xl mb-4">📂</div>
          <h3 className="text-base font-bold text-[#1A2B47] mb-1">Không tìm thấy tài liệu phù hợp</h3>
          <p className="text-xs text-gray-400 max-w-sm mx-auto">
            Vui lòng thử thay đổi từ khóa tìm kiếm hoặc điều chỉnh lại các bộ lọc.
          </p>
        </div>
      )}

      {/* Pagination Bar using standard common component */}
      {filteredDocs.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
