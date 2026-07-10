import { useState } from "react";
import { CreditCard, Wallet, QrCode } from "lucide-react";

const METHODS = [
  { id: "card", label: "Thẻ tín dụng", icon: CreditCard },
  { id: "wallet", label: "Ví điện tử", icon: Wallet },
  { id: "qr", label: "Chuyển khoản QR", icon: QrCode },
];

// ── Tab chọn phương thức ──────────────────────────────────
function MethodTab({ method, isSelected, onSelect }) {
  const Icon = method.icon;
  return (
    <button
      onClick={() => onSelect(method.id)}
      className={`relative flex-1 flex flex-col items-center gap-2 py-4 rounded-xl border-2 text-xs font-bold transition-all active:scale-95 ${
        isSelected
          ? "border-orange-400 bg-orange-50 text-[#1A2B47]"
          : "border-slate-100 bg-white text-slate-400 hover:border-slate-200 hover:text-slate-600"
      }`}
    >
      {/* Dấu tích khi chọn */}
      {isSelected && (
        <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-orange-400 flex items-center justify-center">
          <span className="block w-1.5 h-1.5 rounded-full bg-white" />
        </span>
      )}
      <Icon
        size={22}
        className={isSelected ? "text-orange-400" : "text-slate-300"}
      />
      {method.label}
    </button>
  );
}

// ── Form nhập thẻ tín dụng ────────────────────────────────
function CardForm() {
  return (
    <div className="mt-5 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
      {/* Tên trên thẻ */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Tên trên thẻ
        </label>
        <input
          type="text"
          placeholder="NGUYỄN VĂN A"
          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm font-medium text-[#1A2B47] placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400 transition-all"
        />
      </div>

      {/* Số thẻ */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Số thẻ
        </label>
        <div className="relative">
          <CreditCard
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"
          />
          <input
            type="text"
            placeholder="0000 0000 0000 0000"
            maxLength={19}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-sm font-medium text-[#1A2B47] placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400 transition-all"
          />
        </div>
      </div>

      {/* Ngày hết hạn & CVV */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Ngày hết hạn
          </label>
          <input
            type="text"
            placeholder="MM/YY"
            maxLength={5}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm font-medium text-[#1A2B47] placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400 transition-all"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            CVV / CVC
          </label>
          <input
            type="password"
            placeholder="•••"
            maxLength={4}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm font-medium text-[#1A2B47] placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400 transition-all"
          />
        </div>
      </div>
    </div>
  );
}

// ── Form ví điện tử ───────────────────────────────────────
function WalletForm() {
  const wallets = ["MoMo", "ZaloPay", "VNPay", "ShopeePay"];
  const [selected, setSelected] = useState("MoMo");

  return (
    <div className="mt-5 animate-in fade-in slide-in-from-top-2 duration-300">
      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
        Chọn ví của bạn
      </p>
      <div className="grid grid-cols-2 gap-3">
        {wallets.map((w) => (
          <button
            key={w}
            onClick={() => setSelected(w)}
            className={`py-3 px-4 rounded-xl border-2 text-sm font-bold transition-all active:scale-95 ${
              selected === w
                ? "border-orange-400 bg-orange-50 text-[#1A2B47]"
                : "border-slate-100 text-slate-400 hover:border-slate-200"
            }`}
          >
            {w}
          </button>
        ))}
      </div>
      <p className="mt-4 text-xs text-slate-400 text-center">
        Bạn sẽ được chuyển đến ứng dụng{" "}
        <span className="font-bold text-[#1A2B47]">{selected}</span> để xác nhận
        thanh toán.
      </p>
    </div>
  );
}

// ── Form chuyển khoản QR ──────────────────────────────────
function QRForm() {
  return (
    <div className="mt-5 flex flex-col items-center gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
      {/* Placeholder QR code */}
      <div className="w-40 h-40 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center">
        <QrCode size={80} className="text-slate-300" />
      </div>
      <div className="text-center space-y-1">
        <p className="text-sm font-bold text-[#1A2B47]">
          Quét mã QR để thanh toán
        </p>
        <p className="text-xs text-slate-400">
          Mở ứng dụng ngân hàng → Quét QR → Xác nhận
        </p>
      </div>
      <p className="text-xs text-orange-500 font-bold bg-orange-50 px-4 py-2 rounded-xl">
        Mã có hiệu lực trong 15:00 phút
      </p>
    </div>
  );
}

// ── Component chính ───────────────────────────────────────
export default function PaymentMethodSelector() {
  const [activeMethod, setActiveMethod] = useState("card");

  return (
    <section>
      <h2 className="text-base font-black text-[#1A2B47] mb-4">
        Phương thức thanh toán
      </h2>

      {/* Tabs chọn phương thức */}
      <div className="flex gap-3">
        {METHODS.map((m) => (
          <MethodTab
            key={m.id}
            method={m}
            isSelected={activeMethod === m.id}
            onSelect={setActiveMethod}
          />
        ))}
      </div>

      {/* Nội dung theo tab */}
      {activeMethod === "card" && <CardForm />}
      {activeMethod === "wallet" && <WalletForm />}
      {activeMethod === "qr" && <QRForm />}
    </section>
  );
}
