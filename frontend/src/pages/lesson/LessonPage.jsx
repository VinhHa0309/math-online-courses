import { useState } from "react";
import {
  CheckCircle2,
  Lock,
  PlayCircle,
  ChevronDown,
  ChevronUp,
  FileText,
  Download,
  BookOpen,
  PenLine,
  Folder,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/layout/Header";
import { MOCK_COURSE, MOCK_CHAPTERS, MOCK_LESSON } from "../../data/lessonData";

/* ─────────────────────────────────────────
   SIDEBAR: Danh sách chương & bài học
───────────────────────────────────────── */
function LessonSidebar({ chapters, currentLessonId, onSelectLesson }) {
  const [openChapters, setOpenChapters] = useState([1]);

  const toggleChapter = (id) => {
    setOpenChapters((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const statusIcon = (status) => {
    if (status === "done")
      return <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />;
    if (status === "playing")
      return (
        <div className="w-4 h-4 rounded-full bg-[#F08A4B] flex items-center justify-center shrink-0">
          <div className="w-2 h-2 rounded-full bg-white" />
        </div>
      );
    return <Lock size={14} className="text-slate-300 shrink-0" />;
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header sidebar */}
      <div className="px-5 py-4 border-b border-slate-100">
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#F08A4B] mb-0.5">
          Nội dung khóa học
        </p>
        <h2 className="text-sm font-black text-[#1A2B47] leading-snug line-clamp-2">
          {MOCK_COURSE.title}
        </h2>
      </div>

      {/* Chapter list */}
      <div className="flex-1 overflow-y-auto">
        {chapters.map((chapter) => {
          const isOpen = openChapters.includes(chapter.id);
          return (
            <div key={chapter.id} className="border-b border-slate-50">
              {/* Chapter header */}
              <button
                onClick={() => toggleChapter(chapter.id)}
                className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-slate-50 transition-colors text-left"
              >
                <span className="text-xs font-bold text-[#1A2B47] leading-snug pr-2">
                  {chapter.title}
                </span>
                {isOpen ? (
                  <ChevronUp size={14} className="text-slate-400 shrink-0" />
                ) : (
                  <ChevronDown size={14} className="text-slate-400 shrink-0" />
                )}
              </button>

              {/* Lesson list */}
              {isOpen && (
                <div className="pb-1">
                  {chapter.lessons.map((lesson) => {
                    const isActive = lesson.id === currentLessonId;
                    const isLocked = lesson.status === "locked";
                    return (
                      <button
                        key={lesson.id}
                        disabled={isLocked}
                        onClick={() => !isLocked && onSelectLesson(lesson)}
                        className={`w-full flex items-start gap-3 px-5 py-2.5 text-left transition-all group
                          ${isActive ? "bg-[#FFF8F3]" : "hover:bg-slate-50"}
                          ${isLocked ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                        `}
                      >
                        <div className="mt-0.5">{statusIcon(lesson.status)}</div>
                        <div className="flex-1 min-w-0">
                          <p
                            className={`text-xs font-semibold leading-snug line-clamp-2 ${
                              isActive
                                ? "text-[#F08A4B]"
                                : "text-[#1A2B47] group-hover:text-[#F08A4B]"
                            }`}
                          >
                            {lesson.title}
                          </p>
                          <p className="text-[10px] text-slate-400 mt-0.5 font-medium">
                            {isActive && lesson.status === "playing"
                              ? "Đang phát · "
                              : ""}
                            {lesson.duration}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   VIDEO PLAYER (YouTube embed)
───────────────────────────────────────── */
function VideoPlayer({ videoId, title }) {
  return (
    <div className="relative w-full bg-[#0F172A] aspect-video overflow-hidden">
      {/* YouTube iframe */}
      <iframe
        key={videoId}
        src={`https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0&modestbranding=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
}

/* ─────────────────────────────────────────
   TAB CONTENT: Tổng quan
───────────────────────────────────────── */
function OverviewTab({ lesson }) {
  return (
    <div className="py-6 space-y-5">
      <div>
        <h3 className="text-base font-black text-[#1A2B47] mb-3">
          Về bài học này
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
          {lesson.overview}
        </p>
      </div>

      {/* Nội dung nổi bật */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
        {[
          { icon: PlayCircle, label: "Video bài giảng", value: "15:30 phút" },
          { icon: FileText, label: "Tài liệu đính kèm", value: "3 files" },
          { icon: BookOpen, label: "Bài tập luyện", value: "12 câu hỏi" },
        ].map(({ icon: Icon, label, value }) => (
          <div
            key={label}
            className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100"
          >
            <div className="w-8 h-8 rounded-lg bg-[#FDF2E9] flex items-center justify-center shrink-0">
              <Icon size={16} className="text-[#F08A4B]" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wide">
                {label}
              </p>
              <p className="text-xs font-black text-[#1A2B47]">{value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   TAB CONTENT: Ghi chú
───────────────────────────────────────── */
function NotesTab() {
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="py-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-black text-[#1A2B47]">Ghi chú của tôi</h3>
        <button
          onClick={handleSave}
          className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg transition-all ${
            saved
              ? "bg-emerald-50 text-emerald-600"
              : "bg-[#FDF2E9] text-[#F08A4B] hover:bg-[#FAD7BC]"
          }`}
        >
          {saved ? (
            <>
              <CheckCircle2 size={13} /> Đã lưu
            </>
          ) : (
            <>
              <PenLine size={13} /> Lưu ghi chú
            </>
          )}
        </button>
      </div>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Viết ghi chú của bạn ở đây..."
        rows={10}
        className="w-full text-sm text-[#1A2B47] bg-[#F8FAFC] border border-slate-200 rounded-xl p-4 outline-none resize-none focus:ring-2 focus:ring-[#F08A4B]/20 focus:border-[#F08A4B]/50 transition-all placeholder-slate-300 leading-relaxed"
      />
      <p className="text-[11px] text-slate-400 font-medium">
        {note.length} ký tự · Ghi chú được lưu cục bộ trên trình duyệt của bạn.
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────
   TAB CONTENT: Tài liệu
───────────────────────────────────────── */
function DocumentsTab({ documents }) {
  const typeColor = { PDF: "bg-red-50 text-red-500", PPTX: "bg-orange-50 text-orange-500" };

  return (
    <div className="py-6 space-y-4">
      <h3 className="text-base font-black text-[#1A2B47]">
        Tài liệu bài học ({documents.length})
      </h3>
      <div className="space-y-3">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-white hover:border-[#F08A4B]/30 hover:shadow-sm transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-100">
                <Folder size={16} className="text-slate-400" />
              </div>
              <div>
                <p className="text-sm font-bold text-[#1A2B47] group-hover:text-[#F08A4B] transition-colors">
                  {doc.title}
                </p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span
                    className={`text-[10px] font-black px-1.5 py-0.5 rounded uppercase ${
                      typeColor[doc.type] || "bg-slate-100 text-slate-400"
                    }`}
                  >
                    {doc.type}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">
                    {doc.size}
                  </span>
                </div>
              </div>
            </div>
            <button className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-[#F08A4B] transition-colors px-3 py-1.5 rounded-lg hover:bg-[#FDF2E9]">
              <Download size={14} />
              Tải về
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────── */
export default function LessonPage() {
  const navigate = useNavigate();
  const [currentLesson, setCurrentLesson] = useState(MOCK_LESSON);
  const [activeTab, setActiveTab] = useState("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const tabs = [
    { id: "overview", label: "Tổng quan", icon: BookOpen },
    { id: "notes", label: "Ghi chú", icon: PenLine },
    { id: "documents", label: "Tài liệu", icon: FileText },
  ];

  // Tính bài kề trước/sau
  const allLessons = MOCK_CHAPTERS.flatMap((ch) => ch.lessons);
  const currentIndex = allLessons.findIndex((l) => l.id === currentLesson.id);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson =
    currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  const handleComplete = () => {
    setIsCompleted(true);
    setTimeout(() => {
      if (nextLesson && nextLesson.status !== "locked") {
        setCurrentLesson({ ...MOCK_LESSON, ...nextLesson });
        setIsCompleted(false);
      }
    }, 800);
  };

  return (
    <div
      className="min-h-screen bg-[#F8FAFC] flex flex-col"
      style={{ fontFamily: "'DM Sans', 'Inter', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
      `}</style>

      {/* ── HEADER ── */}
      <Header />

      {/* ── MAIN AREA ── */}
      <div className="flex flex-1 max-w-screen-2xl mx-auto w-full">
        {/* ── LEFT: Video + Tabs ── */}
        <main className="flex-1 min-w-0 flex flex-col">
          {/* Video */}
          <VideoPlayer videoId={currentLesson.videoId || "dQw4w9WgXcQ"} title={currentLesson.title} />

          {/* Info + Action bar */}
          <div className="px-5 sm:px-8 pt-5 pb-2 border-b border-slate-100 bg-white flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <h2 className="text-xl font-black text-[#1A2B47]">
                {currentLesson.chapterTitle}
              </h2>
              <p className="text-sm text-slate-500 font-semibold mt-0.5">
                {currentLesson.title}
              </p>

              {/* Progress (mobile) */}
              <div className="flex items-center gap-2 mt-2 md:hidden">
                <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#F08A4B] to-[#e0591a] rounded-full"
                    style={{ width: `${MOCK_COURSE.progress}%` }}
                  />
                </div>
                <span className="text-[10px] text-slate-400 font-bold shrink-0">
                  {MOCK_COURSE.progress}%
                </span>
              </div>
            </div>

            {/* Hoàn thành bài học */}
            <button
              onClick={handleComplete}
              disabled={isCompleted}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-black transition-all active:scale-95 shrink-0 ${
                isCompleted
                  ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30"
                  : "bg-[#1A2B47] text-white hover:bg-[#253D63] shadow-lg shadow-slate-900/20"
              }`}
            >
              <CheckCircle2 size={16} />
              {isCompleted ? "Đã hoàn thành!" : "Hoàn thành bài học"}
            </button>
          </div>

          {/* Tabs */}
          <div className="bg-white border-b border-slate-100 px-5 sm:px-8">
            <div className="flex gap-1">
              {tabs.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`flex items-center gap-1.5 px-4 py-3 text-xs font-bold border-b-2 transition-all -mb-px ${
                    activeTab === id
                      ? "border-[#F08A4B] text-[#F08A4B]"
                      : "border-transparent text-slate-400 hover:text-[#1A2B47] hover:border-slate-200"
                  }`}
                >
                  <Icon size={13} />
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab content */}
          <div className="flex-1 bg-white px-5 sm:px-8">
            {activeTab === "overview" && <OverviewTab lesson={currentLesson} />}
            {activeTab === "notes" && <NotesTab />}
            {activeTab === "documents" && (
              <DocumentsTab documents={currentLesson.documents || MOCK_LESSON.documents} />
            )}
          </div>

          {/* Prev / Next navigation */}
          <div className="bg-white border-t border-slate-100 px-5 sm:px-8 py-4 flex items-center justify-between gap-4">
            <button
              disabled={!prevLesson || prevLesson.status === "locked"}
              onClick={() => prevLesson && setCurrentLesson({ ...MOCK_LESSON, ...prevLesson })}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-500 hover:text-[#1A2B47] hover:border-slate-300 hover:bg-slate-50 transition-all disabled:opacity-30 disabled:cursor-not-allowed active:scale-95"
            >
              <ChevronLeft size={15} />
              Bài trước
            </button>

            <span className="text-[11px] text-slate-400 font-semibold hidden sm:block">
              Bài {currentIndex + 1} / {allLessons.length}
            </span>

            <button
              disabled={!nextLesson}
              onClick={() => nextLesson && setCurrentLesson({ ...MOCK_LESSON, ...nextLesson })}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1A2B47] text-white text-xs font-bold hover:bg-[#253D63] transition-all disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 shadow-md"
            >
              Bài tiếp theo
              <ChevronRight size={15} />
            </button>
          </div>
        </main>

        {/* ── RIGHT: Sidebar (Desktop) ── */}
        <aside className="hidden xl:flex flex-col w-80 2xl:w-96 border-l border-slate-100 bg-white sticky top-16 h-[calc(100vh-4rem)] overflow-hidden shrink-0">
          <LessonSidebar
            chapters={MOCK_CHAPTERS}
            currentLessonId={currentLesson.id}
            onSelectLesson={(lesson) =>
              setCurrentLesson({ ...MOCK_LESSON, ...lesson })
            }
          />
        </aside>
      </div>

      {/* ── MOBILE SIDEBAR DRAWER ── */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 xl:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm"
            onClick={() => setIsSidebarOpen(false)}
          />
          {/* Drawer */}
          <div className="relative ml-auto w-[320px] bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100">
              <span className="text-sm font-black text-[#1A2B47]">
                Nội dung khóa học
              </span>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 transition-colors"
              >
                <X size={16} />
              </button>
            </div>
            <div className="flex-1 overflow-hidden">
              <LessonSidebar
                chapters={MOCK_CHAPTERS}
                currentLessonId={currentLesson.id}
                onSelectLesson={(lesson) => {
                  setCurrentLesson({ ...MOCK_LESSON, ...lesson });
                  setIsSidebarOpen(false);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
