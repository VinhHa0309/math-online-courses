const CTASection = () => {
  return (
    <section className="py-8 md:py-12 lg:py-16 px-4 md:px-6 lg:px-8">
      <div className="bg-gradient-to-br from-[#051124] via-[#0a1f2e] to-[#051124] rounded-3xl md:rounded-4xl lg:rounded-[48px] p-8 md:p-12 lg:p-16 text-center relative overflow-hidden group">
        {/* Hiệu ứng glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-blue-500/15 blur-[80px] md:blur-[100px] lg:blur-[120px] rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute -top-20 -right-20 w-40 h-40 md:w-52 md:h-52 bg-cyan-400/5 blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Nội dung */}
        <div className="relative z-10">
          {/* Tiêu đề chính */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 lg:mb-8 leading-tight">
            Bắt đầu hành trình
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#FFA24E] to-cyan-400">
              Toán học của bạn ngay hôm nay
            </span>
          </h2>

          {/* Tiêu đề phụ */}
          <p className="text-gray-400 text-sm md:text-base lg:text-lg mb-8 md:mb-10 lg:mb-12 max-w-2xl mx-auto leading-relaxed px-2">
            Cùng hàng nghìn học sinh chinh phục các khái niệm phức tạp một cách chính xác và rõ ràng. Thay đổi trải nghiệm học tập của bạn ngay bây giờ.
          </p>

          {/* Các nút CTA */}
          <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 lg:gap-6 flex-wrap">
            {/* Nút chính */}
            <button className="bg-[#FFA24E] hover:bg-[#F08A4B] active:scale-95 text-[#051124] font-bold px-6 md:px-8 lg:px-10 py-3 md:py-4 lg:py-5 rounded-lg md:rounded-xl transition-all duration-300 shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 hover:-translate-y-1 group/btn w-full sm:w-auto">
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="w-5 h-5 md:w-6 md:h-6 group-hover/btn:translate-x-1 transition-transform"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 10 10.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                Đăng ký ngay
              </span>
            </button>

            {/* Nút phụ */}
            <button className="bg-[#1A2B47] hover:bg-[#243B5E] active:scale-95 text-white font-bold px-6 md:px-8 lg:px-10 py-3 md:py-4 lg:py-5 rounded-lg md:rounded-xl border border-white/20 hover:border-white/40 transition-all duration-300 hover:-translate-y-1 w-full sm:w-auto">
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="w-5 h-5 md:w-6 md:h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Học thử miễn phí
              </span>
            </button>
          </div>

          {/* Huy hiệu tin cậy */}
          <div className="mt-10 md:mt-14 lg:mt-16 pt-8 md:pt-10 border-t border-white/10">
            <p className="text-gray-500 text-xs md:text-sm font-medium mb-3 md:mb-4">
              ✓ Được tin dùng bởi 2.400+ học sinh trên toàn quốc
            </p>
            <div className="flex justify-center items-center gap-2 md:gap-3 opacity-70 hover:opacity-100 transition-opacity">
              <div className="flex -space-x-1">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-[#051124]"
                    style={{
                      opacity: 0.8 - i * 0.15,
                      background: `linear-gradient(135deg, hsl(${30 + i * 20}, 100%, 60%), hsl(${190 + i * 5}, 100%, 60%))`,
                    }}
                  />
                ))}
              </div>
              <span className="text-gray-400 text-xs md:text-sm">
                Và thêm nhiều bạn mới mỗi tuần
              </span>
            </div>
          </div>
        </div>

        {/* Viền trang trí */}
        <div className="absolute inset-0 rounded-3xl md:rounded-4xl lg:rounded-[48px] pointer-events-none border border-white/5 group-hover:border-white/10 transition-colors duration-500"></div>
      </div>
    </section>
  );
};

export default CTASection;
