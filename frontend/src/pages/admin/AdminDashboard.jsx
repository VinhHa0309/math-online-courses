import { useState } from "react";
import {
  Calendar,
  User,
  GraduationCap,
  Upload,
  LayoutDashboard,
  Check,
  X,
  Sigma
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/layout/Header";

export default function AdminDashboard() {
  const navigate = useNavigate();

  // State danh sách duyệt học viên
  const [approvals, setApprovals] = useState([
    {
      id: 1,
      fullName: "John Doe",
      initials: "JD",
      course: "Advanced Calculus I",
      avatarBg: "bg-blue-100 text-blue-600",
    },
    {
      id: 2,
      fullName: "Alice Smith",
      initials: "AS",
      course: "Quantum Math Essentials",
      avatarBg: "bg-indigo-100 text-indigo-600",
    }
  ]);

  // State danh sách khóa học
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "Toán nâng cao lớp 12",
      studentsCount: 45,
      iconType: "cap"
    },
    {
      id: 2,
      title: "Giải tích chuyên sâu",
      studentsCount: 32,
      iconType: "sigma"
    }
  ]);

  // State tạo khóa học mới
  const [newCourseName, setNewCourseName] = useState("");
  const [imageFile, setImageFile] = useState(null);

  // Xử lý Duyệt / Từ chối học viên
  const handleApprove = (id, studentName, action) => {
    setApprovals(prev => prev.filter(app => app.id !== id));
    alert(`${action === "approve" ? "Đã duyệt" : "Đã từ chối"} học viên ${studentName}!`);
  };

  // Xử lý Tạo khóa học
  const handleCreateCourse = (e) => {
    e.preventDefault();
    if (!newCourseName.trim()) {
      alert("Vui lòng nhập tên khóa học!");
      return;
    }
    const newCourse = {
      id: Date.now(),
      title: newCourseName,
      studentsCount: 0,
      iconType: Math.random() > 0.5 ? "cap" : "sigma"
    };
    setCourses(prev => [...prev, newCourse]);
    setNewCourseName("");
    setImageFile(null);
    alert("Tạo khóa học mới thành công!");
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F4F6F9] font-sans antialiased text-[#1E293B]">
      {/* ── HEADER DÙNG CHUNG ── */}
      <Header />

      <div className="flex-1 flex flex-row min-h-0">
        {/* ── LEFT SIDEBAR ── */}
        <aside className="w-64 bg-[#0B132B] text-white flex flex-col shrink-0">
          {/* Sidebar Header */}
          <div className="p-6 border-b border-slate-800">
            <div
              onClick={() => navigate("/")}
              className="text-2xl font-black tracking-tight text-white cursor-pointer hover:opacity-90"
            >
              Mathematiq
            </div>
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mt-1">
              Admin Portal
            </div>
          </div>

          {/* Sidebar Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1">
            <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl bg-blue-600/20 text-blue-400 transition-all">
              <LayoutDashboard size={18} />
              Dashboard
            </button>
          </nav>

          {/* Sidebar Footer - Profile Card */}
          <div className="p-4 border-t border-slate-800 bg-[#080E20]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl overflow-hidden bg-slate-700 flex items-center justify-center text-white shrink-0">
                <User size={20} />
              </div>
              <div>
                <div className="text-sm font-bold text-white leading-tight">Admin User</div>
                <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mt-0.5">
                  SUPER USER
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* ── MAIN CONTENT AREA ── */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* ── PAGE CONTENT CONTAINER ── */}
          <main className="flex-1 p-8 overflow-y-auto max-w-[1400px] w-full mx-auto space-y-8">

            {/* Welcome Header & Date Picker */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-black text-slate-900 tracking-tight leading-none">
                  Welcome back, Admin
                </h1>
                <p className="text-slate-500 text-sm mt-2">
                  Here is what's happening with Mathematiq today.
                </p>
              </div>

              {/* Date range picker mock */}
              <div className="flex items-center gap-2.5 bg-white border border-slate-200 rounded-xl px-4 py-2.5 shadow-sm text-sm font-semibold text-slate-700">
                <Calendar size={16} className="text-slate-400" />
                <span>Oct 1, 2023 - Oct 31, 2023</span>
              </div>
            </div>

            {/* Grid Layout of Widgets */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

              {/* LEFT COLUMN: Student Approval & Your Courses */}
              <div className="lg:col-span-7 space-y-8">

                {/* Widget: Duyệt học viên */}
                <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
                  <h2 className="text-lg font-black text-slate-800 tracking-tight">
                    Duyệt học viên (Student Approval)
                  </h2>
                  <p className="text-slate-400 text-xs mt-1">
                    Yêu cầu tham gia khóa học đang chờ xử lý
                  </p>

                  <div className="mt-6 space-y-4">
                    {approvals.length === 0 ? (
                      <p className="text-sm text-slate-400 text-center py-6">Không có yêu cầu chờ duyệt nào.</p>
                    ) : (
                      approvals.map(app => (
                        <div key={app.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-slate-200 transition-colors">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full font-bold flex items-center justify-center shrink-0 ${app.avatarBg}`}>
                              {app.initials}
                            </div>
                            <div>
                              <div className="text-sm font-bold text-slate-800">{app.fullName}</div>
                              <div className="text-xs text-slate-500 mt-0.5">
                                Đăng ký: <span className="font-medium text-slate-700">{app.course}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleApprove(app.id, app.fullName, "approve")}
                              className="bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all"
                            >
                              Duyệt
                            </button>
                            <button
                              onClick={() => handleApprove(app.id, app.fullName, "reject")}
                              className="bg-white hover:bg-slate-100 active:scale-95 text-slate-700 border border-slate-200 text-xs font-bold px-4 py-2 rounded-xl transition-all"
                            >
                              Từ chối
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Widget: Khóa học của bạn */}
                <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
                  <h2 className="text-lg font-black text-slate-800 tracking-tight">
                    Khóa học của bạn (Your Courses)
                  </h2>
                  <p className="text-slate-400 text-xs mt-1">
                    Danh sách các khóa học bạn đang giảng dạy
                  </p>

                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {courses.map(course => (
                      <div key={course.id} className="p-5 border border-slate-200/80 bg-slate-50 rounded-2xl flex flex-col justify-between min-h-[140px] hover:border-slate-300 transition-colors">
                        <div className="w-10 h-10 rounded-xl bg-white border border-slate-200/60 flex items-center justify-center text-slate-600 shrink-0 shadow-sm">
                          {course.iconType === "cap" ? <GraduationCap size={20} /> : <span className="font-serif font-extrabold text-lg text-slate-600">Σ</span>}
                        </div>
                        <div className="mt-4">
                          <div className="text-sm font-black text-slate-800 line-clamp-1">{course.title}</div>
                          <div className="text-xs text-slate-500 mt-1 font-medium">{course.studentsCount} Học viên</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* RIGHT COLUMN: Create New Course */}
              <div className="lg:col-span-5">

                {/* Widget: Tạo khóa học mới */}
                <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
                  <h2 className="text-lg font-black text-slate-800 tracking-tight">
                    Tạo khóa học mới (Create New Course)
                  </h2>

                  <form onSubmit={handleCreateCourse} className="mt-6 space-y-5">
                    {/* Tên khóa học */}
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                        TÊN KHÓA HỌC
                      </label>
                      <input
                        type="text"
                        placeholder="Nhập tên khóa học..."
                        value={newCourseName}
                        onChange={(e) => setNewCourseName(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none focus:bg-white focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10 transition-all"
                      />
                    </div>

                    {/* Ảnh khóa học */}
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                        ẢNH KHÓA HỌC
                      </label>
                      <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100/50 cursor-pointer transition-all group">
                        <Upload className="w-8 h-8 text-slate-400 group-hover:text-blue-500 transition-colors" />
                        <span className="text-xs text-slate-500 mt-3 font-semibold group-hover:text-slate-600 transition-colors">
                          Tải ảnh lên hoặc kéo thả
                        </span>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full bg-[#0B132B] hover:bg-[#16223F] active:scale-98 text-white font-bold py-3.5 rounded-xl transition-all shadow-md text-sm"
                    >
                      Tạo khóa học
                    </button>
                  </form>
                </div>

              </div>

            </div>

          </main>
        </div>
      </div>
    </div>
  );
}
