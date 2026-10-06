import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, ShieldCheck, Star, BadgeCheck, Loader2 } from "lucide-react";
import PaymentMethodSelector from "../../components/course/payment/PaymentMethodSelector";
import OrderSummary from "../../components/course/payment/OrderSummary";
import InvoiceInfo from "../../components/course/payment/InvoiceInfo";
import { API_BASE_URL } from "../../config/api";

// ── Modal xác nhận thanh toán thành công ──────────────────
function SuccessModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
        onClick={onClose}
      />
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
  
  const [course, setCourse] = useState(null);
  const [loadingCourse, setLoadingCourse] = useState(true);

  const [showSuccess, setShowSuccess] = useState(false);
  const [activeMethod, setActiveMethod] = useState("qr");
  const [selectedWallet, setSelectedWallet] = useState("MoMo");
  const [isProcessing, setIsProcessing] = useState(false);

  // Tạo mã đơn hàng ngẫu nhiên khi tải trang
  const [orderId] = useState(() => Math.floor(100000 + Math.random() * 900000).toString());

  // 1. Tải thông tin khóa học THỰC TẾ từ Database Backend theo courseId
  useEffect(() => {
    if (courseIdParam) {
      setLoadingCourse(true);
      fetch(`${API_BASE_URL}/api/courses/${courseIdParam}`)
        .then((res) => {
          if (!res.ok) throw new Error("Không tìm thấy khóa học");
          return res.json();
        })
        .then((data) => {
          setCourse(data);
          setLoadingCourse(false);
        })
        .catch((err) => {
          console.error("Lỗi khi tải thông tin khóa học:", err);
          setLoadingCourse(false);
        });
    }
  }, [courseIdParam]);

  // Tính toán số tiền thực tế của khóa học
  const courseAmount = course ? (course.price || 0) : 0;

  const getLoggedInUser = () => {
    try {
      const userStr = localStorage.getItem("user");
      return userStr ? JSON.parse(userStr) : null;
    } catch {
      return null;
    }
  };

  const handleConfirm = async (finalAmount) => {
    const user = getLoggedInUser();
    const courseId = Number(courseIdParam);
    const amountToPay = finalAmount || courseAmount;

    if (activeMethod === "qr") {
      setIsProcessing(true);
      try {
        if (user && user.id) {
          await fetch(`${API_BASE_URL}/api/enrollments`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: user.id, courseId: courseId }),
          });
        }
      } catch (e) {
        console.error("Lỗi khi tạo enrollment VietQR:", e);
      } finally {
        setIsProcessing(false);
        navigate(`/payment/result?resultCode=0&amount=${amountToPay}&orderId=${orderId}`);
      }
    } else if (activeMethod === "wallet" && selectedWallet === "MoMo") {
      setIsProcessing(true);
      try {
        const response = await fetch(`${API_BASE_URL}/api/payment/momo`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: amountToPay,
            orderInfo: `Thanh toan khoa hoc #${courseId}`,
            userId: user ? user.id : null,
            courseId: courseId,
          }),
        });

        const data = await response.json();

        if (data && data.payUrl) {
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
      if (user && user.id) {
        try {
          await fetch(`${API_BASE_URL}/api/enrollments`, {
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
      {showSuccess && <SuccessModal onClose={handleClose} />}

      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10 min-h-screen bg-white">
        <button
          onClick={() => navigate("/courses")}
          className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-[#1A2B47] transition-colors mb-8 group cursor-pointer"
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Quay lại trang danh sách khóa học
        </button>

        <div className="mb-8">
          <h1 className="text-3xl font-black text-[#1A2B47] tracking-tight">
            Thanh toán
          </h1>
          <p className="text-slate-400 text-sm mt-1.5">
            Hoàn tất đăng ký để bắt đầu hành trình chinh phục Toán học cùng SuongMath.
          </p>
        </div>

        {loadingCourse ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3 text-slate-400 font-bold">
            <Loader2 size={32} className="animate-spin text-[#F08A4B]" />
            <span>Đang tải dữ liệu khóa học từ Server...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 items-start">
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
                <PaymentMethodSelector
                  activeMethod={activeMethod}
                  setActiveMethod={setActiveMethod}
                  selectedWallet={selectedWallet}
                  setSelectedWallet={setSelectedWallet}
                  amount={courseAmount} // Truyền ĐÚNG số tiền thực tế của khóa học từ DB
                  orderId={orderId}
                />
              </div>

              <InvoiceInfo />

              <div className="hidden sm:flex items-center gap-5 pt-2 border-t border-slate-50">
                <TrustBadge icon={ShieldCheck} label="Bảo mật SSL 256-bit" />
                <TrustBadge icon={Star} label="Đánh giá 4.9/5 từ 12.000+ học viên" />
                <TrustBadge icon={BadgeCheck} label="Chứng chỉ quốc tế" />
              </div>
            </div>

            <OrderSummary 
              course={course}
              onConfirm={handleConfirm} 
              isProcessing={isProcessing} 
            />
          </div>
        )}
      </div>
    </>
  );
}
