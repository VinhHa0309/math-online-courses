import { X, Zap, HelpCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PlayerHeader({ current, total, combo }) {
  const navigate = useNavigate();
  // Tính % tiến trình để hiển thị thanh bar
  const progressPercentage = (current / total) * 100;

  return (
    <header className="flex items-center justify-between gap-4 border-b border-slate-100 pb-5 mb-8 md:mb-12 font-dmsans">
      {/* Nút thoát */}
      <button
        onClick={() => navigate("/practice")}
        className="p-2.5 rounded-xl text-slate-400 hover:bg-slate-50 hover:text-slate-900 transition-colors"
        title="Thoát bài luyện tập"
      >
        <X size={20} />
      </button>

      {/* Thanh tiến trình Progress Bar - Ẩn con số ở mobile cho gọn */}
      <div className="flex-1 flex items-center gap-3">
        <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#1A2B47] rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <span className="text-xs font-extrabold text-slate-500 tabular-nums hidden sm:block">
          Câu {current} / {total}
        </span>
      </div>

      {/* Chỉ số Combo & Nút trợ giúp */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5 bg-[#FDF2E9] text-orange-600 px-3.5 py-2 rounded-xl border border-orange-100 shadow-xs">
          <Zap size={15} className="fill-orange-500 text-orange-600" />
          <span className="text-xs font-bold uppercase tracking-wider">
            Chuỗi đúng: {combo}
          </span>
        </div>
        <button
          onClick={() => alert("Hướng dẫn: Chọn 1 trong 4 đáp án (A, B, C, D) rồi nhấn 'Kiểm tra kết quả' để nộp bài.")}
          className="p-2.5 text-slate-400 hover:text-slate-600 transition-colors"
          title="Hướng dẫn làm bài"
        >
          <HelpCircle size={18} />
        </button>
      </div>
    </header>
  );
}
