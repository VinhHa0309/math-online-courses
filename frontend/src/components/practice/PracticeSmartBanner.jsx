export default function PracticeSmartBanner() {
  return (
    <div className="bg-[#041628] rounded-[24px] md:rounded-[32px] p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group">
      {/* Glow effect - Ẩn trên mobile để đỡ rối */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-[80px] -mr-32 -mt-32 hidden md:block"></div>

      <div className="space-y-4 md:space-y-6 z-10 text-center md:text-left items-center md:items-start flex flex-col">
        <span className="bg-orange-500 text-white text-[9px] md:text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest">
          ✨ AI Recommended
        </span>
        <div className="space-y-2 md:space-y-3">
          <h2 className="text-2xl md:text-3xl font-black text-white leading-tight">
            Smart Practice: <br className="hidden md:block" /> Integration
          </h2>
          <p className="text-slate-400 text-xs md:text-sm max-w-sm leading-relaxed">
            Dựa trên kết quả gần đây, bạn cần cải thiện phần "Tích phân từng
            phần". Dành 15 phút ngay.
          </p>
        </div>
        <button className="w-full md:w-auto bg-white text-[#1A2B47] font-black py-3 md:py-4 px-8 rounded-xl md:rounded-2xl hover:bg-orange-500 hover:text-white transition-all active:scale-95 text-[11px] uppercase tracking-widest shadow-xl">
          Start Smart Session
        </button>
      </div>

      {/* Minh họa - Thu nhỏ trên Mobile */}
      <div className="relative w-48 h-48 md:w-72 md:h-72 z-10 shrink-0">
        <img
          src="https://placehold.co/500x500/041628/F08A4B?text=Math+3D"
          alt="Illustration"
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
        />
      </div>
    </div>
  );
}
