import { Link } from "react-router-dom";
import BrandLogo from "../common/BrandLogo";

const Footer = () => {
  return (
    <footer className="w-full border-t border-gray-100 bg-white mt-12 md:mt-16 lg:mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-8 md:py-10 lg:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-8 md:mb-10">
          {/* Thông tin công ty */}
          <div className="space-y-3">
            <Link to="/" className="inline-block">
              <BrandLogo size="xs" showText={true} />
            </Link>
            <p className="text-gray-500 text-xs md:text-sm leading-relaxed pt-1">
              Luyện thi Toán THPT (Lớp 10, 11, 12) & Ôn thi Tốt nghiệp THPT Quốc Gia cùng Cô Thu Sương.
            </p>
          </div>

          {/* Liên kết sản phẩm */}
          <div className="space-y-3">
            <h4 className="font-bold text-[#1A2B47] text-xs md:text-sm uppercase tracking-wider">
              Sản phẩm
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/courses" className="text-gray-500 text-xs md:text-sm hover:text-[#F08A4B] transition-colors">
                  Khoá học
                </Link>
              </li>
              <li>
                <Link to="/practice" className="text-gray-500 text-xs md:text-sm hover:text-[#F08A4B] transition-colors">
                  Luyện tập
                </Link>
              </li>
              <li>
                <Link to="/courses" className="text-gray-500 text-xs md:text-sm hover:text-[#F08A4B] transition-colors">
                  Gói cao cấp
                </Link>
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
                <Link to="/news" className="text-gray-500 text-xs md:text-sm hover:text-[#F08A4B] transition-colors">
                  Blog & Tin tức
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-gray-500 text-xs md:text-sm hover:text-[#F08A4B] transition-colors">
                  Tài liệu
                </Link>
              </li>
              <li>
                <Link to="/news" className="text-gray-500 text-xs md:text-sm hover:text-[#F08A4B] transition-colors">
                  Hỗ trợ
                </Link>
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
                <span className="text-gray-500 text-xs md:text-sm cursor-pointer hover:text-[#F08A4B] transition-colors">
                  Quyền riêng tư
                </span>
              </li>
              <li>
                <span className="text-gray-500 text-xs md:text-sm cursor-pointer hover:text-[#F08A4B] transition-colors">
                  Điều khoản
                </span>
              </li>
              <li>
                <span className="text-gray-500 text-xs md:text-sm cursor-pointer hover:text-[#F08A4B] transition-colors">
                  Liên hệ
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Đường phân cách dưới */}
        <div className="border-t border-gray-100 pt-6 md:pt-8">
          <p className="text-gray-400 text-xs md:text-sm text-center">
            © 2026 SuongMath. Tất cả quyền được bảo lưu.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
