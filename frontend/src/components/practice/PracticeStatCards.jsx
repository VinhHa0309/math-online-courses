import { CheckCircle, BarChart3, Flame } from "lucide-react";

export default function PracticeStats() {
  const stats = [
    {
      label: "Exercises Completed",
      value: "1,284",
      icon: CheckCircle,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Accuracy Rate",
      value: "92%",
      icon: BarChart3,
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
    {
      label: "Learning Streak",
      value: "15 Days",
      icon: Flame,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
  ];

  return (
    /* Responsive: 
       - Mobile (mặc định): grid-cols-1 (1 cột)
       - Tablet (sm:): grid-cols-2 (2 cột)
       - Desktop (md:): grid-cols-3 (3 cột)
    */
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
      {stats.map((s, i) => (
        <div
          key={i}
          className="bg-white p-4 md:p-6 rounded-2xl border border-slate-100 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow"
        >
          {/* Icon Container */}
          <div className={`${s.bg} p-2.5 md:p-3 rounded-xl shrink-0`}>
            <s.icon className={s.color} size={20} />
          </div>

          {/* Text Container */}
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-none mb-1">
              {s.label}
            </p>
            <p className="text-xl md:text-2xl font-black text-[#1A2B47]">
              {s.value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
