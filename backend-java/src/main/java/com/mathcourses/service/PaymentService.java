package com.mathcourses.service;

import com.mathcourses.model.Course;
import com.mathcourses.model.Enrollment;
import com.mathcourses.model.Payment;
import com.mathcourses.model.User;
import com.mathcourses.repository.CourseRepository;
import com.mathcourses.repository.EnrollmentRepository;
import com.mathcourses.repository.PaymentRepository;
import com.mathcourses.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.time.LocalDateTime;
import java.util.*;

@Service
public class PaymentService {

    @Value("${momo.partner-code}")
    private String partnerCode;

    @Value("${momo.access-key}")
    private String accessKey;

    @Value("${momo.secret-key}")
    private String secretKey;

    @Value("${momo.endpoint}")
    private String momoEndpoint;

    @Value("${momo.redirect-url}")
    private String redirectUrl;

    @Value("${momo.ipn-url}")
    private String ipnUrl;

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private EnrollmentRepository enrollmentRepository;

    private final RestTemplate restTemplate = new RestTemplate();

    /**
     * Tạo link thanh toán MoMo và lưu đơn hàng vào database.
     *
     * @param amount    Số tiền cần thanh toán (VND)
     * @param orderInfo Mô tả đơn hàng
     * @param userId    ID người dùng (có thể null nếu chưa đăng nhập)
     * @param courseId  ID khóa học (có thể null)
     * @return Map chứa payUrl và orderId, hoặc thông báo lỗi
     */
    public Map<String, Object> createMomoPayment(int amount, String orderInfo, Long userId, Long courseId) {
        Map<String, Object> result = new HashMap<>();

        // 1. Tạo orderId và requestId duy nhất
        String orderId = partnerCode + "_" + System.currentTimeMillis();
        String requestId = UUID.randomUUID().toString();
        String requestType = "captureWallet";
        String extraData = "";

        // 2. Tạo chuỗi raw signature theo tài liệu MoMo v2
        String rawSignature = "accessKey=" + accessKey
                + "&amount=" + amount
                + "&extraData=" + extraData
                + "&ipnUrl=" + ipnUrl
                + "&orderId=" + orderId
                + "&orderInfo=" + orderInfo
                + "&partnerCode=" + partnerCode
                + "&redirectUrl=" + redirectUrl
                + "&requestId=" + requestId
                + "&requestType=" + requestType;

        // 3. Ký HMAC SHA256
        String signature = hmacSHA256(rawSignature, secretKey);

        // 4. Tạo request body gửi lên MoMo
        Map<String, Object> requestBody = new LinkedHashMap<>();
        requestBody.put("partnerCode", partnerCode);
        requestBody.put("accessKey", accessKey);
        requestBody.put("requestId", requestId);
        requestBody.put("amount", amount);
        requestBody.put("orderId", orderId);
        requestBody.put("orderInfo", orderInfo);
        requestBody.put("redirectUrl", redirectUrl);
        requestBody.put("ipnUrl", ipnUrl);
        requestBody.put("extraData", extraData);
        requestBody.put("requestType", requestType);
        requestBody.put("signature", signature);
        requestBody.put("lang", "vi");

        // 5. Gọi API MoMo
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

            ResponseEntity<Map> response = restTemplate.exchange(
                    momoEndpoint, HttpMethod.POST, entity, Map.class);

            Map<String, Object> momoResponse = response.getBody();

            if (momoResponse != null && momoResponse.get("payUrl") != null) {
                // 6. Lưu Payment vào database với trạng thái PENDING
                Payment payment = new Payment();
                payment.setOrderId(orderId);
                payment.setAmount(amount);
                payment.setMethod("MOMO");
                payment.setStatus("PENDING");

                if (userId != null) {
                    userRepository.findById(userId).ifPresent(payment::setUser);
                }
                if (courseId != null) {
                    courseRepository.findById(courseId).ifPresent(payment::setCourse);
                }

                paymentRepository.save(payment);

                result.put("payUrl", momoResponse.get("payUrl"));
                result.put("orderId", orderId);
                result.put("resultCode", momoResponse.get("resultCode"));
            } else {
                result.put("error", "Không nhận được payUrl từ MoMo");
                result.put("momoResponse", momoResponse);
            }
        } catch (Exception e) {
            result.put("error", "Lỗi kết nối MoMo: " + e.getMessage());
        }

        return result;
    }

    /**
     * Xử lý callback IPN từ MoMo sau khi người dùng thanh toán xong.
     * MoMo gửi POST request đến ipnUrl với thông tin giao dịch.
     */
    public Map<String, Object> handleMomoIPN(Map<String, Object> ipnData) {
        Map<String, Object> response = new HashMap<>();

        String orderId = (String) ipnData.get("orderId");
        Integer resultCode = (Integer) ipnData.get("resultCode");
        String transId = String.valueOf(ipnData.get("transId"));

        Optional<Payment> paymentOpt = paymentRepository.findByOrderId(orderId);

        if (paymentOpt.isEmpty()) {
            response.put("message", "Payment not found for orderId: " + orderId);
            return response;
        }

        Payment payment = paymentOpt.get();

        if (resultCode != null && resultCode == 0) {
            // Thanh toán thành công
            payment.setStatus("SUCCESS");
            payment.setMomoTransId(transId);
            payment.setPaidAt(LocalDateTime.now());
            paymentRepository.save(payment);

            // Tạo Enrollment PENDING — chờ Admin duyệt mới cho học
            if (payment.getUser() != null && payment.getCourse() != null) {
                createPendingEnrollment(payment.getUser(), payment.getCourse());
            }

            response.put("message", "Thanh toán thành công");
        } else {
            // Thanh toán thất bại
            payment.setStatus("FAILED");
            paymentRepository.save(payment);
            response.put("message", "Thanh toán thất bại, resultCode: " + resultCode);
        }

        response.put("orderId", orderId);
        response.put("status", payment.getStatus());
        return response;
    }

    /**
     * Tạo đăng ký khóa học với trạng thái PENDING sau khi thanh toán thành công.
     * Admin phải duyệt thủ công trước khi học viên được phép truy cập khóa học.
     */
    private void createPendingEnrollment(User user, Course course) {
        Optional<Enrollment> existing = enrollmentRepository.findByUserIdAndCourseId(
                user.getId(), course.getId());

        if (existing.isEmpty()) {
            // Tạo enrollment mới với trạng thái PENDING — chờ Admin duyệt
            Enrollment enrollment = new Enrollment();
            enrollment.setUser(user);
            enrollment.setCourse(course);
            enrollment.setStatus("PENDING");
            enrollmentRepository.save(enrollment);
        }
        // Nếu đã có enrollment rồi (dù PENDING hay APPROVED) thì không tạo thêm
    }

    /**
     * Lấy thông tin thanh toán theo orderId.
     */
    public Optional<Payment> getPaymentByOrderId(String orderId) {
        return paymentRepository.findByOrderId(orderId);
    }

    /**
     * Lấy danh sách thanh toán theo trạng thái.
     */
    public List<Payment> getPaymentsByStatus(String status) {
        return paymentRepository.findByStatus(status);
    }

    /**
     * Ký chuỗi bằng HMAC SHA256.
     */
    private String hmacSHA256(String data, String key) {
        try {
            Mac hmac = Mac.getInstance("HmacSHA256");
            SecretKeySpec secretKeySpec = new SecretKeySpec(key.getBytes(), "HmacSHA256");
            hmac.init(secretKeySpec);
            byte[] hash = hmac.doFinal(data.getBytes());

            StringBuilder hexString = new StringBuilder();
            for (byte b : hash) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1) hexString.append('0');
                hexString.append(hex);
            }
            return hexString.toString();
        } catch (Exception e) {
            throw new RuntimeException("Lỗi khi ký HMAC SHA256", e);
        }
    }
}
