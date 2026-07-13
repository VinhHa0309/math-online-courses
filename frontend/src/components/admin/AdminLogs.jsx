import React from "react";

export default function AdminLogs({ logs }) {
  return (
    <div className="bg-[#0d1424]/40 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col h-full">
      <div className="mb-6">
        <h3 className="font-black text-base text-white">NHẬT KÝ HOẠT ĐỘNG</h3>
        <p className="text-xs text-slate-400 mt-1">Các sự kiện hệ thống mới nhất</p>
      </div>

      <div className="space-y-4 flex-1 overflow-y-auto max-h-[200px] pr-1">
        {logs.map((log) => (
          <div key={log.id} className="flex gap-3 text-xs leading-relaxed group">
            <div className="mt-1 flex flex-col items-center">
              <div
                className={`w-2.5 h-2.5 rounded-full ${
                  log.type === "success"
                    ? "bg-emerald-500 shadow-md shadow-emerald-500/50"
                    : log.type === "warning"
                    ? "bg-orange-500 shadow-md shadow-orange-500/50"
                    : "bg-blue-400 shadow-md shadow-blue-500/50"
                }`}
              />
              <div className="w-[1px] h-12 bg-slate-800 group-last:hidden" />
            </div>
            <div className="flex-1 bg-slate-900/30 rounded-xl p-2.5 border border-slate-800/40">
              <div className="flex justify-between items-center mb-1">
                <span className={`font-bold capitalize ${
                  log.type === "success"
                    ? "text-emerald-400"
                    : log.type === "warning"
                    ? "text-orange-400"
                    : "text-blue-400"
                }`}>
                  {log.type}
                </span>
                <span className="text-[10px] text-slate-400">{log.time}</span>
              </div>
              <p className="text-slate-300 font-medium">{log.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
