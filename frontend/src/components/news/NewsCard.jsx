import { PlayCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

// ── Badge danh mục ─────────────────────────────────────────
function CategoryBadge({ label }) {
  const colorMap = {
    Video: "bg-blue-500 text-white",
    "Thi cử": "bg-orange-500 text-white",
    "Kiến thức": "bg-emerald-500 text-white",
    "Toán học": "bg-[#1A2B47] text-white",
    "Bài luận": "bg-purple-500 text-white",
    default: "bg-slate-500 text-white",
  };
  const cls = colorMap[label] || colorMap.default;
  return (
    <span className={`text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-wide ${cls}`}>
      {label}
    </span>
  );
}

// ── Banner bài nổi bật (hero lớn) ─────────────────────────
export function FeaturedBanner({ article }) {
  const navigate = useNavigate();
  if (!article) return null;

  return (
    <div
      onClick={() => navigate(`/news/${article.id}`)}
      className="relative w-full rounded-2xl overflow-hidden cursor-pointer group"
      style={{ minHeight: "280px" }}
    >
      {/* Hình nền */}
      <img
        src={article.image}
        alt={article.title}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
      />
      {/* Lớp phủ gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0F1C2E]/90 via-[#0F1C2E]/40 to-transparent" />

      {/* Nội dung */}
      <div className="relative z-10 flex flex-col justify-end h-full min-h-[280px] p-6 md:p-8 space-y-3">
        <div className="flex items-center gap-2">
          <CategoryBadge label={article.category} />
          <span className="text-white/60 text-xs">{article.date}</span>
        </div>
        <h2 className="text-white font-black text-xl md:text-2xl leading-snug max-w-2xl group-hover:text-orange-300 transition-colors">
          {article.title}
        </h2>
        <p className="text-white/70 text-sm leading-relaxed max-w-xl line-clamp-2">
          {article.excerpt}
        </p>
        <button className="w-fit flex items-center gap-2 bg-[#F08A4B] text-white text-xs font-black px-5 py-2.5 rounded-xl hover:bg-orange-500 active:scale-95 transition-all shadow-lg mt-2">
          Xem chi tiết →
        </button>
      </div>
    </div>
  );
}

// ── Card bài viết thường (dùng trong grid) ─────────────────
export function NewsCard({ article }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/news/${article.id}`)}
      className="bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-lg hover:shadow-slate-200/60 transition-all group cursor-pointer"
    >
      {/* Hình ảnh */}
      <div className="relative aspect-[16/9] bg-slate-100 overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Badge danh mục */}
        <div className="absolute top-3 left-3">
          <CategoryBadge label={article.category} />
        </div>
        {/* Icon play nếu là video */}
        {article.isVideo && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
              <PlayCircle size={28} className="text-[#F08A4B]" />
            </div>
          </div>
        )}
      </div>

      {/* Nội dung */}
      <div className="p-4 space-y-2">
        <p className="text-[10px] font-medium text-slate-400">{article.date}</p>
        <h4 className="text-sm font-bold text-[#1A2B47] leading-snug line-clamp-2 group-hover:text-[#F08A4B] transition-colors">
          {article.title}
        </h4>
        <button className="flex items-center gap-1 text-[11px] font-bold text-[#F08A4B] hover:underline mt-1">
          Đọc thêm <span>›</span>
        </button>
      </div>
    </div>
  );
}
