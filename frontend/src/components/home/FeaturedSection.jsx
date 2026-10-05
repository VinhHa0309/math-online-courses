import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  Zap,
  Trophy,
  BarChart2,
  Triangle,
  Clock,
  Code,
} from "lucide-react";

import { compStats, studentStats } from "../../data/featured";

// Hàm chuẩn hóa Tên khóa học nếu dữ liệu DB bị thô/lỗi font (ví dụ: Lop1 -> Toán Lớp 1, Toan12 -> Toán Lớp 12, hoa 1 -> Hóa Học 1)
const formatCourseTitle = (rawTitle) => {
  if (!rawTitle) return "Khóa học Toán nâng cao";
  let title = rawTitle.trim();
  if (/^lop\s*(\d+)$/i.test(title)) return title.replace(/^lop\s*(\d+)$/i, "Toán Lớp $1");
  if (/^toan\s*(\d+)$/i.test(title)) return title.replace(/^toan\s*(\d+)$/i, "Toán Lớp $1");
  if (/^hoa\s*(\d+)$/i.test(title)) return title.replace(/^hoa\s*(\d+)$/i, "Hóa Học $1");
  return title;
};

// Hàm định dạng giá tiền chuẩn Việt Nam
const formatPrice = (price) => {
  if (price === 0 || price === "0") return "Miễn phí";
  if (typeof price === "number") {
    return price >= 1000 ? `${price.toLocaleString("vi-VN")}đ` : `${price}đ`;
  }
  if (typeof price === "string") {
    const num = parseInt(price.replace(/\D/g, ""), 10);
    if (!isNaN(num) && num > 0) {
      return num >= 1000 ? `${num.toLocaleString("vi-VN")}đ` : price;
    }
  }
  return price || "Miễn phí";
};

/* ─── Sub-component Thẻ Khóa học nhỏ ────────────────────── */
function SmallCard({ icon, title, desc, price, onDetail }) {
  const formattedTitle = formatCourseTitle(title);
  return (
    <div className="border border-[#F2EDE6] rounded-2xl bg-white p-5 flex flex-col gap-3 hover:border-[#FAD7BC] hover:bg-[#FFFAF7] transition-all flex-1 shadow-sm hover:shadow-md">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#FDF2E9] flex items-center justify-center flex-shrink-0">
          {icon}
        </div>
        <h4 className="font-extrabold text-[#1A2B47] text-base leading-snug line-clamp-1 font-outfit">
          {formattedTitle}
        </h4>
      </div>

      <p className="text-xs text-[#6B7A90] leading-relaxed flex-1 line-clamp-2">
        {desc}
      </p>

      <div className="flex items-center justify-between mt-auto pt-2 border-t border-slate-100">
        <span className="text-[#1A2B47] font-black text-sm sm:text-base">
          {price}
        </span>
        <button
          onClick={onDetail}
          className="text-[11px] font-bold text-[#F08A4B] border border-[#FAD7BC] bg-white px-3 py-1.5 rounded-xl hover:bg-[#FDF2E9] transition-all cursor-pointer shadow-2xs"
        >
          Xem chi tiết
        </button>
      </div>
    </div>
  );
}

/* ─── Main Component ────────────────────────────────────── */
export default function FeaturedSection() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8085/api/courses")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          // Sắp xếp khóa học theo số lượng học viên đông nhất
          const sorted = [...data].sort((a, b) => {
            const countA = a.studentCount || a.studentsCount || 0;
            const countB = b.studentCount || b.studentsCount || 0;
            return countB - countA;
          });
          setCourses(sorted);
        }
      })
      .catch((err) => {
        console.error("Lỗi khi tải khóa học nổi bật:", err);
      });
  }, []);

  // Lấy khóa học bán chạy nhất từ Database (vị trí đầu tiên)
  const rawBestCourse = courses[0] || null;
  const bestCourse = rawBestCourse
    ? {
      ...rawBestCourse,
      displayTitle: formatCourseTitle(rawBestCourse.title),
    }
    : null;

  // Lấy các khóa học tiếp theo cho cột bên phải từ Database (vị trí 1 và 2)
  const sideCourses = courses.slice(1, 3);

  return (
    <section className="bg-white py-12 px-6 sm:px-10 font-dmsans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
        <div>
          <p className="text-[11px] font-extrabold tracking-widest uppercase text-[#F08A4B] mb-1.5">
            Khoá học nổi bật
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A2B47] leading-tight font-outfit">
            Chọn lộ trình <span className="text-[#F08A4B]">của bạn</span>
          </h2>
          <p className="text-sm text-[#9CA3B0] mt-1.5 font-medium">
            Các chương trình được thiết kế chuyên sâu cho mọi cấp độ học sinh & luyện thi.
          </p>
        </div>
        <button
          onClick={() => navigate("/courses")}
          className="inline-flex items-center gap-2 text-sm font-bold text-[#F08A4B] border border-[#FAD7BC] bg-[#FFF8F4] px-4 py-2.5 rounded-xl hover:bg-[#FDF2E9] hover:border-[#F08A4B] transition-all whitespace-nowrap cursor-pointer shadow-2xs"
        >
          Xem toàn bộ <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* ── Big Card (Bán chạy nhất từ Database) ── */}
        {bestCourse ? (
          <div className="md:col-span-2 border border-[#F2EDE6] rounded-3xl overflow-hidden bg-white flex flex-col shadow-sm hover:shadow-md transition-all">
            <div className="relative h-60 sm:h-68 overflow-hidden">
              <img
                src={bestCourse.imageUrl || "https://images.unsplash.com/photo-1635070041078-e3fb4fe365c9?w=900&q=80&auto=format&fit=crop"}
                alt={bestCourse.displayTitle}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A2B47]/80 via-[#1A2B47]/20 to-transparent" />
              <span className="absolute top-4 left-4 bg-[#F08A4B] text-white text-[11px] font-extrabold tracking-wider uppercase px-3.5 py-1.5 rounded-xl shadow-md">
                🔥 Bán chạy nhất
              </span>
              <span className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm text-[#1A2B47] text-sm font-black px-4 py-1.5 rounded-xl shadow-md">
                {formatPrice(bestCourse.price)}
              </span>
            </div>

            <div className="p-6 flex flex-col gap-3.5 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-[#F08A4B] bg-[#FFF8F4] border border-[#FAD7BC] px-3 py-1 rounded-lg">
                  {bestCourse.category || "Toán THPT"}
                </span>
                {bestCourse.grade && (
                  <span className="text-[11px] font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">
                    Lớp {bestCourse.grade}
                  </span>
                )}
              </div>

              <h3 className="text-xl sm:text-2xl font-extrabold text-[#1A2B47] leading-snug font-outfit">
                {bestCourse.displayTitle}
              </h3>

              <p className="text-sm text-[#6B7A90] leading-relaxed flex-1 line-clamp-2">
                {bestCourse.description || "Khóa học chuyên sâu đầy đủ lý thuyết và phương pháp giải nhanh độc quyền cùng Cô Thu Sương."}
              </p>

              <div className="flex flex-wrap gap-4 text-xs text-[#9CA3B0] font-semibold pt-1 border-t border-slate-100 mt-1">
                <span className="flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-[#F08A4B]" /> {bestCourse.lessonCount || 48} bài học
                </span>
                <span className="flex items-center gap-1.5">
                  <Code className="w-4 h-4 text-[#F08A4B]" /> {bestCourse.studentCount || 4} học viên đã đăng ký
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#F08A4B]" /> {bestCourse.durationHours || 36} giờ
                </span>
              </div>

              <button
                onClick={() => navigate(bestCourse.id ? `/courses/payment?courseId=${bestCourse.id}` : "/courses")}
                className="self-start mt-2 bg-[#1A2B47] hover:bg-[#253D63] active:scale-95 text-white text-xs sm:text-sm font-bold px-6 py-3 rounded-xl transition-all cursor-pointer shadow-md"
              >
                Đăng ký ngay →
              </button>
            </div>
          </div>
        ) : (
          <div className="md:col-span-2 border border-slate-200/60 rounded-3xl h-80 bg-slate-50 animate-pulse flex flex-col items-center justify-center text-slate-400 font-bold text-sm gap-2">
            <BookOpen className="w-8 h-8 text-slate-300 animate-bounce" />
            <span>Đang tải khóa học ...</span>
          </div>
        )}

        {/* ── Small Cards Column ── */}
        <div className="md:col-span-1 flex flex-col gap-4">
          {sideCourses.map((c, idx) => (
            <SmallCard
              key={c.id || idx}
              title={c.title}
              desc={c.description || "Chương trình nâng cao phương pháp tư duy toán học."}
              price={formatPrice(c.price)}
              icon={idx % 2 === 0 ? <Triangle className="w-5 h-5 text-[#F08A4B]" /> : <BarChart2 className="w-5 h-5 text-[#F08A4B]" />}
              onDetail={() => navigate(c.id ? `/courses/payment?courseId=${c.id}` : "/courses")}
            />
          ))}
        </div>

        {/* ── Student Stats Card ── */}
        <div className="md:col-span-1 border border-[#F2EDE6] rounded-3xl bg-[#FAFBFC] p-6 flex flex-col gap-5">
          <p className="text-base font-extrabold text-[#1A2B47] font-outfit">
            Kết quả học viên
          </p>
          <div className="grid grid-cols-2 gap-y-5">
            {studentStats.map((s, i) => (
              <div
                key={s.label}
                className={i % 2 === 1 ? "pl-5 border-l border-[#F2EDE6]" : ""}
              >
                <p className={`text-2xl sm:text-3xl font-black leading-none font-outfit ${s.orange ? "text-[#F08A4B]" : "text-[#1A2B47]"}`}>
                  {s.num}
                </p>
                <p className="text-[11px] text-[#9CA3B0] font-bold mt-1.5 uppercase tracking-wide">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Competitive Banner ── */}
        <div className="md:col-span-2 rounded-3xl bg-[#1A2B47] p-7 flex flex-col sm:flex-row items-start sm:items-center gap-6 relative overflow-hidden shadow-lg">
          {/* Glow Blobs */}
          <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-[#F08A4B]/20 pointer-events-none blur-2xl" />
          <div className="absolute -bottom-12 left-1/3 w-36 h-36 rounded-full bg-purple-600/15 pointer-events-none blur-xl" />

          <div className="flex-1 relative z-10 space-y-3">
            <div className="inline-flex items-center gap-1.5 bg-[#F08A4B]/20 border border-[#F08A4B]/40 text-[#FFBA80] text-[10px] font-extrabold tracking-widest uppercase px-3 py-1.5 rounded-full">
              <Trophy className="w-3.5 h-3.5" /> Cạnh tranh
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white leading-snug font-outfit">
              Tham gia lộ trình thi đấu quốc tế
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed max-w-sm font-medium">
              Ôn luyện AMC, AIME và Olympic Toán Quốc Tế với sự hướng dẫn của chuyên gia hàng đầu.
            </p>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => navigate("/courses")}
                className="flex items-center gap-1.5 bg-[#F08A4B] hover:bg-[#E07030] active:scale-95 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer shadow-sm"
              >
                <Zap className="w-3.5 h-3.5" /> Bắt đầu ngay
              </button>
              <button
                onClick={() => navigate("/courses")}
                className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 border border-white/15 text-white/90 text-xs font-semibold px-4 py-2.5 rounded-xl transition-all active:scale-95 cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5" /> Chi tiết
              </button>
            </div>
          </div>

          {/* Stat Pills */}
          <div className="flex sm:flex-col gap-3 relative z-10 flex-shrink-0">
            {compStats.map((s) => (
              <div
                key={s.label}
                className="bg-white/10 border border-white/15 rounded-2xl px-4 py-2.5 min-w-[95px] backdrop-blur-sm"
              >
                <p className="text-base font-black text-[#F08A4B] leading-none font-outfit">
                  {s.num}
                </p>
                <p className="text-[10px] text-slate-300 font-semibold mt-1">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Box */}
      <div className="mt-8 bg-[#FFF8F4] border border-[#FAD7BC] rounded-3xl px-8 py-8 text-center shadow-xs">
        <h3 className="text-xl sm:text-2xl font-extrabold text-[#1A2B47] mb-2 font-outfit">
          Chưa biết chọn khoá học nào?
        </h3>
        <p className="text-sm text-[#6B7A90] mb-5 font-medium">
          Làm bài test/quiz ngắn để nhận gợi ý khoá học phù hợp chính xác với trình độ và mục tiêu của bạn.
        </p>
        <button
          onClick={() => navigate("/practice")}
          className="inline-flex items-center gap-2 bg-[#F08A4B] hover:bg-[#E07030] active:scale-95 text-white text-sm font-bold px-7 py-3 rounded-xl transition-all shadow-md shadow-orange-200 cursor-pointer"
        >
          Làm quiz ngay <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}
