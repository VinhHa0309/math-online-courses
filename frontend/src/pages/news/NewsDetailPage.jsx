import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { newsArticles } from "../../data/news";
import { CategoryBadge } from "../../components/news/NewsCard";
import NewsletterBox from "../../components/news/NewsletterBox";
import { Share2, Link2, Calendar, Clock, AlertTriangle, Check } from "lucide-react";

export default function NewsDetailPage() {
  const { id } = useParams();
  const [copied, setCopied] = useState(false);

  // Tìm bài viết theo ID hoặc lấy bài viết đầu tiên làm mặc định
  const articleId = parseInt(id) || 1;
  const article = newsArticles.find((a) => a.id === articleId) || newsArticles[0];

  // Lọc 3 bài liên quan khác với bài hiện tại
  const relatedArticles = newsArticles
    .filter((a) => a.id !== article.id)
    .slice(0, 3);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen py-6">
      {/* ── Breadcrumbs ── */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 mb-6">
        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <Link to="/" className="hover:text-[#F08A4B] transition-colors">Home</Link>
          <span>&rsaquo;</span>
          <Link to="/news" className="hover:text-[#F08A4B] transition-colors">Tin tức</Link>
          <span>&rsaquo;</span>
          <span className="text-slate-800 font-semibold truncate max-w-[200px] sm:max-w-none">
            {article.title}
          </span>
        </div>
      </div>

      {/* ── Main Layout Grid ── */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* ── CỘT TRÁI: CHI TIẾT BÀI VIẾT (8/12) ── */}
        <article className="lg:col-span-8 bg-white rounded-2xl border border-slate-100 p-5 sm:p-8 space-y-6 shadow-sm">
          
          {/* Ảnh bài viết */}
          <div className="w-full aspect-[21/9] sm:aspect-[21/10] rounded-2xl overflow-hidden bg-slate-100 shadow-inner">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
            <CategoryBadge label={article.category} />
            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>{article.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{article.readTime || "5 phút"} đọc</span>
            </div>
          </div>

          {/* Tiêu đề */}
          <h1 className="text-2xl sm:text-3xl font-black text-[#1A2B47] leading-tight">
            {article.title}
          </h1>

          {/* Hộp chia sẻ bài viết */}
          <div className="flex items-center gap-3 py-3 border-y border-slate-100">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Chia sẻ bài viết:</span>
            <div className="flex gap-2">
              <button 
                onClick={() => alert("Chia sẻ qua mạng xã hội")} 
                className="w-8 h-8 rounded-lg bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-600 transition-colors border border-slate-200/50"
                title="Chia sẻ"
              >
                <Share2 className="w-4 h-4" />
              </button>
              <button 
                onClick={handleCopyLink} 
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors border ${
                  copied 
                    ? "bg-emerald-50 border-emerald-200 text-emerald-600" 
                    : "bg-slate-50 hover:bg-slate-100 border-slate-200/50 text-slate-600"
                }`}
                title="Sao chép liên kết"
              >
                {copied ? <Check className="w-4 h-4" /> : <Link2 className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Nội dung bài viết */}
          <div className="space-y-6 text-[#2D3748] text-sm sm:text-base leading-relaxed">
            <p className="font-medium text-slate-600">
              Kỳ thi tốt nghiệp THPT năm 2026 đã chính thức diễn ra với môn Toán là một trong những môn thi then chốt. 
              Đề thi năm nay được đánh giá là có cấu trúc phân hóa rõ rệt, bám sát chương trình giáo dục phổ thông mới 
              với các ứng dụng thực tế cao.
            </p>

            <h2 className="text-xl font-bold text-[#1A2B47] pt-2">Phân tích cấu trúc đề thi</h2>
            <p>
              Theo đánh giá của các chuyên gia tại Mathematiq, đề thi gồm 50 câu hỏi trắc nghiệm với độ khó tăng dần. 
              Các phần trọng tâm bao gồm:
            </p>

            <ul className="space-y-3 list-none pl-0">
              <li className="relative pl-6 before:content-['•'] before:absolute before:left-2 before:text-[#F08A4B] before:font-bold before:text-lg">
                <strong>Giải tích:</strong> Chiếm khoảng 60% tổng số điểm, tập trung vào khảo sát hàm số, nguyên hàm và tích phân.
              </li>
              <li className="relative pl-6 before:content-['•'] before:absolute before:left-2 before:text-[#F08A4B] before:font-bold before:text-lg">
                <strong>Hình học không gian:</strong> Các bài toán về khối đa diện và mặt cầu yêu cầu tư duy hình học tốt.
              </li>
              <li className="relative pl-6 before:content-['•'] before:absolute before:left-2 before:text-[#F08A4B] before:font-bold before:text-lg">
                <strong>Xác suất và Thống kê:</strong> Xuất hiện các bài toán ứng dụng thực tế về dữ liệu dân số và kinh tế.
              </li>
            </ul>

            {/* Khối cảnh báo: Lưu ý quan trọng */}
            <div className="bg-[#FFFBF2] border-l-4 border-[#D97706] p-4 rounded-r-xl flex gap-3 my-6">
              <div className="text-[#D97706] shrink-0 mt-0.5">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-[#92400E] text-sm sm:text-base flex items-center gap-1.5">
                  Lưu ý quan trọng
                </h4>
                <p className="text-xs sm:text-sm text-[#B45309] leading-relaxed">
                  Đáp án dưới đây mang tính chất tham khảo được thực hiện bởi đội ngũ giảng viên chuyên môn cao 
                  của Mathematiq. Kết quả chính thức sẽ được Bộ Giáo dục và Đào tạo công bố trong thời gian tới.
                </p>
              </div>
            </div>

            <h2 className="text-xl font-bold text-[#1A2B47] pt-2">Gợi ý giải chi tiết các câu hỏi khó</h2>
            <p>
              Đối với các câu hỏi từ 45 đến 50, học sinh cần vận dụng linh hoạt các kiến thức liên môn và 
              kỹ năng tính toán nhanh. Chúng tôi đã chuẩn bị bộ video hướng dẫn giải chi tiết cho từng mã đề thi.
            </p>

            {/* Khối hiển thị công thức toán học chuyên nghiệp */}
            <div className="bg-[#0B1524] rounded-2xl p-6 sm:p-8 flex flex-col justify-center items-center shadow-lg border border-slate-800 text-center my-6 relative overflow-hidden group">
              <div className="absolute top-3 left-4 text-[9px] font-bold text-slate-500 uppercase tracking-widest">
                Công thức vận dụng (Ví dụ):
              </div>
              <div className="py-6 flex items-center justify-center gap-2 select-all text-white font-serif text-lg sm:text-2xl tracking-wide">
                <span>f'(x) =</span>
                <div className="flex flex-col items-center mx-2">
                  <span className="text-xs sm:text-sm font-sans italic text-slate-400">lim</span>
                  <span className="text-[10px] sm:text-xs font-sans text-slate-500">h &rarr; 0</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="border-b border-white/60 px-3 pb-1 text-center">f(x + h) - f(x)</span>
                  <span className="pt-1 text-center">h</span>
                </div>
              </div>
            </div>

            <p className="italic text-slate-500 text-center pt-4">
              Chúc các sĩ tử có một kỳ thi thành công rực rỡ và đạt được kết quả mong đợi để bước tiếp vào cánh cửa đại học mơ ước.
            </p>
          </div>
        </article>

        {/* ── CỘT PHẢI: SIDEBAR TIN LIÊN QUAN & SUBSCRIBE (4/12) ── */}
        <aside className="lg:col-span-4 space-y-6">
          
          {/* Tin liên quan */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5 space-y-4 shadow-sm">
            <h3 className="text-base font-bold text-[#1A2B47] border-b border-slate-100 pb-3 flex items-center justify-between">
              <span>Tin liên quan</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#F08A4B]"></span>
            </h3>

            <div className="space-y-4">
              {relatedArticles.map((rel) => {
                return (
                  <Link 
                    key={rel.id} 
                    to={`/news/${rel.id}`}
                    className="flex gap-3 group hover:bg-slate-50/85 p-2 rounded-xl transition-all duration-300 border border-transparent hover:border-slate-100"
                  >
                    {/* Thumbnail */}
                    <div className="w-20 h-16 rounded-lg overflow-hidden bg-slate-100 shrink-0">
                      <img 
                        src={rel.image} 
                        alt={rel.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    {/* Brief Info */}
                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex">
                        <CategoryBadge label={rel.category} />
                      </div>
                      <h4 className="text-xs font-bold text-[#1A2B47] leading-snug line-clamp-2 group-hover:text-[#F08A4B] transition-colors mt-1">
                        {rel.title}
                      </h4>
                      <p className="text-[9px] text-slate-400">{rel.date}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Đăng ký bản tin */}
          <NewsletterBox variant="sidebar" />

        </aside>

      </div>
    </div>
  );
}
