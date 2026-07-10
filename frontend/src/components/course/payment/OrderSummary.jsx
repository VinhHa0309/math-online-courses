import { useState } from "react";
import { CheckCircle2, Lock, Tag, Loader2 } from "lucide-react";

// ── Danh sách lợi ích gói Premium ────────────────────────
const BENEFITS = [
  "Học không giới hạn 50+ khóa học chuyên sâu",
  "Giải bài 24/7 với Trợ lý AI & Chuyên gia",
  "Tải tài liệu PDF và đề thi độc quyền",
  "Chứng chỉ hoàn thành được tổ chức quốc tế công nhận",
];

// ── Dữ liệu đơn hàng (có thể nhận qua props sau) ─────────
const ORDER_DATA = {
  name: "Gói Premium 12 tháng",
  subtitle: "Truy cập toàn bộ khóa học chuyên sâu",
  originalPrice: 2400000,
  discountAmount: 480000,
  discountLabel: "Ưu đãi học sinh, sinh viên",
};

// ── Format tiền Việt ──────────────────────────────────────
function formatVND(amount) {
  return amount.toLocaleString("vi-VN") + "đ";
}

// ── Hàng hiển thị giá ─────────────────────────────────────
function PriceRow({ label, value, isDiscount, isBold }) {
  return (
    <div className="flex items-center justify-between">
      <span
        className={`text-sm ${
          isBold ? "font-black text-[#1A2B47]" : "text-slate-500"
        }`}
      >
        {label}
      </span>
      <span
        className={`text-sm font-bold ${
          isDiscount
            ? "text-green-500"
            : isBold
            ? "font-black text-[#1A2B47]"
            : "text-slate-700"
        }`}
      >
        {isDiscount ? `- ${value}` : value}
      </span>
    </div>
  );
}

export default function OrderSummary({ onConfirm }) {
  const [promoCode, setPromoCode] = useState("");
  const [appliedCode, setAppliedCode] = useState("");
  const [isApplying, setIsApplying] = useState(false);
  const [promoError, setPromoError] = useState("");

  const totalPrice =
    ORDER_DATA.originalPrice -
    ORDER_DATA.discountAmount -
    (appliedCode ? 50000 : 0);

  // ── Xử lý áp dụng mã giảm giá ────────────────────────
  const handleApplyPromo = () => {
    if (!promoCode.trim()) return;
    setIsApplying(true);
    setPromoError("");

    // Giả lập API call
    setTimeout(() => {
      if (promoCode.toUpperCase() === "MATH20") {
        setAppliedCode(promoCode);
        setPromoError("");
      } else {
        setPromoError("Mã giảm giá không hợp lệ hoặc đã hết hạn.");
        setAppliedCode("");
      }
      setIsApplying(false);
    }, 800);
  };

  return (
    <aside className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-6 sticky top-6">
      {/* Tiêu đề */}
      <h3 className="text-base font-black text-[#1A2B47]">Tóm tắt đơn hàng</h3>

      {/* Thông tin gói */}
      <div className="bg-slate-50 rounded-xl p-4 flex items-start justify-between gap-2">
        <div>
          <p className="text-sm font-black text-[#1A2B47]">
            {ORDER_DATA.name}
          </p>
          <p className="text-xs text-slate-400 mt-0.5">{ORDER_DATA.subtitle}</p>
        </div>
        <span className="text-sm font-black text-[#1A2B47] whitespace-nowrap">
          {formatVND(ORDER_DATA.originalPrice)}
        </span>
      </div>

      {/* Danh sách lợi ích */}
      <ul className="space-y-2.5">
        {BENEFITS.map((benefit, idx) => (
          <li key={idx} className="flex items-start gap-2.5">
            <CheckCircle2
              size={15}
              className="text-green-400 mt-0.5 shrink-0"
            />
            <span className="text-xs text-slate-500 leading-relaxed">
              {benefit}
            </span>
          </li>
        ))}
      </ul>

      {/* Ô mã giảm giá */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Mã giảm giá
        </label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Tag
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300"
            />
            <input
              type="text"
              value={promoCode}
              onChange={(e) => {
                setPromoCode(e.target.value);
                setPromoError("");
              }}
              placeholder="MATH20"
              className="w-full pl-8 pr-3 py-2.5 text-sm rounded-xl border border-slate-200 bg-white font-medium text-[#1A2B47] placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-400/20 focus:border-orange-400 transition-all"
            />
          </div>
          <button
            onClick={handleApplyPromo}
            disabled={isApplying}
            className="px-4 py-2.5 bg-[#1A2B47] text-white text-sm font-bold rounded-xl hover:bg-[#F08A4B] active:scale-95 transition-all disabled:opacity-50 flex items-center gap-1.5"
          >
            {isApplying ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              "Áp dụng"
            )}
          </button>
        </div>
        {promoError && (
          <p className="text-xs text-red-500 font-medium animate-in fade-in duration-200">
            {promoError}
          </p>
        )}
        {appliedCode && (
          <p className="text-xs text-green-500 font-bold animate-in fade-in duration-200">
            ✓ Đã áp dụng mã "{appliedCode.toUpperCase()}" — giảm thêm 50.000đ
          </p>
        )}
      </div>

      {/* Dòng kẻ phân cách */}
      <hr className="border-slate-100" />

      {/* Chi tiết giá */}
      <div className="space-y-3">
        <PriceRow
          label="Giá gốc"
          value={formatVND(ORDER_DATA.originalPrice)}
        />
        <PriceRow
          label={ORDER_DATA.discountLabel}
          value={formatVND(ORDER_DATA.discountAmount)}
          isDiscount
        />
        {appliedCode && (
          <PriceRow
            label={`Mã ${appliedCode.toUpperCase()}`}
            value={formatVND(50000)}
            isDiscount
          />
        )}
        <hr className="border-slate-100" />
        <div className="flex items-end justify-between">
          <span className="text-sm font-black text-[#1A2B47]">Tổng tiền</span>
          <div className="text-right">
            <p className="text-xl font-black text-[#1A2B47]">
              {formatVND(totalPrice)}
            </p>
            <p className="text-[10px] text-slate-400">
              đã bao gồm thuế VAT (nếu có)
            </p>
          </div>
        </div>
      </div>

      {/* Nút xác nhận */}
      <button
        onClick={onConfirm}
        className="w-full py-4 bg-[#1A2B47] text-white font-black text-sm rounded-2xl hover:bg-[#F08A4B] active:scale-95 transition-all shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2 group"
      >
        <Lock
          size={15}
          className="group-hover:rotate-12 transition-transform"
        />
        Xác nhận thanh toán
      </button>

      {/* Ghi chú bảo mật */}
      <p className="text-[10px] text-slate-400 text-center leading-relaxed">
        Giao dịch được mã hóa SSL 256-bit. Bạn có thể hoàn tiền trong vòng{" "}
        <span className="font-bold text-[#1A2B47]">7 ngày</span> nếu không hài
        lòng, không cần điều kiện.
      </p>
    </aside>
  );
}
