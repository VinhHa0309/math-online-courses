import { useState } from "react";
import { ChevronDown, ChevronUp, Receipt } from "lucide-react";

export default function InvoiceInfo() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-slate-100 rounded-2xl overflow-hidden">
      {/* Toggle header */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex items-center justify-between px-5 py-4 bg-slate-50 hover:bg-slate-100 transition-colors"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2.5">
          <Receipt size={16} className="text-[#F08A4B]" />
          <span className="text-sm font-bold text-[#1A2B47]">
            Thông tin xuất hóa đơn{" "}
            <span className="text-slate-400 font-medium">(tùy chọn)</span>
          </span>
        </div>
        {isOpen ? (
          <ChevronUp size={18} className="text-slate-400" />
        ) : (
          <ChevronDown size={18} className="text-slate-400" />
        )}
      </button>

      {/* Form xuất hóa đơn */}
      {isOpen && (
        <div className="px-5 py-5 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300 border-t border-slate-100">
          {/* Loại hóa đơn */}
          <div className="flex gap-3">
            {["Cá nhân", "Doanh nghiệp"].map((type) => (
              <label key={type} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="radio"
                  name="invoiceType"
                  value={type}
                  defaultChecked={type === "Cá nhân"}
                  className="accent-orange-400 w-4 h-4"
                />
                <span className="text-sm font-medium text-slate-600 group-hover:text-[#1A2B47] transition-colors">
                  {type}
                </span>
              </label>
            ))}
          </div>

          {/* Họ tên / Tên công ty */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Họ và tên / Tên công ty
            </label>
            <input
              type="text"
              placeholder="Nguyễn Văn A"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm font-medium text-[#1A2B47] placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400 transition-all"
            />
          </div>

          {/* Mã số thuế */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Mã số thuế
            </label>
            <input
              type="text"
              placeholder="0123456789"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm font-medium text-[#1A2B47] placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400 transition-all"
            />
          </div>

          {/* Email nhận hóa đơn */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Email nhận hóa đơn
            </label>
            <input
              type="email"
              placeholder="email@example.com"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm font-medium text-[#1A2B47] placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400 transition-all"
            />
          </div>

          {/* Địa chỉ */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Địa chỉ
            </label>
            <input
              type="text"
              placeholder="123 Đường ABC, Quận XYZ, TP. Hồ Chí Minh"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm font-medium text-[#1A2B47] placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400 transition-all"
            />
          </div>
        </div>
      )}
    </div>
  );
}
