import React, { useState, useEffect } from "react";
import {
  MapPin,
  Calendar,
  BookOpen,
  Award,
  PlayCircle,
  Mail,
  Globe,
  Target,
  Video,
  Edit3,
  CheckCircle2,
  Image as ImageIcon,
  ArrowRight,
  Sparkles,
  Camera,
  Upload,
  X,
  Check,
  Link2,
  RefreshCw
} from "lucide-react";
import { Link } from "react-router-dom";

// Ảnh avatar mặc định tuyệt đẹp nếu user chưa có avatar
const DEFAULT_AVATAR = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400";

// Danh sách các Avatar mẫu đẹp gợi ý sẵn cho người dùng chọn nhanh
const PRESET_AVATARS = [
  { id: 1, name: "Nữ sinh viên", url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400" },
  { id: 2, name: "Nam sinh viên", url: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400" },
  { id: 3, name: "Nữ nghiên cứu sinh", url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400" },
  { id: 4, name: "Giảng viên", url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400" },
  { id: 5, name: "Kỹ sư toán học", url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400" },
  { id: 6, name: "Nhà khoa học", url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400" },
];

export default function ProfilePage() {
  // State quản lý thông tin User
  const [user, setUser] = useState({
    id: null,
    fullName: "",
    email: "",
    avatarUrl: DEFAULT_AVATAR,
    bio: "",
    location: "",
    joinDate: "",
    website: ""
  });

  const [formData, setFormData] = useState({ ...user });
  const [isSaved, setIsSaved] = useState(false);
  const [liveSessionsCollapsed, setLiveSessionsCollapsed] = useState(false);

  // State điều khiển Modal Đổi Avatar
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [tempAvatarUrl, setTempAvatarUrl] = useState(DEFAULT_AVATAR);
  const [avatarTab, setAvatarTab] = useState("preset"); // "preset" | "upload" | "url"
  const [isUpdatingAvatar, setIsUpdatingAvatar] = useState(false);

  // Đọc thông tin người dùng từ LocalStorage và gọi API Database lấy thông tin mới nhất
  useEffect(() => {
    const localUser = localStorage.getItem("user");
    if (localUser) {
      try {
        const parsed = JSON.parse(localUser);

        // 1. Hiển thị tạm dữ liệu có sẵn
        const initialData = {
          id: parsed.id || null,
          fullName: parsed.fullName || parsed.name || (parsed.email ? parsed.email.split('@')[0] : "Người dùng"),
          email: parsed.email || "",
          avatarUrl: parsed.avatarUrl || parsed.avatar || DEFAULT_AVATAR,
          bio: parsed.bio || "",
          location: parsed.location || "",
          joinDate: parsed.createdAt
            ? new Date(parsed.createdAt).toLocaleDateString("vi-VN", { month: "long", day: "numeric", year: "numeric" })
            : "Chưa cập nhật",
          website: parsed.website || ""
        };
        setUser(initialData);
        setFormData(initialData);

        // 2. Tự động gọi API Backend (PostgreSQL) lấy dữ liệu chính xác nhất của người dùng
        if (parsed.id) {
          fetch(`http://localhost:8085/api/users/${parsed.id}`)
            .then((res) => (res.ok ? res.json() : null))
            .then((dbUser) => {
              if (dbUser) {
                const freshData = {
                  id: dbUser.id,
                  fullName: dbUser.fullName || (dbUser.email ? dbUser.email.split('@')[0] : "Người dùng"),
                  email: dbUser.email || "",
                  avatarUrl: dbUser.avatarUrl || DEFAULT_AVATAR,
                  bio: dbUser.bio || "",
                  location: dbUser.location || "",
                  joinDate: dbUser.createdAt
                    ? new Date(dbUser.createdAt).toLocaleDateString("vi-VN", { month: "long", day: "numeric", year: "numeric" })
                    : "Chưa cập nhật",
                  website: dbUser.website || ""
                };
                setUser(freshData);
                setFormData(freshData);
                localStorage.setItem("user", JSON.stringify({ ...parsed, ...dbUser }));
              }
            })
            .catch((err) => console.warn("Lỗi kết nối API lấy profile:", err));
        }
      } catch (e) {
        console.error("Lỗi đọc user từ localStorage", e);
      }
    }
  }, []);

  // Mở modal đổi avatar
  const handleOpenAvatarModal = () => {
    setTempAvatarUrl(user.avatarUrl || DEFAULT_AVATAR);
    setIsAvatarModalOpen(true);
  };

  // Xử lý khi chọn file ảnh từ máy tính (Đọc thành Data URL Base64)
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Dung lượng ảnh vượt quá 5MB. Vui lòng chọn ảnh nhỏ hơn!");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempAvatarUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Xử lý Lưu Avatar Mới (Gửi Backend & Cập nhật Local Storage + Realtime Event)
  const handleSaveAvatar = async () => {
    if (!tempAvatarUrl) return;
    setIsUpdatingAvatar(true);

    const updatedAvatar = tempAvatarUrl;

    // 1. Nếu có userId, gửi API PUT lên Backend Java
    if (user.id) {
      try {
        await fetch(`http://localhost:8085/api/users/${user.id}/avatar`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ avatarUrl: updatedAvatar }),
        });
      } catch (err) {
        console.warn("Không thể kết nối Backend API, sẽ lưu local:", err);
      }
    }

    // 2. Cập nhật State trong Component
    const newUserData = { ...user, avatarUrl: updatedAvatar };
    setUser(newUserData);
    setFormData((prev) => ({ ...prev, avatarUrl: updatedAvatar }));

    // 3. Cập nhật vào localStorage
    const localUserStr = localStorage.getItem("user");
    let currentObj = localUserStr ? JSON.parse(localUserStr) : {};
    const newObj = { ...currentObj, avatarUrl: updatedAvatar };
    localStorage.setItem("user", JSON.stringify(newObj));

    // 4. Bắn sự kiện userUpdated để Header tự động đổi avatar tức thì
    window.dispatchEvent(new Event("userUpdated"));

    setIsUpdatingAvatar(false);
    setIsAvatarModalOpen(false);

    // Bật thông báo Toast
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  // Xử lý lưu thay đổi thông tin Hồ sơ
  const handleSaveChanges = async (e) => {
    e.preventDefault();
    setUser(formData);

    // 1. Gửi API lên Backend nếu có id người dùng
    if (user.id) {
      try {
        await fetch(`http://localhost:8085/api/users/${user.id}/profile`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fullName: formData.fullName,
            avatarUrl: formData.avatarUrl,
            bio: formData.bio,
            location: formData.location,
            website: formData.website,
          }),
        });
      } catch (err) {
        console.warn("Không thể kết nối API Backend khi lưu profile:", err);
      }
    }

    // 2. Cập nhật lại localStorage để Header và các trang khác đồng bộ
    const localUserStr = localStorage.getItem("user");
    let currentObj = localUserStr ? JSON.parse(localUserStr) : {};
    const newObj = {
      ...currentObj,
      fullName: formData.fullName,
      email: formData.email,
      avatarUrl: formData.avatarUrl,
      bio: formData.bio,
      location: formData.location,
      website: formData.website
    };

    localStorage.setItem("user", JSON.stringify(newObj));
    // Bắn event để Header lập tức cập nhật Avatar & Name
    window.dispatchEvent(new Event("userUpdated"));

    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-16 font-dmsans text-[#1E293B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-8">

        {/* ── 1. PROFILE HEADER CARD (BANNER NAVY) ── */}
        <div className="relative overflow-hidden rounded-3xl bg-[#0F172A] p-6 sm:p-8 md:p-10 shadow-2xl border border-slate-800 text-white">
          {/* Subtle Background Glow Accent */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">

            {/* ── Avatar Container tương tác trực tiếp ── */}
            <div className="relative shrink-0 group">
              <div
                onClick={handleOpenAvatarModal}
                className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-2xl overflow-hidden border-4 border-slate-700/60 shadow-xl bg-slate-800 relative cursor-pointer transition-all duration-300 group-hover:scale-[1.03] group-hover:border-amber-400/80"
                title="Bấm vào để đổi Ảnh Đại Diện"
              >
                <img
                  src={user.avatarUrl || DEFAULT_AVATAR}
                  alt={user.fullName}
                  className="w-full h-full object-cover transition-all duration-300 group-hover:opacity-80"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = DEFAULT_AVATAR;
                  }}
                  referrerPolicy="no-referrer"
                />

                {/* Hover Camera Overlay Icon */}
                <div className="absolute inset-0 bg-slate-950/50 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-200 flex flex-col items-center justify-center text-white gap-1">
                  <Camera size={26} className="text-amber-400 animate-bounce" />
                  <span className="text-[11px] font-bold tracking-wide uppercase bg-slate-900/90 px-2 py-0.5 rounded-full border border-slate-700">
                    Đổi Avatar
                  </span>
                </div>
              </div>

              {/* Premium Gold Badge */}
              <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-slate-950 font-black text-[10px] sm:text-[11px] tracking-wider uppercase px-3 py-1 rounded-full shadow-lg border border-amber-300/40 flex items-center gap-1 whitespace-nowrap">
                <Sparkles size={12} className="fill-slate-950 text-slate-950" />
                PREMIUM
              </div>
            </div>

            {/* User Info Header Details */}
            <div className="flex-1 text-center md:text-left space-y-3 pt-2">
              <div className="space-y-1">
                <div className="flex items-center justify-center md:justify-start gap-3">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white font-outfit">
                    {user.fullName}
                  </h1>
                  <button
                    onClick={handleOpenAvatarModal}
                    className="text-xs bg-slate-800 hover:bg-amber-500/20 text-amber-400 hover:text-amber-300 border border-slate-700 hover:border-amber-400/50 px-2.5 py-1 rounded-xl transition-all flex items-center gap-1.5 font-bold"
                  >
                    <Camera size={14} /> Đổi ảnh
                  </button>
                </div>
                <p className="text-sm sm:text-base text-slate-300 font-medium">
                  {user.bio}
                </p>
              </div>

              {/* Badges / Sub-info */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs sm:text-sm text-slate-400 font-medium pt-1">
                <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700/50">
                  <MapPin size={15} className="text-amber-400" />
                  <span>{user.location}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700/50">
                  <Calendar size={15} className="text-amber-400" />
                  <span>Member since {user.joinDate}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── 2. MAIN LAYOUT GRID (2 COLUMNS) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* ── LEFT COLUMN (MY COURSES) - 8 COLS ── */}
          <div className="lg:col-span-8 space-y-8">

            {/* Section Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-amber-500/10 text-amber-600 rounded-xl">
                  <BookOpen size={22} />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-outfit">
                  My Courses
                </h2>
              </div>
              <Link
                to="/courses"
                className="text-xs sm:text-sm font-semibold text-amber-600 hover:text-amber-700 flex items-center gap-1 hover:underline transition-all"
              >
                View Learning Path <ArrowRight size={14} />
              </Link>
            </div>

            {/* Course Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* ── COURSE CARD 1 ── */}
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-all duration-300">
                <div className="relative h-44 bg-slate-900 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=600"
                    alt="Advanced Calculus"
                    className="w-full h-full object-cover opacity-85 hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 right-3 bg-white/90 backdrop-blur text-slate-900 text-[10px] font-extrabold px-2.5 py-1 rounded-lg uppercase tracking-wider shadow">
                    INTERMEDIATE
                  </span>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 font-outfit leading-snug">
                      Advanced Calculus
                    </h3>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold text-slate-500">
                      <span>Course Progress</span>
                      <span className="text-slate-900 font-bold">75%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full w-[75%] transition-all duration-500" />
                    </div>
                  </div>

                  <Link
                    to="/courses/1/learn"
                    className="w-full py-2.5 bg-[#0F172A] hover:bg-[#1E293B] text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm hover:shadow transition-all active:scale-[0.98]"
                  >
                    <PlayCircle size={16} /> Continue Learning
                  </Link>
                </div>
              </div>

              {/* ── COURSE CARD 2 ── */}
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-all duration-300">
                <div className="relative h-44 bg-slate-900 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=600"
                    alt="Linear Algebra I"
                    className="w-full h-full object-cover opacity-85 hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 right-3 bg-white/90 backdrop-blur text-slate-900 text-[10px] font-extrabold px-2.5 py-1 rounded-lg uppercase tracking-wider shadow">
                    FUNDAMENTALS
                  </span>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 font-outfit leading-snug">
                      Linear Algebra I
                    </h3>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold text-slate-500">
                      <span>Course Progress</span>
                      <span className="text-emerald-600 font-bold">100%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-slate-900 rounded-full w-full transition-all duration-500" />
                    </div>
                  </div>

                  <button
                    onClick={() => alert("Chứng chỉ khóa học 'Linear Algebra I' đã được gửi đến email của bạn!")}
                    className="w-full py-2.5 border-2 border-slate-200 hover:border-slate-800 text-slate-800 hover:bg-slate-50 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                  >
                    <Award size={16} className="text-amber-500" /> Download Certificate
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* ── RIGHT COLUMN (SIDEBAR WIDGETS) - 4 COLS ── */}
          <div className="lg:col-span-4 space-y-6">

            {/* ── WIDGET 1: INFORMATION & EDIT PROFILE ── */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-bold text-base text-slate-900 font-outfit flex items-center gap-2">
                  Information
                </h3>
                <Edit3 size={16} className="text-slate-400" />
              </div>

              {/* Edit Form */}
              <form onSubmit={handleSaveChanges} className="space-y-4">

                {/* Full Name */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-800 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 outline-none transition-all"
                  />
                </div>

                {/* Primary Email */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Primary Email
                  </label>
                  <div className="relative flex items-center">
                    <Mail size={15} className="absolute left-3 text-slate-400 pointer-events-none" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3.5 py-2 text-xs font-semibold text-slate-800 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Avatar URL (Với Nút Đổi Nhanh) */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Avatar Image URL
                    </label>
                    <button
                      type="button"
                      onClick={handleOpenAvatarModal}
                      className="text-[11px] font-bold text-amber-600 hover:text-amber-700 hover:underline flex items-center gap-1"
                    >
                      <Camera size={12} /> Đổi bằng Modal
                    </button>
                  </div>
                  <div className="relative flex items-center">
                    <ImageIcon size={15} className="absolute left-3 text-slate-400 pointer-events-none" />
                    <input
                      type="url"
                      placeholder="Dán liên kết ảnh Avatar..."
                      value={formData.avatarUrl}
                      onChange={(e) => setFormData({ ...formData, avatarUrl: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3.5 py-2 text-xs font-semibold text-slate-800 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Join Date */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Join Date
                  </label>
                  <div className="relative flex items-center">
                    <Calendar size={15} className="absolute left-3 text-slate-400 pointer-events-none" />
                    <input
                      type="text"
                      disabled
                      value={formData.joinDate}
                      className="w-full bg-slate-100 border border-slate-200 rounded-xl pl-9 pr-3.5 py-2 text-xs font-semibold text-slate-500 cursor-not-allowed"
                    />
                  </div>
                </div>

                {/* Personal Website */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Personal Website
                  </label>
                  <div className="relative flex items-center">
                    <Globe size={15} className="absolute left-3 text-slate-400 pointer-events-none" />
                    <input
                      type="text"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3.5 py-2 text-xs font-semibold text-slate-800 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Toast Notification */}
                {isSaved && (
                  <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold px-3 py-2 rounded-xl animate-in fade-in duration-200">
                    <CheckCircle2 size={16} /> Đã cập nhật hồ sơ & Avatar thành công!
                  </div>
                )}

                {/* Save Changes Button */}
                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#9E571E] hover:bg-[#854716] text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all active:scale-[0.98] mt-2 flex items-center justify-center gap-1.5"
                >
                  <CheckCircle2 size={16} /> Save Changes
                </button>
              </form>
            </div>

            {/* ── WIDGET 2: MONTHLY GOALS ── */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-bold text-base text-slate-900 font-outfit flex items-center gap-2">
                  Monthly Goals
                </h3>
                <Target size={16} className="text-slate-400" />
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold text-slate-600">
                    <span>Study Hours (22h)</span>
                    <span className="text-slate-900">22h / 30h</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#9E571E] rounded-full w-[73%]" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold text-slate-600">
                    <span>Theorems Solved (45)</span>
                    <span className="text-slate-900">45 / 60</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#9E571E] rounded-full w-[75%]" />
                  </div>
                </div>
              </div>
            </div>

            {/* ── WIDGET 3: LIVE SESSIONS ── */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-bold text-base text-slate-900 font-outfit flex items-center gap-2">
                  Live Sessions
                </h3>
                <button
                  onClick={() => setLiveSessionsCollapsed(!liveSessionsCollapsed)}
                  className="text-slate-400 hover:text-slate-600 text-lg font-bold px-1"
                >
                  {liveSessionsCollapsed ? "+" : "−"}
                </button>
              </div>

              {!liveSessionsCollapsed && (
                <div className="space-y-3.5">
                  <div className="flex items-center gap-3.5 p-2.5 rounded-xl hover:bg-slate-50 transition-colors border border-slate-100">
                    <div className="bg-rose-50 text-rose-600 flex flex-col items-center justify-center w-11 h-11 rounded-xl font-black shrink-0 border border-rose-100">
                      <span className="text-[9px] uppercase tracking-wider font-extrabold">MAY</span>
                      <span className="text-sm leading-none">24</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                        Complex Analysis Lab
                      </h4>
                      <p className="text-[11px] text-slate-400 font-semibold flex items-center gap-1">
                        <Video size={12} className="text-slate-400" /> 10:00 AM • Online
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3.5 p-2.5 rounded-xl hover:bg-slate-50 transition-colors border border-slate-100">
                    <div className="bg-slate-100 text-slate-700 flex flex-col items-center justify-center w-11 h-11 rounded-xl font-black shrink-0 border border-slate-200">
                      <span className="text-[9px] uppercase tracking-wider font-extrabold">MAY</span>
                      <span className="text-sm leading-none">26</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                        Algebra Seminar
                      </h4>
                      <p className="text-[11px] text-slate-400 font-semibold flex items-center gap-1">
                        <Video size={12} className="text-slate-400" /> 02:00 PM • Zoom
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>

      {/* ── 3. MODAL ĐỔI ẢNH ĐẠI DIỆN NÂNG CAO (AVATAR EDIT MODAL) ── */}
      {isAvatarModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 flex flex-col animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Modal */}
            <div className="bg-slate-900 text-white p-5 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-amber-500/20 text-amber-400 rounded-xl">
                  <Camera size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-base sm:text-lg font-outfit leading-snug">
                    Thay Đổi Ảnh Đại Diện
                  </h3>
                  <p className="text-xs text-slate-400 font-medium">
                    Tải ảnh từ máy, chọn từ bộ sưu tập hoặc dán link
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsAvatarModalOpen(false)}
                className="text-slate-400 hover:text-white p-1.5 rounded-xl hover:bg-slate-800 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-6 space-y-6">

              {/* Box Preview Ảnh Avatar hiện tại / Mới chọn */}
              <div className="flex flex-col items-center justify-center bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Xem trước ảnh đại diện
                </span>
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-4 border-amber-500/80 shadow-lg bg-slate-200 relative group">
                  <img
                    src={tempAvatarUrl || DEFAULT_AVATAR}
                    alt="Preview Avatar"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = DEFAULT_AVATAR;
                    }}
                  />
                </div>
              </div>

              {/* Tabs chuyển đổi giữa 3 phương thức */}
              <div className="flex bg-slate-100 p-1 rounded-2xl gap-1 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setAvatarTab("preset")}
                  className={`flex-1 py-2 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 ${avatarTab === "preset"
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-900"
                    }`}
                >
                  <Sparkles size={14} className="text-amber-500" />
                  <span>Bộ sưu tập</span>
                </button>

                <button
                  type="button"
                  onClick={() => setAvatarTab("upload")}
                  className={`flex-1 py-2 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 ${avatarTab === "upload"
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-900"
                    }`}
                >
                  <Upload size={14} className="text-blue-500" />
                  <span>Tải từ máy</span>
                </button>

                <button
                  type="button"
                  onClick={() => setAvatarTab("url")}
                  className={`flex-1 py-2 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 ${avatarTab === "url"
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-900"
                    }`}
                >
                  <Link2 size={14} className="text-emerald-500" />
                  <span>Link URL</span>
                </button>
              </div>

              {/* Nội dung Tab 1: Bộ sưu tập Mẫu (Presets) */}
              {avatarTab === "preset" && (
                <div className="space-y-3">
                  <p className="text-xs font-semibold text-slate-500">
                    Chọn một trong các ảnh đại diện tuyệt đẹp bên dưới:
                  </p>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                    {PRESET_AVATARS.map((item) => {
                      const isSelected = tempAvatarUrl === item.url;
                      return (
                        <div
                          key={item.id}
                          onClick={() => setTempAvatarUrl(item.url)}
                          className={`relative aspect-square rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${isSelected
                            ? "border-amber-500 ring-2 ring-amber-500/30 scale-105"
                            : "border-slate-200 hover:border-slate-400"
                            }`}
                          title={item.name}
                        >
                          <img
                            src={item.url}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                          {isSelected && (
                            <div className="absolute inset-0 bg-amber-500/30 flex items-center justify-center">
                              <Check size={18} className="text-white drop-shadow-md stroke-[3]" />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Nội dung Tab 2: Tải lên từ máy (File Upload) */}
              {avatarTab === "upload" && (
                <div className="space-y-3">
                  <p className="text-xs font-semibold text-slate-500">
                    Tải tệp hình ảnh (.jpg, .png, .webp) từ máy tính của bạn:
                  </p>
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-300 hover:border-amber-500 bg-slate-50 hover:bg-amber-50/30 rounded-2xl cursor-pointer transition-all">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6 text-slate-500">
                      <Upload size={28} className="text-slate-400 mb-2" />
                      <p className="text-xs font-bold text-slate-700">
                        Nhấp vào đây để chọn tệp từ máy
                      </p>
                      <p className="text-[11px] text-slate-400">
                        Hỗ trợ PNG, JPG, GIF (Tối đa 5MB)
                      </p>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              )}

              {/* Nội dung Tab 3: Dán link URL */}
              {avatarTab === "url" && (
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-600">
                    Dán liên kết ảnh đại diện (HTTPS Image URL):
                  </label>
                  <div className="relative flex items-center">
                    <Link2 size={16} className="absolute left-3 text-slate-400" />
                    <input
                      type="url"
                      placeholder="https://example.com/avatar.jpg"
                      value={tempAvatarUrl}
                      onChange={(e) => setTempAvatarUrl(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 outline-none transition-all"
                    />
                  </div>
                </div>
              )}

            </div>

            {/* Footer Modal Actions */}
            <div className="bg-slate-50 p-4 border-t border-slate-200 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsAvatarModalOpen(false)}
                className="px-4 py-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 rounded-xl text-xs font-bold transition-all"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={handleSaveAvatar}
                disabled={isUpdatingAvatar}
                className="px-5 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-extrabold text-xs rounded-xl shadow-md transition-all active:scale-[0.98] flex items-center gap-1.5 disabled:opacity-50"
              >
                {isUpdatingAvatar ? (
                  <>
                    <RefreshCw size={14} className="animate-spin" /> Đang lưu...
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={15} /> Lưu Avatar Mới
                  </>
                )}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
