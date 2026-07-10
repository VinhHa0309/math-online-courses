import { useNavigate } from "react-router-dom";
import { BookOpen, Star } from "lucide-react";
import { documents } from "../../../data/documents";

// ── Hàng thông tin (nhãn + giá trị) ──────────────────────
function InfoRow({ label, value }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
        {label}
      </span>
      <span className="text-sm font-bold text-[#1A2B47]">{value}</span>
    </div>
  );
}

// ── Hiển thị độ khó bằng dấu sao ─────────────────────────
function DifficultyStars({ level = 3 }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={12}
          className={
            i < level ? "fill-orange-400 text-orange-400" : "text-slate-200"
          }
        />
      ))}
    </div>
  );
}

// ── Card tài liệu tương tự ────────────────────────────────
function RelatedDocCard({ doc }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(`/document/${doc.id}`)}
      className="w-full flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors text-left group"
    >
      <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-red-100 transition-colors">
        <BookOpen size={14} className="text-red-500" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-bold text-[#1A2B47] leading-snug line-clamp-2 group-hover:text-[#F08A4B] transition-colors">
          {doc.title}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-[10px] text-slate-400">{doc.year}</span>
          <span className="text-[10px] text-slate-300">·</span>
          <span className="text-[10px] text-slate-400">{doc.size}</span>
        </div>
      </div>
    </button>
  );
}

export default function DocInfoPanel({ doc }) {
  const navigate = useNavigate();

  // Lấy 3 tài liệu tương tự (cùng grade, khác id)
  const relatedDocs = documents
    .filter((d) => d.grade === doc?.grade && d.id !== doc?.id)
    .slice(0, 3);

  // Map tag sang môn học
  const subjectMap = {
    "CHÍNH THỨC": "Vật Lý",
    "MINH HỌA": "Toán",
    "ÔN TẬP": "Toán",
    "CHUYÊN ĐỀ": "Toán",
    "HỌC SINH GIỎI": "Toán",
    "CƠ BẢN": "Toán",
  };

  return (
    <aside className="w-full lg:w-64 shrink-0 space-y-4">
      {/* ── Thông tin tài liệu ── */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 space-y-4">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">
          Thông tin tài liệu
        </h3>

        <div className="grid grid-cols-2 gap-4">
          <InfoRow
            label="Môn học"
            value={subjectMap[doc?.tag] || "Toán"}
          />
          <InfoRow
            label="Khối lớp"
            value={`Lớp ${doc?.grade || "12"}`}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Độ khó
            </span>
            <DifficultyStars level={3} />
          </div>
          <InfoRow label="Định dạng" value={doc?.type?.includes("Trắc") ? "PDF" : "PDF"} />
        </div>

        <hr className="border-slate-100" />

        <div className="grid grid-cols-2 gap-4">
          <InfoRow label="Kích thước" value={doc?.size || "2.4 MB"} />
          <InfoRow label="Lượt xem" value={doc?.views || "2,733"} />
        </div>

        {/* Nút làm bài */}
        <button className="w-full py-3 bg-[#F08A4B] text-white font-black text-xs rounded-xl hover:bg-orange-500 active:scale-95 transition-all shadow-md shadow-orange-200 mt-2">
          Làm bài ngay →
        </button>
      </div>

      {/* ── Tài liệu tương tự ── */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 space-y-3">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">
          Tài liệu tương tự
        </h3>

        <div className="space-y-1">
          {relatedDocs.length > 0 ? (
            relatedDocs.map((rdoc) => (
              <RelatedDocCard key={rdoc.id} doc={rdoc} />
            ))
          ) : (
            <p className="text-xs text-slate-400 text-center py-3">
              Chưa có tài liệu tương tự
            </p>
          )}
        </div>

        <button
          onClick={() => navigate("/document")}
          className="w-full py-2.5 border border-slate-100 text-xs font-bold text-slate-400 rounded-xl hover:bg-slate-50 hover:text-[#1A2B47] transition-all mt-1"
        >
          Xem tất cả tài liệu {subjectMap[doc?.tag] || "Toán"} →
        </button>
      </div>
    </aside>
  );
}
