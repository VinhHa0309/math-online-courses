import { useState } from "react";
import { Send } from "lucide-react";

export default function NewsletterBox({ variant = "sidebar" }) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  if (variant === "banner") {
    return (
      <div className="bg-[#0B172A] rounded-3xl p-8 md:p-10 text-white shadow-md relative overflow-hidden my-12">
        {/* Decorative background shapes */}
        <div className="absolute -right-16 -top-16 w-48 h-48 rounded-full bg-blue-500/10 blur-3xl"></div>
        <div className="absolute -left-16 -bottom-16 w-48 h-48 rounded-full bg-orange-500/10 blur-3xl"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left info */}
          <div className="lg:col-span-7 space-y-3">
            <h3 className="text-xl sm:text-2xl font-black tracking-tight flex items-center gap-2">
              <span>Bản tin học tập</span>
              <span className="w-2 h-2 rounded-full bg-[#F08A4B]"></span>
            </h3>
            <p className="text-sm text-slate-300 max-w-xl leading-relaxed">
              Đăng ký để nhận những tài liệu ôn thi chất lượng cao, bộ đề thi thử độc quyền và bí kíp học tập từ các chuyên gia Mathematiq mới nhất mỗi tuần.
            </p>
          </div>

          {/* Right form */}
          <form onSubmit={handleSubscribe} className="lg:col-span-5 flex flex-col sm:flex-row gap-3 w-full">
            <input
              type="email"
              required
              placeholder="Email của bạn..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-[#1A293E] text-white text-sm placeholder-slate-400 rounded-xl px-4 py-3.5 outline-none border border-slate-800 focus:border-[#F08A4B] transition-all"
            />
            <button
              type="submit"
              className="bg-[#A15C1E] hover:bg-[#864A15] text-white text-sm font-bold px-6 py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 active:scale-[0.98] shrink-0"
            >
              {subscribed ? (
                <>Đã đăng ký!</>
              ) : (
                <>
                  <span>Đăng ký ngay</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Default compact sidebar variant
  return (
    <div className="bg-[#0B172A] rounded-2xl p-6 text-white space-y-4 shadow-md relative overflow-hidden">
      {/* Decorative background shape */}
      <div className="absolute -right-16 -top-16 w-36 h-36 rounded-full bg-blue-500/10 blur-2xl"></div>
      
      <div className="space-y-2 relative z-10">
        <h3 className="text-lg font-black tracking-tight">Bản tin học tập</h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          Đăng ký để nhận những tài liệu ôn thi và bí kíp học tập mới nhất mỗi tuần.
        </p>
      </div>

      <form onSubmit={handleSubscribe} className="space-y-3 relative z-10">
        <input
          type="email"
          required
          placeholder="Email của bạn"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-[#1A293E] text-white text-xs placeholder-slate-400 rounded-xl px-4 py-3 outline-none border border-slate-800 focus:border-[#F08A4B] transition-all"
        />
        <button
          type="submit"
          className="w-full bg-[#A15C1E] hover:bg-[#864A15] text-white text-xs font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
        >
          {subscribed ? (
            <>Đã đăng ký!</>
          ) : (
            <>
              <span>Đăng ký ngay</span>
              <Send className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
