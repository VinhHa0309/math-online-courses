import { useState } from "react";
import { CheckCircle2, XCircle, ArrowRight, Lightbulb, RotateCcw } from "lucide-react";
import PlayerHeader from "../../components/practice-player/PlayerHeader";
import QuestionArea from "../../components/practice-player/QuestionArea";
import AnswerOptions from "../../components/practice-player/AnswerOptions";
import ActionBar from "../../components/practice-player/ActionBar";

const SAMPLE_QUESTIONS = [
  {
    id: 1,
    current: 1,
    total: 5,
    combo: 12,
    topic: "Giải tích & Tích phân",
    questionText: "Tính tích phân xác định sau:",
    subText: "Sử dụng công thức nguyên hàm cơ bản: ∫ xⁿ dx = xⁿ⁺¹ / (n+1) + C",
    formula: "∫₀¹ x² dx",
    correctAnswer: "B",
    explanation: "Lời giải chi tiết:\n• Ta có nguyên hàm F(x) = ∫ x² dx = x³ / 3.\n• Áp dụng công thức Newton-Leibniz: F(1) - F(0) = 1³/3 - 0³/3 = 1/3.\n• Đáp án chính xác là B.",
    options: [
      { id: "A", value: "1/2" },
      { id: "B", value: "1/3" },
      { id: "C", value: "1/4" },
      { id: "D", value: "1" },
    ],
  },
  {
    id: 2,
    current: 2,
    total: 5,
    combo: 13,
    topic: "Đại số & Lượng giác",
    questionText: "Tìm giá trị của biểu thức lượng giác:",
    subText: "Áp dụng công thức lượng giác cơ bản sin²(x) + cos²(x) = 1",
    formula: "P = sin²(15°) + cos²(15°)",
    correctAnswer: "A",
    explanation: "Lời giải chi tiết:\n• Với mọi góc x, ta luôn có sin²(x) + cos²(x) = 1.\n• Thay x = 15° ⇒ P = 1.\n• Đáp án chính xác là A.",
    options: [
      { id: "A", value: "1" },
      { id: "B", value: "1/2" },
      { id: "C", value: "√3/2" },
      { id: "D", value: "0" },
    ],
  },
];

export default function PracticePlayerPage() {
  const [questionIdx, setQuestionIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const currentQ = SAMPLE_QUESTIONS[questionIdx] || SAMPLE_QUESTIONS[0];

  // Thao tác logic
  const handleReport = () => alert("Đã ghi nhận báo cáo câu hỏi. Đội ngũ chuyên môn sẽ xem xét lại!");
  const handleSkip = () => {
    setSelectedAnswer(null);
    setIsSubmitted(false);
    setQuestionIdx((prev) => (prev + 1) % SAMPLE_QUESTIONS.length);
  };

  const handleSubmit = () => {
    if (!selectedAnswer) return;
    const correct = selectedAnswer === currentQ.correctAnswer;
    setIsCorrect(correct);
    setIsSubmitted(true);
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setIsSubmitted(false);
    setQuestionIdx((prev) => (prev + 1) % SAMPLE_QUESTIONS.length);
  };

  return (
    <div className="min-h-screen w-full bg-white font-dmsans selection:bg-orange-100 selection:text-orange-900 pb-20">
      <div className="max-w-4xl mx-auto px-5 sm:px-8 py-8 md:py-12">
        {/* 1. Header */}
        <PlayerHeader
          current={currentQ.current}
          total={currentQ.total}
          combo={currentQ.combo}
        />

        {/* 2. Nội dung câu hỏi */}
        <QuestionArea
          topic={currentQ.topic}
          questionText={currentQ.questionText}
          subText={currentQ.subText}
          formula={currentQ.formula}
        />

        {/* 3. Các đáp án */}
        <AnswerOptions
          options={currentQ.options}
          selectedAnswer={selectedAnswer}
          onSelect={(ans) => {
            if (!isSubmitted) setSelectedAnswer(ans);
          }}
        />

        {/* 4. Thanh thao tác dưới cùng */}
        <ActionBar
          canSkip={!isSubmitted}
          canSubmit={!!selectedAnswer && !isSubmitted}
          onReport={handleReport}
          onSkip={handleSkip}
          onSubmit={handleSubmit}
        />

        {/* 5. Khung hiển thị Kết Quả & Lời Giải Chi Tiết khi nộp bài */}
        {isSubmitted && (
          <div className="mt-8 bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 animate-in fade-in slide-in-from-bottom-4 duration-300 space-y-5">
            <div className="flex items-center gap-3">
              {isCorrect ? (
                <div className="flex items-center gap-2 text-emerald-600 font-extrabold text-lg">
                  <CheckCircle2 size={24} /> Chính xác! Xin chúc mừng 🎉
                </div>
              ) : (
                <div className="flex items-center gap-2 text-rose-600 font-extrabold text-lg">
                  <XCircle size={24} /> Chưa đúng! Đáp án đúng là {currentQ.correctAnswer}
                </div>
              )}
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-100 space-y-2">
              <div className="flex items-center gap-2 text-orange-600 font-bold text-xs uppercase tracking-wider">
                <Lightbulb size={16} /> Lời giải chi tiết
              </div>
              <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-line font-medium">
                {currentQ.explanation}
              </p>
            </div>

            <button
              onClick={handleNextQuestion}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#F08A4B] hover:bg-[#E07030] text-white font-bold px-8 py-3.5 rounded-xl text-sm transition-all shadow-md active:scale-95 ml-auto"
            >
              <span>Câu hỏi tiếp theo</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
