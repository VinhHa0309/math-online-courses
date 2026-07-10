import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function PlayerHeader() {
  return (
    <div className="bg-white border-b border-[#E2E8F0] sticky top-0 z-40 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Link to="/courses" className="p-2 hover:bg-[#F1F5F9] rounded-xl transition-all text-[#6B7A90] hover:text-[#1A2B47]">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="font-outfit font-bold text-lg md:text-xl text-[#1A2B47] flex items-center gap-2">
            Trang Học Tập <span className="text-xs px-2 py-0.5 bg-[#FDF2E9] text-[#F08A4B] font-semibold rounded-full uppercase">Video Player</span>
          </h1>
        </div>
      </div>
      
      <Link to="/courses" className="text-sm font-semibold text-[#6B7A90] hover:text-[#1A2B47] px-4 py-2 rounded-xl border border-[#E2E8F0] hover:bg-[#F8FAFC] transition-all">
        Thoát học tập
      </Link>
    </div>
  );
}
