import React from "react";
import { LayoutDashboard, ShoppingBag, Users, BarChart3, Settings as SettingsIcon } from "lucide-react";

export default function AdminSidebar({ activeTab, setActiveTab }) {
  return (
    <aside className="w-72 bg-[#0d1424]/90 backdrop-blur-xl border-r border-slate-800/60 p-6 flex flex-col justify-between hidden md:flex shrink-0 z-20">
      <div className="space-y-8">
        {/* Logo Quản Trị */}
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
            <LayoutDashboard className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="font-black text-lg tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              BẢNG QUẢN TRỊ
            </h2>
            <span className="text-[10px] font-bold text-blue-400 tracking-widest uppercase">Admin System</span>
          </div>
        </div>

        {/* Menu Links */}
        <nav className="space-y-1.5">
          {[
            { id: "overview", label: "TỔNG QUAN", icon: LayoutDashboard },
            { id: "orders", label: "ĐƠN HÀNG", icon: ShoppingBag },
            { id: "users", label: "NGƯỜI DÙNG", icon: Users },
            { id: "reports", label: "BÁO CÁO", icon: BarChart3 },
            { id: "settings", label: "CẤU HÌNH", icon: SettingsIcon }
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-bold tracking-wide transition-all ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25 border-l-4 border-blue-400 scale-[1.02]"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/40"
                }`}
              >
                <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive ? "text-white" : "text-slate-400"}`} />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* User Card ở chân Sidebar */}
      <div className="p-4 bg-slate-800/40 rounded-2xl border border-slate-700/50 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-orange-500 to-amber-400 flex items-center justify-center font-bold text-white shadow">
          VH
        </div>
        <div className="overflow-hidden">
          <h4 className="text-xs font-black text-white truncate">Vinh Ha</h4>
          <p className="text-[10px] text-slate-400 font-medium truncate">System Administrator</p>
        </div>
      </div>
    </aside>
  );
}
