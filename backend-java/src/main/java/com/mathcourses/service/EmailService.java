package com.mathcourses.service;

import com.mathcourses.dto.ContactRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

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
            helper.setSubject("✅ Xác nhận đăng ký khóa học – SuongMath");
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
            helper.setSubject("📬 Đăng ký mới: " + req.getFullName() + " – " + (req.getCourse() != null ? req.getCourse() : "Chưa chọn"));
            helper.setText(buildAdminEmailHtml(req), true);
            mailSender.send(message);
        } catch (Exception e) {
            System.err.println("⚠️ Không gửi được email cho admin: " + e.getMessage());
        }
    }

    // ── Template email gửi tới HỌC SINH ──────────────────────────────────────
    private String buildStudentEmailHtml(ContactRequest req) {
        String course = req.getCourse() != null ? req.getCourse() : "Chưa xác định";

        // ════════════════════════════════════════════════════════════════
        // ✏️  CHỈNH SỬA THÔNG TIN KHÓA HỌC TẠI ĐÂY
        // ════════════════════════════════════════════════════════════════
        String teacherName   = "Cô Sương";
        String startDate     = "20/08/2026";
        String schedule      = "Thứ 2 - Thứ 4 - Thứ 6 | 19:30 – 21:00";
        String format        = "Online qua Google Meet";
        String meetLink      = "https://meet.google.com/your-link-here";
        String zaloGroupLink = "https://zalo.me/g/your-zalo-group";
        String materialLink  = "https://drive.google.com/your-folder";
        String feeAmount     = "1.500.000 VNĐ";
        String bankAccount   = "1234567890 – Ngân hàng Techcombank";
        String accountHolder = "NGUYEN THI SUONG";
        String feeDeadline   = "17/08/2026";
        String contactPhone  = "0901 234 567";
        // ════════════════════════════════════════════════════════════════

        return """
            <!DOCTYPE html>
            <html lang="vi">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width,initial-scale=1.0">
            </head>
            <body style="margin:0;padding:0;background:#f1f5f9;font-family:'Segoe UI',Arial,sans-serif;">
              <table width="100%%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:36px 0;">
                <tr><td align="center">
                  <table width="620" cellpadding="0" cellspacing="0"
                         style="background:#ffffff;border-radius:18px;overflow:hidden;box-shadow:0 4px 32px rgba(0,0,0,0.09);">

                    <!-- HEADER -->
                    <tr>
                      <td style="background:linear-gradient(135deg,#051124 0%%,#0d2240 100%%);padding:36px 48px;text-align:center;">
                        <h1 style="color:#FFA24E;font-size:30px;font-weight:900;margin:0 0 4px;letter-spacing:-0.5px;">SuongMath</h1>
                        <p style="color:rgba(255,255,255,0.45);font-size:11px;margin:0;text-transform:uppercase;letter-spacing:3px;">Nền tảng học Toán Online</p>
                      </td>
                    </tr>

                    <!-- LỜI CHÀO -->
                    <tr>
                      <td style="padding:36px 48px 24px;">
                        <p style="color:#0f172a;font-size:17px;font-weight:700;margin:0 0 12px;">Chào %s, 👋</p>
                        <p style="color:#475569;font-size:14px;line-height:1.9;margin:0;">
                          Cảm ơn em đã đăng ký tham gia khóa học <strong style="color:#0f172a;">%s</strong>.
                          Thầy/Cô rất vui được đồng hành cùng em trong khóa học sắp tới.<br><br>
                          Thầy/Cô xin gửi đến em thông tin chi tiết về khóa học như sau:
                        </p>
                      </td>
                    </tr>

                    <!-- PHẦN 1: THÔNG TIN KHÓA HỌC -->
                    <tr>
                      <td style="padding:0 48px 20px;">
                        <table width="100%%" cellspacing="0" style="border-radius:14px;overflow:hidden;border:1px solid #e2e8f0;">
                          <tr><td colspan="2" style="background:linear-gradient(90deg,#6366f1,#4f46e5);padding:11px 22px;">
                            <span style="color:white;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;">1. Thông tin khóa học</span>
                          </td></tr>
                          <tr><td style="padding:10px 22px 4px;color:#64748b;font-size:13px;width:185px;">📚 Tên khóa học:</td>
                              <td style="padding:10px 22px 4px;color:#0f172a;font-size:13px;font-weight:700;">%s</td></tr>
                          <tr><td style="padding:4px 22px;color:#64748b;font-size:13px;">👩‍🏫 Giảng viên:</td>
                              <td style="padding:4px 22px;color:#0f172a;font-size:13px;font-weight:700;">%s</td></tr>
                          <tr><td style="padding:4px 22px;color:#64748b;font-size:13px;">📅 Khai giảng:</td>
                              <td style="padding:4px 22px;color:#0f172a;font-size:13px;font-weight:700;">%s</td></tr>
                          <tr><td style="padding:4px 22px;color:#64748b;font-size:13px;">🕐 Lịch học:</td>
                              <td style="padding:4px 22px;color:#0f172a;font-size:13px;font-weight:700;">%s</td></tr>
                          <tr><td style="padding:4px 22px 12px;color:#64748b;font-size:13px;">💻 Hình thức:</td>
                              <td style="padding:4px 22px 12px;color:#0f172a;font-size:13px;font-weight:700;">%s</td></tr>
                        </table>
                      </td>
                    </tr>

                    <!-- PHẦN 2: HƯỚNG DẪN THAM GIA -->
                    <tr>
                      <td style="padding:0 48px 20px;">
                        <table width="100%%" cellspacing="0" style="border-radius:14px;overflow:hidden;border:1px solid #e2e8f0;">
                          <tr><td colspan="2" style="background:linear-gradient(90deg,#0ea5e9,#0284c7);padding:11px 22px;">
                            <span style="color:white;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;">2. Hướng dẫn chuẩn bị &amp; Tham gia lớp học</span>
                          </td></tr>
                          <tr><td style="padding:10px 22px 4px;color:#64748b;font-size:13px;width:185px;">🎥 Link tham gia:</td>
                              <td style="padding:10px 22px 4px;font-size:13px;"><a href="%s" style="color:#6366f1;font-weight:700;text-decoration:none;">%s</a></td></tr>
                          <tr><td style="padding:4px 22px;color:#64748b;font-size:13px;">💬 Nhóm Zalo:</td>
                              <td style="padding:4px 22px;font-size:13px;"><a href="%s" style="color:#6366f1;font-weight:700;text-decoration:none;">Bấm để tham gia nhóm →</a></td></tr>
                          <tr><td style="padding:4px 22px 12px;color:#64748b;font-size:13px;">📂 Tài liệu:</td>
                              <td style="padding:4px 22px 12px;font-size:13px;"><a href="%s" style="color:#6366f1;font-weight:700;text-decoration:none;">Truy cập tại đây →</a></td></tr>
                        </table>
                      </td>
                    </tr>

                    <!-- PHẦN 3: HỌC PHÍ -->
                    <tr>
                      <td style="padding:0 48px 28px;">
                        <table width="100%%" cellspacing="0" style="border-radius:14px;overflow:hidden;border:1px solid #fde68a;background:#fffbeb;">
                          <tr><td colspan="2" style="background:linear-gradient(90deg,#f59e0b,#d97706);padding:11px 22px;">
                            <span style="color:white;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;">3. Hướng dẫn hoàn tất học phí</span>
                          </td></tr>
                          <tr><td style="padding:10px 22px 4px;color:#78350f;font-size:13px;width:185px;">💰 Số tiền:</td>
                              <td style="padding:10px 22px 4px;color:#b45309;font-size:14px;font-weight:800;">%s</td></tr>
                          <tr><td style="padding:4px 22px;color:#78350f;font-size:13px;">🏦 Số tài khoản:</td>
                              <td style="padding:4px 22px;color:#92400e;font-size:13px;font-weight:700;">%s</td></tr>
                          <tr><td style="padding:4px 22px;color:#78350f;font-size:13px;">👤 Chủ tài khoản:</td>
                              <td style="padding:4px 22px;color:#92400e;font-size:13px;font-weight:700;">%s</td></tr>
                          <tr><td style="padding:4px 22px;color:#78350f;font-size:13px;vertical-align:top;">📝 Nội dung CK:</td>
                              <td style="padding:4px 22px;color:#92400e;font-size:13px;font-weight:700;">%s – %s – %s</td></tr>
                          <tr><td style="padding:4px 22px 12px;color:#78350f;font-size:13px;">⏰ Hạn hoàn tất:</td>
                              <td style="padding:4px 22px 12px;color:#dc2626;font-size:13px;font-weight:800;">Trước ngày %s</td></tr>
                        </table>
                      </td>
                    </tr>

                    <!-- LIÊN HỆ -->
                    <tr>
                      <td style="padding:0 48px 28px;">
                        <p style="color:#475569;font-size:14px;line-height:1.8;margin:0 0 14px;">
                          Nếu em có bất kỳ thắc mắc nào hoặc cần hỗ trợ thêm, em vui lòng phản hồi (reply) lại email này hoặc liên hệ qua:
                        </p>
                        <table cellspacing="0">
                          <tr><td style="padding:4px 16px 4px 0;color:#64748b;font-size:13px;">📞 Điện thoại / Zalo:</td>
                              <td style="padding:4px 0;color:#0f172a;font-size:13px;font-weight:700;">%s</td></tr>
                          <tr><td style="padding:4px 16px 4px 0;color:#64748b;font-size:13px;">📧 Email:</td>
                              <td style="padding:4px 0;font-size:13px;"><a href="mailto:%s" style="color:#6366f1;font-weight:700;text-decoration:none;">%s</a></td></tr>
                        </table>
                      </td>
                    </tr>

                    <!-- LỜI CHÚC & CHỮ KÝ -->
                    <tr>
                      <td style="padding:0 48px 36px;">
                        <p style="color:#475569;font-size:14px;line-height:1.8;margin:0 0 20px;">
                          Chúc em có một khóa học hiệu quả và đạt nhiều kết quả tốt! 🌟
                        </p>
                        <p style="color:#0f172a;font-size:14px;line-height:1.8;margin:0;">
                          <strong>Trân trọng,</strong><br>
                          <span style="color:#6366f1;font-weight:800;font-size:16px;">%s</span><br>
                          <span style="color:#64748b;font-size:13px;">Giảng viên – SuongMath</span><br>
                          <span style="color:#64748b;font-size:13px;">📞 %s</span>
                        </p>
                      </td>
                    </tr>

                    <!-- FOOTER -->
                    <tr>
                      <td style="background:#f8fafc;border-top:1px solid #e2e8f0;padding:18px 48px;text-align:center;">
                        <p style="color:#cbd5e1;font-size:12px;margin:0;">© 2026 SuongMath · Đà Nẵng, Việt Nam</p>
                      </td>
                    </tr>

                  </table>
                </td></tr>
              </table>
            </body>
            </html>
            """.formatted(
                // Lời chào
                req.getFullName(), course,
                // Phần 1
                course, teacherName, startDate, schedule, format,
                // Phần 2
                meetLink, meetLink, zaloGroupLink, materialLink,
                // Phần 3
                feeAmount, bankAccount, accountHolder,
                req.getFullName(), req.getPhone(), course,
                feeDeadline,
                // Liên hệ
                contactPhone, fromEmail, fromEmail,
                // Chữ ký
                teacherName, contactPhone
        );
    }

    // ── Template email gửi tới ADMIN ─────────────────────────────────────────
    private String buildAdminEmailHtml(ContactRequest req) {
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
                req.getNote()   != null && !req.getNote().isBlank() ? req.getNote() : "(trống)"
        );
    }
}
