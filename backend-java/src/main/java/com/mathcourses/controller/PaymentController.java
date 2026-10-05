package com.mathcourses.controller;

import com.mathcourses.model.Payment;
import com.mathcourses.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/payment")
@CrossOrigin(origins = "*")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    /**
     * POST /api/payment/momo
     * Tạo link thanh toán MoMo.
     * 
     * Request body:
     * {
     *   "amount": 299000,
     *   "orderInfo": "Thanh toan khoa hoc Toan Cao Cap",
     *   "userId": 1,       // Tùy chọn
     *   "courseId": 5       // Tùy chọn
     * }
     */
    @PostMapping("/momo")
    public ResponseEntity<?> createMomoPayment(@RequestBody Map<String, Object> request) {
        // Lấy các tham số từ request body
        Integer amount = (Integer) request.get("amount");
        String orderInfo = (String) request.get("orderInfo");

        if (amount == null || amount <= 0) {
            return ResponseEntity.badRequest().body(Map.of("error", "Số tiền không hợp lệ"));
        }
        if (orderInfo == null || orderInfo.isBlank()) {
            orderInfo = "Thanh toan khoa hoc truc tuyen SuongMath";
        }

        // Lấy userId và courseId nếu frontend gửi lên
        Long userId = request.get("userId") != null
                ? Long.valueOf(request.get("userId").toString()) : null;
        Long courseId = request.get("courseId") != null
                ? Long.valueOf(request.get("courseId").toString()) : null;

        // Gọi service tạo thanh toán MoMo
        Map<String, Object> result = paymentService.createMomoPayment(amount, orderInfo, userId, courseId);

        if (result.containsKey("error")) {
            return ResponseEntity.internalServerError().body(result);
        }

        return ResponseEntity.ok(result);
    }

    /**
     * POST /api/payment/momo-ipn
     * Callback IPN từ MoMo gọi sau khi người dùng thanh toán.
     * URL này cần được public ra internet (ví dụ qua ngrok).
     */
    @PostMapping("/momo-ipn")
    public ResponseEntity<?> handleMomoIPN(@RequestBody Map<String, Object> ipnData) {
        Map<String, Object> result = paymentService.handleMomoIPN(ipnData);
        return ResponseEntity.ok(result);
    }

    /**
     * GET /api/payment/status?orderId=xxx
     * Kiểm tra trạng thái thanh toán theo orderId.
     */
    @GetMapping("/status")
    public ResponseEntity<?> checkPaymentStatus(@RequestParam String orderId) {
        Optional<Payment> paymentOpt = paymentService.getPaymentByOrderId(orderId);

        if (paymentOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Payment payment = paymentOpt.get();
        return ResponseEntity.ok(Map.of(
                "orderId", payment.getOrderId(),
                "amount", payment.getAmount(),
                "method", payment.getMethod(),
                "status", payment.getStatus(),
                "createdAt", payment.getCreatedAt().toString(),
                "paidAt", payment.getPaidAt() != null ? payment.getPaidAt().toString() : ""
        ));
    }
}
