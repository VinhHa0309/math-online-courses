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
}) {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-xl hover:shadow-slate-200/50 transition-all group cursor-pointer">
      {/* ── Hình ảnh & Tag ── */}
      <div className="relative aspect-[16/9] bg-slate-900 overflow-hidden">
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
      <div className="p-5 space-y-4">
        <div className="flex gap-2">
          <span className="text-[10px] font-bold text-orange-500 bg-orange-50 px-2 py-0.5 rounded uppercase">
            Lớp 10
          </span>
          <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded uppercase">
            {category}
          </span>
        </div>

        <h4 className="font-bold text-[#1A2B47] leading-tight line-clamp-2 h-10 group-hover:text-[#F08A4B] transition-colors">
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

        {/* Giá tiền & Nút giỏ hàng */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-50">
          <div className="flex flex-col">
            <span className="text-lg font-black text-[#1A2B47]">
              {price.toLocaleString("vi-VN")}đ
            </span>
          </div>
          <button
            onClick={() => navigate("/courses/payment")}
            className="p-2.5 bg-[#1A2B47] text-white rounded-xl hover:bg-[#F08A4B] transition-all active:scale-90 shadow-md"
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
