import { PlayCircle, CheckCircle2, Lock } from "lucide-react";

export default function LessonList({ activeChapter, activeLessonId, onSelectLesson }) {
  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden sticky top-24">
      {/* Header Sidebar */}
      <div className="p-5 border-b border-[#E2E8F0] bg-[#F8FAFC]/50">
        <h3 className="font-outfit font-bold text-lg text-[#1A2B47]">Nội dung khóa học</h3>
        <p className="text-xs text-[#6B7A90] font-dmsans mt-0.5">
          {activeChapter.title}
        </p>
      </div>

      {/* List Lessons */}
      <div className="p-2 space-y-1.5 max-h-[calc(100vh-280px)] overflow-y-auto">
        {activeChapter.lessons.map((lesson) => {
          const isActive = lesson.id === activeLessonId;
          const isCompleted = lesson.status === "completed";
          const isLocked = lesson.status === "locked";

          return (
            <button
              key={lesson.id}
              onClick={() => onSelectLesson(lesson)}
              className={`w-full text-left p-3.5 rounded-xl transition-all flex items-start gap-3 border ${
                isActive
                  ? "bg-[#FFF9F5] border-[#FCD4BA] text-[#F08A4B]"
                  : "bg-white border-transparent text-[#4A5568] hover:bg-[#F8FAFC]"
              } ${isLocked ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
            >
              {/* Status Icons */}
              <div className="mt-0.5 shrink-0">
                {isCompleted && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-50" />
                )}
                {isActive && (
                  <PlayCircle className="w-5 h-5 text-[#F08A4B]" />
                )}
                {isLocked && (
                  <Lock className="w-5 h-5 text-[#9CA3B0]" />
                )}
              </div>

              {/* Lesson Details */}
              <div className="flex-1 space-y-1">
                <h4 className={`text-sm font-semibold leading-tight line-clamp-2 ${
                  isActive ? "text-[#1A2B47]" : ""
                }`}>
                  {lesson.title}
                </h4>
                <div className="flex items-center justify-between text-xs text-[#6B7A90] font-medium">
                  <span className={isActive ? "text-[#F08A4B] font-bold" : ""}>
                    {isActive ? "Đang phát" : isCompleted ? "Đã học" : "Đang khóa"}
                  </span>
                  <span>{lesson.duration}</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
