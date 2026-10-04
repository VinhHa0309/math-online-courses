import { ShieldAlert, ArrowLeft, LogIn } from "lucide-react";
import { Link, Navigate } from "react-router-dom";

export default function AdminProtectedRoute({ children }) {
  try {
    const userStr = localStorage.getItem("user");

    // Trường hợp 1: Chưa đăng nhập
    if (!userStr) {
      return (
        <div className="min-h-screen bg-[#0B132B] flex items-center justify-center p-6 text-white font-sans">
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-8 sm:p-10 max-w-md w-full text-center space-y-6 shadow-2xl backdrop-blur-xl animate-in zoom-in-95 duration-300">
            <div className="w-20 h-20 rounded-3xl bg-rose-500/10 border border-rose-500/20 text-rose-500 flex items-center justify-center mx-auto shadow-lg shadow-rose-500/10">
              <ShieldAlert size={40} />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-black text-white tracking-tight">
                Yêu cầu đăng nhập Admin
              </h2>
              <p className="text-sm text-slate-400 leading-relaxed">
                Bạn cần đăng nhập bằng tài khoản Quản trị viên (Admin / Giảng viên) để truy cập hệ thống quản trị này.
              </p>
            </div>
            <div className="flex flex-col gap-3 pt-2">
              <Link
                to="/login"
                className="w-full py-3.5 bg-[#F08A4B] hover:bg-[#e0793a] text-white font-bold text-sm rounded-2xl transition-all shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 active:scale-95"
              >
                <LogIn size={18} /> Đăng nhập Admin
              </Link>
              <Link
                to="/"
                className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs rounded-2xl transition-all flex items-center justify-center gap-2"
              >
                <ArrowLeft size={16} /> Quay lại trang chủ
              </Link>
            </div>
          </div>
        </div>
      );
    }

    const user = JSON.parse(userStr);
    const userRole = user?.role ? user.role.toUpperCase() : "USER";

    // Trường hợp 2: Đã đăng nhập nhưng không có quyền ADMIN / INSTRUCTOR
    if (userRole !== "ADMIN" && userRole !== "INSTRUCTOR") {
      return (
        <div className="min-h-screen bg-[#0B132B] flex items-center justify-center p-6 text-white font-sans">
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-8 sm:p-10 max-w-md w-full text-center space-y-6 shadow-2xl backdrop-blur-xl animate-in zoom-in-95 duration-300">
            <div className="w-20 h-20 rounded-3xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center mx-auto shadow-lg shadow-amber-500/10">
              <ShieldAlert size={40} />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-black text-white tracking-tight">
                Quyền truy cập bị từ chối 🚫
              </h2>
              <p className="text-sm text-slate-400 leading-relaxed">
                Tài khoản <span className="font-bold text-amber-400">{user.fullName || user.email}</span> của bạn không có quyền truy cập vào khu vực Admin.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-left text-xs text-amber-200">
              💡 <span className="font-bold">Gợi ý:</span> Nếu bạn là Giảng viên, hãy liên hệ Quản trị viên để được cập nhật phân quyền Admin.
            </div>
            <div className="pt-2">
              <Link
                to="/"
                className="w-full py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm rounded-2xl transition-all flex items-center justify-center gap-2 active:scale-95 shadow-lg"
              >
                <ArrowLeft size={18} /> Quay lại trang chủ
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return children;
  } catch (e) {
    console.error("Lỗi xác thực quyền Admin:", e);
    return <Navigate to="/login" replace />;
  }
}
