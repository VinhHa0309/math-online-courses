import { Search, Bell, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import BrandLogo from "../common/BrandLogo";

const NAV_LINKS = [
  { label: "Khoá học", path: "/courses" },
  { label: "Luyện tập", path: "/practice" },
  { label: "Tài Liệu", path: "/resources" },
  { label: "Tin tức", path: "/news" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const location = useLocation(); // Lấy thông tin đường dẫn hiện tại

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
          <nav className="hdr-nav hidden md:flex items-center gap-1 flex-1 ml-4">
            {NAV_LINKS.map((l) => {
              // Kiểm tra xem URL hiện tại có trùng với path của link hay không
              const isActive = location.pathname === l.path;

              return (
                <Link
                  key={l.label}
                  to={l.path}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? "bg-[#FDF2E9] text-[#F08A4B] font-bold" // Style khi đang ở đúng trang
                      : "text-[#6B7A90] hover:text-[#1A2B47] hover:bg-[#F8FAFC]" // Style khi ở trang khác
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
            <button className="hidden sm:flex relative items-center justify-center w-9 h-9 rounded-xl text-[#6B7A90] hover:bg-[#F8FAFC] hover:text-[#1A2B47] border border-transparent hover:border-[#F2EDE6] transition-all">
              <Bell className="w-[18px] h-[18px]" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#F08A4B] ring-2 ring-white" />
            </button>

            {/* Nút Đăng nhập */}
            <Link
              to="/login"
              state={{ mode: "login" }}
              className="hidden sm:flex items-center gap-1.5 bg-[#FDF2E9] text-[#F08A4B] hover:bg-[#FAD7BC] active:scale-95 text-sm font-semibold px-4 py-2 rounded-xl transition-all whitespace-nowrap"
            >
              Đăng nhập
            </Link>

            {/* Nút Đăng ký */}
            <Link
              to="/login"
              state={{ mode: "register" }}
              className="hidden lg:flex items-center bg-[#1A2B47] hover:bg-[#253D63] active:scale-95 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all whitespace-nowrap"
            >
              Đăng ký
            </Link>

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
            {/* ... (Các phần Search Mobile và Button Mobile giữ nguyên như code của bạn) ... */}
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
            <div className="flex gap-3 pt-2">
              <Link
                to="/login"
                state={{ mode: "login" }}
                onClick={() => setIsMenuOpen(false)}
                className="flex-1 bg-[#FDF2E9] text-[#F08A4B] text-center text-sm font-semibold py-2.5 rounded-xl transition-all"
              >
                Đăng nhập
              </Link>
              <Link
                to="/login"
                state={{ mode: "register" }}
                onClick={() => setIsMenuOpen(false)}
                className="flex-1 bg-[#1A2B47] text-white text-center text-sm font-semibold py-2.5 rounded-xl transition-all"
              >
                Đăng ký
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
