import { useState } from "react";
import { BookOpen, CheckCircle2 } from "lucide-react";

// ── Danh sách mục điều hướng trong tài liệu ──────────────
const NAV_ITEMS = [
  { id: "overview", label: "Overview" },
  { id: "question-1", label: "Question 1" },
  { id: "question-2", label: "Question 2" },
  { id: "question-3", label: "Question 3" },
  { id: "formula", label: "Formula Sheet" },
];

export default function DocSidebar({ doc }) {
  const [activeNav, setActiveNav] = useState("overview");

  return (
    <aside className="hidden lg:flex flex-col w-56 shrink-0">
      {/* Tiêu đề tài liệu (rút gọn) */}
      <div className="bg-[#1A2B47] rounded-2xl p-4 mb-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center shrink-0">
            <BookOpen size={14} className="text-white" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider truncate">
              Final Calculus Exam
            </p>
            <p className="text-[9px] text-slate-500 truncate">
              2022 Spring Semester
            </p>
          </div>
        </div>
      </div>

      {/* Navigation label */}
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1 mb-2">
        Navigation
      </p>

      {/* Nav items */}
      <nav className="flex-1 space-y-0.5">
        {NAV_ITEMS.map((item) => {
          const isActive = activeNav === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveNav(item.id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left ${
                isActive
                  ? "bg-orange-50 text-[#F08A4B] font-bold"
                  : "text-slate-500 hover:bg-slate-50 hover:text-[#1A2B47]"
              }`}
            >
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#F08A4B] shrink-0" />
              )}
              {!isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-slate-200 shrink-0" />
              )}
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Nút Finish Review */}
      <button className="mt-6 w-full flex items-center justify-center gap-2 py-3 bg-[#F08A4B] text-white text-xs font-black rounded-xl hover:bg-orange-500 active:scale-95 transition-all shadow-md shadow-orange-200">
        <CheckCircle2 size={14} />
        Finish Review
      </button>
    </aside>
  );
}
