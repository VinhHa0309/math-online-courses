export default function QuestionArea({
  topic,
  questionText,
  subText,
  formula,
}) {
  return (
    <div className="space-y-6 md:space-y-8 text-center items-center flex flex-col">
      {/* Tag chủ đề */}
      <span className="bg-slate-50 border border-slate-100 text-[#1A2B47]/60 text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-inner">
        {topic}
      </span>

      {/* Đề bài */}
      <div className="space-y-2.5 max-w-lg">
        <h2 className="text-2xl md:text-3xl font-black text-[#1A2B47] tracking-tight leading-tight">
          {questionText}
        </h2>
        {subText && (
          <p className="text-slate-400 text-xs md:text-sm px-4 leading-relaxed">
            {subText}
          </p>
        )}
      </div>

      {/* Khu vực công thức toán học - Place holder */}
      <div className="w-full max-w-sm md:max-w-xl aspect-[16/7] md:aspect-[16/6] bg-slate-50/50 rounded-3xl border border-slate-100 flex items-center justify-center p-8 md:p-12 relative group shadow-inner">
        {/* Decorative corner */}
        <div className="absolute top-0 right-0 w-8 h-8 bg-white rounded-bl-3xl border-l border-b border-slate-100 group-hover:scale-110 transition-transform"></div>

        {/* Placeholder cho công thức LaTeX */}
        <div className="text-3xl md:text-5xl font-serif font-medium text-[#1A2B47] tabular-nums tracking-wider group-hover:scale-105 transition-transform duration-500">
          {formula}
        </div>
      </div>
    </div>
  );
}
