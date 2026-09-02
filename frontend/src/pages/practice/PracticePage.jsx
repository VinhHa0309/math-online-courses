import PracticeStatCards from "../../components/practice/PracticeStatCards";
import PracticeSmartBanner from "../../components/practice/PracticeSmartBanner";
import PracticeTopicCard from "../../components/practice/PracticeTopicCard";
import PracticeLeaderboard from "../../components/practice/PracticeLeaderboard";
import { practiceTopics } from "../../data/practiceTopics";

export default function PracticePage() {
  return (
    <div className="max-w-7xl mx-auto px-5 sm:px-8 py-10 space-y-10 font-dmsans">
      {/* Header tiêu đề */}
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1A2B47] tracking-tight">
          Đấu Trường Luyện Tập
        </h1>
        <p className="text-slate-500 text-sm sm:text-base font-medium max-w-2xl">
          Rèn luyện kiến thức Toán THPT (Lớp 10, 11, 12) qua các bộ đề chuyên đề được cá nhân hóa bởi AI.
        </p>
      </div>

      <PracticeStatCards />
      <PracticeSmartBanner />

      <div className="space-y-6">
        <div className="flex justify-between items-end border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#1A2B47]">
              Chủ Đề Luyện Tập THPT
            </h3>
            <p className="text-xs text-slate-400 mt-1">Chọn chủ đề toán học bạn muốn rèn luyện hôm nay</p>
          </div>
          <button className="text-xs font-bold text-orange-500 uppercase tracking-wider hover:underline">
            Xem tất cả
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {practiceTopics.map((t, i) => (
            <PracticeTopicCard key={i} {...t} />
          ))}
        </div>
      </div>

      <PracticeLeaderboard />
    </div>
  );
}
