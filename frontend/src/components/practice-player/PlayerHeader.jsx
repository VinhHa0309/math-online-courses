import { X, Zap, HelpCircle } from "lucide-react";

export default function PlayerHeader({ current, total, combo }) {
  // Tính % tiến trình để hiển thị thanh bar
  const progressPercentage = (current / total) * 100;

  return (
    <header className="flex items-center justify-between gap-4 border-b border-slate-100 pb-5 mb-8 md:mb-12">
      {/* Nút thoát */}
      <button className="p-2.5 rounded-xl text-slate-400 hover:bg-slate-50 hover:text-slate-900 transition-colors">
        <X size={20} />
      </button>

      {/* Thanh tiến trình Progress Bar - Ẩn con số ở mobile cho gọn */}
      <div className="flex-1 flex items-center gap-3">
        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#1A2B47] rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <span className="text-[11px] font-bold text-slate-400 tabular-nums hidden sm:block">
          {current} / {total}
        </span>
      </div>

      {/* Chỉ số Combo & Nút trợ giúp */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5 bg-[#FDF2E9] text-orange-600 px-3 py-2 rounded-xl border border-orange-100 shadow-inner">
          <Zap size={14} className="fill-orange-500 text-orange-600" />
          <span className="text-[11px] md:text-xs font-black uppercase tracking-wider">
            Combo: {combo}
          </span>
        </div>
        <button className="p-2.5 text-slate-400 hover:text-slate-600">
          <HelpCircle size={18} />
        </button>
      </div>
    </header>
  );
}
