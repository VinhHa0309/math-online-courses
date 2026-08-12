import { useState } from "react";

// ── Modal Form Đăng Ký ───────────────────────────────────────────────────────
function RegisterModal({ onClose }) {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    grade: "",
    course: "",
    note: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8085/api/contact/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Có lỗi xảy ra, vui lòng thử lại!");
        return;
      }
      setSubmitted(true);
    } catch {
      alert("Không kết nối được tới server. Vui lòng thử lại sau!");
    } finally {
      setLoading(false);
    }
  };

  // Click backdrop để đóng
  const handleBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      onClick={handleBackdrop}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(5,17,36,0.75)", backdropFilter: "blur(8px)" }}
    >
      {/* Card */}
      <div
        className="relative w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0a1628 0%, #0d1f3c 60%, #091525 100%)",
          border: "1px solid rgba(255,255,255,0.08)",
          animation: "modal-in 0.35s cubic-bezier(.34,1.56,.64,1)",
        }}
      >
        {/* Glow top */}
        <div
          className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 70%)" }}
        />

        {/* Header */}
        <div className="relative z-10 px-8 pt-8 pb-6 border-b border-white/10">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #FFA24E, #f97316)" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c3 3 9 3 12 0v-5" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white leading-tight">Đăng ký khóa học</h3>
              <p className="text-xs text-slate-400">SuongMath · Đội ngũ sẽ liên hệ trong 24h</p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="relative z-10 px-8 py-6">
          {submitted ? (
            // ── Success State ──
            <div className="flex flex-col items-center gap-4 py-8 text-center">
              <div className="w-20 h-20 rounded-full flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #10b981, #059669)", boxShadow: "0 0 40px rgba(16,185,129,0.4)" }}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              <div>
                <p className="text-xl font-bold text-white">Đăng ký thành công! 🎉</p>
                <p className="text-slate-400 text-sm mt-2 max-w-xs">
                  Chúng tôi đã nhận được thông tin của <span className="text-white font-semibold">{form.fullName}</span>.
                  Đội ngũ sẽ liên hệ qua <span className="text-[#FFA24E]">{form.phone}</span> trong thời gian sớm nhất!
                </p>
              </div>
              <button
                onClick={onClose}
                className="mt-2 px-8 py-2.5 rounded-xl font-bold text-sm text-white transition-all hover:opacity-80"
                style={{ background: "linear-gradient(135deg, #6366f1, #4f46e5)" }}
              >
                Đóng
              </button>
            </div>
          ) : (
            // ── Form ──
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Họ tên */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Họ và tên học sinh <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                    </svg>
                  </span>
                  <input
                    type="text" name="fullName" required
                    placeholder="Nguyễn Văn A"
                    value={form.fullName} onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 rounded-xl text-sm text-white placeholder-slate-500 outline-none transition-all"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                    onFocus={e => e.target.style.borderColor = "rgba(99,102,241,0.6)"}
                    onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                  />
                </div>
              </div>

              {/* Số điện thoại + Email (2 cột) */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    Số điện thoại <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 .18h3a2 2 0 012 1.72c.127 1.05.36 2.08.7 3.07a2 2 0 01-.45 2.11L6.09 8.25a16 16 0 006.29 6.29l1.17-1.16a2 2 0 012.11-.45c.99.34 2.02.57 3.07.7A2 2 0 0122 16.92z" />
                      </svg>
                    </span>
                    <input
                      type="tel" name="phone" required
                      placeholder="0901 234 567"
                      value={form.phone} onChange={handleChange}
                      className="w-full pl-10 pr-3 py-3 rounded-xl text-sm text-white placeholder-slate-500 outline-none transition-all"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                      onFocus={e => e.target.style.borderColor = "rgba(99,102,241,0.6)"}
                      onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Email</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="4" width="20" height="16" rx="2" /><path d="M22 7l-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" />
                      </svg>
                    </span>
                    <input
                      type="email" name="email"
                      placeholder="email@gmail.com"
                      value={form.email} onChange={handleChange}
                      className="w-full pl-10 pr-3 py-3 rounded-xl text-sm text-white placeholder-slate-500 outline-none transition-all"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                      onFocus={e => e.target.style.borderColor = "rgba(99,102,241,0.6)"}
                      onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                    />
                  </div>
                </div>
              </div>

              {/* Lớp + Khóa học quan tâm */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Lớp hiện tại</label>
                  <select
                    name="grade" value={form.grade} onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none appearance-none transition-all"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: form.grade ? "white" : "#64748b" }}
                    onFocus={e => e.target.style.borderColor = "rgba(99,102,241,0.6)"}
                    onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                  >
                    <option value="" style={{ background: "#0d1f3c" }}>-- Chọn lớp --</option>
                    {["Lớp 6","Lớp 7","Lớp 8","Lớp 9","Lớp 10","Lớp 11","Lớp 12","Đại học / Khác"].map(g => (
                      <option key={g} value={g} style={{ background: "#0d1f3c" }}>{g}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Khóa học quan tâm</label>
                  <select
                    name="course" value={form.course} onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none appearance-none transition-all"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: form.course ? "white" : "#64748b" }}
                    onFocus={e => e.target.style.borderColor = "rgba(99,102,241,0.6)"}
                    onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                  >
                    <option value="" style={{ background: "#0d1f3c" }}>-- Chọn khóa --</option>
                    {["Toán cơ bản","Giải tích","Đại số tuyến tính","Hình học","Luyện thi THPT","Toán đại học"].map(c => (
                      <option key={c} value={c} style={{ background: "#0d1f3c" }}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Ghi chú */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Ghi chú thêm</label>
                <textarea
                  name="note" rows={2}
                  placeholder="Bạn muốn học thêm vào buổi tối, hoặc có câu hỏi đặc biệt nào không?..."
                  value={form.note} onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-slate-500 outline-none resize-none transition-all"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                  onFocus={e => e.target.style.borderColor = "rgba(99,102,241,0.6)"}
                  onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl font-bold text-white text-sm transition-all hover:opacity-90 active:scale-95 disabled:opacity-60 flex items-center justify-center gap-2 mt-1"
                style={{
                  background: loading
                    ? "rgba(99,102,241,0.5)"
                    : "linear-gradient(135deg, #FFA24E 0%, #f97316 50%, #ea580c 100%)",
                  boxShadow: loading ? "none" : "0 8px 24px rgba(255,162,78,0.35)",
                }}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" opacity=".25" />
                      <path d="M21 12a9 9 0 00-9-9" strokeLinecap="round" />
                    </svg>
                    Đang gửi...
                  </>
                ) : (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                    </svg>
                    Gửi đăng ký ngay
                  </>
                )}
              </button>

              <p className="text-center text-[11px] text-slate-500 mt-1">
                🔒 Thông tin của bạn được bảo mật tuyệt đối
              </p>
            </form>
          )}
        </div>
      </div>

      <style>{`
        @keyframes modal-in {
          from { opacity: 0; transform: scale(0.88) translateY(24px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}

// ── CTASection ────────────────────────────────────────────────────────────────
const CTASection = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <section className="py-8 md:py-12 lg:py-16 px-4 md:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#051124] via-[#0a1f2e] to-[#051124] rounded-3xl md:rounded-4xl lg:rounded-[48px] p-8 md:p-12 lg:p-16 text-center relative overflow-hidden group">
          {/* Hiệu ứng glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-blue-500/15 blur-[80px] md:blur-[100px] lg:blur-[120px] rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute -top-20 -right-20 w-40 h-40 md:w-52 md:h-52 bg-cyan-400/5 blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          {/* Nội dung */}
          <div className="relative z-10">
            {/* Tiêu đề chính */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 lg:mb-8 leading-tight">
              Bắt đầu hành trình
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#FFA24E] to-cyan-400">
                Toán học của bạn ngay hôm nay
              </span>
            </h2>

            {/* Tiêu đề phụ */}
            <p className="text-gray-400 text-sm md:text-base lg:text-lg mb-8 md:mb-10 lg:mb-12 max-w-2xl mx-auto leading-relaxed px-2">
              Cùng hàng nghìn học sinh chinh phục các khái niệm phức tạp một cách chính xác và rõ ràng. Thay đổi trải nghiệm học tập của bạn ngay bây giờ.
            </p>

            {/* Các nút CTA */}
            <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 lg:gap-6 flex-wrap">
              {/* Nút chính — mở modal */}
              <button
                onClick={() => setShowModal(true)}
                className="bg-[#FFA24E] hover:bg-[#F08A4B] active:scale-95 text-[#051124] font-bold px-6 md:px-8 lg:px-10 py-3 md:py-4 lg:py-5 rounded-lg md:rounded-xl transition-all duration-300 shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 hover:-translate-y-1 group/btn w-full sm:w-auto"
              >
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="w-5 h-5 md:w-6 md:h-6 group-hover/btn:translate-x-1 transition-transform"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 10 10.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Đăng ký ngay
                </span>
              </button>

              {/* Nút phụ */}
              <button className="bg-[#1A2B47] hover:bg-[#243B5E] active:scale-95 text-white font-bold px-6 md:px-8 lg:px-10 py-3 md:py-4 lg:py-5 rounded-lg md:rounded-xl border border-white/20 hover:border-white/40 transition-all duration-300 hover:-translate-y-1 w-full sm:w-auto">
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="w-5 h-5 md:w-6 md:h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Học thử miễn phí
                </span>
              </button>
            </div>

            {/* Huy hiệu tin cậy */}
            <div className="mt-10 md:mt-14 lg:mt-16 pt-8 md:pt-10 border-t border-white/10">
              <p className="text-gray-500 text-xs md:text-sm font-medium mb-3 md:mb-4">
                ✓ Được tin dùng bởi 2.400+ học sinh trên toàn quốc
              </p>
              <div className="flex justify-center items-center gap-2 md:gap-3 opacity-70 hover:opacity-100 transition-opacity">
                <div className="flex -space-x-1">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-[#051124]"
                      style={{
                        opacity: 0.8 - i * 0.15,
                        background: `linear-gradient(135deg, hsl(${30 + i * 20}, 100%, 60%), hsl(${190 + i * 5}, 100%, 60%))`,
                      }}
                    />
                  ))}
                </div>
                <span className="text-gray-400 text-xs md:text-sm">
                  Và thêm nhiều bạn mới mỗi tuần
                </span>
              </div>
            </div>
          </div>

          {/* Viền trang trí */}
          <div className="absolute inset-0 rounded-3xl md:rounded-4xl lg:rounded-[48px] pointer-events-none border border-white/5 group-hover:border-white/10 transition-colors duration-500"></div>
        </div>
      </section>

      {/* Modal */}
      {showModal && <RegisterModal onClose={() => setShowModal(false)} />}
    </>
  );
};

export default CTASection;
