import { useState, useRef, useEffect, useCallback } from "react";
import {
  Calendar,
  User,
  GraduationCap,
  Upload,
  LayoutDashboard,
  Check,
  X,
  Sigma,
  Users,
  BookOpen,
  Clock,
  TrendingUp,
  RefreshCw,
  AlertCircle,
  ChevronDown,
  ClipboardList,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/layout/Header";

// ── Config ───────────────────────────────────────────────────────────────────
const API_BASE = "http://localhost:8085/api/admin";

// ── Helper: lấy initials từ tên ──────────────────────────────────────────────
function getInitials(name = "") {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

// ── Helper: màu avatar ngẫu nhiên theo id ────────────────────────────────────
const AVATAR_COLORS = [
  "bg-blue-100 text-blue-600",
  "bg-indigo-100 text-indigo-600",
  "bg-purple-100 text-purple-600",
  "bg-rose-100 text-rose-600",
  "bg-emerald-100 text-emerald-600",
  "bg-amber-100 text-amber-600",
];
function avatarColor(id) {
  return AVATAR_COLORS[id % AVATAR_COLORS.length];
}

// ── Helper: format tiền VND ───────────────────────────────────────────────────
function formatVND(amount) {
  if (!amount && amount !== 0) return "—";
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(amount);
}

// ── Stat Card Component ───────────────────────────────────────────────────────
function StatCard({ icon: Icon, label, value, color, loading }) {
  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
        <Icon size={22} />
      </div>
      <div>
        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{label}</div>
        {loading ? (
          <div className="h-6 w-20 bg-slate-200 animate-pulse rounded mt-1" />
        ) : (
          <div className="text-2xl font-black text-slate-800 mt-0.5">{value}</div>
        )}
      </div>
    </div>
  );
}

// ── Toast Notification ────────────────────────────────────────────────────────
function Toast({ message, type, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-lg text-sm font-semibold transition-all animate-slide-up ${type === "success"
          ? "bg-emerald-600 text-white"
          : "bg-red-600 text-white"
        }`}
    >
      {type === "success" ? <Check size={16} /> : <AlertCircle size={16} />}
      {message}
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const navigate = useNavigate();

  // ── State ──────────────────────────────────────────────────────────────────
  const [approvals, setApprovals] = useState([]);
  const [courses, setCourses] = useState([]);
  const [stats, setStats] = useState(null);

  const [loadingApprovals, setLoadingApprovals] = useState(true);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [loadingStats, setLoadingStats] = useState(true);
  const [actionLoading, setActionLoading] = useState(null); // id đang xử lý

  const [enrollmentFilter, setEnrollmentFilter] = useState("PENDING");

  // Form tạo khóa học
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    grade: "",
    price: "",
    originalPrice: "",
    tag: "",
    imageUrl: "",
    lessonCount: "",
    durationHours: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [creating, setCreating] = useState(false);
  const fileInputRef = useRef(null);

  // Toast
  const [toast, setToast] = useState(null);
  const showToast = useCallback((message, type = "success") => {
    setToast({ message, type });
  }, []);

  // ── Fetch Stats ────────────────────────────────────────────────────────────
  const fetchStats = useCallback(async () => {
    setLoadingStats(true);
    try {
      const res = await fetch(`${API_BASE}/stats`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      setStats(data);
    } catch {
      showToast("Không thể tải thống kê!", "error");
    } finally {
      setLoadingStats(false);
    }
  }, [showToast]);

  // ── Fetch Enrollments ──────────────────────────────────────────────────────
  const fetchEnrollments = useCallback(async (status = "PENDING") => {
    setLoadingApprovals(true);
    try {
      const res = await fetch(`${API_BASE}/enrollments?status=${status}`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      setApprovals(data);
    } catch {
      showToast("Không thể tải danh sách học viên!", "error");
    } finally {
      setLoadingApprovals(false);
    }
  }, [showToast]);

  // ── Fetch Courses ──────────────────────────────────────────────────────────
  const fetchCourses = useCallback(async () => {
    setLoadingCourses(true);
    try {
      const res = await fetch("http://localhost:8085/api/courses");
      if (!res.ok) throw new Error();
      const data = await res.json();
      setCourses(data);
    } catch {
      showToast("Không thể tải danh sách khóa học!", "error");
    } finally {
      setLoadingCourses(false);
    }
  }, [showToast]);

  // ── Initial Load ───────────────────────────────────────────────────────────
  useEffect(() => {
    fetchStats();
    fetchEnrollments("PENDING");
    fetchCourses();
  }, [fetchStats, fetchEnrollments, fetchCourses]);

  // ── Filter thay đổi ────────────────────────────────────────────────────────
  useEffect(() => {
    fetchEnrollments(enrollmentFilter);
  }, [enrollmentFilter, fetchEnrollments]);

  // ── Approve / Reject ───────────────────────────────────────────────────────
  const handleAction = async (id, userName, action) => {
    setActionLoading(id);
    try {
      const endpoint = action === "approve" ? "approve" : "reject";
      const res = await fetch(`${API_BASE}/enrollments/${id}/${endpoint}`, {
        method: "PATCH",
      });
      if (!res.ok) throw new Error();
      showToast(
        `${action === "approve" ? "✅ Đã duyệt" : "❌ Đã từ chối"} học viên ${userName}!`,
        action === "approve" ? "success" : "error"
      );
      // Refresh dữ liệu
      fetchEnrollments(enrollmentFilter);
      fetchStats();
      if (action === "approve") fetchCourses();
    } catch {
      showToast("Có lỗi xảy ra, vui lòng thử lại!", "error");
    } finally {
      setActionLoading(null);
    }
  };

  // ── Image Upload ───────────────────────────────────────────────────────────
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setImagePreview(ev.target.result);
    reader.readAsDataURL(file);
    // Tạm thời dùng object URL làm imageUrl (trong thực tế cần upload lên server/cloud)
    setForm((prev) => ({ ...prev, imageUrl: URL.createObjectURL(file) }));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (!file || !file.type.startsWith("image/")) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setImagePreview(ev.target.result);
    reader.readAsDataURL(file);
    setForm((prev) => ({ ...prev, imageUrl: URL.createObjectURL(file) }));
  };

  // ── Create Course ──────────────────────────────────────────────────────────
  const handleCreateCourse = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      showToast("Vui lòng nhập tên khóa học!", "error");
      return;
    }
    setCreating(true);
    try {
      const payload = {
        title: form.title,
        description: form.description || null,
        category: form.category || null,
        grade: form.grade || null,
        price: form.price ? parseInt(form.price) : 0,
        originalPrice: form.originalPrice ? parseInt(form.originalPrice) : null,
        tag: form.tag || null,
        imageUrl: form.imageUrl || null,
        lessonCount: form.lessonCount ? parseInt(form.lessonCount) : 0,
        durationHours: form.durationHours ? parseFloat(form.durationHours) : 0.0,
        instructorId: null,
      };

      const res = await fetch(`${API_BASE}/courses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errMsg = await res.text();
        throw new Error(errMsg);
      }

      showToast("🎉 Tạo khóa học mới thành công!", "success");
      setForm({
        title: "", description: "", category: "", grade: "",
        price: "", originalPrice: "", tag: "", imageUrl: "",
        lessonCount: "", durationHours: "",
      });
      setImageFile(null);
      setImagePreview(null);
      fetchCourses();
      fetchStats();
    } catch (err) {
      showToast(err.message || "Tạo khóa học thất bại!", "error");
    } finally {
      setCreating(false);
    }
  };

  // ── Refresh All ────────────────────────────────────────────────────────────
  const handleRefresh = () => {
    fetchStats();
    fetchEnrollments(enrollmentFilter);
    fetchCourses();
  };

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col min-h-screen bg-[#F4F6F9] font-sans antialiased text-[#1E293B]">
      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* ── HEADER ── */}
      <Header />

      <div className="flex-1 flex flex-row min-h-0">
        {/* ── LEFT SIDEBAR ── */}
        <aside className="w-64 bg-[#0B132B] text-white flex flex-col shrink-0">
          <div className="p-6 border-b border-slate-800">
            <div
              onClick={() => navigate("/")}
              className="text-2xl font-black tracking-tight text-white cursor-pointer hover:opacity-90 flex items-center gap-2"
            >
              <span>SuongMath</span>
            </div>
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mt-1">
              Admin Portal
            </div>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-1">
            <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl bg-blue-600/20 text-blue-400 transition-all">
              <LayoutDashboard size={18} />
              Dashboard
            </button>
          </nav>

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

        {/* ── MAIN CONTENT ── */}
        <div className="flex-1 flex flex-col min-w-0">
          <main className="flex-1 p-8 overflow-y-auto max-w-[1400px] w-full mx-auto space-y-8">

            {/* Header row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-black text-slate-900 tracking-tight leading-none">
                  Welcome back, Admin
                </h1>
                <p className="text-slate-500 text-sm mt-2">
                  Quản lý học viên và khóa học của SuongMath
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleRefresh}
                  className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-4 py-2.5 shadow-sm text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all"
                >
                  <RefreshCw size={15} />
                  Làm mới
                </button>
                <div className="flex items-center gap-2.5 bg-white border border-slate-200 rounded-xl px-4 py-2.5 shadow-sm text-sm font-semibold text-slate-700">
                  <Calendar size={16} className="text-slate-400" />
                  <span>{new Date().toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" })}</span>
                </div>
              </div>
            </div>

            {/* ── STATS ROW ── */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                icon={Users}
                label="Học viên"
                value={stats?.totalStudents ?? "—"}
                color="bg-blue-50 text-blue-600"
                loading={loadingStats}
              />
              <StatCard
                icon={BookOpen}
                label="Khóa học"
                value={stats?.totalCourses ?? "—"}
                color="bg-emerald-50 text-emerald-600"
                loading={loadingStats}
              />
              <StatCard
                icon={Clock}
                label="Chờ duyệt"
                value={stats?.pendingApprovals ?? "—"}
                color="bg-amber-50 text-amber-600"
                loading={loadingStats}
              />
              <StatCard
                icon={TrendingUp}
                label="Doanh thu"
                value={loadingStats ? "—" : formatVND(stats?.totalRevenue)}
                color="bg-purple-50 text-purple-600"
                loading={loadingStats}
              />
            </div>

            {/* ── MAIN GRID ── */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

              {/* LEFT COLUMN */}
              <div className="lg:col-span-7 space-y-8">

                {/* Widget: Duyệt học viên */}
                <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-1">
                    <h2 className="text-lg font-black text-slate-800 tracking-tight">
                      Duyệt học viên
                    </h2>
                    {/* Filter dropdown */}
                    <div className="relative">
                      <select
                        value={enrollmentFilter}
                        onChange={(e) => setEnrollmentFilter(e.target.value)}
                        className="appearance-none bg-slate-50 border border-slate-200 rounded-lg pl-3 pr-8 py-1.5 text-xs font-semibold text-slate-700 outline-none focus:border-blue-400 cursor-pointer"
                      >
                        <option value="PENDING">⏳ Chờ duyệt</option>
                        <option value="APPROVED">✅ Đã duyệt</option>
                        <option value="REJECTED">❌ Từ chối</option>
                        <option value="ALL">📋 Tất cả</option>
                      </select>
                      <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    </div>
                  </div>
                  <p className="text-slate-400 text-xs">
                    Yêu cầu tham gia khóa học — từ dữ liệu thực tế
                  </p>

                  <div className="mt-6 space-y-3">
                    {loadingApprovals ? (
                      // Skeleton loading
                      Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl animate-pulse">
                          <div className="w-10 h-10 rounded-full bg-slate-200 shrink-0" />
                          <div className="flex-1 space-y-2">
                            <div className="h-3.5 bg-slate-200 rounded w-1/3" />
                            <div className="h-3 bg-slate-200 rounded w-2/3" />
                          </div>
                          <div className="flex gap-2">
                            <div className="h-8 w-16 bg-slate-200 rounded-xl" />
                            <div className="h-8 w-20 bg-slate-200 rounded-xl" />
                          </div>
                        </div>
                      ))
                    ) : approvals.length === 0 ? (
                      <div className="text-center py-8 flex flex-col items-center gap-3">
                        {/* UFO Animation */}
                        <div style={{ animation: "ufo-float 3s ease-in-out infinite" }}>
                          <svg width="120" height="100" viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                            {/* Tia sáng bên dưới */}
                            <ellipse cx="60" cy="82" rx="22" ry="5" fill="url(#beamGrad)" opacity="0.35" style={{ animation: "beam-pulse 3s ease-in-out infinite" }} />
                            <polygon points="45,65 75,65 68,85 52,85" fill="url(#beamGrad)" opacity="0.18" />
                            {/* Thân đĩa bay - phần dưới */}
                            <ellipse cx="60" cy="58" rx="34" ry="12" fill="url(#bodyGrad)" />
                            {/* Thân đĩa bay - phần trên (cabin) */}
                            <ellipse cx="60" cy="50" rx="20" ry="13" fill="url(#cabinGrad)" />
                            {/* Cửa sổ / kính */}
                            <ellipse cx="60" cy="48" rx="11" ry="8" fill="url(#glassGrad)" opacity="0.9" />
                            <ellipse cx="57" cy="46" rx="4" ry="3" fill="white" opacity="0.5" />
                            {/* Đèn nhấp nháy */}
                            <circle cx="35" cy="58" r="3.5" fill="#f472b6" style={{ animation: "light-blink 1.2s ease-in-out infinite" }} />
                            <circle cx="85" cy="58" r="3.5" fill="#34d399" style={{ animation: "light-blink 1.2s ease-in-out infinite 0.6s" }} />
                            <circle cx="60" cy="62" r="3" fill="#fbbf24" style={{ animation: "light-blink 1.8s ease-in-out infinite 0.3s" }} />
                            {/* Đường viền bóng dưới đĩa */}
                            <ellipse cx="60" cy="58" rx="34" ry="12" fill="none" stroke="#6366f1" strokeWidth="1.2" opacity="0.4" />
                            {/* Dải ánh sáng trên cabin */}
                            <ellipse cx="60" cy="50" rx="20" ry="13" fill="none" stroke="#a5b4fc" strokeWidth="1" opacity="0.5" />
                            {/* Ngôi sao xung quanh */}
                            <circle cx="18" cy="30" r="1.5" fill="#c7d2fe" opacity="0.6" style={{ animation: "star-twinkle 2s ease-in-out infinite" }} />
                            <circle cx="100" cy="22" r="2" fill="#c7d2fe" opacity="0.5" style={{ animation: "star-twinkle 2.5s ease-in-out infinite 0.5s" }} />
                            <circle cx="108" cy="50" r="1.5" fill="#c7d2fe" opacity="0.4" style={{ animation: "star-twinkle 1.8s ease-in-out infinite 1s" }} />
                            <circle cx="12" cy="55" r="1" fill="#c7d2fe" opacity="0.5" style={{ animation: "star-twinkle 2.2s ease-in-out infinite 0.8s" }} />
                            <defs>
                              <linearGradient id="bodyGrad" x1="26" y1="46" x2="94" y2="70" gradientUnits="userSpaceOnUse">
                                <stop offset="0%" stopColor="#818cf8" />
                                <stop offset="100%" stopColor="#4f46e5" />
                              </linearGradient>
                              <linearGradient id="cabinGrad" x1="40" y1="37" x2="80" y2="63" gradientUnits="userSpaceOnUse">
                                <stop offset="0%" stopColor="#a5b4fc" />
                                <stop offset="100%" stopColor="#6366f1" />
                              </linearGradient>
                              <linearGradient id="glassGrad" x1="49" y1="40" x2="71" y2="56" gradientUnits="userSpaceOnUse">
                                <stop offset="0%" stopColor="#e0f2fe" />
                                <stop offset="100%" stopColor="#7dd3fc" />
                              </linearGradient>
                              <linearGradient id="beamGrad" x1="38" y1="65" x2="82" y2="90" gradientUnits="userSpaceOnUse">
                                <stop offset="0%" stopColor="#fde68a" />
                                <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
                              </linearGradient>
                            </defs>
                          </svg>
                        </div>
                        <p className="text-sm font-semibold text-slate-500">Không có yêu cầu!</p>
                        <p className="text-xs text-slate-400">Không có yêu cầu nào trong mục này.</p>
                        <style>{`
                          @keyframes ufo-float {
                            0%, 100% { transform: translateY(0px); }
                            50% { transform: translateY(-10px); }
                          }
                          @keyframes beam-pulse {
                            0%, 100% { opacity: 0.35; rx: 22; }
                            50% { opacity: 0.6; rx: 26; }
                          }
                          @keyframes light-blink {
                            0%, 100% { opacity: 1; }
                            50% { opacity: 0.2; }
                          }
                          @keyframes star-twinkle {
                            0%, 100% { opacity: 0.6; transform: scale(1); }
                            50% { opacity: 0.1; transform: scale(0.5); }
                          }
                        `}</style>
                      </div>
                    ) : (
                      approvals.map((app) => (
                        <div
                          key={app.id}
                          className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-slate-200 transition-colors"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            {app.userAvatar ? (
                              <img
                                src={app.userAvatar}
                                alt={app.userName}
                                className="w-10 h-10 rounded-full object-cover shrink-0"
                              />
                            ) : (
                              <div
                                className={`w-10 h-10 rounded-full font-bold flex items-center justify-center shrink-0 text-sm ${avatarColor(app.id)}`}
                              >
                                {getInitials(app.userName)}
                              </div>
                            )}
                            <div className="min-w-0">
                              <div className="text-sm font-bold text-slate-800 truncate">
                                {app.userName || "Ẩn danh"}
                              </div>
                              <div className="text-xs text-slate-500 mt-0.5 truncate">
                                {app.userEmail}
                              </div>
                              <div className="text-xs text-slate-400 mt-0.5">
                                Đăng ký:{" "}
                                <span className="font-medium text-slate-600">
                                  {app.courseTitle}
                                </span>
                                {app.coursePrice > 0 && (
                                  <span className="ml-2 text-blue-500 font-semibold">
                                    {formatVND(app.coursePrice)}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0 ml-3">
                            {/* Badge trạng thái */}
                            {app.status === "APPROVED" && (
                              <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
                                Đã duyệt
                              </span>
                            )}
                            {app.status === "REJECTED" && (
                              <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-red-50 text-red-500 border border-red-100">
                                Từ chối
                              </span>
                            )}
                            {app.status === "PENDING" && (
                              <>
                                <button
                                  disabled={actionLoading === app.id}
                                  onClick={() => handleAction(app.id, app.userName, "approve")}
                                  className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 active:scale-95 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all flex items-center gap-1.5"
                                >
                                  {actionLoading === app.id ? (
                                    <RefreshCw size={12} className="animate-spin" />
                                  ) : (
                                    <Check size={13} />
                                  )}
                                  Duyệt
                                </button>
                                <button
                                  disabled={actionLoading === app.id}
                                  onClick={() => handleAction(app.id, app.userName, "reject")}
                                  className="bg-white hover:bg-slate-100 disabled:opacity-50 active:scale-95 text-slate-700 border border-slate-200 text-xs font-bold px-4 py-2 rounded-xl transition-all flex items-center gap-1.5"
                                >
                                  <X size={13} />
                                  Từ chối
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Widget: Danh sách khóa học */}
                <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-1">
                    <h2 className="text-lg font-black text-slate-800 tracking-tight">
                      Khóa học ({courses.length})
                    </h2>
                    <span className="text-xs text-slate-400 font-medium">Dữ liệu thực từ DB</span>
                  </div>
                  <p className="text-slate-400 text-xs">Tất cả các khóa học đang có trong hệ thống</p>

                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {loadingCourses ? (
                      Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="p-5 border border-slate-200/80 bg-slate-50 rounded-2xl animate-pulse">
                          <div className="w-10 h-10 bg-slate-200 rounded-xl" />
                          <div className="mt-4 space-y-2">
                            <div className="h-3.5 bg-slate-200 rounded w-3/4" />
                            <div className="h-3 bg-slate-200 rounded w-1/3" />
                          </div>
                        </div>
                      ))
                    ) : courses.length === 0 ? (
                      <div className="col-span-2 text-center py-8 text-slate-400 text-sm">
                        Chưa có khóa học nào. Hãy tạo khóa học đầu tiên!
                      </div>
                    ) : (
                      courses.map((course) => (
                        <div
                          key={course.id}
                          className="p-5 border border-slate-200/80 bg-slate-50 rounded-2xl flex flex-col justify-between min-h-[140px] hover:border-slate-300 hover:bg-white transition-all cursor-pointer"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="w-10 h-10 rounded-xl bg-white border border-slate-200/60 flex items-center justify-center text-slate-600 shrink-0 shadow-sm">
                              {course.category === "algebra" ? (
                                <Sigma size={20} />
                              ) : (
                                <GraduationCap size={20} />
                              )}
                            </div>
                            {course.tag && (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-500 border border-blue-100 uppercase tracking-wide">
                                {course.tag}
                              </span>
                            )}
                          </div>
                          <div className="mt-3">
                            <div className="text-sm font-black text-slate-800 line-clamp-2">
                              {course.title}
                            </div>
                            <div className="flex items-center gap-3 mt-2">
                              <span className="text-xs text-slate-500 font-medium">
                                👥 {course.studentCount ?? 0} học viên
                              </span>
                              {course.price > 0 && (
                                <span className="text-xs text-blue-600 font-semibold">
                                  {formatVND(course.price)}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

              </div>

              {/* RIGHT COLUMN: Create New Course */}
              <div className="lg:col-span-5">
                <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm sticky top-8">
                  <h2 className="text-lg font-black text-slate-800 tracking-tight">
                    Tạo khóa học mới
                  </h2>
                  <p className="text-slate-400 text-xs mt-1">Điền thông tin để tạo và lưu vào database</p>

                  <form onSubmit={handleCreateCourse} className="mt-6 space-y-4">
                    {/* Tên khóa học */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                        Tên khóa học <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Nhập tên khóa học..."
                        value={form.title}
                        onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                        required
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none focus:bg-white focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10 transition-all"
                      />
                    </div>

                    {/* Mô tả */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                        Mô tả
                      </label>
                      <textarea
                        placeholder="Mô tả ngắn về khóa học..."
                        value={form.description}
                        onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                        rows={2}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none focus:bg-white focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10 transition-all resize-none"
                      />
                    </div>

                    {/* Category + Grade (2 cột) */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                          Danh mục
                        </label>
                        <input
                          type="text"
                          placeholder="Vd: calculus"
                          value={form.category}
                          onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none focus:bg-white focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10 transition-all"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                          Lớp / Cấp
                        </label>
                        <input
                          type="text"
                          placeholder="Vd: 12, ĐH"
                          value={form.grade}
                          onChange={(e) => setForm((p) => ({ ...p, grade: e.target.value }))}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none focus:bg-white focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10 transition-all"
                        />
                      </div>
                    </div>

                    {/* Giá + Giá gốc */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                          Giá (VND)
                        </label>
                        <input
                          type="number"
                          placeholder="0 = miễn phí"
                          value={form.price}
                          onChange={(e) => setForm((p) => ({ ...p, price: e.target.value }))}
                          min={0}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none focus:bg-white focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10 transition-all"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                          Giá gốc (VND)
                        </label>
                        <input
                          type="number"
                          placeholder="Tuỳ chọn"
                          value={form.originalPrice}
                          onChange={(e) => setForm((p) => ({ ...p, originalPrice: e.target.value }))}
                          min={0}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none focus:bg-white focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10 transition-all"
                        />
                      </div>
                    </div>

                    {/* Tag */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                        Tag
                      </label>
                      <input
                        type="text"
                        placeholder="Vd: HOT, NEW, SALE..."
                        value={form.tag}
                        onChange={(e) => setForm((p) => ({ ...p, tag: e.target.value }))}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none focus:bg-white focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10 transition-all"
                      />
                    </div>

                    {/* Ảnh khóa học */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                        Ảnh khóa học
                      </label>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                      />
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={handleDrop}
                        className="border-2 border-dashed border-slate-200 rounded-2xl overflow-hidden cursor-pointer transition-all group hover:border-blue-400 hover:bg-blue-50/30"
                      >
                        {imagePreview ? (
                          <div className="relative">
                            <img
                              src={imagePreview}
                              alt="Preview"
                              className="w-full h-36 object-cover"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <span className="text-white text-xs font-bold bg-black/60 px-3 py-1.5 rounded-lg">
                                Click để đổi ảnh
                              </span>
                            </div>
                            <div className="px-3 py-2 bg-slate-50 border-t border-slate-200 flex items-center gap-2">
                              <Upload className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                              <span className="text-xs text-slate-500 truncate font-medium">
                                {imageFile?.name}
                              </span>
                            </div>
                          </div>
                        ) : (
                          <div className="p-6 flex flex-col items-center justify-center">
                            <Upload className="w-7 h-7 text-slate-400 group-hover:text-blue-500 transition-colors" />
                            <span className="text-xs text-slate-500 mt-2.5 font-semibold group-hover:text-blue-600 transition-colors">
                              Click hoặc kéo thả ảnh vào đây
                            </span>
                            <span className="text-[10px] text-slate-400 mt-1">PNG, JPG, WEBP</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={creating}
                      className="w-full bg-[#0B132B] hover:bg-[#16223F] disabled:opacity-60 active:scale-98 text-white font-bold py-3.5 rounded-xl transition-all shadow-md text-sm flex items-center justify-center gap-2"
                    >
                      {creating ? (
                        <>
                          <RefreshCw size={15} className="animate-spin" />
                          Đang tạo...
                        </>
                      ) : (
                        "Tạo khóa học"
                      )}
                    </button>
                  </form>
                </div>
              </div>

            </div>
          </main>
        </div>
      </div>

      <style>{`
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up { animation: slide-up 0.3s ease; }
      `}</style>
    </div>
  );
}
