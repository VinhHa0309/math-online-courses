import PracticeStatCards from "../../components/practice/PracticeStatCards";
import PracticeSmartBanner from "../../components/practice/PracticeSmartBanner";
import PracticeTopicCard from "../../components/practice/PracticeTopicCard";
import PracticeLeaderboard from "../../components/practice/PracticeLeaderboard";
import { practiceTopics } from "../../data/practiceTopics";

export default function PracticePage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
      <div className="space-y-2">
        <h1 className="text-4xl font-black text-[#1A2B47] tracking-tight">
          Practice Arena
        </h1>
        <p className="text-slate-400 font-medium">
          Master mathematical concepts through targeted exercise sets.
        </p>
      </div>

      <PracticeStatCards />
      <PracticeSmartBanner />

      <div className="space-y-8">
        <div className="flex justify-between items-end">
          <h3 className="text-2xl font-black text-[#1A2B47]">
            Topical Practice
          </h3>
          <button className="text-xs font-black text-orange-500 uppercase tracking-widest hover:underline">
            View All Topics
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
