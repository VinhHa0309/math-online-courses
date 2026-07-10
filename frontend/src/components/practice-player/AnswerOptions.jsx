import { CheckCircle2 } from "lucide-react";

export default function AnswerOptions({ options, selectedAnswer, onSelect }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 pt-10 md:pt-14">
      {options.map((option) => {
        const isSelected = selectedAnswer === option.id;

        return (
          <button
            key={option.id}
            onClick={() => onSelect(option.id)}
            className={`
              flex items-center justify-between gap-4 p-5 md:p-6 rounded-2xl border transition-all text-left group
              ${
                isSelected
                  ? "bg-[#1A2B47] text-white border-[#1A2B47] shadow-xl shadow-blue-900/10"
                  : "bg-white text-[#1A2B47] border-slate-100 hover:border-orange-200 hover:bg-slate-50"
              }
            `}
          >
            <div className="flex items-center gap-4">
              {/* Nhãn A, B, C, D */}
              <div
                className={`
                w-9 h-9 rounded-xl flex items-center justify-center text-sm font-black transition-colors
                ${
                  isSelected
                    ? "bg-white/10 text-white shadow-inner"
                    : "bg-slate-50 text-[#1A2B47]/60 border border-slate-100 group-hover:bg-white"
                }
              `}
              >
                {option.id}
              </div>

              {/* Giá trị đáp án */}
              <span className="text-sm md:text-base font-bold tabular-nums">
                {option.value}
              </span>
            </div>

            {/* Icon Checkmark khi được chọn */}
            {isSelected && <CheckCircle2 size={20} className="text-white/60" />}
          </button>
        );
      })}
    </div>
  );
}
