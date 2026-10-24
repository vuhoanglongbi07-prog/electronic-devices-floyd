---
title: "Bảng Tra Cứu Công Thức Nhanh (Cheat Sheet - Thomas L. Floyd)"
---

# 📐 Bảng Tra Cứu Công Thức Toàn Sách (*Electronic Devices Cheat Sheet*)

Trang này tổng hợp tất cả các hằng số vật lý và công thức tính toán nhanh theo đúng ký hiệu chuẩn của sách **Thomas L. Floyd - Electronic Devices (10th Edition)** để bạn tra cứu khi giải bài tập hoặc ôn thi.

---

## 1. Hằng Số Bán Dẫn & Diode (Chương 1 – 3)

- **Số electron tối đa trên lớp vỏ thứ $n$:** $N_e = 2n^2$
- **Hàng rào điện thế ($V_B$) ở $25^\circ\text{C}$:**
  $$V_B(\text{Si}) = 0.7\text{ V}, \qquad V_B(\text{Ge}) = 0.3\text{ V}, \qquad E_g(\text{Si}) = 1.12\text{ eV}$$
- **Điện trở động xoay chiều của Diode (Dynamic resistance $r'_d$):**
  $$r'_d \approx \frac{25\text{ mV}}{I_F}$$
- **Chỉnh lưu nửa chu kỳ (Half-Wave):**
  $$V_{p(\text{out})} = V_{p(\text{sec})} - 0.7\text{ V}, \qquad V_{\text{AVG}} = \frac{V_{p(\text{out})}}{\pi}, \qquad f_{\text{out}} = f_{\text{in}}, \qquad \text{PIV} = V_{p(\text{sec})}$$
- **Chỉnh lưu cả chu kỳ biến áp có điểm giữa (Center-Tapped Full-Wave):**
  $$V_{p(\text{out})} = \frac{V_{p(\text{sec})}}{2} - 0.7\text{ V}, \qquad V_{\text{AVG}} = \frac{2V_{p(\text{out})}}{\pi}, \qquad f_{\text{out}} = 2f_{\text{in}}, \qquad \text{PIV} = 2V_{p(\text{out})} + 0.7\text{ V}$$
- **Chỉnh lưu cầu 4 Diode (Full-Wave Bridge):**
  $$V_{p(\text{out})} = V_{p(\text{sec})} - 1.4\text{ V}, \qquad V_{\text{AVG}} = \frac{2V_{p(\text{out})}}{\pi}, \qquad f_{\text{out}} = 2f_{\text{in}}, \qquad \text{PIV} = V_{p(\text{out})} + 0.7\text{ V}$$
- **Bộ lọc tụ điện (Capacitor-Input Filter) & Hệ số gợn sóng ($r$):**
  $$V_{r(pp)} \approx \left(\frac{1}{f_r R_L C}\right) V_{p(\text{rect})}, \qquad V_{DC} \approx \left(1 - \frac{1}{2f_r R_L C}\right) V_{p(\text{rect})}, \qquad r = \frac{V_{r(pp)}}{V_{DC}}$$

---

## 2. Transistor Lưỡng Cực BJT – DC & AC (Chương 4 – 7)

- **Quan hệ dòng điện một chiều:**
  $$I_E = I_C + I_B, \qquad I_C = \beta_{DC} I_B, \qquad I_C = \alpha_{DC} I_E, \qquad \beta_{DC} = \frac{\alpha_{DC}}{1 - \alpha_{DC}}$$
- **Phân cực cầu phân áp (Voltage-Divider Bias):**
  $$R_{IN(\text{base})} \approx \beta_{DC} R_E, \qquad V_B = \left(\frac{R_2 \parallel R_{IN(\text{base})}}{R_1 + (R_2 \parallel R_{IN(\text{base})})}\right) V_{CC}$$
  *(Nếu $R_{IN(\text{base})} \ge 10 R_2$ thì bỏ qua $R_{IN(\text{base})}$: $V_B \approx \frac{R_2}{R_1+R_2}V_{CC}$)*
  $$V_E = V_B - 0.7\text{ V}, \qquad I_E = \frac{V_E}{R_E} \approx I_C, \qquad V_{CE} = V_{CC} - I_C(R_C + R_E)$$
- **Khuếch đại tín hiệu nhỏ BJT (Mô hình $r'_e$ - Chương 6):**
  $$r'_e \approx \frac{25\text{ mV}}{I_E}, \qquad R_c = R_C \parallel R_L$$
  - **Mạch CE (Có tụ bypass $C_E$):** $A_v = \frac{R_c}{r'_e}, \quad R_{in(\text{tot})} = R_1 \parallel R_2 \parallel (\beta_{ac} r'_e)$
  - **Mạch CE (Có điện trở $R_{E1}$ không nối tắt):** $A_v = \frac{R_c}{r'_e + R_{E1}}, \quad R_{in(\text{base})} = \beta_{ac}(r'_e + R_{E1})$
  - **Mạch CC (Emitter-Follower):** $A_v = \frac{R_e}{r'_e + R_e} \approx 1, \quad R_{in(\text{base})} = \beta_{ac}(r'_e + R_e)$

---

## 3. Transistor Trường FET & MOSFET (Chương 8 – 9)

- **Phương trình Shockley (JFET & D-MOSFET):**
  $$I_D = I_{DSS}\left(1 - \frac{V_{GS}}{V_{GS(\text{off})}}\right)^2$$
- **Hỗ dẫn xoay chiều ($g_m$):**
  $$g_m = g_{m0}\left(1 - \frac{V_{GS}}{V_{GS(\text{off})}}\right) \quad \text{với} \quad g_{m0} = \frac{2 I_{DSS}}{|V_{GS(\text{off})}|}$$
- **Phương trình E-MOSFET:**
  $$I_D = K\left(V_{GS} - V_{GS(\text{th})}\right)^2 \quad \text{với} \quad K = \frac{I_{D(\text{on})}}{\left(V_{GS(\text{on})} - V_{GS(\text{th})}\right)^2}$$
- **Độ lợi áp mạch Nguồn chung (Common-Source - CS):**
  $$A_v = g_m R_d \quad (\text{nếu có tụ bypass } C_S) \qquad \text{hoặc} \qquad A_v = \frac{g_m R_d}{1 + g_m R_S} \quad (\text{không có } C_S)$$

---

## 4. Đáp Ứng Tần Số & Op-Amp (Chương 10 & 12–16)

- **Độ lợi theo Decibel (dB):**
  $$A_{p(\text{dB})} = 10 \log_{10}(A_p), \qquad A_{v(\text{dB})} = 20 \log_{10}(A_v)$$
- **Tần số cắt mạch RC ($-3\text{ dB}$):**
  $$f_c = \frac{1}{2\pi R C}$$
- **Khuếch đại thuật toán (Op-Amp có hồi tiếp âm):**
  - **Không đảo (Non-inverting):** $A_{cl(NI)} = 1 + \frac{R_f}{R_i}, \quad Z_{in(NI)} = (1 + A_{ol}B)Z_{in}$
  - **Đảo (Inverting):** $A_{cl(I)} = -\frac{R_f}{R_i}, \quad Z_{in(I)} \approx R_i$
  - **Tỉ số nén đồng pha (CMRR):** $\text{CMRR} = \frac{A_{ol}}{A_{cm}}, \quad \text{CMRR}_{(\text{dB})} = 20\log_{10}\left(\frac{A_{ol}}{A_{cm}}\right)$
  - **Tốc độ đáp ứng (Slew Rate):** $\text{SR} = \frac{\Delta V_{\text{out}}}{\Delta t} \ (\text{V}/\mu\text{s})$
