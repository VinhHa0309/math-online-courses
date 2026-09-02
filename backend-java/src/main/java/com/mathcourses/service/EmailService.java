package com.mathcourses.service;

import com.mathcourses.dto.ContactRequest;
import com.mathcourses.model.Course;
import com.mathcourses.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.internet.MimeMessage;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private CourseRepository courseRepository;

    @Value("${spring.mail.username}")
    private String fromEmail;

    // ── Gửi email xác nhận tới HỌC SINH ──────────────────────────────────────
    public void sendConfirmationToStudent(ContactRequest req) {
        if (req.getEmail() == null || req.getEmail().isBlank()) return;
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setFrom(fromEmail, "SuongMath");
            helper.setTo(req.getEmail());
            helper.setSubject("✅ Xác nhận đăng ký tư vấn & Bảng giá khóa học " + (req.getGrade() != null ? req.getGrade() : "") + " – SuongMath");
            helper.setText(buildStudentEmailHtml(req), true);
            mailSender.send(message);
        } catch (Exception e) {
            System.err.println("⚠️ Không gửi được email cho học sinh: " + e.getMessage());
        }
    }

    // ── Gửi thông báo tới ADMIN ───────────────────────────────────────────────
    public void sendNotificationToAdmin(ContactRequest req) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setFrom(fromEmail, "SuongMath System");
            helper.setTo(fromEmail);
            helper.setSubject("📬 Đăng ký mới: " + req.getFullName() + " – " + (req.getGrade() != null ? req.getGrade() : "Khối lớp"));
            helper.setText(buildAdminEmailHtml(req), true);
            mailSender.send(message);
        } catch (Exception e) {
            System.err.println("⚠️ Không gửi được email cho admin: " + e.getMessage());
        }
    }

    // ── Hàm tra cứu giá tiền thực tế từ CSDL theo tên khóa học ──────────────
    private String lookupCoursePrice(String courseName) {
        if (courseName == null || courseName.isBlank()) return "Tư vấn miễn phí";
        try {
            List<Course> found = courseRepository.findByTitleContainingIgnoreCase(courseName.trim());
            if (found != null && !found.isEmpty() && found.get(0).getPrice() != null) {
                return String.format("%,d VNĐ", found.get(0).getPrice()).replace(',', '.');
            }
        } catch (Exception e) {
            System.err.println("⚠️ Không tra cứu được giá từ DB: " + e.getMessage());
        }
        return "Tư vấn báo giá trực tiếp";
    }

    // ── Trích xuất số lớp từ chuỗi (vd "Lớp 10" -> "10") ────────────────────
    private String extractGradeNumber(String gradeStr) {
        if (gradeStr == null) return "10";
        Matcher matcher = Pattern.compile("\\d+").matcher(gradeStr);
        if (matcher.find()) {
            return matcher.group();
        }
        return "10";
    }

    // ── Tạo bảng danh sách khóa học & học phí của Lớp học từ CSDL ───────────
    private String buildGradeCoursesTableHtml(String gradeRaw) {
        String gradeNum = extractGradeNumber(gradeRaw);
        List<CourseItemDto> courseList = new ArrayList<>();

        // Truy vấn 100% từ CSDL (Bảng `courses`)
        try {
            List<Course> dbCourses = courseRepository.findByGrade(gradeNum);
            if (dbCourses != null && !dbCourses.isEmpty()) {
                for (Course c : dbCourses) {
                    String formattedPrice = c.getPrice() != null ? String.format("%,d VNĐ", c.getPrice()).replace(',', '.') : "Liên hệ";
                    courseList.add(new CourseItemDto(c.getTitle(), c.getCategory() != null ? c.getCategory() : "Toán học", formattedPrice));
                }
            } else {
                // Nếu chưa tìm thấy theo grade, tìm theo từ khóa lớp trong tiêu đề (vd "10")
                List<Course> all = courseRepository.findAll();
                for (Course c : all) {
                    if (c.getTitle() != null && c.getTitle().contains(gradeNum)) {
                        String formattedPrice = c.getPrice() != null ? String.format("%,d VNĐ", c.getPrice()).replace(',', '.') : "Liên hệ";
                        courseList.add(new CourseItemDto(c.getTitle(), c.getCategory() != null ? c.getCategory() : "Toán học", formattedPrice));
                    }
                }
            }
        } catch (Exception e) {
            System.err.println("⚠️ Lỗi query danh sách lớp từ DB: " + e.getMessage());
        }

        if (courseList.isEmpty()) {
            return String.format("""
                <div style="background-color:#F8FAFC;border:1px dashed #CBD5E1;border-radius:16px;padding:16px;margin-top:20px;text-align:center;">
                  <p style="color:#64748B;font-size:13px;margin:0;">
                    📌 Hiện tại hệ thống đang cập nhật danh sách khóa học mới cho <strong>Lớp %s</strong> trong CSDL. Cô Sương sẽ gửi thông tin chi tiết cho em!
                  </p>
                </div>
                """, gradeNum);
        }

        StringBuilder rows = new StringBuilder();
        for (CourseItemDto item : courseList) {
            rows.append(String.format("""
                <tr style="border-bottom:1px solid #F1F5F9;">
                  <td style="padding:10px 14px;color:#1A2B47;font-size:13px;font-weight:700;">%s</td>
                  <td style="padding:10px 14px;color:#64748B;font-size:12px;">%s</td>
                  <td align="right" style="padding:10px 14px;color:#D97706;font-size:13px;font-weight:900;">%s</td>
                </tr>
                """, item.title, item.category, item.price));
        }

        return String.format("""
            <table width="100%%" cellpadding="0" cellspacing="0" style="border:1px solid #E2E8F0;border-radius:16px;overflow:hidden;background-color:#FFFFFF;margin-top:20px;">
              <tr>
                <td style="background:linear-gradient(90deg, #1A2B47, #253D63);padding:14px 20px;">
                  <span style="color:#FFFFFF;font-size:12px;font-weight:800;letter-spacing:1px;text-transform:uppercase;">📚 DANH SÁCH KHÓA HỌC DÀNH CHO LỚP %s (TỪ CSDL)</span>
                </td>
              </tr>
              <tr>
                <td style="padding:8px 12px;">
                  <table width="100%%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                    <thead>
                      <tr style="border-bottom:2px solid #E2E8F0;background-color:#F8FAFC;">
                        <th align="left" style="padding:8px 14px;color:#64748B;font-size:11px;text-transform:uppercase;">Tên Khóa Học</th>
                        <th align="left" style="padding:8px 14px;color:#64748B;font-size:11px;text-transform:uppercase;">Phân Loại</th>
                        <th align="right" style="padding:8px 14px;color:#64748B;font-size:11px;text-transform:uppercase;">Học Phí</th>
                      </tr>
                    </thead>
                    <tbody>
                      %s
                    </tbody>
                  </table>
                </td>
              </tr>
            </table>
            """, gradeNum, rows.toString());
    }

    // Class DTO nội bộ hỗ trợ render
    private static class CourseItemDto {
        String title;
        String category;
        String price;
        CourseItemDto(String title, String category, String price) {
            this.title = title;
            this.category = category;
            this.price = price;
        }
    }

    // ── Template email gửi tới HỌC SINH ──────────────────────────────────────
    private String buildStudentEmailHtml(ContactRequest req) {
        String course = req.getCourse() != null ? req.getCourse() : "Tư vấn tổng quan khóa học";
        String fullName = req.getFullName() != null ? req.getFullName() : "Học viên";
        String phone = req.getPhone() != null ? req.getPhone() : "(chưa cung cấp)";
        String email = req.getEmail() != null ? req.getEmail() : "(chưa cung cấp)";
        String grade = req.getGrade() != null ? req.getGrade() : "Lớp 10";
        String note = (req.getNote() != null && !req.getNote().isBlank()) ? req.getNote() : "Không có";
        String contactPhone = "0901 234 567";

        // Tra cứu giá từ CSDL
        String coursePrice = lookupCoursePrice(course);

        // Tạo bảng danh sách khóa học theo đúng Lớp học mà học sinh chọn
        String gradeCoursesTableHtml = buildGradeCoursesTableHtml(grade);

        return """
            <!DOCTYPE html>
            <html lang="vi">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Xác nhận đăng ký tư vấn khóa học – SuongMath</title>
            </head>
            <body style="margin:0;padding:0;background-color:#F8FAFC;font-family:'Segoe UI',Roboto,-apple-system,BlinkMacSystemFont,sans-serif;-webkit-font-smoothing:antialiased;">
              <table width="100%%" cellpadding="0" cellspacing="0" style="background-color:#F8FAFC;padding:40px 16px;">
                <tr>
                  <td align="center">
                    <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%%;background-color:#FFFFFF;border-radius:24px;overflow:hidden;box-shadow:0 20px 40px -15px rgba(15,23,42,0.08);border:1px solid #E2E8F0;">
                      
                      <!-- HERO HEADER -->
                      <tr>
                        <td style="background:linear-gradient(135deg, #0B132B 0%%, #1A2B47 60%%, #253D63 100%%);padding:44px 40px;text-align:center;">
                          <table width="100%%" cellpadding="0" cellspacing="0">
                            <tr>
                              <td align="center">
                                <div style="display:inline-block;background:rgba(240,138,75,0.15);border:1px solid rgba(240,138,75,0.3);padding:6px 18px;border-radius:50px;margin-bottom:16px;">
                                  <span style="color:#FFBA80;font-size:11px;font-weight:800;letter-spacing:2px;text-transform:uppercase;">✨ NỀN TẢNG HỌC TOÁN CAO CẤP</span>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td align="center">
                                <h1 style="color:#FFFFFF;font-size:32px;font-weight:900;margin:0 0 6px;letter-spacing:-0.5px;">SuongMath</h1>
                                <p style="color:#94A3B8;font-size:13px;margin:0;font-weight:500;">Xác Nhận Đăng Ký Tư Vấn Khóa Học</p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>

                      <!-- GREETING CARD -->
                      <tr>
                        <td style="padding:36px 40px 24px;">
                          <div style="background-color:#FFF8F4;border:1px solid #FAD7BC;border-radius:16px;padding:24px;">
                            <h2 style="color:#1A2B47;font-size:18px;font-weight:800;margin:0 0 10px;">Chào %s 👋,</h2>
                            <p style="color:#475569;font-size:14px;line-height:1.7;margin:0;">
                              Cảm ơn em đã gửi thông tin đăng ký tư vấn khóa học <strong style="color:#F08A4B;">%s</strong> (%s) tại SuongMath. Thầy/Cô đã tiếp nhận thông tin của em trên hệ thống!
                            </p>
                          </div>
                        </td>
                      </tr>

                      <!-- SECTION 1: BẢNG TÓM TẮT THÔNG TIN ĐĂNG KÝ -->
                      <tr>
                        <td style="padding:0 40px 24px;">
                          <table width="100%%" cellpadding="0" cellspacing="0" style="border:1px solid #E2E8F0;border-radius:16px;overflow:hidden;background-color:#FFFFFF;">
                            <tr>
                              <td style="background:linear-gradient(90deg, #1A2B47, #243B5E);padding:14px 20px;">
                                <span style="color:#FFFFFF;font-size:12px;font-weight:800;letter-spacing:1px;text-transform:uppercase;">📋 THÔNG TIN ĐĂNG KÝ CỦA EM</span>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding:20px;">
                                <table width="100%%" cellpadding="6" cellspacing="0">
                                  <tr>
                                    <td width="38%%" style="color:#64748B;font-size:13px;font-weight:600;">👤 Họ và tên:</td>
                                    <td width="62%%" style="color:#1A2B47;font-size:13px;font-weight:800;">%s</td>
                                  </tr>
                                  <tr>
                                    <td style="color:#64748B;font-size:13px;font-weight:600;">📞 Số điện thoại:</td>
                                    <td style="color:#1A2B47;font-size:13px;font-weight:800;">%s</td>
                                  </tr>
                                  <tr>
                                    <td style="color:#64748B;font-size:13px;font-weight:600;">📧 Email liên hệ:</td>
                                    <td style="color:#1A2B47;font-size:13px;font-weight:700;">%s</td>
                                  </tr>
                                  <tr>
                                    <td style="color:#64748B;font-size:13px;font-weight:600;">🎓 Trình độ / Cấp học:</td>
                                    <td style="color:#1A2B47;font-size:13px;font-weight:700;">%s</td>
                                  </tr>
                                  <tr>
                                    <td style="color:#64748B;font-size:13px;font-weight:600;">📚 Khóa học quan tâm:</td>
                                    <td style="color:#F08A4B;font-size:13px;font-weight:800;">%s</td>
                                  </tr>
                                  <tr>
                                    <td style="color:#64748B;font-size:13px;font-weight:600;">💰 Học phí khóa học:</td>
                                    <td style="color:#D97706;font-size:14px;font-weight:900;background-color:#FEF3C7;padding:3px 8px;border-radius:6px;display:inline-block;">%s</td>
                                  </tr>
                                  <tr>
                                    <td style="color:#64748B;font-size:13px;font-weight:600;">📝 Ghi chú:</td>
                                    <td style="color:#475569;font-size:13px;font-weight:500;">%s</td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>

                          <!-- BẢNG CÁC KHÓA HỌC DÀNH CHO LỚP HỌC NÀY TỪ CSDL -->
                          %s
                        </td>
                      </tr>

                      <!-- SECTION 2: BƯỚC TIẾP THEO -->
                      <tr>
                        <td style="padding:0 40px 24px;">
                          <table width="100%%" cellpadding="0" cellspacing="0" style="border:1px solid #E2E8F0;border-radius:16px;overflow:hidden;background-color:#FFFFFF;">
                            <tr>
                              <td style="background:linear-gradient(90deg, #0284C7, #0EA5E9);padding:14px 20px;">
                                <span style="color:#FFFFFF;font-size:12px;font-weight:800;letter-spacing:1px;text-transform:uppercase;">📞 QUY TRÌNH HỖ TRỢ TIẾP THEO</span>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding:20px;">
                                <p style="color:#475569;font-size:13px;line-height:1.7;margin:0 0 12px;">
                                  Trong vòng <strong>24 giờ tới</strong>, Cô Sương hoặc bộ phận tuyển sinh SuongMath sẽ trực tiếp liên hệ với em qua Số điện thoại / Zalo <strong style="color:#0284C7;">%s</strong> để:
                                </p>
                                <ul style="color:#475569;font-size:13px;line-height:1.7;margin:0;padding-left:20px;">
                                  <li>Tư vấn định hướng lộ trình học phù hợp nhất với học sinh %s.</li>
                                  <li>Gửi bộ tài liệu ôn tập và video học thử miễn phí.</li>
                                  <li>Hướng dẫn nhận ưu đãi học phí cho lớp học chính thức.</li>
                                </ul>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>

                      <!-- SECTION 3: ĐẶC QUYỀN HỌC TẠI SUONGMATH -->
                      <tr>
                        <td style="padding:0 40px 32px;">
                          <div style="background:#F8FAFC;border:1px dashed #CBD5E1;border-radius:16px;padding:20px;">
                            <h3 style="color:#1A2B47;font-size:14px;font-weight:800;margin:0 0 10px;">🌟 Lý do 15.000+ học sinh tin chọn SuongMath:</h3>
                            <p style="color:#64748B;font-size:12.5px;line-height:1.6;margin:0 0 6px;">
                              ✓ <strong>Đồ họa trực quan 3D:</strong> Giúp biến mọi công thức Toán học phức tạp trở nên sinh động, dễ nhớ.
                            </p>
                            <p style="color:#64748B;font-size:12.5px;line-height:1.6;margin:0 0 6px;">
                              ✓ <strong>Bộ đề thi độc quyền:</strong> Cập nhật liên tục cấu trúc đề ĐGNL, ĐGTD và Thi ĐH 2026.
                            </p>
                            <p style="color:#64748B;font-size:12.5px;line-height:1.6;margin:0;">
                              ✓ <strong>Hỗ trợ 24/7:</strong> Đội ngũ Giảng viên giải đáp mọi thắc mắc bài tập tức thì.
                            </p>
                          </div>
                        </td>
                      </tr>

                      <!-- FOOTER & SIGNATURE -->
                      <tr>
                        <td style="background-color:#F1F5F9;padding:32px 40px;text-align:center;border-top:1px solid #E2E8F0;">
                          <p style="color:#1A2B47;font-size:14px;font-weight:800;margin:0 0 4px;">Cô Sương – Giảng Viên Toán Học SuongMath</p>
                          <p style="color:#64748B;font-size:12px;margin:0 0 12px;">📞 Hotline / Zalo: <strong>%s</strong> | 📧 Email: <strong>%s</strong></p>
                          <p style="color:#94A3B8;font-size:11px;margin:0;">© 2026 SuongMath · Đà Nẵng, Việt Nam. All rights reserved.</p>
                        </td>
                      </tr>

                    </table>
                  </td>
                </tr>
              </table>
            </body>
            </html>
            """.formatted(
                // Greeting
                fullName, course, grade,
                // Section 1
                fullName, phone, email, grade, course, coursePrice, note,
                gradeCoursesTableHtml,
                // Section 2
                phone, grade,
                // Footer
                contactPhone, fromEmail
        );
    }

    // ── Template email gửi tới ADMIN ─────────────────────────────────────────
    private String buildAdminEmailHtml(ContactRequest req) {
        String coursePrice = lookupCoursePrice(req.getCourse());

        return """
            <!DOCTYPE html>
            <html lang="vi">
            <head><meta charset="UTF-8"></head>
            <body style="margin:0;padding:0;background:#0f172a;font-family:'Segoe UI',Arial,sans-serif;">
              <table width="100%%" cellpadding="0" cellspacing="0" style="background:#0f172a;padding:32px 0;">
                <tr><td align="center">
                  <table width="560" cellpadding="0" cellspacing="0"
                         style="background:#1e293b;border-radius:14px;overflow:hidden;border:1px solid rgba(255,255,255,0.08);">
                    <tr>
                      <td style="background:linear-gradient(135deg,#6366f1,#4f46e5);padding:22px 32px;">
                        <p style="color:white;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:2px;margin:0;">
                          📬 Học viên mới đăng ký – SuongMath
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:24px 32px;">
                        <table width="100%%" cellspacing="0">
                          <tr><td style="padding:7px 0;color:#94a3b8;font-size:13px;width:130px;">👤 Họ tên:</td>
                              <td style="padding:7px 0;color:#f1f5f9;font-size:13px;font-weight:700;">%s</td></tr>
                          <tr><td style="padding:7px 0;color:#94a3b8;font-size:13px;">📞 SĐT:</td>
                              <td style="padding:7px 0;color:#34d399;font-size:14px;font-weight:800;">%s</td></tr>
                          <tr><td style="padding:7px 0;color:#94a3b8;font-size:13px;">📧 Email:</td>
                              <td style="padding:7px 0;color:#f1f5f9;font-size:13px;">%s</td></tr>
                          <tr><td style="padding:7px 0;color:#94a3b8;font-size:13px;">🎓 Lớp:</td>
                              <td style="padding:7px 0;color:#f1f5f9;font-size:13px;">%s</td></tr>
                          <tr><td style="padding:7px 0;color:#94a3b8;font-size:13px;">📚 Khóa học:</td>
                              <td style="padding:7px 0;color:#fbbf24;font-size:13px;font-weight:700;">%s</td></tr>
                          <tr><td style="padding:7px 0;color:#94a3b8;font-size:13px;">💰 Học phí DB:</td>
                              <td style="padding:7px 0;color:#38bdf8;font-size:14px;font-weight:800;">%s</td></tr>
                          <tr><td style="padding:7px 0;color:#94a3b8;font-size:13px;vertical-align:top;">📝 Ghi chú:</td>
                              <td style="padding:7px 0;color:#f1f5f9;font-size:13px;">%s</td></tr>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:0 32px 24px;">
                        <a href="http://localhost:5173/admin"
                           style="background:#6366f1;color:white;text-decoration:none;font-weight:700;font-size:13px;padding:11px 26px;border-radius:8px;display:inline-block;">
                          Vào Admin Dashboard →
                        </a>
                      </td>
                    </tr>
                  </table>
                </td></tr>
              </table>
            </body>
            </html>
            """.formatted(
                req.getFullName(),
                req.getPhone(),
                req.getEmail()  != null ? req.getEmail()  : "(không có)",
                req.getGrade()  != null ? req.getGrade()  : "(không chọn)",
                req.getCourse() != null ? req.getCourse() : "(không chọn)",
                coursePrice,
                req.getNote()   != null && !req.getNote().isBlank() ? req.getNote() : "(trống)"
        );
    }
}
