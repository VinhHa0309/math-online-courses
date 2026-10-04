import { useState, useRef, useEffect } from "react";
import {
  Calendar,
  GraduationCap,
  Upload,
  CheckCircle2,
  XCircle,
  AlertCircle,
  X
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";

export default function AdminDashboard() {
  const navigate = useNavigate();

  // State thông báo Toast đẹp mắt
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  const showNotification = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: "", type: "success" });
    }, 4000);
  };

  // State danh sách duyệt học viên
  const [approvals, setApprovals] = useState([]);
  const [loadingApprovals, setLoadingApprovals] = useState(true);

  // State danh sách khóa học
  const [courses, setCourses] = useState([]);

  // Tải danh sách khóa học & yêu cầu duyệt thực tế từ Backend Database
  const fetchApprovals = () => {
    setLoadingApprovals(true);
    fetch("http://localhost:8085/api/admin/enrollments?status=PENDING")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const mapped = data.map((item) => ({
            id: item.id,
            fullName: item.userName || "Học viên chưa đặt tên",
            initials: (item.userName || "HV").substring(0, 2).toUpperCase(),
            course: item.courseTitle || `Khóa học #${item.courseId}`,
            userEmail: item.userEmail,
            avatarBg: "bg-blue-100 text-blue-600",
          }));
          setApprovals(mapped);
        }
      })
      .catch((err) => console.log("Lỗi fetch danh sách duyệt:", err))
      .finally(() => setLoadingApprovals(false));
  };

  useEffect(() => {
    fetch("http://localhost:8085/api/courses")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCourses(data);
        }
      })
      .catch((err) => console.log("Lỗi fetch khóa học:", err));

    fetchApprovals();
  }, []);

  // State tạo khóa học mới
  const [newCourseName, setNewCourseName] = useState("");
  const [coursePrice, setCoursePrice] = useState("");
  const [courseGrade, setCourseGrade] = useState("12");
  const [courseCategory, setCourseCategory] = useState("Đại số & Giải tích");
  const [courseDescription, setCourseDescription] = useState("");
  const [courseImageUrl, setCourseImageUrl] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  // Cấu hình Cloudinary chuẩn theo tài khoản của bạn
  const CLOUD_NAME = "xea8vpcy";
  const UPLOAD_PRESET = "math_courses";

  // Xử lý khi người dùng chọn file ảnh
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setImagePreview(ev.target.result);
    reader.readAsDataURL(file);
  };

  // Hỗ trợ kéo thả ảnh vào vùng upload
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (!file || !file.type.startsWith("image/")) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setImagePreview(ev.target.result);
    reader.readAsDataURL(file);
  };

  // Xử lý Duyệt / Từ chối học viên thực tế qua API Backend
  const handleApprove = async (id, studentName, action) => {
    const endpoint = action === "approve" ? "approve" : "reject";
    try {
      const res = await fetch(`http://localhost:8085/api/admin/enrollments/${id}/${endpoint}`, {
        method: "PATCH",
      });
      if (!res.ok) throw new Error("Không thể xử lý yêu cầu!");

      setApprovals((prev) => prev.filter((app) => app.id !== id));
      showNotification(
        `${action === "approve" ? "Đã duyệt" : "Đã từ chối"} học viên ${studentName} thành công!`,
        action === "approve" ? "success" : "info"
      );
    } catch (err) {
      showNotification("Lỗi khi xử lý: " + err.message, "error");
    }
  };

  // Xử lý Upload Ảnh & Tạo khóa học thật vào Backend API
  const handleCreateCourse = async (e) => {
    e.preventDefault();
    if (!newCourseName.trim()) {
      showNotification("Vui lòng nhập tên khóa học!", "error");
      return;
    }

    setIsSubmitting(true);
    let uploadedImageUrl = courseImageUrl || imagePreview || "";

    try {
      // 1. Upload ảnh lên Cloudinary (qua Cloudinary API hoặc Backend API)
      if (imageFile) {
        const backendFormData = new FormData();
        backendFormData.append("file", imageFile);

        const uploadRes = await fetch("http://localhost:8085/api/admin/courses/upload-image", {
          method: "POST",
          body: backendFormData,
        }).catch(() => null);

        if (uploadRes && uploadRes.ok) {
          const uploadData = await uploadRes.json();
          if (uploadData.url) {
            uploadedImageUrl = uploadData.url;
          }
        }

        if (!uploadedImageUrl || uploadedImageUrl === imagePreview) {
          const formData = new FormData();
          formData.append("file", imageFile);
          formData.append("upload_preset", UPLOAD_PRESET);

          const cloudRes = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
            method: "POST",
            body: formData,
          }).catch(() => null);

          if (cloudRes && cloudRes.ok) {
            const cloudData = await cloudRes.json();
            uploadedImageUrl = cloudData.secure_url;
          }
        }
      }

      // 2. Gửi request tạo khóa học sang Backend Spring Boot
      const res = await fetch("http://localhost:8085/api/admin/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newCourseName,
          description: courseDescription || "Khóa học toán chuyên sâu cùng Cô Thu Sương",
          price: coursePrice ? parseInt(coursePrice) : 0,
          grade: courseGrade,
          category: courseCategory,
          imageUrl: uploadedImageUrl,
          instructorId: 1
        }),
      });

      if (!res.ok) {
        const errText = await res.text().catch(() => "");
        throw new Error(errText || "Không thể tạo khóa học trên server!");
      }

      const createdCourse = await res.json();
      setCourses(prev => [...prev, createdCourse]);

      setNewCourseName("");
      setCoursePrice("");
      setCourseDescription("");
      setCourseImageUrl("");
      setImageFile(null);
      setImagePreview(null);
      showNotification(`Tạo khóa học "${createdCourse.title}" thành công!`, "success");
    } catch (err) {
      showNotification("Lỗi khi tạo khóa học: " + err.message, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout activeTab="overview">
      {/* ── Toast Notification Nổi Đẹp Mắt ── */}
      {toast.show && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-3.5 bg-white/95 backdrop-blur-md px-5 py-4 rounded-2xl shadow-2xl border border-slate-100 animate-in slide-in-from-top-5 duration-300 max-w-md font-sans">
          {toast.type === "success" && (
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 shadow-inner">
              <CheckCircle2 size={22} />
            </div>
          )}
          {toast.type === "error" && (
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 shadow-inner">
              <XCircle size={22} />
            </div>
          )}
          {toast.type === "info" && (
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 shadow-inner">
              <AlertCircle size={22} />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              {toast.type === "success" ? "Thành công" : toast.type === "error" ? "Thông báo lỗi" : "Thông tin"}
            </p>
            <p className="text-xs font-bold text-[#1A2B47] leading-snug mt-0.5">
              {toast.message}
            </p>
          </div>
          <button
            onClick={() => setToast((prev) => ({ ...prev, show: false }))}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Welcome Header & Date Picker */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight leading-none">
            Welcome back, Admin
          </h1>
          <p className="text-slate-500 text-sm mt-2">
            Here is what's happening with Mathematiq today.
          </p>
        </div>

        {/* Date range picker mock */}
        <div className="flex items-center gap-2.5 bg-white border border-slate-200 rounded-xl px-4 py-2.5 shadow-sm text-sm font-semibold text-slate-700">
          <Calendar size={16} className="text-slate-400" />
          <span>Oct 1, 2023 - Oct 31, 2023</span>
        </div>
      </div>

      {/* Grid Layout of Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* LEFT COLUMN: Student Approval & Your Courses */}
        <div className="lg:col-span-7 space-y-8">

          {/* Widget: Duyệt học viên */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-black text-slate-800 tracking-tight">
              Duyệt học viên (Student Approval)
            </h2>
            <p className="text-slate-400 text-xs mt-1">
              Yêu cầu tham gia khóa học đang chờ xử lý
            </p>

            <div className="mt-6 space-y-4">
              {loadingApprovals ? (
                <p className="text-sm text-slate-400 text-center py-6">Đang tải danh sách chờ duyệt...</p>
              ) : approvals.length === 0 ? (
                <p className="text-sm text-slate-400 text-center py-6">Không có yêu cầu chờ duyệt nào.</p>
              ) : (
                approvals.map(app => (
                  <div key={app.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-slate-200 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full font-bold flex items-center justify-center shrink-0 ${app.avatarBg}`}>
                        {app.initials}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-800">{app.fullName}</div>
                        <div className="text-xs text-slate-500 mt-0.5">
                          Đăng ký: <span className="font-medium text-slate-700">{app.course}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleApprove(app.id, app.fullName, "approve")}
                        className="bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all"
                      >
                        Duyệt
                      </button>
                      <button
                        onClick={() => handleApprove(app.id, app.fullName, "reject")}
                        className="bg-white hover:bg-slate-100 active:scale-95 text-slate-700 border border-slate-200 text-xs font-bold px-4 py-2 rounded-xl transition-all"
                      >
                        Từ chối
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Widget: Khóa học của bạn */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-black text-slate-800 tracking-tight">
              Khóa học của bạn (Your Courses)
            </h2>
            <p className="text-slate-400 text-xs mt-1">
              Danh sách các khóa học bạn đang giảng dạy
            </p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {courses.map(course => (
                <div
                  key={course.id}
                  onClick={() => navigate(`/admin/courses/${course.id}`)}
                  className="p-5 border border-slate-200/80 bg-slate-50 rounded-2xl flex flex-col justify-between min-h-[140px] hover:border-blue-400 hover:bg-blue-50/20 cursor-pointer transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200/60 flex items-center justify-center text-slate-600 shrink-0 shadow-sm group-hover:border-blue-300 transition-colors">
                    {course.iconType === "cap" ? <GraduationCap size={20} /> : <span className="font-serif font-extrabold text-lg text-slate-600">Σ</span>}
                  </div>
                  <div className="mt-4">
                    <div className="text-sm font-black text-slate-800 line-clamp-1 group-hover:text-blue-600 transition-colors">{course.title}</div>
                    <div className="text-xs text-slate-500 mt-1 font-medium">{course.studentsCount || 45} Học viên • Xem chi tiết →</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Create New Course */}
        <div className="lg:col-span-5">

          {/* Widget: Tạo khóa học mới */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-black text-slate-800 tracking-tight">
              Tạo khóa học mới (Create New Course)
            </h2>

            <form onSubmit={handleCreateCourse} className="mt-6 space-y-5">
              {/* Tên khóa học */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  TÊN KHÓA HỌC *
                </label>
                <input
                  type="text"
                  placeholder="Ví dụ: Đại số 12 - Chuyên đề Hàm số"
                  value={newCourseName}
                  onChange={(e) => setNewCourseName(e.target.value)}
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none focus:bg-white focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10 transition-all"
                />
              </div>

              {/* Giá & Khối lớp */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    GIÁ KHÓA HỌC (VNĐ)
                  </label>
                  <input
                    type="number"
                    placeholder="Ví dụ: 499000"
                    value={coursePrice}
                    onChange={(e) => setCoursePrice(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none focus:bg-white focus:border-blue-500/50 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    LỚP
                  </label>
                  <select
                    value={courseGrade}
                    onChange={(e) => setCourseGrade(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 outline-none focus:bg-white transition-all cursor-pointer"
                  >
                    <option value="10">Lớp 10</option>
                    <option value="11">Lớp 11</option>
                    <option value="12">Lớp 12</option>
                    <option value="Luyện Thi">Luyện Thi ĐH</option>
                  </select>
                </div>
              </div>

              {/* Mô tả ngắn */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  MÔ TẢ KHÓA HỌC
                </label>
                <textarea
                  rows={2}
                  placeholder="Mô tả ngắn gọn về khóa học..."
                  value={courseDescription}
                  onChange={(e) => setCourseDescription(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none focus:bg-white transition-all resize-none"
                />
              </div>

              {/* Ảnh khóa học */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  ẢNH BÌA KHÓA HỌC
                </label>

                {/* Dán URL Cloudinary trực tiếp */}
                <input
                  type="url"
                  placeholder="Dán URL Cloudinary (https://res.cloudinary.com/...)"
                  value={courseImageUrl}
                  onChange={(e) => {
                    setCourseImageUrl(e.target.value);
                    if (e.target.value) setImagePreview(e.target.value);
                  }}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 outline-none focus:bg-white focus:border-blue-500/50 transition-all mb-2"
                />

                {/* Input file ẩn — được trigger bởi click vùng upload */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />

                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                  className="border-2 border-dashed border-slate-200 rounded-2xl overflow-hidden cursor-pointer transition-all group hover:border-blue-400 hover:bg-blue-50/30"
                >
                  {imagePreview ? (
                    // Hiển thị preview ảnh đã chọn
                    <div className="relative">
                      <img
                        src={imagePreview}
                        alt="Xem trước ảnh khóa học"
                        className="w-full h-44 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-white text-xs font-bold bg-black/60 px-3 py-1.5 rounded-lg">
                          Click để đổi ảnh
                        </span>
                      </div>
                      <div className="px-3 py-2 bg-slate-50 border-t border-slate-200 flex items-center gap-2">
                        <Upload className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="text-xs text-slate-500 truncate font-medium">{imageFile?.name || "Đã chọn ảnh"}</span>
                      </div>
                    </div>
                  ) : (
                    // Vùng upload mặc định khi chưa chọn ảnh
                    <div className="p-6 flex flex-col items-center justify-center">
                      <Upload className="w-7 h-7 text-slate-400 group-hover:text-blue-500 transition-colors" />
                      <span className="text-xs text-slate-500 mt-2 font-semibold group-hover:text-blue-600 transition-colors">
                        Click chọn ảnh hoặc kéo thả vào đây
                      </span>
                      <span className="text-[10px] text-slate-400 mt-1">PNG, JPG, WEBP tối đa 10MB</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#0B132B] hover:bg-[#16223F] active:scale-98 text-white font-bold py-3.5 rounded-xl transition-all shadow-md text-sm disabled:opacity-60"
              >
                {isSubmitting ? "Đang đẩy dữ liệu & Lưu khóa học..." : "Tạo khóa học ngay"}
              </button>
            </form>
          </div>

        </div>

      </div>
    </AdminLayout>
  );
}
