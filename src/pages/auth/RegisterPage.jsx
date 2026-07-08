import { useState } from "react";
import { Eye, EyeOff, ArrowLeft, Mail, Lock, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AuthLayout, { GoogleIcon, InputField } from "../../components/layout/AuthLayout";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

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
        <div className="w-full max-w-[380px] mx-auto flex flex-col gap-4">

          {/* Header */}
          <div className="text-center">
            <div className="text-xl font-black tracking-tight text-[#0F172A] mb-2">
              Mathematiq
            </div>
            <h1 className="text-2xl font-black text-[#0F172A] tracking-tight leading-tight">
              Tạo tài khoản mới
            </h1>
            <p className="text-[#F08A4B] text-sm mt-1 font-medium">
              Gia nhập cộng đồng 15.000+ học sinh.
            </p>
          </div>

          {/* Social – 2 buttons side by side */}
          <div className="grid grid-cols-2 gap-2.5">
            <button className="flex items-center justify-center gap-2 border border-slate-200 bg-white hover:bg-slate-50 py-2.5 rounded-xl active:scale-[0.98] transition-all text-sm font-semibold text-slate-600">
              <GoogleIcon className="w-4 h-4" />
              Google
            </button>
            <button className="flex items-center justify-center gap-2 border border-slate-200 bg-white hover:bg-slate-50 py-2.5 rounded-xl active:scale-[0.98] transition-all text-sm font-semibold text-slate-600">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#1877F2">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Facebook
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-slate-100" />
            <span className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.18em]">hoặc email</span>
            <div className="flex-1 h-px bg-slate-100" />
          </div>

          {/* Fields */}
          <div className="space-y-3">
            <InputField icon={User} label="Họ và tên" placeholder="Nguyễn Văn An" />
            <InputField icon={Mail} label="Email" type="email" placeholder="Nhập email của bạn" />
            <InputField
              icon={Lock}
              label="Mật khẩu"
              type={showPass ? "text" : "password"}
              placeholder="Tối thiểu 8 ký tự"
              rightEl={
                <button onClick={() => setShowPass(!showPass)} className="text-slate-300 hover:text-slate-500 transition-colors">
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              }
            />
            <InputField
              icon={Lock}
              label="Xác nhận mật khẩu"
              type={showConfirm ? "text" : "password"}
              placeholder="Nhập lại mật khẩu"
              rightEl={
                <button onClick={() => setShowConfirm(!showConfirm)} className="text-slate-300 hover:text-slate-500 transition-colors">
                  {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              }
            />
          </div>

          {/* CTA */}
          <button
            className="w-full py-3.5 rounded-xl text-white text-sm font-black uppercase tracking-widest active:scale-[0.98] transition-all duration-200 relative overflow-hidden group"
            style={{
              background: "linear-gradient(135deg, #F08A4B 0%, #e0591a 100%)",
              boxShadow: "0 8px 24px rgba(240,138,75,0.35)",
            }}
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: "linear-gradient(135deg, #ff9d5e 0%, #e8601f 100%)" }} />
            <span className="relative z-10">Tạo tài khoản miễn phí</span>
          </button>

          {/* Switch */}
          <p className="text-center text-sm text-slate-400 font-medium">
            Đã có tài khoản?{" "}
            <button onClick={() => navigate("/login")} className="text-[#F08A4B] font-bold hover:text-[#d97030] transition-colors">
              Đăng nhập
            </button>
          </p>
        </div>

        {/* Bottom: empty spacer to balance */}
        <div className="h-7" />
      </div>
    </AuthLayout>
  );
}
