/* ── Shared Brand Logo Component ── */
/* Dùng chung cho Header, AuthLayout, và bất kỳ nơi nào cần logo Mathematiq */

/**
 * @param {"sm"|"md"|"lg"} size - Kích thước logo
 * @param {boolean} dark - true nếu nền tối (để dot border match màu nền)
 * @param {boolean} showText - Hiển thị tên thương hiệu bên cạnh logo hay không
 * @param {string} textColor - Màu chữ tên thương hiệu (CSS color)
 */
export default function BrandLogo({ size = "md", dark = false, showText = false, textColor = "#1A2B47" }) {
  const sizes = {
    xs:  { box: "w-7 h-7",   text: "text-xl",  dot: "w-3.5 h-3.5 -top-[3px] -right-[3px]", border: "border-[2px]", brandText: "text-xl" },
    sm:  { box: "w-10 h-10", text: "text-2xl",  dot: "w-4 h-4 -top-0.5 -right-0.5",         border: "border-[2px]", brandText: "text-lg" },
    md:  { box: "w-14 h-14", text: "text-3xl",  dot: "w-5 h-5 -top-1 -right-1",             border: "border-[2px]", brandText: "text-2xl" },
    lg:  { box: "w-20 h-20", text: "text-4xl",  dot: "w-5 h-5 -top-1 -right-1",             border: "border-[2px]", brandText: "text-3xl" },
  };
  const s = sizes[size] ?? sizes["md"];
  const dotBorder = dark ? "border-[#080F1A]" : "border-white";

  return (
    <div className="flex items-center gap-2.5">
      {/* Icon box */}
      <div className="relative inline-block flex-shrink-0">
        <div
          className={`${s.box} rounded-2xl flex items-center justify-center`}
          style={{
            background: "linear-gradient(135deg, #F08A4B, #e05a1a)",
            boxShadow: "0 8px 24px rgba(240,138,75,0.40)",
          }}
        >
          <span className={`${s.text} font-serif font-black text-white leading-none`}>Σ</span>
        </div>
        {/* Green verified dot */}
        <div
          className={`absolute ${s.dot} rounded-full bg-green-400 ${s.border} ${dotBorder} flex items-center justify-center`}
        >
          <span className="text-[7px] text-white font-bold leading-none">✓</span>
        </div>
      </div>

      {/* Brand name (optional) */}
      {showText && (
        <span
          className={`${s.brandText} font-black tracking-tight leading-none`}
          style={{ color: textColor, fontFamily: "'Playfair Display', serif" }}
        >
          Mathematiq
        </span>
      )}
    </div>
  );
}
