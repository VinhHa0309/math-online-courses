const Footer = () => {
  return (
    <footer className="w-full border-t border-gray-100 bg-white mt-12 md:mt-16 lg:mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-8 md:py-10 lg:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-8 md:mb-10">
          {/* Thông tin công ty */}
          <div className="space-y-3">
            <h4 className="font-bold text-[#1A2B47] text-sm md:text-base">
              Mathematiq
            </h4>
            <p className="text-gray-500 text-xs md:text-sm leading-relaxed">
              Làm chủ toán học qua trải nghiệm học tập chuyên sâu và sinh động.
            </p>
          </div>

          {/* Liên kết sản phẩm */}
          <div className="space-y-3">
            <h4 className="font-bold text-[#1A2B47] text-xs md:text-sm uppercase tracking-wider">
              Sản phẩm
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-500 text-xs md:text-sm hover:text-[#1A2B47] transition-colors">
                  Khoá học
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-500 text-xs md:text-sm hover:text-[#1A2B47] transition-colors">
                  Luyện tập
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-500 text-xs md:text-sm hover:text-[#1A2B47] transition-colors">
                  Gói cao cấp
                </a>
              </li>
            </ul>
          </div>

          {/* Tài nguyên */}
          <div className="space-y-3">
            <h4 className="font-bold text-[#1A2B47] text-xs md:text-sm uppercase tracking-wider">
              Tài nguyên
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-500 text-xs md:text-sm hover:text-[#1A2B47] transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-500 text-xs md:text-sm hover:text-[#1A2B47] transition-colors">
                  Tài liệu
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-500 text-xs md:text-sm hover:text-[#1A2B47] transition-colors">
                  Hỗ trợ
                </a>
              </li>
            </ul>
          </div>

          {/* Pháp lý */}
          <div className="space-y-3">
            <h4 className="font-bold text-[#1A2B47] text-xs md:text-sm uppercase tracking-wider">
              Pháp lý
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-500 text-xs md:text-sm hover:text-[#1A2B47] transition-colors">
                  Quyền riêng tư
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-500 text-xs md:text-sm hover:text-[#1A2B47] transition-colors">
                  Điều khoản
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-500 text-xs md:text-sm hover:text-[#1A2B47] transition-colors">
                  Liên hệ
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Đường phân cách dưới */}
        <div className="border-t border-gray-100 pt-6 md:pt-8">
          <p className="text-gray-400 text-xs md:text-sm text-center">
            © 2024 Mathematiq. Bản quyền thuộc về Mathematiq.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
