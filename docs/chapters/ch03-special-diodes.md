---
title: "Chương 3: Vật Lý Lượng Tử & Giải Tích Các Diode Đặc Biệt (Zener, Varactor, Quang Điện Tử)"
---

# Chương 3: Vật Lý Lượng Tử & Giải Tích Mạch Các Loại Diode Đặc Biệt

> **Định hướng học thuật:** Chương này phân tích sâu bản chất vật lý chất rắn của các linh kiện bán dẫn hai cực chuyên dụng: sự khác biệt cơ học lượng tử giữa **Đánh thủng Zener (Hiệu ứng xuyên hầm - Quantum Tunneling)** và **Đánh thủng Thác lũ (Ion hóa do va chạm - Impact Ionization)**, chứng minh phương trình điện dung phi tuyến của **Varactor** từ phương trình Poisson, nguyên lý chuyển tiếp vùng cấm trực tiếp (*Direct Bandgap*) của **LED/Laser**, và cấu trúc rào thế kim loại – bán dẫn của **Diode Schottky**.

---

## 3-1. Vật Lý Hai Cơ Chế Đánh Thủng Ngược & Giải Tích Ổn Áp Zener

Mặc dù mọi Diode ổn áp đều được gọi chung là **Diode Zener**, nhưng bên trong tinh thể Silicon tồn tại **hai cơ chế vật lý hoàn toàn khác nhau** tùy thuộc vào nồng độ pha tạp $N_A, N_D$ và mức điện áp đánh thủng danh định $V_Z$:

| Đặc trưng vật lý | 1. Hiệu ứng Đánh thủng Zener (*Zener Breakdown*) | 2. Hiệu ứng Đánh thủng Thác lũ (*Avalanche Breakdown*) |
| :--- | :--- | :--- |
| **Phạm vi điện áp $V_Z$** | $V_Z < 5\text{ V}$ (Điển hình $1.8\text{ V} \to 4.7\text{ V}$) | $V_Z > 7\text{ V}$ *(Khoảng $5\text{ V} \to 7\text{ V}$ có cả hai cơ chế cùng tồn tại)* |
| **Mức độ pha tạp ($N_A, N_D$)** | **Pha tạp cực kỳ đậm đặc** ($> 10^{18}\text{ cm}^{-3}$) $\implies$ Vùng nghèo $W$ cực kỳ hẹp ($W < 10\text{ nm}$). | **Pha tạp trung bình hoặc nhẹ** $\implies$ Vùng nghèo $W$ rộng hơn, đủ quãng đường tự do trung bình để hạt dẫn tăng tốc. |
| **Bản chất cơ học lượng tử** | **Hiệu ứng xuyên hầm lượng tử (*Band-to-Band Quantum Tunneling*):** Do $W$ cực nhỏ, điện trường tại mặt ghép vượt ngưỡng $\mathcal{E} \approx 10^6\text{ V/cm}$ làm dải hóa trị bên P và dải dẫn bên N uốn cong sát nhau. Các electron hóa trị bên P **xuyên hầm trực tiếp** qua rào thế vùng cấm sang dải dẫn bên N mà không cần va chạm! | **Sự nhân thác lũ do ion hóa va chạm (*Impact Ionization*):** Các hạt dẫn thiểu số được điện trường gia tốc đến động năng cực lớn, đâm thẳng vào nút mạng tinh thể làm bật các electron hóa trị ra ngoài tạo thành cặp e-lỗ trống mới. Các hạt mới lại tiếp tục va chạm tạo phản ứng dây chuyền theo cấp số nhân. |
| **Hệ số nhiệt độ ($TC$)** | **Hệ số nhiệt ÂM ($\frac{dV_Z}{dT} < 0$):** Khi $T$ tăng, độ rộng vùng cấm $E_g(T)$ giảm nhẹ giúp electron xuyên hầm dễ hơn ở điện áp thấp hơn. | **Hệ số nhiệt DƯƠNG ($\frac{dV_Z}{dT} > 0$):** Khi $T$ tăng, dao động nhiệt mạng tinh thể (*phonon*) mạnh lên làm giảm quãng đường tự do trung bình của electron $\implies$ cần điện áp ngược cao hơn mới đủ động năng gây va chạm ion hóa! |

> **Ứng dụng thiết kế nguồn chuẩn chính xác cao (Zero-TC Reference):** Vì hiệu ứng Zener có hệ số nhiệt âm còn hiệu ứng Thác lũ có hệ số nhiệt dương, tại vùng giao thoa **$V_Z \approx 5.6\text{ V}$ đến $6.2\text{ V}$**, hai hệ số nhiệt ngược dấu này triệt tiêu lẫn nhau gần như hoàn toàn ($\frac{dV_Z}{dT} \approx 0$)! Đó là lý do các mạch tạo điện áp chuẩn (*Voltage Reference*) chính xác luôn ưu tiên chọn Zener $5.6\text{ V}$ hoặc $6.2\text{ V}$ (hoặc mắc nối tiếp 1 Zener $6.2\text{ V}$ có $TC \approx +2\text{ mV/}^\circ\text{C}$ với 1 Diode phân cực thuận có $TC \approx -2\text{ mV/}^\circ\text{C}$).

### Giải tích Mạch Ổn Áp Zener Có Trở Kháng Động Z_Z (Mục 3-1 & 3-2 Sách Floyd)

Trong miền đánh thủng ổn áp ($I_{ZK} \le I_Z \le I_{ZM}$), đường đặc tuyến ngược của Zener không thẳng đứng tuyệt đối mà có độ nghiêng xác định bởi **Trở kháng động Zener ($Z_Z = \frac{\Delta V_Z}{\Delta I_Z}$)**:

$$V_Z = V_{Z0} + I_Z \cdot Z_Z$$

Xét mạch ổn áp gồm nguồn đầu vào $V_{\text{IN}}$ biến thiên trong đoạn $[V_{\text{IN}(\min)}, V_{\text{IN}(\max)}]$, điện trở hạn dòng nối tiếp $R$, và tải $R_L$ biến thiên trong đoạn $[R_{L(\min)}, R_{L(\max)}]$ mắc song song với Zener:

1. **Điều kiện duy trì ổn áp khi nguồn vào thấp nhất và tải tiêu thụ dòng lớn nhất:**
   Dòng qua Zener đạt giá trị nhỏ nhất $I_{Z(\min)}$ nhưng vẫn phải lớn hơn hoặc bằng dòng gối $I_{ZK}$:
   $$I_{Z(\min)} = \frac{V_{\text{IN}(\min)} - V_Z}{R} - \frac{V_Z}{R_{L(\min)}} \ge I_{ZK}$$
2. **Điều kiện an toàn công suất khi nguồn vào cao nhất và tải nhẹ nhất (hoặc hở tải $R_L \to \infty$):**
   Dòng qua Zener đạt giá trị lớn nhất $I_{Z(\max)}$ nhưng không được vượt quá dòng cực đại cho phép $I_{ZM} = \frac{P_{D(\max)}}{V_Z}$:
   $$I_{Z(\max)} = \frac{V_{\text{IN}(\max)} - V_Z}{R} - \frac{V_Z}{R_{L(\max)}} \le I_{ZM}$$

---

## 3-2. Giải Tích Điện Dung Vùng Nghèo & Diode Biến Dung (Varactor Diode)

Khi chuyển tiếp P-N phân cực ngược với điện áp $V_R$, hai miền trung hòa P và N dẫn điện tốt đóng vai trò như **hai bản cực của tụ điện phẳng**, còn vùng nghèo ở giữa (không có hạt dẫn tự do, bề rộng $W$) đóng vai trò **lớp chất điện môi có hằng số điện môi $\varepsilon_s = \varepsilon_r \varepsilon_0$**.

Từ nghiệm phương trình Poisson ở Chương 1, bề rộng vùng nghèo tăng theo căn bậc hai của điện áp ngược:

$$W(V_R) = \sqrt{\frac{2\varepsilon_s}{q}\left(\frac{1}{N_A} + \frac{1}{N_D}\right)\left(V_B + V_R\right)} = W_0 \sqrt{1 + \frac{V_R}{V_B}}$$

Do đó, **Điện dung vùng nghèo vi phân (Junction Depletion Capacitance $C_j = \frac{dQ}{dV_R}$)** có biểu thức giải tích:

$$\boxed{C_j(V_R) = \frac{\varepsilon_s A}{W(V_R)} = \frac{C_{j0}}{\left(1 + \frac{V_R}{V_B}\right)^m}}$$

trong đó:
- $C_{j0} = \frac{\varepsilon_s A}{W_0}$ là điện dung của Diode khi chưa phân cực ($V_R = 0\text{ V}$).
- $m$ là **Hệ số phân bố tạp chất (Grading coefficient)**:
  - $m = \frac{1}{2} = 0.5$ đối với chuyển tiếp P-N nhảy bậc đột ngột (*Abrupt junction*).
  - $m = \frac{1}{3} \approx 0.33$ đối với chuyển tiếp pha tạp biến thiên tuyến tính (*Linearly graded junction*).
  - $m = 1.0 \to 2.0$ đối với chuyển tiếp siêu đột ngột (*Hyper-abrupt Varactor*) nhằm đạt tỷ số điều chỉnh điện dung $\frac{C_{\max}}{C_{\min}}$ lớn nhất cho các mạch dao động điều khiển bằng điện áp (**VCO**) và bộ tổng hợp tần số (**PLL**):
    $$f_r(V_R) = \frac{1}{2\pi \sqrt{L \cdot C_j(V_R)}}$$

---

## 3-3. Vật Lý Bán Dẫn Quang Điện Tử (LED, Photodiode, Laser) & Diode Schottky

### 1. Tại sao Silicon (Si) không thể dùng làm đèn LED phát sáng hiệu quả mà phải dùng GaAs, GaP, InGaN?

Câu trả lời nằm ở cấu trúc lượng tử của giản đồ năng lượng – xung lượng tinh thể $E(\vec{k})$:
- **Silicon ($\text{Si}$) và Germanium ($\text{Ge}$) là Bán dẫn vùng cấm XIÊN (Indirect Bandgap Semiconductor):** Cực tiểu của dải dẫn $E_C$ và cực đại của dải hóa trị $E_V$ **không nằm cùng một giá trị xung lượng tinh thể $\vec{k}$**. Theo định luật bảo toàn năng lượng và bảo toàn xung lượng, khi một electron từ đáy dải dẫn rơi xuống tái hợp với lỗ trống ở đỉnh dải hóa trị trong Silicon, nó bắt buộc phải truyền xung lượng thừa cho mạng tinh thể thông qua việc phát ra **hạt dao động nhiệt (Phonon)** thay vì phát ra hạt ánh sáng (Photon)!
- **Các bán dẫn hợp chất nhóm III-V như $\text{GaAs}, \text{InGaN}, \text{AlGaInP}$ là Bán dẫn vùng cấm THẲNG (Direct Bandgap Semiconductor):** Đáy dải dẫn và đỉnh dải hóa trị có cùng véctơ sóng $\vec{k} = 0$. Khi tái hợp bức xạ (*Radiative Recombination*), toàn bộ năng lượng vùng cấm $E_g$ chuyển hóa trực tiếp thành một **Photon ánh sáng** có bước sóng $\lambda$:

$$\boxed{E_{\text{photon}} = h\nu = \frac{hc}{\lambda} \approx E_g \implies \lambda\ (\text{nm}) \approx \frac{1240}{E_g\ (\text{eV})}}$$

*(Ví dụ: $\text{GaAs}$ có $E_g = 1.42\text{ eV} \implies \lambda \approx \frac{1240}{1.42} \approx 873\text{ nm}$ thuộc vùng Hồng ngoại; $\text{InGaN}$ có $E_g \approx 2.75\text{ eV} \implies \lambda \approx 450\text{ nm}$ cho ánh sáng Xanh lam).*

### 2. Chuyển tiếp Kim loại – Bán dẫn & Diode Schottky (*Hot-Carrier Diode*)

Khác với chuyển tiếp P-N, **Diode Schottky** được tạo bởi sự tiếp xúc trực tiếp giữa một lớp **Kim loại** (như $\text{Pt}, \text{Au}, \text{W}, \text{Al}$ có công thoát điện tử $\Phi_m$) và một miền **Bán dẫn loại N pha tạp nhẹ** (có ái lực điện tử $\chi_s$, với $\Phi_m > \Phi_s$):
- Ở phía bề mặt bán dẫn hình thành một hàng rào thế Schottky $\Phi_B = \Phi_m - \chi_s$ thấp hơn so với rào thế P-N thông thường, do đó **sụt áp thuận rất nhỏ ($V_F \approx 0.2\text{ V} \to 0.3\text{ V}$)**.
- **Không có hiện tượng tích trữ điện tích thiểu số (*Zero Minority-Carrier Storage Time*):** Trong Diode P-N thường, khi đang dẫn thuận muốn chuyển sang khóa ngược, mạch phải mất một khoảng **Thời gian phục hồi ngược ($t_{rr}$ - Reverse Recovery Time)** để quét hết lượng hạt dẫn thiểu số đang khuếch tán dở trong miền trung hòa. Ngược lại, Diode Schottky chỉ hoạt động thuần túy bằng **hạt dẫn đa số (electron)** phun từ bán dẫn loại N vượt rào sang kim loại với động năng cao (*Hot carriers*), nên $t_{rr} \approx 0$ — cho phép đóng cắt ở tần số hàng chục $\text{GHz}$!

---

## 📝 Bài Tập Kiểm Tra Chuyên Sâu Chương 3

<script setup>
const ch3Questions = [
  {
    q: 'Sự khác biệt bản chất về cơ chế vật lý và hệ số nhiệt độ (TC) giữa Diode Zener có V_Z = 3.3 V và Diode Zener có V_Z = 12 V là gì?',
    options: [
      'Cả hai đều đánh thủng do va chạm thác lũ và đều có hệ số nhiệt dương.',
      'Zener 3.3 V hoạt động theo cơ chế xuyên hầm lượng tử (Quantum Tunneling) với hệ số nhiệt ÂM; còn Zener 12 V hoạt động theo cơ chế nhân thác lũ (Avalanche Impact Ionization) với hệ số nhiệt DƯƠNG.',
      'Zener 3.3 V có vùng nghèo rất rộng, còn Zener 12 V có vùng nghèo rất hẹp.',
      'Zener 3.3 V phải phân cực thuận, còn Zener 12 V phân cực ngược.'
    ],
    correctIndex: 1,
    explanation: 'Ở V_Z < 5 V, mật độ pha tạp rất cao làm vùng nghèo hẹp dưới 10 nm gây hiệu ứng xuyên hầm lượng tử Zener (hệ số nhiệt âm). Ở V_Z > 7 V, vùng nghèo rộng hơn nên đánh thủng do va chạm ion hóa thác lũ Avalanche (hệ số nhiệt dương).'
  },
  {
    q: 'Một Diode biến dung (Varactor có chuyển tiếp nhảy bậc m = 0.5 và rào thế V_B = 0.7 V) có điện dung ở 0 V là C_j0 = 80 pF. Khi đặt điện áp phân cực ngược V_R = 10.5 V thì điện dung C_j của nó giảm xuống còn bao nhiêu?',
    options: ['40 pF', '20 pF', '5 pF', '160 pF'],
    correctIndex: 1,
    explanation: 'Áp dụng công thức C_j(V_R) = C_j0 / sqrt(1 + V_R / V_B) = 80 pF / sqrt(1 + 10.5 / 0.7) = 80 pF / sqrt(1 + 15) = 80 pF / 4 = 20 pF.'
  },
  {
    q: 'Một đèn LED làm từ vật liệu bán dẫn vùng cấm thẳng có độ rộng vùng cấm E_g = 2.0 eV. Bước sóng ánh sáng λ do LED này phát ra xấp xỉ bằng bao nhiêu (biết hc ≈ 1240 eV·nm)?',
    options: ['450 nm (Ánh sáng xanh lam)', '620 nm (Ánh sáng đỏ cam)', '870 nm (Hồng ngoại)', '2480 nm (Hồng ngoại xa)'],
    correctIndex: 1,
    explanation: 'Theo công thức bảo toàn năng lượng photon khi tái hợp bức xạ: λ ≈ 1240 / E_g(eV) = 1240 / 2.0 = 620 nm (thuộc vùng ánh sáng nhìn thấy màu đỏ cam).'
  },
  {
    q: 'Cho mạch ổn áp Zener có V_Z = 10 V (bỏ qua Z_Z), công suất tiêu tán cực đại P_D(max) = 400 mW, dòng gối I_ZK = 2 mA, điện trở hạn dòng nối tiếp R = 220 Ω và nguồn vào V_IN = 20 V. Giá trị điện trở tải nhỏ nhất R_L(min) có thể mắc vào mà Zener vẫn giữ được ổn áp 10 V là bao nhiêu?',
    options: ['R_L(min) ≈ 230.1 Ω', 'R_L(min) ≈ 100.0 Ω', 'R_L(min) ≈ 220.0 Ω', 'R_L(min) ≈ 454.5 Ω'],
    correctIndex: 0,
    explanation: 'Dòng tổng qua điện trở R là I_T = (20 V - 10 V) / 220 Ω = 45.45 mA. Để Zener không bị thoát khỏi vùng ổn áp, dòng qua Zener tối thiểu phải là I_ZK = 2 mA => Dòng cực đại cấp được cho tải là I_L(max) = I_T - I_ZK = 45.45 - 2 = 43.45 mA. Vậy R_L(min) = V_Z / I_L(max) = 10 V / 43.45 mA ≈ 230.1 Ω.'
  }
]
</script>

<ActiveRecallQuiz title="Bài Kiểm Tra Học Thuật Chương 3 (Zener, Varactor, Quang Điện Tử & Schottky)" :questions="ch3Questions" />
