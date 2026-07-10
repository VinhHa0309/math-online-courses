import { useState } from "react";
import { Check } from "lucide-react";
import PlayerHeader from "../../components/course-player/PlayerHeader";
import VideoArea from "../../components/course-player/VideoArea";
import LessonTabs from "../../components/course-player/LessonTabs";
import LessonList from "../../components/course-player/LessonList";

// Mock Data cho bài học
const COURSE_CHAPTERS = [
  {
    title: "Chương 1: Đại số nâng cao",
    lessons: [
      {
        id: "l0",
        title: "Bài 0: Giới thiệu khóa học",
        duration: "05:20",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        status: "completed",
        description: "Trong bài học giới thiệu này, bạn sẽ nắm bắt được lộ trình học tập, cấu trúc của khóa học Đại số nâng cao cũng như các phương pháp ôn luyện để đạt kết quả tốt nhất.",
        resources: [
          { name: "Lộ trình học tập chi tiết.pdf", size: "1.2 MB" }
        ]
      },
      {
        id: "l1",
        title: "Bài 1: Hàm số bậc nhất",
        duration: "15:30",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        status: "active",
        description: "Trong bài học đầu tiên của chương Đại số nâng cao, chúng ta sẽ ôn tập và mở rộng kiến thức về hàm số bậc nhất. Bạn sẽ học cách phân tích đồ thị, xác định sự biến thiên và ứng dụng của hàm số bậc nhất trong việc mô hình hóa các bài toán thực tế.",
        resources: [
          { name: "Tóm tắt công thức hàm số bậc nhất.pdf", size: "850 KB" },
          { name: "Bài tập rèn luyện hàm số bậc nhất.pdf", size: "2.4 MB" }
        ]
      },
      {
        id: "l2",
        title: "Bài 2: Hàm số bậc hai và Parabol",
        duration: "22:15",
        videoUrl: "",
        status: "locked",
        description: "Học về hàm số bậc hai, cách vẽ và khảo sát sự biến thiên của đồ thị Parabol. Giải các bài toán biện luận nghiệm thực tế.",
        resources: []
      },
      {
        id: "l3",
        title: "Bài 3: Hệ phương trình bậc nhất",
        duration: "18:40",
        videoUrl: "",
        status: "locked",
        description: "Phương pháp giải hệ phương trình bậc nhất 2 ẩn, 3 ẩn và ứng dụng giải bài toán toán thực tế bằng cách lập hệ phương trình.",
        resources: []
      },
      {
        id: "l4",
        title: "Bài 4: Bất phương trình",
        duration: "25:00",
        videoUrl: "",
        status: "locked",
        description: "Các dạng bất phương trình chứa ẩn ở mẫu, chứa căn thức và phương pháp xét dấu nhị thức bậc nhất, tam thức bậc hai.",
        resources: []
      }
    ]
  }
];

export default function CoursePlayerPage() {
  const [chapters, setChapters] = useState(COURSE_CHAPTERS);
  const [activeLessonId, setActiveLessonId] = useState("l1");
  const [savedNotes, setSavedNotes] = useState([
    { id: 1, time: "02:15", content: "Công thức tìm hệ số góc a của đường thẳng y = ax + b" },
    { id: 2, time: "08:40", content: "Chú ý điều kiện song song và cắt nhau của hai đường thẳng" }
  ]);

  // Tìm thông tin bài học đang phát
  const activeChapter = chapters[0];
  const activeLesson = activeChapter.lessons.find((l) => l.id === activeLessonId) || activeChapter.lessons[1];

  // Tính tiến độ (%)
  const totalLessons = activeChapter.lessons.length;
  const completedLessonsCount = activeChapter.lessons.filter((l) => l.status === "completed").length;
  const progressPercent = Math.round((completedLessonsCount / totalLessons) * 100);

  // Chọn bài học khác
  const handleSelectLesson = (lesson) => {
    if (lesson.status === "locked") {
      alert("Bài học này đang bị khóa. Vui lòng hoàn thành bài học hiện tại để mở khóa!");
      return;
    }
    // Cập nhật trạng thái active
    const updatedLessons = activeChapter.lessons.map((l) => {
      if (l.id === lesson.id) {
        return { ...l, status: "active" };
      }
      if (l.id === activeLessonId) {
        return { ...l, status: "completed" };
      }
      return l;
    });
    setChapters([{ ...activeChapter, lessons: updatedLessons }]);
    setActiveLessonId(lesson.id);
  };

  // Nhấn Hoàn thành bài học hiện tại
  const handleCompleteCurrent = () => {
    const currentIndex = activeChapter.lessons.findIndex((l) => l.id === activeLessonId);
    
    // Đánh dấu bài hiện tại là completed
    const updatedLessons = activeChapter.lessons.map((l) => {
      if (l.id === activeLessonId) {
        return { ...l, status: "completed" };
      }
      return l;
    });

    // Mở khóa bài tiếp theo (nếu có và đang locked)
    const nextIndex = currentIndex + 1;
    if (nextIndex < updatedLessons.length && updatedLessons[nextIndex].status === "locked") {
      updatedLessons[nextIndex].status = "active";
    }

    setChapters([{ ...activeChapter, lessons: updatedLessons }]);

    // Tự động chuyển sang bài tiếp theo nếu được mở khóa
    if (nextIndex < updatedLessons.length) {
      setActiveLessonId(updatedLessons[nextIndex].id);
    } else {
      alert("Chúc mừng! Bạn đã hoàn thành toàn bộ chương học này!");
    }
  };

  // Lưu ghi chú
  const handleSaveNote = (noteText) => {
    const newNote = {
      id: Date.now(),
      time: "04:12",
      content: noteText
    };
    setSavedNotes([newNote, ...savedNotes]);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1A2B47] flex flex-col font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=DM+Sans:wght@400;500;600&display=swap');
        .font-outfit { font-family: 'Outfit', sans-serif; }
        .font-dmsans { font-family: 'DM Sans', sans-serif; }
      `}</style>

      {/* ── HEADER THANH ĐIỀU HƯỚNG ── */}
      <PlayerHeader />

      {/* ── MAIN CONTENT: FLEX LAYOUT ── */}
      <div className="flex-1 flex flex-col lg:flex-row max-w-7xl w-full mx-auto p-4 md:p-6 gap-6">
        
        {/* CỘT TRÁI: VIDEO PLAYER & TABS DETALS */}
        <div className="flex-1 flex flex-col gap-6">
          
          {/* Trình phát Video */}
          <VideoArea activeLesson={activeLesson} />

          {/* Tiêu đề & Nút Hoàn thành */}
          <div className="bg-white rounded-2xl p-5 md:p-6 border border-[#E2E8F0] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-2">
              <span className="text-sm font-semibold text-[#F08A4B] tracking-wide uppercase font-dmsans">
                {activeChapter.title}
              </span>
              <h2 className="font-outfit font-bold text-2xl text-[#1A2B47]">
                {activeLesson.title}
              </h2>
              {/* Progress bar */}
              <div className="space-y-1.5 pt-2">
                <div className="flex justify-between text-xs font-semibold text-[#6B7A90]">
                  <span>Tiến độ khóa học: {progressPercent}%</span>
                </div>
                <div className="w-60 h-2 bg-[#F1F5F9] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#F08A4B] rounded-full transition-all duration-500" 
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            </div>

            <button
              onClick={handleCompleteCurrent}
              className="flex items-center justify-center gap-2 bg-[#1A2B47] hover:bg-[#253D63] active:scale-95 text-white font-semibold px-5 py-3 rounded-xl transition-all shadow-md self-start md:self-center font-outfit"
            >
              <Check className="w-5 h-5" />
              Hoàn thành bài học
            </button>
          </div>

          {/* Hệ thống TAB: Tổng quan, Ghi chú, Tài liệu */}
          <LessonTabs 
            activeLesson={activeLesson}
            savedNotes={savedNotes}
            onSaveNote={handleSaveNote}
          />
        </div>

        {/* CỘT PHẢI: SIDEBAR BÀI HỌC */}
        <div className="w-full lg:w-80 shrink-0">
          <LessonList 
            activeChapter={activeChapter}
            activeLessonId={activeLessonId}
            onSelectLesson={handleSelectLesson}
          />
        </div>

      </div>
    </div>
  );
}
