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

import { smallCards, compStats, studentStats } from "../../data/featured";

const iconMap = {
  Triangle: <Triangle className="w-5 h-5 text-[#F08A4B]" />,
  BarChart2: <BarChart2 className="w-5 h-5 text-[#F08A4B]" />,
};

/* ─── sub-components ────────────────────────────────────── */
function SmallCard({ icon, title, desc, price }) {
  return (
    <div className="border border-[#F2EDE6] rounded-2xl bg-white p-5 flex flex-col gap-3 hover:border-[#FAD7BC] hover:bg-[#FFFAF7] transition-all">
      <div className="w-10 h-10 rounded-xl bg-[#FDF2E9] flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <p
        className="font-bold text-[#1A2B47] text-base leading-snug"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        {title}
      </p>
      <p className="text-xs text-[#6B7A90] leading-relaxed flex-1">{desc}</p>
      <div className="flex items-center justify-between mt-auto pt-2">
        <span className="text-[#1A2B47] font-bold text-base">{price}</span>
        <button className="text-[11px] font-semibold text-[#F08A4B] border border-[#FAD7BC] bg-white px-3 py-1 rounded-lg hover:bg-[#FDF2E9] transition-all">
          Xem chi tiết
        </button>
      </div>
    </div>
  );
}

/* ─── main component ────────────────────────────────────── */
export default function FeaturedSection() {
  return (
    <section className="bg-white py-12 px-6 sm:px-10 font-sans">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&display=swap');`}</style>

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
        <div>
          <p className="text-[11px] font-semibold tracking-widest uppercase text-[#F08A4B] mb-2">
            Khoá học nổi bật
          </p>
          <h2
            className="text-3xl sm:text-4xl font-extrabold text-[#1A2B47] leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Chọn lộ trình <span className="text-[#F08A4B]">của bạn</span>
          </h2>
          <p className="text-sm text-[#9CA3B0] mt-2">
            Các chương trình được thiết kế cho mọi cấp độ toán học.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 text-sm font-semibold text-[#F08A4B] border border-[#FAD7BC] bg-[#FFF8F4] px-4 py-2 rounded-xl hover:bg-[#FDF2E9] hover:border-[#F08A4B] transition-all whitespace-nowrap">
          Xem toàn bộ <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* ── Big Card (Calculus) ── */}
        <div className="md:col-span-2 border border-[#F2EDE6] rounded-2xl overflow-hidden bg-white flex flex-col">
          <div className="relative h-52 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1635070041078-e3fb4fe365c9?w=900&q=80&auto=format&fit=crop"
              alt="Calculus course"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A2B47]/60 to-transparent" />
            <span className="absolute top-3 left-3 bg-[#F08A4B] text-white text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full">
              Bán chạy nhất
            </span>
            <span className="absolute top-3 right-3 bg-white/95 text-[#1A2B47] text-sm font-bold px-3 py-1 rounded-full">
              $199
            </span>
          </div>
          <div className="p-6 flex flex-col gap-3 flex-1">
            <h3
              className="text-xl font-bold text-[#1A2B47] leading-snug"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Kiến trúc Giải Tích
            </h3>
            <p className="text-sm text-[#6B7A90] leading-relaxed flex-1">
              Nắm vững giới hạn, đạo hàm và tích phân thông qua trực quan hoá
              vật lý và lý luận toán học thuần tuý.
            </p>
            <div className="flex flex-wrap gap-4 text-xs text-[#9CA3B0] font-medium">
              <span className="flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[#F08A4B]" /> 128 bài học
              </span>
              <span className="flex items-center gap-1.5">
                <Code className="w-3.5 h-3.5 text-[#F08A4B]" /> 32 bài tập
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#F08A4B]" /> 48 giờ
              </span>
            </div>
            <button className="self-start mt-1 bg-[#1A2B47] hover:bg-[#253D63] active:scale-95 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all">
              Đăng ký ngay →
            </button>
          </div>
        </div>

        {/* ── Small cards column ── */}
        <div className="md:col-span-1 flex flex-col gap-4">
          {smallCards.map((c) => (
            <SmallCard key={c.title} {...c} icon={iconMap[c.iconName]} />
          ))}
        </div>

        {/* ── Student stats card ── */}
        <div className="md:col-span-1 border border-[#F2EDE6] rounded-2xl bg-[#FAFBFC] p-6 flex flex-col gap-5">
          <p
            className="text-base font-bold text-[#1A2B47]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Kết quả học viên
          </p>
          <div className="grid grid-cols-2 gap-y-5">
            {studentStats.map((s, i) => (
              <div
                key={s.label}
                className={i % 2 === 1 ? "pl-5 border-l border-[#F2EDE6]" : ""}
              >
                <p
                  className={`text-2xl font-extrabold leading-none ${s.orange ? "text-[#F08A4B]" : "text-[#1A2B47]"}`}
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {s.num}
                </p>
                <p className="text-[11px] text-[#9CA3B0] font-medium mt-1">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Competitive banner ── */}
        <div className="md:col-span-2 rounded-2xl bg-[#1A2B47] p-7 flex flex-col sm:flex-row items-start sm:items-center gap-6 relative overflow-hidden">
          {/* glow blobs */}
          <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-[#F08A4B]/20 pointer-events-none" />
          <div className="absolute -bottom-12 left-1/3 w-36 h-36 rounded-full bg-purple-600/15 pointer-events-none" />

          <div className="flex-1 relative z-10 space-y-3">
            <div className="inline-flex items-center gap-1.5 bg-[#F08A4B]/20 border border-[#F08A4B]/40 text-[#FFBA80] text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full">
              <Trophy className="w-3 h-3" /> Cạnh tranh
            </div>
            <h3
              className="text-xl font-extrabold text-white leading-snug"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Tham gia lộ trình thi đấu quốc tế
            </h3>
            <p className="text-xs text-white/50 leading-relaxed max-w-sm">
              Ôn luyện AMC, AIME và Olympic Toán Quốc Tế với sự hướng dẫn của
              chuyên gia hàng đầu.
            </p>
            <div className="flex gap-3 pt-1">
              <button className="flex items-center gap-1.5 bg-[#F08A4B] hover:bg-[#E07030] active:scale-95 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all">
                <Zap className="w-3.5 h-3.5" /> Bắt đầu ngay
              </button>
              <button className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 border border-white/15 text-white/80 text-xs font-semibold px-4 py-2.5 rounded-xl transition-all active:scale-95">
                <BookOpen className="w-3.5 h-3.5" /> Chi tiết
              </button>
            </div>
          </div>

          {/* stat pills */}
          <div className="flex sm:flex-col gap-3 relative z-10 flex-shrink-0">
            {compStats.map((s) => (
              <div
                key={s.label}
                className="bg-white/7 border border-white/10 rounded-xl px-4 py-2.5 min-w-[90px]"
              >
                <p
                  className="text-base font-extrabold text-[#F08A4B] leading-none"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {s.num}
                </p>
                <p className="text-[10px] text-white/40 font-medium mt-1">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-6 bg-[#FFF8F4] border border-[#FAD7BC] rounded-2xl px-8 py-8 text-center">
        <h3
          className="text-xl font-bold text-[#1A2B47] mb-2"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Chưa biết chọn khoá nào?
        </h3>
        <p className="text-sm text-[#9CA3B0] mb-5">
          Làm bài quiz để nhận gợi ý khoá học phù hợp với trình độ và mục tiêu
          của bạn.
        </p>
        <button className="inline-flex items-center gap-2 bg-[#F08A4B] hover:bg-[#E07030] active:scale-95 text-white text-sm font-bold px-7 py-3 rounded-xl transition-all shadow-md shadow-orange-200">
          Làm quiz ngay <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}
