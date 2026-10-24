---
title: "Chương 6 & 7: Giải Tích Khuếch Đại Xoay Chiều BJT (Mô Hình r'_e & Hybrid-π) & Công Suất"
---

# Chương 6 & 7: Giải Tích Tín Hiệu Nhỏ BJT (Mô Hình $r'_e$, Hybrid-$\pi$) & Khuếch Đại Công Suất

> **Định hướng học thuật:** Chương này trình bày phương pháp **Phân tách Thành phần Một chiều (DC) và Xoay chiều Tín hiệu nhỏ (Small-Signal AC)** dựa trên Nguyên lý Xếp chồng (*Superposition*) và Tuyến tính hóa Chuỗi Taylor quanh điểm làm việc tĩnh $Q$, chứng minh sự tương đương toán học giữa **Mô hình $r'_e$ (Mô hình T)** của sách Floyd với **Mô hình Hybrid-$\pi$**, và thiết lập công thức hiệu suất lý thuyết cực đại của các tầng công suất **Class A ($25\% / 50\%$), Class B/AB ($\frac{\pi}{4} \approx 78.5\%$) và Class C**.

---

## 6-1. Nguyên Lý Tuyến Tính Hóa Tín Hiệu Nhỏ & Hai Mô Hình Tương Đương Xoay Chiều

### 1. Chứng minh Điện trở động cực phát $r'_e$ và Hỗ dẫn $g_m$ từ phương trình hàm mũ BJT

Khi chồng một tín hiệu xoay chiều biên độ nhỏ $v_{be}(t)$ lên điện áp phân cực tĩnh $V_{BEQ}$ tại tiếp giáp Base-Emitter ($v_{BE}(t) = V_{BEQ} + v_{be}(t)$), dòng cực phát tổng cộng là:

$$i_E(t) = I_{ES}\exp\left(\frac{V_{BEQ} + v_{be}(t)}{V_T}\right) = I_{EQ} \exp\left(\frac{v_{be}(t)}{V_T}\right)$$

Với điều kiện **Tín hiệu nhỏ (Small-signal condition: $|v_{be}(t)| \ll V_T \approx 25\text{ mV}$)**, ta khai triển chuỗi Taylor bậc nhất $\exp\left(\frac{v_{be}}{V_T}\right) \approx 1 + \frac{v_{be}}{V_T}$:

$$i_E(t) \approx I_{EQ} + \left(\frac{I_{EQ}}{V_T}\right) v_{be}(t) = I_{EQ} + i_e(t)$$

Từ đó, tỷ số giữa biên độ điện áp xoay chiều $v_{be}$ và dòng xoay chiều cực phát $i_e$ xác định **Điện trở động xoay chiều cực phát ($r'_e$ - AC Emitter Resistance)** trong sách Floyd:

$$\boxed{r'_e = \frac{v_{be}}{i_e} = \left(\frac{dI_E}{dV_{BE}}\right)_Q^{-1} = \frac{V_T}{I_{EQ}} \approx \frac{25\text{ mV}}{I_E}}$$

Đồng thời, dòng xoay chiều cực góp $i_c = \alpha_{ac} i_e \approx i_e$ liên hệ với $v_{be}$ qua **Hỗ dẫn truyền đạt (Transconductance $g_m$)** trong mô hình Hybrid-$\pi$:

$$\boxed{g_m = \frac{i_c}{v_{be}} = \left.\frac{\partial I_C}{\partial V_{BE}}\right|_Q = \frac{I_{CQ}}{V_T} = \frac{\alpha_{ac}}{r'_e} \approx \frac{1}{r'_e}}$$

Và điện trở ngõ vào nhìn vào cực Base khi Emitter nối đất xoay chiều ($r_\pi$ trong mô hình Hybrid-$\pi$) chính là $r'_e$ được nhân lên $\beta_{ac}$ lần (do $i_b = \frac{i_e}{\beta_{ac} + 1} \approx \frac{i_e}{\beta_{ac}}$):

$$\boxed{r_\pi = \frac{v_{be}}{i_b} = \beta_{ac} r'_e = \frac{\beta_{ac}}{g_m}}$$

### 2. Quy trình 3 bước vẽ Mạch tương đương xoay chiều (AC Equivalent Circuit)

Để phân tích đáp ứng xoay chiều ở dải tần số trung bình (*Midband frequency*):
1. **Ngắn mạch (Short-circuit) tất cả các tụ điện liên lạc ($C_1, C_2$) và tụ thoát cực phát (Bypass capacitor $C_E$):** Vì ở tần số tín hiệu làm việc, dung kháng $X_C = \frac{1}{2\pi f C} \approx 0\ \Omega$.
2. **Nối đất xoay chiều (AC Ground) tất cả các nguồn điện áp một chiều độc lập ($V_{CC} \to 0\text{ V}$):** Vì nguồn áp DC lý tưởng có điện thế không đổi ($\Delta V_{CC} = 0$) nên nội trở xoay chiều của nó bằng $0\ \Omega$.
3. **Thay thế BJT bằng mô hình $r'_e$** và tính toán tổng trở vào $R_{\text{in}}$, tổng trở ra $R_{\text{out}}$, độ lợi áp $A_v = \frac{v_{\text{out}}}{v_{\text{in}}}$, độ lợi dòng $A_i = \frac{i_{\text{out}}}{i_{\text{in}}}$ và độ lợi công suất $A_p = |A_v| \cdot A_i$.

---

## 6-2. Giải Tích Ba Cấu Hình Khuếch Đại BJT Kinh Điển (CE, CC, CB)

| Đại lượng giải tích | 1. Cực phát chung (*Common-Emitter - CE*) | 2. Cực góp chung (*Common-Collector / Emitter-Follower - CC*) | 3. Cực gốc chung (*Common-Base - CB*) |
| :--- | :--- | :--- | :--- |
| **Cực nhận tín hiệu vào / Cực lấy tín hiệu ra** | Vào **Base** $\rightarrow$ Ra **Collector** | Vào **Base** $\rightarrow$ Ra **Emitter** | Vào **Emitter** $\rightarrow$ Ra **Collector** |
| **Trở kháng vào nhìn vào cực BJT** | • Có tụ $C_E$ nối tắt $R_E$: $R_{\text{in(base)}} = \beta_{ac} r'_e$<br/>• Có $R_{E1}$ không nối tắt (Swamped): $R_{\text{in(base)}} = \beta_{ac}(r'_e + R_{E1})$ | $R_{\text{in(base)}} = \beta_{ac}(r'_e + R_e)$<br/>*(với $R_e = R_E \parallel R_L$)* $\implies$ **Rất lớn!** | $R_{\text{in(emitter)}} \approx r'_e$<br/>*(Cực kỳ nhỏ, cỡ vài chục $\Omega$!)* |
| **Tổng trở vào toàn mạch $R_{\text{in(tot)}}$** | $R_{\text{in(tot)}} = R_1 \parallel R_2 \parallel R_{\text{in(base)}}$ | $R_{\text{in(tot)}} = R_1 \parallel R_2 \parallel R_{\text{in(base)}}$ | $R_{\text{in(tot)}} = R_E \parallel r'_e \approx r'_e$ |
| **Tổng trở ra $R_{\text{out}}$** | $R_{\text{out}} = R_C \parallel r'_c \approx R_C$ | $R_{\text{out}} = R_E \parallel \left(r'_e + \frac{R_{\text{th(nguồn)}}}{\beta_{ac}}\right) \approx r'_e$ *(Rất nhỏ!)* | $R_{\text{out}} = R_C \parallel r'_c \approx R_C$ |
| **Độ lợi điện áp $A_v$ (khi đã nối tải $R_L$)** | • Có tụ $C_E$: $A_v = -\frac{R_c}{r'_e}$ *(với $R_c = R_C \parallel R_L$)*<br/>• Mạch Swamped CE: $A_v = -\frac{R_c}{r'_e + R_{E1}}$ | $A_v = \frac{R_e}{r'_e + R_e} \approx 1$<br/>*(Không khuếch đại áp, hơi nhỏ hơn $1$)* | $A_v = +\frac{R_c}{r'_e}$<br/>*(Cao tương đương mạch CE)* |
| **Độ lệch pha Vào – Ra** | **Đảo pha $180^\circ$** (dấu trừ trong $A_v$) | **Đồng pha $0^\circ$** | **Đồng pha $0^\circ$** |
| **Vai trò trong hệ thống** | Tầng khuếch đại điện áp và công suất chủ lực ở tần số âm tần/trung tần. | **Tầng đệm phối hợp trở kháng (*Impedance Buffer*)** để kéo tải trở kháng thấp mà không làm sụt áp tầng trước. | Khuếch đại tần số cao (RF) vì không bị hiệu ứng nhân điện dung Miller giữa ngõ vào và ngõ ra! |

> **Bản chất của kỹ thuật "Swamping" (Giữ lại một phần điện trở $R_{E1}$ không nối tắt bởi tụ $C_E$ - Mục 6-3 sách Floyd):**
> Điện trở động $r'_e = \frac{25\text{ mV}}{I_E}$ phụ thuộc mạnh vào nhiệt độ $T$ và biến thiên theo từng bán kỳ của tín hiệu lớn (làm méo hài phi tuyến). Khi giữ lại một điện trở thuần $R_{E1} \gg r'_e$ không bị tụ $C_E$ nối tắt, độ lợi áp trở thành $A_v = -\frac{R_c}{r'_e + R_{E1}} \approx -\frac{R_c}{R_{E1}}$. Đây chính là **Hồi tiếp âm dòng điện nối tiếp (Current-Series Negative Feedback)**: ta chấp nhận hy sinh bớt độ lợi áp $A_v$ để đổi lấy **sự ổn định tuyệt đối theo nhiệt độ, giảm méo phi tuyến và tăng trở kháng vào lên $\beta_{ac}(r'_e + R_{E1})$**!

---

## Chương 7. Giải Tích Các Chế Độ Khuếch Đại Công Suất (Class A, B, AB, C)

### 1. Đường tải xoay chiều (*AC Load Line*) so với Đường tải tĩnh (*DC Load Line*)

Trong mạch khuếch đại, điện trở mà dòng một chiều $I_{CQ}$ nhìn thấy là $R_{DC} = R_C + R_E$, nhưng điện trở mà dòng xoay chiều $i_c$ nhìn thấy (do có tụ liên lạc nối sang tải $R_L$ và tụ thoát $C_E$) là $R_{ac} = R_c + R_e < R_{DC}$.
- Do đó, **Đường tải xoay chiều (AC Load Line)** luôn đi qua cùng điểm làm việc tĩnh $Q(V_{CEQ}, I_{CQ})$ nhưng **có độ dốc lớn hơn ($\text{Slope}_{ac} = -\frac{1}{R_{ac}}$)** so với đường tải tĩnh DC!
- Hai điểm cắt trục của đường tải xoay chiều xác định biên độ dao động cực đại không méo xén (*Maximum Peak Compliance*):
  $$I_{c(\text{sat})} = I_{CQ} + \frac{V_{CEQ}}{R_{ac}}, \qquad V_{ce(\text{cutoff})} = V_{CEQ} + I_{CQ} R_{ac}$$
  Để tín hiệu ra đối xứng cực đại mà không bị xén đỉnh ở cả hai phía (Centered Q-point), điểm $Q$ phải thỏa mãn $V_{CEQ} = I_{CQ} R_{ac}$.

### 2. Chứng minh Hiệu suất cực đại lý thuyết ($\eta_{\max}$) của Class A và Class B/AB

- **Khuếch đại Class A (Ghép tụ RC, dẫn $360^\circ$):**
  Công suất một chiều tiêu thụ từ nguồn là không đổi: $P_{DC} = V_{CC} I_{CQ}$. Khi đặt điểm $Q$ chính giữa ($V_{CEQ} = \frac{V_{CC}}{2}$, $I_{CQ} = \frac{V_{CC}}{2 R_C}$), biên độ đỉnh cực đại trên tải là $V_p = \frac{V_{CC}}{2}$ và $I_p = I_{CQ}$. Công suất xoay chiều cực đại ra tải là:
  $$P_{\text{out}(\max)} = V_{\text{rms}} I_{\text{rms}} = \left(\frac{V_p}{\sqrt{2}}\right)\left(\frac{I_p}{\sqrt{2}}\right) = \frac{1}{2} V_p I_p = \frac{1}{2}\left(\frac{V_{CC}}{2}\right) I_{CQ} = \frac{1}{4} V_{CC} I_{CQ}$$
  Suy ra hiệu suất cực đại lý thuyết của Class A ghép RC chỉ đạt:
  $$\boxed{\eta_{\max(\text{Class A - RC})} = \frac{P_{\text{out}(\max)}}{P_{DC}} = \frac{\frac{1}{4} V_{CC} I_{CQ}}{V_{CC} I_{CQ}} = 0.25 = 25\%}$$
  *(Nếu dùng biến áp phối hợp trở kháng ở Collector thì không mất áp DC trên $R_C$, hiệu suất cực đại tăng lên $50\%$).*

- **Khuếch đại Đẩy-Kéo Class B / Class AB (*Push-Pull Complementary Symmetry*, mỗi BJT dẫn $180^\circ$):**
  Mạch dùng cặp Transistor bổ phụ (1 NPN dẫn bán kỳ dương + 1 PNP dẫn bán kỳ âm) với nguồn đơn $V_{CC}$ (điện áp tĩnh điểm giữa là $\frac{V_{CC}}{2}$) hoặc nguồn đôi $\pm V_{CC}$. Xét nguồn đôi $\pm V_{CC}$:
  - Khi biên độ áp ra đạt cực đại $V_p = V_{CC}$ và dòng đỉnh $I_p = \frac{V_{CC}}{R_L}$, công suất xoay chiều trên tải là:
    $$P_{\text{out}(\max)} = \frac{V_p^2}{2 R_L} = \frac{V_{CC}^2}{2 R_L}$$
  - Mỗi nguồn chỉ cấp dòng chỉnh lưu nửa hình sin có giá trị trung bình $I_{\text{AVG}} = \frac{I_p}{\pi} = \frac{V_{CC}}{\pi R_L}$, nên tổng công suất DC tiêu thụ của hai nguồn là:
    $$P_{DC} = 2 \cdot V_{CC} \cdot \left(\frac{V_{CC}}{\pi R_L}\right) = \frac{2 V_{CC}^2}{\pi R_L}$$
  - Hiệu suất cực đại lý thuyết của Class B / AB đạt tới:
    $$\boxed{\eta_{\max(\text{Class B})} = \frac{P_{\text{out}(\max)}}{P_{DC}} = \frac{\frac{V_{CC}^2}{2 R_L}}{\frac{2 V_{CC}^2}{\pi R_L}} = \frac{\pi}{4} \approx 0.7854 = 78.54\%}$$

> **Hiện tượng Méo giao thoa (*Crossover Distortion*) & Giải pháp Phân cực bằng Diode (Class AB):**
> Trong mạch Class B thuần túy ($V_{BEQ} = 0\text{ V}$), trong khoảng tín hiệu vào $-0.7\text{ V} < v_{\text{in}} < +0.7\text{ V}$ cả hai BJT đều ngắt, tạo ra một đoạn "chết" nằm ngang tại điểm giao cắt trục $0\text{ V}$ gọi là **Méo giao thoa**. Để khắc phục, mạch **Class AB** mắc **2 Diode bù nhiệt** ($D_1, D_2$ có cùng đặc tính $0.7\text{ V}$ và hệ số nhiệt $-2\text{ mV/}^\circ\text{C}$) giữa hai cực Base của cặp NPN–PNP để phân cực mồi sẵn cho hai tiếp giáp B-E vừa chạm ngưỡng dẫn ($I_{CQ}$ tĩnh rất nhỏ cỡ vài $\text{mA}$), xóa sạch hoàn toàn méo giao thoa!

---

## 📝 Bài Tập Kiểm Tra Chuyên Sâu Chương 6 & 7

<script setup>
const ch6Questions = [
  {
    q: 'Cho mạch khuếch đại cực phát chung (CE) dùng cầu phân áp có dòng tĩnh I_E = 2.0 mA, R_1 = 33 kΩ, R_2 = 10 kΩ, R_C = 2.2 kΩ, R_E được chia làm hai điện trở nối tiếp: R_E1 = 100 Ω (không có tụ bypass) và R_E2 = 900 Ω (được nối tắt xoay chiều bởi tụ C_E). Biết β_ac = 150 và tải R_L = 2.2 kΩ. Tính điện trở r\'_e, trở vào nhìn từ Base R_in(base) và độ lợi áp A_v:',
    options: [
      'r\'_e = 12.5 Ω ; R_in(base) = 1.875 kΩ ; |A_v| = 88.0 lần',
      'r\'_e = 12.5 Ω ; R_in(base) = 16.875 kΩ ; |A_v| = 9.78 lần',
      'r\'_e = 25.0 Ω ; R_in(base) = 150 kΩ ; |A_v| = 1.10 lần',
      'r\'_e = 12.5 Ω ; R_in(base) = 16.875 kΩ ; |A_v| = 19.56 lần'
    ],
    correctIndex: 1,
    explanation: 'Bước 1: r\'_e = 25 mV / I_E = 25 mV / 2.0 mA = 12.5 Ω.\nBước 2: Vì chỉ có R_E2 bị tụ C_E nối tắt, còn R_E1 = 100 Ω vẫn tham gia mạch xoay chiều (Swamped CE), nên R_in(base) = β_ac · (r\'_e + R_E1) = 150 × (12.5 + 100) = 16,875 Ω = 16.875 kΩ.\nBước 3: Điện trở tải xoay chiều R_c = R_C || R_L = 2.2 kΩ || 2.2 kΩ = 1.1 kΩ = 1100 Ω. Độ lợi áp |A_v| = R_c / (r\'_e + R_E1) = 1100 / 112.5 ≈ 9.78 lần.'
  },
  {
    q: 'Tại sao mạch khuếch đại Cực gốc chung (Common-Base - CB) lại có khả năng hoạt động ở dải tần số cao (RF) vượt trội hơn hẳn so với mạch Cực phát chung (Common-Emitter - CE)?',
    options: [
      'Vì mạch CB có trở kháng ngõ vào lớn hơn mạch CE.',
      'Vì trong mạch CB, cực Base được nối đất xoay chiều nên đóng vai trò màn chắn tĩnh điện cách ly giữa ngõ vào (Emitter) và ngõ ra (Collector), triệt tiêu Hiệu ứng nhân điện dung Miller của tụ ký sinh C_bc!',
      'Vì mạch CB có độ lợi dòng A_i lớn hơn β_ac.',
      'Vì mạch CB đảo pha tín hiệu 180 độ.'
    ],
    correctIndex: 1,
    explanation: 'Ở mạch CE, tụ ký sinh C_bc nằm vắt ngang giữa ngõ vào (Base) và ngõ ra đảo pha (Collector) nên bị nhân lên (A_v + 1) lần theo định lý Miller, làm giảm mạnh tần số cắt trên. Ở mạch CB, cực Base nối đất xoay chiều nên C_bc không còn nối giữa ngõ vào và ngõ ra, giúp tần số cắt trên rất cao.'
  },
  {
    q: 'Trong tầng khuếch đại công suất đẩy-kéo Class AB (Complementary Push-Pull), tại sao hai Diode phân cực D_1, D_2 giữa hai cực Base của cặp BJT công suất luôn phải được gắn sát lên cùng tấm tản nhiệt (Heat sink) với hai Transistor đó?',
    options: [
      'Để làm mát cho hai Diode khỏi bị cháy.',
      'Để tạo khớp nối nhiệt (Thermal tracking): khi BJT công suất nóng lên làm V_BE giảm (-2 mV/°C), hai Diode cùng nóng lên sẽ giảm điện áp phân cực V_F đúng bằng lượng đó, giữ cho dòng tĩnh I_CQ không đổi và ngăn chặn hiện tượng Trôi nhiệt hủy diệt (Thermal Runaway)!',
      'Để tăng hiệu suất vượt quá 100%.',
      'Để biến mạch Class AB thành mạch Class C.'
    ],
    correctIndex: 1,
    explanation: 'Nếu BJT nóng lên mà điện áp giữa hai cực Base giữ cố định, V_BE của BJT giảm (-2 mV/°C) sẽ làm dòng tĩnh I_CQ tăng theo hàm mũ => càng tỏa nhiệt mạnh hơn => gây cháy nổ do Thermal Runaway. Khi gắn 2 Diode lên cùng cánh tản nhiệt với BJT, điện áp thuận của Diode tự động giảm theo nhiệt độ đồng bộ với V_BE, triệt tiêu trôi nhiệt.'
  }
]
</script>

<ActiveRecallQuiz title="Bài Kiểm Tra Học Thuật Chương 6 & 7 (Khuếch Đại Tín Hiệu Nhỏ & Công Suất BJT)" :questions="ch6Questions" />
