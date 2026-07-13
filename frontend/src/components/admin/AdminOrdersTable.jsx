import React from "react";
import { Search, CheckCircle, Truck, XCircle } from "lucide-react";

export default function AdminOrdersTable({
  orders,
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  handleToggleStatus
}) {
  // Xử lý bộ lọc đơn hàng
  const filteredOrders = orders.filter(o => {
    const matchesSearch = o.customer.toLowerCase().includes(searchTerm.toLowerCase()) || o.id.includes(searchTerm);
    const matchesStatus = statusFilter === "all" || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="bg-[#0d1424]/40 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="font-black text-base text-white">ĐƠN HÀNG GẦN ĐÂY</h3>
          <p className="text-xs text-slate-400 mt-1">Danh sách giao dịch chi tiết</p>
        </div>

        {/* Các thanh công cụ lọc và tìm kiếm */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center bg-slate-900/80 border border-slate-800 rounded-xl px-3 py-1.5 gap-2 w-full sm:w-56">
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm mã hoặc tên..."
              className="bg-transparent text-xs text-white placeholder-slate-500 outline-none w-full"
            />
          </div>

          <div className="flex gap-1.5 bg-slate-900/60 p-1 border border-slate-800 rounded-xl">
            {[
              { key: "all", label: "Tất Cả" },
              { key: "completed", label: "Đăng kí thành công" },
              { key: "processing", label: "Đang chờ thanh toán " },
              { key: "cancelled", label: "Đã huỷ" }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setStatusFilter(tab.key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold tracking-wide transition-all ${statusFilter === tab.key
                  ? "bg-slate-800 text-white border border-slate-700/80"
                  : "text-slate-400 hover:text-white"
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bảng dữ liệu tương tác */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 text-[11px] font-black text-slate-400 uppercase tracking-wider">
              <th className="py-4 px-4">Mã</th>
              <th className="py-4 px-4">Khách Hàng</th>
              <th className="py-4 px-4">Trạng Thái</th>
              <th className="py-4 px-4 text-right">Giá Trị</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan="4" className="py-8 text-center text-xs text-slate-500 font-bold">
                  Không tìm thấy đơn hàng nào phù hợp.
                </td>
              </tr>
            ) : (
              filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  onClick={() => handleToggleStatus(order.id)}
                  className="hover:bg-slate-900/40 transition-colors cursor-pointer group text-xs"
                  title="Click để đổi trạng thái đơn hàng"
                >
                  <td className="py-4 px-4 font-bold text-slate-300">
                    #{order.id}
                  </td>
                  <td className="py-4 px-4 font-black text-white group-hover:text-blue-400 transition-colors">
                    {order.customer}
                  </td>
                  <td className="py-4 px-4">
                    {order.status === "completed" && (
                      <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2.5 py-1 rounded-lg font-bold">
                        <CheckCircle className="w-3.5 h-3.5" />
                        Đăng kí thành công
                      </span>
                    )}
                    {order.status === "processing" && (
                      <span className="inline-flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 text-amber-400 px-2.5 py-1 rounded-lg font-bold">
                        <Truck className="w-3.5 h-3.5" />
                        Đang chờ thanh toán
                      </span>
                    )}
                    {order.status === "cancelled" && (
                      <span className="inline-flex items-center gap-1.5 bg-rose-500/10 border border-rose-500/20 text-rose-400 px-2.5 py-1 rounded-lg font-bold">
                        <XCircle className="w-3.5 h-3.5" />
                        Đã hủy
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-4 text-right font-black text-white">
                    {order.value.toLocaleString("vi-VN")}đ
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold">
        <span>Đang hiển thị {filteredOrders.length}/{orders.length} đơn hàng</span>
        <span>* Click vào dòng đơn hàng để đổi nhanh trạng thái</span>
      </div>
    </div>
  );
}
