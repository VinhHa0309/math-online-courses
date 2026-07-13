import React from "react";

export default function AdminChart() {
  // Dữ liệu biểu đồ cột (Lưu lượng đơn hàng)
  const chartData = [
    { label: "T2", val: 40, active: false },
    { label: "T3", val: 55, active: false },
    { label: "T4", val: 45, active: false },
    { label: "T5", val: 70, active: false },
    { label: "T6", val: 78, active: false },
    { label: "T7", val: 100, active: true }, // Cột cao nhất phát sáng màu đỏ giống ảnh mẫu
    { label: "CN", val: 65, active: false }
  ];

  return (
    <div className="bg-[#0d1424]/40 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col justify-between h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-black text-base text-white">LƯU LƯỢNG ĐƠN HÀNG</h3>
          <p className="text-xs text-slate-400 mt-1">Lượng đơn hàng phát sinh hàng tuần</p>
        </div>
        <span className="text-xs font-bold text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-lg">Tuần hiện tại</span>
      </div>

      {/* Layout các cột biểu đồ */}
      <div className="flex items-end justify-between h-48 px-4 pt-4 border-b border-slate-800">
        {chartData.map((bar, idx) => (
          <div key={idx} className="flex flex-col items-center flex-1 group/bar relative">
            {/* Tooltip khi hover cột */}
            <div className="absolute bottom-full mb-2 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg border border-slate-700 opacity-0 group-hover/bar:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
              {bar.val} đơn hàng
            </div>

            {/* Thân cột */}
            <div
              className={`w-8 sm:w-10 rounded-t-lg transition-all duration-500 cursor-pointer ${
                bar.active
                  ? "bg-gradient-to-t from-orange-600 to-rose-500 shadow-lg shadow-orange-500/30 hover:brightness-110"
                  : idx % 2 === 0
                  ? "bg-blue-600/70 hover:bg-blue-600"
                  : "bg-slate-800 hover:bg-slate-700"
              }`}
              style={{ height: `${bar.val * 1.4}px` }}
            ></div>
            <span className="text-xs font-bold text-slate-400 mt-2.5 block">{bar.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
