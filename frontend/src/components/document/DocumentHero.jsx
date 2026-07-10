import React from "react";
import { BookOpen } from "lucide-react";

export default function DocumentHero() {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pt-6 pb-8">
      {/* Left side: Breadcrumb & Title info */}
      <div className="space-y-3 max-w-3xl">
        <div className="flex items-center gap-1.5 text-xs font-bold tracking-wider text-gray-400 uppercase">
          <span className="hover:text-gray-600 cursor-pointer">Home</span>
          <span>&rsaquo;</span>
          <span className="text-[#1A2B47]">Resources</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#1A2B47] tracking-tight">
          Thư viện Tài liệu
        </h1>
        <p className="text-gray-500 text-sm md:text-base leading-relaxed font-normal">
          Kho lưu trữ đề thi, tài liệu ôn tập và bài giảng toán học chuyên sâu. Khám phá hàng ngàn tài liệu chất lượng cao từ các kỳ thi quốc gia và chuyên đề bồi dưỡng.
        </p>
      </div>

      {/* Right side: Stats Card */}
      <div className="shrink-0 flex items-center justify-start md:justify-end">
        <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4 flex items-center gap-4 shadow-sm w-full md:w-auto min-w-[200px]">
          <div className="w-12 h-12 rounded-lg bg-[#1E293B] flex items-center justify-center text-white shrink-0">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-gray-400 font-medium">Tổng tài liệu</div>
            <div className="text-xl font-bold text-[#1E293B]">2,540+</div>
          </div>
        </div>
      </div>
    </div>
  );
}
