import { useState } from "react";
import { Check } from "lucide-react";

export default function SidebarFilter({ onClose }) {
  const grades = Array.from({ length: 12 }, (_, i) => i + 1);
  const topics = ["Đại số", "Hình học", "Giải tích", "Số học"];
  
  const [selectedGrade, setSelectedGrade] = useState(10);
  const [selectedTopics, setSelectedTopics] = useState(["Đại số", "Hình học"]);
  const [selectedPrice, setSelectedPrice] = useState("all");

  const toggleTopic = (topic) => {
    if (selectedTopics.includes(topic)) {
      setSelectedTopics(selectedTopics.filter((t) => t !== topic));
    } else {
      setSelectedTopics([...selectedTopics, topic]);
    }
  };

  const handleClearFilters = () => {
    setSelectedGrade(null);
    setSelectedTopics([]);
    setSelectedPrice("all");
  };

  return (
    <aside className="w-full space-y-8">
      {/* Lớp học */}
      <div>
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
          Theo lớp
        </h3>
        <div className="grid grid-cols-4 gap-2">
          {grades.map((grade) => {
            const isSelected = selectedGrade === grade;
            return (
              <button
                key={grade}
                onClick={() => setSelectedGrade(grade)}
                className={`py-2 text-xs sm:text-sm font-bold rounded-lg border transition-all ${
                  isSelected
                    ? "bg-[#1A2B47] text-white border-[#1A2B47] shadow-sm"
                    : "bg-white text-slate-600 border-slate-100 hover:border-orange-200"
                }`}
              >
                {grade}
              </button>
            );
          })}
        </div>
      </div>

      {/* Chuyên đề */}
      <div>
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
          Chuyên đề
        </h3>
        <div className="space-y-2.5">
          {topics.map((topic) => {
            const isChecked = selectedTopics.includes(topic);
            return (
              <button
                key={topic}
                onClick={() => toggleTopic(topic)}
                className="flex items-center gap-3 w-full text-left group"
              >
                <div
                  className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                    isChecked
                      ? "bg-[#F08A4B] border-[#F08A4B] text-white"
                      : "bg-white border-slate-200 group-hover:border-[#F08A4B]/50"
                  }`}
                >
                  {isChecked && <Check size={12} strokeWidth={3} />}
                </div>
                <span
                  className={`text-sm font-medium transition-colors ${
                    isChecked ? "text-[#1A2B47] font-bold" : "text-slate-600 group-hover:text-[#1A2B47]"
                  }`}
                >
                  {topic}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Giá tiền */}
      <div>
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
          Khoảng giá
        </h3>
        <div className="space-y-2.5">
          {[
            { id: "all", label: "Tất cả mức giá" },
            { id: "under-500", label: "Dưới 500.000đ" },
            { id: "500-1000", label: "500.000đ - 1.000.000đ" },
            { id: "above-1000", label: "Trên 1.000.000đ" },
          ].map((priceOpt) => {
            const isSelected = selectedPrice === priceOpt.id;
            return (
              <button
                key={priceOpt.id}
                onClick={() => setSelectedPrice(priceOpt.id)}
                className="flex items-center gap-3 w-full text-left group"
              >
                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                    isSelected
                      ? "border-[#F08A4B] bg-[#F08A4B] text-white"
                      : "bg-white border-slate-200 group-hover:border-[#F08A4B]/50"
                  }`}
                >
                  {isSelected && (
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  )}
                </div>
                <span
                  className={`text-sm font-medium transition-colors ${
                    isSelected ? "text-[#1A2B47] font-bold" : "text-slate-600 group-hover:text-[#1A2B47]"
                  }`}
                >
                  {priceOpt.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="pt-4 space-y-2">
        <button
          onClick={handleClearFilters}
          className="w-full py-3 bg-slate-50 text-slate-500 font-bold text-xs rounded-xl hover:bg-slate-100 active:scale-95 transition-all"
        >
          Xóa bộ lọc
        </button>
        {onClose && (
          <button
            onClick={onClose}
            className="w-full lg:hidden py-3 bg-[#1A2B47] text-white font-bold text-xs rounded-xl hover:bg-slate-800 active:scale-95 transition-all"
          >
            Áp dụng bộ lọc
          </button>
        )}
      </div>
    </aside>
  );
}
