import { useNavigate } from "react-router-dom"; // Thêm import này

export default function PracticeTopicCard({ name, desc, progress, icon }) {
  const navigate = useNavigate(); // Khởi tạo hook điều hướng

  const handlePracticeClick = () => {
    // Điều hướng đến trang làm bài.
    // Ở đây mình ví dụ đường dẫn là /practice/player.
    // Bạn hãy đảm bảo đường dẫn này khớp với 'path' trong App.jsx
    navigate("/practice/calculus-1");
  };

  return (
    <div className="bg-white p-6 rounded-[28px] border border-slate-100 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all group">
      <div className="space-y-5">
        {/* Icon */}
        <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-lg border border-slate-100 group-hover:bg-orange-50 transition-colors">
          {icon}
        </div>

        {/* Nội dung văn bản */}
        <div className="space-y-1.5">
          <h4 className="text-lg font-black text-[#1A2B47]">{name}</h4>
          <p className="text-slate-400 text-[11px] leading-relaxed line-clamp-2">
            {desc}
          </p>
        </div>

        {/* Thanh tiến trình (Progress) */}
        <div className="space-y-2">
          <div className="flex justify-between text-[9px] font-black uppercase tracking-wider">
            <span className="text-slate-300">Progress</span>
            <span className="text-[#1A2B47]">{progress}%</span>
          </div>
          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-orange-500 rounded-full transition-all duration-1000"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Nút bấm đã được thêm sự kiện onClick */}
      <button
        onClick={handlePracticeClick}
        className="w-full bg-[#1A2B47] text-white font-black py-3 mt-5 rounded-xl text-[10px] uppercase tracking-widest hover:bg-orange-500 transition-all active:scale-95 shadow-lg shadow-slate-100 hover:shadow-orange-200"
      >
        Practice Now
      </button>
    </div>
  );
}
