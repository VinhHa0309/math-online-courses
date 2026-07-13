import { useState } from "react";
import { Eye, EyeOff, ArrowLeft, Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AuthLayout, { GoogleIcon, InputField } from "../../components/layout/AuthLayout";

export default function LoginPage() {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  
  // State để lưu trữ dữ liệu form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Hàm xử lý sự kiện Đăng nhập
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8085/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.text();

      if (!response.ok) {
        // Nếu API trả về lỗi
        throw new Error(data || "Đăng nhập thất bại. Vui lòng kiểm tra lại!");
      }

      // Nếu thành công, parse JSON kết quả trả về
      const result = JSON.parse(data);

      // Lưu Token và thông tin User vào localStorage
      localStorage.setItem("token", result.token);
      localStorage.setItem("user", JSON.stringify({
        id: result.id,
        fullName: result.fullName,
        email: result.email,
        role: result.role
      }));

      // Thông báo thành công và chuyển hướng về trang chủ
      alert("Đăng nhập thành công!");
      navigate("/");
      window.location.reload(); // Tải lại trang để cập nhật trạng thái Header
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="flex flex-col h-full px-10 py-7 justify-between">

        {/* Top: Back */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-slate-400 hover:text-slate-700 transition-colors group self-start"
        >
          <div className="w-7 h-7 rounded-full border border-slate-200 flex items-center justify-center group-hover:border-slate-300 group-hover:bg-slate-50 transition-all">
            <ArrowLeft size={13} />
          </div>
          <span className="text-[11px] font-bold uppercase tracking-widest">Quay lại</span>
        </button>

        {/* Middle: Form */}
        <form onSubmit={handleLogin} className="w-full max-w-[380px] mx-auto flex flex-col gap-5">

          {/* Header */}
          <div className="text-center">
            <div className="text-xl font-black tracking-tight text-[#0F172A] mb-3">
              Mathematiq
            </div>
            <h1 className="text-2xl font-black text-[#0F172A] tracking-tight leading-tight">
              Chào mừng trở lại
            </h1>
            <p className="text-[#F08A4B] text-sm mt-1 font-medium">
              Đăng nhập để tiếp tục hành trình học Toán.
            </p>
          </div>

          {/* Hiển thị thông báo lỗi nếu có */}
          {error && (
            <div className="bg-red-50 text-red-600 text-xs font-semibold p-3.5 rounded-xl border border-red-100 text-center">
              {error}
            </div>
          )}

          {/* Fields */}
          <div className="space-y-3">
            <InputField
              icon={Mail}
              label="Email"
              type="email"
              placeholder="Nhập email của bạn"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <InputField
              icon={Lock}
              label="Mật khẩu"
              type={showPass ? "text" : "password"}
              placeholder="Nhập mật khẩu"
              hint="Quên mật khẩu?"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              rightEl={
                <button type="button" onClick={() => setShowPass(!showPass)} className="text-slate-300 hover:text-slate-500 transition-colors">
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              }
            />
          </div>

          {/* CTA */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl text-white text-sm font-black uppercase tracking-widest active:scale-[0.98] transition-all duration-200 relative overflow-hidden group"
            style={{
              background: "linear-gradient(135deg, #F08A4B 0%, #e0591a 100%)",
              boxShadow: "0 8px 24px rgba(240,138,75,0.35)",
            }}
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: "linear-gradient(135deg, #ff9d5e 0%, #e8601f 100%)" }} />
            <span className="relative z-10">
              {loading ? "Đang xử lý..." : "Đăng nhập"}
            </span>
          </button>

          {/* Switch */}
          <p className="text-center text-sm text-slate-400 font-medium">
            Chưa có tài khoản?{" "}
            <button type="button" onClick={() => navigate("/register")} className="text-[#F08A4B] font-bold hover:text-[#d97030] transition-colors">
              Đăng ký ngay
            </button>
          </p>
        </form>

        {/* Bottom: empty spacer to balance */}
        <div className="h-7" />
      </div>
    </AuthLayout>
  );
}
