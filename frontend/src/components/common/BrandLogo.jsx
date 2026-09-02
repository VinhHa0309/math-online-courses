/* ── Shared Brand Logo Component ── */
/* Dùng chung cho Header, AuthLayout, và bất kỳ nơi nào cần logo Mathematiq */

/**
 * @param {"sm"|"md"|"lg"} size - Kích thước logo
 * @param {boolean} dark - true nếu nền tối (để dot border match màu nền)
 * @param {boolean} showText - Hiển thị tên thương hiệu bên cạnh logo hay không
 * @param {string} textColor - Màu chữ tên thương hiệu (CSS color)
 */
export default function BrandLogo({ size = "md", dark = false, showText = false, textColor = "#1A2B47" }) {
  const iconHeights = {
    xs: "h-7",
    sm: "h-8",
    md: "h-10 sm:h-11",
    lg: "h-14",
  };

  const h = iconHeights[size] ?? iconHeights["md"];

  return (
    <div className="flex items-center gap-2.5 cursor-pointer shrink-0">
      {/* Icon [S] */}
      <img
        src="/suongmath-icon.svg"
        alt="SuongMath Icon"
        className={`${h} aspect-square object-contain rounded-xl drop-shadow-xs`}
      />

      {/* Brand Text */}
      {showText && (
        <span
          className="text-xl sm:text-2xl font-extrabold tracking-tight leading-none"
          style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
        >
          <span className="text-[#1A2B47]">Suong</span>
          <span className="text-[#185FA5]">Math</span>
        </span>
      )}
    </div>
  );
}
