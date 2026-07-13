import { Link } from "react-router-dom";
import { Home, ArrowLeft, Search } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 py-16 bg-[#F8FAFC] relative overflow-hidden">

      {/* ── Floating math symbols (decorative) ── */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden opacity-[0.04]">
        <span className="absolute top-[10%] left-[8%] text-[120px] font-black text-[#1A2B47] rotate-12">∫</span>
        <span className="absolute top-[15%] right-[12%] text-[90px] font-black text-[#1A2B47] -rotate-6">π</span>
        <span className="absolute bottom-[20%] left-[15%] text-[100px] font-black text-[#1A2B47] rotate-[-15deg]">∑</span>
        <span className="absolute bottom-[10%] right-[8%] text-[110px] font-black text-[#1A2B47] rotate-[20deg]">∞</span>
        <span className="absolute top-[45%] left-[3%] text-[70px] font-black text-[#1A2B47] rotate-[8deg]">Δ</span>
        <span className="absolute top-[50%] right-[5%] text-[80px] font-black text-[#1A2B47] rotate-[-10deg]">θ</span>
        <span className="absolute bottom-[40%] left-[45%] text-[60px] font-black text-[#1A2B47] rotate-[25deg]">√</span>
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 text-center space-y-6 max-w-lg mx-auto">

        {/* Giant 404 number */}
        <div className="relative inline-block">
          <h1 className="text-[140px] sm:text-[180px] font-black text-transparent bg-clip-text bg-gradient-to-b from-[#1A2B47] to-[#1A2B47]/20 leading-none tracking-tight select-none">
            404
          </h1>
          {/* Floating accent dot */}
          <div className="absolute top-6 -right-4 w-5 h-5 rounded-full bg-[#F08A4B] animate-bounce shadow-lg shadow-orange-300/40"></div>
        </div>

        {/* Subtitle */}
        <div className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-black text-[#1A2B47]">
            Ối! Trang này không tồn tại
          </h2>
          <p className="text-sm sm:text-base text-slate-500 leading-relaxed max-w-md mx-auto">
            Có vẻ như bạn đã đi lạc vào một chiều không gian chưa được khám phá.
            Đừng lo, hãy quay lại và tiếp tục hành trình học tập nhé!
          </p>
        </div>

        {/* Decorative formula bar */}
        <div className="bg-[#0B1524] rounded-xl px-6 py-3 inline-flex items-center gap-3 text-white font-mono text-xs sm:text-sm shadow-lg border border-slate-800 mx-auto">
          <span className="text-slate-500">Error:</span>
          <span className="text-[#F08A4B] font-bold">page</span>
          <span className="text-slate-400">∉</span>
          <span className="text-emerald-400 font-bold">Mathematiq</span>
          <span className="w-2 h-4 bg-white/80 animate-pulse rounded-sm ml-1"></span>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <Link
            to="/"
            className="flex items-center gap-2 bg-[#1A2B47] hover:bg-[#253D63] text-white text-sm font-bold px-6 py-3 rounded-xl transition-all active:scale-95 shadow-md"
          >
            <Home className="w-4 h-4" />
            <span>Về Trang chủ</span>
          </Link>
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 bg-white hover:bg-slate-50 text-[#1A2B47] text-sm font-bold px-6 py-3 rounded-xl transition-all active:scale-95 border border-slate-200 shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Quay lại</span>
          </button>
          <Link
            to="/courses"
            className="flex items-center gap-2 bg-[#FDF2E9] hover:bg-[#FAD7BC] text-[#F08A4B] text-sm font-bold px-6 py-3 rounded-xl transition-all active:scale-95"
          >
            <Search className="w-4 h-4" />
            <span>Tìm khoá học</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
