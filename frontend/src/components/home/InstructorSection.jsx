import { useState, useEffect } from "react";
import { BookOpen, User as UserIcon, FileText, ShieldCheck } from "lucide-react";
import { API_BASE_URL } from "../../config/api";

// Danh sách Giảng viên / Admin mặc định fallback
const DEFAULT_INSTRUCTORS = [
  { id: "def-1", fullName: "Cô Thu Sương", role: "ADMIN", bio: "Chuyên gia Luyện thi THPT Quốc Gia & Đại số", avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=80" },
  { id: "def-2", fullName: "TS. Sarah Chen", role: "ADMIN", bio: "Tiến sĩ Lý Thuyết Số & Toán Mật Mã", avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80" },
  { id: "def-3", fullName: "GS. Marcus Vance", role: "ADMIN", bio: "Chuyên gia Hình Học Không Gian & Trực Quan Hóa", avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80" },
  { id: "def-4", fullName: "TS. James Wilson", role: "ADMIN", bio: "Tiên phong Logic Học & Đại Số Tuyến Tính", avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=80" }
];

function InstructorCard({ fullName, name, bio, role, avatarUrl, avatar, isCurrentUser }) {
  const displayName = fullName || name || "Giảng viên SuongMath";
  const displayAvatar = avatarUrl || avatar || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=80";
  const displayTitle = role === "ADMIN" ? "BAN LÃNH ĐẠO HỌC THUẬT" : (role || "GIẢNG VIÊN HỌC THUẬT");
  const displayDesc = bio || "Giảng viên chuyên sâu phương pháp tư duy toán học và luyện thi THPT Quốc Gia.";

  return (
    <div className={`group bg-white border rounded-2xl overflow-hidden flex flex-col transition-all duration-300 shadow-sm hover:shadow-md ${isCurrentUser ? "border-amber-400 ring-2 ring-amber-400/20" : "border-[#F0EBE3] hover:border-[#FAD7BC]"
      }`}>
      {/* Image */}
      <div className="relative h-56 overflow-hidden bg-[#F5F0EA]">
        <img
          src={displayAvatar}
          alt={displayName}
          className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=80";
          }}
        />

        {/* Badge Tự hào cho Admin hiện tại đang đăng nhập */}
        {isCurrentUser && (
          <span className="absolute top-2.5 right-2.5 bg-amber-500 text-slate-950 font-black text-[10px] uppercase px-2.5 py-1 rounded-full shadow-lg flex items-center gap-1">
            <ShieldCheck size={13} /> Tài khoản của bạn
          </span>
        )}

        {/* Role tag */}
        <span className="absolute bottom-2.5 left-2.5 bg-[#1A2B47] text-white text-[9px] font-extrabold tracking-wider uppercase px-2.5 py-1 rounded-full shadow-sm">
          {displayTitle}
        </span>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col gap-2 flex-1">
        <h3 className="text-base font-extrabold text-[#1A2B47] leading-snug line-clamp-1 font-outfit flex items-center gap-1.5">
          {displayName}
        </h3>
        <p className="text-[10px] font-bold text-[#F08A4B] tracking-widest uppercase">
          {displayTitle}
        </p>
        <p className="text-xs text-[#7A8A9C] leading-relaxed flex-1 line-clamp-2 font-medium">
          {displayDesc}
        </p>

        <div className="border-t border-[#F2EDE6] my-1" />

        {/* Footer */}
        <div className="flex items-center justify-between pt-1">
          <span className="flex items-center gap-1.5 text-xs font-semibold text-[#6B7A90]">
            <BookOpen className="w-3.5 h-3.5 text-[#F08A4B]" />
            Giảng viên hệ thống
          </span>
          <div className="flex items-center gap-1">
            <button
              className="p-1.5 rounded-lg hover:bg-[#FDF2E9] transition-colors cursor-pointer"
              title="Hồ sơ giảng viên"
            >
              <UserIcon className="w-4 h-4 text-[#C0C8D4] group-hover:text-[#F08A4B] transition-colors" />
            </button>
            <button
              className="p-1.5 rounded-lg hover:bg-[#FDF2E9] transition-colors cursor-pointer"
              title="Bài viết"
            >
              <FileText className="w-4 h-4 text-[#C0C8D4] group-hover:text-[#F08A4B] transition-colors" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function InstructorSection() {
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadInstructors = () => {
    let currentUser = null;
    try {
      const userStr = localStorage.getItem("user");
      if (userStr) currentUser = JSON.parse(userStr);
    } catch (e) {
      console.error("Lỗi đọc user:", e);
    }

    fetch(`${API_BASE_URL}/api/instructors`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          // Lấy danh sách các Admin thật từ Database PostgreSQL
          const dbAdmins = data.map((u) => ({
            id: u.id,
            fullName: u.fullName || u.name || (u.email ? u.email.split('@')[0] : "Giảng viên Admin"),
            role: u.role || "ADMIN",
            bio: u.bio || "Ban Lãnh Đạo Học Thuật & Quản Trị Hệ Thống",
            avatarUrl: u.avatarUrl || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=80",
            email: u.email,
            isCurrentUser: false,
          }));

          let finalCards = [];

          const roleUpper = (currentUser?.role || "").toUpperCase();
          const isAdminUser =
            currentUser &&
            (roleUpper === "ADMIN" ||
              roleUpper === "INSTRUCTOR" ||
              (currentUser.email && (currentUser.email.toLowerCase().includes("admin") || currentUser.email.toLowerCase().includes("suongmath"))));

          if (isAdminUser) {
            const myEmail = currentUser.email;
            const myId = currentUser.id;

            // Tìm thông tin của tài khoản hiện tại trong DB (nếu có)
            const myDbRecord = dbAdmins.find(
              (u) => (myId && u.id === myId) || (myEmail && u.email === myEmail)
            );

            const myCard = {
              id: myDbRecord?.id || currentUser.id || "my-card",
              fullName: currentUser.fullName || currentUser.name || myDbRecord?.fullName || "Admin Của Bạn",
              role: currentUser.role || myDbRecord?.role || "ADMIN",
              bio: currentUser.bio || myDbRecord?.bio || "Ban Lãnh Đạo Học Thuật & Quản Trị Hệ Thống",
              avatarUrl: currentUser.avatarUrl || currentUser.avatar || myDbRecord?.avatarUrl || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=80",
              email: myEmail,
              isCurrentUser: true,
            };

            // Lấy các Admin khác trong DB (loại bỏ chính tài khoản của tôi ra để không bị lặp lại)
            const others = dbAdmins.filter(
              (u) => (!myId || u.id !== myId) && (!myEmail || u.email !== myEmail)
            );

            // Thẻ #1: Tôi (TÀI KHOẢN CỦA BẠN), Thẻ #2, #3, #4: Các Admin khác trong CSDL
            finalCards = [myCard, ...others];
          } else {
            finalCards = dbAdmins;
          }

          setInstructors(finalCards.slice(0, 4));
        } else {
          setInstructors(DEFAULT_INSTRUCTORS);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi fetch instructors:", err);
        setInstructors(DEFAULT_INSTRUCTORS);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadInstructors();

    // Lắng nghe sự kiện userUpdated khi đổi Avatar ở trang Profile để cập nhật tức thì
    window.addEventListener("userUpdated", loadInstructors);
    return () => window.removeEventListener("userUpdated", loadInstructors);
  }, []);

  return (
    <section className="bg-[#F8FAFC] py-14 px-6 sm:px-10 font-dmsans">
      {/* Header */}
      <div className="text-center mb-10 max-w-xl mx-auto">
        <p className="text-[11px] font-extrabold tracking-widest uppercase text-[#F08A4B] mb-2">
          Đội ngũ giảng viên
        </p>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A2B47] leading-tight mb-3 font-outfit">
          Ban lãnh đạo <span className="text-[#F08A4B]">học thuật</span>
        </h2>
        <p className="text-sm text-[#8A9BB0] leading-relaxed font-medium">
          Học trực tiếp cùng đội ngũ Ban Quản Trị & Giảng viên thực tế từ hệ thống — những người thiết kế bài giảng và dẫn dắt bạn.
        </p>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-slate-200/60 rounded-2xl h-80 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
          {instructors.map((person, idx) => (
            <InstructorCard key={person.id || idx} {...person} />
          ))}
        </div>
      )}
    </section>
  );
}
