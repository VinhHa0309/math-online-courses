import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Users,
  Video,
  Star
} from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout";
import CourseStudentTable from "../../components/admin/CourseStudentTable";
import CourseVideoList from "../../components/admin/CourseVideoList";
import AddVideoModal from "../../components/admin/AddVideoModal";
import { API_BASE_URL } from "../../config/api";

export default function AdminCourseDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Active Tab: 'students' | 'videos'
  const [activeTab, setActiveTab] = useState("videos");
  const [showAddVideoModal, setShowAddVideoModal] = useState(false);
  const [courseData, setCourseData] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`${API_BASE_URL}/api/courses/${id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data && data.title) {
            setCourseData(data);
          }
        })
        .catch((err) => console.log("Lỗi fetch khóa học:", err));
    }
  }, [id]);

  // Mock Students Data
  const [students] = useState([
    {
      id: "HV-2024-0891",
      name: "Nguyễn Văn An",
      initials: "NA",
      email: "an.nguyen12@gmail.com",
      joinDate: "12/09/2024",
      completedLessons: 15,
      totalLessons: 18,
      progress: 85,
      status: "Đang học",
      avatarBg: "bg-blue-100 text-blue-700"
    },
    {
      id: "HV-2024-0902",
      name: "Trần Thị Mai",
      initials: "TM",
      email: "mai.tran.math@outlook.com",
      joinDate: "15/09/2024",
      completedLessons: 11,
      totalLessons: 18,
      progress: 60,
      status: "Đang học",
      avatarBg: "bg-purple-100 text-purple-700"
    },
    {
      id: "HV-2024-0775",
      name: "Lê Hoàng Long",
      initials: "HL",
      email: "long.lehoang@gmail.com",
      joinDate: "01/09/2024",
      completedLessons: 18,
      totalLessons: 18,
      progress: 100,
      status: "Đã hoàn thành",
      avatarBg: "bg-emerald-100 text-emerald-700"
    },
    {
      id: "HV-2024-0940",
      name: "Phạm Minh Đức",
      initials: "MD",
      email: "duc.phamminh@school.edu.vn",
      joinDate: "20/09/2024",
      completedLessons: 7,
      totalLessons: 18,
      progress: 40,
      status: "Đang học",
      avatarBg: "bg-amber-100 text-amber-700"
    }
  ]);

  // Mock Chapters & Videos Data
  const [chapters, setChapters] = useState([
    {
      id: 1,
      title: "Chương 1: Đạo hàm & Khảo sát hàm số",
      videoCount: 6,
      duration: "3 giờ 15 phút",
      videos: [
        {
          id: 101,
          order: "01",
          title: "Bài 1: Khái niệm & Ý nghĩa hình học của đạo hàm",
          duration: "29:15",
          views: "1,240",
          completionRate: "94%",
          publishDate: "03/09/2024",
          isPublished: true
        },
        {
          id: 102,
          order: "02",
          title: "Bài 2: Cực trị của hàm số bậc ba và bậc bốn",
          duration: "25:40",
          views: "1,150",
          completionRate: "91%",
          publishDate: "04/09/2024",
          isPublished: true
        },
        {
          id: 103,
          order: "03",
          title: "Bài 3: Giá trị lớn nhất & nhỏ nhất trên đoạn",
          duration: "22:10",
          views: "990",
          completionRate: "88%",
          publishDate: "06/09/2024",
          isPublished: true
        },
        {
          id: 104,
          order: "04",
          title: "Bài 4: Đường tiệm cận đứng và tiệm cận ngang",
          duration: "25:00",
          views: "850",
          completionRate: "85%",
          publishDate: "08/09/2024",
          isPublished: true
        },
        {
          id: 105,
          order: "05",
          title: "Bài 5: Bài tập nâng cao vận dụng cao (VDC) Điểm 9+",
          duration: "42:30",
          views: "750",
          completionRate: "79%",
          publishDate: "10/09/2024",
          isPublished: true
        },
        {
          id: 106,
          order: "06",
          title: "Bài 6: Đề luyện tập tổng ôn chương 1",
          duration: "20:00",
          views: "0",
          completionRate: "0%",
          publishDate: "14/09/2024",
          isPublished: false
        }
      ]
    },
    {
      id: 2,
      title: "Chương 2: Hàm số Lũy thừa, Mũ và Logarit",
      videoCount: 5,
      duration: "2 giờ 45 phút",
      videos: [
        {
          id: 201,
          order: "01",
          title: "Bài 1: Công thức lũy thừa và tính chất logarit cơ bản",
          duration: "30:00",
          views: "620",
          completionRate: "82%",
          publishDate: "15/09/2024",
          isPublished: true
        }
      ]
    }
  ]);

  const handleAddVideo = ({ title, duration }) => {
    const newVid = {
      id: Date.now(),
      order: String(chapters[0].videos.length + 1).padStart(2, "0"),
      title: title,
      duration: duration || "25:00",
      views: "0",
      completionRate: "0%",
      publishDate: "Hôm nay",
      isPublished: true
    };

    setChapters(prev => [
      {
        ...prev[0],
        videos: [...prev[0].videos, newVid],
        videoCount: prev[0].videoCount + 1
      },
      ...prev.slice(1)
    ]);
  };

  return (
    <AdminLayout activeTab="courses">
      {/* Breadcrumb & Top Action */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
          <span className="cursor-pointer hover:text-slate-600" onClick={() => navigate("/admin")}>
            Khóa học của bạn
          </span>
          <span>/</span>
          <span className="text-slate-800">{courseData?.title || "Toán nâng cao lớp 12"}</span>
        </div>

        <button
          onClick={() => navigate("/admin")}
          className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-sm"
        >
          <ArrowLeft size={14} />
          Quay lại Dashboard
        </button>
      </div>

      {/* Course Header Card */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-2.5 flex-wrap text-xs font-bold">
            <span className="bg-blue-50 text-blue-600 border border-blue-200/60 px-3 py-1 rounded-lg uppercase tracking-wider">
              MÃ KH: MAT{id || "12"}-PRO
            </span>
            <span className="bg-emerald-50 text-emerald-600 border border-emerald-200/60 px-3 py-1 rounded-lg flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Đang hoạt động
            </span>
            <span className="text-slate-400 font-medium">Lớp {courseData?.grade || "12"} • Học kỳ 1</span>
          </div>

          <h1 className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">
            {courseData?.title || "Toán nâng cao lớp 12"}
          </h1>

          <p className="text-slate-500 text-xs lg:text-sm leading-relaxed font-medium">
            {courseData?.description || "Chuyên đề Hàm số, Tích phân chuyên sâu, Hình học không gian Oxyz và các phương pháp giải toán trắc nghiệm vận dụng cao (Điểm 9+)."}
          </p>

          <div className="flex items-center gap-6 text-xs text-slate-500 font-semibold pt-1">
            <span>👨‍🏫 Giảng viên: <strong className="text-slate-800">TS. Nguyễn Hữu Dũng</strong></span>
            <span>🕒 Cập nhật mới: <strong className="text-slate-800">Hôm nay, 08:30</strong></span>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="flex items-center gap-6 bg-slate-50 border border-slate-200/70 p-4 rounded-2xl shrink-0 w-full lg:w-auto justify-around">
          <div className="text-center px-3 border-r border-slate-200">
            <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest flex items-center justify-center gap-1">
              HỌC VIÊN <Users size={12} />
            </div>
            <div className="text-2xl font-black text-slate-900 mt-1">45</div>
            <div className="text-[10px] text-slate-400 font-medium mt-0.5">Sĩ số tối đa: 50</div>
          </div>

          <div className="text-center px-3 border-r border-slate-200">
            <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest flex items-center justify-center gap-1">
              BÀI GIẢNG <Video size={12} />
            </div>
            <div className="text-2xl font-black text-slate-900 mt-1">18</div>
            <div className="text-[10px] text-slate-400 font-medium mt-0.5">Tổng: 24.5 giờ</div>
          </div>

          <div className="text-center px-3">
            <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest flex items-center justify-center gap-1">
              ĐÁNH GIÁ <Star size={12} className="text-amber-400 fill-amber-400" />
            </div>
            <div className="text-2xl font-black text-slate-900 mt-1 flex items-center justify-center gap-1">
              4.9 <span className="text-amber-400 text-sm">★</span>
            </div>
            <div className="text-[10px] text-slate-400 font-medium mt-0.5">42 phản hồi</div>
          </div>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-1 pt-2">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab("students")}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === "students"
                ? "bg-[#0B132B] text-white shadow-md"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80"
              }`}
          >
            <Users size={16} />
            Danh sách học viên
            <span className={`text-xs px-2 py-0.5 rounded-md font-extrabold ${activeTab === "students" ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"}`}>
              {students.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("videos")}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === "videos"
                ? "bg-[#0B132B] text-white shadow-md"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80"
              }`}
          >
            <Video size={16} />
            Quản lý Video bài giảng
            <span className={`text-xs px-2 py-0.5 rounded-md font-extrabold ${activeTab === "videos" ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"}`}>
              18
            </span>
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
          Chế độ xem: <span className="text-slate-800 bg-slate-200/70 px-2.5 py-1 rounded-lg">STANDARD UI</span>
        </div>
      </div>

      {/* Tab Content Components */}
      {activeTab === "students" && <CourseStudentTable students={students} />}

      {activeTab === "videos" && (
        <CourseVideoList
          chapters={chapters}
          setChapters={setChapters}
          onOpenAddModal={() => setShowAddVideoModal(true)}
        />
      )}

      {/* Add Video Modal */}
      <AddVideoModal
        isOpen={showAddVideoModal}
        onClose={() => setShowAddVideoModal(false)}
        onAddVideo={handleAddVideo}
      />
    </AdminLayout>
  );
}
