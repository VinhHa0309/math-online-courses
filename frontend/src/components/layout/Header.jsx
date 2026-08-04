import { Search, Bell, Menu, X, LogOut, User } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import BrandLogo from "../common/BrandLogo";

const NAV_LINKS = [
  { label: "Khoá học", path: "/courses" },
  { label: "Luyện tập", path: "/practice" },
  { label: "Tài Liệu", path: "/resources" },
  { label: "Tin tức", path: "/news" },
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

  // State lưu trữ thông tin user đã đăng nhập
  const [currentUser, setCurrentUser] = useState(null);

  // Đọc thông tin user từ localStorage khi Header render
  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        setCurrentUser(JSON.parse(userStr));
      } catch (e) {
        console.error("Lỗi parse user info từ localStorage", e);
      }
    }
  }, []);

  // Hàm xử lý Đăng xuất
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setCurrentUser(null);
    alert("Đã đăng xuất tài khoản!");
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@800&family=DM+Sans:wght@400;500;600&display=swap');
        .hdr-logo { font-family: 'Playfair Display', serif; }
        .hdr-nav  { font-family: 'DM Sans', sans-serif; }
      `}</style>

      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-[#F2EDE6]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center gap-6">
          {/* ── Logo ── */}
          <Link to="/" className="shrink-0 flex items-center">
            <BrandLogo size="xs" dark={false} showText={true} textColor="#1A2B47" />
          </Link>

          {/* ── Nav (Desktop) ── */}
          <nav className="hdr-nav hidden md:flex items-center gap-1 ml-4">
            {NAV_LINKS.map((l) => {
              const isActive = location.pathname === l.path;
              return (
                <Link
                  key={l.label}
                  to={l.path}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? "bg-[#FDF2E9] text-[#F08A4B] font-bold"
                      : "text-[#6B7A90] hover:text-[#1A2B47] hover:bg-[#F8FAFC]"
                  }`}
                >
                  {l.label}
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
                className={`hidden sm:flex relative items-center justify-center w-9 h-9 rounded-xl text-[#6B7A90] hover:bg-[#F8FAFC] hover:text-[#1A2B47] border transition-all ${
                  isNotifOpen ? "bg-[#F8FAFC] border-[#F2EDE6] text-[#1A2B47]" : "border-transparent"
                }`}
              >
                <Bell className="w-[18px] h-[18px]" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#F08A4B] ring-2 ring-white" />
              </button>

              {/* Dropdown notifications */}
              {isNotifOpen && (
                <div className="absolute right-0 mt-3 w-80 bg-white border border-[#F2EDE6] rounded-2xl shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="p-4 border-b border-[#F2EDE6] flex items-center justify-between">
                    <span className="font-outfit font-bold text-sm text-[#1A2B47]">Thông báo</span>
                    <button className="text-xs text-[#F08A4B] font-semibold hover:underline">
                      Đọc tất cả
                    </button>
                  </div>

                  <div className="max-h-72 overflow-y-auto divide-y divide-[#F8FAFC]">
                    {MOCK_NOTIFICATIONS.map((n) => (
                      <div 
                        key={n.id} 
                        className={`p-4 hover:bg-[#F8FAFC] transition-colors flex gap-3 ${
                          !n.isRead ? "bg-[#FFFDFB]/80" : ""
                        }`}
                      >
                        <div className="mt-1.5 shrink-0">
                          <span className={`block w-2.5 h-2.5 rounded-full ${
                            n.type === "success" 
                              ? "bg-emerald-500" 
                              : n.type === "info" 
                              ? "bg-blue-500" 
                              : "bg-orange-500"
                          }`} />
                        </div>

                        <div className="space-y-1 flex-1">
                          <div className="flex justify-between items-start gap-1">
                            <h4 className="text-xs font-bold text-[#1A2B47] leading-snug">
                              {n.title}
                            </h4>
                            <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap">
                              {n.time}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 leading-normal font-dmsans">
                            {n.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-3 bg-[#F8FAFC] text-center border-t border-[#F2EDE6]">
                    <button className="text-xs font-semibold text-[#1A2B47] hover:text-[#F08A4B] transition-colors">
                      Xem tất cả thông báo
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Khối hiển thị có điều kiện: Đã đăng nhập vs Chưa đăng nhập */}
            {currentUser ? (
              // HIỂN THỊ KHI ĐÃ ĐĂNG NHẬP
              <div className="flex items-center gap-3 ml-2">
                {/* Icon tròn đại diện cho User (Avatar) */}
                <div 
                  className="w-9 h-9 rounded-xl border border-[#F2EDE6] bg-[#F8FAFC] flex items-center justify-center text-[#6B7A90] hover:text-[#1A2B47] hover:bg-[#FDF2E9] hover:border-[#FDF2E9] transition-all cursor-pointer overflow-hidden"
                  title={currentUser.fullName}
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
                </div>
                
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
              const isActive = location.pathname === l.path;
              return (
                <Link
                  key={l.label}
                  to={l.path}
                  className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? "bg-[#FDF2E9] text-[#F08A4B] font-bold"
                      : "text-[#6B7A90] hover:text-[#1A2B47] hover:bg-[#F8FAFC]"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {l.label}
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
