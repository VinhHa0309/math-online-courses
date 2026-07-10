import { Trophy } from "lucide-react";
import { leaderboardUsers } from "../../data/practiceLeaderboard";

export default function PracticeLeaderboard() {
  return (
    <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
      {/* Weekly Leaderboard - Chiếm hết chiều rộng trên Mobile */}
      <div className="flex-1 bg-white p-6 md:p-8 rounded-[24px] md:rounded-[32px] border border-slate-100 shadow-sm">
        <h3 className="text-lg font-black text-[#1A2B47] mb-6">
          Weekly Leaderboard
        </h3>
        <div className="space-y-3">
          {leaderboardUsers.map((u, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-3 md:p-4 rounded-2xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100"
            >
              <div className="flex items-center gap-3 md:gap-4">
                <span className="text-sm font-black text-slate-300 w-4">
                  {u.rank}
                </span>
                <img
                  src={u.img}
                  className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                  alt={u.name}
                />
                <p className="text-xs md:text-sm font-black text-[#1A2B47]">
                  {u.name}
                </p>
              </div>
              <p className="text-xs md:text-sm font-black text-[#1A2B47]">
                {u.xp}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Achievement Card - Nằm dưới trên Mobile, rộng 320px trên Desktop */}
      <div className="w-full lg:w-80 bg-[#0D1B2A] p-8 rounded-[24px] md:rounded-[32px] text-center space-y-6 flex flex-col justify-center">
        <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center mx-auto rotate-3 shadow-lg shadow-orange-500/20">
          <Trophy className="text-white" size={32} />
        </div>
        <div className="space-y-2">
          <h4 className="text-xl font-black text-white">Geometry Titan</h4>
          <p className="text-slate-500 text-[11px] leading-relaxed italic">
            Giải 50 bài toán chính xác liên tiếp.
          </p>
        </div>
        <div className="bg-white/5 border border-white/10 py-3 rounded-xl text-white text-[9px] font-black uppercase tracking-widest">
          Earned 2h ago
        </div>
      </div>
    </div>
  );
}
