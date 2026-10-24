---
title: "Lộ Trình Chương 6–18: Khuếch Đại AC, FET/MOSFET & Op-Amp"
---

# 🗺️ Lộ Trình & Kiến Thức Cốt Lõi Chương 6 – 18 (Sách Thomas L. Floyd)

Trang này tóm tắt xương sống của các chương nâng cao trong sách **Electronic Devices (10th Edition)**. Bất cứ khi nào bạn học đến chương nào dưới đây, chỉ cần nhắn cho mình: *"Biên soạn chi tiết Chương X kèm mô phỏng tương tác"*, mình sẽ tạo ngay trang bài học đầy đủ + phòng thí nghiệm ảo cho chương đó!

---

## Phần II (Tiếp): Khuếch Đại Xoay Chiều & Công Suất BJT (Chương 6 – 7)

### Chương 6: BJT Amplifiers (*Khuếch đại tín hiệu nhỏ BJT*)
- **Điện trở động phát xoay chiều ($r'_e$):** Là chìa khóa của mọi công thức AC trong sách Floyd:
  $$\boxed{r'_e \approx \frac{25\text{ mV}}{I_E}}$$
- **Ba cấu hình khuếch đại BJT kinh điển:**
  1. **Common-Emitter (CE - Phát chung):** Đảo pha $180^\circ$, độ lợi áp cao $A_v = \frac{R_c}{r'_e}$ (nếu có tụ bypass $C_E$) hoặc $A_v = \frac{R_c}{r'_e + R_E}$ (không có tụ bypass), độ lợi dòng cao.
  2. **Common-Collector (CC / Emitter-Follower - Lặp cực phát):** Đồng pha ($0^\circ$), độ lợi áp $A_v \approx 1$, **trở kháng vào cực lớn** và **trở kháng ra cực nhỏ** $\rightarrow$ dùng làm tầng đệm phối hợp trở kháng (*Buffer*).
  3. **Common-Base (CB - Gốc chung):** Đồng pha ($0^\circ$), trở vào rất nhỏ ($R_{in} \approx r'_e$), độ lợi dòng $A_i \approx 1$, hoạt động tốt ở tần số cao.

### Chương 7: BJT Power Amplifiers (*Khuếch đại công suất*)
- **Class A:** BJT dẫn suốt $360^\circ$ của chu kỳ tín hiệu. Điểm $Q$ ở giữa đường tải AC. Độ tuyến tính cao nhất nhưng hiệu suất cực đại thấp ($\eta_{\max} = 25\%$ với ghép tụ, $50\%$ với ghép biến áp).
- **Class B & Class AB (Push-Pull):** Hai BJT bổ phụ (NPN + PNP) thay phiên dẫn mỗi nửa chu kỳ ($180^\circ$). Hiệu suất lý thuyết đạt $\eta_{\max} \approx 78.5\%$. Dùng phân cực Diode (Class AB) để triệt tiêu **méo giao thoa (Crossover distortion)**.
- **Class C:** Chỉ dẫn trong một góc rất nhỏ ($< 90^\circ$), luôn đi kèm khung cộng hưởng LC ở tải, hiệu suất $> 90\%$, chuyên dùng cho phát sóng cao tần RF.

---

## Phần III: FET, MOSFET & Đáp Ứng Tần Số (Chương 8 – 10)

### Chương 8 & 9: Field-Effect Transistors (FETs) & Khuếch Đại FET
- **Khác biệt cốt lõi BJT vs. FET:**
  - **BJT:** Linh kiện lưỡng cực, **điều khiển bằng DÒNG ĐIỆN ($I_B$)**, trở kháng vào thấp.
  - **FET (JFET, D-MOSFET, E-MOSFET):** Linh kiện đơn cực (*Unipolar*), **điều khiển bằng ĐIỆN ÁP ($V_{GS}$)**, dòng cực cổng $I_G \approx 0\text{ A}$ nên **trở kháng vào cực kỳ lớn ($> 10^9\ \Omega$)**.
- **Phương trình truyền đạt bình phương (Shockley Equation):**
  - Với **JFET và D-MOSFET**:
    $$I_D = I_{DSS} \left(1 - \frac{V_{GS}}{V_{GS(\text{off})}}\right)^2$$
  - Với **E-MOSFET (Enhancement MOSFET - Kênh cảm ứng)**: Chỉ bắt đầu dẫn khi $|V_{GS}| > |V_{GS(\text{th})}|$:
    $$I_D = K \left(V_{GS} - V_{GS(\text{th})}\right)^2$$
- **Hỗ dẫn xoay chiều ($g_m$ - Transconductance):**
  $$g_m = \frac{\Delta I_D}{\Delta V_{GS}} = g_{m0} \left(1 - \frac{V_{GS}}{V_{GS(\text{off})}}\right), \qquad A_v = g_m R_d$$

### Chương 10: Đáp Ứng Tần Số (*Amplifier Frequency Response*)
- Tần số cắt dưới $f_{cl}$ (do các tụ liên lạc & tụ bypass) và tần số cắt trên $f_{cu}$ (do các tụ ký sinh liên cực của Transistor và **Định lý Miller**: $C_{in(\text{Miller})} = C_{bc}(A_v + 1)$).
- Tại tần số cắt (điểm $-3\text{ dB}$): Độ lợi áp giảm còn $0.707 A_{v(\text{mid})}$ và công suất ra giảm còn một nửa ($50\%$).

---

## Phần IV: Thyristor, Op-Amp, Lọc Tích Cực & Mạch Hệ Thống (Chương 11 – 18)

| Chương | Tên chương trong sách Floyd | Trọng tâm công thức & mạch bắt buộc phải nhớ |
| :--- | :--- | :--- |
| **Ch. 11** | **Thyristors** | Linh kiện 4 lớp P-N-P-N: **SCR** (kích dẫn một chiều bằng dòng cổng $I_G$, tự duy trì khi $I_A \ge I_H$), **TRIAC** (điều khiển pha xoay chiều 2 chiều), **DIAC**, **UJT**. |
| **Ch. 12** | **The Operational Amplifier** | Ba mạch hồi tiếp âm kinh điển:<br/>• **Non-inverting (Không đảo):** $A_{cl(NI)} = 1 + \frac{R_f}{R_i}$<br/>• **Inverting (Đảo):** $A_{cl(I)} = -\frac{R_f}{R_i}$<br/>• **Voltage Follower (Lặp áp):** $A_{cl(VF)} = 1$ |
| **Ch. 13 & 14** | **Basic & Special Op-Amp Circuits** | Mạch so sánh (*Comparator*), Schmitt Trigger (có trễ Hysteresis chống nhiễu), Mạch cộng (*Summing*), Mạch tích phân ($v_{out} = -\frac{1}{R_i C}\int v_{in}dt$), Mạch vi phân ($v_{out} = -R_f C \frac{dv_{in}}{dt}$), Khuếch đại đo lường (*Instrumentation Amp*). |
| **Ch. 15** | **Active Filters** | Lọc thông thấp / thông cao / thông dải dùng Op-Amp (Cấu trúc Sallen-Key, độ dốc $-20\text{ dB/decade}$ mỗi bậc, hệ số phẩm chất $Q$). |
| **Ch. 16** | **Oscillators** | Điều kiện tự kích dao động **Barkhausen** ($A_v \cdot B = 1$, tổng dịch pha $0^\circ$). Dao động RC (Cầu Wien, Dịch pha), Dao động LC (Colpitts, Hartley, Thạch anh), và vi mạch **555 Timer**. |
| **Ch. 17 & 18** | **Voltage Regulators & Communications** | Ổn áp tuyến tính nối tiếp/song song, ổn áp xung (Buck/Boost PWM), điều chế biên độ AM, điều chế tần số FM và vòng khóa pha **PLL (Phase-Locked Loop)**. |
