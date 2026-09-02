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
  ExternalLink,
  Sparkles
} from "lucide-react";
import { Link } from "react-router-dom";

// Ảnh avatar mặc định tuyệt đẹp nếu user chưa có avatar
const DEFAULT_AVATAR = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400";

export default function ProfilePage() {
  // State quản lý thông tin User
  const [user, setUser] = useState({
    fullName: "Alex Morgan",
    email: "alex.m@stanford.edu",
    avatarUrl: DEFAULT_AVATAR,
    bio: "Mathematics Enthusiast | Graduate Research Fellow at Stanford",
    location: "Palo Alto, CA",
    joinDate: "September 12, 2023",
    website: "alexmorgan.math"
  });

  const [formData, setFormData] = useState({ ...user });
  const [isSaved, setIsSaved] = useState(false);
  const [liveSessionsCollapsed, setLiveSessionsCollapsed] = useState(false);

  // Đọc thông tin từ localStorage khi mount
  useEffect(() => {
    const localUser = localStorage.getItem("user");
    if (localUser) {
      try {
        const parsed = JSON.parse(localUser);
        const updated = {
          fullName: parsed.fullName || parsed.name || "Alex Morgan",
          email: parsed.email || "alex.m@stanford.edu",
          avatarUrl: parsed.avatarUrl || parsed.avatar || DEFAULT_AVATAR,
          bio: parsed.bio || "Mathematics Enthusiast | Graduate Research Fellow at Stanford",
          location: parsed.location || "Palo Alto, CA",
          joinDate: parsed.createdAt 
            ? new Date(parsed.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
            : "September 12, 2023",
          website: parsed.website || "alexmorgan.math"
        };
        setUser(updated);
        setFormData(updated);
      } catch (e) {
        console.error("Lỗi đọc user từ localStorage", e);
      }
    }
  }, []);

  // Xử lý lưu thay đổi
  const handleSaveChanges = (e) => {
    e.preventDefault();
    setUser(formData);

    // Cập nhật lại localStorage để Header và các trang khác đồng bộ
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
    // Bắn event để Header lập tức cập nhật Avatar
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
            {/* Avatar Container with Badge */}
            <div className="relative shrink-0 group">
              <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-2xl overflow-hidden border-4 border-slate-700/60 shadow-xl bg-slate-800 relative transition-transform duration-300 group-hover:scale-[1.02]">
                <img
                  src={user.avatarUrl || DEFAULT_AVATAR}
                  alt={user.fullName}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = DEFAULT_AVATAR;
                  }}
                  referrerPolicy="no-referrer"
                />
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
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white font-outfit">
                  {user.fullName}
                </h1>
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
                {/* Course Banner */}
                <div className="relative h-44 bg-slate-900 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=600" 
                    alt="Advanced Calculus"
                    className="w-full h-full object-cover opacity-85 hover:scale-105 transition-transform duration-500"
                  />
                  {/* Category Pill */}
                  <span className="absolute top-3 right-3 bg-white/90 backdrop-blur text-slate-900 text-[10px] font-extrabold px-2.5 py-1 rounded-lg uppercase tracking-wider shadow">
                    INTERMEDIATE
                  </span>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 font-outfit leading-snug">
                      Advanced Calculus
                    </h3>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold text-slate-500">
                      <span>Course Progress</span>
                      <span className="text-slate-900 font-bold">75%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full w-[75%] transition-all duration-500" />
                    </div>
                  </div>

                  {/* Continue Learning Button */}
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
                {/* Course Banner */}
                <div className="relative h-44 bg-slate-900 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=600" 
                    alt="Linear Algebra I"
                    className="w-full h-full object-cover opacity-85 hover:scale-105 transition-transform duration-500"
                  />
                  {/* Category Pill */}
                  <span className="absolute top-3 right-3 bg-white/90 backdrop-blur text-slate-900 text-[10px] font-extrabold px-2.5 py-1 rounded-lg uppercase tracking-wider shadow">
                    FUNDAMENTALS
                  </span>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 font-outfit leading-snug">
                      Linear Algebra I
                    </h3>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold text-slate-500">
                      <span>Course Progress</span>
                      <span className="text-emerald-600 font-bold">100%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-slate-900 rounded-full w-full transition-all duration-500" />
                    </div>
                  </div>

                  {/* Download Certificate Button */}
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

                {/* Avatar URL */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Avatar Image URL
                  </label>
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

                {/* Save Changes Button (Brownish Gold Gradient like Image) */}
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
                {/* Goal 1 */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold text-slate-600">
                    <span>Study Hours (22h)</span>
                    <span className="text-slate-900">22h / 30h</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#9E571E] rounded-full w-[73%]" />
                  </div>
                </div>

                {/* Goal 2 */}
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
                  {/* Event 1 */}
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

                  {/* Event 2 */}
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
    </div>
  );
}
