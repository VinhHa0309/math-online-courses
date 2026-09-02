// Mock data cho trang học bài (LessonPage)

export const MOCK_COURSE = {
  id: 1,
  title: "Chuyên đề Hàm số bậc nhất và bậc hai nâng cao",
  category: "Đại số · Lớp 10",
  totalLessons: 24,
  completedLessons: 1,
  progress: 5, // %
};

export const MOCK_CHAPTERS = [
  {
    id: 1,
    title: "Chương 1: Đại số nâng cao",
    lessons: [
      {
        id: 0,
        title: "Bài 0: Giới thiệu khóa học",
        duration: "05:20",
        status: "done", // done | playing | locked
        videoId: "gJAbDSse5WM",
      },
      {
        id: 1,
        title: "Bài 1: Hàm số bậc nhất",
        duration: "15:30",
        status: "playing",
        videoId: "gJAbDSse5WM",
      },
      {
        id: 2,
        title: "Bài 2: Hàm số bậc hai và Parabol",
        duration: "22:15",
        status: "locked",
        videoId: "gJAbDSse5WM",
      },
      {
        id: 3,
        title: "Bài 3: Hệ phương trình bậc nhất",
        duration: "18:40",
        status: "locked",
        videoId: "gJAbDSse5WM",
      },
      {
        id: 4,
        title: "Bài 4: Bất phương trình",
        duration: "25:00",
        status: "locked",
        videoId: "RDCqICn26ADIs",
      },
    ],
  },
  {
    id: 2,
    title: "Chương 2: Hàm số và Đồ thị",
    lessons: [
      {
        id: 5,
        title: "Bài 5: Đồ thị hàm bậc nhất",
        duration: "20:10",
        status: "locked",
        videoId: "gJAbDSse5WM",
      },
      {
        id: 6,
        title: "Bài 6: Chiều biến thiên",
        duration: "17:45",
        status: "locked",
        videoId: "gJAbDSse5WM",
      },
      {
        id: 7,
        title: "Bài 7: Cực trị hàm số",
        duration: "28:00",
        status: "locked",
        videoId: "gJAbDSse5WM",
      },
    ],
  },
  {
    id: 3,
    title: "Chương 3: Ứng dụng thực tế",
    lessons: [
      {
        id: 8,
        title: "Bài 8: Bài toán tối ưu",
        duration: "30:20",
        status: "locked",
        videoId: "gJAbDSse5WM",
      },
      {
        id: 9,
        title: "Bài 9: Đề thi thử có lời giải",
        duration: "45:00",
        status: "locked",
        videoId: "gJAbDSse5WM",
      },
    ],
  },
];

export const MOCK_LESSON = {
  id: 1,
  chapterTitle: "Chương 1: Đại số nâng cao",
  title: "Bài 1: Hàm số bậc nhất",
  videoId: "gJAbDSse5WM", // YouTube video ID
  overview: `Trong bài học đầu tiên của chương Đại số nâng cao, chúng ta sẽ ôn tập và mở rộng kiến thức về hàm số bậc nhất — một trong những nền tảng quan trọng nhất của chương trình Toán lớp 10.

Qua bài học này, bạn sẽ nắm được:
• Định nghĩa và các tính chất cơ bản của hàm số bậc nhất y = ax + b
• Cách vẽ đồ thị, xác định sự biến thiên và chiều tăng/giảm
• Mối quan hệ giữa hệ số a, b và vị trí đồ thị trên mặt phẳng tọa độ
• Ứng dụng hàm số bậc nhất vào các bài toán thực tế`,
  documents: [
    { id: 1, title: "Tóm tắt lý thuyết Bài 1", type: "PDF", size: "1.2 MB" },
    { id: 2, title: "Bài tập tự luyện có lời giải", type: "PDF", size: "3.4 MB" },
    { id: 3, title: "Slide bài giảng", type: "PPTX", size: "8.1 MB" },
  ],
};
