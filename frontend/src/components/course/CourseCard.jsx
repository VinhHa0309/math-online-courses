import { Clock, PlayCircle, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CourseCard({
  title = "Khóa học Toán nâng cao", // Dữ liệu giả mặc định
  lessons = 20,
  duration = 10,
  price = 500000,
  tag = "Mới",
  category = "Đại số",
  image = "https://placehold.co/600x400/1e293b/white?text=Math+Course",
  viewMode = "grid", // "grid" hoặc "list"
}) {
  const navigate = useNavigate();
  const isList = viewMode === "list";

  return (
    <div 
      onClick={() => navigate("/courses/learn")}
      className={`bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-xl hover:shadow-slate-200/50 transition-all group cursor-pointer flex flex-col ${
        isList ? "sm:flex-row sm:p-4 gap-5" : ""
      }`}
    >
      {/* ── Hình ảnh & Tag ── */}
      <div className={`relative bg-slate-900 overflow-hidden ${
        isList ? "sm:w-64 sm:h-36 sm:rounded-xl shrink-0 aspect-[16/9] sm:aspect-auto" : "aspect-[16/9]"
      }`}>
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
        />
        {tag && (
          <span className="absolute top-3 left-3 bg-orange-500 text-white text-[10px] font-black px-2 py-1 rounded-md uppercase shadow-lg">
            {tag}
          </span>
        )}
      </div>

      {/* ── Nội dung văn bản ── */}
      <div className={`flex-1 flex flex-col justify-between ${
        isList ? "p-4 sm:p-0 space-y-3 sm:space-y-2" : "p-5 space-y-4"
      }`}>
        <div className="space-y-2">
          <div className="flex gap-2">
            <span className="text-[10px] font-bold text-orange-500 bg-orange-50 px-2 py-0.5 rounded uppercase">
              Lớp 10
            </span>
            <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded uppercase">
              {category}
            </span>
          </div>

          <h4 className={`font-bold text-[#1A2B47] leading-tight group-hover:text-[#F08A4B] transition-colors line-clamp-2 ${
            isList ? "text-lg h-auto" : "text-sm h-10"
          }`}>
            {title}
          </h4>

          {/* Thông số bài học */}
          <div className="flex items-center gap-4 text-slate-400">
            <div className="flex items-center gap-1.5 text-[11px] font-medium">
              <PlayCircle size={14} className="text-slate-300" />
              {lessons} bài giảng
            </div>
            <div className="flex items-center gap-1.5 text-[11px] font-medium">
              <Clock size={14} className="text-slate-300" />
              {duration} giờ
            </div>
          </div>
        </div>

        {/* Giá tiền & Nút giỏ hàng */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-50">
          <div className="flex flex-col">
            <span className="text-lg font-black text-[#1A2B47]">
              {price.toLocaleString("vi-VN")}đ
            </span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate("/courses/payment");
            }}
            className="p-2.5 bg-[#1A2B47] text-white rounded-xl hover:bg-[#F08A4B] transition-all active:scale-90 shadow-md"
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
