import React, { useState } from "react";
import { Search, Download, Plus, Eye, MessageSquare } from "lucide-react";

export default function CourseStudentTable({ students }) {
  const [studentSearch, setStudentSearch] = useState("");
  const [studentStatusFilter, setStudentStatusFilter] = useState("ALL");

  const filteredStudents = students.filter((st) => {
    const matchSearch =
      st.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
      st.email.toLowerCase().includes(studentSearch.toLowerCase()) ||
      st.id.toLowerCase().includes(studentSearch.toLowerCase());

    const matchStatus =
      studentStatusFilter === "ALL" ||
      (studentStatusFilter === "LEARNING" && st.status === "Đang học") ||
      (studentStatusFilter === "COMPLETED" && st.status === "Đã hoàn thành");

    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6">
      {/* Control Bar */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full md:w-auto flex-1">
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm theo họ tên, email hoặc mã học viên..."
              value={studentSearch}
              onChange={(e) => setStudentSearch(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 outline-none focus:bg-white focus:border-blue-500 transition-all"
            />
          </div>

          <select
            value={studentStatusFilter}
            onChange={(e) => setStudentStatusFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-medium text-slate-700 outline-none cursor-pointer"
          >
            <option value="ALL">Tất cả trạng thái</option>
            <option value="LEARNING">Đang học</option>
            <option value="COMPLETED">Đã hoàn thành</option>
          </select>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <button className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-4 py-2.5 rounded-xl transition-all">
            <Download size={14} />
            Xuất danh sách Excel
          </button>
          <button className="flex items-center gap-2 bg-[#0B132B] hover:bg-[#16223F] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-sm">
            <Plus size={14} />
            Thêm học viên
          </button>
        </div>
      </div>

      {/* Table Data */}
      <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-4 px-6">HỌC VIÊN</th>
                <th className="py-4 px-6">EMAIL LIÊN HỆ</th>
                <th className="py-4 px-6">NGÀY THAM GIA</th>
                <th className="py-4 px-6">TIẾN ĐỘ HỌC TẬP</th>
                <th className="py-4 px-6">TRẠNG THÁI</th>
                <th className="py-4 px-6 text-right">THAO TÁC</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-700">
              {filteredStudents.map((st) => (
                <tr key={st.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-full font-bold flex items-center justify-center shrink-0 ${st.avatarBg}`}>
                        {st.initials}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-sm">{st.name}</div>
                        <div className="text-[10px] text-slate-400 font-mono mt-0.5">ID: {st.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-slate-600 font-medium">{st.email}</td>
                  <td className="py-4 px-6 text-slate-500 font-medium">{st.joinDate}</td>
                  <td className="py-4 px-6">
                    <div className="w-48 space-y-1.5">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-slate-800">{st.completedLessons}/{st.totalLessons} video</span>
                        <span className="font-extrabold text-slate-900">{st.progress}%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${st.progress === 100 ? "bg-emerald-500" : "bg-blue-600"}`}
                          style={{ width: `${st.progress}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-3 py-1 rounded-lg text-[11px] font-bold inline-block ${
                        st.status === "Đã hoàn thành"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {st.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2 text-slate-400">
                      <button className="p-1.5 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Eye size={16} />
                      </button>
                      <button className="p-1.5 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
                        <MessageSquare size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs font-semibold text-slate-500">
          <div>Hiển thị 1-{filteredStudents.length} trên tổng số {students.length} học viên</div>
          <div className="flex items-center gap-1">
            <button className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-white transition-colors">Trước</button>
            <button className="px-3 py-1.5 rounded-lg bg-[#0B132B] text-white font-bold">1</button>
            <button className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-white transition-colors">2</button>
            <button className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-white transition-colors">Sau</button>
          </div>
        </div>
      </div>
    </div>
  );
}
