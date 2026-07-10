import { NEWS_CATEGORIES } from "../../data/news";

export default function NewsFilter({ activeCategory, onSelect, sortOption, onSortChange }) {
  const SORT_OPTIONS = [
    { value: "newest", label: "Mới nhất" },
    { value: "popular", label: "Phổ biến" },
  ];

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
      {/* Tabs danh mục */}
      <div className="flex items-center gap-1 flex-wrap">
        {NEWS_CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => onSelect(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all active:scale-95 ${
                isActive
                  ? "bg-[#1A2B47] text-white shadow-sm"
                  : "bg-white text-slate-400 border border-slate-100 hover:border-slate-200 hover:text-[#1A2B47]"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Sắp xếp */}
      <select
        value={sortOption}
        onChange={(e) => onSortChange(e.target.value)}
        className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm font-bold text-[#1A2B47] outline-none focus:ring-2 focus:ring-orange-500/10 transition-all cursor-pointer w-fit"
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
