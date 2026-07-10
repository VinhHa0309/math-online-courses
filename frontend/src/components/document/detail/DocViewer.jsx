import { useState } from "react";
import { Download, Maximize2, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";

// ── URL file PDF đã đặt trong /public ────────────────────
const PDF_URL = "/la2ob7d081ie.pdf";

export default function DocViewer({ doc }) {
  const navigate = useNavigate();
  const [isFullscreen, setIsFullscreen] = useState(false);

  // ── Mở PDF full tab ───────────────────────────────────
  const handleOpenNewTab = () => window.open(PDF_URL, "_blank");

  // ── Toggle toàn màn hình ──────────────────────────────
  const handleFullscreen = () => setIsFullscreen((v) => !v);

  return (
    <div className={`flex flex-col gap-3 ${isFullscreen ? "fixed inset-0 z-50 bg-white p-4" : "flex-1 min-w-0"}`}>
      {/* ── Thanh toolbar ── */}
      <div className="flex items-center justify-between bg-white border border-slate-100 rounded-2xl px-4 py-2.5 shadow-sm flex-wrap gap-2">
        {/* Tên file */}
        <span className="text-xs font-bold text-slate-400 truncate max-w-[180px]">
          📄 {doc?.title?.slice(0, 40) || "Tài liệu PDF"}...
        </span>

        {/* Nút hành động */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleOpenNewTab}
            title="Mở tab mới"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-400 hover:bg-slate-50 hover:text-[#1A2B47] transition-all active:scale-90"
          >
            <ExternalLink size={14} />
            Mở tab mới
          </button>
          <button
            onClick={handleFullscreen}
            title="Toàn màn hình"
            className="p-1.5 rounded-xl text-slate-400 hover:bg-slate-50 hover:text-[#1A2B47] transition-all active:scale-90"
          >
            <Maximize2 size={15} />
          </button>
          <a
            href={PDF_URL}
            download
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1A2B47] text-white text-xs font-black hover:bg-[#F08A4B] active:scale-95 transition-all shadow-sm"
          >
            <Download size={13} />
            Tải về
          </a>
        </div>
      </div>

      {/* ── Khung nhúng PDF thật ── */}
      <div className={`rounded-2xl overflow-hidden border border-slate-100 shadow-sm bg-slate-50 ${isFullscreen ? "flex-1" : ""}`}>
        <iframe
          src={`${PDF_URL}#toolbar=0&navpanes=0&scrollbar=1`}
          title={doc?.title || "Xem tài liệu PDF"}
          className="w-full"
          style={{ height: isFullscreen ? "calc(100vh - 160px)" : "680px", border: "none" }}
        />
      </div>

      {/* ── Thanh hành động phía dưới ── */}
      <div className="flex items-center justify-between bg-white border border-slate-100 rounded-2xl px-5 py-3.5 shadow-sm flex-wrap gap-3">
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-[#1A2B47] transition-colors">
            <span>🔖</span> Lưu tài liệu
          </button>
          <button className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-red-500 transition-colors">
            <span>⚑</span> Báo lỗi
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate("/document")}
            className="text-xs font-bold text-slate-400 hover:text-[#1A2B47] transition-colors px-3 py-2 rounded-xl hover:bg-slate-50"
          >
            Trở về danh sách
          </button>
          <a
            href={PDF_URL}
            download
            className="flex items-center gap-2 px-4 py-2.5 bg-[#1A2B47] text-white text-xs font-black rounded-xl hover:bg-[#F08A4B] active:scale-95 transition-all shadow-sm"
          >
            <Download size={13} />
            Tải PDF ({doc?.size || "2.4 MB"})
          </a>
        </div>
      </div>
    </div>
  );
}
