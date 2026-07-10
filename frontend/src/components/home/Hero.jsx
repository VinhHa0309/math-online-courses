import { useState } from "react";
import { Search, Check, TrendingUp, Users } from "lucide-react";

import { heroLessons } from "../../data/heroLessons";

const PILL_STYLES = {
  done: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/25",
  new: "bg-orange-500/15 text-orange-300 border border-orange-500/25",
  upcoming: "bg-slate-500/15 text-slate-400 border border-slate-500/25",
};

const PILL_LABELS = { done: "Xong", new: "Mới", upcoming: "Sắp tới" };

const NUM_STYLES = {
  done: "bg-emerald-500/15 text-emerald-400",
  new: "bg-orange-500/15 text-orange-400",
  upcoming: "bg-slate-500/15 text-slate-400",
};

export default function Hero() {
  const [query, setQuery] = useState("");

  return (
    <div className="w-full bg-[#0D1B2A] font-sans">
      {/* ── decorative layers ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle,rgba(240,138,75,0.18) 0%,transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-0 left-1/3 w-72 h-72 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle,rgba(83,74,183,0.15) 0%,transparent 70%)",
        }}
      />

      {/* ── main grid ── */}
      <section className="relative max-w-6xl mx-auto px-6 sm:px-10 py-16 sm:py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* ════════ LEFT ════════ */}
        <div className="space-y-7">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 text-orange-300 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse" />
            Mới: Chuỗi Giải Tích Đa Biến
          </div>

          {/* Title */}
          <h1
            className="text-4xl sm:text-5xl font-extrabold text-[#F2EDE6] leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Thành thạo ngôn ngữ
            <br />
            của <span className="text-[#F08A4B]">Vũ Trụ</span>
          </h1>

          {/* Description */}
          <p className="text-[#8A9BB0] text-base sm:text-lg leading-relaxed max-w-md">
            Trải nghiệm toán học chuyên sâu qua hình ảnh 3D sống động và bài tập
            tương tác — được thiết kế cho sự xuất sắc học thuật.
          </p>

          {/* Search row */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4A5A6B]" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Bạn muốn học gì hôm nay?"
                className="w-full bg-white/5 border border-white/10 text-[#E8E0D5] placeholder-[#4A5A6B] pl-11 pr-4 py-3.5 rounded-xl text-sm focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/30 transition"
              />
            </div>
            <button className="bg-[#F08A4B] hover:bg-[#E07030] active:scale-95 text-white font-semibold text-sm px-7 py-3.5 rounded-xl transition-all whitespace-nowrap">
              Khám phá
            </button>
          </div>

          {/* Stats */}
          <div className="flex gap-0 pt-2">
            {[
              { num: "15k+", label: "Học viên" },
              { num: "200+", label: "Modules" },
              { num: "98%", label: "Hài lòng" },
            ].map((s, i) => (
              <div
                key={s.label}
                className={`pr-8 ${i > 0 ? "pl-8 border-l border-white/10" : ""}`}
              >
                <p
                  className="text-2xl sm:text-3xl font-bold text-[#F2EDE6]"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {s.num}
                </p>
                <p className="text-[10px] font-semibold text-[#4A5A6B] uppercase tracking-widest mt-1">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ════════ RIGHT ════════ */}
        <div className="relative">
          {/* Floating top-right card */}
          <div className="absolute -top-5 -right-4 z-20 bg-[#1D2E42] border border-white/10 rounded-2xl px-4 py-2.5 flex items-center gap-3 shadow-xl animate-[float_3s_ease-in-out_infinite]">
            <div className="w-8 h-8 rounded-lg bg-orange-500/15 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-[#F08A4B]" />
            </div>
            <div>
              <p className="text-[9px] font-semibold text-[#4A5A6B] uppercase tracking-widest">
                Tỉ lệ thành thạo
              </p>
              <p className="text-lg font-bold text-[#F2EDE6] leading-tight">
                +84%
              </p>
            </div>
          </div>

          {/* Main card */}
          <div className="bg-[#14253A] border border-white/8 rounded-2xl overflow-hidden">
            {/* Card top — formula area */}
            <div className="relative bg-gradient-to-br from-[#1A2F47] to-[#0D1E30] h-44 flex items-center justify-center overflow-hidden">
              {/* Decorative rings */}
              <div className="absolute -top-14 -right-10 w-48 h-48 rounded-full border border-orange-500/15" />
              <div className="absolute -bottom-8 -left-4 w-28 h-28 rounded-full border border-purple-500/20" />
              <div className="absolute top-4 left-10 w-14 h-14 rounded-full border border-orange-500/10" />

              {/* Formula */}
              <div className="relative z-10 bg-white/7 border border-white/12 rounded-xl px-6 py-4 text-center backdrop-blur-sm">
                <p className="text-[9px] font-semibold text-[#4A5A6B] uppercase tracking-widest mb-2">
                  Công thức nổi bật
                </p>
                <p className="font-mono text-[#F2EDE6] text-base leading-relaxed">
                  ∫<sub>0</sub>
                  <sup>∞</sup> e<sup>−x²</sup> dx ={" "}
                  <span className="text-[#F08A4B]">√π</span> / 2
                </p>
              </div>
            </div>

            {/* Card body — lessons */}
            <div className="p-5">
              <p className="text-[9px] font-semibold text-[#4A5A6B] uppercase tracking-widest mb-3">
                Bài học gần đây
              </p>
              <div className="space-y-2">
                {heroLessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className="flex items-center gap-3 p-3 bg-white/3 border border-white/6 rounded-xl hover:bg-white/7 hover:border-orange-500/25 transition-all cursor-pointer group"
                  >
                    {/* Number / check */}
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold ${NUM_STYLES[lesson.status]}`}
                    >
                      {lesson.status === "done" ? (
                        <Check className="w-3.5 h-3.5" />
                      ) : (
                        String(lesson.id).padStart(2, "0")
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#C8D5E3] truncate group-hover:text-[#F2EDE6] transition-colors">
                        {lesson.title}
                      </p>
                      <p className="text-[11px] text-[#4A5A6B] mt-0.5">
                        {lesson.chapter} · {lesson.duration}
                      </p>
                    </div>

                    {/* Pill */}
                    <span
                      className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full flex-shrink-0 ${PILL_STYLES[lesson.status]}`}
                    >
                      {PILL_LABELS[lesson.status]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Floating bottom-left card */}
          <div className="absolute -bottom-4 -left-4 z-20 bg-[#1D2E42] border border-white/10 rounded-2xl px-4 py-2.5 shadow-xl animate-[float2_3.5s_ease-in-out_infinite]">
            <div className="flex items-center gap-3">
              <div className="flex">
                {[
                  {
                    initials: "TH",
                    bg: "bg-[#534AB7]",
                    text: "text-[#CECBF6]",
                  },
                  {
                    initials: "LN",
                    bg: "bg-[#0F6E56]",
                    text: "text-[#9FE1CB]",
                  },
                  {
                    initials: "PQ",
                    bg: "bg-[#993C1D]",
                    text: "text-[#F5C4B3]",
                  },
                ].map((av, i) => (
                  <div
                    key={av.initials}
                    className={`w-6 h-6 rounded-full border-2 border-[#1D2E42] flex items-center justify-center text-[8px] font-bold ${av.bg} ${av.text} ${i > 0 ? "-ml-1.5" : ""}`}
                  >
                    {av.initials}
                  </div>
                ))}
              </div>
              <p className="text-xs text-[#8A9BB0]">
                <span className="text-[#E8E0D5] font-semibold">+240</span> đã
                tham gia tuần này
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Keyframe animations via a style tag */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&display=swap');
        @keyframes float  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        @keyframes float2 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
      `}</style>
    </div>
  );
}
