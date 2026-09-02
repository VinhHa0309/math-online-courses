import { Trophy } from "lucide-react";
import { leaderboardUsers } from "../../data/practiceLeaderboard";

export default function PracticeLeaderboard() {
  return (
    <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
      {/* Weekly Leaderboard */}
      <div className="flex-1 bg-white p-6 md:p-8 rounded-[24px] md:rounded-[32px] border border-slate-100 shadow-sm">
        <h3 className="text-lg font-bold text-[#1A2B47] mb-6 flex items-center gap-2">
          <span>🏆 Bảng Xếp Hạng Hàng Tuần</span>
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
                <p className="text-xs md:text-sm font-bold text-[#1A2B47]">
                  {u.name}
                </p>
              </div>
              <p className="text-xs md:text-sm font-extrabold text-[#F08A4B]">
                {u.xp}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Achievement Card */}
      <div className="w-full lg:w-80 bg-[#0D1B2A] p-8 rounded-[24px] md:rounded-[32px] text-center space-y-6 flex flex-col justify-center">
        <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center mx-auto rotate-3 shadow-lg shadow-orange-500/20">
          <Trophy className="text-white" size={32} />
        </div>
        <div className="space-y-2">
          <h4 className="text-xl font-bold text-white">Dũng Sĩ Hình Học</h4>
          <p className="text-slate-400 text-xs leading-relaxed italic">
            Giải chính xác 50 bài toán liên tiếp không mắc lỗi.
          </p>
        </div>
        <div className="bg-white/5 border border-white/10 py-3 rounded-xl text-orange-300 text-[10px] font-bold uppercase tracking-wider">
          Đạt được 2 giờ trước
        </div>
      </div>
    </div>
  );
}
