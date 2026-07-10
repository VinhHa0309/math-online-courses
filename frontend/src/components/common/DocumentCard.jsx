import React from "react";
import { useNavigate } from "react-router-dom";

const DocumentCard = ({ doc }) => {
  const navigate = useNavigate();
  // Định nghĩa màu sắc badge dựa trên loại tài liệu để khớp giao diện gốc
  const getBadgeStyles = (tag) => {
    switch (tag) {
      case "CHÍNH THỨC":
        return "bg-[#0F172A] text-white"; // Slate-900
      case "MINH HỌA":
        return "bg-[#F08A4B] text-white"; // Orange/Amber
      case "ÔN TẬP":
        return "bg-[#94A3B8] text-white"; // Slate-400
      case "CHUYÊN ĐỀ":
        return "bg-[#1E1B4B] text-white"; // Indigo-950
      case "HỌC SINH GIỎI":
        return "bg-[#1D4ED8] text-white"; // Blue-700
      case "CƠ BẢN":
        return "bg-[#E2E8F0] text-[#475569]"; // Light gray
      default:
        return "bg-gray-500 text-white";
    }
  };

  // Định nghĩa màu sắc icon container dựa trên loại tài liệu để khớp giao diện gốc
  const getIconStyles = (tag) => {
    switch (tag) {
      case "CHÍNH THỨC":
        return "bg-red-50 text-red-500";
      case "MINH HỌA":
        return "bg-blue-50 text-blue-500";
      case "ÔN TẬP":
        return "bg-emerald-50 text-emerald-500";
      case "CHUYÊN ĐỀ":
        return "bg-amber-50 text-amber-500";
      case "HỌC SINH GIỎI":
        return "bg-purple-50 text-purple-500";
      case "CƠ BẢN":
        return "bg-teal-50 text-teal-500";
      default:
        return "bg-red-50 text-red-500";
    }
  };

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow relative">
      <div>
        {/* Header card: Icon và Badge loại */}
        <div className="flex justify-between items-start mb-4">
          <div className={`p-2 rounded-lg ${getIconStyles(doc.tag)}`}>
            {/* Giả lập Icon file tài liệu */}
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded tracking-wide ${getBadgeStyles(doc.tag)}`}
          >
            {doc.tag}
          </span>
        </div>

        {/* Tiêu đề tài liệu */}
        <h4 className="text-gray-800 font-semibold text-sm leading-snug mb-4 line-clamp-2 h-10">
          {doc.title}
        </h4>

        {/* Thông số chi tiết */}
        <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs text-gray-400 mb-6">
          <div className="flex items-center gap-1.5">
            <span className="material-icons text-sm">calendar_today</span>
            <span>{doc.year}</span>
          </div>
          <div className="flex items-center gap-1.5 justify-end md:justify-start">
            <span className="material-icons text-sm">visibility</span>
            <span>{doc.views}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="material-icons text-sm">save_alt</span>
            <span>{doc.size}</span>
          </div>
          <div className="flex items-center gap-1.5 justify-end md:justify-start">
            <span className="material-icons text-sm">description</span>
            <span>{doc.type}</span>
          </div>
        </div>
      </div>

      {/* Nhóm nút tương tác */}
      <div className="grid grid-cols-2 gap-2 mt-auto">
        <button
          onClick={() => navigate(`/document/${doc.id}`)}
          className="py-2 border border-gray-300 rounded-lg text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 transition-colors"
        >
          Xem ngay
        </button>
        <button className="py-2 bg-slate-900 rounded-lg text-xs font-semibold text-white flex items-center justify-center gap-1 hover:bg-slate-800 transition-colors">
          <svg
            className="w-3 h-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          Tải về
        </button>
      </div>
    </div>
  );
};

export default DocumentCard;
