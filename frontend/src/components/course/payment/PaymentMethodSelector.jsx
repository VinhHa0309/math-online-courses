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
function WalletForm({ selectedWallet, setSelectedWallet }) {
  const wallets = ["MoMo", "ZaloPay", "VNPay", "ShopeePay"];

  return (
    <div className="mt-5 animate-in fade-in slide-in-from-top-2 duration-300">
      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
        Chọn ví của bạn
      </p>
      <div className="grid grid-cols-2 gap-3">
        {wallets.map((w) => (
          <button
            key={w}
            onClick={() => setSelectedWallet(w)}
            className={`py-3 px-4 rounded-xl border-2 text-sm font-bold transition-all active:scale-95 ${
              selectedWallet === w
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
        <span className="font-bold text-[#1A2B47]">{selectedWallet}</span> để xác nhận
        thanh toán.
      </p>
    </div>
  );
}

// ── Cấu hình thông tin tài khoản ngân hàng của bạn ──────────────────
const BANK_CONFIG = {
  bankId: "vietcombank",          // Mã ngân hàng Vietcombank
  accountNo: "1039803112",        // Số tài khoản Vietcombank của bạn
  accountName: "NGUYEN VINH HA",  // Tên chủ tài khoản (viết hoa không dấu)
};

// ── Form chuyển khoản QR ──────────────────────────────────
function QRForm({ amount, orderId }) {
  const note = `MATH ${orderId}`;
  
  // URL tạo mã VietQR động từ vietqr.io
  const qrUrl = `https://img.vietqr.io/image/${BANK_CONFIG.bankId}-${BANK_CONFIG.accountNo}-compact.png?amount=${amount}&addInfo=${encodeURIComponent(note)}&accountName=${encodeURIComponent(BANK_CONFIG.accountName)}`;

  return (
    <div className="mt-5 flex flex-col items-center gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
      {/* Mã QR ngân hàng thật */}
      <div className="p-3 bg-white border border-slate-200 rounded-2xl shadow-md">
        <img src={qrUrl} alt="VietQR Payment Code" className="w-52 h-52 object-contain" />
      </div>
      
      <div className="text-center space-y-1.5 px-4">
        <p className="text-sm font-bold text-[#1A2B47]">
          Quét mã QR để chuyển khoản Vietcombank
        </p>
        <p className="text-xs text-slate-500">
          Bạn có thể dùng ứng dụng **MoMo** hoặc bất kỳ **App Ngân hàng** nào quét mã này.
        </p>
      </div>

      {/* Thông tin chuyển khoản hiển thị chữ để đối chiếu */}
      <div className="w-full bg-slate-50 rounded-xl p-4 border border-slate-100 space-y-2 text-xs">
        <div className="flex justify-between">
          <span className="text-slate-400">Ngân hàng:</span>
          <span className="font-bold text-[#1A2B47] uppercase">{BANK_CONFIG.bankId}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">Số tài khoản:</span>
          <span className="font-bold text-[#1A2B47]">{BANK_CONFIG.accountNo}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">Chủ tài khoản:</span>
          <span className="font-bold text-[#1A2B47]">{BANK_CONFIG.accountName}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">Số tiền:</span>
          <span className="font-bold text-orange-500">{amount.toLocaleString("vi-VN")}đ</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">Nội dung chuyển khoản:</span>
          <span className="font-bold text-orange-500">{note}</span>
        </div>
      </div>

      <p className="text-[10px] text-red-500 font-medium bg-red-50 px-3 py-1.5 rounded-lg text-center">
        *Lưu ý: Giữ nguyên nội dung chuyển khoản để chúng tôi xác nhận giao dịch nhanh nhất.
      </p>
    </div>
  );
}

// ── Component chính ───────────────────────────────────────
export default function PaymentMethodSelector({
  activeMethod,
  setActiveMethod,
  selectedWallet,
  setSelectedWallet,
  amount,
  orderId,
}) {
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
      {activeMethod === "wallet" && (
        <WalletForm
          selectedWallet={selectedWallet}
          setSelectedWallet={setSelectedWallet}
        />
      )}
      {activeMethod === "qr" && <QRForm amount={amount} orderId={orderId} />}
    </section>
  );
}
