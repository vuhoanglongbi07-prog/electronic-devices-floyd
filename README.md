# ⚡ Electronic Devices Interactive Study Hub (Thomas L. Floyd - 10th Edition)

Trang web học tập tương tác phục vụ cuốn sách **Electronic Devices (Conventional Current Version, 10th Edition - 2018)** của tác giả **Thomas L. Floyd**.

## ✨ Tính năng nổi bật giúp học nhanh gấp 5 lần

- 📊 **Bảng theo dõi tiến độ 18 chương (`ProgressTracker.vue`):** Tự động lưu trạng thái hoàn thành *(Lý thuyết / Mô phỏng / Ôn tập)* ngay trên trình duyệt.
- 🔬 **Phòng thí nghiệm ảo Chuyển tiếp P-N (`PnJunctionSim.vue` - Chương 1):** Kéo thanh trượt điện áp phân cực $V_{\text{bias}}$ và nhiệt độ $T$ để quan sát trực tiếp vùng nghèo (*Depletion Region*) co giãn và rào thế $V_B$ của Silicon ($0.7\text{ V}$) vs. Germanium ($0.3\text{ V}$).
- 📈 **Mô phỏng 3 Mô hình Diode & Đường tải DC (`DiodeLoadLineSim.vue` - Chương 2):** Chuyển đổi tức thời giữa *Ideal Model*, *Practical Model*, và *Complete Model* kèm đồ thị $I\text{-}V$ thời gian thực.
- 🎛️ **Mô phỏng Phân cực BJT & 3 Vùng hoạt động (`BjtLoadLineSim.vue` - Chương 4 & 5):** Quan sát điểm làm việc tĩnh $Q(V_{CEQ}, I_{CQ})$ dịch chuyển giữa *Cut-off*, *Active*, và *Saturation*.
- 🧠 **Trắc nghiệm phản xạ chủ động (`ActiveRecallQuiz.vue`):** Hệ thống câu hỏi *Self-Test* cuối mỗi chương kèm giải thích chi tiết.

## 🚀 Chạy trên máy cá nhân (Local Development)

```bash
npm install
npm run docs:dev
```
Mở trình duyệt tại `http://localhost:5173`.
