// Cấu hình URL Backend: Ưu tiên lấy từ biến môi trường VITE_API_URL, nếu không có sẽ mặc định localhost:8085
export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8085";
