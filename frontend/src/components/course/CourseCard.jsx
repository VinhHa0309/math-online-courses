import { Clock, PlayCircle, ShoppingCart, CheckCircle2, Hourglass } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CourseCard({
  id = 1,
  title = "Khóa học Toán nâng cao",
  lessons = 20,
  totalLessons,
  duration = 10,
  durationHours,
  price = 500000,
  tag = "Mới",
  category = "Đại số",
  image,
  imageUrl,
  enrollmentStatus = null, // "APPROVED" | "PENDING" | null
}) {
  const displayLessons = totalLessons ?? lessons;
  const displayDuration = durationHours ?? duration;
  const displayImage = imageUrl || image || "https://placehold.co/600x400/1e293b/white?text=Math+Course";
  const navigate = useNavigate();

  const cleanText = (str) => {
    if (!str) return str;
    return str
      .replace(/Đ\?I S\?/gi, "Đại số")
      .replace(/H\?NH H\?C/gi, "Hình học")
      .replace(/BÁN CH\?Y/gi, "Bán chạy")
      .replace(/M\?I/gi, "Mới");
  };

  const formattedTag = cleanText(tag);
  const formattedCategory = cleanText(category);

  const handleCardClick = () => {
    if (enrollmentStatus === "PENDING") {
      alert("Khóa học này đã được thanh toán và đang chờ Admin duyệt. Bạn không cần thanh toán lại!");
      return;
    }
    if (enrollmentStatus === "APPROVED") {
      navigate(`/courses/${id}/learn`);
      return;
    }
    // Nếu chưa đăng ký, cho xem thông tin thanh toán hoặc bài học
    navigate(`/courses/payment?courseId=${id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-xl hover:shadow-slate-200/50 transition-all group cursor-pointer"
    >
      {/* ── Hình ảnh & Tag ── */}
      <div className="relative aspect-[16/9] bg-slate-900 overflow-hidden">
        <img
          src={displayImage}
          alt={title}
          className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
        />

        {/* Trạng thái đăng ký */}
        {enrollmentStatus === "APPROVED" && (
          <span className="absolute top-3 left-3 bg-emerald-500 text-white text-[10px] font-black px-2.5 py-1 rounded-md uppercase shadow-lg flex items-center gap-1">
            <CheckCircle2 size={12} /> Đã kích hoạt
          </span>
        )}
        {enrollmentStatus === "PENDING" && (
          <span className="absolute top-3 left-3 bg-amber-500 text-white text-[10px] font-black px-2.5 py-1 rounded-md uppercase shadow-lg flex items-center gap-1">
            <Hourglass size={12} className="animate-spin" /> Đang chờ Admin duyệt
          </span>
        )}
        {!enrollmentStatus && formattedTag && (
          <span className="absolute top-3 left-3 bg-orange-500 text-white text-[10px] font-black px-2 py-1 rounded-md uppercase shadow-lg">
            {formattedTag}
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
            {formattedCategory}
          </span>
        </div>

        <h4 className="font-bold text-[#1A2B47] leading-tight line-clamp-2 h-10 group-hover:text-[#F08A4B] transition-colors">
          {title}
        </h4>

        {/* Thông số bài học */}
        <div className="flex items-center gap-4 text-slate-400">
          <div className="flex items-center gap-1.5 text-[11px] font-medium">
            <PlayCircle size={14} className="text-slate-300" />
            {displayLessons} bài giảng
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-medium">
            <Clock size={14} className="text-slate-300" />
            {displayDuration} giờ
          </div>
        </div>

        {/* Giá tiền & Nút tác vụ */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-50">
          <div className="flex flex-col">
            <span className="text-lg font-black text-[#1A2B47]">
              {price.toLocaleString("vi-VN")}đ
            </span>
          </div>

          {enrollmentStatus === "APPROVED" ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/courses/${id}/learn`);
              }}
              className="px-3.5 py-2 bg-emerald-600 text-white font-bold text-xs rounded-xl hover:bg-emerald-700 transition-all shadow-md flex items-center gap-1.5"
            >
              <PlayCircle size={15} /> Vào học ngay
            </button>
          ) : enrollmentStatus === "PENDING" ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                alert("Khóa học đã được thanh toán và đang chờ Admin duyệt!");
              }}
              className="px-3 py-2 bg-amber-500 text-white font-bold text-xs rounded-xl hover:bg-amber-600 transition-all shadow-md flex items-center gap-1.5"
            >
              <Hourglass size={14} /> Đang chờ duyệt
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/courses/payment?courseId=${id}`);
              }}
              className="p-2.5 bg-[#1A2B47] text-white rounded-xl hover:bg-[#F08A4B] transition-all active:scale-90 shadow-md"
            >
              <ShoppingCart size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
