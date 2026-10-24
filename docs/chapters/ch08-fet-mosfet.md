---
title: "Chương 8 & 9: Vật Lý Bán Dẫn JFET, MOSFET & Giải Tích Khuếch Đại Trường"
---

# Chương 8 & 9: Vật Lý Transistor Trường (JFET, MOSFET) & Giải Tích Mạch Khuếch Đại

> **Định hướng học thuật:** Chương này phân tích sự khác biệt căn bản về vật lý chất rắn giữa linh kiện **Lưỡng cực (Bipolar - BJT)** và linh kiện **Đơn cực (Unipolar - FET)**: cơ chế thắt kênh dẫn (*Channel Pinch-off*) trong **JFET**, hiệu ứng trường qua lớp điện môi $\text{SiO}_2$ tạo lớp đảo ngược hạt dẫn (*Inversion Layer*) trong **E-MOSFET**, chứng minh phương trình đặc tuyến truyền đạt bậc hai và hỗ dẫn vi phân $g_m = \frac{\partial I_D}{\partial V_{GS}}$.

---

## 8-1. Bản Chất Vật Lý Của Transistor Trường Kênh Tiếp Giáp (JFET)

### 1. Cấu trúc kênh dẫn và Hiện tượng Thắt kênh (*Pinch-Off Phenomenon*)

Một **JFET kênh N (N-channel JFET)** gồm một thanh bán dẫn loại N nối giữa hai cực **Source (S - Cực nguồn)** và **Drain (D - Cực máng)**, ở hai bên sườn được khuếch tán hai miền bán dẫn loại P pha tạp rất đậm ($P^+$) nối chung làm cực **Gate (G - Cực cổng)**:
- Trong điều kiện làm việc bình thường, tiếp giáp P-N giữa Gate và Kênh dẫn **luôn được phân cực ngược ($V_{GS} \le 0\text{ V}$)** và cực Drain được cấp áp dương so với Source ($V_{DS} > 0\text{ V}$).
- Vì tiếp giáp Gate-Source phân cực ngược, dòng điện chạy vào cực Gate chỉ là dòng rò ngược cực nhỏ ($I_{GSS} \sim 10^{-11}\text{ A} \approx 0\text{ A}$), nên **trở kháng ngõ vào của JFET cực kỳ cao ($R_{\text{IN(gate)}} = \left|\frac{V_{GS}}{I_{GSS}}\right| > 10^9\ \Omega$)**.
- **Tại sao vùng nghèo trong kênh dẫn lại có hình cái nêm (rộng hơn ở phía Drain và hẹp hơn ở phía Source)?**
  Khi có dòng electron chạy dọc kênh từ Source ($V_S = 0\text{ V}$) lên Drain ($V_D = V_{DS} > 0\text{ V}$), điện thế dọc theo kênh tăng dần từ $0\text{ V}$ ở Source lên $V_{DS}$ ở Drain. Do đó, hiệu điện thế phân cực ngược giữa Gate và Kênh tại phía gần Drain là $V_{GD} = V_{DS} - V_{GS}$, lớn hơn hiệu điện thế ngược tại phía Source ($|V_{GS}|$). Theo phương trình Poisson ($W \propto \sqrt{V_B + V_R}$), **vùng nghèo ở phía gần Drain nở rộng mạnh hơn phía Source**!
- **Điện áp thắt kênh ($V_P$ - Pinch-Off Voltage) và Điện áp khóa kênh ($V_{GS(\text{off})}$):**
  - Khi giữ $V_{GS} = 0\text{ V}$ và tăng dần $V_{DS}$: lúc đầu kênh dẫn hoạt động như một điện trở tuyến tính (**Miền Ohmic**). Khi $V_{DS}$ tăng đạt tới giá trị **Điện áp thắt kênh $V_P$**, hai vùng nghèo hai bên chạm nhau tại đầu phía Drain, làm tiết diện kênh bị thắt lại và dòng cực máng bước vào **Miền bão hòa dòng không đổi (Constant-Current / Active Region)** đạt giá trị cực đại $I_{DSS}$ (*Drain-to-Source current with Gate Shorted*).
  - Ngược lại, nếu giảm $V_{GS}$ về phía âm đến khi vùng nghèo choán kín hoàn toàn kênh dẫn ngay cả khi $V_{DS} = 0$, dòng $I_D$ giảm về $0\text{ A}$. Mức điện áp $V_{GS}$ đó gọi là **Điện áp khóa kênh ($V_{GS(\text{off})}$)**. Về mặt độ lớn vật lý, hai đại lượng này luôn bằng nhau và trái dấu:
    $$\boxed{|V_{GS(\text{off})}| = |V_P|} \quad (\text{Với JFET kênh N: } V_P > 0, \ V_{GS(\text{off})} = -V_P < 0)$$

### 2. Phương trình truyền đạt bình phương của Shockley (*Shockley's Square-Law Equation*)

Trong miền bão hòa (khi $V_{DS} \ge V_P - |V_{GS}|$), quan hệ giữa dòng ngõ ra $I_D$ và điện áp điều khiển ngõ vào $V_{GS}$ tuân theo luật bình phương của William Shockley:

$$\boxed{I_D = I_{DSS}\left(1 - \frac{V_{GS}}{V_{GS(\text{off})}}\right)^2}$$

> **Ba điểm đặc biệt để vẽ nhanh Parabol truyền đạt của JFET và D-MOSFET:**
> 1. Tại $V_{GS} = 0\text{ V} \implies I_D = I_{DSS}$.
> 2. Tại $V_{GS} = V_{GS(\text{off})} \implies I_D = 0\text{ A}$.
> 3. Tại điểm giữa $V_{GS} = 0.5\, V_{GS(\text{off})} \implies I_D = I_{DSS}(1 - 0.5)^2 = 0.25\, I_{DSS} = \frac{I_{DSS}}{4}$.
> 4. Tại $V_{GS} = 0.3\, V_{GS(\text{off})} \implies I_D = I_{DSS}(1 - 0.3)^2 = 0.49\, I_{DSS} \approx \frac{I_{DSS}}{2}$.

---

## 8-2. Vật Lý Cấu Trúc MOS (Metal-Oxide-Semiconductor): D-MOSFET vs. E-MOSFET

Trong **MOSFET**, cực cổng kim loại hoặc Polysilicon (**Gate**) được cách điện hoàn toàn khỏi kênh bán dẫn bởi một lớp màng mỏng **Silicon Dioxide ($\text{SiO}_2$)** có chiều dày $t_{\text{ox}}$ chỉ vài nanomet, tạo thành một tụ điện phẳng MOS có điện dung đơn vị diện tích $C_{\text{ox}} = \frac{\varepsilon_{\text{ox}}}{t_{\text{ox}}}$. Vì có lớp cách điện $\text{SiO}_2$, dòng cực cổng $I_G = 0\text{ A}$ ở cả hai chiều điện áp $V_{GS}$ âm và dương!

| Tiêu chí so sánh | 1. D-MOSFET (*Depletion-Enhancement MOSFET*) | 2. E-MOSFET (*Enhancement-Only MOSFET - Kênh cảm ứng*) |
| :--- | :--- | :--- |
| **Cấu trúc kênh dẫn vật lý khi $V_{GS} = 0\text{ V}$** | **Đã có sẵn kênh dẫn vật lý** nối liền giữa Drain và Source ngay từ khi chế tạo $\implies$ Là linh kiện **Thường đóng (Normally-ON)**: tại $V_{GS} = 0\text{ V}$ vẫn có dòng $I_D = I_{DSS}$ chạy qua! | **Hoàn toàn KHÔNG có kênh dẫn vật lý** khi $V_{GS} = 0\text{ V}$ (giữa Drain $N^+$ và Source $N^+$ là đế bán dẫn loại $P$ tạo thành 2 tiếp giáp P-N mắc ngược chiều nhau) $\implies$ Là linh kiện **Thường mở (Normally-OFF)**: $I_D = 0\text{ A}$ khi $V_{GS} < V_{GS(\text{th})}$. |
| **Cơ chế điều khiển điện trường (Field Effect)** | • Khi $V_{GS} < 0$ (**Chế độ nghèo - Depletion mode**): Đẩy bớt electron khỏi kênh làm $I_D < I_{DSS}$.<br/>• Khi $V_{GS} > 0$ (**Chế độ giàu - Enhancement mode**): Hút thêm electron vào kênh làm $I_D > I_{DSS}$. | Khi đặt $V_{GS} > 0$ vượt quá **Điện áp ngưỡng ($V_{GS(\text{th})}$ - Threshold Voltage)**, điện trường xuyên qua lớp $\text{SiO}_2$ đẩy lỗ trống của đế $P$ ra xa và hút các electron thiểu số tụ tập sát bề mặt dưới lớp oxit tạo thành **Lớp đảo ngược loại N (*N-type Inversion Layer*)** nối thông Source và Drain! |
| **Phương trình truyền đạt trong vùng bão hòa** | Tuân theo đúng phương trình Shockley như JFET:<br/>$I_D = I_{DSS}\left(1 - \frac{V_{GS}}{V_{GS(\text{off})}}\right)^2$ | Tuân theo phương trình bậc hai kênh cảm ứng:<br/>$I_D = K \left(V_{GS} - V_{GS(\text{th})}\right)^2$ |
| **Cách xác định hằng số từ Datasheet** | Đọc trực tiếp $I_{DSS}$ và $V_{GS(\text{off})}$ từ Datasheet. | Tính hệ số $K$ (đơn vị $\text{A/V}^2$ hoặc $\text{mA/V}^2$) từ một điểm đo chuẩn $\left(V_{GS(\text{on})}, I_{D(\text{on})}\right)$ trên Datasheet:<br/>$K = \frac{I_{D(\text{on})}}{\left(V_{GS(\text{on})} - V_{GS(\text{th})}\right)^2}$ |

---

## Chương 9. Hỗ Dẫn Vi Phân $g_m$ & Giải Tích Khuếch Đại Xoay Chiều FET

### 1. Chứng minh công thức Hỗ dẫn truyền đạt ($g_m$ - Forward Transconductance)

Vì FET là linh kiện **nguồn dòng điều khiển bằng điện áp (Voltage-Controlled Current Source: $i_d = g_m v_{gs}$)**, tham số tín hiệu nhỏ quan trọng nhất của FET là độ dốc tiếp tuyến của đặc tuyến truyền đạt tại điểm tĩnh $Q$:

- **Đối với JFET và D-MOSFET:** Lấy đạo hàm phương trình Shockley theo $V_{GS}$:
  $$g_m = \left.\frac{dI_D}{dV_{GS}}\right|_Q = \frac{d}{dV_{GS}}\left[I_{DSS}\left(1 - \frac{V_{GS}}{V_{GS(\text{off})}}\right)^2\right] = -\frac{2 I_{DSS}}{V_{GS(\text{off})}}\left(1 - \frac{V_{GS}}{V_{GS(\text{off})}}\right)$$
  Đặt hỗ dẫn tại $V_{GS} = 0\text{ V}$ là $g_{m0} = \frac{2 I_{DSS}}{|V_{GS(\text{off})}|}$ (trên Datasheet thường ký hiệu là $y_{fs0}$), ta thu được công thức trong sách Floyd:
  $$\boxed{g_m = g_{m0}\left(1 - \frac{V_{GS}}{V_{GS(\text{off})}}\right) \quad \text{với} \quad g_{m0} = \frac{2 I_{DSS}}{|V_{GS(\text{off})}|}}$$

- **Đối với E-MOSFET:** Lấy đạo hàm phương trình $I_D = K\left(V_{GS} - V_{GS(\text{th})}\right)^2$ theo $V_{GS}$:
  $$\boxed{g_m = \left.\frac{dI_D}{dV_{GS}}\right|_Q = 2 K \left(V_{GS} - V_{GS(\text{th})}\right) = 2\sqrt{K \cdot I_{DQ}}}$$

### 2. Bảng Đối Chiếu Giải Tích 3 Cấu Hình Khuếch Đại FET (CS, CD, CG)

| Cấu hình khuếch đại FET | Tương ứng bên BJT | Độ lợi điện áp xoay chiều $A_v$ | Trở kháng vào $R_{\text{in}}$ & Trở kháng ra $R_{\text{out}}$ |
| :--- | :--- | :--- | :--- |
| **1. Cực nguồn chung (*Common-Source - CS*)** | Cực phát chung (CE) | • Có tụ thoát $C_S$ nối tắt $R_S$:<br/>$A_v = -g_m R_d \quad (R_d = R_D \parallel R_L)$<br/>• Không có tụ $C_S$ (Có $R_S$ gây hồi tiếp âm):<br/>$A_v = -\frac{g_m R_d}{1 + g_m R_S}$ *(Đảo pha $180^\circ$)* | • Phân cực tự cấp (*Self-bias*): $R_{\text{in}} \approx R_G$<br/>• Phân cực cầu phân áp: $R_{\text{in}} = R_1 \parallel R_2$<br/>• $R_{\text{out}} \approx R_D$ |
| **2. Cực máng chung (*Common-Drain / Source-Follower - CD*)** | Cực góp chung (CC / Emitter-Follower) | $A_v = \frac{g_m R_s}{1 + g_m R_s} < 1 \quad (R_s = R_S \parallel R_L)$<br/>*(Đồng pha $0^\circ$, xấp xỉ bằng $1$ khi $g_m R_s \gg 1$)* | $R_{\text{in}} \approx R_G$ (Rất lớn, cỡ $\text{M}\Omega$)<br/>$R_{\text{out}} = R_S \parallel \left(\frac{1}{g_m}\right)$ (Rất nhỏ!) |
| **3. Cực cổng chung (*Common-Gate - CG*)** | Cực gốc chung (CB) | $A_v = +g_m R_d$<br/>*(Đồng pha $0^\circ$)* | $R_{\text{in(source)}} = \frac{1}{g_m}$ (Trở vào thấp, dùng phối hợp cáp đồng trục cao tần $50\ \Omega / 75\ \Omega$!) |

---

## 📝 Bài Tập Kiểm Tra Chuyên Sâu Chương 8 & 9

<script setup>
const ch8Questions = [
  {
    q: 'Một JFET kênh N có dòng bão hòa I_DSS = 12 mA và điện áp khóa kênh V_GS(off) = -4 V được mắc trong mạch Tự phân cực (Self-Bias, cực Gate nối đất qua R_G = 10 MΩ nên V_G = 0 V). Biết tại điểm làm việc Q người ta đo được V_GS = -1.5 V. Giá trị dòng I_D, điện trở cực nguồn R_S cần thiết và hỗ dẫn xoay chiều g_m tại điểm Q lần lượt là bao nhiêu?',
    options: [
      'I_D = 4.6875 mA ; R_S = 320 Ω ; g_m = 3.75 mS',
      'I_D = 6.00 mA ; R_S = 250 Ω ; g_m = 6.00 mS',
      'I_D = 4.6875 mA ; R_S = 125 Ω ; g_m = 1.875 mS',
      'I_D = 3.00 mA ; R_S = 500 Ω ; g_m = 3.00 mS'
    ],
    correctIndex: 0,
    explanation: 'Bước 1: Theo phương trình Shockley: I_D = I_DSS · (1 - V_GS / V_GS(off))^2 = 12 mA × (1 - (-1.5 / -4))^2 = 12 × (0.625)^2 = 4.6875 mA.\nBước 2: Trong mạch tự phân cực (Self-bias), V_GS = -I_D · R_S => R_S = |V_GS| / I_D = 1.5 V / 4.6875 mA = 320 Ω.\nBước 3: Hỗ dẫn cực đại g_m0 = 2·I_DSS / |V_GS(off)| = 24 mA / 4 V = 6.0 mS. Tại điểm Q: g_m = g_m0 · (1 - V_GS / V_GS(off)) = 6.0 mS × 0.625 = 3.75 mS.'
  },
  {
    q: 'Một E-MOSFET kênh N có thông số trên Datasheet là: I_D(on) = 500 mA tại V_GS = 10 V và điện áp ngưỡng mở kênh V_GS(th) = 3 V. Khi phân cực E-MOSFET này tại V_GS = 6 V trong miền bão hòa thì dòng cực máng I_D bằng bao nhiêu?',
    options: ['I_D ≈ 91.84 mA', 'I_D ≈ 250.0 mA', 'I_D ≈ 10.20 mA', 'I_D = 0 mA'],
    correctIndex: 0,
    explanation: 'Bước 1: Tìm hằng số K = I_D(on) / (V_GS(on) - V_GS(th))^2 = 500 mA / (10 V - 3 V)^2 = 500 / 49 ≈ 10.204 mA/V^2.\nBước 2: Tại V_GS = 6 V: I_D = K · (V_GS - V_GS(th))^2 = 10.204 × (6 - 3)^2 = 10.204 × 9 ≈ 91.84 mA.'
  },
  {
    q: 'Tại sao linh kiện E-MOSFET tuyệt đối KHÔNG THỂ sử dụng mạch Tự phân cực (Self-Bias với V_G = 0 V và điện trở R_S nối đất) như JFET hay D-MOSFET?',
    options: [
      'Vì dòng cực Gate của E-MOSFET quá lớn làm cháy điện trở R_G.',
      'Vì E-MOSFET là linh kiện thường mở (Normally-OFF) chỉ dẫn khi |V_GS| > |V_GS(th)|. Nếu V_G = 0 V và chưa có dòng I_D chạy qua R_S thì V_GS = 0 V < V_GS(th) nên kênh cảm ứng không bao giờ được hình thành!',
      'Vì E-MOSFET không có cực Source.',
      'Vì lớp oxit SiO2 bị đánh thủng khi V_G = 0 V.'
    ],
    correctIndex: 1,
    explanation: 'Mạch Self-Bias dựa trên việc có dòng I_D chạy qua R_S ngay tại V_GS = 0 V để tự tạo ra áp V_GS = -I_D·R_S. Nhưng với E-MOSFET, tại V_GS = 0 V hoàn toàn chưa có kênh dẫn (I_D = 0) nên bắt buộc phải dùng mạch phân cực cầu phân áp hoặc hồi tiếp cực máng để cấp V_GS > V_GS(th).'
  }
]
</script>

<ActiveRecallQuiz title="Bài Kiểm Tra Học Thuật Chương 8 & 9 (Vật Lý JFET, MOSFET & Khuếch Đại Trường)" :questions="ch8Questions" />
