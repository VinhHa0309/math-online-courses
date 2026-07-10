import React from "react";
import { Search } from "lucide-react";

export default function DocumentFilters({
  searchQuery,
  setSearchQuery,
  selectedYear,
  setSelectedYear,
  selectedType,
  setSelectedType,
  selectedGrade,
  setSelectedGrade
}) {
  const years = ["Tất cả", "2023-2024", "2022-2023", "2021-2022", "2020-2021"];
  const documentTypes = ["Đề thi chính thức", "Đề minh họa", "Tài liệu ôn tập", "Chuyên đề NC"];
  const grades = [
    { label: "Khối 10", value: "10" },
    { label: "Khối 11", value: "11" },
    { label: "Khối 12", value: "12" }
  ];

  return (
    <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-gray-100 space-y-5 mb-8">
      {/* Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
          <Search className="w-5 h-5" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Tìm kiếm tên đề thi, mã tài liệu hoặc từ khóa chuyên đề..."
          className="w-full bg-white border border-[#E2E8F0] rounded-xl pl-11 pr-4 py-3 text-sm text-[#1A2B47] placeholder-gray-400 focus:outline-none focus:border-[#F08A4B] focus:ring-4 focus:ring-[#F08A4B]/5 transition-all"
        />
      </div>

      {/* Filter Rows */}
      <div className="space-y-4 pt-1">
        {/* Row 1: Năm học */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <span className="text-xs font-bold text-gray-500 w-24 shrink-0">Năm học:</span>
          <div className="flex flex-wrap gap-2">
            {years.map((y) => {
              const isActive = selectedYear === y;
              return (
                <button
                  key={y}
                  onClick={() => setSelectedYear(y)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                    isActive
                      ? "bg-[#0F172A] text-white shadow-sm font-semibold"
                      : "bg-white border border-[#E2E8F0] text-gray-600 hover:bg-gray-50 hover:border-gray-300"
                  }`}
                >
                  {y}
                </button>
              );
            })}
          </div>
        </div>

        {/* Row 2: Loại tài liệu */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <span className="text-xs font-bold text-gray-500 w-24 shrink-0">Loại tài liệu:</span>
          <div className="flex flex-wrap gap-2">
            {documentTypes.map((type) => {
              const isActive = selectedType === type;
              return (
                <button
                  key={type}
                  onClick={() => setSelectedType(isActive ? null : type)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                    isActive
                      ? "bg-[#0F172A] text-white shadow-sm font-semibold"
                      : "bg-white border border-[#E2E8F0] text-gray-600 hover:bg-gray-50 hover:border-gray-300"
                  }`}
                >
                  {type}
                </button>
              );
            })}
          </div>
        </div>

        {/* Row 3: Khối lớp */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <span className="text-xs font-bold text-gray-500 w-24 shrink-0">Khối lớp:</span>
          <div className="flex flex-wrap gap-2">
            {grades.map((g) => {
              const isActive = selectedGrade === g.value;
              return (
                <button
                  key={g.value}
                  onClick={() => setSelectedGrade(g.value)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                    isActive
                      ? "bg-[#F08A4B] text-white shadow-sm font-semibold"
                      : "bg-white border border-[#E2E8F0] text-gray-600 hover:bg-gray-50 hover:border-gray-300"
                  }`}
                >
                  {g.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
