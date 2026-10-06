import { Lock } from "lucide-react";

// Hàm tự động trích xuất YouTube Video ID và chuyển sang định dạng Embed chuẩn không logo rác
function getYouTubeEmbedUrl(url) {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11
    ? `https://www.youtube.com/embed/${match[2]}?autoplay=1&rel=0&modestbranding=1`
    : null;
}

export default function VideoArea({ activeLesson }) {
  const youtubeEmbedUrl = activeLesson?.videoUrl ? getYouTubeEmbedUrl(activeLesson.videoUrl) : null;

  return (
    <div className="bg-black rounded-2xl overflow-hidden shadow-lg border border-[#E2E8F0] relative aspect-video group">
      {activeLesson?.videoUrl ? (
        youtubeEmbedUrl ? (
          <iframe
            key={activeLesson.id}
            src={youtubeEmbedUrl}
            title={activeLesson.title || "Video bài học"}
            className="w-full h-full border-0 rounded-2xl"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <video
            key={activeLesson.id}
            src={activeLesson.videoUrl}
            controls
            className="w-full h-full object-cover"
            poster="https://images.unsplash.com/photo-1635070041078-e3fb4fe365c9?w=1920&q=80&auto=format&fit=crop"
          />
        )
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
