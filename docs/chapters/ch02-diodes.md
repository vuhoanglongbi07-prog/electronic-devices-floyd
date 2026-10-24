---
title: "Chương 2: Giải Tích Linh Kiện Diode & Mạch Chỉnh Lưu, Xén, Ghim Áp (Chuyên Sâu)"
---

# Chương 2: Giải Tích Vật Lý Diode, Mô Hình Tuyến Tính Hóa & Mạch Ứng Dụng

> **Định hướng học thuật:** Chương này kết nối trực tiếp phương trình khuếch tán hạt dẫn thiểu số ở Chương 1 với **Phương trình Diode Shockley**, chứng minh bằng giải tích vi phân vì sao điện trở động của Diode có biểu thức $r'_d \approx \frac{25\text{ mV}}{I_F}$, đồng thời thiết lập toàn bộ các công thức chỉnh lưu, lọc nguồn, xén biên độ và ghim áp bằng tích phân giải tích chặt chẽ.

---

## 2-1. Sự Tiêm Hạt Dẫn Thiểu Số & Chứng Minh Phương Trình Diode Shockley

### 1. Định luật Mặt ghép (*Law of the Junction*)

Khi đặt một điện áp phân cực ngoài $V_D$ lên chuyển tiếp P-N, hầu hết điện áp này rơi trên vùng nghèo (vì vùng nghèo cạn kiệt hạt dẫn nên có điện trở suất lớn hơn hàng vạn lần so với vùng trung hòa P và N). Do đó, hàng rào thế tĩnh điện tại mặt ghép thay đổi từ $V_B$ thành $(V_B - V_D)$.

Hệ quả là cân bằng động giữa dòng khuếch tán và dòng trôi bị phá vỡ. Theo phân bố Boltzmann, nồng độ lỗ trống thiểu số tại bờ vùng nghèo bên N ($x = x_n$) và nồng độ electron thiểu số tại bờ vùng nghèo bên P ($x = -x_p$) tăng vọt theo hàm mũ của $V_D$:

$$p_n(x_n) = p_{n0} \exp\left(\frac{q V_D}{k_B T}\right) = p_{n0} \exp\left(\frac{V_D}{V_T}\right)$$

$$n_p(-x_p) = n_{p0} \exp\left(\frac{q V_D}{k_B T}\right) = n_{p0} \exp\left(\frac{V_D}{V_T}\right)$$

Hiện tượng nồng độ hạt thiểu số ở biên vùng nghèo tăng vượt mức cân bằng nhiệt $\Delta p_n(x_n) = p_{n0}\left(e^{V_D / V_T} - 1\right)$ được gọi là **Sự tiêm hạt dẫn thiểu số (Minority Carrier Injection)**.

### 2. Phương trình liên tục (*Continuity Equation*) và Phương trình Shockley

Khi các lỗ trống được tiêm sang vùng trung hòa N tại $x = x_n$, chúng khuếch tán sâu vào miền N đồng thời tái hợp dần với các electron đa số với thời gian sống trung bình là $\tau_p$. Phương trình vi phân khuếch tán – tái hợp dừng trong miền N là:

$$\frac{d^2 (\Delta p_n)}{dx^2} - \frac{\Delta p_n(x)}{L_p^2} = 0 \quad \text{với} \quad L_p = \sqrt{D_p \tau_p}$$

trong đó $L_p$ (và $L_n = \sqrt{D_n \tau_n}$) gọi là **Chiều dài khuếch tán (Diffusion Length)** — quãng đường trung bình hạt thiểu số đi được trước khi tái hợp. Nghiệm suy giảm hàm mũ theo không gian là:

$$\Delta p_n(x) = p_{n0}\left[\exp\left(\frac{V_D}{V_T}\right) - 1\right] \exp\left(-\frac{x - x_n}{L_p}\right) \quad (x \ge x_n)$$

Tính đạo hàm nồng độ tại biên để tìm dòng khuếch tán lỗ trống $J_p(x_n) = -q D_p \frac{dp_n}{dx}\big|_{x_n}$ và cộng với dòng khuếch tán electron $J_n(-x_p)$ bên P, nhân với tiết diện mặt ghép $A$, ta thu được **Phương trình Diode lý tưởng của Shockley**:

$$\boxed{I_D = I_S \left[\exp\left(\frac{V_D}{\eta V_T}\right) - 1\right]}$$

với **Dòng bão hòa ngược ($I_S$ - Reverse Saturation Current)** phụ thuộc hoàn toàn vào thông số vật lý tinh thể và diện tích mặt ghép $A$:

$$\boxed{I_S = q A n_i^2 \left(\frac{D_p}{L_p N_D} + \frac{D_n}{L_n N_A}\right)}$$

- $\eta$ (hoặc $n$): Hệ số lý tưởng hóa (*Ideality factor*, có giá trị từ $1$ đến $2$ tùy thuộc tỷ lệ tái hợp ngay bên trong vùng nghèo so với tái hợp ở vùng trung hòa; trong giải tích mạch chuẩn của sách Floyd, ta lấy $\eta = 1$).
- **Tại sao dòng rò ngược $I_S$ tăng gấp đôi khi nhiệt độ tăng thêm khoảng $10^\circ\text{C}$?**
  Nhìn vào biểu thức của $I_S$: vì $I_S \propto n_i^2 \propto T^3 \exp\left(-\frac{E_g}{k_B T}\right)$, sự phụ thuộc hàm mũ vào nhiệt độ làm cho $I_S$ cực kỳ nhạy với nhiệt (tăng khoảng $7\% / ^\circ\text{C}$, tức tăng gấp $1.07^{10} \approx 2$ lần sau mỗi $10^\circ\text{C}$!). Ngoài ra, ở phân cực ngược thực tế còn có thêm dòng sinh nhiệt bề mặt (*Surface-leakage current* $I_{SL}$).

---

## 2-2. Tuyến Tính Hóa Vi Phân & Chứng Minh Công Thức Điện Trở Động r'_d = 25 mV / I_F

Trong sách của Thomas L. Floyd (Mục 2-3), điện trở động xoay chiều của Diode khi phân cực thuận được viết là $r'_d = \frac{25\text{ mV}}{I_F}$. Công thức này từ đâu mà ra?

Giả sử Diode đang được phân cực thuận tại một **Điểm làm việc tĩnh $Q(V_{DQ}, I_{DQ})$** (trong sách Floyd ký hiệu dòng thuận tĩnh là $I_F$) và có một tín hiệu xoay chiều biên độ nhỏ $v_d(t)$ chồng lên điện áp một chiều:

$$v_D(t) = V_{DQ} + v_d(t), \qquad i_D(t) = I_{DQ} + i_d(t)$$

Khai triển chuỗi Taylor bậc nhất hàm $i_D(v_D)$ quanh điểm tĩnh $Q$ (với điều kiện tín hiệu nhỏ $|v_d| \ll V_T$):

$$i_D(t) \approx I_{DQ} + \left.\frac{dI_D}{dV_D}\right|_{Q} \cdot v_d(t)$$

Đại lượng đạo hàm tại điểm $Q$ chính là **Điện dẫn vi phân (Dynamic Conductance $g_d$)**:

$$g_d = \left.\frac{dI_D}{dV_D}\right|_{Q} = \frac{d}{dV_D}\left[I_S \exp\left(\frac{V_D}{V_T}\right) - I_S\right]_{V_D = V_{DQ}} = \frac{I_S}{V_T}\exp\left(\frac{V_{DQ}}{V_T}\right) = \frac{I_{DQ} + I_S}{V_T}$$

Khi phân cực thuận ($I_{DQ} = I_F \gg I_S$), nghịch đảo của $g_d$ cho ta **Điện trở động xoay chiều (AC Dynamic Resistance $r'_d$)**:

$$\boxed{r'_d = \frac{1}{g_d} = \left(\frac{dI_D}{dV_D}\right)_Q^{-1} \approx \frac{V_T}{I_F} \approx \frac{25\text{ mV}}{I_F}}$$

> **Ý nghĩa hình học trên đặc tuyến $I\text{-}V$:** $r'_d$ chính là **nghịch đảo hệ số góc của đường tiếp tuyến** với đường cong đặc tuyến Diode tại điểm làm việc $Q$. Dòng phân cực tĩnh $I_F$ càng lớn thì điểm $Q$ càng dịch lên phần dốc đứng của đường cong hàm mũ $\implies$ điện trở động $r'_d$ càng nhỏ! Ngoài $r'_d$ của bản thân mặt ghép P-N, một Diode thực tế còn có thêm điện trở thuần của hai miền bán dẫn trung hòa P, N và tiếp xúc kim loại gọi là **Điện trở khối (Bulk Resistance $r_B$)**.

---

## 2-3. Giải Tích Đường Tải Tĩnh DC (DC Load Line) & Ba Mô Hình Tuyến Tính Hóa Của Floyd

Xét mạch cơ bản gồm nguồn một chiều $V_{\text{BIAS}}$ nối tiếp với điện trở hạn dòng $R_{\text{LIMIT}}$ và một Diode. Áp dụng Định luật Kirchhoff về điện áp (KVL) cho vòng mạch:

$$V_{\text{BIAS}} - I_F R_{\text{LIMIT}} - V_F = 0 \iff \boxed{I_F = -\frac{1}{R_{\text{LIMIT}}} V_F + \frac{V_{\text{BIAS}}}{R_{\text{LIMIT}}}}$$

Phương trình bậc nhất này biểu diễn một đường thẳng trên mặt phẳng tọa độ $(V_F, I_F)$ gọi là **Đường tải một chiều (DC Load Line)**:
- **Giao điểm với trục tung (Saturation point, khi $V_F = 0$):** $I_{F(\text{sat})} = \frac{V_{\text{BIAS}}}{R_{\text{LIMIT}}}$.
- **Giao điểm với trục hoành (Cut-off point, khi $I_F = 0$):** $V_{F(\text{cutoff})} = V_{\text{BIAS}}$.
- **Hệ số góc của đường tải:** $\text{Slope} = -\frac{1}{R_{\text{LIMIT}}}$.
- **Điểm làm việc tĩnh $Q(V_{FQ}, I_{FQ})$:** Là giao điểm nghiệm đồng thời của phương trình Đường tải (đại diện cho mạch ngoài) và phương trình Đặc tuyến Diode (đại diện cho linh kiện).

Để tránh phải giải phương trình siêu việt $V_{\text{BIAS}} - I_F R_{\text{LIMIT}} = V_T \ln(I_F / I_S)$, sách Floyd sử dụng **Phương pháp Tuyến tính hóa từng đoạn (Piecewise-Linear Approximation)** với 3 cấp độ chính xác:

| Cấp độ mô hình | Mô tả toán học khi Phân cực thuận ($V_F \ge V_B$) | Mô tả toán học khi Phân cực ngược ($V_R > 0$) | Phương trình nghiệm điểm làm việc $Q$ |
| :--- | :--- | :--- | :--- |
| **1. Mô hình Lý tưởng (*Ideal Model*)** | Sụt áp $V_F = 0\text{ V}$, điện trở thuận $R_F = 0\ \Omega$ *(Khóa đóng hoàn hảo)* | Dòng rò $I_R = 0\text{ A}$, điện trở ngược $R_R = \infty$ *(Khóa hở hoàn hảo)* | $V_F = 0\text{ V}$<br/>$I_F = \frac{V_{\text{BIAS}}}{R_{\text{LIMIT}}}$ |
| **2. Mô hình Thực tế (*Practical Model*)** | Nguồn sức điện động ngưỡng cố định $V_F = V_B = 0.7\text{ V}$ ($\text{Si}$), bỏ qua độ nghiêng $r'_d$ | Dòng rò $I_R = 0\text{ A}$ ($R_R = \infty$) | $V_F = 0.7\text{ V}$<br/>$I_F = \frac{V_{\text{BIAS}} - 0.7\text{ V}}{R_{\text{LIMIT}}}$ |
| **3. Mô hình Đầy đủ (*Complete Model*)** | Nguồn ngưỡng $0.7\text{ V}$ mắc nối tiếp với tổng trở thuận $r'_d$ | Điện trở ngược rất lớn $r'_R$ cho dòng rò nhỏ $I_R$ đi qua | $I_F = \frac{V_{\text{BIAS}} - 0.7\text{ V}}{R_{\text{LIMIT}} + r'_d}$<br/>$V_F = 0.7\text{ V} + I_F r'_d$ |

### 🎛️ Thực Hành Ngay: Khảo Sát Tương Tác Đường Tải DC & 3 Mô Hình Diode

<DiodeLoadLineSim />

---

## 2-4 & 2-5. Giải Tích Toàn Diện Các Mạch Chỉnh Lưu (Rectifier Circuits)

Giả sử điện áp xoay chiều lấy ra từ cuộn thứ cấp máy biến áp là hình sin chuẩn:
$$v_{\text{sec}}(\theta) = V_{p(\text{sec})} \sin\theta \quad (\text{với } \theta = \omega t = 2\pi f_{\text{in}} t)$$

Giá trị hiệu dụng (RMS) của cuộn thứ cấp liên hệ với giá trị đỉnh qua: $V_{\text{rms}} = \frac{V_p}{\sqrt{2}} \approx 0.707 V_p \iff V_p = \sqrt{2}\, V_{\text{rms}} \approx 1.414 V_{\text{rms}}$.

### 1. Chứng minh tích phân Giá trị trung bình một chiều (V_AVG) và Hiệu dụng (V_rms)

- **Đối với Chỉnh lưu Nửa chu kỳ (*Half-Wave Rectifier*):**
  Diode chỉ dẫn trong nửa chu kỳ dương $\theta \in [0, \pi]$ với biên độ đỉnh trên tải là $V_{p(\text{out})} = V_{p(\text{sec})} - 0.7\text{ V}$, và khóa hoàn toàn trong nửa chu kỳ âm $\theta \in [\pi, 2\pi]$ ($v_{\text{out}} = 0$). Thành phần một chiều (giá trị trung bình trên toàn chu kỳ $T = 2\pi$) là:
  $$V_{\text{AVG(HW)}} = \frac{1}{2\pi} \int_0^{2\pi} v_{\text{out}}(\theta)\, d\theta = \frac{1}{2\pi} \int_0^{\pi} V_{p(\text{out})} \sin\theta \, d\theta = \frac{V_{p(\text{out})}}{2\pi} \Big[-\cos\theta\Big]_0^{\pi} = \frac{V_{p(\text{out})}}{2\pi}(1 - (-1)) = \boxed{\frac{V_{p(\text{out})}}{\pi} \approx 0.318\, V_{p(\text{out})}}$$
  Giá trị hiệu dụng (RMS) của sóng nửa chu kỳ là:
  $$V_{\text{rms(HW)}} = \sqrt{\frac{1}{2\pi}\int_0^{\pi} V_{p(\text{out})}^2 \sin^2\theta \, d\theta} = \frac{V_{p(\text{out})}}{2} = 0.5\, V_{p(\text{out})}$$

- **Đối với Chỉnh lưu Cả chu kỳ (*Full-Wave Rectifier: Center-Tapped & Bridge*):**
  Cả hai bán kỳ âm và dương đều được lật lên thành các nửa hình sin dương liên tiếp có chu kỳ lặp lại là $\pi$ (do đó tần số gợn sóng đầu ra tăng gấp đôi: **$f_{\text{out}} = 2 f_{\text{in}}$**). Giá trị trung bình một chiều là:
  $$V_{\text{AVG(FW)}} = \frac{1}{\pi} \int_0^{\pi} V_{p(\text{out})} \sin\theta \, d\theta = \boxed{\frac{2 V_{p(\text{out})}}{\pi} \approx 0.637\, V_{p(\text{out})}}$$
  Giá trị hiệu dụng của sóng chỉnh lưu cả chu kỳ là:
  $$V_{\text{rms(FW)}} = \frac{V_{p(\text{out})}}{\sqrt{2}} \approx 0.707\, V_{p(\text{out})}$$

### 2. Bảng Đối Chiếu Giải Tích 3 Cấu Hình Chỉnh Lưu (Chuẩn Sách Floyd)

| Đại lượng giải tích | 1. Nửa chu kỳ (*Half-Wave*) | 2. Cả chu kỳ Biến áp điểm giữa (*Center-Tapped*) | 3. Cả chu kỳ Cầu 4 Diode (*Full-Wave Bridge*) |
| :--- | :--- | :--- | :--- |
| **Số Diode dẫn trong mỗi bán kỳ** | $1$ Diode dẫn ở bán kỳ dương; $0$ Diode dẫn ở bán kỳ âm | $1$ Diode dẫn ở mỗi bán kỳ (mỗi nửa cuộn thứ cấp cấp áp $\frac{V_{p(\text{sec})}}{2}$) | **$2$ Diode chéo nhau cùng dẫn nối tiếp** trong mỗi bán kỳ |
| **Đỉnh điện áp ra tải $V_{p(\text{out})}$** | $V_{p(\text{sec})} - 0.7\text{ V}$ | $\frac{V_{p(\text{sec})}}{2} - 0.7\text{ V}$ | $V_{p(\text{sec})} - 1.4\text{ V}$ |
| **Điện áp một chiều trung bình $V_{\text{AVG}}$** | $\frac{V_{p(\text{out})}}{\pi} \approx 0.318\, V_{p(\text{out})}$ | $\frac{2 V_{p(\text{out})}}{\pi} \approx 0.637\, V_{p(\text{out})}$ | $\frac{2 V_{p(\text{out})}}{\pi} \approx 0.637\, V_{p(\text{out})}$ |
| **Điện áp ngược cực đại $\text{PIV}$ trên mỗi Diode** | $\text{PIV} = V_{p(\text{sec})} = V_{p(\text{out})} + 0.7\text{ V}$ | $\text{PIV} = 2 V_{p(\text{out})} + 0.7\text{ V}$ | $\text{PIV} = V_{p(\text{out})} + 0.7\text{ V}$ |
| **Dòng trung bình qua mỗi Diode $I_{F(\text{avg})}$** | $I_{F(\text{avg})} = I_{L(\text{DC})}$ | $I_{F(\text{avg})} = \frac{1}{2} I_{L(\text{DC})}$ | $I_{F(\text{avg})} = \frac{1}{2} I_{L(\text{DC})}$ |
| **Tần số gợn sóng cơ bản $f_r$** | $f_r = f_{\text{in}}$ | $f_r = 2 f_{\text{in}}$ | $f_r = 2 f_{\text{in}}$ |

---

## 2-6. Giải Tích Mạch Lọc Nguồn Tụ Điện (*Capacitor-Input Filter*)

Khi mắc tụ lọc $C$ song song với tải $R_L$ ở ngõ ra bộ chỉnh lưu (với điều kiện hằng số thời gian xả $\tau = R_L C \gg T_r = \frac{1}{f_r}$):
1. Tụ điện nạp cực nhanh lên giá trị đỉnh $V_{p(\text{rect})}$ tại đỉnh bán kỳ.
2. Ngay khi điện áp đầu ra bộ chỉnh lưu giảm xuống thấp hơn điện áp trên tụ, các Diode bị phân cực ngược và ngắt. Tụ $C$ phóng điện qua tải $R_L$ theo hàm mũ trong khoảng thời gian xấp xỉ bằng một chu kỳ gợn sóng $T_r = \frac{1}{f_r}$:
   $$v_L(t) = V_{p(\text{rect})} \exp\left(-\frac{t}{R_L C}\right)$$
3. Vì $R_L C \gg T_r$, ta khai triển Taylor bậc nhất $e^{-x} \approx 1 - x$ tại $t = T_r = \frac{1}{f_r}$ để tìm điện áp thấp nhất $V_{\min}$:
   $$V_{\min} \approx V_{p(\text{rect})}\left(1 - \frac{1}{f_r R_L C}\right)$$
4. Từ đó suy ra công thức **Điện áp gợn sóng đỉnh-đỉnh ($V_{r(pp)}$ - Peak-to-Peak Ripple Voltage)** và **Điện áp một chiều trung bình ($V_{DC}$)** trong sách Floyd:

$$\boxed{V_{r(pp)} = V_{p(\text{rect})} - V_{\min} \approx \left(\frac{1}{f_r R_L C}\right) V_{p(\text{rect})} = \frac{I_{L(\text{DC})}}{f_r C}}$$

$$\boxed{V_{DC} \approx V_{p(\text{rect})} - \frac{V_{r(pp)}}{2} = \left(1 - \frac{1}{2 f_r R_L C}\right) V_{p(\text{rect})}}$$

$$\text{Hệ số gợn sóng (Ripple Factor):} \quad r = \frac{V_{r(pp)}}{V_{DC}}$$

---

## 2-7. Giải Tích Mạch Xén (*Limiters/Clippers*) & Mạch Ghim Áp (*Clampers*)

### 1. Nguyên lý giải tích Mạch Xén Biên Độ (*Diode Limiters / Clippers*)
- **Mạch xén song song có phân cực (*Biased Parallel Limiter*):** Nhánh chứa Diode mắc nối tiếp với nguồn một chiều $V_{\text{BIAS}}$ và mắc song song với tải.
  - Để tìm ngưỡng xén (*Clipping threshold*), ta xét thời điểm chuyển tiếp khi Diode bắt đầu dẫn ($V_D = 0.7\text{ V}$).
  - Trong suốt khoảng thời gian $v_{\text{in}}(t)$ vượt qua ngưỡng làm Diode phân cực thuận, nhánh Diode đóng vai trò một nguồn áp cứng giữ cố định điện áp ngõ ra tại:
    $$V_{\text{clip}} = \pm 0.7\text{ V} \pm V_{\text{BIAS}} \quad (\text{tùy theo chiều Diode và cực tính nguồn } V_{\text{BIAS}})$$
  - Khi Diode phân cực ngược (hở mạch), mạch trở thành cầu phân áp thuần trở giữa $R_s$ và $R_L$: $v_{\text{out}}(t) = \left(\frac{R_L}{R_s + R_L}\right) v_{\text{in}}(t)$.

### 2. Nguyên lý giải tích Mạch Ghim Áp (*Diode Clampers / DC Restorers*)
- Mạch gồm tụ điện $C$ nối tiếp ngõ vào, sau đó mắc song song Diode và điện trở tải $R_L$ (với $R_L C \gg T$).
- **Bước 1 (Bán kỳ nạp tụ):** Xét bán kỳ của $v_{\text{in}}$ làm Diode phân cực thuận. Lúc này Diode dẫn giữ áp ngõ ra ở $\mp 0.7\text{ V}$ (với mạch ghim dương, Diode dẫn ở bán kỳ âm nên $v_{\text{out}(\min)} = -0.7\text{ V}$). Tụ điện $C$ nạp nhanh đến hiệu điện thế không đổi:
  $$V_C = V_{p(\text{in})} - 0.7\text{ V}$$
- **Bước 2 (Các chu kỳ xác lập tiếp theo):** Vì hằng số thời gian $R_L C$ rất lớn nên tụ $C$ không kịp xả mà hoạt động như một nguồn pin một chiều nối tiếp với nguồn xoay chiều $v_{\text{in}}(t)$. Theo định luật Kirchhoff:
  $$v_{\text{out}}(t) = v_{\text{in}}(t) \pm V_C = v_{\text{in}}(t) \pm \left(V_{p(\text{in})} - 0.7\text{ V}\right)$$
  Do đó, toàn bộ hình dạng và biên độ đỉnh-đỉnh ($V_{pp(\text{out})} = 2 V_{p(\text{in})}$) được bảo toàn nguyên vẹn, chỉ dịch chuyển mức trung bình DC!

---

## 📝 Bài Tập Kiểm Tra Chuyên Sâu Chương 2

<script setup>
const ch2Questions = [
  {
    q: 'Bằng phép lấy đạo hàm phương trình Diode Shockley I_D = I_S·[exp(V_D / V_T) - 1] tại điểm làm việc tĩnh Q(V_FQ, I_FQ), biểu thức chính xác của điện trở động xoay chiều r\'_d ở nhiệt độ phòng (V_T ≈ 25 mV) là gì?',
    options: [
      'r\'_d = 0.7 V / I_F',
      'r\'_d = dV_D / dI_D ≈ V_T / I_F ≈ 25 mV / I_F',
      'r\'_d = V_BIAS / I_F',
      'r\'_d = I_F / 25 mV'
    ],
    correctIndex: 1,
    explanation: 'Điện dẫn vi phân tại điểm Q là g_d = dI_D / dV_D = (I_F + I_S) / V_T ≈ I_F / V_T. Nghịch đảo của g_d cho ta điện trở động r\'_d = V_T / I_F ≈ 25 mV / I_F.'
  },
  {
    q: 'Cho mạch chỉnh lưu cầu cả chu kỳ (Full-Wave Bridge Rectifier) nối với biến áp có tỉ số vòng dây N_1 : N_2 = 2 : 1. Điện áp sơ cấp là 120 V(rms), tần số 60 Hz. Tính điện áp đỉnh thứ cấp V_p(sec), điện áp đỉnh trên tải V_p(out) và điện áp trung bình V_AVG (dùng Practical Model):',
    options: [
      'V_p(sec) = 60.0 V ; V_p(out) = 58.6 V ; V_AVG = 37.3 V',
      'V_p(sec) = 84.85 V ; V_p(out) = 83.45 V ; V_AVG = 53.13 V',
      'V_p(sec) = 84.85 V ; V_p(out) = 84.15 V ; V_AVG = 26.79 V',
      'V_p(sec) = 169.7 V ; V_p(out) = 168.3 V ; V_AVG = 107.1 V'
    ],
    correctIndex: 1,
    explanation: 'Áp hiệu dụng thứ cấp V_rms(sec) = 120 V / 2 = 60 V(rms). Suy ra áp đỉnh thứ cấp V_p(sec) = √2 × 60 V ≈ 84.85 V. Qua cầu 4 Diode mất 2 × 0.7V = 1.4V => V_p(out) = 84.85 - 1.4 = 83.45 V. Áp trung bình cả chu kỳ V_AVG = (2/π) × 83.45 V ≈ 53.13 V.'
  },
  {
    q: 'Một bộ nguồn chỉnh lưu cầu cả chu kỳ dùng lưới điện 50 Hz cấp điện áp đỉnh sau chỉnh lưu V_p(rect) = 15 V vào tụ lọc C = 1000 µF mắc song song tải R_L = 100 Ω. Điện áp gợn sóng đỉnh-đỉnh V_r(pp) và điện áp một chiều trung bình V_DC bằng bao nhiêu?',
    options: [
      'V_r(pp) = 3.0 V ; V_DC = 13.5 V',
      'V_r(pp) = 1.5 V ; V_DC = 14.25 V',
      'V_r(pp) = 0.75 V ; V_DC = 14.625 V',
      'V_r(pp) = 1.5 V ; V_DC = 15.0 V'
    ],
    correctIndex: 1,
    explanation: 'Với lưới 50 Hz và chỉnh lưu cả chu kỳ, tần số gợn sóng là f_r = 2 × 50 Hz = 100 Hz. Hằng số R_L·C = 100 Ω × 10^-3 F = 0.1 s. Do đó V_r(pp) = V_p(rect) / (f_r·R_L·C) = 15 V / (100 × 0.1) = 1.5 V. Suy ra V_DC = V_p(rect) - V_r(pp)/2 = 15 - 0.75 = 14.25 V.'
  },
  {
    q: 'Đưa tín hiệu hình sin v_in(t) = 10·sin(ωt) [V] (biên độ đỉnh 10 V, đỉnh-đỉnh 20 V) vào một mạch Ghim áp âm (Negative Clamper) dùng Diode Silicon thực tế (V_F = 0.7 V). Ở trạng thái xác lập, điện áp cực đại V_out(max) và cực tiểu V_out(min) trên tải là bao nhiêu?',
    options: [
      'V_out(max) = +10.0 V ; V_out(min) = -10.0 V',
      'V_out(max) = +0.7 V ; V_out(min) = -19.3 V',
      'V_out(max) = +19.3 V ; V_out(min) = -0.7 V',
      'V_out(max) = +0.7 V ; V_out(min) = -10.0 V'
    ],
    correctIndex: 1,
    explanation: 'Trong mạch ghim áp âm (Negative Clamper, mũi tên Diode hướng xuống đất), ở bán kỳ dương Diode dẫn ghim đỉnh dương của ngõ ra tại V_out(max) = +0.7 V (tụ nạp tới V_C = 10 - 0.7 = 9.3 V). Sang bán kỳ âm, áp ngõ ra đạt cực tiểu V_out(min) = -10 V - 9.3 V = -19.3 V (bảo toàn biên độ đỉnh-đỉnh 20 V).'
  }
]
</script>

<ActiveRecallQuiz title="Bài Kiểm Tra Học Thuật Chương 2 (Giải Tích Diode & Mạch Ứng Dụng)" :questions="ch2Questions" />
