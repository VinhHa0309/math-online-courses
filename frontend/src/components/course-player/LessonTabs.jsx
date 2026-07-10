import { useState } from "react";
import { BookOpen, Notebook, FileText } from "lucide-react";

export default function LessonTabs({ activeLesson, savedNotes, onSaveNote }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [noteText, setNoteText] = useState("");

  const handleSave = () => {
    if (!noteText.trim()) return;
    onSaveNote(noteText);
    setNoteText("");
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm flex-1 flex flex-col overflow-hidden">
      {/* Header Tabs */}
      <div className="flex border-b border-[#E2E8F0] bg-[#F8FAFC]/50 px-4">
        {[
          { id: "overview", label: "Tổng quan", icon: BookOpen },
          { id: "notes", label: "Ghi chú", icon: Notebook },
          { id: "resources", label: "Tài liệu", icon: FileText }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-4 text-sm font-semibold transition-all border-b-2 outline-none ${
                isActive
                  ? "border-[#F08A4B] text-[#F08A4B] bg-white font-bold"
                  : "border-transparent text-[#6B7A90] hover:text-[#1A2B47]"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Content Tabs */}
      <div className="p-6 flex-1">
        {activeTab === "overview" && (
          <div className="space-y-4">
            <h3 className="font-outfit font-bold text-lg text-[#1A2B47]">Về bài học này</h3>
            <p className="text-[#4A5568] leading-relaxed font-dmsans">
              {activeLesson.description}
            </p>
          </div>
        )}

        {activeTab === "notes" && (
          <div className="space-y-6">
            {/* Nhập ghi chú */}
            <div className="space-y-3">
              <h3 className="font-outfit font-bold text-lg text-[#1A2B47]">Tạo ghi chú mới</h3>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  placeholder="Nhập ghi chú tại thời điểm hiện tại của video..."
                  className="flex-1 px-4 py-2.5 rounded-xl border border-[#E2E8F0] text-sm focus:outline-none focus:border-[#F08A4B] transition-all bg-[#F8FAFC]"
                />
                <button
                  onClick={handleSave}
                  className="bg-[#F08A4B] hover:bg-[#D97736] text-white font-semibold px-5 py-2.5 rounded-xl transition-all active:scale-95 text-sm"
                >
                  Lưu lại
                </button>
              </div>
            </div>

            {/* Danh sách ghi chú */}
            <div className="space-y-3 pt-2">
              <h4 className="font-outfit font-semibold text-sm text-[#6B7A90] uppercase tracking-wider">Lịch sử ghi chú</h4>
              {savedNotes.length > 0 ? (
                <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                  {savedNotes.map((n) => (
                    <div key={n.id} className="flex gap-4 p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
                      <span className="bg-[#FDF2E9] text-[#F08A4B] text-xs font-bold px-2.5 py-1 rounded-lg h-fit">
                        {n.time}
                      </span>
                      <p className="text-sm text-[#4A5568] font-dmsans">{n.content}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-[#9CA3B0] italic">Chưa có ghi chú nào được ghi lại.</p>
              )}
            </div>
          </div>
        )}

        {activeTab === "resources" && (
          <div className="space-y-4">
            <h3 className="font-outfit font-bold text-lg text-[#1A2B47]">Tài liệu học tập đi kèm</h3>
            {activeLesson.resources && activeLesson.resources.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeLesson.resources.map((res, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] hover:border-[#F08A4B]/35 transition-all">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-[#FFF5EC] rounded-lg text-[#F08A4B]">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#1A2B47] line-clamp-1">{res.name}</p>
                        <p className="text-xs text-[#6B7A90]">{res.size}</p>
                      </div>
                    </div>
                    <button className="text-xs font-bold text-[#F08A4B] hover:text-[#D97736] transition-all bg-white border border-[#FDF2E9] px-3 py-1.5 rounded-lg shadow-sm hover:shadow-md">
                      Tải xuống
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-[#9CA3B0] italic">Không có tài liệu nào đính kèm cho bài học này.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
