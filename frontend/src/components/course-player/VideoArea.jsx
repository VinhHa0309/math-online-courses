import { Lock } from "lucide-react";

export default function VideoArea({ activeLesson }) {
  return (
    <div className="bg-black rounded-2xl overflow-hidden shadow-lg border border-[#E2E8F0] relative aspect-video group">
      {activeLesson.videoUrl ? (
        <video
          key={activeLesson.id}
          src={activeLesson.videoUrl}
          controls
          className="w-full h-full object-cover"
          poster="https://placehold.co/1920x1080/0f172a/white?text=Mathematia+Learning+Video"
        />
      ) : (
        <div className="absolute inset-0 bg-[#0F172A] flex flex-col items-center justify-center text-center p-6">
          <Lock className="w-16 h-16 text-[#6B7A90] mb-4 animate-pulse" />
          <p className="text-white font-outfit font-bold text-lg">Nội dung này hiện đang bị khóa</p>
          <p className="text-[#6B7A90] text-sm mt-1">Hoàn thành bài học trước đó để mở khóa video bài học này</p>
        </div>
      )}
    </div>
  );
}
