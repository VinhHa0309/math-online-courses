import React, { useState } from "react";
import {
  Video,
  Clock,
  CheckCircle2,
  FileText,
  Sparkles,
  Link as LinkIcon,
  Upload,
  Search,
  Plus,
  GripVertical,
  Eye,
  Edit,
  Lock
} from "lucide-react";

export default function CourseVideoList({ chapters, setChapters, onOpenAddModal }) {
  const [videoSearch, setVideoSearch] = useState("");

  const handleTogglePublish = (chapterId, videoId) => {
    setChapters(prev =>
      prev.map(ch => {
        if (ch.id !== chapterId) return ch;
        return {
          ...ch,
          videos: ch.videos.map(v =>
            v.id === videoId ? { ...v, isPublished: !v.isPublished } : v
          )
        };
      })
    );
  };

  return (
    <div className="space-y-6">
      {/* Quick Stats Banner (4 cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Video size={22} />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">18</div>
            <div className="text-xs text-slate-500 font-medium">Tổng số video bài giảng</div>
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <Clock size={22} />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">24.5 giờ</div>
            <div className="text-xs text-slate-500 font-medium">Tổng thời lượng</div>
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <CheckCircle2 size={22} />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">16 video</div>
            <div className="text-xs text-slate-500 font-medium">Đã xuất bản (Công khai)</div>
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <FileText size={22} />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">2 video</div>
            <div className="text-xs text-slate-500 font-medium">Bản nháp lưu tạm</div>
          </div>
        </div>
      </div>

      {/* Quick Upload Widget Box */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-2xl p-6 text-white shadow-md relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1.5 max-w-2xl relative z-10">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-300 uppercase tracking-widest">
            <Sparkles size={14} /> Cập nhật nhanh bài giảng
          </div>
          <h3 className="text-xl font-black text-white tracking-tight">
            Đăng tải & Thêm bài giảng vào giáo trình
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Chọn phương thức tải lên trực tiếp hoặc liên kết đường dẫn bảo mật để học viên bắt đầu theo dõi ngay lập tức.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap relative z-10 w-full md:w-auto justify-end">
          <button
            onClick={onOpenAddModal}
            className="bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-bold px-4 py-2.5 rounded-xl transition-all flex items-center gap-2"
          >
            <LinkIcon size={14} /> Dán link Stream / Vimeo
          </button>

          <button
            onClick={onOpenAddModal}
            className="bg-blue-600 hover:bg-blue-500 active:scale-95 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all shadow-md flex items-center gap-2"
          >
            <Upload size={14} /> Tải file MP4 gốc
          </button>
        </div>
      </div>

      {/* Filter & Action Toolbar */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full md:w-auto flex-1">
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm kiếm video bài giảng, chủ đề..."
              value={videoSearch}
              onChange={(e) => setVideoSearch(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 outline-none focus:bg-white focus:border-blue-500 transition-all"
            />
          </div>

          <select className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-medium text-slate-700 outline-none cursor-pointer">
            <option>Tất cả chương học (Chương 1 - 5)</option>
            <option>Chương 1: Đạo hàm & Khảo sát hàm số</option>
            <option>Chương 2: Mũ & Logarit</option>
          </select>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <button className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-4 py-2.5 rounded-xl transition-all">
            Sắp xếp thứ tự bài giảng
          </button>
          <button
            onClick={onOpenAddModal}
            className="flex items-center gap-2 bg-[#0B132B] hover:bg-[#16223F] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-sm"
          >
            <Plus size={14} />
            + Thêm video mới
          </button>
        </div>
      </div>

      {/* Chapter Accordion List */}
      <div className="space-y-6">
        {chapters.map((ch) => (
          <div key={ch.id} className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-xs">
                  C{ch.id}
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm">{ch.title}</h3>
                  <div className="text-[11px] text-slate-400 font-medium">
                    Bao gồm {ch.videoCount} video bài giảng • Tổng thời lượng: {ch.duration}
                  </div>
                </div>
              </div>

              <span className="text-xs font-bold text-slate-500 bg-white px-3 py-1 rounded-lg border border-slate-200">
                {ch.videoCount} videos
              </span>
            </div>

            <div className="divide-y divide-slate-100">
              {ch.videos
                .filter(v => v.title.toLowerCase().includes(videoSearch.toLowerCase()))
                .map((vid) => (
                  <div
                    key={vid.id}
                    className={`p-4 sm:px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-colors ${
                      vid.isPublished ? "hover:bg-slate-50/60" : "bg-amber-50/30 hover:bg-amber-50/50"
                    }`}
                  >
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <GripVertical size={16} className="text-slate-300 cursor-grab shrink-0 hidden sm:block" />

                      <div className="w-8 h-8 rounded-lg bg-slate-100 font-mono text-xs font-extrabold text-slate-600 flex items-center justify-center shrink-0">
                        {vid.order}
                      </div>

                      <div className="space-y-1 min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className={`text-[10px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider ${
                              vid.isPublished
                                ? "bg-emerald-100 text-emerald-700"
                                : "bg-amber-100 text-amber-800"
                            }`}
                          >
                            {vid.isPublished ? `ĐÃ XUẤT BẢN - ${vid.duration}` : `BẢN NHÁP - ${vid.duration}`}
                          </span>
                        </div>

                        <h4 className="font-bold text-slate-800 text-sm truncate">{vid.title}</h4>

                        <div className="text-[11px] text-slate-400 font-medium flex items-center gap-4">
                          <span>Lượt xem: <strong className="text-slate-700">{vid.views}</strong></span>
                          <span>• Hoàn thành: <strong className="text-slate-700">{vid.completionRate}</strong></span>
                          <span>• Đăng lúc: {vid.publishDate}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                      {!vid.isPublished && (
                        <button
                          onClick={() => handleTogglePublish(ch.id, vid.id)}
                          className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-3.5 py-1.5 rounded-lg transition-all"
                        >
                          🚀 Xuất bản ngay
                        </button>
                      )}

                      <button className="flex items-center gap-1 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold px-3 py-1.5 rounded-lg transition-all">
                        <Eye size={13} /> Xem
                      </button>

                      <button className="flex items-center gap-1 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold px-3 py-1.5 rounded-lg transition-all">
                        <Edit size={13} /> Chỉnh sửa
                      </button>

                      <div className="p-1.5 text-slate-400 hover:text-slate-600 cursor-pointer">
                        <Lock size={15} />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
