import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { CheckCircle2, XCircle, ArrowRight, BookOpen, AlertTriangle } from "lucide-react";

export default function PaymentResultPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const resultCode = searchParams.get("resultCode");
  const amount = searchParams.get("amount");
  const orderId = searchParams.get("orderId");
  const message = searchParams.get("message");

  const isSuccess = resultCode === "0";

  useEffect(() => {
    // Bạn có thể tùy chọn call API backend tại đây để xác minh giao dịch lại một lần nữa bằng signature của Frontend nếu cần.
    // Tuy nhiên, việc kích hoạt khóa học đã được thực hiện an toàn qua Webhook IPN ở Backend.
  }, [resultCode]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-slate-100 p-8 flex flex-col items-center gap-6 animate-in zoom-in-95 duration-300">
        
        {/* Biểu tượng Trạng thái */}
        {isSuccess ? (
          <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center animate-bounce">
            <CheckCircle2 size={48} className="text-green-500" />
          </div>
        ) : (
          <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center">
            <XCircle size={48} className="text-red-500" />
          </div>
        )}

        {/* Tiêu đề & Thông báo */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-black text-[#1A2B47]">
            {isSuccess ? "Thanh toán thành công!" : "Thanh toán thất bại"}
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed px-2">
            {isSuccess
              ? "Chúc mừng! Gói khóa học của bạn đã được kích hoạt thành công. Hãy bắt đầu học ngay bây giờ."
              : `Giao dịch không thành công hoặc đã bị hủy. (Lỗi: ${message || "Từ chối thanh toán"})`}
          </p>
        </div>

        {/* Thông tin hóa đơn chi tiết */}
        <div className="w-full bg-slate-50 rounded-2xl p-5 space-y-3.5 border border-slate-100">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-400 uppercase">Mã đơn hàng</span>
            <span className="font-bold text-[#1A2B47]">{orderId || "N/A"}</span>
          </div>
          
          {amount && (
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-400 uppercase">Số tiền</span>
              <span className="font-extrabold text-lg text-orange-500">
                {Number(amount).toLocaleString("vi-VN")}đ
              </span>
            </div>
          )}

          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-400 uppercase">Phương thức</span>
            <span className="font-bold text-[#1A2B47] flex items-center gap-1.5">
              Ví điện tử MoMo
            </span>
          </div>
        </div>

        {/* Các nút hành động */}
        <div className="w-full flex flex-col gap-3">
          {isSuccess ? (
            <button
              onClick={() => navigate("/courses")}
              className="w-full py-4 bg-[#1A2B47] hover:bg-[#F08A4B] text-white font-black text-sm rounded-2xl transition-all active:scale-95 shadow-lg shadow-blue-900/10 flex items-center justify-center gap-2 group"
            >
              <BookOpen size={16} />
              Vào học ngay
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          ) : (
            <>
              <button
                onClick={() => navigate("/courses/payment")}
                className="w-full py-4 bg-orange-400 hover:bg-orange-500 text-white font-black text-sm rounded-2xl transition-all active:scale-95 shadow-lg shadow-orange-400/20"
              >
                Thử thanh toán lại
              </button>
              <button
                onClick={() => navigate("/courses")}
                className="w-full py-4 border-2 border-slate-100 hover:border-slate-200 text-slate-500 font-bold text-sm rounded-2xl transition-all"
              >
                Quay lại danh sách khóa học
              </button>
            </>
          )}
        </div>

        {/* Cam kết bảo mật/Hỗ trợ */}
        <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
          <AlertTriangle size={12} />
          <span>Cần hỗ trợ? Gọi hotline: 1900 xxxx để được hỗ trợ 24/7.</span>
        </div>
      </div>
    </div>
  );
}
