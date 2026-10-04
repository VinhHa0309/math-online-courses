import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, ShieldCheck, Star, BadgeCheck } from "lucide-react";
import PaymentMethodSelector from "../../components/course/payment/PaymentMethodSelector";
import OrderSummary from "../../components/course/payment/OrderSummary";
import InvoiceInfo from "../../components/course/payment/InvoiceInfo";

// ── Modal xác nhận thanh toán thành công ──────────────────
function SuccessModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Nền mờ */}
      <div
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Khung modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full flex flex-col items-center gap-4 animate-in zoom-in-95 fade-in duration-300">
        <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center">
          <BadgeCheck size={36} className="text-green-500" />
        </div>
        <h3 className="text-xl font-black text-[#1A2B47] text-center">
          Thanh toán thành công!
        </h3>
        <p className="text-sm text-slate-400 text-center leading-relaxed">
          Đơn đăng ký khóa học đã được gửi thành công. Vui lòng chờ Admin duyệt để bắt đầu học!
        </p>
        <button
          onClick={onClose}
          className="w-full py-3.5 bg-[#1A2B47] text-white font-black text-sm rounded-2xl hover:bg-[#F08A4B] active:scale-95 transition-all"
        >
          Quay lại danh sách khóa học
        </button>
      </div>
    </div>
  );
}

// ── Badge bảo mật / uy tín ────────────────────────────────
function TrustBadge({ icon: Icon, label }) {
  return (
    <div className="flex items-center gap-1.5 text-slate-400">
      <Icon size={13} className="text-slate-300" />
      <span className="text-[11px] font-medium">{label}</span>
    </div>
  );
}

// ── Trang thanh toán chính ────────────────────────────────
export default function PaymentPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const courseIdParam = searchParams.get("courseId") || "1";
  const [showSuccess, setShowSuccess] = useState(false);
  const [activeMethod, setActiveMethod] = useState("qr"); // Mặc định chọn Chuyển khoản QR
  const [selectedWallet, setSelectedWallet] = useState("MoMo"); // Mặc định chọn MoMo
  const [isProcessing, setIsProcessing] = useState(false);

  // Tạo mã đơn hàng ngẫu nhiên khi tải trang
  const [orderId] = useState(() => Math.floor(100000 + Math.random() * 900000).toString());

  const getLoggedInUser = () => {
    try {
      const userStr = localStorage.getItem("user");
      return userStr ? JSON.parse(userStr) : null;
    } catch {
      return null;
    }
  };

  const handleConfirm = async (totalPrice) => {
    const user = getLoggedInUser();
    const courseId = Number(courseIdParam);

    if (activeMethod === "qr") {
      setIsProcessing(true);
      try {
        // Tự động tạo pending enrollment nếu user đã đăng nhập
        if (user && user.id) {
          await fetch("http://localhost:8085/api/enrollments", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: user.id, courseId: courseId }),
          });
        }
      } catch (e) {
        console.error("Lỗi khi tạo enrollment VietQR:", e);
      } finally {
        setIsProcessing(false);
        navigate(`/payment/result?resultCode=0&amount=${totalPrice}&orderId=${orderId}`);
      }
    } else if (activeMethod === "wallet" && selectedWallet === "MoMo") {
      setIsProcessing(true);
      try {
        const response = await fetch("http://localhost:8085/api/payment/momo", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: totalPrice,
            orderInfo: `Thanh toan khoa hoc #${courseId}`,
            userId: user ? user.id : null,
            courseId: courseId,
          }),
        });

        const data = await response.json();

        if (data && data.payUrl) {
          // Chuyển hướng đến cổng thanh toán MoMo thật
          window.location.href = data.payUrl;
        } else {
          alert("Không nhận được link thanh toán từ hệ thống MoMo. Hãy thử lại!");
        }
      } catch (error) {
        console.error("Lỗi khi kết nối thanh toán MoMo: ", error);
        alert("Có lỗi xảy ra trong quá trình khởi tạo giao dịch.");
      } finally {
        setIsProcessing(false);
      }
    } else {
      // Mock hành vi thành công cho phương thức khác (thẻ tín dụng)
      if (user && user.id) {
        try {
          await fetch("http://localhost:8085/api/enrollments", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: user.id, courseId: courseId }),
          });
        } catch (e) {
          console.error("Lỗi tạo enrollment:", e);
        }
      }
      setShowSuccess(true);
    }
  };

  const handleClose = () => {
    setShowSuccess(false);
    navigate("/courses");
  };

  return (
    <>
      {/* Modal thành công */}
      {showSuccess && <SuccessModal onClose={handleClose} />}

      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10 min-h-screen bg-white">
        {/* ── Breadcrumb / Nút quay lại ── */}
        <button
          onClick={() => navigate("/courses")}
          className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-[#1A2B47] transition-colors mb-8 group"
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Quay lại trang gói học
        </button>

        {/* ── Tiêu đề trang ── */}
        <div className="mb-8">
          <h1 className="text-3xl font-black text-[#1A2B47] tracking-tight">
            Thanh toán
          </h1>
          <p className="text-slate-400 text-sm mt-1.5">
            Hoàn tất đăng ký để bắt đầu hành trình chinh phục Toán học cùng
            chúng tôi.
          </p>
        </div>

        {/* ── Layout 2 cột ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 items-start">
          {/* ── Cột trái: Phương thức & Hóa đơn ── */}
          <div className="space-y-6">
            {/* Card phương thức thanh toán */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
              <PaymentMethodSelector
                activeMethod={activeMethod}
                setActiveMethod={setActiveMethod}
                selectedWallet={selectedWallet}
                setSelectedWallet={setSelectedWallet}
                amount={10000} // Truyền số tiền mặc định của khóa học (sau giảm giá)
                orderId={orderId}
              />
            </div>

            {/* Accordion thông tin hóa đơn */}
            <InvoiceInfo />

            {/* Badges bảo mật (desktop) */}
            <div className="hidden sm:flex items-center gap-5 pt-2 border-t border-slate-50">
              <TrustBadge icon={ShieldCheck} label="Bảo mật SSL 256-bit" />
              <TrustBadge icon={Star} label="Đánh giá 4.9/5 từ 12.000+ học viên" />
              <TrustBadge icon={BadgeCheck} label="Chứng chỉ quốc tế" />
            </div>
          </div>

          {/* ── Cột phải: Tóm tắt đơn hàng ── */}
          <OrderSummary onConfirm={handleConfirm} isProcessing={isProcessing} />
        </div>
      </div>
    </>
  );
}
