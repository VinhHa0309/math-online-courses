import React from "react";
import { LayoutDashboard, GraduationCap, Users, Settings as SettingsIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AdminSidebar({ activeTab, setActiveTab }) {
  const navigate = useNavigate();

  const navItems = [
    { id: "overview", label: "Dashboard", icon: LayoutDashboard, path: "/admin" },
    { id: "courses", label: "Khóa học", icon: GraduationCap, path: "/admin" },
    { id: "users", label: "Học viên", icon: Users, path: "/admin" },
    { id: "settings", label: "Cài đặt", icon: SettingsIcon, path: "/admin" }
  ];

  return (
    <aside className="w-64 bg-[#0B132B] text-white flex flex-col shrink-0">
      {/* Sidebar Header */}
      <div className="p-6 border-b border-slate-800">
        <div
          onClick={() => navigate("/")}
          className="text-2xl font-black tracking-tight text-white cursor-pointer hover:opacity-90 flex items-center gap-2"
        >
          <span>Mathematiq</span>
        </div>
        <div className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mt-1">
          ENTERPRISE PORTAL
        </div>
      </div>

      {/* Sidebar Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                if (setActiveTab) setActiveTab(item.id);
                if (item.path) navigate(item.path);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl transition-all ${
                isActive
                  ? "bg-blue-600/20 text-blue-400 font-bold"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <Icon size={18} />
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-slate-800 bg-[#080E20] text-xs text-slate-400 flex items-center justify-between">
        <span>• Hệ thống học tập</span>
        <span className="font-mono text-[10px] text-slate-500">v2.4</span>
      </div>
    </aside>
  );
}
