import { Search, Bell, Menu, X, LogOut, User, GraduationCap, Target, FileText, Newspaper, Shield } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import BrandLogo from "../common/BrandLogo";

const NAV_LINKS = [
  { label: "Khoá học", path: "/courses", icon: GraduationCap },
  { label: "Luyện tập", path: "/practice", icon: Target },
  { label: "Tài Liệu", path: "/resources", icon: FileText },
  { label: "Tin tức", path: "/news", icon: Newspaper },
];

const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    title: "Mở khóa bài học mới! 🎉",
    description: "Bạn đã đủ điều kiện học 'Bài 2: Hàm số bậc hai và Parabol'.",
    time: "5m trước",
    isRead: false,
    type: "success"
  },
  {
    id: 2,
    title: "Tài liệu mới được cập nhật 📚",
    description: "Tài liệu 'Bài tập rèn luyện hàm số bậc nhất' vừa được tải lên.",
    time: "1h trước",
    isRead: false,
    type: "info"
  },
  {
    id: 3,
    title: "Ưu đãi giới hạn ⚡",
    description: "Khóa học 'Thống kê và Xác suất' đang giảm giá 15% hôm nay.",
    time: "1d trước",
    isRead: true,
    type: "promo"
  }
];

export default function Header() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const location = useLocation();

  // State lưu trữ thông tin user đã đăng nhập & danh sách thông báo
  const [currentUser, setCurrentUser] = useState(null);
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = (userId) => {
    if (!userId) return;
    fetch(`http://localhost:8085/api/notifications/user/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setNotifications(data);
        }
      })
      .catch((err) => console.error("Lỗi lấy thông báo:", err));
  };

  // Đọc thông tin user từ localStorage khi Header render & lắng nghe sự kiện userUpdated
  useEffect(() => {
    const loadUser = () => {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          setCurrentUser(user);
          if (user && user.id) {
            fetchNotifications(user.id);
          }
        } catch (e) {
          console.error("Lỗi parse user info từ localStorage", e);
        }
      } else {
        setCurrentUser(null);
        setNotifications([]);
      }
    };

    loadUser();
    window.addEventListener("userUpdated", loadUser);
    return () => window.removeEventListener("userUpdated", loadUser);
  }, []);

  // Tự động làm mới thông báo định kỳ mỗi 10 giây nếu đã đăng nhập
  useEffect(() => {
    if (!currentUser || !currentUser.id) return;
    const interval = setInterval(() => {
      fetchNotifications(currentUser.id);
    }, 10000);
    return () => clearInterval(interval);
  }, [currentUser]);

  const handleMarkAllRead = () => {
    if (!currentUser || !currentUser.id) return;
    fetch(`http://localhost:8085/api/notifications/user/${currentUser.id}/read-all`, {
      method: "PATCH",
    })
      .then(() => {
        setNotifications((prev) => prev.map((n) => ({ ...n, read: true, isRead: true })));
      })
      .catch((err) => console.error("Lỗi đánh dấu đã đọc:", err));
  };

  const handleNotificationClick = (notif) => {
    if (!notif.read && !notif.isRead) {
      fetch(`http://localhost:8085/api/notifications/${notif.id}/read`, { method: "PATCH" })
        .catch(() => null);
      setNotifications((prev) =>
        prev.map((n) => (n.id === notif.id ? { ...n, read: true, isRead: true } : n))
      );
    }
    setIsNotifOpen(false);
    if (notif.courseId) {
      navigate(`/courses/${notif.courseId}/learn`);
    }
  };

  const unreadCount = notifications.filter((n) => !n.read && !n.isRead).length;

  // Hàm xử lý Đăng xuất
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setCurrentUser(null);
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@800&family=Be+Vietnam+Pro:wght@400;500;600;700&display=swap');
        .hdr-logo { font-family: 'Playfair Display', serif; }
        .hdr-nav  { font-family: 'Be Vietnam Pro', sans-serif; }
      `}</style>

      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-[#F2EDE6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-3 lg:gap-6">
          {/* ── Logo ── */}
          <Link to="/" className="shrink-0 flex items-center">
            <BrandLogo size="xs" dark={false} showText={true} textColor="#1A2B47" />
          </Link>

          {/* ── Nav (Desktop & Tablet) ── */}
          <nav className="hdr-nav hidden md:flex items-center gap-1 xl:gap-2 ml-1 lg:ml-4">
            {NAV_LINKS.map((l) => {
              const Icon = l.icon;
              const isActive = location.pathname === l.path;
              return (
                <Link
                  key={l.label}
                  to={l.path}
                  className={`flex items-center gap-2 px-2.5 lg:px-3.5 py-2 rounded-xl text-xs lg:text-sm font-semibold transition-all whitespace-nowrap ${isActive
                    ? "bg-[#FDF2E9] text-[#F08A4B] font-bold shadow-xs"
                    : "text-[#6B7A90] hover:text-[#1A2B47] hover:bg-[#F8FAFC]"
                    }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-[#F08A4B]" : "text-slate-400"}`} />
                  <span>{l.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* ── Right Section ── */}
          <div className="flex items-center gap-2 ml-auto">
            {/* Search Bar */}
            <div className="hidden sm:flex items-center bg-[#F8FAFC] border border-[#F2EDE6] rounded-xl px-3 gap-2 h-9 w-44 lg:w-60 focus-within:border-[#F08A4B]/50 focus-within:ring-2 focus-within:ring-[#F08A4B]/10 transition-all">
              <Search className="w-3.5 h-3.5 text-[#9CA3B0] shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Tìm khoá học..."
                className="bg-transparent text-sm text-[#1A2B47] placeholder-[#C4CDD6] outline-none w-full"
              />
            </div>

            {/* Bell Icon */}
            <div className="relative">
              <button
                onClick={() => setIsNotifOpen(!isNotifOpen)}
                className={`hidden sm:flex relative items-center justify-center w-9 h-9 rounded-xl text-[#6B7A90] hover:bg-[#F8FAFC] hover:text-[#1A2B47] border transition-all ${isNotifOpen ? "bg-[#F8FAFC] border-[#F2EDE6] text-[#1A2B47]" : "border-transparent"
                  }`}
              >
                <Bell className="w-[18px] h-[18px]" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-[#F08A4B] text-white text-[10px] font-black rounded-full ring-2 ring-white flex items-center justify-center shadow-xs">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Dropdown notifications */}
              {isNotifOpen && (
                <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-white border border-[#F2EDE6] rounded-2xl shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="p-4 border-b border-[#F2EDE6] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-outfit font-bold text-sm text-[#1A2B47]">Thông báo</span>
                      {unreadCount > 0 && (
                        <span className="text-[10px] bg-orange-100 text-orange-600 font-bold px-2 py-0.5 rounded-full">
                          {unreadCount} mới
                        </span>
                      )}
                    </div>
                    {unreadCount > 0 && (
                      <button
                        onClick={handleMarkAllRead}
                        className="text-xs text-[#F08A4B] font-semibold hover:underline"
                      >
                        Đọc tất cả
                      </button>
                    )}
                  </div>

                  <div className="max-h-80 overflow-y-auto divide-y divide-[#F8FAFC]">
                    {notifications.length === 0 ? (
                      <div className="p-6 text-center text-xs text-slate-400">
                        Chưa có thông báo nào.
                      </div>
                    ) : (
                      notifications.map((n) => {
                        const isUnread = !n.read && !n.isRead;
                        return (
                          <div
                            key={n.id}
                            onClick={() => handleNotificationClick(n)}
                            className={`p-4 hover:bg-[#F8FAFC] cursor-pointer transition-colors flex gap-3 ${isUnread ? "bg-[#FFF8F3]" : ""
                              }`}
                          >
                            <div className="mt-1.5 shrink-0">
                              <span className={`block w-2.5 h-2.5 rounded-full ${n.type === "success"
                                ? "bg-emerald-500"
                                : n.type === "warning"
                                  ? "bg-rose-500"
                                  : "bg-blue-500"
                                }`} />
                            </div>

                            <div className="space-y-1 flex-1">
                              <div className="flex justify-between items-start gap-1">
                                <h4 className={`text-xs font-bold leading-snug ${isUnread ? "text-[#1A2B47]" : "text-slate-600"}`}>
                                  {n.title}
                                </h4>
                                {n.createdAt && (
                                  <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap ml-2">
                                    {new Date(n.createdAt).toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })}
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-slate-500 leading-normal font-dmsans">
                                {n.description}
                              </p>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Khối hiển thị có điều kiện: Đã đăng nhập vs Chưa đăng nhập */}
            {currentUser ? (
              // HIỂN THỊ KHI ĐÃ ĐĂNG NHẬP
              <div className="flex items-center gap-2.5 ml-2">
                {/* Nút Admin Portal nếu vai trò là ADMIN */}
                {(currentUser.role === "ADMIN" || currentUser.role === "INSTRUCTOR") && (
                  <Link
                    to="/admin"
                    className="hidden sm:flex items-center gap-1.5 bg-[#0B132B] text-white hover:bg-[#1A2B47] text-xs font-bold px-3 py-2 rounded-xl transition-all shadow-xs"
                    title="Trang quản trị Admin"
                  >
                    <Shield size={14} className="text-orange-400" />
                    <span>Admin Portal</span>
                  </Link>
                )}

                {/* Icon tròn đại diện cho User (Avatar) - Bấm vào chuyển hướng tới trang cá nhân /profile */}
                <Link
                  to="/profile"
                  className="w-9 h-9 rounded-xl border border-[#F2EDE6] bg-[#F8FAFC] flex items-center justify-center text-[#6B7A90] hover:text-[#1A2B47] hover:bg-[#FDF2E9] hover:border-[#FDF2E9] hover:scale-105 transition-all cursor-pointer overflow-hidden shadow-sm"
                  title={`Trang cá nhân của ${currentUser.fullName || "User"}`}
                >
                  {currentUser.avatarUrl ? (
                    <img
                      src={currentUser.avatarUrl}
                      alt={currentUser.fullName}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <User size={16} />
                  )}
                </Link>

                {/* Nút Đăng xuất */}
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center w-9 h-9 rounded-xl border border-red-100 text-red-500 hover:bg-red-50 active:scale-95 transition-all"
                  title="Đăng xuất"
                >
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              // HIỂN THỊ KHI CHƯA ĐĂNG NHẬP
              <>
                <Link
                  to="/login"
                  className="hidden sm:flex items-center gap-1.5 bg-[#FDF2E9] text-[#F08A4B] hover:bg-[#FAD7BC] active:scale-95 text-sm font-semibold px-4 py-2 rounded-xl transition-all whitespace-nowrap"
                >
                  Đăng nhập
                </Link>

                <Link
                  to="/register"
                  className="hidden lg:flex items-center bg-[#1A2B47] hover:bg-[#253D63] active:scale-95 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all whitespace-nowrap"
                >
                  Đăng ký
                </Link>
              </>
            )}

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-xl border border-[#F2EDE6] text-[#1A2B47] hover:bg-[#F8FAFC] transition-all"
              aria-label="Menu"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* ── Mobile Dropdown ── */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-[#F2EDE6] bg-white px-5 pb-5 pt-4 space-y-1 shadow-xl">
            {NAV_LINKS.map((l) => {
              const Icon = l.icon;
              const isActive = location.pathname === l.path;
              return (
                <Link
                  key={l.label}
                  to={l.path}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${isActive
                    ? "bg-[#FDF2E9] text-[#F08A4B] font-bold"
                    : "text-[#6B7A90] hover:text-[#1A2B47] hover:bg-[#F8FAFC]"
                    }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-[#F08A4B]" : "text-slate-400"}`} />
                  <span>{l.label}</span>
                </Link>
              );
            })}

            <div className="pt-3 pb-1 border-t border-[#F2EDE6] mt-3">
              <div className="flex items-center bg-[#F8FAFC] border border-[#F2EDE6] rounded-xl px-3 gap-2 h-10 focus-within:border-[#F08A4B]/50 transition-all">
                <Search className="w-3.5 h-3.5 text-[#9CA3B0] shrink-0" />
                <input
                  type="text"
                  placeholder="Tìm khoá học..."
                  className="bg-transparent text-sm text-[#1A2B47] placeholder-[#C4CDD6] outline-none w-full"
                />
              </div>
            </div>

            <div className="pt-2">
              {currentUser ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-2.5 border border-[#F2EDE6] bg-[#F8FAFC] px-4 py-3 rounded-xl">
                    {currentUser.avatarUrl ? (
                      <img
                        src={currentUser.avatarUrl}
                        alt={currentUser.fullName}
                        className="w-6 h-6 rounded-full object-cover shrink-0"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <User size={15} className="text-[#F08A4B]" />
                    )}
                    <span className="text-sm font-bold text-[#1A2B47]">{currentUser.fullName}</span>
                  </div>
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      handleLogout();
                    }}
                    className="w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 text-sm font-bold py-3 rounded-xl transition-all"
                  >
                    <LogOut size={16} /> Đăng xuất
                  </button>
                </div>
              ) : (
                <div className="flex gap-3">
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex-1 bg-[#FDF2E9] text-[#F08A4B] text-center text-sm font-semibold py-2.5 rounded-xl transition-all"
                  >
                    <LogOut size={16} /> Đăng nhập
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex-1 bg-[#1A2B47] text-white text-center text-sm font-semibold py-2.5 rounded-xl transition-all"
                  >
                    Đăng ký
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
}
