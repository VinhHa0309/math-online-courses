import React, { useState } from "react";

export default function AddVideoModal({ isOpen, onClose, onAddVideo }) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [duration, setDuration] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Vui lòng nhập tên bài giảng!");
      return;
    }
    onAddVideo({ title, url, duration });
    setTitle("");
    setUrl("");
    setDuration("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="font-extrabold text-slate-900 text-lg">Thêm Video Bài Giảng Mới</h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 font-bold"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-600 block">Tên bài giảng *</label>
            <input
              type="text"
              placeholder="Ví dụ: Bài 7: Tổng ôn tập chương 1"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 outline-none focus:bg-white focus:border-blue-500 transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-600 block">Đường dẫn Video (URL / Cloudinary / Youtube / Stream)</label>
            <input
              type="url"
              placeholder="https://res.cloudinary.com/... hoặc https://youtube.com/..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 outline-none focus:bg-white focus:border-blue-500 transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-600 block">Thời lượng (Phút:Giây)</label>
            <input
              type="text"
              placeholder="Ví dụ: 25:30"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 outline-none focus:bg-white focus:border-blue-500 transition-all"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-4 py-2.5 rounded-xl transition-all"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="bg-[#0B132B] hover:bg-[#16223F] text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all shadow-md"
            >
              Lưu bài giảng
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
