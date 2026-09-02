import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, Eye, Calendar, Share2, Bookmark, ThumbsUp } from "lucide-react";
import { newsArticles } from "../../data/news";

export default function NewsDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const article = newsArticles.find((a) => a.id === Number(id)) || newsArticles[0];

  const relatedArticles = newsArticles.filter((a) => a.id !== article.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 font-dmsans">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Nút quay lại */}
        <button
          onClick={() => navigate("/news")}
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-[#F08A4B] bg-white border border-slate-200 px-4 py-2 rounded-xl shadow-sm hover:shadow transition-all"
        >
          <ArrowLeft size={16} /> Quay lại danh sách tin tức
        </button>

        {/* Tiêu đề & Thông tin bài viết */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="bg-orange-100 text-[#F08A4B] text-xs font-bold px-3 py-1 rounded-lg uppercase">
              {article.category}
            </span>
            <div className="flex items-center gap-4 text-slate-400 text-xs font-medium ml-auto">
              <span className="flex items-center gap-1">
                <Calendar size={14} /> {article.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={14} /> {article.readTime}
              </span>
              <span className="flex items-center gap-1">
                <Eye size={14} /> {article.views} lượt xem
              </span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-[#1A2B47] leading-tight tracking-tight">
            {article.title}
          </h1>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed italic border-l-4 border-[#F08A4B] pl-4 bg-orange-50/50 py-2 rounded-r-xl">
            {article.excerpt}
          </p>

          {/* Hình ảnh chính */}
          <div className="aspect-[16/9] rounded-2xl overflow-hidden shadow-md">
            <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
          </div>

          {/* Nội dung bài viết */}
          <div className="prose prose-slate max-w-none space-y-6 text-slate-700 leading-relaxed text-base pt-4 border-t border-slate-100">
            <p>
              Kỳ thi tốt nghiệp THPT năm 2026 đang đến gần với nhiều sự thay đổi quan trọng trong ma trận đề thi và cấu trúc câu hỏi phân hóa. Nhằm giúp các bạn học sinh nắm vững định hướng ôn luyện và đạt kết quả cao nhất, các chuyên gia tại <strong>Mathematiq</strong> đã tiến hành phân tích chi tiết và đưa ra lời giải chuyên sâu cho đề thi môn Toán.
            </p>

            <h2 className="text-xl font-bold text-[#1A2B47] mt-6 mb-3">1. Phân tích ma trận đề thi môn Toán 2026</h2>
            <p>
              Đề thi năm nay bám sát chương trình Giáo dục phổ thông mới, chú trọng kiểm tra năng lực tư duy logic, khả năng vận dụng toán học vào các bài toán thực tế thay vì chỉ thuần túy học thuộc công thức.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li><strong>Phần Trắc nghiệm 4 lựa chọn:</strong> Chiếm 60% tổng điểm, tập trung vào kiến thức nền tảng như Hàm số, Lượng giác, Hình học không gian Oxyz và Xác suất.</li>
              <li><strong>Phần Đúng/Sai:</strong> Đòi hỏi học sinh hiểu sâu bản chất lý thuyết, tránh chọn lụi.</li>
              <li><strong>Phần Trả lời ngắn:</strong> Các bài toán cực trị, ứng dụng tích phân và mô hình thực tế vận dụng cao.</li>
            </ul>

            <h2 className="text-xl font-bold text-[#1A2B47] mt-6 mb-3">2. Lời khuyên ôn tập cho học sinh lớp 12</h2>
            <p>
              Học sinh cần phân bổ thời gian hợp lý giữa việc ôn tập lý thuyết căn bản và giải đề thi thử. Hãy chú ý ghi chú lại các lỗi sai thường gặp (bẫy về tập xác định, đơn vị đo, dấu của biệt thức Δ) để không lặp lại trong kỳ thi chính thức.
            </p>

            {/* Thẻ Tags & Nút Tương tác */}
            <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold text-slate-400">Thẻ:</span>
                {article.tags?.map((tag) => (
                  <span key={tag} className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md font-medium">
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <button className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-[#F08A4B] bg-slate-100 hover:bg-orange-50 px-3 py-1.5 rounded-xl transition-all">
                  <ThumbsUp size={14} /> Thích
                </button>
                <button className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-[#F08A4B] bg-slate-100 hover:bg-orange-50 px-3 py-1.5 rounded-xl transition-all">
                  <Share2 size={14} /> Chia sẻ
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bài viết liên quan */}
        <div className="space-y-4">
          <h3 className="text-xl font-extrabold text-[#1A2B47]">Bài viết liên quan</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedArticles.map((rel) => (
              <Link
                key={rel.id}
                to={`/news/${rel.id}`}
                className="bg-white rounded-2xl border border-slate-100 p-4 hover:shadow-md transition-all group"
              >
                <div className="aspect-[16/10] rounded-xl overflow-hidden mb-3 bg-slate-100">
                  <img src={rel.image} alt={rel.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                </div>
                <span className="text-[10px] font-bold text-[#F08A4B] uppercase">{rel.category}</span>
                <h4 className="text-sm font-bold text-[#1A2B47] line-clamp-2 mt-1 group-hover:text-[#F08A4B] transition-colors">
                  {rel.title}
                </h4>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
