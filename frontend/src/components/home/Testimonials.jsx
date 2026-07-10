import { Star } from "lucide-react";
import { reviews } from "../../data/testimonials";

const Testimonials = () => {

  return (
    <section className="py-8 md:py-12 lg:py-20 px-4 md:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-12 items-start max-w-7xl mx-auto">
        {/* Cột trái - Tiêu đề & Đánh giá */}
        <div className="w-full lg:w-1/3">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#1A2B47] mb-2 md:mb-3 lg:mb-4 leading-tight">
            Học viên{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F08A4B] to-orange-500">
              nói gì
            </span>
          </h2>
          <p className="text-gray-500 text-xs sm:text-sm md:text-base lg:text-lg mb-4 md:mb-6 lg:mb-8 leading-relaxed">
            Kết quả thực tế từ cộng đồng học viên trên toàn quốc.
          </p>

          {/* Đánh giá sao */}
          <div className="inline-flex items-center gap-2 md:gap-3 bg-white p-3 md:p-4 rounded-lg md:rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex text-[#F08A4B]">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} fill="currentColor" className="w-4 sm:w-5 h-4 sm:h-5" />
              ))}
            </div>
            <span className="font-bold text-[#1A2B47] text-xs md:text-sm lg:text-base whitespace-nowrap">
              4.9/5.0
            </span>
          </div>

          {/* Thông tin thêm */}
          <div className="mt-6 md:mt-8 lg:mt-12 space-y-2 md:space-y-3">
            <p className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest">
              ✓ Nền tảng uy tín
            </p>
            <p className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest">
              ✓ 2.400+ đánh giá
            </p>
            <p className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest">
              ✓ 98% giới thiệu bạn bè
            </p>
          </div>
        </div>

        {/* Cột phải - Thẻ đánh giá */}
        <div className="w-full lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 lg:gap-6">
          {reviews.map((rev, i) => (
            <div
              key={i}
              className="bg-white p-4 md:p-6 lg:p-8 rounded-2xl md:rounded-3xl lg:rounded-[32px] shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col group"
            >
              {/* Dấu ngoặc kép */}
              <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-gray-100 font-serif leading-none mb-2 md:mb-3 lg:mb-4 group-hover:text-[#F08A4B]/20 transition-colors duration-300">
                "
              </span>

              {/* Nội dung đánh giá */}
              <p className="text-gray-600 italic mb-4 md:mb-6 lg:mb-8 leading-relaxed text-xs sm:text-sm md:text-base flex-grow">
                {rev.text}
              </p>

              {/* Thông tin tác giả */}
              <div className="flex items-center gap-2 md:gap-3 lg:gap-4 mt-auto pt-4 md:pt-6 border-t border-gray-100">
                <div className={`w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 rounded-lg md:rounded-xl flex-shrink-0 ${rev.color}`}></div>
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-[#1A2B47] text-xs sm:text-sm md:text-base truncate group-hover:text-[#F08A4B] transition-colors duration-300">
                    {rev.author}
                  </p>
                  <p className="text-[8px] sm:text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-widest line-clamp-1">
                    {rev.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
