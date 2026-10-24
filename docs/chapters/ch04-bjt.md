---
title: "Chương 4 & 5: Vật Lý Transistor BJT, Hiệu Ứng Early & Giải Tích Phân Cực (Chuyên Sâu)"
---

# Chương 4 & 5: Vật Lý Bán Dẫn Transistor Lưỡng Cực (BJT) & Giải Tích Mạch Phân Cực

> **Định hướng học thuật:** Trong giáo trình cơ bản, công thức $I_C = \beta_{DC} I_B$ thường được đưa ra như một tiên đề thực nghiệm. Chương này sẽ đi sâu vào **cơ chế khuếch tán hạt dẫn thiểu số qua cấu trúc 3 miền N-P-N**, chứng minh toán học vì sao $\beta_{DC}$ phụ thuộc vào tỷ số pha tạp $\frac{N_E}{N_B}$ và bình phương bề rộng miền gốc $\frac{W_B^2}{2 L_{nB}^2}$, giải thích **Hiệu ứng Early (Base-Width Modulation)**, và dùng **Định lý Thevenin** để giải tích chính xác độ ổn định của các mạch phân cực ở Chương 5.

---

## 4-1. Vật Lý Vận Chuyển Hạt Dẫn Trong BJT & Nguồn Gốc Của Hệ Số Khuếch Đại β_DC

### 1. Cấu trúc bất đối xứng của 3 miền bán dẫn trong BJT (Xét cấu trúc NPN)

Một Transistor lưỡng cực ($N^+ \text{-} P \text{-} N$) không phải là hai Diode rời ghép lưng vào nhau! Để có tác dụng transistor (*Transistor Action* — sự truyền dòng điện từ miền trở kháng thấp sang miền trở kháng cao), ba miền bán dẫn phải tuân thủ nghiêm ngặt quy luật phân bố nồng độ pha tạp và kích thước hình học:

1. **Miền Phát (*Emitter - $N^+$*):** Được pha tạp **đậm đặc nhất** ($N_E \sim 10^{19}\text{ cm}^{-3}$).
2. **Miền Gốc (*Base - $P$*):** Được pha tạp **nhẹ hơn rất nhiều so với Emitter** ($N_B \sim 10^{16}\text{–}10^{17}\text{ cm}^{-3}$) và có bề rộng trung hòa $W_B$ **cực kỳ mỏng** ($W_B \sim 0.1 \to 1\ \mu\text{m}$, nhỏ hơn rất nhiều so với chiều dài khuếch tán của electron trong miền gốc $L_{nB} = \sqrt{D_{nB}\tau_{nB}}$).
3. **Miền Góp (*Collector - $N$*):** Được pha tạp **nhẹ nhất** ($N_C \sim 10^{15}\text{ cm}^{-3}$) để tăng điện áp đánh thủng ngược $BV_{CBO}$ và giảm điện dung ký sinh $C_{bc}$, đồng thời có diện tích tiếp xúc lớn nhất để giải nhiệt công suất $P_D = V_{CE} I_C$.

### 2. Phân tích định lượng các thành phần dòng điện ở chế độ Khuếch đại thuận (Forward-Active Mode)

Khi tiếp giáp Phát-Gốc ($J_E$) được phân cực thuận ($V_{BE} > 0$) và tiếp giáp Gốc-Góp ($J_C$) được phân cực ngược ($V_{CB} > 0$):

- **Tại tiếp giáp $J_E$ (Phân cực thuận):**
  Có hai dòng hạt dẫn cùng vượt qua rào thế $J_E$:
  1. Dòng electron $I_{nE}$ được tiêm từ Emitter ($N^+$) vào miền Base ($P$).
  2. Dòng lỗ trống $I_{pE}$ được tiêm ngược từ Base ($P$) sang Emitter ($N^+$) — đây là thành phần dòng "lãng phí" vì không đóng góp vào dòng cực góp $I_C$.
  Tổng dòng cực phát là:
  $$I_E = I_{nE} + I_{pE}$$
  Tỷ số giữa dòng hạt dẫn có ích $I_{nE}$ trên tổng dòng cực phát $I_E$ được gọi là **Hiệu suất tiêm cực phát (Emitter Injection Efficiency $\gamma$)**:
  $$\boxed{\gamma = \frac{I_{nE}}{I_{nE} + I_{pE}} = \frac{1}{1 + \frac{I_{pE}}{I_{nE}}} = \frac{1}{1 + \frac{D_{pE} N_B W_B}{D_{nB} N_E L_{pE}}}}$$
  > **Hệ quả vật lý 1:** Nhìn vào mẫu số của $\gamma$, để hiệu suất tiêm đạt sát mức lý tưởng ($\gamma \to 1$, tức hầu như chỉ có electron phun từ E sang B chứ không có lỗ trống phun ngược từ B sang E), nhà chế tạo bắt buộc phải làm **$N_E \gg N_B$** (Emitter pha tạp đậm hơn Base hàng trăm lần)!

- **Bên trong miền Base mỏng ($0 \le x \le W_B$):**
  Tại biên $x = 0$ (sát $J_E$), nồng độ electron thiểu số tăng vọt lên $n_B(0) = n_{B0} \exp\left(\frac{V_{BE}}{V_T}\right)$. Tại biên $x = W_B$ (sát vùng nghèo $J_C$ đang phân cực ngược), mọi electron chạm tới đây đều bị điện trường rất mạnh của $J_C$ cuốn phăng sang Collector nên nồng độ tại biên này tụt về $n_B(W_B) \approx 0$.
  Vì miền Base rất mỏng ($W_B \ll L_{nB}$), phân bố nồng độ electron $n_B(x)$ trong miền Base giảm gần như **tuyến tính (đường thẳng)** từ $n_B(0)$ xuống $0$, tạo ra gradien khuếch tán rất lớn:
  $$I_C \approx I_{nC} = q A D_{nB} \left|\frac{dn_B}{dx}\right| \approx \frac{q A D_{nB} n_{B0}}{W_B} \exp\left(\frac{V_{BE}}{V_T}\right) = \boxed{I_S \exp\left(\frac{V_{BE}}{V_T}\right)}$$
  với $I_S = \frac{q A D_{nB} n_i^2}{N_B W_B}$ (trong đó tích số $Q_B = N_B W_B$ là tổng số nguyên tử tạp chất trên một đơn vị diện tích miền Base, gọi là **Số Gummel - Gummel Number**).

- **Hệ số truyền vận qua miền gốc (*Base Transport Factor $\alpha_T$*):**
  Một phần rất nhỏ electron trên đường khuếch tán qua miền Base có bề rộng $W_B$ bị tái hợp với lỗ trống đa số (với thời gian sống $\tau_{nB}$), đòi hỏi cực Base phải cấp bù một dòng tái hợp $I_{B,\text{rec}} = I_{nE} - I_{nC}$. Tỷ số electron sống sót tới được Collector là:
  $$\boxed{\alpha_T = \frac{I_{nC}}{I_{nE}} = \frac{1}{\cosh(W_B / L_{nB})} \approx 1 - \frac{W_B^2}{2 L_{nB}^2} = 1 - \frac{W_B^2}{2 D_{nB} \tau_{nB}}}$$
  > **Hệ quả vật lý 2:** Để $\alpha_T \to 1$ (giảm thiểu tái hợp ở Base), bề rộng miền gốc $W_B$ phải **cực kỳ mỏng** so với chiều dài khuếch tán $L_{nB}$!

- **Tổng hợp lại thành $\alpha_{DC}$ và $\beta_{DC}$ của sách Floyd:**
  Hệ số truyền đạt dòng cực phát – cực góp ($\alpha_{DC}$) là tích của hai hiệu suất vật lý trên:
  $$\boxed{\alpha_{DC} = \frac{I_C}{I_E} = \gamma \cdot \alpha_T \approx \left(1 + \frac{D_{pE} N_B W_B}{D_{nB} N_E L_{pE}} + \frac{W_B^2}{2 L_{nB}^2}\right)^{-1}}$$
  Vì $I_B = I_E - I_C = (1 - \alpha_{DC}) I_E$, ta suy ra biểu thức vật lý của **Hệ số khuếch đại dòng một chiều ($\beta_{DC}$)**:
  $$\boxed{\beta_{DC} = \frac{I_C}{I_B} = \frac{\alpha_{DC}}{1 - \alpha_{DC}} \approx \left(\frac{D_{pE} N_B W_B}{D_{nB} N_E L_{pE}} + \frac{W_B^2}{2 L_{nB}^2}\right)^{-1}}$$

---

## 4-2. Dòng Rò Ngược I_CBO, I_CEO & Hiệu Ứng Early (Base-Width Modulation)

### 1. Tại sao dòng rò khi hở Base (I_CEO) lại lớn gấp (β_DC + 1) lần dòng rò I_CBO?

Khi xét cả dòng rò ngược do hạt dẫn thiểu số sinh nhiệt tại tiếp giáp Base-Collector ($I_{CBO}$ — dòng từ C sang B khi Emitter để hở $I_E = 0$), phương trình tổng quát của dòng Collector là:

$$I_C = \alpha_{DC} I_E + I_{CBO}$$

Thay $I_E = I_C + I_B$ vào phương trình trên và rút $I_C$ theo $I_B$:

$$I_C(1 - \alpha_{DC}) = \alpha_{DC} I_B + I_{CBO} \implies \boxed{I_C = \beta_{DC} I_B + (\beta_{DC} + 1) I_{CBO} = \beta_{DC} I_B + I_{CEO}}$$

trong đó $I_{CEO} = (\beta_{DC} + 1) I_{CBO}$ là dòng rò từ Collector sang Emitter khi để hở cực Base ($I_B = 0$). Vì dòng rò $I_{CBO}$ chảy qua miền Base làm phân cực thuận nhẹ tiếp giáp B-E, chính bản thân BJT đã tự khuếch đại dòng rò đó lên $(\beta_{DC} + 1)$ lần!

### 2. Hiệu ứng điều biến bề rộng miền gốc (*Hiệu ứng Early - Base-Width Modulation*)

Trong Mục 4-3 sách Floyd, trên họ đặc tuyến ra $I_C\text{–}V_{CE}$ (ứng với các mức $I_B$ không đổi), tại sao trong vùng Active khi tăng $V_{CE}$ thì dòng $I_C$ không giữ phẳng tuyệt đối mà lại hơi tăng tuyến tính?
- Khi $V_{CE}$ tăng, điện áp phân cực ngược trên tiếp giáp Base-Collector ($V_{CB} = V_{CE} - V_{BE}$) tăng lên $\implies$ vùng nghèo của tiếp giáp B-C nở rộng ra và **ăn lấn sâu vào miền Base**!
- Hệ quả là **bề rộng hiệu dụng của miền Base trung hòa $W_B$ bị thu hẹp lại** khi $V_{CE}$ tăng (hiện tượng này do James M. Early phát hiện năm 1952, gọi là *Hiệu ứng Early*).
- Khi $W_B$ giảm xuống:
  1. Gradien nồng độ $\frac{n_B(0)}{W_B}$ dốc hơn $\implies$ dòng khuếch tán $I_C \propto \frac{1}{W_B}$ tăng lên.
  2. Tái hợp trong miền Base giảm ($\alpha_T = 1 - \frac{W_B^2}{2L_{nB}^2}$ tăng) $\implies$ $\beta_{DC}$ tăng theo $V_{CE}$.
- Nếu kéo dài các đường thẳng đặc tuyến trong miền Active về phía trục âm của $V_{CE}$, chúng đồng quy tại một điểm duy nhất gọi là **Điện áp Early ($-V_A$, thường $V_A \sim 50\text{ V} \to 150\text{ V}$)**:

$$\boxed{I_C = I_S \exp\left(\frac{V_{BE}}{V_T}\right)\left(1 + \frac{V_{CE}}{V_A}\right)}$$

Độ dốc này sinh ra **Điện trở ngõ ra tín hiệu nhỏ ($r_o$ hay $r'_c$)** của BJT:

$$r_o = \left(\frac{\partial I_C}{\partial V_{CE}}\right)^{-1}_{I_B = \text{const}} \approx \frac{V_A}{I_{CQ}}$$

### 🎛️ Thực Hành Ngay: Khảo Sát Đường Tải Tĩnh DC & 3 Miền Hoạt Động Của BJT

<BjtLoadLineSim />

---

## Chương 5. Giải Tích Thevenin Cho Mạch Phân Cực BJT & Độ Ổn Định Nhiệt

### 1. Giải tích chính xác Mạch Phân Cực Cầu Phân Áp (*Voltage-Divider Bias*) bằng Định lý Thevenin

Xét mạch phân cực cầu phân áp gồm $R_1$ (nối từ $V_{CC}$ xuống Base), $R_2$ (nối từ Base xuống đất), $R_C$ ở Collector và $R_E$ ở Emitter. Thay vì chỉ dùng công thức xấp xỉ gần đúng, cách giải tổng quát và chính xác tuyệt đối cho mọi giá trị điện trở là **biến đổi Thevenin mạng phân áp $(V_{CC}, R_1, R_2)$ nhìn từ cực Base ra ngoài**:

1. **Điện áp Thevenin ($V_{TH}$) và Điện trở Thevenin ($R_{TH}$):**
   $$V_{TH} = \left(\frac{R_2}{R_1 + R_2}\right) V_{CC}, \qquad R_{TH} = R_1 \parallel R_2 = \frac{R_1 R_2}{R_1 + R_2}$$
2. **Phương trình Kirchhoff (KVL) cho vòng Base – Emitter:**
   $$V_{TH} - I_B R_{TH} - V_{BE} - I_E R_E = 0$$
   Thay $I_B = \frac{I_E}{\beta_{DC} + 1} \approx \frac{I_E}{\beta_{DC}}$ vào phương trình trên, ta giải ra biểu thức chính xác của dòng cực phát $I_E$:
   $$\boxed{I_E = \frac{V_{TH} - V_{BE}}{R_E + \frac{R_{TH}}{\beta_{DC}}}}$$
3. **Chứng minh điều kiện "Cầu phân áp cứng" (*Stiff Voltage Divider*) của sách Floyd:**
   Nhìn vào mẫu số $R_E + \frac{R_{TH}}{\beta_{DC}}$: Để dòng tĩnh $I_E$ (và $I_C \approx I_E$) **hoàn toàn không phụ thuộc vào sự thay đổi của $\beta_{DC}$** (khi thay thế Transistor khác hoặc khi nhiệt độ tăng làm $\beta_{DC}$ tăng vọt), số hạng $\frac{R_{TH}}{\beta_{DC}}$ phải rất nhỏ so với $R_E$ (thường chọn nhỏ hơn ít nhất $10$ lần):
   $$\frac{R_{TH}}{\beta_{DC}} \le 0.1 R_E \iff \boxed{R_{\text{IN(base)}} = \beta_{DC} R_E \ge 10 R_{TH} \quad (\text{hoặc } \beta_{DC} R_E \ge 10 R_2)}$$
   Khi điều kiện này thỏa mãn, ta được phép dùng công thức xấp xỉ nhanh:
   $$V_B \approx V_{TH} = \left(\frac{R_2}{R_1 + R_2}\right) V_{CC}, \qquad V_E = V_B - 0.7\text{ V}, \qquad I_C \approx I_E = \frac{V_E}{R_E}$$

### 2. Bảng Đối Chiếu Giải Tích 4 Mạch Phân Cực BJT (Chương 5 Sách Floyd)

| Cấu hình mạch phân cực | Phương trình giải tích chính xác dòng $I_C$ | Cơ chế vật lý ổn định nhiệt & Phạm vi ứng dụng |
| :--- | :--- | :--- |
| **1. Cầu phân áp (*Voltage-Divider Bias*)** | $I_C \approx \frac{V_{TH} - V_{BE}}{R_E + R_{TH} / \beta_{DC}}$ | **Ổn định nhiệt tốt nhất với 1 nguồn đơn:** Nhờ hồi tiếp âm một chiều qua điện trở $R_E$: nếu nhiệt độ $T \uparrow \implies I_C \uparrow \implies V_E = I_E R_E \uparrow \implies V_{BE} = V_B - V_E \downarrow \implies I_B \downarrow \implies$ kéo $I_C$ giảm trở lại! |
| **2. Phân cực Emitter hai nguồn (*Emitter Bias*)** | $I_C \approx \frac{V_{EE} - V_{BE}}{R_E + R_B / \beta_{DC}}$ | Cực Base nối đất qua $R_B$ rất nhỏ, nguồn âm $-V_{EE}$ cấp trực tiếp vào $R_E$ nên độ ổn định đối với $\beta_{DC}$ cực cao mà không tốn cầu phân áp $R_1, R_2$. |
| **3. Hồi tiếp Collector (*Collector-Feedback Bias*)** | $I_C = \frac{V_{CC} - V_{BE}}{R_C + R_B / \beta_{DC}}$ | Điện trở $R_B$ nối từ Collector về Base tạo hồi tiếp âm điện áp: nếu $T \uparrow \implies I_C \uparrow \implies V_C = V_{CC} - I_C R_C \downarrow \implies I_B = \frac{V_C - V_{BE}}{R_B} \downarrow \implies$ kìm hãm sự tăng của $I_C$. |
| **4. Phân cực cố định dòng Base (*Base Bias*)** | $I_C = \beta_{DC} \left(\frac{V_{CC} - V_{BE}}{R_B}\right)$ | **Hoàn toàn không có hồi tiếp âm!** Điểm $Q$ trôi tỷ lệ thuận $1:1$ theo $\beta_{DC}$. Tuyệt đối không dùng cho khuếch đại tuyến tính; chỉ dùng cho mạch đóng cắt số (*Switch*). |

---

## 📝 Bài Tập Kiểm Tra Chuyên Sâu Chương 4 & 5

<script setup>
const ch4Questions = [
  {
    q: 'Dưới góc độ vật lý bán dẫn, hai điều kiện thiết kế cốt lõi nào giúp một BJT đạt được hệ số khuếch đại dòng một chiều β_DC rất lớn (β_DC >> 1)?',
    options: [
      'Miền Base phải dày hơn miền Collector và pha tạp đậm hơn miền Emitter.',
      'Nồng độ pha tạp Emitter phải lớn hơn rất nhiều so với Base (N_E >> N_B để hiệu suất tiêm γ → 1) VÀ bề rộng miền Base phải nhỏ hơn rất nhiều so với chiều dài khuếch tán (W_B << L_nB để hệ số truyền vận α_T → 1).',
      'Cả 3 miền Emitter, Base, Collector phải được pha tạp bằng nhau.',
      'Tiếp giáp Base-Collector phải được phân cực thuận.'
    ],
    correctIndex: 1,
    explanation: 'Ta có α_DC = γ · α_T. Muốn β_DC = α_DC / (1 - α_DC) lớn thì α_DC phải tiến sát tới 1: đòi hỏi N_E >> N_B (để γ → 1, ngăn dòng lỗ trống phun ngược từ B sang E) và W_B << L_nB (để α_T → 1, giảm thiểu tái hợp trong miền Base).'
  },
  {
    q: 'Hiện tượng vật lý nào gây ra Hiệu ứng Early (làm dòng I_C tăng nhẹ khi tăng điện áp V_CE trong vùng Active)?',
    options: [
      'Do nhiệt độ môi trường bên ngoài giảm xuống.',
      'Do khi tăng V_CE (tăng áp ngược V_CB), vùng nghèo của tiếp giáp Base-Collector nở rộng lấn sâu vào miền Base làm thu hẹp bề rộng trung hòa hiệu dụng W_B.',
      'Do tiếp giáp Base-Emitter bị đánh thủng Zener.',
      'Do điện trở R_C bên ngoài bị giảm giá trị.'
    ],
    correctIndex: 1,
    explanation: 'Khi V_CB tăng, vùng nghèo B-C mở rộng vào miền Base pha tạp nhẹ làm W_B giảm (Base-Width Modulation). Vì I_C tỉ lệ nghịch với W_B (do độ dốc khuếch tán dn/dx = n_B(0)/W_B tăng), nên I_C tăng tuyến tính theo hệ số (1 + V_CE / V_A).'
  },
  {
    q: 'Cho mạch phân cực cầu phân áp (Voltage-Divider Bias) có V_CC = 15 V, R_1 = 68 kΩ, R_2 = 33 kΩ, R_C = 2.2 kΩ, R_E = 1.0 kΩ và BJT có β_DC = 50 (Lưu ý: β_DC·R_E = 50 kΩ KHÔNG lớn hơn 10·R_2 = 330 kΩ nên phải giải chính xác bằng định lý Thevenin!). Điện áp Thevenin V_TH, điện trở R_TH và dòng I_E chính xác là bao nhiêu?',
    options: [
      'V_TH = 4.90 V ; R_TH = 22.22 kΩ ; I_E ≈ 4.20 mA (dùng xấp xỉ cầu cứng sai)',
      'V_TH = 4.90 V ; R_TH = 22.22 kΩ ; I_E ≈ 2.91 mA (giải chính xác bằng Thevenin)',
      'V_TH = 7.50 V ; R_TH = 50.5 kΩ ; I_E ≈ 3.38 mA',
      'V_TH = 4.90 V ; R_TH = 101 kΩ ; I_E ≈ 1.39 mA'
    ],
    correctIndex: 1,
    explanation: 'Ta có V_TH = [33 / (68 + 33)] × 15 V = 4.901 V; R_TH = (68 × 33) / (68 + 33) = 22.22 kΩ. Vì β_DC·R_E = 50 kΩ < 10·R_2, ta phải kể đến sụt áp trên R_TH: I_E = (V_TH - 0.7 V) / (R_E + R_TH / β_DC) = (4.901 - 0.7) / (1.0 kΩ + 22.22 kΩ / 50) = 4.201 V / 1.444 kΩ ≈ 2.91 mA.'
  },
  {
    q: 'Một BJT có hệ số α_DC = 0.992 và dòng rò ngược tiếp giáp C-B khi hở Emitter là I_CBO = 50 nA. Hệ số khuếch đại β_DC và dòng rò I_CEO khi để hở cực Base (I_B = 0) của BJT này lần lượt là bao nhiêu?',
    options: [
      'β_DC = 124 ; I_CEO = 6.25 µA',
      'β_DC = 99.2 ; I_CEO = 50 nA',
      'β_DC = 125 ; I_CEO = 0.4 nA',
      'β_DC = 100 ; I_CEO = 5.0 µA'
    ],
    correctIndex: 0,
    explanation: 'Ta có β_DC = α_DC / (1 - α_DC) = 0.992 / (1 - 0.992) = 0.992 / 0.008 = 124. Dòng rò khi hở Base là I_CEO = (β_DC + 1) · I_CBO = 125 × 50 nA = 6250 nA = 6.25 µA.'
  }
]
</script>

<ActiveRecallQuiz title="Bài Kiểm Tra Học Thuật Chương 4 & 5 (Vật Lý BJT, Hiệu Ứng Early & Giải Tích Thevenin)" :questions="ch4Questions" />
