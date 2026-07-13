import React from "react";
import { TrendingUp, ShoppingBag, RefreshCw, AlertTriangle } from "lucide-react";

export default function AdminStatCards({ totalRevenue, newOrdersCount, processingCount, failureRate }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Card 1: Doanh thu */}
      <div className="relative group bg-[#0d1424]/40 hover:bg-[#0d1424]/60 transition-all duration-300 rounded-3xl p-6 border border-slate-800 shadow-xl overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-colors"></div>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Doanh Thu</p>
            <h3 className="text-2xl font-black text-white mt-3 tracking-tight">
              {(totalRevenue / 1000000).toFixed(2)}tr <span className="text-sm font-medium text-slate-400">đ</span>
            </h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-blue-400" />
          </div>
        </div>
        <div className="mt-4 flex items-center gap-1.5 text-emerald-400 text-[11px] font-bold">
          <span className="px-1.5 py-0.5 rounded bg-emerald-500/10">+12.4%</span>
          <span className="text-slate-400">so với tháng trước</span>
        </div>
      </div>

      {/* Card 2: Đơn mới */}
      <div className="relative group bg-[#0d1424]/40 hover:bg-[#0d1424]/60 transition-all duration-300 rounded-3xl p-6 border border-slate-800 shadow-xl overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/10 rounded-full blur-2xl group-hover:bg-rose-500/20 transition-colors"></div>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Đơn Mới</p>
            <h3 className="text-2xl font-black text-white mt-3 tracking-tight">
              {newOrdersCount}
            </h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center">
            <ShoppingBag className="w-5 h-5 text-rose-400" />
          </div>
        </div>
        <div className="mt-4 flex items-center gap-1.5 text-rose-400 text-[11px] font-bold">
          <span className="px-1.5 py-0.5 rounded bg-rose-500/10">+8 đơn</span>
          <span className="text-slate-400">vừa tạo hôm nay</span>
        </div>
      </div>

      {/* Card 3: Đang xử lý */}
      <div className="relative group bg-[#0d1424]/40 hover:bg-[#0d1424]/60 transition-all duration-300 rounded-3xl p-6 border border-slate-800 shadow-xl overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-colors"></div>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Đang Xử Lý</p>
            <h3 className="text-2xl font-black text-white mt-3 tracking-tight">
              {processingCount}
            </h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
            <RefreshCw className="w-4 h-4 text-amber-400 animate-spin-slow" />
          </div>
        </div>
        <div className="mt-4 flex items-center gap-1.5 text-amber-400 text-[11px] font-bold">
          <span className="px-1.5 py-0.5 rounded bg-amber-500/10">Active</span>
          <span className="text-slate-400">cần bàn giao gấp</span>
        </div>
      </div>

      {/* Card 4: Tỷ lệ lỗi */}
      <div className="relative group bg-[#0d1424] hover:bg-slate-900 transition-all duration-300 rounded-3xl p-6 border border-blue-500/20 shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-blue-400 text-xs font-bold uppercase tracking-wider">Tỷ Lệ Lỗi</p>
            <h3 className="text-2xl font-black text-white mt-3 tracking-tight">
              {failureRate}%
            </h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
            <AlertTriangle className="w-4.5 h-4.5 text-white" />
          </div>
        </div>
        <div className="mt-4 flex items-center gap-1.5 text-emerald-400 text-[11px] font-bold">
          <span className="px-1.5 py-0.5 rounded bg-emerald-500/10">-0.2%</span>
          <span className="text-slate-400">ổn định tốt</span>
        </div>
      </div>
    </div>
  );
}
