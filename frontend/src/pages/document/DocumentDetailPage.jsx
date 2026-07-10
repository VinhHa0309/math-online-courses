import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Eye, Calendar } from "lucide-react";
import { documents } from "../../data/documents";
import DocSidebar from "../../components/document/detail/DocSidebar";
import DocViewer from "../../components/document/detail/DocViewer";
import DocInfoPanel from "../../components/document/detail/DocInfoPanel";

// ── Breadcrumb ────────────────────────────────────────────
function Breadcrumb({ title }) {
  const navigate = useNavigate();
  return (
    <nav className="flex items-center gap-1.5 text-xs text-slate-400 flex-wrap">
      <button
        onClick={() => navigate("/")}
        className="hover:text-[#1A2B47] transition-colors font-medium"
      >
        Trang chủ
      </button>
      <span className="text-slate-200">›</span>
      <button
        onClick={() => navigate("/document")}
        className="hover:text-[#1A2B47] transition-colors font-medium"
      >
        Tài liệu
      </button>
      <span className="text-slate-200">›</span>
      <span className="text-[#1A2B47] font-bold line-clamp-1 max-w-xs">
        {title}
      </span>
    </nav>
  );
}

// ── Tag badge ─────────────────────────────────────────────
function DocTag({ label, variant = "grade" }) {
  const styles =
    variant === "grade"
      ? "bg-slate-100 text-slate-500"
      : "bg-orange-50 text-orange-500";
  return (
    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase ${styles}`}>
      {label}
    </span>
  );
}

// ── Trang chi tiết tài liệu ───────────────────────────────
export default function DocumentDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Tìm tài liệu theo id (fallback về tài liệu đầu tiên)
  const doc = documents.find((d) => String(d.id) === String(id)) || documents[0];

  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-8 py-8 min-h-screen bg-white">
      {/* ── Nút quay lại + Breadcrumb ── */}
      <div className="flex flex-col gap-3 mb-6">
        <button
          onClick={() => navigate("/document")}
          className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-[#1A2B47] transition-colors group w-fit"
        >
          <ArrowLeft
            size={15}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Quay lại trang tài liệu
        </button>
        <Breadcrumb title={doc.title} />
      </div>

      {/* ── Layout 3 cột ── */}
      <div className="flex gap-6 items-start">
        {/* Cột 1: Sidebar navigation */}
        <DocSidebar doc={doc} />

        {/* Cột 2: Nội dung chính */}
        <div className="flex-1 min-w-0 space-y-5">
          {/* Tiêu đề tài liệu + nút làm bài */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="space-y-2">
              <h1 className="text-xl font-black text-[#1A2B47] leading-snug">
                {doc.title}
              </h1>
              {/* Meta info */}
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                  <Eye size={13} />
                  <span>{doc.views} lượt xem</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                  <Calendar size={13} />
                  <span>{doc.year}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DocTag label={`Lớp ${doc.grade}`} variant="grade" />
                  <DocTag label={doc.type} variant="subject" />
                </div>
              </div>
            </div>

            {/* Nút làm bài (chỉ hiện ở sm+) */}
            <button className="hidden sm:flex items-center gap-2 px-5 py-3 bg-[#F08A4B] text-white font-black text-sm rounded-xl hover:bg-orange-500 active:scale-95 transition-all shadow-md shadow-orange-200 shrink-0">
              Làm bài ngay
            </button>
          </div>

          {/* Viewer PDF */}
          <DocViewer doc={doc} />
        </div>

        {/* Cột 3: Panel thông tin & tài liệu liên quan */}
        <DocInfoPanel doc={doc} />
      </div>
    </div>
  );
}
