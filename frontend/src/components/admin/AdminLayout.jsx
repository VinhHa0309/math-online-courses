import React from "react";
import Header from "../layout/Header";
import AdminSidebar from "./AdminSidebar";

export default function AdminLayout({ children, activeTab, setActiveTab }) {
  return (
    <div className="flex flex-col min-h-screen bg-[#F4F6F9] font-sans antialiased text-[#1E293B]">
      {/* Header dùng chung */}
      <Header />

      <div className="flex-1 flex flex-row min-h-0">
        {/* Sidebar dùng chung */}
        <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Nội dung chính */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          <main className="flex-1 p-8 max-w-[1400px] w-full mx-auto space-y-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
