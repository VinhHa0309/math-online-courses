import { useState } from "react";

/* ── SVG Brand Icons ── */
export function GoogleIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
    </svg>
  );
}

// Đường dẫn video trong thư mục public/
const VIDEO_SRC = "/Videos/snaptik_7492439472055782678_v3.mp4";

/* ── Right Panel: Local Video ── */
function RightPanel() {
  const hasVideo = VIDEO_SRC.trim() !== "";

  return (
    <div
      className="hidden lg:flex relative h-screen w-full overflow-hidden items-center justify-center bg-[#060912]"
    >
      {hasVideo && (
        <video
          key={VIDEO_SRC}
          className="absolute inset-0 w-full h-full object-cover z-0"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        >
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>
      )}

      {/* Radial backdrop overlay ON TOP of video for aesthetic look, but semi-transparent */}
      <div
        className="absolute inset-0 pointer-events-none z-10 opacity-70"
        style={{
          background: "radial-gradient(ellipse 80% 70% at 50% 40%, rgba(15, 31, 61, 0.4) 0%, rgba(6, 9, 18, 0.9) 100%)",
        }}
      />

      {/* Brand watermark */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center z-20">
        <div className="flex items-center gap-2 opacity-25">
          <div
            className="w-5 h-5 rounded-md flex items-center justify-center text-[11px] font-black text-white"
            style={{ background: "linear-gradient(135deg, #F08A4B, #e05a1a)" }}
          >
            Σ
          </div>
          <span className="text-white text-[11px] font-bold tracking-[0.18em] uppercase">SuongMath</span>
        </div>
      </div>
    </div>
  );
}

/* ── Input Field Component ── */
export function InputField({ icon: Icon, label, type = "text", placeholder, rightEl, hint, ...rest }) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="space-y-1.5 w-full">
      <div className="flex justify-between items-center px-0.5">
        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">
          {label}
        </label>
        {hint && (
          <button type="button" className="text-[11px] font-semibold text-[#F08A4B] hover:text-[#d97030] transition-colors">
            {hint}
          </button>
        )}
      </div>
      <div className={`relative flex items-center rounded-xl border transition-all duration-200 ${focused
        ? "border-[#F08A4B]/70 bg-white shadow-[0_0_0_4px_rgba(240,138,75,0.08)]"
        : "border-slate-200 bg-slate-50/80 hover:border-slate-300 hover:bg-white"
        }`}>
        {Icon && (
          <div className={`absolute left-3.5 transition-colors duration-200 ${focused ? "text-[#F08A4B]" : "text-slate-400"}`}>
            <Icon size={15} />
          </div>
        )}
        <input
          type={type}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`w-full bg-transparent text-sm text-slate-800 py-3.5 outline-none placeholder-slate-300 ${Icon ? "pl-10" : "pl-4"} ${rightEl ? "pr-10" : "pr-4"}`}
          {...rest}
        />
        {rightEl && <div className="absolute right-3.5">{rightEl}</div>}
      </div>
    </div>
  );
}

/* ── Auth Layout ── */
export default function AuthLayout({ children }) {
  return (
    <div className="h-screen w-full flex bg-white font-sans overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        .auth-font { font-family: 'Inter', sans-serif; }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .slide-up { animation: slideUp 0.4s ease forwards; }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .fade-in { animation: fadeIn 0.35s ease forwards; }
      `}</style>

      {/* ── LEFT: Form Panel ── */}
      <div className="auth-font relative w-full lg:w-[52%] xl:w-[48%] flex flex-col h-full bg-white overflow-hidden">
        {children}
      </div>

      {/* ── RIGHT: TikTok Panel ── */}
      <div className="hidden lg:block flex-1">
        <RightPanel />
      </div>
    </div>
  );
}
