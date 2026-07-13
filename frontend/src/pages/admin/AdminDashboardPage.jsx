import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Plus,
  Bell,
  Calendar
} from "lucide-react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminStatCards from "../../components/admin/AdminStatCards";
import AdminChart from "../../components/admin/AdminChart";
import AdminLogs from "../../components/admin/AdminLogs";
import AdminOrdersTable from "../../components/admin/AdminOrdersTable";

// Mock data ban đầu dựa trên ảnh của người dùng
const INITIAL_ORDERS = [
  { id: "4821", customer: "Nguyễn Văn A", status: "completed", value: 890000, date: "14:22" },
  { id: "4820", customer: "Trần Thị B", status: "processing", value: 1240000, date: "13:45" },
  { id: "4819", customer: "Lê Minh C", status: "cancelled", value: 540000, date: "11:15" },
  { id: "4818", customer: "Phạm Văn D", status: "completed", value: 1500000, date: "10:30" }
];

const INITIAL_LOGS = [
  { id: 1, text: "Đơn #4821 đã xác nhận thành công", type: "success", time: "Vừa xong" },
  { id: 2, text: "Người dùng mới đăng ký: hoàng_nam99", type: "info", time: "10 phút trước" },
  { id: 3, text: "Cảnh báo hệ thống: Lưu lượng truy cập tăng vọt", type: "warning", time: "25 phút trước" }
];

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [logs, setLogs] = useState(INITIAL_LOGS);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [timeString, setTimeString] = useState("");

  // Cập nhật đồng hồ thời gian thực giống ảnh của người dùng
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const day = String(now.getDate()).padStart(2, "0");
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const year = now.getFullYear();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      setTimeString(`${day}.${month}.${year} • ${hours}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  // Tính toán các chỉ số KPI động từ danh sách đơn hàng
  const totalRevenue = orders
    .filter(o => o.status !== "cancelled")
    .reduce((sum, o) => sum + o.value, 0);
  const newOrdersCount = orders.length;
  const processingCount = orders.filter(o => o.status === "processing").length;
  const failureRate = 0.4; // Tỷ lệ lỗi cố định hoặc mô phỏng

  // Hàm giả lập tạo đơn hàng mới ngẫu nhiên
  const handleAddMockOrder = () => {
    const names = ["Nguyễn Thị Mai", "Đỗ Minh Quân", "Bùi Hoàng Yến", "Phan Anh Tuấn"];
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomValue = Math.floor(Math.random() * 15 + 3) * 100000; // 300k - 1.8tr
    const newId = String(Number(orders[0]?.id || "4800") + 1);
    
    const newOrder = {
      id: newId,
      customer: randomName,
      status: Math.random() > 0.3 ? "processing" : "completed",
      value: randomValue,
      date: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })
    };

    setOrders([newOrder, ...orders]);

    // Ghi nhận nhật ký mới
    const newLog = {
      id: Date.now(),
      text: `Đơn #${newId} phát sinh từ ${randomName}`,
      type: "info",
      time: "Vừa xong"
    };
    setLogs([newLog, ...logs.slice(0, 4)]);
  };

  // Thay đổi trạng thái đơn hàng
  const handleToggleStatus = (id) => {
    setOrders(orders.map(o => {
      if (o.id === id) {
        let nextStatus = "processing";
        if (o.status === "processing") nextStatus = "completed";
        else if (o.status === "completed") nextStatus = "cancelled";
        else nextStatus = "processing";
        
        // Log hoạt động thay đổi trạng thái
        const newLog = {
          id: Date.now(),
          text: `Đơn #${id} chuyển sang trạng thái [${nextStatus === "completed" ? "Đã giao" : nextStatus === "processing" ? "Đang giao" : "Đã huỷ"}]`,
          type: nextStatus === "completed" ? "success" : nextStatus === "cancelled" ? "warning" : "info",
          time: "Vừa xong"
        };
        setLogs(prev => [newLog, ...prev.slice(0, 4)]);
        
        return { ...o, status: nextStatus };
      }
      return o;
    }));
  };

  return (
    <div className="min-h-screen bg-[#070b13] text-slate-100 flex font-sans selection:bg-blue-500 selection:text-white relative overflow-hidden">
      {/* Khối nền phát sáng nhẹ (Ambient Glow Effects) */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-orange-500/5 blur-[150px] pointer-events-none"></div>

      {/* Sidebar Độc Bản */}
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main content area */}
      <main className="flex-1 flex flex-col min-w-0 z-10">
        {/* Header */}
        <header className="h-20 bg-[#070b13]/80 backdrop-blur-md border-b border-slate-800/50 px-6 sm:px-10 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 md:hidden">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <LayoutDashboard className="w-4.5 h-4.5 text-white" />
            </div>
            <h2 className="font-black text-sm tracking-tight text-white">BẢNG QUẢN TRỊ</h2>
          </div>

          <div className="hidden sm:flex items-center gap-2 bg-slate-900/60 border border-slate-800 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-300">
            <Calendar className="w-3.5 h-3.5 text-blue-400" />
            <span>{timeString}</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleAddMockOrder}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 active:scale-95 text-white text-xs font-black px-4 py-2.5 rounded-xl shadow-lg shadow-blue-500/25 flex items-center gap-1.5 transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              TẠO ĐƠN MẪU
            </button>

            <div className="relative">
              <button className="w-10 h-10 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-800 transition-all">
                <Bell className="w-4 h-4" />
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-orange-500" />
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-6 sm:p-10 space-y-8 overflow-y-auto flex-1">
          {/* KPI Stat Cards */}
          <AdminStatCards
            totalRevenue={totalRevenue}
            newOrdersCount={newOrdersCount}
            processingCount={processingCount}
            failureRate={failureRate}
          />

          {/* Charts and logs section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <AdminChart />
            </div>
            <div>
              <AdminLogs logs={logs} />
            </div>
          </div>

          {/* Orders table */}
          <AdminOrdersTable
            orders={orders}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            handleToggleStatus={handleToggleStatus}
          />
        </div>
      </main>
    </div>
  );
}
