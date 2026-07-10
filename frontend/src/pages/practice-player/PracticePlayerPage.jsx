import { useState } from "react";
import PlayerHeader from "../../components/practice-player/PlayerHeader";
import QuestionArea from "../../components/practice-player/QuestionArea";
import AnswerOptions from "../../components/practice-player/AnswerOptions";
import ActionBar from "../../components/practice-player/ActionBar";
import { mockQuestion } from "../../data/practiceQuestions";

export default function PracticePlayerPage() {
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  // Thao tác logic
  const handleReport = () => alert("Đã mở modal báo cáo.");
  const handleSkip = () => alert("Đã bỏ qua câu hỏi.");
  const handleSubmit = () => {
    if (selectedAnswer) {
      alert(`Bạn đã chọn đáp án ${selectedAnswer}.`);
    }
  };

  return (
    <div className="min-h-screen w-full bg-white font-sans selection:bg-orange-100 selection:text-orange-900">
      {/* Container Responsive: px-5 cho mobile, tăng dần cho desktop */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-8 md:py-12">
        {/* 1. Header */}
        <PlayerHeader
          current={mockQuestion.current}
          total={mockQuestion.total}
          combo={mockQuestion.combo}
        />

        {/* 2. Nội dung câu hỏi */}
        <QuestionArea
          topic={mockQuestion.topic}
          questionText={mockQuestion.questionText}
          subText={mockQuestion.subText}
          formula={mockQuestion.formula}
        />

        {/* 3. Các đáp án */}
        <AnswerOptions
          options={mockQuestion.options}
          selectedAnswer={selectedAnswer}
          onSelect={setSelectedAnswer}
        />

        {/* 4. Thanh thao tác dưới cùng */}
        <ActionBar
          canSkip={true} // Tùy chọn bỏ qua (mặc định cho câu hỏi thường)
          canSubmit={!!selectedAnswer} // Chỉ cho nộp bài khi đã chọn đáp án
          onReport={handleReport}
          onSkip={handleSkip}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
