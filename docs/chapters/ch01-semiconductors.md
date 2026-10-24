---
title: "Chương 1: Vật Lý Bán Dẫn & Giải Tích Chuyển Tiếp P-N (Chuyên Sâu Hàn Lâm)"
---

# Chương 1: Cơ Sở Vật Lý Chất Rắn, Bán Dẫn & Giải Tích Chuyển Tiếp P-N

> **Định hướng học thuật:** Trong sách *Electronic Devices* của Thomas L. Floyd, nhiều con số như rào thế $V_B \approx 0.7\text{ V}$ của Silicon, hệ số nhiệt $-2\text{ mV/}^\circ\text{C}$, hay sự nở rộng của vùng nghèo chỉ được nêu dưới dạng hiện tượng định tính. Chương này sẽ đi sâu xuống **tầng vật lý lượng tử và vật lý chất rắn (Solid-State Physics)** để chứng minh tường minh nguồn gốc của mọi hiện tượng đó từ các phương trình cơ bản nhất.

---

## 1-1. Cấu Trúc Lượng Tử Của Nguyên Tử & Sự Hình Thành Tinh Thể Bán Dẫn

### 1. Từ mô hình Bohr đến cấu hình lượng tử của Silicon (Si) và Germanium (Ge)

Trong cơ học lượng tử, trạng thái của mỗi electron trong nguyên tử cô lập được xác định bởi nghiệm của phương trình sóng Schrödinger thông qua **4 số lượng tử**:
- **Số lượng tử chính ($n = 1, 2, 3, \dots$):** Xác định lớp năng lượng chính (*shell*). Trong mô hình Bohr cổ điển, bán kính quỹ đạo dừng thứ $n$ của nguyên tử kiểu Hydro tỉ lệ với $n^2$ và mức năng lượng rời rạc là:
  $$E_n = -\frac{m_0 q^4 Z_{\text{eff}}^2}{8 \varepsilon_0^2 h^2 n^2}$$
- **Số lượng tử phụ ($l = 0, 1, \dots, n-1$):** Xác định hình dạng đám mây xác suất (phân lớp $s, p, d, f$ ứng với $l = 0, 1, 2, 3$).
- **Số lượng tử từ ($m_l = -l, \dots, +l$):** Có $2l + 1$ định hướng không gian của orbital.
- **Số lượng tử spin ($m_s = \pm \frac{1}{2}$):** Hai trạng thái tự quay ngược chiều nhau của electron.

Theo **Nguyên lý loại trừ Pauli (Pauli Exclusion Principle)**, không thể có hai electron cùng có chung cả 4 số lượng tử. Do đó, tổng số trạng thái lượng tử (số electron tối đa) trên lớp vỏ thứ $n$ là:

$$N_{\max}(n) = \sum_{l=0}^{n-1} 2(2l + 1) = 2n^2$$

Đối chiếu hai nguyên tố bán dẫn cột IV trong bảng tuần hoàn:
- **Silicon ($\text{Si}, Z = 14$):** Cấu hình electron là $1s^2 \, 2s^2 \, 2p^6 \, \mathbf{3s^2 \, 3p^2}$. Lớp lõi bên trong ($n=1, 2$) đã bão hòa kín với $10$ electron; lớp ngoài cùng ($n=3$) có **4 electron hóa trị** ($2$ electron ở phân lớp $3s$ và $2$ electron ở phân lớp $3p$).
- **Germanium ($\text{Ge}, Z = 32$):** Cấu hình electron là $[Ar]\, 3d^{10}\, \mathbf{4s^2 \, 4p^2}$. 4 electron hóa trị nằm ở lớp $n=4$, xa hạt nhân hơn và bị chắn tĩnh điện (*core shielding*) mạnh hơn so với Silicon.

### 2. Sự lai hóa sp³ (sp³ Hybridization) và Mạng tinh thể Kim cương (Diamond Lattice)

Tại sao nguyên tử $\text{Si}$ có cấu hình $3s^2 3p^2$ (chỉ có 2 electron độc thân ở $3p$) nhưng lại tạo được **4 liên kết cộng hóa trị đối xứng hoàn hảo**?
- Khi các nguyên tử $\text{Si}$ tiến lại gần nhau để kết tinh thành chất rắn, 1 orbital $3s$ và 3 orbital $3p$ trộn lẫn với nhau (quá trình **lai hóa $sp^3$**) tạo thành **4 orbital lai hóa $sp^3$ hoàn toàn tương đương nhau**, hướng về 4 đỉnh của một tứ diện đều (*Regular Tetrahedron*) với góc liên kết chính xác là $\theta = 109.5^\circ$.
- Mỗi nguyên tử $\text{Si}$ nằm ở tâm tứ diện góp chung 1 electron với mỗi nguyên tử $\text{Si}$ ở 4 đỉnh lân cận, tạo thành **cấu trúc mạng tinh thể kim cương (Diamond Cubic Lattice)** cực kỳ bền vững:
  - Hằng số mạng của Silicon ở $300\text{ K}$: $a = 5.43\text{ \AA} = 5.43 \times 10^{-8}\text{ cm}$.
  - Mật độ nguyên tử Silicon trong $1\text{ cm}^3$ tinh thể:
    $$N_{\text{Si}} = \frac{8 \text{ nguyên tử/ô mạng cơ sở}}{a^3} = \frac{8}{(5.43 \times 10^{-8}\text{ cm})^3} \approx 5.0 \times 10^{22}\text{ nguyên tử/cm}^3$$

---

## 1-2. Lý Thuyết Dải Năng Lượng (Energy Band Theory) & Khối Lượng Hiệu Dụng

### 1. Sự tách mức năng lượng khi hình thành tinh thể (Định lý Bloch)

Khi $N$ nguyên tử Silicon cô lập ($N \sim 5 \times 10^{22}\text{ cm}^{-3}$) tiến lại gần nhau tới khoảng cách hằng số mạng $a_0$, hàm sóng của các electron lớp ngoài cùng chồng lấp lên nhau. Để không vi phạm nguyên lý loại trừ Pauli, mỗi mức năng lượng suy biến của nguyên tử cô lập phải **tách thành $N$ mức năng lượng sát nhau** tạo thành một **dải liên tục (Energy Band)**:

- Ở khoảng cách mạng tinh thể thực tế $a_0 = 5.43\text{ \AA}$, $4N$ trạng thái lai hóa $sp^3$ tách thành hai dải riêng biệt:
  1. **Dải hóa trị (Valence Band - đỉnh dải ký hiệu là $E_V$):** Chứa đúng $4N$ trạng thái lượng tử có mức năng lượng thấp hơn (ứng với các trạng thái liên kết - *bonding states*). Ở nhiệt độ tuyệt đối $T = 0\text{ K}$, toàn bộ $4N$ electron hóa trị lấp đầy kín hoàn toàn dải hóa trị $\rightarrow$ tinh thể Silicon ở $0\text{ K}$ là một chất **cách điện hoàn hảo**!
  2. **Dải dẫn (Conduction Band - đáy dải ký hiệu là $E_C$):** Chứa $4N$ trạng thái lượng tử có mức năng lượng cao hơn (ứng với các trạng thái phản liên kết - *antibonding states*). Ở $T = 0\text{ K}$, dải dẫn hoàn toàn trống rỗng.
  3. **Vùng cấm (Forbidden Band Gap - độ rộng $E_g$):** Là khoảng năng lượng từ đỉnh dải hóa trị $E_V$ đến đáy dải dẫn $E_C$ mà ở đó **không tồn tại bất kỳ trạng thái lượng tử cho phép nào** đối với tinh thể thuần khiết:
     $$E_g = E_C - E_V$$

| Vật liệu | Độ rộng vùng cấm $E_g$ ở $0\text{ K}$ | Độ rộng vùng cấm $E_g$ ở $300\text{ K}$ | Hằng số điện môi tỉ đối $\varepsilon_r$ | Độ linh động $\mu_n$ ($\text{cm}^2/\text{V}\cdot\text{s}$) | Độ linh động $\mu_p$ ($\text{cm}^2/\text{V}\cdot\text{s}$) |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Silicon ($\text{Si}$)** | $1.17\text{ eV}$ | **$1.12\text{ eV}$** | $11.7$ | $\approx 1350$ | $\approx 480$ |
| **Germanium ($\text{Ge}$)** | $0.74\text{ eV}$ | **$0.67\text{ eV}$** | $16.0$ | $\approx 3900$ | $\approx 1900$ |
| **Gallium Arsenide ($\text{GaAs}$)** | $1.52\text{ eV}$ | **$1.42\text{ eV}$** | $12.9$ | $\approx 8500$ | $\approx 400$ |

> **Sự phụ thuộc nhiệt độ của vùng cấm $E_g(T)$ (Phương trình thực nghiệm Varshni):** Khi nhiệt độ $T$ tăng, biên độ dao động nhiệt của mạng tinh thể (*phonon*) tăng làm giãn hằng số mạng $a$, dẫn đến độ rộng vùng cấm $E_g$ thu hẹp nhẹ theo quy luật:
> $$E_g(T) = E_g(0) - \frac{\alpha T^2}{T + \beta}$$
> *(Với Silicon: $E_g(0) = 1.170\text{ eV}$, $\alpha = 4.73 \times 10^{-4}\text{ eV/K}$, $\beta = 636\text{ K} \implies$ tại $T = 300\text{ K}$ ta có $E_g(300\text{ K}) \approx 1.12\text{ eV}$).*

---

## 1-3. Bản Chất Lượng Tử Của Lỗ Trống (Hole) & Thống Kê Fermi-Dirac

### 1. Tại sao chỗ trống thiếu electron lại hành xử như hạt mang điện dương +q có khối lượng hiệu dụng?

Trong sách nhập môn, lỗ trống (*Hole*) chỉ được mô tả đơn giản là "vị trí khuyết thiếu 1 electron trong liên kết cộng hóa trị". Nhưng dưới góc nhìn vật lý chất rắn:
- Một electron chuyển động trong trường tuần hoàn của mạng tinh thể chịu cả lực điện trường ngoài lẫn nội lực của các ion nút mạng. Tác động của mạng tinh thể được gom toàn bộ vào đại lượng **Khối lượng hiệu dụng (Effective Mass $m^*$)**, xác định bởi độ cong của giản đồ năng lượng – xung lượng $E(k)$:
  $$m^* = \left(\frac{1}{\hbar^2} \frac{d^2 E}{dk^2}\right)^{-1}$$
- Ở gần **đáy dải dẫn ($E_C$)**, đường cong $E(k)$ lõm hướng lên ($\frac{d^2 E}{dk^2} > 0$) $\rightarrow$ electron tự do có khối lượng hiệu dụng dương $m_n^* > 0$.
- Ở gần **đỉnh dải hóa trị ($E_V$)**, đường cong $E(k)$ lồi hướng xuống ($\frac{d^2 E}{dk^2} < 0$) $\rightarrow$ các electron nằm sát đỉnh dải hóa trị có **khối lượng hiệu dụng ÂM**!
- Thay vì phải theo dõi chuyển động tập thể của gần $10^{23}$ electron có khối lượng hiệu dụng âm trong dải hóa trị gần đầy, cơ học lượng tử chứng minh rằng trạng thái thiếu vắng 1 electron ở đỉnh dải hóa trị hoàn toàn tương đương toán học với sự hiện diện của **1 giả hạt (quasiparticle) gọi là Lỗ trống (Hole)** có:
  - Điện tích dương: $+q = +1.602 \times 10^{-19}\text{ C}$
  - Khối lượng hiệu dụng dương: $m_p^* = -m_{\text{electron(đỉnh } E_V)} > 0$
  - Vì sự chồng lấp hàm sóng trong dải hóa trị hẹp hơn so với dải dẫn, nên khối lượng hiệu dụng của lỗ trống nặng hơn electron dẫn và **độ linh động của lỗ trống luôn nhỏ hơn electron** ($\mu_p \approx 480\text{ cm}^2/\text{V}\cdot\text{s} < \mu_n \approx 1350\text{ cm}^2/\text{V}\cdot\text{s}$ trong Si).

### 2. Hàm phân bố Fermi-Dirac f(E) và Nồng độ hạt dẫn nội tại n_i

Xác suất để một trạng thái lượng tử ở mức năng lượng $E$ có electron chiếm giữ ở trạng thái cân bằng nhiệt tại nhiệt độ tuyệt đối $T$ tuân theo **Hàm phân bố Fermi-Dirac**:

$$f(E) = \frac{1}{1 + \exp\left(\frac{E - E_F}{k_B T}\right)}$$

trong đó:
- $k_B = 1.3806 \times 10^{-23}\text{ J/K} = 8.617 \times 10^{-5}\text{ eV/K}$ là hằng số Boltzmann (ở $T = 300\text{ K}$, năng lượng nhiệt là $k_B T \approx 0.02585\text{ eV} \approx 25.85\text{ meV}$).
- **$E_F$ (Mức năng lượng Fermi - Fermi Level):** Là mức năng lượng tham chiếu mà tại đó xác suất tìm thấy electron đúng bằng $f(E_F) = \frac{1}{2}$ ($50\%$).

Khi $E - E_F \gg k_B T$ (xấp xỉ Boltzmann cho bán dẫn không suy biến), nồng độ electron tự do $n_0$ trên dải dẫn và nồng độ lỗ trống $p_0$ trong dải hóa trị được tích phân thành:

$$n_0 = N_C \exp\left(-\frac{E_C - E_F}{k_B T}\right), \qquad p_0 = N_V \exp\left(-\frac{E_F - E_V}{k_B T}\right)$$

với $N_C, N_V$ là **mật độ trạng thái hiệu dụng (Effective Density of States)** ở đáy dải dẫn và đỉnh dải hóa trị (tỉ lệ với $T^{3/2}$; tại $300\text{ K}$ đối với Silicon: $N_C \approx 2.8 \times 10^{19}\text{ cm}^{-3}$ và $N_V \approx 1.04 \times 10^{19}\text{ cm}^{-3}$).

Đối với **bán dẫn thuần (Intrinsic Semiconductor)**: Vì mỗi electron nhảy lên dải dẫn đều để lại đúng 1 lỗ trống ở dải hóa trị nên $n_0 = p_0 = n_i$, và mức Fermi nội tại $E_i$ nằm gần chính giữa vùng cấm ($E_i \approx \frac{E_C + E_V}{2}$). Nhân hai vế của $n_0$ và $p_0$, mức Fermi $E_F$ triệt tiêu hoàn toàn, cho ta **Định luật Tác dụng Khối lượng (Mass-Action Law)** đúng cho **mọi bán dẫn ở cân bằng nhiệt** (dù thuần hay đã pha tạp!):

$$\boxed{n_0 \cdot p_0 = n_i^2 = N_C N_V \exp\left(-\frac{E_g}{k_B T}\right)}$$

$$n_i(T) = \sqrt{N_C N_V} \exp\left(-\frac{E_g}{2 k_B T}\right)$$

> **Ý nghĩa vật lý cực kỳ sâu sắc của công thức $n_i(T)$:**
> - Ở $T = 300\text{ K}$:
>   - Với **Silicon ($E_g = 1.12\text{ eV}$)**: $n_i(\text{Si}) \approx 1.5 \times 10^{10}\text{ cm}^{-3}$. So với mật độ nguyên tử $N_{\text{Si}} = 5 \times 10^{22}\text{ cm}^{-3}$, tức là cứ **$3 \times 10^{12}$ (3 nghìn tỷ) nguyên tử Silicon mới có đúng 1 liên kết bị đứt do nhiệt**! Đó là lý do bán dẫn thuần cách điện rất mạnh.
>   - Với **Germanium ($E_g = 0.67\text{ eV}$)**: Vì $E_g$ nằm trên số mũ âm $\exp(-E_g / 2k_B T)$, chỉ cần $E_g$ nhỏ hơn một chút đã làm $n_i(\text{Ge}) \approx 2.4 \times 10^{13}\text{ cm}^{-3}$ — **lớn gấp $1.600$ lần so với Silicon**! Đây chính là căn nguyên toán học giải thích vì sao linh kiện Germanium có dòng rò ngược $I_S$ lớn gấp hàng nghìn lần Silicon và rất dễ mất kiểm soát khi nóng lên.

---

## 1-4. Bán Dẫn Pha Tạp (Extrinsic Semiconductors): Mức Năng Lượng Donor & Acceptor

### 1. Tại sao tạp chất Nhóm V (Donor) và Nhóm III (Acceptor) lại bị ion hóa gần như 100% ở nhiệt độ phòng?

Khi thay thế một nguyên tử Silicon bằng một nguyên tử nhóm V (như Phosphorus $\text{P}$ hoặc Arsenic $\text{As}$ có $5$ electron hóa trị):
- 4 electron tham gia liên kết cộng hóa trị với 4 nguyên tử $\text{Si}$ xung quanh; electron thứ 5 bị giữ lại bởi lực hút Coulomb của lõi ion dương $\text{P}^+$ đặt trong môi trường điện môi của tinh thể Silicon ($\varepsilon_r = 11.7$).
- Áp dụng mô hình nguyên tử Bohr hiệu chỉnh trong môi trường chất rắn, **năng lượng liên kết (Ionization Energy $\Delta E_D = E_C - E_D$)** cần thiết để bứt electron thứ 5 này lên dải dẫn được thu nhỏ đi hệ số $\frac{m^* / m_0}{\varepsilon_r^2}$ so với nguyên tử Hydro ($13.6\text{ eV}$):
  $$\Delta E_D \approx 13.6\text{ eV} \times \frac{(m_n^* / m_0)}{\varepsilon_r^2} \approx 0.045\text{ eV} \quad (\text{tức } 45\text{ meV})$$
- Vì mức năng lượng Donor $E_D$ chỉ nằm ngay sát dưới đáy dải dẫn $E_C$ một khoảng $0.045\text{ eV}$ (rất nhỏ so với vùng cấm $1.12\text{ eV}$ và tương đương năng lượng nhiệt ở nhiệt độ phòng), nên ở $T = 300\text{ K}$, **toàn bộ nguyên tử Donor đều bị ion hóa hoàn toàn** ($N_D^+ \approx N_D$)!

### 2. Tính toán chính xác nồng độ hạt dẫn đa số, hạt dẫn thiểu số và sự dịch chuyển mức Fermi

Áp dụng **Điều kiện trung hòa điện tích toàn cục (Charge Neutrality Condition)**: Tổng mật độ điện tích dương (lỗ trống $p_0$ + ion Donor dương $N_D^+$) phải bằng tổng mật độ điện tích âm (electron tự do $n_0$ + ion Acceptor âm $N_A^-$):

$$p_0 + N_D^+ = n_0 + N_A^-$$

Kết hợp với định luật tác dụng khối lượng $n_0 \cdot p_0 = n_i^2$, ta có hai trường hợp chuẩn:

1. **Bán dẫn loại N ($N_D \gg N_A, n_i$):**
   - **Nồng độ hạt dẫn đa số (Electron):** $n_{n0} \approx N_D$
   - **Nồng độ hạt dẫn thiểu số (Lỗ trống):**
     $$p_{n0} = \frac{n_i^2}{n_{n0}} \approx \frac{n_i^2}{N_D}$$
   - **Mức năng lượng Fermi $E_{Fn}$ dịch chuyển từ giữa vùng cấm lên sát đáy dải dẫn $E_C$:**
     $$E_{Fn} - E_i = k_B T \ln\left(\frac{N_D}{n_i}\right)$$
2. **Bán dẫn loại P ($N_A \gg N_D, n_i$):**
   - **Nồng độ hạt dẫn đa số (Lỗ trống):** $p_{p0} \approx N_A$
   - **Nồng độ hạt dẫn thiểu số (Electron):**
     $$n_{p0} = \frac{n_i^2}{p_{p0}} \approx \frac{n_i^2}{N_A}$$
   - **Mức năng lượng Fermi $E_{Fp}$ dịch chuyển từ giữa vùng cấm xuống sát đỉnh dải hóa trị $E_V$:**
     $$E_i - E_{Fp} = k_B T \ln\left(\frac{N_A}{n_i}\right)$$

::: details 🧮 Ví dụ giải tích định lượng 1.1: Sự suy giảm nồng độ hạt thiểu số khi pha tạp
**Đề bài:** Một mẫu Silicon ở $300\text{ K}$ ($n_i = 1.5 \times 10^{10}\text{ cm}^{-3}$) được pha tạp Phosphorus với nồng độ $N_D = 10^{16}\text{ nguyên tử/cm}^3$. Hãy tính nồng độ electron đa số $n_{n0}$, nồng độ lỗ trống thiểu số $p_{n0}$, và tỷ số giữa chúng.

**Lời giải chi tiết:**
- Vì $N_D = 10^{16}\text{ cm}^{-3} \gg n_i = 1.5 \times 10^{10}\text{ cm}^{-3}$, sự ion hóa hoàn toàn ở $300\text{ K}$ cho ta nồng độ hạt dẫn đa số:
  $$n_{n0} \approx N_D = 1.0 \times 10^{16}\text{ cm}^{-3}$$
- Theo định luật tác dụng khối lượng $n_{n0} p_{n0} = n_i^2$ (do mật độ electron tăng vọt nên xác suất tái hợp với lỗ trống tăng mạnh, làm triệt tiêu bớt lỗ trống), nồng độ lỗ trống thiểu số giảm xuống chỉ còn:
  $$p_{n0} = \frac{n_i^2}{N_D} = \frac{(1.5 \times 10^{10})^2}{10^{16}} = \frac{2.25 \times 10^{20}}{10^{16}} = 2.25 \times 10^4\text{ cm}^{-3}$$
- **Kết luận vật lý:** Tỷ số hạt đa số trên hạt thiểu số là $\frac{n_{n0}}{p_{n0}} \approx 4.4 \times 10^{11}$ (gần **500 tỷ lần**)! Chính sự chênh lệch khổng lồ này cho phép dòng điện trong bán dẫn loại N gần như chỉ do electron đảm nhiệm.
:::

---

## 1-5. Hai Cơ Chế Vận Chuyển Hạt Dẫn: Dòng Trôi (Drift) & Dòng Khuếch Tán (Diffusion)

Trong kim loại chỉ có duy nhất một cơ chế tạo dòng điện là **Dòng trôi (Drift)** dưới tác dụng của điện trường. Nhưng trong bán dẫn, sự không đồng nhất về nồng độ pha tạp làm xuất hiện cơ chế thứ hai cực kỳ quan trọng là **Dòng khuếch tán (Diffusion)** — đây chính là động lực tạo nên chuyển tiếp P-N và hoạt động của Transistor BJT!

### 1. Dòng trôi (Drift Current) do Điện trường

Khi đặt một điện trường $\mathcal{E}$ vào bán dẫn, các hạt dẫn được gia tốc giữa các lần va chạm tán xạ với dao động mạng (*lattice scattering*) và ion tạp chất (*impurity scattering*), đạt được **vận tốc trôi trung bình ($v_d$)**:

$$v_{dn} = -\mu_n \mathcal{E}, \qquad v_{dp} = +\mu_p \mathcal{E}$$

Mật độ dòng trôi tổng cộng $J_{\text{drift}}$ (đơn vị $\text{A/cm}^2$) là tổng đóng góp của cả electron và lỗ trống (lưu ý electron mang điện $-q$ chuyển động ngược chiều $\mathcal{E}$ nên dòng điện quy ước của nó **cùng chiều** với dòng lỗ trống!):

$$J_{\text{drift}} = J_{n,\text{drift}} + J_{p,\text{drift}} = q n \mu_n \mathcal{E} + q p \mu_p \mathcal{E} = \sigma \mathcal{E}$$

trong đó **độ dẫn điện (Conductivity $\sigma$)** và **điện trở suất (Resistivity $\rho$)** của bán dẫn là:

$$\sigma = \frac{1}{\rho} = q\left(n \mu_n + p \mu_p\right)$$

### 2. Dòng khuếch tán (Diffusion Current) do Gradien nồng độ

Do chuyển động nhiệt hỗn loạn (chuyển động Brown), các hạt dẫn luôn có xu hướng tự dịch chuyển từ vùng có **mật độ cao** sang vùng có **mật độ thấp** theo định luật Fick thứ nhất. Mật độ dòng điện khuếch tán tỉ lệ với đạo hàm không gian của nồng độ hạt dẫn:

$$J_{n,\text{diff}} = +q D_n \frac{dn}{dx}, \qquad J_{p,\text{diff}} = -q D_p \frac{dp}{dx}$$

trong đó $D_n, D_p$ (đơn vị $\text{cm}^2/\text{s}$) là **hệ số khuếch tán (Diffusion Coefficient)** của electron và lỗ trống.

### 3. Phương trình tổng quát và Hệ thức Einstein (Einstein Relation)

Tổng mật độ dòng electron $J_n$ và mật độ dòng lỗ trống $J_p$ tại mọi điểm trong bán dẫn là tổng của thành phần trôi và thành phần khuếch tán:

$$\boxed{J_n(x) = q n(x) \mu_n \mathcal{E}(x) + q D_n \frac{dn(x)}{dx}}$$

$$\boxed{J_p(x) = q p(x) \mu_p \mathcal{E}(x) - q D_p \frac{dp(x)}{dx}}$$

Giữa hệ số khuếch tán $D$ và độ linh động $\mu$ tồn tại một liên hệ nhiệt động học sâu sắc gọi là **Hệ thức Einstein**:

$$\boxed{\frac{D_n}{\mu_n} = \frac{D_p}{\mu_p} = \frac{k_B T}{q} = V_T}$$

Đại lượng $V_T = \frac{k_B T}{q}$ được gọi là **Điện áp nhiệt (Thermal Voltage)**. Tại nhiệt độ phòng $T = 300\text{ K}$ ($27^\circ\text{C}$):

$$V_T = \frac{1.3806 \times 10^{-23}\text{ J/K} \times 300\text{ K}}{1.6022 \times 10^{-19}\text{ C}} \approx 0.02585\text{ V} = 25.85\text{ mV}$$
*(Ở $T = 20^\circ\text{C} = 293\text{ K}$, $V_T \approx 25.2\text{ mV}$ — đây chính là con số **$25\text{ mV}$** xuất hiện trong công thức $r'_d = \frac{25\text{ mV}}{I_F}$ và $r'_e = \frac{25\text{ mV}}{I_E}$ xuyên suốt sách của Floyd!).*

---

## 1-6. Giải Tích Điện Tĩnh Học Chuyển Tiếp P-N (Electrostatics of the PN Junction)

### 1. Chứng minh công thức Hàng rào điện thế nội tại (Built-in Potential V_B) từ điều kiện cân bằng nhiệt

Khi ghép miền P (pha tạp $N_A$) và miền N (pha tạp $N_D$) tiếp xúc nhau và để hở mạch ở trạng thái cân bằng nhiệt động học:
- Không thể có dòng điện ròng chạy qua mặt ghép, tức là tại mọi tọa độ $x$: $J_p(x) = 0$ và $J_n(x) = 0$.
- Xét phương trình dòng lỗ trống bằng không:
  $$J_p(x) = q p(x) \mu_p \mathcal{E}(x) - q D_p \frac{dp(x)}{dx} = 0$$
- Thay $\mathcal{E}(x) = -\frac{d\psi(x)}{dx}$ (với $\psi(x)$ là điện thế tĩnh điện) và chia hai vế cho $q \mu_p p(x)$, sử dụng hệ thức Einstein $\frac{D_p}{\mu_p} = V_T$:
  $$-d\psi = V_T \frac{dp}{p}$$
- Lấy tích phân xác định từ miền trung hòa bên P (nơi điện thế là $\psi_p$ và nồng độ lỗ trống đa số là $p_{p0} \approx N_A$) sang miền trung hòa bên N (nơi điện thế là $\psi_n$ và nồng độ lỗ trống thiểu số là $p_{n0} \approx \frac{n_i^2}{N_D}$):
  $$V_B = \psi_n - \psi_p = V_T \ln\left(\frac{p_{p0}}{p_{n0}}\right) \implies \boxed{V_B = \frac{k_B T}{q} \ln\left(\frac{N_A N_D}{n_i^2}\right) = V_T \ln\left(\frac{N_A N_D}{n_i^2}\right)}$$

::: details 🔬 Chứng minh: Tại sao $V_B(\text{Si}) \approx 0.7\text{ V}$, $V_B(\text{Ge}) \approx 0.3\text{ V}$ và tại sao hệ số nhiệt là $-2\text{ mV/}^\circ\text{C}$?
1. **Với Silicon ($\text{Si}$):** Xét một chuyển tiếp P-N điển hình có $N_A = 10^{16}\text{ cm}^{-3}$, $N_D = 10^{16}\text{ cm}^{-3}$, và $n_i(\text{Si}) = 1.5 \times 10^{10}\text{ cm}^{-3}$ ở $300\text{ K}$ ($V_T = 0.02585\text{ V}$):
   $$V_B(\text{Si}) = 0.02585 \times \ln\left(\frac{10^{16} \times 10^{16}}{(1.5 \times 10^{10})^2}\right) = 0.02585 \times \ln(4.44 \times 10^{11}) = 0.02585 \times 26.82 \approx \mathbf{0.693\text{ V} \approx 0.7\text{ V}}$$
2. **Với Germanium ($\text{Ge}$):** Cùng mức pha tạp $N_A = N_D = 10^{16}\text{ cm}^{-3}$, nhưng do vùng cấm của Ge hẹp hơn nên $n_i(\text{Ge}) = 2.4 \times 10^{13}\text{ cm}^{-3}$:
   $$V_B(\text{Ge}) = 0.02585 \times \ln\left(\frac{10^{32}}{(2.4 \times 10^{13})^2}\right) = 0.02585 \times \ln(1.736 \times 10^5) = 0.02585 \times 12.06 \approx \mathbf{0.31\text{ V} \approx 0.3\text{ V}}$$
3. **Tại sao khi nhiệt độ $T$ tăng thì $V_B$ lại GIẢM khoảng $2\text{ mV/}^\circ\text{C}$?**
   Thay $n_i^2 = N_C N_V \exp\left(-\frac{E_g}{k_B T}\right)$ vào biểu thức của $V_B$:
   $$V_B(T) = \frac{E_g}{q} - \frac{k_B T}{q} \ln\left(\frac{N_C N_V}{N_A N_D}\right)$$
   Lấy đạo hàm theo nhiệt độ $T$:
   $$\frac{dV_B}{dT} \approx -\frac{\frac{E_g}{q} - V_B}{T} - \frac{3 k_B}{q}$$
   Thay số cho Silicon tại $T = 300\text{ K}$ ($\frac{E_g}{q} = 1.12\text{ V}, V_B = 0.7\text{ V}$):
   $$\frac{dV_B}{dT} \approx -\frac{1.12 - 0.70}{300} - 3(8.617 \times 10^{-5}) = -0.0014 - 0.00026 \approx \mathbf{-1.7 \text{ đến } -2.0\text{ mV/K}}$$
   Đó chính là nguồn gốc vật lý của quy tắc **$-2\text{ mV/}^\circ\text{C}$** trong sách của Floyd!
:::

### 2. Phương trình Poisson và Sự bất đối xứng của Vùng nghèo (*Depletion Region Asymmetry*)

Trong vùng nghèo ($-x_p \le x \le x_n$), các hạt dẫn tự do đã bị quét sạch, chỉ còn lại khối điện tích không gian cố định (*Space-Charge Region*) của các ion Acceptor âm $-q N_A$ (bên P) và ion Donor dương $+q N_D$ (bên N). Phương trình Poisson một chiều liên hệ mật độ điện tích khối $\rho(x)$ với điện trường $\mathcal{E}(x)$ và điện thế $\psi(x)$ là:

$$\frac{d^2 \psi(x)}{dx^2} = -\frac{d\mathcal{E}(x)}{dx} = -\frac{\rho(x)}{\varepsilon_s} = \begin{cases} +\frac{q N_A}{\varepsilon_s} & \text{với } -x_p \le x < 0 \text{ (bên P)} \\ -\frac{q N_D}{\varepsilon_s} & \text{với } 0 < x \le x_n \text{ (bên N)} \end{cases}$$

Tích phân phương trình Poisson với điều kiện biên $\mathcal{E}(-x_p) = \mathcal{E}(x_n) = 0$, tính liên tục của điện trường tại mặt ghép $x = 0$ đòi hỏi tổng điện tích âm bên P phải bằng tổng điện tích dương bên N:

$$\boxed{N_A \cdot x_p = N_D \cdot x_n \iff \frac{x_p}{x_n} = \frac{N_D}{N_A}}$$

> [!IMPORTANT]
> **Định lý Vàng của Chuyển tiếp P-N (One-Sided Junction Rule):**
> Độ lấn sâu của vùng nghèo vào mỗi miền **tỉ lệ nghịch với nồng độ pha tạp của miền đó**! Nếu miền P được pha tạp cực đậm ($P^+$) và miền N pha tạp nhẹ ($N_A \gg N_D$), thì $x_p \ll x_n$ — tức là **toàn bộ vùng nghèo gần như nằm trọn bên phía bán dẫn pha tạp nhẹ hơn**! Nguyên lý này là nền tảng để thiết kế vùng Base-Emitter và Base-Collector của BJT ở Chương 4.

Tích phân lần thứ hai cho ta **tổng bề rộng vùng nghèo $W$** và **điện trường cực đại $|\mathcal{E}_{\max}|$** tại mặt ghép khi có điện áp phân cực ngoài $V_D$ ($V_D > 0$ khi phân cực thuận, $V_D = -V_R < 0$ khi phân cực ngược):

$$\boxed{W(V_D) = x_p + x_n = \sqrt{\frac{2 \varepsilon_s}{q}\left(\frac{1}{N_A} + \frac{1}{N_D}\right)\left(V_B - V_D\right)}}$$

$$|\mathcal{E}_{\max}| = \frac{2\left(V_B - V_D\right)}{W}$$

### 🎛️ Thực Hành Kiểm Chứng Ngay Trên Phòng Thí Nghiệm Ảo

Hãy thử kéo thanh trượt nồng độ $N_A$ và $N_D$ lệch nhau (ví dụ $N_A = 10^{17}\text{ cm}^{-3}$, $N_D = 10^{15}\text{ cm}^{-3}$) để quan sát tỷ lệ lấn sâu $x_p / x_n$ và sự thay đổi của $V_B, W$:

<PnJunctionSim />

---

## 📝 Bài Tập Kiểm Tra Chuyên Sâu Chương 1

<script setup>
const ch1Questions = [
  {
    q: 'Tại sao ở nhiệt độ phòng (300 K), nồng độ hạt dẫn nội tại của Germanium (n_i ≈ 2.4 × 10^13 cm^-3) lại lớn gấp khoảng 1.600 lần so với Silicon (n_i ≈ 1.5 × 10^10 cm^-3)?',
    options: [
      'Vì Germanium có nhiều hơn Silicon 1 electron ở lớp vỏ hóa trị.',
      'Vì nồng độ hạt dẫn nội tại phụ thuộc hàm mũ exp(-E_g / 2k_B·T) vào độ rộng vùng cấm E_g, mà E_g của Ge (0.67 eV) nhỏ hơn đáng kể so với Si (1.12 eV).',
      'Vì mạng tinh thể của Germanium không có liên kết cộng hóa trị.',
      'Vì khối lượng nguyên tử của Germanium nhẹ hơn Silicon.'
    ],
    correctIndex: 1,
    explanation: '4 electron hóa trị của Ge nằm ở lớp thứ 4 (xa hạt nhân hơn lớp thứ 3 của Si) nên độ rộng vùng cấm E_g = 0.67 eV nhỏ hơn 1.12 eV của Si. Do E_g nằm trong hàm mũ âm exp(-E_g / 2k_B·T), sự chênh lệch 0.45 eV làm n_i của Ge tăng gấp ~1.600 lần ở 300 K.'
  },
  {
    q: 'Một mẫu bán dẫn Silicon ở 300 K (n_i = 1.5 × 10^10 cm^-3) được pha tạp Boron (nhóm III) với nồng độ N_A = 4.5 × 10^15 cm^-3. Nồng độ hạt dẫn đa số (p_p0) và hạt dẫn thiểu số (n_p0) ở cân bằng nhiệt lần lượt là bao nhiêu?',
    options: [
      'p_p0 = 4.5 × 10^15 cm^-3 ; n_p0 = 1.5 × 10^10 cm^-3',
      'p_p0 = 4.5 × 10^15 cm^-3 ; n_p0 = 5.0 × 10^4 cm^-3',
      'p_p0 = 5.0 × 10^4 cm^-3 ; n_p0 = 4.5 × 10^15 cm^-3',
      'p_p0 = 2.25 × 10^20 cm^-3 ; n_p0 = 4.5 × 10^15 cm^-3'
    ],
    correctIndex: 1,
    explanation: 'Boron là tạp chất nhận (Acceptor) nên tạo bán dẫn loại P có nồng độ lỗ trống đa số p_p0 ≈ N_A = 4.5 × 10^15 cm^-3. Theo định luật tác dụng khối lượng (Mass-Action Law): n_p0 = n_i^2 / p_p0 = (2.25 × 10^20) / (4.5 × 10^15) = 5.0 × 10^4 cm^-3.'
  },
  {
    q: 'Xét một chuyển tiếp P+N bất đối xứng có nồng độ pha tạp bên P là N_A = 10^18 cm^-3 và bên N là N_D = 10^15 cm^-3. Tỉ số độ lấn sâu của vùng nghèo sang miền N so với miền P (x_n / x_p) bằng bao nhiêu?',
    options: [
      'x_n / x_p = 1 (vùng nghèo luôn chia đều hai bên)',
      'x_n / x_p = 1 / 1000 (lấn sâu vào bên P gấp 1000 lần)',
      'x_n / x_p = 1000 (vùng nghèo lấn sâu vào bên N pha tạp nhẹ gấp 1000 lần bên P+)',
      'x_n / x_p = 31.6 (bằng căn bậc hai của tỉ số pha tạp)'
    ],
    correctIndex: 2,
    explanation: 'Theo điều kiện trung hòa điện tích không gian từ phương trình Poisson: N_A · x_p = N_D · x_n => x_n / x_p = N_A / N_D = 10^18 / 10^15 = 1000. Vùng nghèo hầu như mở rộng hoàn toàn về phía miền N pha tạp nhẹ.'
  },
  {
    q: 'Ở trạng thái cân bằng nhiệt động học (không có điện áp phân cực ngoài, V_D = 0), tại sao bên trong vùng nghèo có điện trường nội tại E rất mạnh (cỡ 10^4 V/cm) nhưng lại KHÔNG có dòng điện chạy ra mạch ngoài?',
    options: [
      'Vì trong bán dẫn không có hạt dẫn nào chuyển động khi V_D = 0.',
      'Vì dòng trôi (Drift current) do điện trường nội tại E gây ra luôn cân bằng động và triệt tiêu chính xác với dòng khuếch tán (Diffusion current) do chênh lệch nồng độ tại mọi điểm.',
      'Vì điện trở của dây nối bằng vô cùng.',
      'Vì các electron bị đóng băng hoàn toàn ở nhiệt độ phòng.'
    ],
    correctIndex: 1,
    explanation: 'Ở cân bằng nhiệt, mức Fermi E_F không đổi theo không gian. Dòng khuếch tán đẩy hạt đa số vượt rào thế đúng bằng và ngược chiều với dòng trôi cuốn hạt thiểu số xuôi theo điện trường nội tại (J_drift + J_diff = 0).'
  },
  {
    q: 'Hệ thức Einstein nối liền hai cơ chế vận chuyển hạt dẫn (Khuếch tán và Trôi) trong chất bán dẫn có biểu thức chính xác là gì?',
    options: [
      'D_n · μ_n = k_B·T / q',
      'D_n / μ_n = D_p / μ_p = k_B·T / q = V_T (≈ 25.85 mV ở 300 K)',
      'D_n / μ_n = E_g / q',
      'D_n = μ_n · V_B'
    ],
    correctIndex: 1,
    explanation: 'Hệ thức Einstein khẳng định tỉ số giữa hệ số khuếch tán D và độ linh động μ của cả electron lẫn lỗ trống đều bằng điện áp nhiệt V_T = k_B·T / q ≈ 25.85 mV tại 300 K.'
  }
]
</script>

<ActiveRecallQuiz title="Bài Kiểm Tra Học Thuật Chương 1 (Vật Lý Chất Rắn & Chuyển Tiếp P-N)" :questions="ch1Questions" />
